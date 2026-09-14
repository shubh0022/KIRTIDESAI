import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';
import { getAdminSession, getClientSession } from '@/lib/auth/session';

export async function GET(req: Request) {
  const adminSession = await getAdminSession();
  const clientSession = await getClientSession();

  if (!adminSession && !clientSession) {
    return NextResponse.json(
      { error: 'Authentication required to inspect atelier quotes.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);

  if (adminSession) {
    const customerId = searchParams.get('customerId') || undefined;
    const quotes = store.getQuotes(customerId);
    return NextResponse.json({ quotes });
  }

  // Client restricted to own quotes
  const quotes = store.getQuotes(clientSession!.userId);
  return NextResponse.json({ quotes });
}

export async function POST(req: Request) {
  try {
    const adminSession = await getAdminSession();
    if (!adminSession) {
      return NextResponse.json(
        { error: 'Administrative clearance required to generate official couture quotes.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const quote = store.createQuote(body);
    return NextResponse.json({ success: true, quote });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to create quote' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const adminSession = await getAdminSession();
    const clientSession = await getClientSession();

    if (!adminSession && !clientSession) {
      return NextResponse.json(
        { error: 'Authentication required to respond to atelier quotes.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { quoteId, action, clientNotes } = body;

    if (!quoteId || !action) {
      return NextResponse.json({ error: 'quoteId and action required' }, { status: 400 });
    }

    const actorName = adminSession ? adminSession.name : clientSession!.name;

    const quote = store.respondToQuote(quoteId, action, clientNotes, actorName);
    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, quote });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to update quote' }, { status: 500 });
  }
}
