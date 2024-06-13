import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const follows = Router();
const prisma = new PrismaClient();

// follow user
follows.post('/:userId/follow', async (req: Request, res: Response) => {
  const { followerId, followedId } = req.body;

  if (!followerId || !followedId || followerId === followedId) {
    return res.sendStatus(400);
  }

  try {
    const follow = await prisma.follow.create({
      data: {
        followerId,
        followedId,
      },
    });
    return res.status(201).send(follow);
  } catch (err) {
    console.error('Failed to follow user:', err);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
});

// get followers
follows.get('/:userId/followers', async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) {
    res.sendStatus(400);
  }
  try {
    const followers = await prisma.follow.findMany({
      where: { followedId: +userId },
      include: { follower: true },
    });
    const followerList = followers.map((user) => user.follower);
    return res.status(200).send(followerList);
  } catch (err) {
    console.error("Failed to get user's followers:", err);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
});

export default follows;
