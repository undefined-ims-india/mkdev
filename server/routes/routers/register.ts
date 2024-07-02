import { Router } from 'express';
import bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const init = Router();

// Bcrypt salting rounds for user's password
const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');

// Verification for password strength
const passwordStrength = (password: string): boolean =>
  password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password);

init.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Check password strength
  if (!passwordStrength(password)) {
    return res
      .status(400)
      .send({ error: 'Password does not meet strength requirements' });
  }

  try {
    // Hashing set to length of saltrounds for additional security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        username: `user-${crypto.randomUUID()}`,
        name: 'John Doe',
        firstName: 'John',
        lastName: 'Doe',
        email,
        password: hashedPassword,
      },
    });

    req.login(user, (err) => {
      if (err) {
        return res.status(400).send('Failed to log in user');
      }
      res.redirect('/login');
    });
  } catch (error) {
    res.status(500).send({ error: 'Failed to register new user' });
  }
});

export default init;

/*
 * Additional things to add later:
 * - Add validation for email -> nodemailer
 * - Password reset functionality
 * - Password recovery functionality
 */
