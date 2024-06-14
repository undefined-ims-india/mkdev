import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const follow = Router();
const prisma = new PrismaClient();

// Follow user
follow.post('/', async (req: Request, res: Response) => {
  const { followedById, followingId } = req.body;

  // Can't follow yourself...
  if (!followedById || !followingId) {
    return res.sendStatus(400);
  }

  if (followedById === followingId) {
    return res.status(400).json({ error: 'Users cannot follow themselves' });
  }

  try {
    const follow = await prisma.follows.create({
      data: {
        followedById,
        followingId,
      },
    });
  } catch (err) {
    console.error('Failed to follow user:', err);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
});

// Get followers
follow.get('/:userId/following', async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    return res.sendStatus(400);
  }

  try {
    const following = await prisma.follows.findMany({
      where: { followedById: +userId },
      include: { following: true },
    });

    const usersFollowing = following.map((follow) => follow.following);

    return res.status(200).send(usersFollowing);
  } catch (err) {
    console.error('Failed to get following users:', err);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
});

// Unfollow user
follow.delete('/unfollow', async (req: Request, res: Response) => {
  const { followedById, followingId } = req.body;

  // Cant unfollow yourself....
  if (!followedById || !followingId) {
    return res.sendStatus(400);
  }
  if (followedById === followingId) {
    return res.sendStatus(400);
  }

  try {
    await prisma.follows.delete({
      where: {
        followingId_followedById: {
          followingId: followingId,
          followedById: followedById,
        },
      },
    });

    //  Update the 'unfollowed' user
    await prisma.user.update({
      where: { id: followingId },
      data: { follower_count: { decrement: 1 } }, // if we are stilling accounting for the follower count
    });

    res.sendStatus(200);
  } catch (err) {
    console.error('Failed to unfollow user:', err);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
});

export default follow;
