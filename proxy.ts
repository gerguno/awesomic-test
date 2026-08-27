import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/storybook") {
    return NextResponse.redirect(new URL("/storybook/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/storybook",
};
