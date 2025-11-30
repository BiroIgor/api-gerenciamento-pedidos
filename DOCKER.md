# Executando com Docker

## Opção 1: Docker Compose (Recomendado - inclui PostgreSQL)

Este método cria tanto a aplicação quanto o banco de dados em containers Docker.

### Pré-requisitos
- Docker instalado
- Docker Compose instalado (vem com Docker Desktop)

### Passos:

1. **Verifique se o Docker está instalado:**
   ```bash
   docker --version
   docker-compose --version
   ```

2. **Inicie tudo com Docker Compose:**
   ```bash
   docker-compose up --build
   ```

   Isso irá:
   - Construir a imagem da aplicação Node.js
   - Criar o container do PostgreSQL
   - Executar o script SQL automaticamente
   - Iniciar a aplicação

3. **Acesse a aplicação:**
   - API: http://localhost:3000
   - Swagger: http://localhost:3000/api-docs
   - PostgreSQL: localhost:5432

4. **Para parar:**
   ```bash
   docker-compose down
   ```

5. **Para parar e remover volumes (limpar banco):**
   ```bash
   docker-compose down -v
   ```

---

## Opção 2: Apenas Node.js no Docker (usando PostgreSQL local)

Use se você já tem PostgreSQL rodando localmente na porta 8231.

### Passos:

1. **Crie a imagem:**
   ```bash
   docker build -t jitterbit-order-api .
   ```

2. **Execute o container:**
   ```bash
   docker run -it --rm \
     -p 3000:3000 \
     -e DB_HOST=host.docker.internal \
     -e DB_PORT=8231 \
     -e DB_NAME=jitterbit_orders \
     -e DB_USER=postgres \
     -e DB_PASSWORD=postgres123 \
     jitterbit-order-api
   ```

   Nota: `host.docker.internal` permite que o container acesse serviços na máquina host (Windows/Mac).

---

## Opção 3: Node.js via Docker para desenvolvimento

Para usar apenas Node.js sem build:

```bash
# Puxar a imagem
docker pull node:24-alpine

# Executar com volume montado (para desenvolvimento)
docker run -it --rm \
  -p 3000:3000 \
  -v ${PWD}:/app \
  -w /app \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=8231 \
  -e DB_NAME=jitterbit_orders \
  -e DB_USER=postgres \
  -e DB_PASSWORD=postgres123 \
  node:24-alpine sh -c "npm install && npm start"
```

---

## Comandos úteis

```bash
# Ver logs
docker-compose logs -f app

# Executar comandos no container
docker-compose exec app sh

# Reconstruir apenas a aplicação
docker-compose up --build app

# Ver containers rodando
docker ps
```

