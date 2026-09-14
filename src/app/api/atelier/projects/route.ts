import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';
import { getAdminSession, getClientSession } from '@/lib/auth/session';

export async function GET(req: Request) {
  const adminSession = await getAdminSession();
  const clientSession = await getClientSession();

  if (!adminSession && !clientSession) {
    return NextResponse.json(
      { error: 'Authentication required to access atelier bespoke commissions.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);

  if (adminSession) {
    const customerId = searchParams.get('customerId') || undefined;
    const projects = store.getProjects(customerId);
    return NextResponse.json({ projects });
  }

  // Client restricted to own projects
  const projects = store.getProjects(clientSession!.userId);
  return NextResponse.json({ projects });
}

export async function POST(req: Request) {
  try {
    const adminSession = await getAdminSession();
    const clientSession = await getClientSession();

    if (!adminSession && !clientSession) {
      return NextResponse.json(
        { error: 'Authentication required to initiate a bespoke commission.' },
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

    const project = store.createProject(
      customerId,
      customerName,
      customerEmail,
      body
    );

    return NextResponse.json({ success: true, project });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to create project' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const adminSession = await getAdminSession();
    if (!adminSession) {
      return NextResponse.json(
        { error: 'Administrative clearance required to update commission stage.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { projectId, status, designerNotes } = body;

    if (!projectId || !status) {
      return NextResponse.json({ error: 'projectId and status required' }, { status: 400 });
    }

    const project = store.updateProjectStatus(
      projectId,
      status,
      designerNotes,
      adminSession.name,
      adminSession.role
    );

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, project });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to update project' }, { status: 500 });
  }
}
