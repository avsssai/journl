import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { requireUserId } from "~/utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const userDetails = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  return {
    user: {
      email: userDetails?.email,
      userId: userDetails?.id,
    },
  };
};

export default function Home() {
  const loaderData = useLoaderData<typeof loader>();
  return <h1>Logged in : {loaderData.user.email}</h1>;
}
