const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

/**
 * Rotas para gerenciamento de pedidos
 * Camada View - Mapeamento de rotas HTTP
 */

/**
 * Factory function para criar rotas com dependências injetadas
 * @param {OrderController} orderController - Controller de pedidos
 * @returns {Router} Router do Express
 */
const createOrderRoutes = (orderController) => {
    /**
     * @swagger
     * tags:
     *   name: Orders
     *   description: Operações relacionadas a pedidos
     */

    /**
     * @swagger
     * /order:
     *   post:
     *     summary: Cria um novo pedido
     *     tags: [Orders]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/OrderInput'
     *           example:
     *             numeroPedido: "v10089015vdb-01"
     *             valorTotal: 10000
     *             dataCriacao: "2023-07-19T12:24:11.5299601+00:00"
     *             items:
     *               - idItem: "2434"
     *                 quantidadeItem: 1
     *                 valorItem: 1000
     *     responses:
     *       201:
     *         description: Pedido criado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/OrderOutput'
     *       400:
     *         description: Erro na requisição
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       409:
     *         description: Pedido já existe
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.post('/', authenticateToken, (req, res, next) => orderController.createOrder(req, res, next));

    /**
     * @swagger
     * /order/list:
     *   get:
     *     summary: Lista todos os pedidos
     *     tags: [Orders]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de pedidos
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 count:
     *                   type: integer
     *                   description: Número total de pedidos
     *                 orders:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/OrderOutput'
     */
    router.get('/list', authenticateToken, (req, res, next) => orderController.getAllOrders(req, res, next));

    /**
     * @swagger
     * /order/{orderId}:
     *   get:
     *     summary: Busca um pedido pelo ID
     *     tags: [Orders]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: orderId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do pedido
     *         example: v10089016vdb
     *     responses:
     *       200:
     *         description: Pedido encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/OrderOutput'
     *       404:
     *         description: Pedido não encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/:orderId', authenticateToken, (req, res, next) => orderController.getOrderById(req, res, next));

    /**
     * @swagger
     * /order/{orderId}:
     *   put:
     *     summary: Atualiza um pedido existente
     *     tags: [Orders]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: orderId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do pedido
     *         example: v10089016vdb
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/OrderInput'
     *     responses:
     *       200:
     *         description: Pedido atualizado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/OrderOutput'
     *       404:
     *         description: Pedido não encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.put('/:orderId', authenticateToken, (req, res, next) => orderController.updateOrder(req, res, next));

    /**
     * @swagger
     * /order/{orderId}:
     *   delete:
     *     summary: Deleta um pedido
     *     tags: [Orders]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: orderId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do pedido
     *         example: v10089016vdb
     *     responses:
     *       200:
     *         description: Pedido deletado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Pedido "v10089016vdb" deletado com sucesso
     *       404:
     *         description: Pedido não encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.delete('/:orderId', authenticateToken, (req, res, next) => orderController.deleteOrder(req, res, next));

    return router;
};

module.exports = createOrderRoutes;

