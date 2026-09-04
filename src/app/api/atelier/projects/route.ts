import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get('customerId') || undefined;
  const projects = store.getProjects(customerId);
  return NextResponse.json({ projects });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerId, customerName, customerEmail, ...data } = body;

    const project = store.createProject(
      customerId || 'user-client-01',
      customerName || 'Elena Rossi',
      customerEmail || 'elena.rossi@milanocouture.it',
      data
    );

    return NextResponse.json({ success: true, project });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to create project' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { projectId, status, designerNotes, actorName, actorRole } = body;

    if (!projectId || !status) {
      return NextResponse.json({ error: 'projectId and status required' }, { status: 400 });
    }

    const project = store.updateProjectStatus(
      projectId,
      status,
      designerNotes,
      actorName,
      actorRole
    );

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, project });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to update project' }, { status: 500 });
  }
}
