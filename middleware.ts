import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token");

  if (!token && (request.nextUrl.pathname === "/favorites" || request.nextUrl.pathname === "/home")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/favorites", "/home", "/"], // Protect these routes
};
