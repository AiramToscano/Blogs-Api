const express = require('express');
const { authToken, validToken } = require('../middleware/authToken');
const { validpostFields, 
  validCategoryIds, validpostFieldsUpdate } = require('../middleware/postmiddleware');
const { createPosts, getPost, getPostId,
   updatePosts, deletePosts, searchPosts } = require('../controllers/postcontrollers');

const routerPost = express.Router();

routerPost.get('/', authToken, validToken, getPost);
routerPost.post('/', authToken, validToken, validpostFields, validCategoryIds, createPosts);
routerPost.get('/search', authToken, validToken, searchPosts);
routerPost.get('/:id', authToken, validToken, getPostId);
routerPost.put('/:id', authToken, validToken, validpostFieldsUpdate, updatePosts);
routerPost.delete('/:id', authToken, validToken, deletePosts);

module.exports = routerPost;
