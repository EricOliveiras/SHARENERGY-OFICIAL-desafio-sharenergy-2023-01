import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('> Seeding database...');

  const hashPassword = await hash('sh@r3n3rgy', 14);

  await prisma.user.upsert({
    where: { email: 'desafiosharenergy@email.com' },
    update: {},
    create: {
      email: 'desafiosharenergy@email.com',
      username: 'desafiosharenergy',
      password: hashPassword
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
