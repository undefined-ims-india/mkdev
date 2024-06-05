import { Router, Request } from 'express';
const { PrismaClient } = require('@prisma/client');

const posts = Router();
const prisma = new PrismaClient();

const USER_ID = 3;

// add a post to logged in user
posts.post('/', (req: any, res: any) => {
  const { title, body }: { title: string; body: string } = req.body.newPost;
  prisma.post
    .create({
      data: { title, body, author: { connect: { id: USER_ID } } },
    })
    .then((post: any) => {
      console.log(post);
      res.sendStatus(201);
    })
    .catch((err: { name: string }) => {
      console.error(err);
      res.sendStatus(500);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

// get all users posts
posts.get('/', (req: any, res: any) => {
  prisma.post
    .findMany({ where: { userId: USER_ID } })
    .then((posts: {}[]) => {
      res.send(posts);
    })
    .catch((err: { name: string }) => {
      console.error(err);
      res.sendStatus(500);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

// get certain post
posts.get('/:id', (req: any, res: any) => {
  const { id }: { id: string } = req.params;
  prisma.post
    .findFirstOrThrow({ where: { id: +id } })
    .then((post: any) => {
      res.send(post);
    })
    .catch((err: { name: string }) => {
      console.error(err);
      if (err.name === 'NotFoundError') {
        res.sendStatus(404);
      } else {
        res.sendStatus(500);
      }
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

// update post
posts.patch('/:id', (req: any, res: any) => {
  const { title, body }: { title: string; body: string } = req.body.newPost;
  const { id }: { id: string } = req.params;
  prisma.post
    .update({
      where: { id: +id },
      data: {
        title,
        body,
      },
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err: { name: string }) => {
      console.error(err);
      res.sendStatus(500);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

// delete post
posts.delete('/:id', (req: any, res: any) => {
  const { id }: { id: string } = req.params;
  prisma.post
    .delete({ where: { userId: USER_ID, id: +id } })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err: { name: string }) => {
      console.error(err);
      if (err.name === 'PrismaClientKnownRequestError') {
        res.sendStatus(404);
      } else {
        res.sendStatus(500);
      }
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

export default posts;
