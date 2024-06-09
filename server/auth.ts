import path from 'path';
import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;

import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const CLIENT = path.resolve(__dirname, '../dist');

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
          where: { googleId: user.googleId },
        })
        .then((user) => {
          console.log('auth user', user); // Undefined...
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

export default passport;
