import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get('customerId') || undefined;
  const quotes = store.getQuotes(customerId);
  return NextResponse.json({ quotes });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const quote = store.createQuote(body);
    return NextResponse.json({ success: true, quote });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to create quote' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { quoteId, action, clientNotes, actorName } = body;

    if (!quoteId || !action) {
      return NextResponse.json({ error: 'quoteId and action required' }, { status: 400 });
    }

    const quote = store.respondToQuote(quoteId, action, clientNotes, actorName);
    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, quote });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to update quote' }, { status: 500 });
  }
}
