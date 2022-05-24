const express = require('express');
const { validLogin } = require('../middleware/loginmiddleware');
const { getUser } = require('../controllers/logincontrollers');

const routerLogin = express.Router();

routerLogin.post('/', validLogin, getUser);

module.exports = routerLogin;
