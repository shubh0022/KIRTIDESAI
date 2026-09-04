import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get('customerId') || undefined;
  const orders = store.getOrders(customerId);
  return NextResponse.json({ orders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerId, customerName, customerEmail, items, shippingAddress, paymentMethod } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Order items required' }, { status: 400 });
    }

    const order = store.createOrder(
      customerId || 'user-client-01',
      customerName || 'Elena Rossi',
      customerEmail || 'elena.rossi@milanocouture.it',
      items,
      shippingAddress,
      paymentMethod
    );

    return NextResponse.json({ success: true, order });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to create order' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { orderId, status, trackingNumber, carrier, actorName, actorRole } = body;

    if (!orderId || !status) {
      return NextResponse.json({ error: 'orderId and status required' }, { status: 400 });
    }

    const order = store.updateOrderStatus(
      orderId,
      status,
      trackingNumber,
      carrier,
      actorName,
      actorRole
    );

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to update order' }, { status: 500 });
  }
}
