const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("Admin@12345", 10);
  await prisma.user.upsert({
    where: { email: "admin@yourco.com" },
    update: {},
    create: {
      email: "admin@yourco.com",
      name: "Admin",
      hash,
      role: "ADMIN",
    },
  });
  console.log("✅ Seeded admin: admin@yourco.com / Admin@12345");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());