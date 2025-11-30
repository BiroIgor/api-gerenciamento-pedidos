const IOrderRepository = require('../../domain/repositories/IOrderRepository');
const Order = require('../../domain/entities/Order');
const OrderItem = require('../../domain/entities/OrderItem');
const db = require('../config/database');

/**
 * Implementação concreta do Repositório de Pedidos usando PostgreSQL
 * Implementa IOrderRepository (contrato do domínio)
 */
class OrderRepository extends IOrderRepository {
    /**
     * Salva um pedido e seus itens
     * @param {Order} order - Entidade Order
     * @returns {Promise<Order>} Pedido salvo
     */
    async save(order) {
        // Salva o pedido
        const orderQuery = `
            INSERT INTO "Order" ("orderId", "value", "creationDate")
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const orderResult = await db.query(orderQuery, [
            order.orderId,
            order.value,
            order.creationDate
        ]);

        // Salva os itens
        if (order.items && order.items.length > 0) {
            for (const item of order.items) {
                const itemQuery = `
                    INSERT INTO "Items" ("orderId", "productId", quantity, price)
                    VALUES ($1, $2, $3, $4)
                `;
                await db.query(itemQuery, [
                    order.orderId,
                    item.productId,
                    item.quantity,
                    item.price
                ]);
            }
        }

        // Retorna a entidade com os dados salvos
        return await this.findById(order.orderId);
    }

    /**
     * Busca um pedido pelo ID
     * @param {string} orderId - ID do pedido
     * @returns {Promise<Order|null>} Pedido encontrado ou null
     */
    async findById(orderId) {
        // Busca o pedido
        const orderQuery = `
            SELECT * FROM "Order"
            WHERE "orderId" = $1
        `;
        const orderResult = await db.query(orderQuery, [orderId]);

        if (orderResult.rows.length === 0) {
            return null;
        }

        const orderData = orderResult.rows[0];

        // Busca os itens
        const itemsQuery = `
            SELECT "productId", quantity, price
            FROM "Items"
            WHERE "orderId" = $1
        `;
        const itemsResult = await db.query(itemsQuery, [orderId]);

        // Converte para entidades
        const items = itemsResult.rows.map(item => 
            new OrderItem(item.productId, item.quantity, parseFloat(item.price))
        );

        return new Order(
            orderData.orderId,
            parseFloat(orderData.value),
            orderData.creationDate,
            items
        );
    }

    /**
     * Lista todos os pedidos
     * @returns {Promise<Array<Order>>} Lista de pedidos
     */
    async findAll() {
        // Busca todos os pedidos
        const orderQuery = `
            SELECT * FROM "Order"
            ORDER BY "creationDate" DESC
        `;
        const orderResult = await db.query(orderQuery);

        // Para cada pedido, busca seus itens
        const orders = await Promise.all(
            orderResult.rows.map(async (orderData) => {
                const itemsQuery = `
                    SELECT "productId", quantity, price
                    FROM "Items"
                    WHERE "orderId" = $1
                `;
                const itemsResult = await db.query(itemsQuery, [orderData.orderId]);

                const items = itemsResult.rows.map(item =>
                    new OrderItem(item.productId, item.quantity, parseFloat(item.price))
                );

                return new Order(
                    orderData.orderId,
                    parseFloat(orderData.value),
                    orderData.creationDate,
                    items
                );
            })
        );

        return orders;
    }

    /**
     * Atualiza um pedido
     * @param {Order} order - Entidade Order com dados atualizados
     * @returns {Promise<Order>} Pedido atualizado
     */
    async update(order) {
        // Atualiza o pedido
        const orderQuery = `
            UPDATE "Order"
            SET "value" = $2, "creationDate" = $3
            WHERE "orderId" = $1
            RETURNING *
        `;
        await db.query(orderQuery, [
            order.orderId,
            order.value,
            order.creationDate
        ]);

        // Deleta itens antigos
        const deleteItemsQuery = `
            DELETE FROM "Items"
            WHERE "orderId" = $1
        `;
        await db.query(deleteItemsQuery, [order.orderId]);

        // Salva novos itens
        if (order.items && order.items.length > 0) {
            for (const item of order.items) {
                const itemQuery = `
                    INSERT INTO "Items" ("orderId", "productId", quantity, price)
                    VALUES ($1, $2, $3, $4)
                `;
                await db.query(itemQuery, [
                    order.orderId,
                    item.productId,
                    item.quantity,
                    item.price
                ]);
            }
        }

        // Retorna o pedido atualizado
        return await this.findById(order.orderId);
    }

    /**
     * Deleta um pedido (cascade deleta os itens também)
     * @param {string} orderId - ID do pedido
     * @returns {Promise<boolean>} True se deletado com sucesso
     */
    async delete(orderId) {
        const query = `
            DELETE FROM "Order"
            WHERE "orderId" = $1
        `;
        const result = await db.query(query, [orderId]);
        return result.rowCount > 0;
    }
}

module.exports = OrderRepository;

