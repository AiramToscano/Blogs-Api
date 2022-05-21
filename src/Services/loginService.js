const { User } = require('../database/models');
const { createJWT } = require('../utils/createJWT');

const erroLogin = {
    error: 400,
    message: 'Invalid fields',
};

const findUsers = async (emailLogin, passwordLogin) => {
    const findUser = await User.findOne({ where: { email: emailLogin, password: passwordLogin } });
    if (!findUser) {
     throw erroLogin;
    }
    const token = createJWT(emailLogin);
    return token;
  };

module.exports = {
    findUsers,
};