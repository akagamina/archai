import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn: any = request.cookies.get("isLoggedIn");

  if (
    isLoggedIn?.value === "false" &&
    request.nextUrl.pathname === "/sign-in"
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url as string));
  }

  if (isLoggedIn?.value === "true" && request.nextUrl.pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
