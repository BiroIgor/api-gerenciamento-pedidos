/**
 * DTO (Data Transfer Object) - OrderDTO
 * Objeto de transferência de dados para Order
 * Usado para comunicação entre camadas sem expor a entidade de domínio diretamente
 */

class OrderDTO {
    constructor(orderId, value, creationDate, items = []) {
        this.orderId = orderId;
        this.value = value;
        this.creationDate = creationDate;
        this.items = items || [];
    }

    /**
     * Cria um DTO a partir de uma entidade Order
     * @param {Order} order - Entidade Order
     * @returns {OrderDTO}
     */
    static fromEntity(order) {
        return new OrderDTO(
            order.orderId,
            order.value,
            order.creationDate,
            order.items
        );
    }

    /**
     * Converte o DTO para formato da API (saída)
     * @returns {Object} Objeto no formato da API
     */
    toApiFormat() {
        return {
            orderId: this.orderId,
            value: parseFloat(this.value),
            creationDate: this.creationDate,
            items: this.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: parseFloat(item.price)
            }))
        };
    }
}

module.exports = OrderDTO;

