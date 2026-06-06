import { NextResponse } from 'next/server';

// Return JSON 404 instead of Next.js HTML error page for API routes
export default function NotFound() {
  return NextResponse.json(
    { success: false, error: 'Route not found' },
    { status: 404 }
  );
}
