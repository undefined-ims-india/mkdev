import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const follow = Router();
const prisma = new PrismaClient();

// Follow user
follow.post('/follow/:id/:followingId', async (req: any, res: any) => {
  const { followingId } = req.params;
  const { id } = req.body;

  try {
    // Add to user's following list
    await prisma.user.update({
      where: { id: +id },
      data: { following: { connect: { id: +followingId } } },
    });

    // Add user to followed user's follower list
    await prisma.user.update({
      where: { id: +followingId },
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

follow.delete('/unfollow/:id/:followingId', async (req: any, res: any) => {
  const { followingId } = req.params;
  const { id } = req.body;

  try {
    // Remove from user's following list
    await prisma.user.update({
      where: { id: +id },
      data: { following: { disconnect: { id: +followingId } } },
    });

    // Remove user to followed user's follower list
    await prisma.user.update({
      where: { id: +followingId },
      data: { followedBy: { disconnect: { id: +id } } },
    });

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Get the user's follower count / Following count
follow.get('/counts/:id', async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: +id },
      select: {
        followedBy: true,
        following: true,
      },
    });
    if (user) {
      res.status(200).send({
        follower_count: user.followedBy.length,
        following_count: user.following.length,
      });
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
});
export default follow;
