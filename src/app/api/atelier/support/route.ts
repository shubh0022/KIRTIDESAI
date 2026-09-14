import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';
import { getAdminSession, getClientSession } from '@/lib/auth/session';

export async function GET(req: Request) {
  const adminSession = await getAdminSession();
  const clientSession = await getClientSession();

  if (!adminSession && !clientSession) {
    return NextResponse.json(
      { error: 'Authentication required to view concierge communications.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);

  if (adminSession) {
    const customerId = searchParams.get('customerId') || undefined;
    const tickets = store.getTickets(customerId);
    return NextResponse.json({ tickets });
  }

  const tickets = store.getTickets(clientSession!.userId);
  return NextResponse.json({ tickets });
}

export async function POST(req: Request) {
  try {
    const adminSession = await getAdminSession();
    const clientSession = await getClientSession();

    if (!adminSession && !clientSession) {
      return NextResponse.json(
        { error: 'Authentication required to dispatch concierge requests.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      subject,
      category,
      message,
      relatedOrderId,
      relatedProjectId,
    } = body;

    if (!subject || !message) {
      return NextResponse.json({ error: 'Subject and message required' }, { status: 400 });
    }

    const customerId = adminSession
      ? body.customerId || 'user-client-01'
      : clientSession!.userId;
    const customerName = adminSession
      ? body.customerName || 'Private Patron'
      : clientSession!.name;
    const customerEmail = adminSession
      ? body.customerEmail || 'patron@kirtidesai.com'
      : clientSession!.email;

    const ticket = store.createTicket(
      customerId,
      customerName,
      customerEmail,
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
