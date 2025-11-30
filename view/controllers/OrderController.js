/**
 * Controller - Camada de Apresentação (View)
 * Responsável por receber requisições HTTP e formatar respostas
 * Segue o padrão MVP onde Controller = View
 */
class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }

    /**
     * Cria um novo pedido
     * POST /order
     */
    async createOrder(req, res, next) {
        try {
            const result = await this.orderService.createOrder(req.body);

            if (!result.success) {
                return res.status(result.error.status).json({
                    error: result.error.error,
                    message: result.error.message
                });
            }

            return res.status(result.status).json(result.data);
        } catch (error) {
            console.error('Erro no controller ao criar pedido:', error);
            next(error);
        }
    }

    /**
     * Busca um pedido pelo ID
     * GET /order/:orderId
     */
    async getOrderById(req, res, next) {
        try {
            const { orderId } = req.params;
            const result = await this.orderService.getOrderById(orderId);

            if (!result.success) {
                return res.status(result.error.status).json({
                    error: result.error.error,
                    message: result.error.message
                });
            }

            return res.status(result.status).json(result.data);
        } catch (error) {
            console.error('Erro no controller ao buscar pedido:', error);
            next(error);
        }
    }

    /**
     * Lista todos os pedidos
     * GET /order/list
     */
    async getAllOrders(req, res, next) {
        try {
            const result = await this.orderService.getAllOrders();

            if (!result.success) {
                return res.status(result.error.status).json({
                    error: result.error.error,
                    message: result.error.message
                });
            }

            return res.status(result.status).json(result.data);
        } catch (error) {
            console.error('Erro no controller ao listar pedidos:', error);
            next(error);
        }
    }

    /**
     * Atualiza um pedido existente
     * PUT /order/:orderId
     */
    async updateOrder(req, res, next) {
        try {
            const { orderId } = req.params;
            const result = await this.orderService.updateOrder(orderId, req.body);

            if (!result.success) {
                return res.status(result.error.status).json({
                    error: result.error.error,
                    message: result.error.message
                });
            }

            return res.status(result.status).json(result.data);
        } catch (error) {
            console.error('Erro no controller ao atualizar pedido:', error);
            next(error);
        }
    }

    /**
     * Deleta um pedido
     * DELETE /order/:orderId
     */
    async deleteOrder(req, res, next) {
        try {
            const { orderId } = req.params;
            const result = await this.orderService.deleteOrder(orderId);

            if (!result.success) {
                return res.status(result.error.status).json({
                    error: result.error.error,
                    message: result.error.message
                });
            }

            return res.status(result.status).json(result.data);
        } catch (error) {
            console.error('Erro no controller ao deletar pedido:', error);
            next(error);
        }
    }
}

module.exports = OrderController;

