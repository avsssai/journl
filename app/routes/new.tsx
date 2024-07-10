import React from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Calendar } from "~/components/ui/calendar";
import { requireUserId } from "~/utils/session.server";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "~/components/ui/bottomUpDrawer";
import { Button } from "~/components/ui/button";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  return {
    user: userId,
  };
};

export default function NewPost() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const today = new Date();
  return (
    <div className="px-4 mt-10">
      <h1 className="mb-8">New Post</h1>
      <div className="flex gap-4 w-full flex-col md:flex-row">
        <div className="md:hidden">
          <Drawer direction="bottom">
            <DrawerTrigger>
              <Button variant={"outline"} size={"sm"}>
                Open Calendar
              </Button>
            </DrawerTrigger>
            <DrawerContent className="relative">
              <div className="absolute top-1 inset-0 mx-auto w-14 h-[4px] rounded-lg bg-slate-300"></div>
              <h2 className="text-sm flex m-4 justify-center">
                Choose a date to write your journal.
              </h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border p-8 m-auto"
                disabled={{ after: today }}
              />
            </DrawerContent>
          </Drawer>
        </div>
        <div className="hidden md:block">
          <h2>Calendar</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={{ after: today }}
          />
        </div>
        <div className="flex-1">
          <h1>The editor comes here.</h1>
        </div>
      </div>
    </div>
  );
}
