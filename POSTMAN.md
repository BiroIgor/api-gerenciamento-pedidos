# Collection Postman - Jitterbit Order API

## 📥 Como Importar

1. Abra o Postman
2. Clique em **Import** (canto superior esquerdo)
3. Arraste o arquivo `Jitterbit_Order_API.postman_collection.json` ou clique em **Upload Files**
4. A collection será importada com todas as requisições configuradas

## 🔐 Autenticação

A collection está configurada para usar **Bearer Token JWT** automaticamente.

### Passo a Passo:

1. **Primeiro, faça login:**
   - Execute a requisição `Authentication > Login`
   - Use as credenciais:
     - Username: `admin`
     - Password: `admin123`
   - O token será **automaticamente salvo** na variável `jwt_token`

2. **Todas as outras requisições usarão o token automaticamente**

## 📋 Endpoints Incluídos

### Authentication
- ✅ **POST /auth/login** - Login e obtenção de token
- ✅ **GET /auth/verify** - Verificar token

### Orders
- ✅ **POST /order** - Criar pedido
- ✅ **GET /order/:orderId** - Buscar pedido por ID
- ✅ **GET /order/list** - Listar todos os pedidos
- ✅ **PUT /order/:orderId** - Atualizar pedido
- ✅ **DELETE /order/:orderId** - Deletar pedido

## 🔧 Variáveis de Ambiente

A collection usa as seguintes variáveis:

- `base_url`: `http://localhost:3000` (padrão)
- `jwt_token`: Token JWT (preenchido automaticamente após login)

### Para alterar a URL base:

1. Clique com botão direito na collection
2. Selecione **Edit**
3. Vá na aba **Variables**
4. Altere o valor de `base_url`

## 🚀 Como Usar

1. **Importe a collection** (veja acima)
2. **Execute o Login** primeiro
3. **Execute qualquer endpoint de Orders** - o token será usado automaticamente

## 📝 Exemplos de Uso

### Criar um Pedido:

1. Execute `Authentication > Login` primeiro
2. Execute `Orders > Create Order`
3. O body já vem preenchido com um exemplo
4. Modifique conforme necessário

### Buscar um Pedido:

1. Execute `Orders > Get Order by ID`
2. Altere o parâmetro `:orderId` na URL se necessário
3. O valor padrão é `v10089016vdb`

## ⚠️ Importante

- **Sempre execute o Login primeiro** para obter o token
- O token expira em **24 horas**
- Se receber erro 401, faça login novamente
- Todas as rotas de Orders requerem autenticação

