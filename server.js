const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Infra - Configurações
const { swaggerUi, swaggerSpec } = require('./infra/config/swagger');

// Domain - Serviços e Repositórios
const OrderRepository = require('./infra/repositories/OrderRepository');
const OrderService = require('./domain/services/OrderService');

// View - Controllers, Rotas e Middlewares
const OrderController = require('./view/controllers/OrderController');
const createOrderRoutes = require('./view/routes/orderRoutes');
const authRoutes = require('./view/routes/authRoutes');
const errorHandler = require('./view/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Injeção de Dependências (Dependency Injection)
// Infra → Domain → View
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);
const orderRoutes = createOrderRoutes(orderController);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota para documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota raiz
app.get('/', (req, res) => {
    res.json({
        message: 'Jitterbit Order API',
        version: '1.0.0',
        architecture: 'Clean Architecture (Domain, Infrastructure, View)',
        documentation: '/api-docs',
        endpoints: {
            login: 'POST /auth/login',
            verify: 'GET /auth/verify',
            createOrder: 'POST /order (requer autenticação)',
            getOrder: 'GET /order/:orderId (requer autenticação)',
            listOrders: 'GET /order/list (requer autenticação)',
            updateOrder: 'PUT /order/:orderId (requer autenticação)',
            deleteOrder: 'DELETE /order/:orderId (requer autenticação)'
        },
        authentication: {
            type: 'JWT Bearer Token',
            loginEndpoint: '/auth/login',
            defaultCredentials: {
                username: 'admin',
                password: 'admin123'
            }
        }
    });
});

// Rotas de autenticação (públicas)
app.use('/auth', authRoutes);

// Rotas da API (protegidas)
app.use('/order', orderRoutes);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📚 Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
    console.log(`🏗️  Arquitetura: Clean Architecture (Domain, Infrastructure, View)`);
});

module.exports = app;
