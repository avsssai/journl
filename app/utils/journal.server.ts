import { db } from "./db.server";
import { getUserId, requireUserId } from "./session.server";

// interface FormData {
//   [k: string]: string;
// }

export const createNewJournal = async (
  request: Request,
  { title, journal }: any
) => {
  const userId = await requireUserId(request);
  const userExists = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  const newJournal = await db.journal.create({
    data: {
      title,
      journal: journal,
      authorId: userId,
    },
  });
  return newJournal;
};
