import { Router, Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';

const conversations = Router();
const prisma = new PrismaClient();

// Conversations routes

// create a conversation
conversations.post('/', async (req: any, res: Response) => {
  const { user } = req; // sends the message
  // const { participants, label } = req.body;
  const { participants } = req.body;

  // map new array from submitted usernames
  const connectArr = participants.map((user: User) => {
    return { id: user.id }
  })

  // a conversation is created, then the id is sent back to frontend
  prisma.conversations.create({
    data: {
      participants: {
        connect: [ { id: user.id }, ...connectArr],
      },
    },
    include: {
      participants: {
        select: {
          username: true,
        }
      },
    }
  })
  .then((conversation) => {
    res.status(201).send(conversation);
  })
  .catch((err: Error) => {
    console.error('Failed to create new conversation', err);
    res.sendStatus(500);
  });

});

// get conversations per logged in user
conversations.get('/', async (req: any, res: Response) => {

  if (req.user !== undefined) {
    // find many conversation IDs associated with logged in user
    const allConversations = await prisma.conversations.findMany({
      where: {
        participants: {
          some: {
            id: {
              equals: req.user.id
            }
          }
        }
      },
      include: {
        participants: {
          select: {
            id: true,
            username: true,
          }
        }
      },
      orderBy: {
        id: 'desc'
      }
    });
    res.status(200).send(allConversations);
  } else {
    res.status(401).send('You must be logged in to view direct messages');
  }

});

conversations.get('/label/:id', (req: any, res: any) => {
  const { id } = req.params;
  // generate label for conversation
  prisma.conversations.findFirst({
    where: {
      id: +id
    },
    select: {
      participants: true
    }
  })
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    console.error('Failed to get conversation label', err);
    res.sendStatus(500);
  })
})

// delete a specific conversation
conversations.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  // delete a specific conversation
  prisma.conversations.delete({
    where: {
      id: +id
    }
  })
  .then(() => {
    res.sendStatus(204);
  })
  .catch((err) => {
    console.error('Failed to delete conversation', err)
    res.sendStatus(500);
  })
});

export default conversations;