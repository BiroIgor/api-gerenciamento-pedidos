const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticação JWT
 * Verifica se o token JWT é válido nas requisições protegidas
 */
const authenticateToken = (req, res, next) => {
    // Pega o token do header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Token de acesso não fornecido. Use: Authorization: Bearer <token>'
        });
    }

    try {
        // Verifica e decodifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jitterbit-secret-key-change-in-production');
        
        // Adiciona os dados do usuário ao request
        req.user = decoded;
        
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Token expirado. Faça login novamente.'
            });
        }
        
        return res.status(403).json({
            error: 'Forbidden',
            message: 'Token inválido ou malformado.'
        });
    }
};

module.exports = {
    authenticateToken
};

