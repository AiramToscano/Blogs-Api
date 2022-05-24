const express = require('express');
const { verifydisplayName,
  verifyEmail,
  verifyPassword, verifyEmailExist } = require('../middleware/usermiddleware');
const { createUsers, getUsers, 
  getUserById, deleteusers } = require('../controllers/usercontrollers');
const { authToken, validToken } = require('../middleware/authToken');

const routerUser = express.Router();

routerUser.get('/:id', authToken, validToken, getUserById);
routerUser.delete('/:id', authToken, validToken, deleteusers);
routerUser.post('/', verifydisplayName, verifyEmail, 
verifyPassword, verifyEmailExist, createUsers);
routerUser.get('/', authToken, validToken, getUsers);

module.exports = routerUser;
