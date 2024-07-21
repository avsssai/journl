import { db } from "./db.server";

export const emailExists = async (email: string): Promise<boolean> => {
  const retrieveEmail = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!retrieveEmail) return false;
  return true;
};

export const userIdExists = async (id: string): Promise<Boolean> => {
  return Boolean(
    await db.user.findUnique({
      where: {
        id,
      },
    })
  );
};
