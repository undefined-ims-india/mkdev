import { Router } from 'express';
/*
* all the routes for features
*/

import messages from './messages';
import conversations from './conversations';
const postsRouter = require('./routers/posts.ts')
const usersRouter = require('./routers/users.ts')

const api = Router();

// api.use(/*'/something', model? */)
api.use('/posts', postsRouter);
api.use('/users', usersRouter);
api.use('/messages', messages);
api.use('/conversations', conversations);

// export default api
export default api;