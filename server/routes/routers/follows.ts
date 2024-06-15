import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const follow = Router();
const prisma = new PrismaClient();

// Follow user
follow.post('/follow', async (req: any, res: any) => {
  const { id, followingId } = req.params;
  console.log('followingId', followingId);

  try {
    await prisma.user.update({
      where: { id: +id },
      data: { following: { connect: { id: followingId } } },
    });

    await prisma.user.update({
      where: { id: followingId },
      data: { followedBy: { connect: { id: +id } } },
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
    const userFollowing = await prisma.user.findUnique({
      where: { id: +id },
      include: { following: true },
    });
    if (userFollowing) {
      res.status(200).send(userFollowing?.following);
    } else {
      res.sendStatus(404);
    }
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
    const userFollowers = await prisma.user.findUnique({
      where: { id: +id },
      include: { followedBy: true },
    });

    if (userFollowers) {
      res.status(200).send(userFollowers.followedBy);
    } else {
      res.sendStatus(404);
    }
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
    await prisma.user.update({
      where: { id: userId },
      data: { following: { disconnect: { id: followingId } } },
    });
    await prisma.user.update({
      where: { id: followingId },
      data: { followedBy: { disconnect: { id: userId } } },
    });

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
});
export default follow;
