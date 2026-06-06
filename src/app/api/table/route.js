import { extractTableFromDataFile } from "@/app/extract-data";
import { errorResponse, jsonResponse } from "@/lib/api/response";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file");

  if (!file) {
    return errorResponse("file query parameter is required", 400);
  }

  try {
    const table = await extractTableFromDataFile(file);
    return jsonResponse(table);
  } catch (error) {
    if (error.code === "ENOENT") {
      return errorResponse(`File not found in data folder: ${file}`, 404);
    }

    return errorResponse(error.message, 400);
  }
}
