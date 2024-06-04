import { Router } from 'express';
import auth from './routers/auth';
import messages from './messages';
const postsRouter = require('./routers/posts.ts');
const usersRouter = require('./routers/users.ts');

const api = Router();

api.use('/posts', postsRouter);
api.use('/users', usersRouter);
api.use('/messages', messages);

api.use('/', auth);

// export default api
export default api;
