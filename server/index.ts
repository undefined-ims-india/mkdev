import path from 'path';
import dotEnv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from './auth';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import routes from './routes';
import fileUpload from 'express-fileupload';

const PORT = 3000 || process.env.PORT;

dotEnv.config();
const CLIENT = path.resolve(__dirname, '..', 'dist');

const app = express();

app.use(
  session({
    secret: 'Some really long string that no one will ever guess...',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const socket = express();
const server = createServer(socket);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(fileUpload());
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(express.static(CLIENT));

app.use('/api', routes);

// socket handling ----------------------------------------- //
io.on('connection', (socket) => {
  // console.log('A user has connected');

  // on disconnection
  socket.on('disconnect', (reason) => {
    // console.log('A user has disconnected');
  });

  // on 'message' event
  socket.on('message', (message) => {
    // console.log(`message: ${message}`);

    // broadcast message to all clients
    io.emit('message', message);
  });
});
// socket handling ----------------------------------------- //
// Auth Routes
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
);

app.get('/login', (req: Request, res: Response) => {
  res.render('login');
});

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(CLIENT, 'index.html'));
});
// websocket server
io.listen(4000);

app.listen(PORT, () => {
  console.info(`\nhttp://localhost:${PORT}\nhttp://127.0.0.1:${PORT}`);
});

export default app;
