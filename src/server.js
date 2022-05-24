require('dotenv').config();
const app = require('./api');
const routeCategories = require('./routes/routeCategories');
const routeLogin = require('./routes/routeLogin');
const routePost = require('./routes/routePost');
const routeUser = require('./routes/routeUser');
// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log('ouvindo porta', port));

app.use('/categories', routeCategories);
app.use('/login', routeLogin);
app.use('/post', routePost);
app.use('/user', routeUser);