const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const email = 'admin@crm.local';
  const password = 'Admin#12345'; // change later
  const hash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { hash, role: 'ADMIN', name: 'Admin' },
    create: { email, hash, role: 'ADMIN', name: 'Admin' },
  });

  console.log('Seeded admin ->', email, 'password:', password);
}
main().finally(() => prisma.$disconnect());