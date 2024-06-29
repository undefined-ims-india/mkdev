import { Router } from 'express';
import { PostWithRelations, RequestWithUser } from '../../../types';
import { PrismaClient,Tags } from '@prisma/client';
import awsS3Upload from '../../helpers/aws-s3-upload';
// to remove the maintenance warning in the console...
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
const posts = Router();
const prisma = new PrismaClient();

// add a post to logged in user
posts.post('/', async (req: any, res: any) => {
  //image in files & title and body in body
  const { title, body, tags } = req.body;
  const tagArr = tags.length ? JSON.parse(tags).map((tag:Tags) => ({id: tag.id})) : [];
  const repoObj: {
    link: string;
    files: { path: string; contents: string }[];
  } | null = req.body.repo ? JSON.parse(atob(req.body.repo)) : null;
  try {
    let post;
    if (req.files && req.files.img) {
      const s3Obj = await awsS3Upload(req.files.img);
      post = await prisma.post.create({
        data: {
          title,
          body,
          s3_key: s3Obj.Key,
          author: { connect: { id: req.user.id } },
          tags: { connect: tagArr }
        },
      });
    } else {
      post = await prisma.post.create({
        data: {
          title,
          body,
          author: { connect: { id: req.user.id } },
          tags: { connect: tagArr }
        },
      });
    }
    if (repoObj) {
      await prisma.repo.create({
        data: {
          post: { connect: { id: post.id } },
          link: repoObj.link,
          files: {
            create: repoObj.files,
          },
        },
      });
    }
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
});

//like post
posts.patch('/:id/like', async(req: RequestWithUser, res: any) => {
  try {
    await prisma.post.update({
      where: {id: +req.params.id},
      data: {
        liked: {
          connect: {id: +req.user.id}
        }
      }
    })
    res.sendStatus(200)
  }
  catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
  finally {
    await prisma.$disconnect()
  }
});

//dislike post
posts.patch('/:id/dislike', async(req: RequestWithUser, res: any) => {
  try {
    await prisma.post.update({
      where: {id: +req.params.id},
      data: {
        liked: {
          disconnect: [{id: +req.user.id}]
        }
      }
    })
    res.sendStatus(200)
  }
  catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
  finally {
    await prisma.$disconnect()
  }
});

// get certain post
posts.get('/:id', async(req: RequestWithUser, res: any) => {
  try {
    const { id } = req.params;
    const post : PostWithRelations = await prisma.post.findFirstOrThrow({
      where: {
        id: +id,
      },
      include: {
        author: true,
        tags: true,
        repo: {
          include: {
            files: true
          }
        },
        liked: { select: { id: true }}
      }
    });
    if (req.user) { post.likedByUser = post.liked.slice().map(like => like.id).includes(req.user.id); }
    res.send(post)
  }
  catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
  finally {
    await prisma.$disconnect();
  }
})

// update post
posts.patch('/:id', (req: any, res: any) => {
  const { title, body }: { title: string; body: string } = req.body.newPost;
  const { id }: { id: string } = req.params;
  prisma.post
    .update({
      where: { id: +id },
      data: {
        title,
        body,
      },
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err: { name: string }) => {
      console.error(err);
      res.sendStatus(500);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

// delete post
posts.delete('/:id', (req: any, res: any) => {
  const { id }: { id: string } = req.params;
  prisma.post
    .delete({ where: { userId: req.user.id, id: +id } })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err: { name: string }) => {
      console.error(err);
      if (err.name === 'PrismaClientKnownRequestError') {
        res.sendStatus(404);
      } else {
        res.sendStatus(500);
      }
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

});

export default posts;
