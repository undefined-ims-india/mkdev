import { PrismaClient } from '@prisma/client';
import { Router, Response, Request } from 'express';
const tags = Router();
const prisma = new PrismaClient();

// get tags for the given user
tags.get('/', async (req: Request, res: Response) => {
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
		});
		res.status(201).send(tagResponse);
	} catch {
		res.status(500).send('User Not Found');
	}
});

tags.get('/all', async (req: Request, res: Response) => {
	try {
    const tags = await prisma.tags.findMany()

    res.status(200).send(tags)
	} catch (error) {
		res.status(500).send('Error getting all tags from user');
	}
});

// Handler to add tags to the user
tags.post('/:tagId', async (req: Request, res: Response) => {
	const { tagId } = req.params;
	// const { id } = req.user.id;
	const id = 1;

	try {
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
tags.patch('/:tagId', async (req: Request, res: Response) => {
	const { tagId } = req.params;
	// const { id } = req.user.id;
	const id = 1;

	try {
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
		res.status(500).send('Error updating user tags');
	}
});

export default tags;
