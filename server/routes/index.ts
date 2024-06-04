import { Router } from 'express';
/*
 * all the routes for features
 */
const postsRouter = require('./routers/posts.ts');
const usersRouter = require('./routers/users.ts');
* all the routes for features
*/

import messages from './messages';
const postsRouter = require('./routers/posts.ts')
const usersRouter = require('./routers/users.ts')

const api = Router();

api.use('/posts', postsRouter);
api.use('/users', usersRouter);
api.use('/messages', messages);

// export default api
export default api;