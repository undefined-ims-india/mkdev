import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const blog = Router();

blog.get('/:username', (req, res) => {
  const { username } = req.params;
  `/https://dev.to/api/articles?username=${username}&per_page=8`;
});

export default blog;
