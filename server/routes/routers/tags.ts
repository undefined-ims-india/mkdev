import { PrismaClient } from '@prisma/client';
import { Router, Response, Request } from 'express';
const tags = Router();
const prisma = new PrismaClient();

// get tags for the given user
tags.get('/', async (req: any, res: Response) => {
    // const id = 9;
    
    try {
        const { id } = req.user.id;
        const tagResponse = await prisma.user.findUnique({
            where: {
                id: +id,
            },
            select: {
                tags: true,
            },
        });
        res.status(201).send(tagResponse);
    } catch {
        res.status(500).send('User Not Found');
    }
});

//get all tags sorted by tagType
tags.get('/all', async (req: any, res: any) => {
    try {
        // const { id } = req.user.id;
        const tags = await prisma.tags.findMany();
        const groupedTags = tags.reduce((groups: any, tag: any) => {
            const groupKey = tag.tagType; // Grouping by tagType
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(tag);
            return groups;
        }, {});
        console.log(groupedTags);
        res.status(200).send(groupedTags);
    } catch (error) {
        res.status(500).send('Error getting all tags from user');
    }
});

//post all tags to the current user
tags.post('/all', async (req: any, res: any) => {
    const { tags } = req.body;
    // const id = 9
    
    try {
        const { id } = req.user.id;
        const mappedTags = tags.map((tag: { id: number }) => ({ id: +tag.id }));
        await prisma.user.update({
            where: { id: +id },
            data: {
                tags: {
                    connect: mappedTags,
                },
            },
        });

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error getting the data');
    }
});

//Handler to add tags to the user
tags.post('/:tagId', async (req: any, res: Response) => {
    const { tagId } = req.params;
    // const id = 9;
    
    try {
        const { id } = req.user.id;
        const updatedUser = await prisma.user.update({
            where: { id: +id },
            data: {
                tags: {
                    connect: { id: +tagId },
                },
            },
            select: { tags: true },
        });
        console.log('tag post', updatedUser);
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(500).send('Error adding tag to user');
    }
});

//patch request to remove a tag from a users array of tags
tags.patch('/:tagId', async (req: any, res: Response) => {
    const { tagId } = req.params;
    // const id = 9;
    
    try {
        const { id } = req.user.id;
        const updatedUser = await prisma.user.update({
            where: { id: +id },
            data: {
                tags: {
                    disconnect: { id: +tagId },
                },
            },
            select: { tags: true },
        });
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default tags;
