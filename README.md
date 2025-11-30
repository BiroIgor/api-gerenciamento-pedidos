# Order Management API

API REST desenvolvida em Node.js para gerenciamento de pedidos.

## 📋 Características

- ✅ CRUD completo de pedidos
- ✅ **Autenticação JWT** (Bearer Token)
- ✅ Clean Architecture (Domain, Infrastructure, View)
- ✅ Domain-Driven Design (DDD) com entidades e repositórios
- ✅ Injeção de Dependências
- ✅ Transformação automática de dados (mapping)
- ✅ Integração com PostgreSQL
- ✅ Documentação Swagger completa
- ✅ Collection Postman pronta para uso
- ✅ Tratamento robusto de erros
- ✅ Validação de dados em múltiplas camadas
- ✅ Código organizado e comentado

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **PostgreSQL** - Banco de dados relacional
- **Swagger/OpenAPI** - Documentação da API
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📦 Instalação

### Opção A: Usando Docker (Recomendado)

Veja o arquivo [DOCKER.md](DOCKER.md) para instruções completas.

**Quick Start:**
```bash
docker-compose up --build
```

### Opção B: Instalação Local

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd api-gerenciamento-pedidos
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do PostgreSQL:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=order_management
DB_USER=postgres
DB_PASSWORD=sua_senha
PORT=3000
```

4. Crie o banco de dados no PostgreSQL:
```sql
CREATE DATABASE order_management;
```

5. Execute o script SQL para criar as tabelas:
```bash
psql -U postgres -d order_management -f Script/11_30_2025_Igor.sql
```

Ou execute manualmente o conteúdo do arquivo `Script/11_30_2025_Igor.sql` no seu cliente PostgreSQL.

6. Inicie o servidor:
```bash
npm start
```

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

## 📚 Documentação da API

Após iniciar o servidor, a documentação Swagger estará disponível em:
**http://localhost:3000/api-docs**

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Tokens)** para autenticação. Todas as rotas de pedidos requerem autenticação.

### Credenciais Padrão:
- **Username:** `admin`
- **Password:** `admin123`

### Como Autenticar:

1. **Faça login:**
   ```bash
   POST /auth/login
   Body: {
     "username": "admin",
     "password": "admin123"
   }
   ```

2. **Use o token retornado:**
   ```bash
   Authorization: Bearer <seu_token_aqui>
   ```

3. **O token expira em 24 horas**

## 🔌 Endpoints

### Autenticação

#### 1. Login
- **POST** `/auth/login`
- **Body**: `{ "username": "admin", "password": "admin123" }`
- **Response**: 200 OK com token JWT

#### 2. Verificar Token
- **GET** `/auth/verify`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: 200 OK se token válido

### Pedidos (Requerem Autenticação)

#### 1. Criar Pedido
- **POST** `/order`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: JSON com dados do pedido
- **Response**: 201 Created (pedido criado)

#### 2. Buscar Pedido por ID
- **GET** `/order/:orderId`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: 200 OK (pedido encontrado) ou 404 Not Found

#### 3. Listar Todos os Pedidos
- **GET** `/order/list`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: 200 OK (lista de pedidos)

#### 4. Atualizar Pedido
- **PUT** `/order/:orderId`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: JSON com dados atualizados
- **Response**: 200 OK (pedido atualizado) ou 404 Not Found

#### 5. Deletar Pedido
- **DELETE** `/order/:orderId`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: 200 OK (pedido deletado) ou 404 Not Found

## 📝 Formato de Dados

### Entrada (API Request)

```json
{
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
}
```

### Saída (API Response)

```json
{
  "orderId": "v10089016vdb",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

## 🔄 Transformação de Dados

A API realiza automaticamente a transformação (mapping) dos dados:

| Campo API (Entrada) | Campo Banco (Saída) |
|---------------------|---------------------|
| `numeroPedido` | `orderId` (extrai parte antes do hífen) |
| `valorTotal` | `value` |
| `dataCriacao` | `creationDate` |
| `idItem` | `productId` (converte string para número) |
| `quantidadeItem` | `quantity` |
| `valorItem` | `price` |

## 🗄️ Estrutura do Banco de Dados

### Tabela: Order
- `orderId` (VARCHAR) - PRIMARY KEY
- `value` (DECIMAL)
- `creationDate` (TIMESTAMP)

### Tabela: Items
- `id` (SERIAL) - PRIMARY KEY
- `orderId` (VARCHAR) - FOREIGN KEY
- `productId` (INTEGER)
- `quantity` (INTEGER)
- `price` (DECIMAL)

## 📂 Estrutura do Projeto (Clean Architecture / DDD)

O projeto segue **Clean Architecture** com separação em três camadas principais, similar ao padrão Java/Enterprise:

- **Domain**: Entidades, interfaces, serviços de domínio e DTOs
- **Infrastructure**: Implementações concretas (repositórios, configurações)
- **View**: Interface HTTP (controllers, rotas, middlewares)

```
.
├── domain/                          # Camada de Domínio
│   ├── entities/                    # Entidades de negócio
│   │   ├── Order.js                 # Entidade Order com regras de validação
│   │   └── OrderItem.js             # Entidade OrderItem
│   ├── repositories/                # Interfaces (contratos)
│   │   └── IOrderRepository.js      # Interface do repositório
│   ├── services/                    # Serviços de domínio
│   │   └── OrderService.js          # Lógica de negócio e orquestração
│   └── dtos/                        # Data Transfer Objects
│       └── OrderDTO.js              # DTO para transferência de dados
│
├── infra/                           # Camada de Infraestrutura
│   ├── repositories/                # Implementações concretas
│   │   └── OrderRepository.js       # Implementação PostgreSQL
│   └── config/                      # Configurações
│       ├── database.js              # Configuração PostgreSQL
│       └── swagger.js               # Configuração Swagger
│
├── view/                            # Camada de Apresentação
│   ├── controllers/                 # Controllers HTTP
│   │   └── OrderController.js       # Adaptador HTTP
│   ├── routes/                      # Rotas HTTP
│   │   └── orderRoutes.js           # Mapeamento de rotas
│   └── middleware/                  # Middlewares HTTP
│       └── errorHandler.js          # Tratamento de erros HTTP
│
├── Script/
│   └── 11_30_2025_Igor.sql          # Script de criação das tabelas
├── env.example                      # Exemplo de variáveis de ambiente
├── .gitignore
├── package.json
├── README.md
└── server.js                        # Bootstrap e injeção de dependências
```

### Responsabilidades por Camada

#### **Domain** (Domínio)
- **Entidades** (`entities/`): Objetos de negócio com regras e validações
- **Interfaces** (`repositories/`): Contratos que definem operações (abstrações)
- **Serviços** (`services/`): Lógica de negócio, orquestração, validações
- **DTOs** (`dtos/`): Objetos de transferência de dados entre camadas

#### **Infrastructure** (Infraestrutura)
- **Repositórios** (`repositories/`): Implementações concretas de persistência (PostgreSQL)
- **Config** (`config/`): Configurações de banco, Swagger, etc.

#### **View** (Apresentação)
- **Controllers** (`controllers/`): Recebem requisições HTTP, chamam serviços, formatam respostas
- **Routes** (`routes/`): Mapeamento de URLs para controllers
- **Middleware** (`middleware/`): Interceptadores HTTP (erros, autenticação, etc.)

### Princípios da Arquitetura

1. **Dependency Inversion**: Domain não depende de Infrastructure
2. **Separation of Concerns**: Cada camada tem responsabilidade única
3. **Testabilidade**: Facilita testes unitários e de integração
4. **Manutenibilidade**: Mudanças em uma camada não afetam outras

## 🧪 Exemplo de Uso

### 1. Fazer Login (obter token)

```bash
curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data '{
  "username": "admin",
  "password": "admin123"
}'
```

**Resposta:**
```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "24h"
}
```

### 2. Criar um pedido (com autenticação)

```bash
curl --location 'http://localhost:3000/order' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer SEU_TOKEN_AQUI' \
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

### Buscar um pedido

```bash
curl --location 'http://localhost:3000/order/v10089016vdb' \
--header 'Authorization: Bearer SEU_TOKEN_AQUI'
```

### Listar todos os pedidos

```bash
curl --location 'http://localhost:3000/order/list' \
--header 'Authorization: Bearer SEU_TOKEN_AQUI'
```

### Atualizar um pedido

```bash
curl --location --request PUT 'http://localhost:3000/order/v10089016vdb' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer SEU_TOKEN_AQUI' \
--data '{
  "numeroPedido": "v10089016vdb",
  "valorTotal": 15000,
  "dataCriacao": "2023-07-20T10:00:00.000Z",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 2,
      "valorItem": 1500
    }
  ]
}'
```

### Deletar um pedido

```bash
curl --location --request DELETE 'http://localhost:3000/order/v10089016vdb' \
--header 'Authorization: Bearer SEU_TOKEN_AQUI'
```

## ⚠️ Tratamento de Erros

A API retorna códigos HTTP apropriados:

- **200 OK** - Sucesso
- **201 Created** - Recurso criado com sucesso
- **400 Bad Request** - Erro na requisição
- **404 Not Found** - Recurso não encontrado
- **409 Conflict** - Conflito (ex: pedido já existe)
- **500 Internal Server Error** - Erro interno do servidor
- **503 Service Unavailable** - Serviço indisponível (ex: banco offline)

## 👤 Autor

**Igor Gottscheffsky Pereira**
- LinkedIn: [igor-gottscheffsky-pereira-b897621a3](https://www.linkedin.com/in/igor-gottscheffsky-pereira-b897621a3/)
- Telefone: 55 55 991406694

