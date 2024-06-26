import { ActionFunctionArgs, redirect } from "@remix-run/node";
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
import { getUserId, register } from "~/utils/session.server";
import { emailExists } from "~/utils/user.session";

type CardProps = React.ComponentProps<typeof Card>;

function validateEmail(email: string) {
  if (email.length < 3) {
    return "Email must be more than 3 characters long.";
  }
}

function validatePassword(password: string) {
  if (password.length < 6) {
    return "Password must be more than 6 characters long.";
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  const confirmPassword = form.get("confirm-password");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    return badRequest({
      fields: null,
      fieldErrors: null,
      formError: "Form submitted incorrectly.",
    });
  }

  const fields = {
    email,
    password,
  };
  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  if (password !== confirmPassword) {
    return badRequest({
      formError: "Password and Confirm Password don't match.",
      fields,
      fieldErrors,
    });
  }
  const userExists = await emailExists(email);
  if (userExists) {
    return badRequest({
      formError: "User already exists. Please login.",
      fields,
      fieldErrors: null,
    });
  }

  const user = await register({ email, password });
  return redirect("/login");
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
                <p className="text-sm text-red-500">{actionData.formError}</p>
              ) : null}

              <CardTitle>Register</CardTitle>
              <CardDescription>Enter your email and password.</CardDescription>
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
                  />
                  {actionData?.fieldErrors?.email ? (
                    <p className="text-xs text-red-500">
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
                  />
                  {actionData?.fieldErrors?.password ? (
                    <p className="text-xs text-red-500">
                      {actionData.fieldErrors?.password}
                    </p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="Confirm Password"
                    aria-label="Confirm Password"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <Button type="submit">Register</Button>
                  <Link to={`/Login`} className="underline text-sm">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </section>
    </main>
  );
}
