const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Clear the old seed data
  await prisma.post.deleteMany().then(() => console.log('Deleted all posts'));
  await prisma.user.deleteMany().then(() => console.log('Deleted all users'));

  const tagJavaScript = await prisma.tags.create({
    data: { name: 'javascript', tagType: 'post' },
  });
  const tagTypescript = await prisma.tags.create({
    data: { name: 'typescript', tagType: 'post' },
  });

  const user1 = await prisma.user.create({
    data: {
      username: 'cody.h.daigle',
      googleId: '1234567890',
      firstName: 'Cody',
      lastName: 'Daigle',
      picture:
        'https://lh3.googleusercontent.com/a/ACg8ocLq9dLuYghfrz_g9CIA6VoMalKNDq6ouj6cjbctqYkfoeTwmQ=s96-c',
      follower_count: 10,
      post_count: 2,

      posts: {
        create: [
          { title: 'Interesting day!', body: 'This is the first post.' },
          {
            title: 'Typescript',
            body: 'A love/hate language.',
            tags: {
              connect: {
                id: tagTypescript.id,
              },
            },
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'Patrick Star',
      googleId: '0987654321',
      firstName: 'Mike',
      lastName: 'S',
      picture:
        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      follower_count: 10,
      post_count: 2,
      posts: {
        create: [
          {
            title: 'Messages',
            body: "I'm implementing a messages feature!",
            tags: {
              connect: { id: tagJavaScript.id },
            },
          },
          {
            title: 'Conversations',
            body: 'It can store all conversations from everyone!',
            tags: {
              connect: {
                id: tagTypescript.id,
              },
            },
          },
        ],
      },
    },
  });
  const user3 = await prisma.user.create({
    data: {
      username: 'Plankton the Evil Genius',
      googleId: '1XXXXXXXXX',
      firstName: 'Patrick',
      lastName: 'H',
      picture:
        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      follower_count: 10,
      post_count: 2,

      posts: {
        create: [
          {
            title: 'Searching!',
            body: "User's can search tags or other users!",
            tags: {
              connect: {
                id: tagTypescript.id,
              },
            },
          },
          {
            title: 'Dashboard',
            body: 'Not sure who is doing that yet...',
            tags: {
              connect: {
                id: tagTypescript.id,
              },
            },
          },
        ],
      },
    },
  });

  const user4 = await prisma.user.create({
    data: {
      username: 'Larry the Lobster',
      googleId: 'XXXXXXXXX0',
      firstName: 'Alex',
      lastName: 'H',
      picture:
        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      follower_count: 10,
      post_count: 2,

      posts: {
        create: [
          {
            title: 'EZPZ',
            body: "Working on some S3 buckets for user's Demos!",
            tags: {
              connect: {
                id: tagTypescript.id,
              },
            },
          },

          {
            title: 'Scrum',
            body: 'Boooo!',
            tags: {
              connect: {
                id: tagTypescript.id,
              },
            },
          },
        ],
      },
    },
  });

  console.log({ user1, user2, user3, user4 });
  console.log('Database seeded with 4 users and 8 posts');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
