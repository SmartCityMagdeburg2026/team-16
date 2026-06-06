import { errorResponse, jsonResponse } from "@/lib/api/response";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") ?? "world";

  return jsonResponse({ message: `Hello, ${name}!` });
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }

  if (!body?.title) {
    return errorResponse("title is required", 422);
  }

  return jsonResponse({ received: body }, 201);
}
