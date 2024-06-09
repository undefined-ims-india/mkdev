import path from 'path';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import app from './index';

const GoogleStrategy = require('passport-google-oauth20').Strategy;

import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const CLIENT = path.resolve(__dirname, '../dist');

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

//Local Strategy
// passport.use(
//   new LocalStrategy(async (username, password, done) => {}))

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken: string, refreshToken: string, profile: any, done: any) => {
      prisma.user
        .findUnique({
          where: { googleId: profile.id },
        })
        .then((user) => {
          console.log(user);
          if (!user) {
            return prisma.user.create({
              data: {
                googleId: profile.id,
                // picture:,
              },
            });
          }
          done(null, user);
        })
        .catch((err) => {
          console.error('Failed to find or create user:', err);
          done(err);
        });
    }
  )
);

// Auth Routes
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/',
  })
);

app.get('/login', (req, res) => {
  res.render('login');
});

// Serialization
passport.serializeUser((user: any, done) => {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  prisma.user
    .findUnique({
      where: { id: Number(id) },
    })
    .then((user: User | null) => done(null, user))
    .then((data) => console.log(data))
    .catch((err) => done(err)); //console.error('Failed to deserialize User:', err));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(CLIENT, 'index.html'));
});

export default passport;
