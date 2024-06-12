import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const conversations = Router();
const prisma = new PrismaClient();

// Conversations routes

// get conversations per user
conversations.get('/', async (req: any, res: Response) => {
  console.log('req from messages load:', req.user);
  // i want a list of conversations that have at least one match for the user.
  // use `some` option to filter records by the properties of related records on the "-to-many" side of the relation
  if (req.user !== undefined) {
    // use req.user.id for findMany query in _ConversationsToUsers table
    const allConversations = await prisma.conversations.findMany({
      where: {
        participants: {
          some: {
            id: {
              equals: req.user.id // TODO: req.user.id
            }
          }
        }
      },
      orderBy: {
        id: 'desc'
      }
    });
    res.status(200).send(allConversations);
  } else {
    res.status(200).send('You must be logged in to view direct messages');
  }

});

conversations.post('/', async (req: Request, res: Response) => {
  const { user } = req; // sends the message
  const { receivers } = req.body; // many receive the message
  console.log('req.user', user);

  // receivers can be an array of objects with usernames from add convo input
  //  object.username would have to be matched to get a user's id to then add into the nested connect query

  // make an array to use for the connect query
  const participants = /* array of user id objects */[];

  // a conversation is created, then the id is sent back to frontend
  prisma.conversations.create({
    data: {
      participants: {
        connect: [{ id: 5 }, { id: 6 }]
        // connect: participants,
      }
    }
  })
    .then((conversation) => {
      console.log(conversation);
      res.status(201).send(conversation);
    })
    .catch((err: Error) => {
      console.error('Failed to create new conversation', err);
      res.sendStatus(500);
    });

});

// .patch -> delete a specific message from conversation? NO because if delete message, relationship will be gone

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