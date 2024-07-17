const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Clear the old seed data
  await prisma.post.deleteMany().then(() => console.log('Deleted all posts'));
  await prisma.user.deleteMany().then(() => console.log('Deleted all users'));
  await prisma.tags.deleteMany().then(() => console.log('Deleted all tags'));

  const tagJavaScript = await prisma.tags.create({
    data: { name: 'Javascript', tagType: 'Post' },
  });
  const tagTypescript = await prisma.tags.create({
    data: { name: 'Typescript', tagType: 'Post' },
  });

  const postTags = await prisma.tags.createMany({
    data: [
      { tagType: 'Post', name: 'FullStack' },
      { tagType: 'Post', name: 'Backend' },
      { tagType: 'Post', name: 'Frontend' },
      { tagType: 'Post', name: 'Ui' },
      { tagType: 'Post', name: 'DevOps' },
      { tagType: 'Post', name: 'Beginner' },
      { tagType: 'Post', name: 'Senior' },
      { tagType: 'Post', name: 'Junior' },
      { tagType: 'Post', name: 'Cloud' },
      { tagType: 'Post', name: 'Ai' },
      { tagType: 'Post', name: 'Mobile' },
      { tagType: 'Post', name: 'Games' },
      { tagType: 'Post', name: 'ios' },
    ],
  });

  const userTags = await prisma.tags.createMany({
    data: [
      { tagType: 'User', name: 'Typescript' },
      { tagType: 'User', name: 'Javascript' },
      { tagType: 'User', name: 'Fullstack' },
      { tagType: 'User', name: 'Backend' },
      { tagType: 'User', name: 'Frontend' },
      { tagType: 'User', name: 'Ui' },
      { tagType: 'User', name: 'DevOps' },
      { tagType: 'User', name: 'Beginner' },
      { tagType: 'User', name: 'Senior' },
      { tagType: 'User', name: 'Junior' },
      { tagType: 'User', name: 'Cloud' },
      { tagType: 'User', name: 'Ai' },
      { tagType: 'User', name: 'Mobile' },
      { tagType: 'User', name: 'Games' },
      { tagType: 'User', name: 'ios' },
    ],
  });

  const user1 = await prisma.user.create({
    data: {
      name: 'Squidward J.Q. Tentacles',
      username: 'Squidy',
      googleId: '1234567890',
      linkedinId: '1234567810',
      githubId: 'XXXXXXXXXX',
      aboutMe:
        'Call me Squidy. I like to create clean UIs and play the clarinet.',
      bio: 'DevOps Manager',
      firstName: 'Squidward',
      lastName: 'Tentacles',
      picture:
        'https://imgs.search.brave.com/yWlJbyTnJme_y2PhfNKnh7Q3Z-D3Nw70f4PbnmcLGqU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzJiL2E2/L2JlLzJiYTZiZTk0/OTZjZjFhZGY1NTQ3/OTkxY2ZkMDFhYzJm/LmpwZw',
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
      name: 'Patrick Star',
      username: 'Patrick Star',
      googleId: '0987654321',
      linkedinId: '1234567444',
      githubId: 'XXXXXXXX333',
      aboutMe: "I'm only shirtless outside of the office.",
      bio: "Lead Engineer / Can't see my own forehead",
      firstName: 'Patrick',
      lastName: 'Star',
      picture:
        'https://imgs.search.brave.com/kK7mHa-G1rGg9NNRYpC03fG8O9FHsJ_RYCC5xqVUTQo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Q2Lzcw/LzRlL2Q2NzA0ZTg1/NzdjY2VjOTdjYTlh/MzU0ZDlhYmNlMDU3/LmpwZw',
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
      name: 'Sheldon James Plankton',
      username: 'Plankton the Evil Genius',
      googleId: '1XXXXXXXXX',
      linkedinId: '1234567855',
      githubId: 'XXXXXXX666',
      aboutMe: 'I will create the a program to discover that blasted formula!',
      bio: 'Evil Genius / Scrum Manager',
      firstName: 'Sheldon James',
      lastName: 'Plankton',
      picture:
        'https://imgs.search.brave.com/YlzDvMZILtu3Z31HO0iRloa10q7cfwHQhjqFWLIAjk4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zLnBu/Z2tpdC5jb20vcG5n/L3NtYWxsLzM3MS0z/NzEwMjUzX2ltYWdl/LXBsYW5rdG9uLXNw/b25nZWJvYi10cmFu/c3BhcmVudC1naWYu/cG5n',
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
      name: 'Larry The Lobster',
      username: 'Bubble Buddy',
      googleId: 'XXXXXXXXX0',
      linkedinId: '1234569999',
      githubId: 'XXXXXXX664',
      aboutMe: 'Hello, my name Is Larry and I like to lift weights!',
      bio: 'Body Builder / Front-End Developer',
      firstName: 'Larry',
      lastName: 'Lobster',
      picture:
        'https://imgs.search.brave.com/Gt42ZN8kshudW_SmBpqqwqCVIKr49tlsNClac_wFAMs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2lraWEubm9j/b29raWUubmV0L3Ro/ZWFkdmVudHVyZXNv/Zmdhcnl0aGVzbmFp/bC9pbWFnZXMvMC8w/My9MYXJyeV9BcnR3/b3JrLndlYnAvcmV2/aXNpb24vbGF0ZXN0/L3NjYWxlLXRvLXdp/ZHRoLWRvd24vMTg1/P2NiPTIwMjMxMDIy/MDAwNjUx.jpeg',
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

  // console.log({ user1, user2, user3, user4 });
  console.log('Database seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
