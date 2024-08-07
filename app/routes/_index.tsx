import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useActionData, useLoaderData } from "@remix-run/react";
import { Plus } from "lucide-react";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import { db } from "~/utils/db.server";
import { getAllJournalsByUser } from "~/utils/journal.server";
import { requireUserId } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const userDetails = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  const journalsByUser = await getAllJournalsByUser(userId);

  return json({
    user: {
      email: userDetails?.email,
      userId: userDetails?.id,
    },
    journalsByUser,
  });
};

export default function Index() {
  let { user, journalsByUser } = useLoaderData<typeof loader>();
  console.log(journalsByUser);
  return (
    <div className="px-4 mt-10">
      <h1 className="font-semibold">Welcome to Journl.</h1>
      <p className="text-sm mb-10">
        <i>The minimalist journaling app.</i>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-2">
        <form action="/new">
          <button
            type="submit"
            className="bg-stone-800 h-[100px] w-full flex gap-1 justify-center items-center rounded-lg p-2"
          >
            <Plus color="gray" strokeWidth={3} />
            create
          </button>
        </form>
        <div className="shadow-xl p-2 rounded-lg bg-stone-800 flex flex-col gap-1 h-full">
          <h2 className="font-black">A small win</h2>
          <p className="text-xs italic">26/06/2024</p>
        </div>
      </div>
    </div>
  );
}
