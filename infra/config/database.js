const { Pool } = require('pg');
require('dotenv').config();

/**
 * Configuração e conexão com o banco de dados PostgreSQL
 */
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'jitterbit_orders',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
});

// Testa a conexão ao inicializar
pool.on('connect', () => {
    console.log('✅ Conectado ao banco de dados PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Erro inesperado no banco de dados:', err);
    process.exit(-1);
});

/**
 * Função para executar queries no banco de dados
 * @param {string} text - SQL query
 * @param {Array} params - Parâmetros da query
 * @returns {Promise} Resultado da query
 */
const query = async (text, params) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executada query', { text, duration, rows: res.rowCount });
        return res;
    } catch (error) {
        console.error('Erro ao executar query:', error);
        throw error;
    }
};

/**
 * Fecha todas as conexões do pool
 */
const close = async () => {
    await pool.end();
};

module.exports = {
    query,
    close,
    pool
};

