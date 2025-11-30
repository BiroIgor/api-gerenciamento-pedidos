const Order = require('../entities/Order');
const OrderItem = require('../entities/OrderItem');
const OrderDTO = require('../dtos/OrderDTO');

/**
 * Serviço de Domínio - OrderService
 * Contém a lógica de negócio e orquestração
 * Equivalente ao Presenter no padrão MVP, mas com responsabilidades de domínio
 */
class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }

    /**
     * Cria um novo pedido
     * @param {Object} orderData - Dados do pedido
     * @returns {Promise<Object>} Resultado {success, data, error}
     */
    async createOrder(orderData) {
        try {
            // Valida dados de entrada
            const validationError = this.validateOrderData(orderData);
            if (validationError) {
                return {
                    success: false,
                    error: {
                        status: 400,
                        error: 'Bad Request',
                        message: validationError.message
                    }
                };
            }

            // Transforma dados da API para entidade de domínio
            const order = this.mapApiToDomain(orderData);

            // Valida entidade
            const entityError = order.validate();
            if (entityError) {
                return {
                    success: false,
                    error: {
                        status: 400,
                        error: 'Bad Request',
                        message: entityError.message
                    }
                };
            }

            // Verifica se pedido já existe
            const existing = await this.orderRepository.findById(order.orderId);
            if (existing) {
                return {
                    success: false,
                    error: {
                        status: 409,
                        error: 'Conflict',
                        message: `Pedido com ID "${order.orderId}" já existe`
                    }
                };
            }

            // Salva o pedido
            const savedOrder = await this.orderRepository.save(order);

            // Converte para DTO e depois para formato da API
            const dto = OrderDTO.fromEntity(savedOrder);
            const response = dto.toApiFormat();

            return {
                success: true,
                data: response,
                status: 201
            };
        } catch (error) {
            console.error('Erro no serviço ao criar pedido:', error);
            return {
                success: false,
                error: {
                    status: 500,
                    error: 'Internal Server Error',
                    message: 'Erro ao criar pedido'
                },
                originalError: error
            };
        }
    }

    /**
     * Busca um pedido pelo ID
     * @param {string} orderId - ID do pedido
     * @returns {Promise<Object>} Resultado {success, data, error}
     */
    async getOrderById(orderId) {
        try {
            if (!orderId) {
                return {
                    success: false,
                    error: {
                        status: 400,
                        error: 'Bad Request',
                        message: 'ID do pedido é obrigatório'
                    }
                };
            }

            const order = await this.orderRepository.findById(orderId);

            if (!order) {
                return {
                    success: false,
                    error: {
                        status: 404,
                        error: 'Not Found',
                        message: `Pedido com ID "${orderId}" não encontrado`
                    }
                };
            }

            const dto = OrderDTO.fromEntity(order);
            const response = dto.toApiFormat();

            return {
                success: true,
                data: response,
                status: 200
            };
        } catch (error) {
            console.error('Erro no serviço ao buscar pedido:', error);
            return {
                success: false,
                error: {
                    status: 500,
                    error: 'Internal Server Error',
                    message: 'Erro ao buscar pedido'
                },
                originalError: error
            };
        }
    }

    /**
     * Lista todos os pedidos
     * @returns {Promise<Object>} Resultado {success, data, error}
     */
    async getAllOrders() {
        try {
            const orders = await this.orderRepository.findAll();

            const ordersResponse = orders.map(order => {
                const dto = OrderDTO.fromEntity(order);
                return dto.toApiFormat();
            });

            return {
                success: true,
                data: {
                    count: ordersResponse.length,
                    orders: ordersResponse
                },
                status: 200
            };
        } catch (error) {
            console.error('Erro no serviço ao listar pedidos:', error);
            return {
                success: false,
                error: {
                    status: 500,
                    error: 'Internal Server Error',
                    message: 'Erro ao listar pedidos'
                },
                originalError: error
            };
        }
    }

    /**
     * Atualiza um pedido
     * @param {string} orderId - ID do pedido
     * @param {Object} orderData - Dados atualizados
     * @returns {Promise<Object>} Resultado {success, data, error}
     */
    async updateOrder(orderId, orderData) {
        try {
            if (!orderId) {
                return {
                    success: false,
                    error: {
                        status: 400,
                        error: 'Bad Request',
                        message: 'ID do pedido é obrigatório'
                    }
                };
            }

            const validationError = this.validateOrderData(orderData);
            if (validationError) {
                return {
                    success: false,
                    error: {
                        status: 400,
                        error: 'Bad Request',
                        message: validationError.message
                    }
                };
            }

            // Verifica se pedido existe
            const existing = await this.orderRepository.findById(orderId);
            if (!existing) {
                return {
                    success: false,
                    error: {
                        status: 404,
                        error: 'Not Found',
                        message: `Pedido com ID "${orderId}" não encontrado`
                    }
                };
            }

            // Transforma dados da API para entidade
            const order = this.mapApiToDomain(orderData);
            order.orderId = orderId; // Garante o ID correto

            // Valida entidade
            const entityError = order.validate();
            if (entityError) {
                return {
                    success: false,
                    error: {
                        status: 400,
                        error: 'Bad Request',
                        message: entityError.message
                    }
                };
            }

            // Atualiza o pedido
            const updatedOrder = await this.orderRepository.update(order);

            const dto = OrderDTO.fromEntity(updatedOrder);
            const response = dto.toApiFormat();

            return {
                success: true,
                data: response,
                status: 200
            };
        } catch (error) {
            console.error('Erro no serviço ao atualizar pedido:', error);
            return {
                success: false,
                error: {
                    status: 500,
                    error: 'Internal Server Error',
                    message: 'Erro ao atualizar pedido'
                },
                originalError: error
            };
        }
    }

    /**
     * Deleta um pedido
     * @param {string} orderId - ID do pedido
     * @returns {Promise<Object>} Resultado {success, data, error}
     */
    async deleteOrder(orderId) {
        try {
            if (!orderId) {
                return {
                    success: false,
                    error: {
                        status: 400,
                        error: 'Bad Request',
                        message: 'ID do pedido é obrigatório'
                    }
                };
            }

            // Verifica se pedido existe
            const existing = await this.orderRepository.findById(orderId);
            if (!existing) {
                return {
                    success: false,
                    error: {
                        status: 404,
                        error: 'Not Found',
                        message: `Pedido com ID "${orderId}" não encontrado`
                    }
                };
            }

            const deleted = await this.orderRepository.delete(orderId);

            if (deleted) {
                return {
                    success: true,
                    data: {
                        message: `Pedido "${orderId}" deletado com sucesso`
                    },
                    status: 200
                };
            } else {
                return {
                    success: false,
                    error: {
                        status: 500,
                        error: 'Internal Server Error',
                        message: 'Erro ao deletar pedido'
                    }
                };
            }
        } catch (error) {
            console.error('Erro no serviço ao deletar pedido:', error);
            return {
                success: false,
                error: {
                    status: 500,
                    error: 'Internal Server Error',
                    message: 'Erro ao deletar pedido'
                },
                originalError: error
            };
        }
    }

    /**
     * Valida dados de entrada da API
     * @param {Object} data - Dados da API
     * @returns {Object|null} Erro ou null
     */
    validateOrderData(data) {
        if (!data || Object.keys(data).length === 0) {
            return { message: 'Body da requisição não pode estar vazio' };
        }

        if (!data.numeroPedido) {
            return { message: 'Campo "numeroPedido" é obrigatório' };
        }

        if (data.valorTotal === undefined || data.valorTotal === null) {
            return { message: 'Campo "valorTotal" é obrigatório' };
        }

        return null;
    }

    /**
     * Mapeia dados da API para entidade de domínio
     * @param {Object} apiData - Dados da API
     * @returns {Order} Entidade Order
     */
    mapApiToDomain(apiData) {
        // Extrai orderId do numeroPedido (remove sufixo se houver)
        const orderId = apiData.numeroPedido ? apiData.numeroPedido.split('-')[0] : null;
        
        // Transforma data
        const creationDate = apiData.dataCriacao ? new Date(apiData.dataCriacao) : new Date();
        
        // Transforma itens
        const items = (apiData.items || []).map(item => {
            return new OrderItem(
                parseInt(item.idItem, 10),
                item.quantidadeItem,
                item.valorItem
            );
        });

        return new Order(orderId, apiData.valorTotal, creationDate, items);
    }
}

module.exports = OrderService;

