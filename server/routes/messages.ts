import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const messages = Router();
const prisma = new PrismaClient();

// create a message
messages.post('/:conversationId', async (req: Request, res: Response) => {
  const { body, sender } = req.body.message;
  const conversationId: number = +req.params.conversationId;

  // find participants and store recipients in variable
  const participants = await prisma.conversations.findFirst({
    where: {
      id: conversationId,
    },
    select: {
      participants: {
        select: {
          id: true
        }
      }
    }
  })
  const recipients = participants?.participants.filter(user => user.id !== sender);

  // create message with data from request body and params
  prisma.messages.create({
    data: {
      body,
      sender: {
        connect: { id: sender }
      },
      conversation: {
        connect: { id: conversationId }
      },
      unreadBy: {
        connect: recipients
      }
    },
    include: {
      sender: {
        select: {
          username: true,
          picture: true,
        }
      },
      unreadBy: true
    }
  })
  .then((data) => {
    res.status(201).send(data);
  })
  .catch((err: Error) => {
    console.error('Failed to create new message:\n', err);
    res.sendStatus(500);
  });

})

// get all messages in a conversation
messages.get('/:conversationId', async (req, res) => {
  const { conversationId } = req.params;

  const allMessages = await prisma.messages.findMany({
    where: {
      conversationId: +conversationId,
    },
    include: {
      sender: {
        select: {
          username: true,
          picture: true,
        }
      }
    }
  });
  res.status(200).send(allMessages);
});

// get all unread messages in a conversation, per logged in user
messages.get('/unread/:conversationId/:userId', async(req, res) => {
  const { conversationId, userId } = req.params;

  const unreadMessages = await prisma.messages.findMany({
    where: {
      conversationId: +conversationId,
    },
    select: {
      unreadBy: {
        where: {
          id: +userId
        }
      }
    }
  })

  const totalUnreadMessages = unreadMessages.filter((obj) => {
    return obj.unreadBy.length > 0;
  }).length

  res.status(200).send(JSON.stringify(totalUnreadMessages));
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
    console.error('Failed to update like field:\n', err);
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
    console.error('Failed to delete message:\n', err)
  });
})

export default messages;