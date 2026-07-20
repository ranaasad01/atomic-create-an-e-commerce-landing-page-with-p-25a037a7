import { NextRequest, NextResponse } from "next/server";

const ATOMIC_BACKEND_DEFAULT = "https://builder.hotcode.ai/api/v1";

export const runtime = "nodejs";

function resolveBackend(): string {
  const raw =
    process.env.ATOMIC_BACKEND_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_PUBLIC_API_URL?.trim() ||
    ATOMIC_BACKEND_DEFAULT;
  const base = raw.replace(/\/+$/, "");
  return base.endsWith("/api/v1") ? base : `${base}/api/v1`;
}

async function proxy(req: NextRequest, pathSegments: string[]) {
  const path = pathSegments.join("/");
  const incoming = new URL(req.url);
  const target = new URL(`${resolveBackend()}/${path}`);
  incoming.searchParams.forEach((value, key) => {
    target.searchParams.set(key, value);
  });

  const headers = new Headers();
  const auth = req.headers.get("authorization");
  if (auth) headers.set("authorization", auth);
  const contentType = req.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  const init: RequestInit = {
    method: req.method,
    headers,
    cache: "no-store",
  };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.text();
  }

  const upstream = await fetch(target.toString(), init);
  const body = await upstream.text();
  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") ?? "application/json",
    },
  });
}

async function resolvePathParams(
  params: Promise<{ path?: string[] }> | { path?: string[] },
): Promise<string[]> {
  const resolved =
    typeof (params as Promise<{ path?: string[] }>).then === "function"
      ? await (params as Promise<{ path?: string[] }>)
      : params;
  return resolved.path ?? [];
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path?: string[] }> | { path?: string[] } },
) {
  const path = await resolvePathParams(context.params);
  return proxy(req, path);
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ path?: string[] }> | { path?: string[] } },
) {
  const path = await resolvePathParams(context.params);
  return proxy(req, path);
}
