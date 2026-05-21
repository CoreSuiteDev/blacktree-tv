import { NextRequest } from "next/server";
import { proxyMiddleware } from "@/lib/proxy";

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return proxyMiddleware(request);
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
