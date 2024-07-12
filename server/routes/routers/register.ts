import { Router } from 'express';
import bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const register = Router();
const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');

const passwordStrength = (password: string): boolean =>
  password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password);

register.post('/auth/register', async (req: any, res: any) => {
  const { email, password, username, name, firstName, lastName } = req.body; // *  picture?

  if (!passwordStrength(password)) {
    return 'Password does not meet strength requirements.';
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.sendStatus(400);
    } else {
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

      res
        .status(201)
        .json({ id: user.id, email: user.email, username: user.username });
    }
  } catch (err) {
    console.error('Failed to register user:', err);
    res.sendStatus(500);
  }
});

export default register;

/*
 * Additional things to add later:
 * - Add validation for email -> nodemailer
 * - Password reset functionality
 * - Password recovery functionality
 */
