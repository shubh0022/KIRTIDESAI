// Digital Atelier Transactional In-Memory & File Store
// Provides reliable, persistent operations across Client & Admin portals

import fs from 'fs';
import path from 'path';
import {
  Order,
  CustomProject,
  Quote,
  Consultation,
  MeasurementProfile,
  DigitalPiecePassport,
  InventoryItem,
  SupportTicket,
  AtelierNotification,
  AuditLogEntry,
  UserProfile,
  AnalyticsSummary,
} from './types';
import {
  SEED_USERS,
  SEED_ORDERS,
  SEED_CUSTOM_PROJECTS,
  SEED_QUOTES,
  SEED_CONSULTATIONS,
  SEED_MEASUREMENTS,
  SEED_PASSPORTS,
  SEED_INVENTORY,
  SEED_TICKETS,
  SEED_NOTIFICATIONS,
  SEED_AUDIT_LOG,
} from './seed';

interface AtelierDatabaseSchema {
  users: UserProfile[];
  orders: Order[];
  projects: CustomProject[];
  quotes: Quote[];
  consultations: Consultation[];
  measurements: MeasurementProfile[];
  passports: DigitalPiecePassport[];
  inventory: InventoryItem[];
  tickets: SupportTicket[];
  notifications: AtelierNotification[];
  auditLog: AuditLogEntry[];
}

class AtelierStore {
  private data: AtelierDatabaseSchema;
  private filePath: string;
  private isLoaded: boolean = false;

  constructor() {
    this.filePath = path.join(process.cwd(), 'src', 'data', 'atelier-store.json');
    this.data = {
      users: [...SEED_USERS],
      orders: [...SEED_ORDERS],
      projects: [...SEED_CUSTOM_PROJECTS],
      quotes: [...SEED_QUOTES],
      consultations: [...SEED_CONSULTATIONS],
      measurements: [...SEED_MEASUREMENTS],
      passports: [...SEED_PASSPORTS],
      inventory: [...SEED_INVENTORY],
      tickets: [...SEED_TICKETS],
      notifications: [...SEED_NOTIFICATIONS],
      auditLog: [...SEED_AUDIT_LOG],
    };
    this.load();
  }

  private load() {
    if (typeof window !== 'undefined') return;
    try {
      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, 'utf-8');
        if (fileContent.trim()) {
          const parsed = JSON.parse(fileContent);
          this.data = { ...this.data, ...parsed };
        }
      } else {
        this.save();
      }
      this.isLoaded = true;
    } catch (e) {
      console.warn('AtelierStore: Fallback to seed data in memory', e);
    }
  }

  private save() {
    if (typeof window !== 'undefined') return;
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (e) {
      console.warn('AtelierStore: Could not persist to disk', e);
    }
  }

  // --- AUDIT LOGGING ---
  public logAudit(
    actorName: string,
    actorRole: any,
    action: string,
    resource: string,
    resourceId: string,
    details: string
  ) {
    const entry: AuditLogEntry = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actorName,
      actorRole,
      action,
      resource,
      resourceId,
      details,
      timestamp: new Date().toISOString(),
    };
    this.data.auditLog.unshift(entry);
    this.save();
    return entry;
  }

  // --- NOTIFICATIONS ---
  public addNotification(
    userId: string,
    recipientRole: 'CLIENT' | 'ADMIN' | 'ALL',
    category: any,
    title: string,
    message: string,
    link?: string
  ) {
    const notif: AtelierNotification = {
      id: `notif-${Date.now()}`,
      userId,
      recipientRole,
      category,
      title,
      message,
      read: false,
      link,
      createdAt: new Date().toISOString(),
    };
    this.data.notifications.unshift(notif);
    this.save();
    return notif;
  }

  public getNotifications(userId?: string, role?: string) {
    return this.data.notifications.filter((n) => {
      if (role === 'SUPER_ADMIN' || role === 'ADMIN') {
        return n.recipientRole === 'ADMIN' || n.recipientRole === 'ALL';
      }
      return n.userId === userId || n.recipientRole === 'CLIENT' || n.recipientRole === 'ALL';
    });
  }

  public markNotificationRead(id: string) {
    const n = this.data.notifications.find((notif) => notif.id === id);
    if (n) {
      n.read = true;
      this.save();
    }
    return n;
  }

  // --- ORDERS ---
  public getOrders(customerId?: string) {
    if (customerId) {
      return this.data.orders.filter((o) => o.customerId === customerId);
    }
    return this.data.orders;
  }

  public getOrderById(id: string) {
    return this.data.orders.find((o) => o.id === id || o.orderNumber === id);
  }

  public updateOrderStatus(
    orderId: string,
    newStatus: any,
    trackingNumber?: string,
    carrier?: string,
    actorName: string = 'Kirti Desai',
    actorRole: any = 'SUPER_ADMIN'
  ) {
    const order = this.data.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (!order) return null;

    const previousStatus = order.status;
    order.status = newStatus;
    order.updatedAt = new Date().toISOString();

    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (carrier) order.carrier = carrier;

    // Add timeline event
    order.timeline.push({
      status: newStatus,
      label: newStatus.replace(/_/g, ' '),
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      description: `Order status shifted from ${previousStatus} to ${newStatus}`,
      actor: actorName,
    });

    this.logAudit(
      actorName,
      actorRole,
      'UPDATE_ORDER_STATUS',
      'Order',
      order.orderNumber,
      `Changed status from ${previousStatus} to ${newStatus}. Tracking: ${trackingNumber || 'Unchanged'}`
    );

    this.addNotification(
      order.customerId,
      'CLIENT',
      'Order',
      `Order ${order.orderNumber} ${newStatus.replace(/_/g, ' ')}`,
      `Your garment order is now in stage: ${newStatus.replace(/_/g, ' ')}.`,
      `/account?tab=pieces`
    );

    this.save();
    return order;
  }

  public createOrder(
    customerId: string,
    customerName: string,
    customerEmail: string,
    items: any[],
    shippingAddress: any,
    paymentMethod: string = 'Credit Card'
  ) {
    const subtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    const tax = Math.round(subtotal * 0.12);
    const shippingCost = 3500;
    const total = subtotal + tax + shippingCost;
    const orderNumber = `KD-${1040 + this.data.orders.length + 1}`;

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber,
      customerId,
      customerName,
      customerEmail,
      items,
      subtotal,
      tax,
      shippingCost,
      total,
      paymentStatus: 'PAID',
      paymentMethod,
      status: 'ORDER_CONFIRMED',
      shippingAddress,
      timeline: [
        {
          status: 'ORDER_CONFIRMED',
          label: 'Order Confirmed',
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          description: 'Client order registered into atelier production ledger.',
          actor: 'Patron Checkout',
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.data.orders.unshift(newOrder);

    // Update inventory reserved counts
    items.forEach((item) => {
      const inv = this.data.inventory.find((i) => i.id === item.productId);
      if (inv && inv.available > 0) {
        inv.reserved += item.quantity || 1;
        inv.available = Math.max(0, inv.stock - inv.reserved);
      }
    });

    this.logAudit(
      customerName,
      'CLIENT',
      'CREATE_ORDER',
      'Order',
      orderNumber,
      `Patron placed order for ${items.length} pieces totaling ₹${total.toLocaleString()}`
    );

    this.addNotification(
      'user-admin-01',
      'ADMIN',
      'Order',
      `New Order ${orderNumber}`,
      `${customerName} purchased ${items.length} item(s) for ₹${total.toLocaleString()}`,
      `/admin?tab=orders`
    );

    this.save();
    return newOrder;
  }

  // --- CUSTOM PROJECTS ---
  public getProjects(customerId?: string) {
    if (customerId) {
      return this.data.projects.filter((p) => p.customerId === customerId);
    }
    return this.data.projects;
  }

  public getProjectById(id: string) {
    return this.data.projects.find((p) => p.id === id || p.requestId === id);
  }

  public createProject(
    customerId: string,
    customerName: string,
    customerEmail: string,
    data: Partial<CustomProject>
  ) {
    const requestId = `REQ-2026-${String(this.data.projects.length + 85).padStart(3, '0')}`;
    const newProject: CustomProject = {
      id: `proj-${Date.now()}`,
      requestId,
      projectName: data.projectName || `${data.service || 'Bespoke'} Commission`,
      customerId,
      customerName,
      customerEmail,
      service: data.service || 'BESPOKE',
      occasion: data.occasion || 'Private Couture Commission',
      desiredDate: data.desiredDate || 'Within 6-8 Weeks',
      budgetRange: data.budgetRange || 'INR 50,000 – 1,00,000',
      description: data.description || '',
      referenceImages: data.referenceImages || [],
      status: 'SUBMITTED',
      designerNotes: 'New brief submitted via digital client portal.',
      priority: 'Normal',
      stages: [
        { stageName: 'SUBMISSION', status: 'completed', completedAt: new Date().toISOString().slice(0, 10) },
        { stageName: 'UNDER_REVIEW', status: 'in_progress' },
        { stageName: 'CONSULTATION', status: 'pending' },
        { stageName: 'DESIGN', status: 'pending' },
        { stageName: 'QUOTE', status: 'pending' },
        { stageName: 'CONSTRUCTION', status: 'pending' },
        { stageName: 'FITTING', status: 'pending' },
        { stageName: 'DELIVERY', status: 'pending' },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.data.projects.unshift(newProject);

    this.logAudit(
      customerName,
      'CLIENT',
      'CREATE_PROJECT',
      'CustomProject',
      requestId,
      `Submitted bespoke commission inquiry for: ${newProject.projectName}`
    );

    this.addNotification(
      'user-admin-01',
      'ADMIN',
      'Project',
      `New Custom Inquiry ${requestId}`,
      `${customerName} initiated bespoke commission: ${newProject.projectName}`,
      `/admin?tab=projects`
    );

    this.save();
    return newProject;
  }

  public updateProjectStatus(
    projectId: string,
    newStatus: any,
    designerNotes?: string,
    actorName: string = 'Kirti Desai',
    actorRole: any = 'SUPER_ADMIN'
  ) {
    const proj = this.data.projects.find((p) => p.id === projectId || p.requestId === projectId);
    if (!proj) return null;

    const oldStatus = proj.status;
    proj.status = newStatus;
    if (designerNotes) proj.designerNotes = designerNotes;
    proj.updatedAt = new Date().toISOString();

    this.logAudit(
      actorName,
      actorRole,
      'UPDATE_PROJECT_STATUS',
      'CustomProject',
      proj.requestId,
      `Shifted status from ${oldStatus} to ${newStatus}`
    );

    this.addNotification(
      proj.customerId,
      'CLIENT',
      'Project',
      `Project Updated: ${proj.projectName}`,
      `Your bespoke commission is now in phase: ${newStatus.replace(/_/g, ' ')}.`,
      `/account?tab=projects`
    );

    this.save();
    return proj;
  }

  // --- QUOTES ---
  public getQuotes(customerId?: string) {
    if (customerId) {
      return this.data.quotes.filter((q) => q.customerId === customerId);
    }
    return this.data.quotes;
  }

  public createQuote(data: Omit<Quote, 'id' | 'quoteNumber' | 'createdAt' | 'updatedAt'>) {
    const quoteNumber = `Q-${8830 + this.data.quotes.length + 1}`;
    const newQuote: Quote = {
      ...data,
      id: `quote-${Date.now()}`,
      quoteNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.data.quotes.unshift(newQuote);

    // Link quote to project if project exists
    const proj = this.data.projects.find((p) => p.id === data.projectId);
    if (proj) {
      proj.quoteId = newQuote.id;
      proj.status = 'QUOTE_SENT';
    }

    this.logAudit(
      'Kirti Desai',
      'SUPER_ADMIN',
      'CREATE_QUOTE',
      'Quote',
      quoteNumber,
      `Dispatched quotation for ${data.projectName} totaling ₹${data.total.toLocaleString()}`
    );

    this.addNotification(
      data.customerId,
      'CLIENT',
      'Quote',
      `Bespoke Quotation Ready (${quoteNumber})`,
      `Your custom project quote for ${data.projectName} is ready for review.`,
      `/account?tab=quotes`
    );

    this.save();
    return newQuote;
  }

  public respondToQuote(
    quoteId: string,
    action: 'ACCEPTED' | 'CHANGES_REQUESTED' | 'DECLINED',
    clientNotes?: string,
    actorName: string = 'Elena Rossi'
  ) {
    const quote = this.data.quotes.find((q) => q.id === quoteId || q.quoteNumber === quoteId);
    if (!quote) return null;

    quote.status = action;
    if (clientNotes) quote.clientNotes = clientNotes;
    quote.updatedAt = new Date().toISOString();

    // Automatically update the associated project status
    const proj = this.data.projects.find((p) => p.id === quote.projectId);
    if (proj) {
      if (action === 'ACCEPTED') {
        proj.status = 'APPROVED';
      } else if (action === 'CHANGES_REQUESTED') {
        proj.status = 'UNDER_REVIEW';
      } else if (action === 'DECLINED') {
        proj.status = 'CANCELLED';
      }
    }

    this.logAudit(
      actorName,
      'CLIENT',
      `QUOTE_${action}`,
      'Quote',
      quote.quoteNumber,
      `Client responded with: ${action}. Notes: ${clientNotes || 'None'}`
    );

    this.addNotification(
      'user-admin-01',
      'ADMIN',
      'Quote',
      `Quote ${quote.quoteNumber} ${action}`,
      `${actorName} responded to quote for ${quote.projectName} (${action})`,
      `/admin?tab=quotes`
    );

    this.save();
    return quote;
  }

  // --- CONSULTATIONS ---
  public getConsultations(customerId?: string) {
    if (customerId) {
      return this.data.consultations.filter((c) => c.customerId === customerId);
    }
    return this.data.consultations;
  }

  public bookConsultation(
    customerId: string,
    customerName: string,
    customerEmail: string,
    data: Partial<Consultation>
  ) {
    const appointmentId = `APT-${9100 + this.data.consultations.length + 1}`;
    const newConsultation: Consultation = {
      id: `apt-${Date.now()}`,
      appointmentId,
      customerId,
      customerName,
      customerEmail,
      service: data.service || 'BESPOKE',
      date: data.date || new Date().toISOString().slice(0, 10),
      timeSlot: data.timeSlot || '15:30 – 16:30 IST',
      format: data.format || 'Virtual Atelier',
      status: 'CONFIRMED',
      notes: data.notes || '',
      projectId: data.projectId,
      designerAssigned: 'Kirti Desai',
      createdAt: new Date().toISOString(),
    };

    this.data.consultations.unshift(newConsultation);

    this.logAudit(
      customerName,
      'CLIENT',
      'BOOK_CONSULTATION',
      'Consultation',
      appointmentId,
      `Reserved ${newConsultation.format} session on ${newConsultation.date} (${newConsultation.timeSlot})`
    );

    this.addNotification(
      'user-admin-01',
      'ADMIN',
      'Consultation',
      `New Consultation Booking: ${appointmentId}`,
      `${customerName} scheduled ${newConsultation.format} on ${newConsultation.date}`,
      `/admin?tab=consultations`
    );

    this.save();
    return newConsultation;
  }

  // --- MEASUREMENTS ---
  public getMeasurements(userId: string) {
    return this.data.measurements.filter((m) => m.userId === userId);
  }

  public saveMeasurements(userId: string, profile: Partial<MeasurementProfile>) {
    let existing = this.data.measurements.find(
      (m) => m.userId === userId && m.id === profile.id
    );

    if (existing) {
      Object.assign(existing, profile, { lastUpdated: new Date().toISOString() });
    } else {
      existing = {
        id: `meas-${Date.now()}`,
        userId,
        name: profile.name || 'My Standard',
        unit: profile.unit || 'cm',
        ...profile,
        lastUpdated: new Date().toISOString(),
      } as MeasurementProfile;
      this.data.measurements.push(existing);
    }

    this.logAudit(
      'Elena Rossi',
      'CLIENT',
      'UPDATE_MEASUREMENTS',
      'MeasurementProfile',
      existing.id,
      `Updated ${existing.name} profile (${existing.unit})`
    );

    this.save();
    return existing;
  }

  // --- PASSPORTS ---
  public getPassports(ownerId?: string) {
    if (ownerId) {
      return this.data.passports.filter((p) => p.ownerId === ownerId);
    }
    return this.data.passports;
  }

  // --- INVENTORY ---
  public getInventory() {
    return this.data.inventory;
  }

  public updateInventoryItem(id: string, updates: Partial<InventoryItem>) {
    const item = this.data.inventory.find((i) => i.id === id);
    if (!item) return null;

    Object.assign(item, updates);
    item.available = Math.max(0, item.stock - item.reserved);

    if (item.available === 0) item.status = 'OUT_OF_STOCK';
    else if (item.available <= item.lowStockThreshold) item.status = 'LOW_STOCK';
    else item.status = 'IN_STOCK';

    this.logAudit(
      'Kirti Desai',
      'SUPER_ADMIN',
      'UPDATE_INVENTORY',
      'InventoryItem',
      item.sku,
      `Adjusted stock to ${item.stock} (Available: ${item.available}, Status: ${item.status})`
    );

    this.save();
    return item;
  }

  // --- SUPPORT TICKETS ---
  public getTickets(customerId?: string) {
    if (customerId) {
      return this.data.tickets.filter((t) => t.customerId === customerId);
    }
    return this.data.tickets;
  }

  public createTicket(
    customerId: string,
    customerName: string,
    customerEmail: string,
    subject: string,
    category: any,
    message: string,
    relatedOrderId?: string,
    relatedProjectId?: string
  ) {
    const ticketNumber = `TK-${7300 + this.data.tickets.length + 1}`;
    const newTicket: SupportTicket = {
      id: `tick-${Date.now()}`,
      ticketNumber,
      customerId,
      customerName,
      customerEmail,
      subject,
      category,
      relatedOrderId,
      relatedProjectId,
      status: 'OPEN',
      priority: 'Medium',
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderName: customerName,
          senderRole: 'CLIENT',
          message,
          timestamp: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.data.tickets.unshift(newTicket);

    this.logAudit(
      customerName,
      'CLIENT',
      'CREATE_TICKET',
      'SupportTicket',
      ticketNumber,
      `Created ticket: "${subject}"`
    );

    this.addNotification(
      'user-admin-01',
      'ADMIN',
      'System',
      `New Atelier Support Ticket (${ticketNumber})`,
      `${customerName}: "${subject}"`,
      `/admin?tab=support`
    );

    this.save();
    return newTicket;
  }

  // --- AUDIT LOG ---
  public getAuditLog() {
    return this.data.auditLog;
  }

  // --- ANALYTICS ---
  public getAnalyticsSummary(): AnalyticsSummary {
    const totalRevenue = this.data.orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = this.data.orders.length;
    const activeProjects = this.data.projects.filter(
      (p) => p.status !== 'COMPLETED' && p.status !== 'CANCELLED'
    ).length;
    const pendingRequests = this.data.projects.filter((p) => p.status === 'SUBMITTED').length;
    const lowStockAlerts = this.data.inventory.filter((i) => i.status === 'LOW_STOCK' || i.status === 'OUT_OF_STOCK').length;
    const upcomingConsultations = this.data.consultations.filter(
      (c) => c.status === 'CONFIRMED'
    ).length;
    const openTickets = this.data.tickets.filter((t) => t.status === 'OPEN' || t.status === 'IN_PROGRESS').length;
    const pendingQuotes = this.data.quotes.filter((q) => q.status === 'SENT').length;

    return {
      revenue: totalRevenue,
      totalOrders,
      averageOrderValue: totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0,
      activeProjects,
      pendingRequests,
      lowStockAlerts,
      upcomingConsultations,
      openTickets,
      pendingQuotes,
      conversionRate: 4.8,
      topPieces: [
        { title: 'Victorian Corset Toile Edition', count: 8, revenue: 308000 },
        { title: 'Handloom Khadi Relaxed Blazer', count: 6, revenue: 174000 },
        { title: 'Pipli Appliqué Statement Cape', count: 3, revenue: 204000 },
      ],
      revenueTrend: [
        { date: 'Oct 2025', amount: 82000 },
        { date: 'Nov 2025', amount: 125000 },
        { date: 'Dec 2025', amount: 168000 },
        { date: 'Jan 2026', amount: 210000 },
        { date: 'Feb 2026', amount: 285000 },
        { date: 'Mar 2026', amount: totalRevenue },
      ],
    };
  }
}

// Global Singleton
const globalStore = (global as any).__atelierStore || new AtelierStore();
if (process.env.NODE_ENV !== 'production') {
  (global as any).__atelierStore = globalStore;
}

export default globalStore as AtelierStore;
