import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;

export default function Login({ className, ...props }: CardProps) {
  return (
    <main className="px-4">
      <section className="flex md:h-[calc(100vh-56px)]">
        <div className="flex-1 hidden lg:flex flex-col">
          <h1 className="mt-auto text-9xl mb-8  border-2 border-slate-950 dark:border-white w-fit">
            Journl.
          </h1>
        </div>
        <div className="flex-1">
          <Card
            className={cn("max-w-[380px] h-fit mx-auto flex-1", className)}
            {...props}
          >
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your username and password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  aria-label="Email"
                  className="mb-4"
                />
                <Label htmlFor="Password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="Password"
                  placeholder="Password"
                  aria-label="Password"
                  className="mb-4"
                />
                <div className="flex gap-2 items-center ">
                  <Button>Login</Button>
                  <Link to={`/register`} className="underline text-sm">
                    Create Account
                  </Link>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/forgot-password`} className="text-sm underline">
                Forgot Password
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
}
