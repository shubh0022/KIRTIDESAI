import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ownerId = searchParams.get('ownerId') || undefined;
  const passports = store.getPassports(ownerId);
  return NextResponse.json({ passports });
}
