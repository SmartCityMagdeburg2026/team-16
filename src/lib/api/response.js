import { NextResponse } from 'next/server';

/**
 * Wrap data in a standard success envelope.
 */
export function ok(data, status = 200) {
  return NextResponse.json(
    { success: true, data },
    { status }
  );
}

/**
 * Return a standardized error response.
 */
export function error(message, status = 500, details = null) {
  const body = { success: false, error: message };
  if (details) body.details = details;
  return NextResponse.json(body, { status });
}

export function notFound(message = 'Resource not found') {
  return error(message, 404);
}

export function badRequest(message = 'Bad request', details = null) {
  return error(message, 400, details);
}

/**
 * Wrap a route handler in a standard try/catch.
 * Catches any unhandled error and returns a 500.
 */
export function withErrorHandler(handler) {
  return async (request, context) => {
    try {
      return await handler(request, context);
    } catch (err) {
      console.error('[API Error]', err);
      return error('Internal server error', 500);
    }
  };
}
