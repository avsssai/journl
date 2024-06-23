import { AlignLeft, User } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import { ModeToggle } from "./mode-toggle";
import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <div>
      <section className="flex w-full justify-between px-4 py-2">
        <div className="flex gap-4 items-center">
          <Drawer>
            <DrawerTrigger>
              <AlignLeft />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <h1 className="font-bold mb-8">
                  <Link to={"/"}>Journl.</Link>
                </h1>
                {/* !Todo -  code if a user is present comes here */}
                <Link to={"/login"} className="flex gap-2 items-center">
                  <User size={20} />
                  <p className="text-sm">Login/Register</p>
                </Link>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
          <h2 className="font-bold">
            <Link to={"/"}>Journl.</Link>
          </h2>
        </div>
        <ModeToggle />
      </section>
    </div>
  );
}
