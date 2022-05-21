const jwt = require('jsonwebtoken');

const authToken = async (req, res, next) => {
    try {
    const token = req.headers.authorization;
    if (!token) {
       return res.status(401).json({ message: 'Token not found' });
    }
    next();
} catch (err) {
        res.status(500).json(err.message);
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

module.exports = {
    authToken,
    validToken,
};