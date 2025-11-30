/**
 * Entidade de Domínio - OrderItem
 * Representa um item de pedido no domínio da aplicação
 */
class OrderItem {
    constructor(productId, quantity, price) {
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
    }

    /**
     * Calcula o subtotal do item
     * @returns {number} Subtotal (preço * quantidade)
     */
    getSubtotal() {
        return this.price * this.quantity;
    }

    /**
     * Valida se o item está válido
     * @returns {Object|null} Erro de validação ou null se válido
     */
    validate() {
        if (!this.productId || this.productId <= 0) {
            return {
                field: 'productId',
                message: 'ID do produto é obrigatório e deve ser maior que zero'
            };
        }

        if (!this.quantity || this.quantity <= 0) {
            return {
                field: 'quantity',
                message: 'Quantidade é obrigatória e deve ser maior que zero'
            };
        }

        if (this.price === undefined || this.price === null || this.price < 0) {
            return {
                field: 'price',
                message: 'Preço é obrigatório e deve ser maior ou igual a zero'
            };
        }

        return null;
    }
}

module.exports = OrderItem;

