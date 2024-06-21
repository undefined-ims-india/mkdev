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

// update liked status on specific message
messages.patch('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { liked }: { liked: boolean } = req.body;

  prisma.messages.update({
    where: { id: +id },
    data: {
      liked: liked
    }
  })
  .then(() => {
    res.sendStatus(201);
  })
  .catch((err) => {
    console.error('Failed to update like field', err);
  })
})

// delete specific message
messages.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  prisma.messages.delete({
    where: { id: +id }
  })
  .then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.error('Failed to delete message', err)
  });
})

export default messages;