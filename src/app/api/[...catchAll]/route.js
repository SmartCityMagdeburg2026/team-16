import { notFound } from '@/lib/api/response.js';

/**
 * Catch-all route — returns JSON 404 for any unmatched /api/* path.
 * Without this, Next.js returns its own HTML error page.
 */
export function GET()    { return notFound('API route not found'); }
export function POST()   { return notFound('API route not found'); }
export function PUT()    { return notFound('API route not found'); }
export function PATCH()  { return notFound('API route not found'); }
export function DELETE() { return notFound('API route not found'); }
