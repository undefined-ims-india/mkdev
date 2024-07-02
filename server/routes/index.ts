import { Router } from 'express';
import messages from './messages';
import conversations from './conversations';
import posts from './routers/posts';
import users from './routers/users';
import search from './routers/search';
import feed from './routers/feed';
import repos from './routers/repos';
import follows from './routers/follows';
import tags from './routers/tags';
import register from './routers/register';

const api = Router();

api.use('/posts', posts);
api.use('/users', users);
api.use('/follows', follows);
api.use('/register', register);
api.use('/repos', repos);
api.use('/messages', messages);
api.use('/conversations', conversations);
api.use('/search', search);
api.use('/tags', tags);
api.use('/feed', feed);

export default api;
