import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';
import { getAdminSession, getClientSession } from '@/lib/auth/session';

export async function GET(req: Request) {
  const adminSession = await getAdminSession();
  const clientSession = await getClientSession();

  if (!adminSession && !clientSession) {
    return NextResponse.json(
      { error: 'Authentication required to view atelier consultations.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);

  if (adminSession) {
    const customerId = searchParams.get('customerId') || undefined;
    const consultations = store.getConsultations(customerId);
    return NextResponse.json({ consultations });
  }

  const consultations = store.getConsultations(clientSession!.userId);
  return NextResponse.json({ consultations });
}

export async function POST(req: Request) {
  try {
    const adminSession = await getAdminSession();
    const clientSession = await getClientSession();

    if (!adminSession && !clientSession) {
      return NextResponse.json(
        { error: 'Authentication required to book an atelier consultation.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const customerId = adminSession
      ? body.customerId || 'user-client-01'
      : clientSession!.userId;
    const customerName = adminSession
      ? body.customerName || 'Private Patron'
      : clientSession!.name;
    const customerEmail = adminSession
      ? body.customerEmail || 'patron@kirtidesai.com'
      : clientSession!.email;

    const consultation = store.bookConsultation(
      customerId,
      customerName,
      customerEmail,
      body
    );

    return NextResponse.json({ success: true, consultation });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to book consultation' }, { status: 500 });
  }
}
