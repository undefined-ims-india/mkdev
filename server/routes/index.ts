import { Router } from 'express';
import messages from './messages';
import conversations from './conversations';
import posts from './routers/posts';
import users from './routers/users';

const api = Router();

api.use('/posts', posts);
api.use('/users', users);

api.use('/messages', messages);
api.use('/conversations', conversations);

export default api;
