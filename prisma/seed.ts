import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function seedDB() {
  const shiva = await db.user.create({
    data: {
      email: "shiva@example.com",
      passwordHash:
        "$2y$10$3IXrqCR98VJgOlp03zDH/eWhtLCFErr/MzGhcYMMD4acXOzE9lABS",
    },
  });
  return {
    user: shiva,
  };
}

seedDB();
