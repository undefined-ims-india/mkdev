import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const conversations = Router();
const prisma = new PrismaClient();

// Conversations routes

conversations.get('/', async (req, res) => {
  const allConversations = await prisma.conversations.findMany();
  res.status(200).send(allConversations);
});

conversations.post('/', async (req: Request, res: Response) => {
  const { sender } = req.body; // TODO: from request after Auth0

  // a conversation is created, then the id is sent back to frontend
  prisma.conversations.create({})
    .then(({ id }) => {
      res.status(201).send(JSON.stringify(id));
    })
    .catch((err: Error) => {
      console.error('Failed to create new conversation', err);
      res.sendStatus(500);
    });

})

export default conversations;