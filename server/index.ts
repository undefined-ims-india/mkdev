import path from 'path';
import dotEnv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { auth, requiresAuth } from 'express-openid-connect';
import routes from './routes';

const { CLIENT_ID, SECRET, PORT = 3000 } = process.env;

dotEnv.config();
const CLIENT = path.resolve(__dirname, '..', 'dist');

const app = express();
const socket = express();
const server = createServer(socket);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: [`http://localhost:${PORT}`, `http://127.0.0.1:${PORT}`],
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(CLIENT));

/*** AUTH ***/
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: `http://localhost:${PORT}`,
  clientID: CLIENT_ID,
  secret: SECRET,
  issuerBaseURL: 'https://dev-uatvgw7p2cq7mmm0.us.auth0.com',
};

// * Auth * //
//Everything below this middleware will require authentication to access
app.use(auth(config));
/**********************/

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.user = req.oidc.user;
  next();
});
// get the logged in user
app.get('/user', requiresAuth(), (req: any, res: any) => {
  res.send(req.oidc.user);
});

// get logged in user profile
// * Must be /profile for Auth0 to work
app.get('/profile', requiresAuth(), (req: any, res: any) => {
  const user = req.oidc.user;
  const currentUser = {
    name: user.name,
    email: user.email,
    picture: user.picture,
  };
  res.send(JSON.stringify(currentUser, null, 2));
});
app.use('/api', routes);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(CLIENT, 'index.html'));
});
// * Auth * //

// socket handling ----------------------------------------- //
io.on('connection', (socket) => {

  // on 'message' event
  socket.on('message', (message) => {
    // broadcast message to all clients
    io.emit('message', message);
  });

  socket.on('add-conversation', () => {
    io.emit('add-conversation');
  })

  // on disconnection
  socket.on('disconnect', () => {
  });
});
// socket handling ----------------------------------------- //

// websocket server
io.listen(4000);

app.listen(PORT, () => {
  console.info(`\nhttp://localhost:${PORT}\nhttp://127.0.0.1:${PORT}`);
});

export default app;
