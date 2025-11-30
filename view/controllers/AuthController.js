const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * Controller de Autenticação
 * Gerencia login e geração de tokens JWT
 */

// Usuário padrão para demonstração (em produção, viria do banco de dados)
const DEFAULT_USER = {
    username: 'admin',
    password: '$2a$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq' // senha: admin123
};

/**
 * Faz login e retorna token JWT
 * POST /auth/login
 */
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Valida campos obrigatórios
        if (!username || !password) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Username e password são obrigatórios'
            });
        }

        // Em produção, buscar usuário do banco de dados
        // Por enquanto, usa usuário padrão para demonstração
        if (username !== DEFAULT_USER.username) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Credenciais inválidas'
            });
        }

        // Verifica senha (em produção, comparar hash do banco)
        // Para demonstração, aceita: admin / admin123
        const isValidPassword = username === 'admin' && password === 'admin123';

        if (!isValidPassword) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Credenciais inválidas'
            });
        }

        // Gera token JWT
        const token = jwt.sign(
            { 
                username: username,
                userId: 1 // Em produção, usar ID real do banco
            },
            process.env.JWT_SECRET || 'jitterbit-secret-key-change-in-production',
            { expiresIn: '24h' } // Token expira em 24 horas
        );

        return res.status(200).json({
            message: 'Login realizado com sucesso',
            token: token,
            expiresIn: '24h'
        });
    } catch (error) {
        console.error('Erro no controller ao fazer login:', error);
        next(error);
    }
};

/**
 * Verifica se o token é válido
 * GET /auth/verify
 */
const verify = async (req, res, next) => {
    try {
        // Se chegou aqui, o middleware de autenticação já validou o token
        return res.status(200).json({
            message: 'Token válido',
            user: req.user
        });
    } catch (error) {
        console.error('Erro no controller ao verificar token:', error);
        next(error);
    }
};

module.exports = {
    login,
    verify
};

