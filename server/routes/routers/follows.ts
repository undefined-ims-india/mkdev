import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const follow = Router();
const prisma = new PrismaClient();

// Follow user
follow.post('/follow', async (req: any, res: any) => {
  const { followingId } = req.params;
  console.log('followingId', followingId);

  try {
    // Add to user's following list
    await prisma.user.update({
      where: { id: req.user.id },
      data: { following: { connect: { id: followingId } } },
    });

    // Add user to followed user's follower list
    await prisma.user.update({
      where: { id: followingId },
      data: { followedBy: { connect: { id: req.user.id } } },
    });

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
});

// Get following list
follow.get('/following/:id', async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: +id },
      include: { following: true },
    });
    if (user) {
      return res.json(user?.following);
    }
    res.sendStatus(404);
  } catch (err) {
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
});

// Get followers lists
follow.get('/followers/:id', async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const userWithFollowers = await prisma.user.findUnique({
      where: { id: +id },
      include: { followedBy: true },
    });

    res.status(200).send(userWithFollowers);
  } catch (err) {
    console.error('Failed to get user with followers:', err);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
});

follow.post('/unfollow', async (req: any, res: any) => {
  const { followingId } = req.body;
  const { userId } = req.params;

  try {
    // Remove from user's following list
    await prisma.user.update({
      where: { id: userId },
      data: { following: { disconnect: { id: followingId } } },
    });

    // Remove user to followed user's follower list
    await prisma.user.update({
      where: { id: followingId },
      data: { followedBy: { disconnect: { id: userId } } },
    });

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Not sure If this will be needed at the moment

// Get followers and following
follow.get('/user/:id', async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const followersAndFollowing = await prisma.user.findUnique({
      where: { id: +id },
      include: {
        followedBy: true,
        following: true,
      },
    });

    if (followersAndFollowing) {
      return res.json(followersAndFollowing);
    }

    res.sendStatus(404);
  } catch (err) {
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
});
export default follow;
