const jwt = require('jsonwebtoken');
const jwtConfig = require('../database/config/jwtConfig');

const authToken = async (req, res, next) => {
    try {
    const token = req.headers.authorization;
    if (!token) {
       return res.status(401).json({ message: 'Token not found' });
    }
    next();
} catch (err) {
       return res.status(500).json(err.message);
    }
};

const validToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) return next();
        } catch (err) {
            return res.status(401).json({ message: 'Expired or invalid token' });
        }
};

const decodedToken = async (token) => {
        const decoded = jwt.decode(token, process.env.JWT_SECRET, jwtConfig.configs.algorithm);
        return decoded;  
};

module.exports = {
    authToken,
    validToken,
    decodedToken,
};