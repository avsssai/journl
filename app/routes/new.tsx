import React from "react";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Calendar } from "~/components/ui/calendar";
import { requireUserId } from "~/utils/session.server";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "~/components/ui/bottomUpDrawer";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";
import { createNewJournal } from "~/utils/journal.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  return {
    user: userId,
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const formData = Object.fromEntries(form);
  const newJournal = await createNewJournal(request, {
    title: formData.title,
    journal: formData.journal,
  });
  return json({ newJournal });
};

export default function NewPost() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const today = new Date();

  return (
    <div className="px-4 mt-10 max-w-[1000px] mx-auto">
      <h1 className="mb-8 text-4xl">New Post</h1>
      <div className="flex gap-8 w-full flex-col md:flex-row">
        <div className="md:hidden">
          <Drawer direction="bottom">
            <DrawerTrigger className="border border-1 text-sm px-2">
              Open Calendar
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
                className="rounded-md border m-auto p-0"
                disabled={{ after: today }}
              />
            </DrawerContent>
          </Drawer>
        </div>
        <div className="hidden md:block">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={{ after: today }}
          />
        </div>
        <div className="flex-1">
          <form method="post">
            <div className="mb-4">
              <Label htmlFor="title" className="mb-1">
                Title
              </Label>
              <Input
                name="title"
                id="title"
                type="text"
                placeholder="What are you gonna journal today?"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="date" className="mb-1">
                Date
              </Label>
              <Input
                name="date"
                id="date"
                readOnly
                type="text"
                value={format(date!, "PPpp")}
              />
              <input type="hidden" name="date" value={date?.toISOString()} />
            </div>
            <div className="mb-4">
              <Label htmlFor="label" className="mb-1">
                Journal
              </Label>
              <Textarea
                placeholder="Sit back...relax..and write your journal."
                rows={10}
                name="journal"
              />
            </div>
            <div>
              <Button type="submit" variant={"outline"}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
