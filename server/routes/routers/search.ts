import { Router, Response, Request } from 'express';
import { PrismaClient, tagType } from '@prisma/client';
const search = Router();
const prisma = new PrismaClient();




search.get('/filter/:tagType/:tags', async (req: Request, res: Response) => {
    const { tagType: tagTypeParam, tags } = req.params;
    const splitTags = tags.split('-');
    console.log(splitTags, tagTypeParam, tags);

    // Validate and cast tagTypeParam to tagType enum
    if (!Object.values(tagType).includes(tagTypeParam as tagType)) {
        return res.status(400).send('Invalid tag type');
    }

    try {
        const searchResults = await prisma.tags.findMany({
            where: {
                tagType: tagTypeParam as tagType, // Cast to tagType enum
                name: { in: splitTags }
            },
            include: {
                posts: true,
                user: true
            }
        });

        res.status(200).json(searchResults);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//Give a user or a post a tag
search.put('/addTag/:tagType/:existingTag', async (req: Request, res: Response) => {
    // Fallback to a default user ID if req.user is not set
    //const userId = req.user?.id || 1; // Default user ID for testing purposes
    const userId = 1 // TODO I have to fix this. !!!!
    const { tagType, existingTag } = req.params;

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                tags: {
                    connect: { id: +existingTag},
                },
            },
        });

        res.status(200).send('Tag added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//add a tag to a user or a
search.post('/', (req: Request, res: Response) => {
    res.status(200).send('you rang!');
});

search.delete('/', (req: Request, res: Response) => {
    res.status(200).send('you rang!');
});

export default search;
