// passportConfig.ts
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
// import crypto from 'crypto';
import bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET || '';
const CALLBACK_URL: string = process.env.CALLBACK_URL || '';

//* GoogleStrategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    (accessToken: string, refreshToken: string, profile: any, done: any) => {
      const { name, given_name, family_name, sub, picture, email } =
        profile._json;
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

//* LocalStrategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        console.log('user', user);
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        const isMatch = await bcrypt.compare(password, user.password || '');
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
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
  } catch (error) {
    done(error, null);
  }
});

export default function initializePassport() {}
