import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const messages = Router();
const prisma = new PrismaClient();

// type message = {
//   body: string;
// }

// Messages routes

messages.get('/', async (req, res) => {
  const allMessages = await prisma.messages.findMany();
  res.status(200).send(allMessages);
});

messages.post('/', async (req: Request, res: Response) => {
  const { 
    body,
    senderId,
    sender,
    conversationId,
    conversation
  } = req.body.message;
  // const { username } = req.body.user;

  // query database for sender user id,
  let user = await prisma.user.findUnique({
    where: {
      username: 'mikesamm'
    },
  })
  console.log('user', user);
  // query database for conversation id?
  // then create message based on those ids (bc they should have
  //    correct type like that?)

  await prisma.messages.create({
    data: {
      body,
      senderId: user?.id,
      sender,
      conversationId,
      conversation,
    }
  })

  res.sendStatus(201);
})

export default messages;