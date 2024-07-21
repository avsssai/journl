import { redirect } from "react-router";
import { db } from "./db.server";
import { badRequest } from "./request.server";
import { getUserId, requireUserId } from "./session.server";
import { userIdExists } from "./user.session";

// interface FormData {
//   [k: string]: string;
// }

export const createNewJournal = async (
  request: Request,
  { title, journal }: any
) => {
  const userId = await requireUserId(request);
  if (!userId) {
    throw new Error("You must be logged in to submit an entry.");
  }
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

export async function getAllJournalsByUser(userId: string) {
  const user = await userIdExists(userId);
  if (!user) {
    return redirect("/login");
  }
  const journalsByUser = await db.journal.findMany({
    where: {
      authorId: userId,
    },
  });
  return journalsByUser;
}
