import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';
import { getAdminSession, getClientSession } from '@/lib/auth/session';

export async function GET(req: Request) {
  const adminSession = await getAdminSession();
  const clientSession = await getClientSession();

  if (!adminSession && !clientSession) {
    return NextResponse.json(
      { error: 'Authentication required to view atelier orders.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);

  // If admin, can view all orders or filter by customerId
  if (adminSession) {
    const customerId = searchParams.get('customerId') || undefined;
    const orders = store.getOrders(customerId);
    return NextResponse.json({ orders });
  }

  // If client, strictly restricted to their own orders
  const orders = store.getOrders(clientSession!.userId);
  return NextResponse.json({ orders });
}

export async function POST(req: Request) {
  try {
    const adminSession = await getAdminSession();
    const clientSession = await getClientSession();

    if (!adminSession && !clientSession) {
      return NextResponse.json(
        { error: 'Authentication required to place an atelier order.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { items, shippingAddress, paymentMethod } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Order items required' }, { status: 400 });
    }

    // Determine customer attributes based on session
    const customerId = adminSession
      ? body.customerId || 'user-client-01'
      : clientSession!.userId;
    const customerName = adminSession
      ? body.customerName || 'Private Patron'
      : clientSession!.name;
    const customerEmail = adminSession
      ? body.customerEmail || 'patron@kirtidesai.com'
      : clientSession!.email;

    const order = store.createOrder(
      customerId,
      customerName,
      customerEmail,
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
    const adminSession = await getAdminSession();
    if (!adminSession) {
      return NextResponse.json(
        { error: 'Administrative clearance required to update order status.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { orderId, status, trackingNumber, carrier } = body;

    if (!orderId || !status) {
      return NextResponse.json({ error: 'orderId and status required' }, { status: 400 });
    }

    const order = store.updateOrderStatus(
      orderId,
      status,
      trackingNumber,
      carrier,
      adminSession.name,
      adminSession.role
    );

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to update order' }, { status: 500 });
  }
}
