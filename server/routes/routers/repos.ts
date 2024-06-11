import express, { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const repos = Router();
const prisma = new PrismaClient();

repos.get('/tree', async (req:express.Request, res:express.Response) => {
  const { user, repo } = req.body;
  try {
    const { data } = await axios.get(`https://api.github.com/repos/${user}/${repo}/branches/main`);
    const tree : {tree: []} = (await axios.get(data.commit.commit.tree.url)).data.tree;
    res.send(tree);
  }
  catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})

export default repos;