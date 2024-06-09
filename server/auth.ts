import passport, { serializeUser } from 'passport';
import app from './index';

const GoogleStrategy = require('passport-google-oauth20').Strategy;

import { PrismaClient, User } from '@prisma/client';
import { NextFunction } from 'express';
const prisma = new PrismaClient();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

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
    (accessToken: any, refreshToken: any, profile: any, next: NextFunction) => {
      prisma.user
        .findUnique({
          where: { googleId: profile.id },
        })
        .then((user: User | null) => {
          if (!user) {
            return prisma.user.create({
              data: {
                id: profile.id,
                googleId: profile.sub,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                picture: profile.picture,
                username: profile.nickname,
              },
            });
          }
          next(JSON.stringify(user));
        })
        .catch((err) => {
          console.error('Failed to find or create user:', err);
          next(err);
        });
    }
  )
);

// Serialization
passport.serializeUser((user: any, done) => {
  console.log('serializeUser', user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  prisma.user
    .findUnique({
      where: { id: Number(id) },
    })
    .then((user: User | null) => done(null, user))
    .then((data) => console.log('deserialize User', data))
    .catch((err) => {
      console.error('Failed to deserialize User:', err);
      done(err);
    });
});

export default passport;
