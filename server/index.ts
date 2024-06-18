import path from 'path';
import dotEnv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import routes from './routes';
import fileUpload from 'express-fileupload';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import { Strategy } from 'passport-google-oauth20';
import cookieParser from 'cookie-parser';

const GoogleStrategy = Strategy;
const prisma = new PrismaClient();

const PORT = 3000 || process.env.PORT;
const CLIENT = path.resolve(__dirname, '..', 'dist');

dotEnv.config();

const app = express();

const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET || '';
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
// app.use(express.urlencoded({ extended: true })); //parses incoming requests with URL-encoded payloads.
app.use(express.static(CLIENT));
app.use(cookieParser());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken: string, refreshToken: string, profile: any, done: any) => {
      const { name, given_name, family_name, sub, picture } = profile._json;
      prisma.user
        .findUnique({
          where: { googleId: sub },
        })
        .then((user) => {
          if (!user) {
            return prisma.user
              .create({
                data: {
                  googleId: sub,
                  username: `user-${crypto.randomUUID()}`,
                  name: name,
                  firstName: given_name,
                  lastName: family_name,
                  picture: picture,
                },
              })
              .then((newUser) => {
                done(null, newUser);
              });
          } else {
            done(null, user);
          }
        })
        .catch((err) => {
          console.error('Failed to find or create user:', err);
          done(err);
        });
    }
  )
);

// Serialization
passport.serializeUser((user: any, done) => {
  done(null, {
    id: user.id,
    username: user.username,
    picture: user.picture,
  });
});

passport.deserializeUser(async (serializedUser: { id: number }, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: serializedUser.id },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

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
  res.render('login');
});

app.post('/logout', function (req: Request, res: Response, next: NextFunction) {
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
  // on disconnection
  socket.on('disconnect', () => {});
});
// socket handling ----------------------------------------- //
// websocket server
io.listen(4000);

app.listen(PORT, () => {
  console.info(`\nhttp://localhost:${PORT}\nhttp://127.0.0.1:${PORT}`);
});
export default app;
