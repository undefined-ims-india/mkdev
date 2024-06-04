const { Router, Request } = require('express');
const {PrismaClient} = require('@prisma/client');

const posts = Router();
const prisma = new PrismaClient();

const USER_ID = 3;

posts.post('/', (req:any, res:any) => {
  const { newPost } : {newPost: {title: string, body: string}} = req.body;
  prisma.post.create({
    data: {...newPost, author: {connect: {id: USER_ID}}}
  })
    .then((post: any) => {
      console.log(post);
      res.sendStatus(201)
    })
    .catch((err: {name:string}) => {
      console.error(err);
      res.sendStatus(500)
    })
    .finally(async () => {
      await prisma.$disconnect()
    });
});

posts.get('/', (req:any, res:any) => {
  prisma.post.findMany({where: {userId: USER_ID}})
    .then((posts: {}[]) => {
      res.send(posts);
    })
    .catch((err: string) => {
      console.error(err);
      res.sendStatus(500)
    })
    .finally(async () => {
      await prisma.$disconnect()
    });
});

posts.get('/:id', (req: any, res: any) => {
  const { id }: {id:string} = req.params;
  prisma.post.findFirstOrThrow({where: {id: +id}})
    .then((post: any) => {
      res.send(post);
    })
    .catch((err: {name:string}) => {
      console.error(err);
      if (err.name === 'NotFoundError') {
        res.sendStatus(404);
      }
      else {
        res.sendStatus(500)
      }
    })
    .finally(async () => {
      await prisma.$disconnect()
    });
})

module.exports = posts