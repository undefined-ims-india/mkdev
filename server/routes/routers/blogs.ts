import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const blog = Router();

blog.get('/:username', (req, res) => {
  const { username } = req.params;
  console.log(req.params);
});

export default blog;
