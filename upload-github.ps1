# Script para fazer upload do projeto para o GitHub
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Upload para GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verifica se Git está instalado
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git não encontrado!" -ForegroundColor Red
    exit 1
}

# Repositório remoto
$REPO_URL = "https://github.com/BiroIgor/api-gerenciamento-pedidos.git"

Write-Host "📋 Repositório: $REPO_URL" -ForegroundColor Yellow
Write-Host ""

# Inicializa repositório
if (-not (Test-Path .git)) {
    Write-Host "🔧 Inicializando repositório Git..." -ForegroundColor Yellow
    git init
}

# Configura remote
$remoteExists = git remote -v 2>$null | Select-String "origin"
if ($remoteExists) {
    Write-Host "✅ Remote 'origin' já configurado" -ForegroundColor Green
    git remote set-url origin $REPO_URL
} else {
    Write-Host "🔧 Configurando remote 'origin'..." -ForegroundColor Yellow
    git remote add origin $REPO_URL
}

Write-Host ""
Write-Host "📦 Adicionando arquivos..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "📝 Criando commit..." -ForegroundColor Yellow
git commit -m "Initial commit: API de gerenciamento de pedidos - Jitterbit - Clean Architecture - CRUD completo - JWT - PostgreSQL - Swagger - Docker"

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Nenhuma mudança para commitar" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 Fazendo push para GitHub..." -ForegroundColor Yellow
git branch -M main 2>$null
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✅ Upload concluído com sucesso!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Acesse: $REPO_URL" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Erro ao fazer push" -ForegroundColor Red
    Write-Host "Verifique suas credenciais do GitHub" -ForegroundColor Yellow
}
