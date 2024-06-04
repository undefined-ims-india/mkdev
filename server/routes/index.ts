const { Router } = require('express')
/*
* all the routes for features
*/
const messages = require('./messages.ts')
const postsRouter = require('./routers/posts.ts')
const usersRouter = require('./routers/users.ts')

const api = Router();
const routeHandler = Router();

// api.use(/*'/something', model? */)
api.all('/messages', messages);
api.use('/posts', postsRouter);
api.use('/users', usersRouter);

// export default api
module.exports = api