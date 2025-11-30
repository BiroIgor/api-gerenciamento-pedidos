/**
 * Middleware para tratamento centralizado de erros
 * Camada View - Tratamento de erros HTTP
 */
const errorHandler = (err, req, res, next) => {
    console.error('Erro capturado:', err);

    // Erro de validação do PostgreSQL
    if (err.code === '23505') { // Violação de constraint única
        return res.status(409).json({
            error: 'Conflict',
            message: 'Já existe um registro com esses dados'
        });
    }

    if (err.code === '23503') { // Violação de foreign key
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Referência inválida a outro registro'
        });
    }

    if (err.code === '23502') { // Violação de NOT NULL
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Campos obrigatórios não foram fornecidos'
        });
    }

    // Erro de conexão com o banco
    if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
        return res.status(503).json({
            error: 'Service Unavailable',
            message: 'Não foi possível conectar ao banco de dados'
        });
    }

    // Erro genérico do servidor
    res.status(err.status || 500).json({
        error: err.name || 'Internal Server Error',
        message: err.message || 'Ocorreu um erro interno no servidor'
    });
};

module.exports = errorHandler;

