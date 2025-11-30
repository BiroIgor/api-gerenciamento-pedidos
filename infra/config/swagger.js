const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * Configuração do Swagger para documentação da API
 */
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Jitterbit Order API',
            version: '1.0.0',
            description: 'API para gerenciamento de pedidos - Teste Jitterbit',
            contact: {
                name: 'Igor Gottscheffsky Pereira',
                url: 'https://www.linkedin.com/in/igor-gottscheffsky-pereira-b897621a3/',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desenvolvimento',
            },
        ],
        tags: [
            {
                name: 'Authentication',
                description: 'Operações de autenticação',
            },
            {
                name: 'Orders',
                description: 'Operações relacionadas a pedidos',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Insira o token JWT obtido no endpoint /auth/login'
                }
            },
            schemas: {
                OrderInput: {
                    type: 'object',
                    required: ['numeroPedido', 'valorTotal'],
                    properties: {
                        numeroPedido: {
                            type: 'string',
                            description: 'Número do pedido (ex: v10089015vdb-01)',
                            example: 'v10089015vdb-01',
                        },
                        valorTotal: {
                            type: 'number',
                            description: 'Valor total do pedido',
                            example: 10000,
                        },
                        dataCriacao: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data de criação do pedido (ISO 8601)',
                            example: '2023-07-19T12:24:11.5299601+00:00',
                        },
                        items: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/OrderItemInput',
                            },
                        },
                    },
                },
                OrderItemInput: {
                    type: 'object',
                    required: ['idItem', 'quantidadeItem', 'valorItem'],
                    properties: {
                        idItem: {
                            type: 'string',
                            description: 'ID do item (será convertido para número)',
                            example: '2434',
                        },
                        quantidadeItem: {
                            type: 'integer',
                            description: 'Quantidade do item',
                            example: 1,
                        },
                        valorItem: {
                            type: 'number',
                            description: 'Valor unitário do item',
                            example: 1000,
                        },
                    },
                },
                OrderOutput: {
                    type: 'object',
                    properties: {
                        orderId: {
                            type: 'string',
                            description: 'ID do pedido',
                            example: 'v10089016vdb',
                        },
                        value: {
                            type: 'number',
                            description: 'Valor total do pedido',
                            example: 10000,
                        },
                        creationDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data de criação do pedido',
                            example: '2023-07-19T12:24:11.529Z',
                        },
                        items: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/OrderItemOutput',
                            },
                        },
                    },
                },
                OrderItemOutput: {
                    type: 'object',
                    properties: {
                        productId: {
                            type: 'integer',
                            description: 'ID do produto',
                            example: 2434,
                        },
                        quantity: {
                            type: 'integer',
                            description: 'Quantidade do item',
                            example: 1,
                        },
                        price: {
                            type: 'number',
                            description: 'Valor unitário do item',
                            example: 1000,
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'Tipo do erro',
                            example: 'Bad Request',
                        },
                        message: {
                            type: 'string',
                            description: 'Mensagem de erro',
                            example: 'Campo obrigatório não fornecido',
                        },
                    },
                },
                LoginRequest: {
                    type: 'object',
                    required: ['username', 'password'],
                    properties: {
                        username: {
                            type: 'string',
                            example: 'admin'
                        },
                        password: {
                            type: 'string',
                            example: 'admin123'
                        }
                    }
                },
                LoginResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Login realizado com sucesso'
                        },
                        token: {
                            type: 'string',
                            description: 'Token JWT para autenticação'
                        },
                        expiresIn: {
                            type: 'string',
                            example: '24h'
                        }
                    }
                },
            },
        },
        security: [
            {
                bearerAuth: []
            }
        ],
    },
    apis: ['./view/routes/*.js', './server.js', './view/controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec,
};

