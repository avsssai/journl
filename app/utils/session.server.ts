import bcrypt from "bcryptjs";
import { db } from "./db.server";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

interface LoginForm {
  email: string;
  password: string;
}

export async function register({ email, password }: LoginForm) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      email,
      passwordHash,
    },
  });
  return { id: user.id, email };
}

export async function login({ email, password }: LoginForm) {
  const userExists = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!userExists) {
    return null;
  }
  const passwordMatch = await bcrypt.compare(password, userExists.passwordHash);
  if (!passwordMatch) {
    return null;
  }

  return {
    id: userExists.id,
    email,
  };
}

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set.");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "journl_session",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    return null;
  }
  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
