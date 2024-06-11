import express, { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const repos = Router();
const prisma = new PrismaClient();

repos.get('/:user/:repo/tree', async (req:express.Request, res:express.Response) => {
  const {user, repo} = req.params
  try {
    const { data } = await axios.get(`https://api.github.com/repos/${user}/${repo}/branches/main`);
    const tree : {tree: []} = (await axios.get(data.commit.commit.tree.url+"?recursive=true")).data.tree;
    res.send(tree);
  }
  catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})

repos.get('/:user/:repo/:path(*)/contents', async (req: express.Request, res: express.Response) => {
  const { user, repo, path } = req.params;
  try {
    const { data } = await axios.get(`https://api.github.com/repos/${user}/${repo}/contents/${path}`);
    res.send(atob(data.content));
  }
  catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})

export default repos;