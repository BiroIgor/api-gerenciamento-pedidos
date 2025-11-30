/**
 * Interface de Repositório para Order (Contrato)
 * Define as operações que um repositório de pedidos deve implementar
 * Seguindo o padrão Repository do DDD
 */

/**
 * Interface do Repositório de Pedidos
 * As implementações concretas devem estar em infra/repositories
 */
class IOrderRepository {
    /**
     * Salva um pedido
     * @param {Order} order - Entidade Order
     * @returns {Promise<Order>} Pedido salvo
     */
    async save(order) {
        throw new Error('Método save deve ser implementado');
    }

    /**
     * Busca um pedido pelo ID
     * @param {string} orderId - ID do pedido
     * @returns {Promise<Order|null>} Pedido encontrado ou null
     */
    async findById(orderId) {
        throw new Error('Método findById deve ser implementado');
    }

    /**
     * Lista todos os pedidos
     * @returns {Promise<Array<Order>>} Lista de pedidos
     */
    async findAll() {
        throw new Error('Método findAll deve ser implementado');
    }

    /**
     * Atualiza um pedido
     * @param {Order} order - Entidade Order com dados atualizados
     * @returns {Promise<Order>} Pedido atualizado
     */
    async update(order) {
        throw new Error('Método update deve ser implementado');
    }

    /**
     * Deleta um pedido
     * @param {string} orderId - ID do pedido
     * @returns {Promise<boolean>} True se deletado com sucesso
     */
    async delete(orderId) {
        throw new Error('Método delete deve ser implementado');
    }
}

module.exports = IOrderRepository;

