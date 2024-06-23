import type { MetaFunction } from "@remix-run/node";
import { Plus } from "lucide-react";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="px-4 mt-10">
      <h1 className="font-semibold">Welcome to Journl.</h1>
      <p className="text-sm mb-10">
        <i>The minimalist journaling app.</i>
      </p>
      <div className="grid col-span-1 md:col-auto items-center">
        <form action="/new">
          <button
            type="submit"
            className="bg-stone-800 h-[100px] flex justify-center items-center rounded-lg p-2"
          >
            <Plus color="gray" strokeWidth={3} />
          </button>
        </form>
      </div>
    </div>
  );
}
