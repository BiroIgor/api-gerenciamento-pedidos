# 📋 Resumo do Projeto - Jitterbit Order API

## ✅ Requisitos Atendidos

### Obrigatórios
- ✅ **POST /order** - Criar pedido
- ✅ **GET /order/:orderId** - Buscar pedido por ID
- ✅ Transformação de dados (mapping) implementada
- ✅ PostgreSQL como banco de dados
- ✅ Código organizado e comentado
- ✅ Tratamento de erros robusto
- ✅ Respostas HTTP adequadas

### Opcionais
- ✅ **GET /order/list** - Listar todos os pedidos
- ✅ **PUT /order/:orderId** - Atualizar pedido
- ✅ **DELETE /order/:orderId** - Deletar pedido
- ✅ **Autenticação JWT** - Implementada com Bearer Token
- ✅ **Swagger** - Documentação completa
- ✅ **Postman Collection** - Pronta para importação

## 🏗️ Arquitetura

**Clean Architecture** com separação em 3 camadas:
- **Domain** - Entidades, Interfaces, Serviços, DTOs
- **Infrastructure** - Repositórios PostgreSQL, Configurações
- **View** - Controllers, Rotas, Middlewares HTTP

## 🔐 Autenticação

- Tipo: JWT Bearer Token
- Endpoint: `POST /auth/login`
- Credenciais padrão: `admin / admin123`
- Expiração: 24 horas
- Todas as rotas de pedidos requerem autenticação

## 📊 Banco de Dados

- **SGBD:** PostgreSQL
- **Tabelas:**
  - `Order` (orderId, value, creationDate)
  - `Items` (orderId, productId, quantity, price)
- **Script:** `Script/11_30_2025_Igor.sql`

## 🚀 Como Executar

### Opção 1: Docker (Recomendado)
```bash
.\docker-run.ps1
```

### Opção 2: Docker Compose
```bash
docker-compose up --build
```

### Opção 3: Local
```bash
npm install
npm start
```

## 📚 Documentação

- **Swagger:** http://localhost:3000/api-docs
- **Postman:** Importar `Jitterbit_Order_API.postman_collection.json`
- **README.md:** Documentação completa
- **SETUP.md:** Instruções de configuração
- **DOCKER.md:** Guia Docker
- **POSTMAN.md:** Guia Postman

## 🧪 Testes Realizados

- ✅ Criar pedido
- ✅ Buscar pedido por ID
- ✅ Listar todos os pedidos
- ✅ Atualizar pedido
- ✅ Deletar pedido
- ✅ Login e autenticação JWT
- ✅ Proteção de rotas (401 sem token)
- ✅ Transformação de dados

## 📦 Tecnologias

- Node.js
- Express
- PostgreSQL (pg)
- JWT (jsonwebtoken)
- Swagger/OpenAPI
- Docker
- Clean Architecture / DDD

## 👤 Autor

**Igor Gottscheffsky Pereira**
- LinkedIn: /igor-gottscheffsky-pereira-b897621a3/
- Telefone: 55 55 991406694

## 📅 Data

28/11/2025

