import { Router } from 'express';
import messages from './messages';
import conversations from './conversations';
import posts from './routers/posts';
import blogs from './routers/blogs';
import users from './routers/users';
import search  from './routers/search';
import repos from './routers/repos';
// const postsRouter = require('./routers/posts.ts');
// const usersRouter = require('./routers/users.ts');

const api = Router();

api.use('/posts', posts);
api.use('/users', users);
api.use('/blogs', blogs);

api.use('/repos', repos);
api.use('/messages', messages);
api.use('/conversations', conversations);
api.use('/search', search);

export default api;
