import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed Admin User
  const admin = await prisma.user.upsert({
    where: { email: "admin@sportify.com" },
    update: {},
    create: {
      email: "admin@sportify.com",
      name: "System Admin",
      password: "hashed_password_here",
      role: "ADMIN",
    },
  });

  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
