import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get('customerId') || undefined;
  const consultations = store.getConsultations(customerId);
  return NextResponse.json({ consultations });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerId, customerName, customerEmail, ...data } = body;

    const consultation = store.bookConsultation(
      customerId || 'user-client-01',
      customerName || 'Elena Rossi',
      customerEmail || 'elena.rossi@milanocouture.it',
      data
    );

    return NextResponse.json({ success: true, consultation });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to book consultation' }, { status: 500 });
  }
}
