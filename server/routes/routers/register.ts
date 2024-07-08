import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const register = Router();

// Bcrypt salting rounds for user's password
const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');

// Verification for password strength
const passwordStrength = (password: string): boolean =>
  password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password);

// Validation for user
const validateUser = ({
  email,
  password,
  username,
  name,
  firstName,
  lastName,
}: any): string | null => {
  // Check if all required fields are provided
  if (!email || !password || !username || !name || !firstName || !lastName) {
    return 'Please provide all required fields.';
  }
  // Check password strength
  if (!passwordStrength(password)) {
    return 'Password does not meet strength requirements.';
  }
  return null;
};

register.post('/', async (req: any, res: any) => {
  const { email, password, username, name, firstName, lastName } = req.body;

  const validation = validateUser(req.body);
  if (validation) {
    return res.status(400).send('Failed to validate user');
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).send('User already exists with this email');
    } else {
      // Hashing set to length of saltrounds for additional security
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await prisma.user.create({
        data: {
          username,
          name,
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      });

      req.login(user, (err: any) => {
        if (err) {
          return res.status(400).send('Failed to log in user');
        }
        return res.redirect('/login');
      });
    }
  } catch (err) {
    return res.status(500).send('Failed to register new user');
  }
});

export default register;

/*
 * Additional things to add later:
 * - Add validation for email -> nodemailer
 * - Password reset functionality
 * - Password recovery functionality
 */
