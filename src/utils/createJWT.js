const jwt = require('jsonwebtoken');
const jwtConfig = require('../database/config/jwtConfig');

const createJWT = async (emailLogin) => {
    const token = jwt.sign({ data: emailLogin }, process.env.JWT_SECRET, jwtConfig.configs);
    return token;
  };

module.exports = {
    createJWT,
};