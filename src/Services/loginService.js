const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const jwtConfig = require('../database/config/jwtConfig');

const erroLogin = {
    error: 400,
    message: 'Invalid fields',
};

const findUsers = async (emailLogin, passwordLogin) => {
    const findUser = await User.findOne({ where: { email: emailLogin, password: passwordLogin } });
    if (!findUser) {
     throw erroLogin;
    }
    const token = jwt.sign({ data: emailLogin }, process.env.JWT_SECRET, jwtConfig.configs);
    return token;
  };

module.exports = {
    findUsers,
};