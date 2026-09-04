import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';

export async function GET() {
  const inventory = store.getInventory();
  return NextResponse.json({ inventory });
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Item ID required' }, { status: 400 });
    }

    const item = store.updateInventoryItem(id, updates);
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, item });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to update inventory' }, { status: 500 });
  }
}
