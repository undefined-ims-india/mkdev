import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const messages = Router();
const prisma = new PrismaClient();

messages.get('/:conversationId', async (req, res) => {
  const { conversationId } = req.params;

  const allMessages = await prisma.messages.findMany({
    where: {
      conversationId: +conversationId,
    }
  });
  res.status(200).send(allMessages);
});

messages.post('/:conversationId', (req: Request, res: Response) => {
  const { body, sender } = req.body.message;
  const conversationId: number = +req.params.conversationId;

  // create message with data from request body and params
  prisma.messages.create({
    data: {
      body,
      sender: {
        connect: { id: sender }
      },
      conversation: {
        connect: { id: conversationId }
      }
    }
  })
  .then(() => { res.sendStatus(201) })
  .catch((err: Error) => {
    console.error('Failed to create new message:\n', err);
    res.sendStatus(500);
  });

})

export default messages;