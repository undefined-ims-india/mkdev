import path from 'path';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import session from 'express-session';
import passport, { Done } from 'passport';
import { LocalStrategy } from 'passport-local';
import { GoogleStrategy, Profile } from 'passport-google-oauth20';
import bcrypt from 'bcryptjs';

import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const distPath = path.resolve(__dirname, '../dist');

const app = express();

app.use(
  session({
    secret: 'your-session-secret',
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

// Init passport
app.use(passport.initialize());
// restore authentication state if there was previously a login session
app.use(passport.session());

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

//Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    // Fetch user and validate credentials as before
    // Here, you should fetch the user from your database using the username
    // For the sake of this example, let's assume you have a function `findUserByUsername` that does this
    const user = await findUserByUsername(username);

    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    // Compare the provided password with the stored hash
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  })
);

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: Done
    ) => {
      console.log(profile.photos[0].value);
      try {
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              picture: profile.photos[0].value.toString(),
            },
          });
        }

        done(null, user);
      } catch (err) {
        console.error('Failed to find or create user:', err);
        done(err);
      }
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
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// Serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  // Here, you should fetch the user from your database using the id
  // For the sake of this example, let's assume you have a function `findUserById` that does this
  const user = await findUserById(id);
  done(null, user);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));

app.use('/', routes);

app.listen(3000, () => {
  console.log(`\
  \nCheck it out:\
  \nhttp://127.0.0.1:3000 |\
  http://localhost:3000
  `);
});
