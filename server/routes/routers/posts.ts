const { Router } = require('express');
const {PrismaClient} = require('@prisma/client');

const posts = Router();

posts.post('/', (req:any, res:any) => {
  const { newPost } : {newPost: {body: string}} = req.body;
  console.log(newPost);
  res.end();
})

module.exports = posts