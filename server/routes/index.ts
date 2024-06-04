import { Router } from 'express';
import auth from './routers/auth';
/*
 * all the routes for features
 */
const postsRouter = require('./routers/posts.ts');
const usersRouter = require('./routers/users.ts');

const api = Router();

api.use('/posts', postsRouter);
api.use('/users', usersRouter);

api.use('/', auth);

export default api;
