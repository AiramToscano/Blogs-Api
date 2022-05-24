const express = require('express');
const { authToken, validToken } = require('../middleware/authToken');
const { verifyNameCategorie } = require('../middleware/categoriesmiddleware');
const { createCategorys, getCategorys } = require('../controllers/categorycontrollers');

const routerCategories = express.Router();

routerCategories.post('/', authToken, validToken, verifyNameCategorie, createCategorys);
routerCategories.get('/', authToken, validToken, getCategorys);

module.exports = routerCategories;