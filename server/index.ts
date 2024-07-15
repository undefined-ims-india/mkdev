import path from 'path';
import dotEnv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import { createServer } from 'node:https';
import { Server } from 'socket.io';
import routes from './routes';
import fileUpload from 'express-fileupload';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import initializePassport from './routes/routers/auth';
import registration from './routes/routers/register';

const PORT = process.env.PORT || 3000;
const CLIENT = path.resolve(__dirname, '..', '..');
const PUBLIC = path.resolve(__dirname, '.', 'public');

dotEnv.config();

const app = express();

const SESSION_SECRET: string = process.env.SESSION_SECRET || '';

app.use(
  cors({
    origin: [
      `http://localhost:${PORT}`,
      `http://127.0.0.1:${PORT}`,
      `https://mkdev.dev`,
    ],
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  })
);

app.use(fileUpload());
app.use(express.json());
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

//**Auth Routes**\\
app.use(registration);

//* Google
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

//* Local
app.post(
  '/auth/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
);

app.post('/auth/logout', (req: Request, res: Response, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});
//**End Auth Routes**\\

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(CLIENT, 'index.html'));
});

// socket.io server
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: [
      `http://localhost:${PORT}`,
      `http://127.0.0.1:${PORT}`,
      `18.224.139.2:${PORT}`, // aws instance public IP
      `https://mkdev.dev/`,
      `http://mkdev.dev/`,
      `mkdev.dev`,
      `www.mkdev.dev`
    ],
    methods: ['GET', 'POST'],
    credentials: true,
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
  });

  // on disconnection
  socket.on('disconnect', () => {});

  socket.on("connection_error", (err) => {
    console.error(err.req);
    console.error(err.code);
    console.error(err.message);
    console.error(err.context);
  });
});
// socket handling ----------------------------------------- //

// socket.io listening
io.listen(4000);

app.listen(PORT, () => {
  console.info(`\nhttp://localhost:${PORT}\nhttp://127.0.0.1:${PORT}`);
});
export default app;
