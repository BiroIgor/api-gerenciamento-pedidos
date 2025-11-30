# Instruções Rápidas de Configuração

## 1. Instalar Dependências
```bash
npm install
```

## 2. Configurar Variáveis de Ambiente

Copie o arquivo `env.example` para `.env`:
```bash
# Windows PowerShell
Copy-Item env.example .env

# Linux/Mac
cp env.example .env
```

Edite o arquivo `.env` com suas credenciais do PostgreSQL:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jitterbit_orders
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
PORT=3000
```

## 3. Criar Banco de Dados

Execute no PostgreSQL:
```sql
CREATE DATABASE jitterbit_orders;
```

## 4. Criar Tabelas

Execute o script SQL:
```bash
# Windows PowerShell
psql -U postgres -d jitterbit_orders -f Script/11_30_2025_Igor.sql

# Ou copie e cole o conteúdo de Script/11_30_2025_Igor.sql no seu cliente PostgreSQL
```

## 5. Iniciar o Servidor

```bash
npm start
```

Ou para desenvolvimento com auto-reload:
```bash
npm run dev
```

## 6. Acessar a Documentação

Abra no navegador:
```
http://localhost:3000/api-docs
```

## Testar a API

### Criar um pedido:
```bash
curl --location 'http://localhost:3000/order' \
--header 'Content-Type: application/json' \
--data '{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}'
```

### Buscar pedido:
```bash
curl http://localhost:3000/order/v10089015vdb
```

### Listar todos:
```bash
curl http://localhost:3000/order/list
```

