import passport from 'passport';
import { NextFunction, Router } from 'express';
import { PrismaClient } from '@prisma/client';

const users = Router();
const prisma = new PrismaClient();

users.post('/', (req: any, res: any) => {
  const {
    newUser,
  }: { newUser: { name: string; firstName: string; lastName: string, username:string } } =
    req.body;
  prisma.user
    .create({ data: newUser })
    .then((user: any) => {
      console.log(user);
      res.sendStatus(201);
    })
    .catch((err: { name: string }) => {
      console.error(err);
      res.sendStatus(500);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

users.get('/', (req: any, res: any) => {
  prisma.user
    .findMany()
    .then((users: {}[]) => {
      res.send(users);
    })
    .catch((err: { name: string }) => {
      console.error(err);
      res.sendStatus(500);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

// Authenticated route to verify a user is logged in
users.get('/loggedIn', (req: any, res: any) => {
  const user = req.user;
  if (req.isAuthenticated()) {
    return res.json(user);
  } else {
    console.error('Please Log in'), res.sendStatus(401);
  }
});

// Get user by id

users.get('/:id', (req: any, res: any) => {
  const { id } = req.params;
  // console.log('user id', +id);
  prisma.user
    .findUnique({
      where: { id: +id },
    })
    .then((user: any) => {
      res.status(200).send(user);
    })
    .catch((err: any) => {
      console.error('Failed to get user:', err);
      res.sendStatus(500);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

export default users;
