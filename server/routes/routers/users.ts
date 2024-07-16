import express, { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { RequestWithUser } from '../../../types';
import { postWithRelationsSelector } from '../../helpers/post-selectors';

const users = Router();
const prisma = new PrismaClient();

// Authenticated route to verify a user is logged in
users.get('/loggedIn', (req: any, res: any) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    res.send({
      isLoggedIn: true,
      id: user.id,
      image: user.picture,
      name: user.name,
      username: user.username
    });
  } else {
    res.json({ isLoggedIn: false, id: 0 });
  }
});

//Get user profile
users.get(
  '/:id/profile',
  async (req: RequestWithUser, res: any): Promise<void> => {
    try {
      const userProfile = await prisma.user.findUniqueOrThrow({
        where: { id: +req.params.id },
        include: {
          tags: true,
          posts: {
            include: postWithRelationsSelector,
            orderBy: [
              {
                createdAt: 'desc',
              },
            ],
          },
          blogs: true,
        },
      });
      if (req.user) {
        userProfile.posts = userProfile.posts.map((post) => ({
          ...post,
          likedByUser: post.liked
            .slice()
            .map((like) => like.id)
            .includes(req.user!.id),
        }));
      }
      res.send(userProfile);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    } finally {
      await prisma.$disconnect();
    }
  }
);

//Get user image
users.get(
  '/:id/image',
  async (req: express.Request<{ id: string }>, res: express.Response) => {
    try {
      const { id } = req.params;
      if (id === '0') {
        return;
      }
      const userImg = await prisma.user.findUniqueOrThrow({
        where: { id: +id },
        select: { picture: true },
      });
      res.send(userImg);
    } catch (err) {
      console.error('GET /api/users/:id/image', err);
      res.sendStatus(500);
    } finally {
      await prisma.$disconnect();
    }
  }
);

// Get user by id
users.get('/:id', async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: +id },
    });
    res.status(200).send(user);
  } catch (err) {
    console.error('Failed to get user:', err);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
});

// get all users
users.get('/', (req: any, res: any) => {
  prisma.user
    .findMany()
    .then((users: {}[]) => {
      res.send(users);
    })
    .catch((err: { name: string }) => {
      console.error(err);
      res.sendStatus(500);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

// Get unread message count by user id
users.get('/unread/:id', (req: any, res: any) => {
  const { id } = req.params;

  prisma.user
    .findFirst({
      where: {
        id: +id,
      },
      select: {
        _count: {
          select: {
            unreadMessages: true,
          },
        },
      },
    })
    .then((unreadCount) => {
      res.status(200).send(JSON.stringify(unreadCount?._count.unreadMessages));
    })
    .catch((err) => {
      console.error('Failed to get unread message count:\n', err);
      res.sendStatus(500);
    })

});

// Update user by id
users.patch('/:id', async (req: any, res: any) => {
  const { id } = req.params;
  const {
    devId,
    username,
    githubId,
    linkedinId,
    mediumId,
    picture,
    aboutMe,
    bio,
  } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: +id },
      data: {
        devId,
        username,
        githubId,
        linkedinId,
        mediumId,
        picture,
        aboutMe,
        bio,
      },
    });
    res.status(200).send(user);
  } catch (err) {
    console.error('Failed to update user:', err);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
});

// Update unread messages for single user
users.patch('/read/:id/:conversationId', async (req, res) => {
  const { id, conversationId } = req.params;
  try {
    // find messages that are unread by user in specific conversation
    const readMsgs = await prisma.messages.findMany({
      where: {
        AND: [
          {
            conversationId: +conversationId,
          },
          {
            unreadBy: {
              some: {
                id: {
                  equals: +id,
                },
              },
            },
          },
        ],
      },
      select: {
        id: true,
      },
    });

    // disconnect newly read messages from user's unreadMessages
    await prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        unreadMessages: {
          disconnect: readMsgs,
        },
      },
    });

    res.sendStatus(202);
  } catch (err) {
    console.error('Failed to mark messages read:\n', err)
    res.sendStatus(500);
  }

});

export default users;
