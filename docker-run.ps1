# Script para executar Node.js via Docker conectando no PostgreSQL local
# Usa o PostgreSQL que já está configurado na máquina

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Executando API com Docker" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verifica se o Docker está rodando
$dockerRunning = docker info 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Docker nao esta rodando!" -ForegroundColor Red
    Write-Host "Inicie o Docker Desktop e tente novamente." -ForegroundColor Yellow
    exit 1
}

Write-Host "Construindo a imagem Docker..." -ForegroundColor Yellow
docker build -t jitterbit-order-api .

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO ao construir a imagem!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "OK: Imagem construida com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "Iniciando o container..." -ForegroundColor Yellow
Write-Host "Conectando no PostgreSQL local (localhost:8231)" -ForegroundColor Cyan
Write-Host ""

# Remove container anterior se existir
docker rm -f jitterbit-api 2>$null

Write-Host ""
Write-Host "Iniciando container em modo background..." -ForegroundColor Yellow
docker run -d `
  -p 3000:3000 `
  -e DB_HOST=host.docker.internal `
  -e DB_PORT=8231 `
  -e DB_NAME=jitterbit_orders `
  -e DB_USER=postgres `
  -e DB_PASSWORD=postgres123 `
  --name jitterbit-api `
  jitterbit-order-api

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Container iniciado com sucesso!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Acesse:" -ForegroundColor Cyan
    Write-Host "  - API: http://localhost:3000" -ForegroundColor White
    Write-Host "  - Swagger: http://localhost:3000/api-docs" -ForegroundColor White
    Write-Host ""
    Write-Host "Ver logs: docker logs -f jitterbit-api" -ForegroundColor Yellow
    Write-Host "Parar: docker stop jitterbit-api" -ForegroundColor Yellow
    Write-Host ""
    
    # Mostra os logs inicialmente
    Start-Sleep -Seconds 2
    Write-Host "Logs iniciais:" -ForegroundColor Cyan
    docker logs jitterbit-api
} else {
    Write-Host "ERRO ao iniciar container!" -ForegroundColor Red
}

