const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function main() {
  const addUser = await prisma.user.create({
    data: {
      email: 'elsa@prisma.io',
      name: 'Elsa Prisma',
    },
  });

  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })