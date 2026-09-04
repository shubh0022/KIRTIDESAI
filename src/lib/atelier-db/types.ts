// Digital Atelier Core Database Types & Schema Definitions
// Single Source of Truth for Fashion House Business Logic

export type UserRole =
  | 'CLIENT'
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'DESIGNER'
  | 'ATELIER_STAFF'
  | 'FULFILLMENT'
  | 'SUPPORT';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  preferredCommunication?: 'Email' | 'WhatsApp' | 'Phone';
  language?: string;
  country?: string;
  stylePreferences?: string[];
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  type: 'Shipping' | 'Billing' | 'Other';
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface PaymentMethodSummary {
  id: string;
  userId: string;
  brand: 'Visa' | 'MasterCard' | 'Amex' | 'UPI';
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export type OrderStatus =
  | 'ORDER_CONFIRMED'
  | 'PREPARING'
  | 'CRAFTING'
  | 'QUALITY_CHECK'
  | 'PACKED'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItem {
  id: string;
  productId: string;
  title: string;
  variant?: string; // e.g. "Toile Edition / Size S"
  size: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  passportId?: string;
}

export interface OrderTimelineEvent {
  status: string;
  label: string;
  date: string;
  description?: string;
  actor?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "KD-1042"
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED';
  paymentMethod: string;
  status: OrderStatus;
  shippingAddress: Address;
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  timeline: OrderTimelineEvent[];
  notes?: string;
  internalNotes?: string;
  invoiceUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type CustomProjectService =
  | 'BESPOKE'
  | 'MADE_TO_MEASURE'
  | 'CUSTOM_GARMENT'
  | 'COSTUME_DESIGN'
  | 'STYLING'
  | 'COLLABORATION';

export type CustomProjectStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'CONSULTATION'
  | 'DESIGN'
  | 'QUOTE_SENT'
  | 'AWAITING_APPROVAL'
  | 'APPROVED'
  | 'MEASUREMENTS'
  | 'MATERIAL'
  | 'PATTERN'
  | 'CONSTRUCTION'
  | 'FITTING'
  | 'REVISION'
  | 'FINAL_APPROVAL'
  | 'COMPLETED'
  | 'CANCELLED';

export interface CustomProjectStageRecord {
  stageName: string;
  status: 'pending' | 'in_progress' | 'completed';
  completedAt?: string;
  notes?: string;
  photos?: string[];
}

export interface CustomProject {
  id: string;
  requestId: string; // e.g. "REQ-2026-084"
  projectName: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  service: CustomProjectService;
  occasion: string;
  desiredDate: string;
  budgetRange: string;
  measurementProfileId?: string;
  styleDirection?: string;
  materialPreference?: string;
  colorPreference?: string;
  description: string;
  referenceImages: string[];
  status: CustomProjectStatus;
  designerNotes?: string;
  assignedStaff?: string;
  priority?: 'Normal' | 'High' | 'Couture VIP';
  stages: CustomProjectStageRecord[];
  quoteId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteItem {
  id: string;
  description: string;
  category: 'Base Design' | 'Material' | 'Labour' | 'Craft' | 'Styling' | 'Alterations' | 'Shipping';
  amount: number;
}

export interface Quote {
  id: string;
  quoteNumber: string; // e.g. "Q-8821"
  projectId: string;
  projectName: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: QuoteItem[];
  subtotal: number;
  additionalCharges: number;
  tax: number;
  discount: number;
  total: number;
  validUntil: string;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'CHANGES_REQUESTED' | 'DECLINED';
  clientNotes?: string;
  designerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export type ConsultationStatus =
  | 'REQUESTED'
  | 'CONFIRMED'
  | 'RESCHEDULED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW';

export interface Consultation {
  id: string;
  appointmentId: string; // e.g. "APT-9102"
  customerId: string;
  customerName: string;
  customerEmail: string;
  service: CustomProjectService | 'General Styling';
  date: string;
  timeSlot: string;
  format: 'Virtual Atelier' | 'Physical Studio - Vadodara' | 'Private Residence';
  status: ConsultationStatus;
  notes?: string;
  projectId?: string;
  designerAssigned: string;
  createdAt: string;
}

export interface MeasurementProfile {
  id: string;
  userId: string;
  name: string; // e.g. "My Standard", "Gala Occasion"
  unit: 'cm' | 'inches';
  height?: number;
  bust?: number;
  underbust?: number;
  waist?: number;
  highHip?: number;
  fullHip?: number;
  shoulder?: number;
  armhole?: number;
  sleeveLength?: number;
  garmentLength?: number;
  inseam?: number;
  napeToWaist?: number;
  notes?: string;
  lastUpdated: string;
}

export interface GarmentCareRecord {
  id: string;
  pieceName: string;
  fabric: string;
  technique: string;
  washing: string;
  drying: string;
  ironing: string;
  storage: string;
  cleaning: string;
  warnings: string;
}

export interface DigitalPiecePassport {
  id: string;
  passportNumber: string; // e.g. "DPP-KD-0042"
  pieceName: string;
  collection: string;
  edition: string; // e.g. "1 of 12" or "Bespoke Unique"
  materialProvenance: string;
  craftTechnique: string;
  artisanCredits: string;
  purchaseDate: string;
  ownerId: string;
  ownerName: string;
  certificateHash: string;
  verified: boolean;
  careInstructions: GarmentCareRecord;
}

export interface InventoryItem {
  id: string;
  sku: string;
  productTitle: string;
  category: string;
  size: string;
  price: number;
  stock: number;
  reserved: number;
  available: number;
  lowStockThreshold: number;
  leadTime: string;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'MADE_TO_ORDER';
  image: string;
}

export interface SupportTicketMessage {
  id: string;
  senderName: string;
  senderRole: UserRole;
  message: string;
  timestamp: string;
  attachments?: string[];
}

export interface SupportTicket {
  id: string;
  ticketNumber: string; // e.g. "TK-7301"
  customerId: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  category: 'Orders' | 'Custom Project' | 'Fitting & Sizing' | 'Care & Aftercare' | 'General';
  relatedOrderId?: string;
  relatedProjectId?: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING_FOR_CUSTOMER' | 'RESOLVED' | 'CLOSED';
  priority: 'Low' | 'Medium' | 'High';
  messages: SupportTicketMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface AtelierNotification {
  id: string;
  userId: string;
  recipientRole: 'CLIENT' | 'ADMIN' | 'ALL';
  category: 'Order' | 'Project' | 'Quote' | 'Consultation' | 'Care' | 'Shop' | 'System';
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  resource: string;
  resourceId: string;
  details: string;
  timestamp: string;
}

export interface AnalyticsSummary {
  revenue: number;
  totalOrders: number;
  averageOrderValue: number;
  activeProjects: number;
  pendingRequests: number;
  lowStockAlerts: number;
  upcomingConsultations: number;
  openTickets: number;
  pendingQuotes: number;
  conversionRate: number;
  topPieces: { title: string; count: number; revenue: number }[];
  revenueTrend: { date: string; amount: number }[];
}
