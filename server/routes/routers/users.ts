import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const users = Router();
const prisma = new PrismaClient();

users.post('/', (req: any, res: any) => {
  const { newUser }: { newUser: { firstName: string; lastname: string } } =
    req.body;
  prisma.user
    .create({ data: newUser })
    .then((user: any) => {
      console.log(user);
      res.sendStatus(201);
    })
    .catch((err: string) => {
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
    .catch((err: string) => {
      console.error(err);
      res.sendStatus(500);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

module.exports = users;
