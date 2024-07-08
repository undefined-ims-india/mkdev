import path from 'path';
import dotEnv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import routes from './routes';
import fileUpload from 'express-fileupload';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import initializePassport from './routes/routers/auth';

const PORT = process.env.PORT || 3000;
const WS_PORT = process.env.WS_PORT || 4000;
const CLIENT = path.resolve(__dirname, '..', '..');
const PUBLIC = path.resolve(__dirname, '.', 'public');

dotEnv.config();

const app = express();

const SESSION_SECRET: string = process.env.SESSION_SECRET || '';

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  })
);

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //parses incoming requests with URL-encoded payloads.
app.use(express.static(CLIENT));
app.use(cookieParser());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/img', express.static(PUBLIC));
app.use('/api', routes);

// Auth Routes
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

app.get('/login', (req: Request, res: Response) => {
  res.redirect('/login');
});

app.post('/logout', (req: Request, res: Response, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(CLIENT, 'index.html'));
});

const socket = express();
const server = createServer(socket);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: [
      `http://localhost:${PORT}`,
      `http://127.0.0.1:${PORT}`,
      `http://ec2-3-19-237-1.us-east-2.compute.amazonaws.com:${PORT}/`,
    ],
    methods: ['GET', 'POST'],
  },
});

// socket handling ----------------------------------------- //
io.on('connection', (socket) => {
  // on 'message' event
  socket.on('message', (message) => {
    // broadcast message to all clients
    io.emit('message', message);
  });

  socket.on('add-conversation', () => {
    io.emit('add-conversation');
  });

  socket.on('read-message', () => {
    io.emit('read-message');
  })

   // on disconnection
  socket.on('disconnect', () => {});
});
// socket handling ----------------------------------------- //
// websocket server
io.listen(+WS_PORT);

app.listen(PORT, () => {
  console.info(`\nhttp://localhost:${PORT}\nhttp://127.0.0.1:${PORT}`);
});
export default app;
