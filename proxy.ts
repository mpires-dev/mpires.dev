import { NextRequest, NextResponse } from "next/server";

const ADMIN_PATH = "/keystatic";
const ADMIN_API_PATH = "/api/keystatic";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    !pathname.startsWith(ADMIN_PATH) &&
    !pathname.startsWith(ADMIN_API_PATH)
  ) {
    return NextResponse.next();
  }

  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader && authHeader.startsWith("Basic ")) {
    const encoded = authHeader.slice(6);
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const [username, password] = decoded.split(":");

    const validUser = process.env.KEYSTATIC_ADMIN_USERNAME;
    const validPass = process.env.KEYSTATIC_ADMIN_PASSWORD;

    if (validUser && validPass && username === validUser && password === validPass) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Keystatic Admin"',
    },
  });
}

export const config = {
  matcher: ["/keystatic/:path*", "/api/keystatic/:path*"],
};
