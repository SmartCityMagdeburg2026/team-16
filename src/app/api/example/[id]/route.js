import { errorResponse, jsonResponse } from "@/lib/api/response";

export async function GET(_request, { params }) {
  const { id } = await params;

  return jsonResponse({ id, message: "Fetch a single resource by id" });
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  let body;

  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }

  return jsonResponse({ id, updated: body });
}

export async function DELETE(_request, { params }) {
  const { id } = await params;

  return jsonResponse({ id, deleted: true });
}
