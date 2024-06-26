import { ActionFunctionArgs } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
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
import { badRequest } from "~/utils/request.server";
import { createUserSession, login } from "~/utils/session.server";

type CardProps = React.ComponentProps<typeof Card>;

function validateEmail(username: string) {
  if (username.length < 3) {
    return "Username length must be atleast 3 characters long.";
  }
}

function validatePassword(password: string) {
  if (password.length < 6) {
    return "Password length must be atleast 6 characters long.";
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  if (typeof email !== "string" || typeof password !== "string") {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    });
  }

  const fields = { email, password };
  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fields,
      fieldErrors,
      formError: null,
    });
  }
  const user = await login({ email, password });
  console.log({ user });
  if (!user) {
    return badRequest({
      fields: { email, password },
      fieldErrors: null,
      formError: "Invalid username or password",
    });
  }
  return createUserSession(user.id, "/");
};

export default function Login({ className, ...props }: CardProps) {
  const actionData = useActionData<typeof action>();

  return (
    <main className="px-4">
      <section className="flex md:h-[calc(100vh-56px)]">
        <div className="flex-1 hidden lg:flex flex-col">
          <h1 className="mt-auto text-9xl mb-8  border-2 border-slate-950 dark:border-white w-fit">
            Journl.
          </h1>
        </div>
        <form className="flex-1" method="post">
          <Card
            className={cn("max-w-[380px] h-fit mx-auto flex-1", className)}
            {...props}
          >
            <CardHeader>
              {actionData?.formError ? (
                <p className="text-red-500 text-md">{actionData.formError}</p>
              ) : null}
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your username and password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full max-w-sm items-center gap-2">
                <div className="mb-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    aria-label="Email"
                    defaultValue={actionData?.fields?.email}
                    aria-errormessage={
                      actionData?.fieldErrors?.email
                        ? "username-error"
                        : undefined
                    }
                  />
                  {actionData?.fieldErrors?.email ? (
                    <p className="text-xs text-red-500" role="alert">
                      {actionData.fieldErrors.email}
                    </p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <Label htmlFor="Password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="Password"
                    placeholder="Password"
                    aria-label="Password"
                    defaultValue={actionData?.fields?.password}
                    aria-errormessage={
                      actionData?.fieldErrors?.password
                        ? "password-error"
                        : undefined
                    }
                  />
                  {actionData?.fieldErrors?.password ? (
                    <p className="text-xs text-red-500">
                      {actionData.fieldErrors.password}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:items-center ">
                  <Button className="w-full md:flex-1" type="submit">
                    Login
                  </Button>
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
        </form>
      </section>
    </main>
  );
}
