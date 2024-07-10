import React from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Calendar } from "~/components/ui/calendar";
import { requireUserId } from "~/utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  return {
    user: userId,
  };
};

export default function NewPost() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="px-4 mt-10">
      <h1>New Post</h1>
      <div className="flex gap-4 w-full">
        <div>
          <h2>Calendar</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <div className="flex-1">
          <h1>The editor comes here.</h1>
        </div>
      </div>

      {/* Build a wysiyg editor here to write the blog entry */}
    </div>
  );
}
