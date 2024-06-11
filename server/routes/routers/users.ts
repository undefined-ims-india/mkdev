import passport from 'passport';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const users = Router();
const prisma = new PrismaClient();

users.post('/', (req: any, res: any) => {
  const { newUser }: { newUser: { firstName: string; lastName: string } } =
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
const ensureAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.error('User is not authenticated'), res.sendStatus(401);
  }
};

users.get('/loggedIn', ensureAuthenticated, (req: any, res: any) => {
  const user = req.user;
  res.json(user);
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
