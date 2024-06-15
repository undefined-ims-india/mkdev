import express, { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const feed = Router();
const prisma = new PrismaClient();

feed.get('/', async (req: any, res: any):Promise<void> => {
  try{
    const allPosts = await prisma.post.findMany(
      {
        include: {
          author: true,
        tags: true,
        },
        orderBy: [
          {
            createdAt: 'desc'
          }
        ]
      }
    );
    res.send(allPosts);
  }
  catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
  finally {
    await prisma.$disconnect();
  }
})

export default feed;