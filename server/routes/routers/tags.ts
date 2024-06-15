import { PrismaClient } from '@prisma/client';
import { Router, Response, Request } from 'express';
const tags = Router();
const prisma = new PrismaClient();

tags.get('/',async (req: Request, res: Response) => {
    // const { id } = req.user.id;
    const id = 1;
    try {
    const tagResponse = await prisma.user.findUnique({
        where: {
            id: +id,
        },
        select: {
            tags: true,
            },
        })
        res.status(201).send(tagResponse);
    } catch {
        res.status(500).send('User Not Found');
    }
});

export default tags;