import prisma from "@/lib/prisma";
import hashPassword from "@/lib/helpers/auth-helper";

async function main() {
  const defaultAdminUser = await prisma.user.upsert({
    where: { email: "mail@example.com" },
    update: {},
    create: {
        name: "admin",
        email: "mail@example.com",
        password: await hashPassword("Password$$01"),
        role: 1, // Set role to admin
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });