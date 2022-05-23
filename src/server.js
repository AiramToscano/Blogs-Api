require('dotenv').config();
const app = require('./api');
const { validLogin } = require('./middleware/loginmiddleware');
const { getUser } = require('./controllers/logincontrollers');
const { verifydisplayName,
  verifyEmail,
  verifyPassword, verifyEmailExist } = require('./middleware/usermiddleware');
const { createUsers, getUsers, getUserById } = require('./controllers/usercontrollers');
const { authToken, validToken } = require('./middleware/authToken');
const { verifyNameCategorie } = require('./middleware/categoriesmiddleware');
const { createCategorys, getCategorys } = require('./controllers/categorycontrollers');
const { validpostFields, validCategoryIds } = require('./middleware/postmiddleware');
const { createPosts, getPost, getPostId } = require('./controllers/postcontrollers');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log('ouvindo porta', port));
app.post('/login', validLogin, getUser);
app.post('/user', verifydisplayName, verifyEmail, 
verifyPassword, verifyEmailExist, createUsers);
app.get('/user', authToken, validToken, getUsers);
app.get('/user/:id', authToken, validToken, getUserById);
app.post('/categories', authToken, validToken, verifyNameCategorie, createCategorys);
app.get('/categories', authToken, validToken, getCategorys);
app.post('/post', authToken, validToken, validpostFields, validCategoryIds, createPosts);
app.get('/post', authToken, validToken, getPost);
app.get('/post/:id', authToken, validToken, getPostId);
