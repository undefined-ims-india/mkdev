import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const follow = Router();
const prisma = new PrismaClient();

// Follow user
follow.post('/follow/:followingId', async (req: any, res: any) => {
  const { followingId } = req.params;

  try {
    // Add to user's following list
    await prisma.user.update({
      where: { id: req.user.id },
      data: { following: { connect: { id: +followingId } } },
    });

    // Add user to followed user's follower list
    await prisma.user.update({
      where: { id: +followingId },
      data: { followedBy: { connect: { id: req.user.id } } },
    });

    res.sendStatus(201);
  } catch (err) {
    console.log('Failed to follow user:', err);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
});

// Get following list
follow.get('/following/:id', async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const isFollowing = await prisma.user.findUnique({
      where: { id: +id },
      include: {
        following: { select: { id: true } },
      },
    });
    if (isFollowing) {
      res.status(200).send(isFollowing?.following);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error('Failed to get list of following:', err);
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
      include: {
        followedBy: { select: { id: true } },
      },
    });

    if (userFollowers) {
      res.status(200).send(userFollowers.followedBy);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error('Failed to get list of followers:', err);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
});

follow.delete('/unfollow/:followingId', async (req: any, res: any) => {
  const { followingId } = req.params;

  try {
    // Remove from user's following list
    await prisma.user.update({
      where: { id: req.user.id },
      data: { following: { disconnect: { id: +followingId } } },
    });

    // Remove user to followed user's follower list
    await prisma.user.update({
      where: { id: +followingId },
      data: { followedBy: { disconnect: { id: req.user.id } } },
    });

    res.sendStatus(201);
  } catch (err) {
    console.error('Failed to unfollow user:', err);
    res.sendStatus(500);
  }
});

follow.get('/isFollowing/:id', async (req: any, res: any) => {
const { id } = req.params;
try{
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: {
      following: { select: { id: true } },
    },
  });
  if(user){
    const isFollowing = user.following.some((user) => user.id === +id);
    res.status(200).send(isFollowing);
  }else{
    console.log('Failed find user')
    res.sendStatus(404)
  }
} catch (err) {
  console.error('Failed to check if following:', err);
  res.sendStatus(500);
}
})
export default follow;
