import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const conversations = Router();
const prisma = new PrismaClient();

// type message = {
//   body: string;
// }

// Messages routes

conversations.get('/', async (req, res) => {
  const allConversations = await prisma.conversations.findMany();
  res.status(200).send(allConversations);
});

conversations.post('/', async (req: Request, res: Response) => {
  // const { body, sender, conversation } = req.body.message;

  await prisma.conversations.create({})

  res.sendStatus(201);
})

export default conversations;