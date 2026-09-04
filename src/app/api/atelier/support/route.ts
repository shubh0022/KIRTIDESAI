import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get('customerId') || undefined;
  const tickets = store.getTickets(customerId);
  return NextResponse.json({ tickets });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerId,
      customerName,
      customerEmail,
      subject,
      category,
      message,
      relatedOrderId,
      relatedProjectId,
    } = body;

    if (!subject || !message) {
      return NextResponse.json({ error: 'Subject and message required' }, { status: 400 });
    }

    const ticket = store.createTicket(
      customerId || 'user-client-01',
      customerName || 'Elena Rossi',
      customerEmail || 'elena.rossi@milanocouture.it',
      subject,
      category || 'General',
      message,
      relatedOrderId,
      relatedProjectId
    );

    return NextResponse.json({ success: true, ticket });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to submit ticket' }, { status: 500 });
  }
}
