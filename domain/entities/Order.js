/**
 * Entidade de Domínio - Order
 * Representa um pedido no domínio da aplicação
 */
class Order {
    constructor(orderId, value, creationDate, items = []) {
        this.orderId = orderId;
        this.value = value;
        this.creationDate = creationDate;
        this.items = items;
    }

    /**
     * Calcula o valor total dos itens
     * @returns {number} Valor total calculado
     */
    calculateTotalValue() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    /**
     * Valida se o pedido está válido
     * @returns {Object|null} Erro de validação ou null se válido
     */
    validate() {
        if (!this.orderId || this.orderId.trim() === '') {
            return {
                field: 'orderId',
                message: 'ID do pedido é obrigatório'
            };
        }

        if (this.value === undefined || this.value === null || this.value < 0) {
            return {
                field: 'value',
                message: 'Valor do pedido deve ser maior ou igual a zero'
            };
        }

        if (!this.creationDate) {
            return {
                field: 'creationDate',
                message: 'Data de criação é obrigatória'
            };
        }

        return null;
    }
}

module.exports = Order;

