import express, { Router } from 'express';
import { PrismaClient, User } from '@prisma/client';

const feed = Router();
const prisma = new PrismaClient();

feed.get('/', async (req: any, res: any):Promise<void> => {
    const allPosts = await prisma.post.findMany({include: {author: true}});
    res.send(allPosts.map(post => ({...post, author: post.author.username, userId: post.author.id})).reverse());
})

export default feed;