import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const messages = Router();
const prisma = new PrismaClient();

messages.get('/', async (req, res) => {
  const allMessages = await prisma.messages.findMany();
  res.status(200).send(allMessages);
});

messages.post('/', (req: Request, res: Response) => {
  res.sendStatus(201);
})

export default messages;