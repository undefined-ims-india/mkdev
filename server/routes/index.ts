import { Router } from 'express';
import messages from './messages';
import conversations from './conversations';
import posts from './routers/posts';
import blogs from './routers/blogs';
import users from './routers/users';
import search from './routers/search';
import feed from './routers/feed';

const api = Router();

api.use('/posts', posts);
api.use('/users', users);
api.use('/blogs', blogs);

api.use('/messages', messages);
api.use('/conversations', conversations);
api.use('/search', search);
api.use('/feed', feed);

export default api;
