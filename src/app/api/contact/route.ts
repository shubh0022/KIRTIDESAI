import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';

// In-memory rate limiting tracker (per IP / email)
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const requestCounts = new Map<string, { count: number; expiresAt: number }>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();

    // 1. Rate Limiting
    const record = requestCounts.get(ip);
    if (record) {
      if (now > record.expiresAt) {
        requestCounts.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
      } else {
        if (record.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            { error: 'Too many inquiries submitted. Please wait a minute before trying again.' },
            { status: 429 }
          );
        }
        record.count += 1;
      }
    } else {
      requestCounts.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    }

    // 2. Parse & Validate Payload
    const body = await req.json();
    const { name, email, phone, projectType, message, honeypot } = body;

    // Spam Honeypot Check
    if (honeypot) {
      return NextResponse.json({ success: true }); // Silently drop bot submissions
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please provide your name.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a descriptive message (at least 10 characters).' },
        { status: 400 }
      );
    }

    const validProjectTypes = [
      'FASHION DESIGN',
      'COSTUME',
      'STYLING',
      'CRAFT',
      'RESEARCH',
      'CUSTOM PROJECT',
      'OTHER',
    ];

    const sanitizedCategory = validProjectTypes.includes(projectType)
      ? projectType
      : 'CUSTOM PROJECT';

    // 3. Persist into Atelier Store as a Custom Project / Inquiry
    const newInquiry = store.createProject(
      'guest-inquiry',
      name.trim(),
      email.trim().toLowerCase(),
      {
        projectName: `Inquiry: ${sanitizedCategory} — ${name.trim()}`,
        service: 'BESPOKE',
        occasion: sanitizedCategory,
        description: message.trim(),
        designerNotes: `Phone: ${phone?.trim() || 'N/A'}. Inquiry submitted via public contact portal on ${new Date().toISOString()}`,
      }
    );

    // 4. Log Audit Event for Atelier Admin
    store.logAudit(
      `${name.trim()} (${email.trim()})`,
      'PUBLIC',
      'NEW_CONTACT_INQUIRY',
      'Project',
      newInquiry.id,
      `Project category: ${sanitizedCategory}`
    );

    return NextResponse.json({
      success: true,
      inquiryId: newInquiry.id,
      message: 'Your inquiry has been received by Kirti Desai Atelier. We will reply within 48 hours.',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
