const { Router } = require('express')
/*
* all the routes for features
*/
const postsRouter = require('./routers/posts.ts')

const api = Router();

// api.use(/*'/something', model? */)
api.use('/posts', postsRouter);

// export default api
module.exports = api