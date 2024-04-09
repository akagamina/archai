// app/api/design-suggestions.ts
import { NextRequest, NextResponse } from 'next/server';

export default function handler(req: NextRequest) {
  if (req.method === 'POST') {
    return new Response('API route is working!', { status: 200 });
  } else {
    return new Response(`Method ${req.method} Not Allowed`, {
      status: 405,
      headers: {
        Allow: 'POST',
      },
    });
  }
}