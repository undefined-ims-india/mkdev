import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const prisma = new PrismaClient();
const posts = Router();

posts.post('/', (req: any, res: any) => {
  const { newPost }: { newPost: { body: string } } = req.body;
  console.log(newPost);
  res.end();
});

posts.get('/', async (req: any, res: any) => {
  const post = await prisma.post.findMany();
  res.status(200).send(post);
});

module.exports = posts;
