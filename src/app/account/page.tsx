'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  FolderCheck,
  Calendar,
  Ruler,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  FileText,
  Mail,
  Scissors,
  QrCode,
  Download,
  AlertCircle,
  ChevronRight,
  Eye,
  Plus,
  Compass,
  Sliders,
  Bell,
  MapPin,
  CreditCard,
  Lock,
} from 'lucide-react';
import {
  KDButton,
  KDCard,
  KDStatus,
  KDBadge,
  KDModal,
  KDTimeline,
  TimelineStep,
  KDInput,
  KDSelect,
  KDTextarea,
  KDEmptyState,
} from '@/design-system';
import { useAtelier } from '@/context/AtelierContext';
import {
  Order,
  CustomProject,
  Quote,
  Consultation,
  MeasurementProfile,
  DigitalPiecePassport,
  GarmentCareRecord,
  SupportTicket,
  AtelierNotification,
} from '@/lib/atelier-db/types';

export default function MyAtelierClientPage() {
  const { wishlist, toggleWishlist, addToBag } = useAtelier();

  // Navigation tabs
  type ClientTab =
    | 'overview'
    | 'pieces'
    | 'projects'
    | 'quotes'
    | 'consultations'
    | 'measurements'
    | 'saved'
    | 'care'
    | 'account'
    | 'support';

  const [activeTab, setActiveTab] = useState<ClientTab>('overview');

  // Live state from atelier DB API
  const [orders, setOrders] = useState<Order[]>([]);
  const [projects, setProjects] = useState<CustomProject[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [measurements, setMeasurements] = useState<MeasurementProfile[]>([]);
  const [passports, setPassports] = useState<DigitalPiecePassport[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [notifications, setNotifications] = useState<AtelierNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [selectedPassport, setSelectedPassport] = useState<DigitalPiecePassport | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isStartProjectOpen, setIsStartProjectOpen] = useState(false);
  const [isBookConsultationOpen, setIsBookConsultationOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Form states
  const [newProjectForm, setNewProjectForm] = useState({
    service: 'BESPOKE',
    occasion: '',
    desiredDate: '',
    budgetRange: 'INR 50,000 – 1,00,000',
    description: '',
    styleDirection: '',
    materialPreference: '',
  });

  const [newConsultationForm, setNewConsultationForm] = useState({
    service: 'BESPOKE',
    date: '2026-03-25',
    timeSlot: '16:00 – 17:00 IST',
    format: 'Virtual Atelier',
    notes: '',
  });

  const [newTicketForm, setNewTicketForm] = useState({
    subject: '',
    category: 'Fitting & Sizing',
    message: '',
  });

  // Load all client data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [ordRes, projRes, quoteRes, aptRes, measRes, passRes, tickRes, notifRes] =
        await Promise.all([
          fetch('/api/atelier/orders?customerId=user-client-01'),
          fetch('/api/atelier/projects?customerId=user-client-01'),
          fetch('/api/atelier/quotes?customerId=user-client-01'),
          fetch('/api/atelier/consultations?customerId=user-client-01'),
          fetch('/api/atelier/measurements?userId=user-client-01'),
          fetch('/api/atelier/passports?ownerId=user-client-01'),
          fetch('/api/atelier/support?customerId=user-client-01'),
          fetch('/api/atelier/notifications?userId=user-client-01'),
        ]);

      const [ord, proj, quo, apt, meas, pass, tick, notif] = await Promise.all([
        ordRes.json(),
        projRes.json(),
        quoteRes.json(),
        aptRes.json(),
        measRes.json(),
        passRes.json(),
        tickRes.json(),
        notifRes.json(),
      ]);

      if (ord.orders) setOrders(ord.orders);
      if (proj.projects) setProjects(proj.projects);
      if (quo.quotes) setQuotes(quo.quotes);
      if (apt.consultations) setConsultations(apt.consultations);
      if (meas.measurements) setMeasurements(meas.measurements);
      if (pass.passports) setPassports(pass.passports);
      if (tick.tickets) setTickets(tick.tickets);
      if (notif.notifications) setNotifications(notif.notifications);
    } catch (err) {
      console.error('Failed to load client data', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers for interactive actions
  const handleQuoteResponse = async (
    quoteId: string,
    action: 'ACCEPTED' | 'CHANGES_REQUESTED' | 'DECLINED'
  ) => {
    try {
      const res = await fetch('/api/atelier/quotes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quoteId, action, actorName: 'Elena Rossi' }),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/atelier/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: 'user-client-01',
          customerName: 'Elena Rossi',
          customerEmail: 'elena.rossi@milanocouture.it',
          ...newProjectForm,
        }),
      });
      if (res.ok) {
        setIsStartProjectOpen(false);
        setActiveTab('projects');
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleBookConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/atelier/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: 'user-client-01',
          customerName: 'Elena Rossi',
          customerEmail: 'elena.rossi@milanocouture.it',
          ...newConsultationForm,
        }),
      });
      if (res.ok) {
        setIsBookConsultationOpen(false);
        setActiveTab('consultations');
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/atelier/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: 'user-client-01',
          customerName: 'Elena Rossi',
          customerEmail: 'elena.rossi@milanocouture.it',
          ...newTicketForm,
        }),
      });
      if (res.ok) {
        setIsSupportModalOpen(false);
        setNewTicketForm({ subject: '', category: 'Fitting & Sizing', message: '' });
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Active current order
  const activeOrder = orders.find((o) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED') || orders[0];
  const activeProject = projects.find((p) => p.status !== 'COMPLETED' && p.status !== 'CANCELLED') || projects[0];
  const nextAppointment = consultations.find((c) => c.status === 'CONFIRMED');

  return (
    <div className="pt-28 pb-28 px-4 sm:px-6 lg:px-12 max-w-[1500px] mx-auto min-h-screen">
      {/* Editorial Client Banner & Role Toggle Simulator */}
      <div className="pb-6 mb-8 border-b border-[#171717]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#A85E43] font-semibold">
              KIRTI DESAI · LUXURY ATELIER
            </span>
            <span className="text-[#171717]/20">/</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#171717]/60">
              CLIENT CONCIERGE PASS #KD-C849
            </span>
          </div>
          <h1 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] font-normal tracking-tight">
            MY ATELIER
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#171717]/70 font-light mt-1">
            Welcome, Elena Rossi. Your pieces, bespoke commissions, and private fitting records — together.
          </p>
        </div>

        {/* Quick Cross-Portal Switcher */}
        <div className="flex items-center gap-3 self-start md:self-auto bg-[#FAF7F2] p-2 border border-[#171717]/15">
          <div className="text-right hidden sm:block">
            <span className="font-mono text-[9px] text-[#A85E43] uppercase tracking-wider block font-semibold">
              PORTAL SWITCH
            </span>
            <span className="font-sans text-[11px] text-[#171717]/60">Role: Private Patron</span>
          </div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
          >
            <span>ATELIER CONTROL</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: CLIENT NAVIGATION (Desktop Sidebar + Mobile Chips) */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-[#FAF7F2] border border-[#171717]/15 p-4 sm:p-5 space-y-5">
            <div className="pb-4 border-b border-[#171717]/10 flex items-center justify-between">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] font-semibold block">
                  CONCIERGE DIRECTORY
                </span>
                <span className="font-editorial-serif text-lg text-[#171717]">Elena Rossi</span>
              </div>
              <KDBadge variant="clay" size="xs">
                PATRON VIP
              </KDBadge>
            </div>

            {/* Navigation Groups */}
            <nav className="space-y-1 font-mono text-xs" aria-label="Client Portal Navigation">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center justify-between p-3 rounded-[2px] transition-colors cursor-pointer text-left ${
                  activeTab === 'overview'
                    ? 'bg-[#171717] text-[#FAF7F2]'
                    : 'text-[#171717] hover:bg-[#171717]/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4" />
                  <span>OVERVIEW</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </button>

              <div className="pt-2 pb-1 text-[9px] uppercase tracking-[0.2em] text-[#171717]/40 px-3">
                GARMENTS & ORDERS
              </div>

              <button
                onClick={() => setActiveTab('pieces')}
                className={`w-full flex items-center justify-between p-3 rounded-[2px] transition-colors cursor-pointer text-left ${
                  activeTab === 'pieces'
                    ? 'bg-[#171717] text-[#FAF7F2]'
                    : 'text-[#171717] hover:bg-[#171717]/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4" />
                  <span>MY PIECES & ORDERS</span>
                </div>
                <span className="text-[10px] opacity-70">({orders.length})</span>
              </button>

              <div className="pt-2 pb-1 text-[9px] uppercase tracking-[0.2em] text-[#171717]/40 px-3">
                MY DESIGN & ATELIER
              </div>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center justify-between p-3 rounded-[2px] transition-colors cursor-pointer text-left ${
                  activeTab === 'projects'
                    ? 'bg-[#171717] text-[#FAF7F2]'
                    : 'text-[#171717] hover:bg-[#171717]/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FolderCheck className="w-4 h-4" />
                  <span>CUSTOM PROJECTS</span>
                </div>
                <span className="text-[10px] opacity-70">({projects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('quotes')}
                className={`w-full flex items-center justify-between p-3 rounded-[2px] transition-colors cursor-pointer text-left ${
                  activeTab === 'quotes'
                    ? 'bg-[#171717] text-[#FAF7F2]'
                    : 'text-[#171717] hover:bg-[#171717]/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4" />
                  <span>QUOTATIONS</span>
                </div>
                {quotes.some((q) => q.status === 'SENT') && (
                  <span className="w-2 h-2 rounded-full bg-[#A85E43] animate-pulse" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('consultations')}
                className={`w-full flex items-center justify-between p-3 rounded-[2px] transition-colors cursor-pointer text-left ${
                  activeTab === 'consultations'
                    ? 'bg-[#171717] text-[#FAF7F2]'
                    : 'text-[#171717] hover:bg-[#171717]/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4" />
                  <span>CONSULTATIONS</span>
                </div>
                <span className="text-[10px] opacity-70">({consultations.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('measurements')}
                className={`w-full flex items-center justify-between p-3 rounded-[2px] transition-colors cursor-pointer text-left ${
                  activeTab === 'measurements'
                    ? 'bg-[#171717] text-[#FAF7F2]'
                    : 'text-[#171717] hover:bg-[#171717]/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Ruler className="w-4 h-4" />
                  <span>MEASUREMENTS</span>
                </div>
                <span className="text-[10px] opacity-70">({measurements.length})</span>
              </button>

              <div className="pt-2 pb-1 text-[9px] uppercase tracking-[0.2em] text-[#171717]/40 px-3">
                ARCHIVE & AFTERCARE
              </div>

              <button
                onClick={() => setActiveTab('saved')}
                className={`w-full flex items-center justify-between p-3 rounded-[2px] transition-colors cursor-pointer text-left ${
                  activeTab === 'saved'
                    ? 'bg-[#171717] text-[#FAF7F2]'
                    : 'text-[#171717] hover:bg-[#171717]/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4" />
                  <span>SAVED PIECES</span>
                </div>
                <span className="text-[10px] opacity-70">({wishlist.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('care')}
                className={`w-full flex items-center justify-between p-3 rounded-[2px] transition-colors cursor-pointer text-left ${
                  activeTab === 'care'
                    ? 'bg-[#171717] text-[#FAF7F2]'
                    : 'text-[#171717] hover:bg-[#171717]/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Scissors className="w-4 h-4" />
                  <span>GARMENT CARE</span>
                </div>
                <span className="text-[10px] opacity-70">CARDS</span>
              </button>

              <div className="pt-2 pb-1 text-[9px] uppercase tracking-[0.2em] text-[#171717]/40 px-3">
                LIAISON & ACCOUNT
              </div>

              <button
                onClick={() => setActiveTab('support')}
                className={`w-full flex items-center justify-between p-3 rounded-[2px] transition-colors cursor-pointer text-left ${
                  activeTab === 'support'
                    ? 'bg-[#171717] text-[#FAF7F2]'
                    : 'text-[#171717] hover:bg-[#171717]/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4" />
                  <span>ATELIER LIAISON</span>
                </div>
                <span className="text-[10px] opacity-70">({tickets.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center justify-between p-3 rounded-[2px] transition-colors cursor-pointer text-left ${
                  activeTab === 'account'
                    ? 'bg-[#171717] text-[#FAF7F2]'
                    : 'text-[#171717] hover:bg-[#171717]/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sliders className="w-4 h-4" />
                  <span>SETTINGS & ADDRESSES</span>
                </div>
              </button>
            </nav>

            {/* Quick Action Buttons */}
            <div className="pt-4 border-t border-[#171717]/10 space-y-2">
              <KDButton
                variant="primary"
                size="sm"
                fullWidth
                icon={<Sparkles className="w-3.5 h-3.5" />}
                onClick={() => setIsStartProjectOpen(true)}
              >
                START A CUSTOM PROJECT
              </KDButton>

              <KDButton
                variant="secondary"
                size="sm"
                fullWidth
                icon={<Calendar className="w-3.5 h-3.5" />}
                onClick={() => setIsBookConsultationOpen(true)}
              >
                BOOK CONSULTATION
              </KDButton>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: TAB CONTENT VIEWS */}
        <main className="lg:col-span-9 space-y-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Active Garment Tracking Spotlight */}
              {activeOrder && (
                <KDCard variant="elevated" density="editorial">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#171717]/10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] font-semibold">
                          CURRENT SHIPMENT IN TRANSIT
                        </span>
                        <KDStatus status={activeOrder.status} />
                      </div>
                      <h3 className="font-editorial-serif text-2xl sm:text-3xl text-[#171717]">
                        Order #{activeOrder.orderNumber}
                      </h3>
                      <p className="font-sans text-xs text-[#171717]/70">
                        {activeOrder.items.map((i) => i.title).join(', ')} · Carrier:{' '}
                        {activeOrder.carrier || 'DHL Express Worldwide'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <KDButton
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedOrder(activeOrder)}
                      >
                        VIEW TIMELINE & INVOICE
                      </KDButton>
                    </div>
                  </div>

                  {/* Horizontal Data-Driven Timeline */}
                  <KDTimeline
                    steps={activeOrder.timeline.map((e, idx) => ({
                      label: e.label,
                      date: e.date.slice(5, 10),
                      description: e.description,
                      status:
                        idx === activeOrder.timeline.length - 1
                          ? 'current'
                          : 'completed',
                    }))}
                  />

                  {activeOrder.trackingNumber && (
                    <div className="p-3 bg-[#E5D8C8]/30 border border-[#171717]/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#171717]/70">
                        Tracking Number: <strong className="text-[#171717]">{activeOrder.trackingNumber}</strong>
                      </span>
                      <a
                        href={activeOrder.trackingUrl || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#A85E43] hover:underline"
                      >
                        <span>LIVE COURIER TRACKING</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </KDCard>
              )}

              {/* Two Column Grid: Active Custom Commission + Next Appointment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Active Custom Commission Card */}
                <KDCard variant="elevated" density="dense" className="flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] font-semibold">
                        ACTIVE BESPOKE PROJECT
                      </span>
                      {activeProject && <KDStatus status={activeProject.status} />}
                    </div>

                    {activeProject ? (
                      <>
                        <h4 className="font-editorial-serif text-2xl text-[#171717]">
                          {activeProject.projectName}
                        </h4>
                        <p className="font-sans text-xs text-[#171717]/70 line-clamp-2">
                          {activeProject.description}
                        </p>
                        <div className="p-3 bg-[#FAF7F2] border border-[#171717]/10 font-mono text-[11px] space-y-1">
                          <p>Service: {activeProject.service}</p>
                          <p>Target Date: {activeProject.desiredDate}</p>
                          <p>Budget: {activeProject.budgetRange}</p>
                        </div>
                      </>
                    ) : (
                      <p className="font-sans text-xs text-[#171717]/60 italic">
                        No active custom commissions currently underway.
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#171717]/10">
                    <KDButton
                      variant="secondary"
                      size="sm"
                      fullWidth
                      onClick={() => setActiveTab('projects')}
                    >
                      VIEW PROJECT WORKSPACE
                    </KDButton>
                  </div>
                </KDCard>

                {/* Upcoming Consultation Card */}
                <KDCard variant="elevated" density="dense" className="flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] font-semibold">
                        UPCOMING ATELIER SESSION
                      </span>
                      {nextAppointment && <KDStatus status={nextAppointment.status} />}
                    </div>

                    {nextAppointment ? (
                      <>
                        <h4 className="font-editorial-serif text-2xl text-[#171717]">
                          {nextAppointment.format}
                        </h4>
                        <div className="flex items-center gap-2 font-mono text-xs text-[#A85E43] font-semibold">
                          <Calendar className="w-4 h-4" />
                          <span>{nextAppointment.date} · {nextAppointment.timeSlot}</span>
                        </div>
                        <p className="font-sans text-xs text-[#171717]/70">
                          {nextAppointment.notes || 'Virtual fitting with Kirti Desai.'}
                        </p>
                      </>
                    ) : (
                      <p className="font-sans text-xs text-[#171717]/60 italic">
                        No upcoming consultations scheduled on your calendar.
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#171717]/10 flex gap-2">
                    <KDButton
                      variant="secondary"
                      size="sm"
                      fullWidth
                      onClick={() => setIsBookConsultationOpen(true)}
                    >
                      SCHEDULE SESSION
                    </KDButton>
                  </div>
                </KDCard>
              </div>

              {/* Digital Garment Library Quick Showcase */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#171717]/10">
                  <h3 className="font-editorial-serif text-2xl text-[#171717]">
                    Recent Atelier Silhouettes
                  </h3>
                  <button
                    onClick={() => setActiveTab('pieces')}
                    className="font-mono text-xs text-[#A85E43] hover:underline uppercase tracking-wider cursor-pointer"
                  >
                    VIEW ALL PIECES ({orders.flatMap((o) => o.items).length}) →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {orders
                    .flatMap((o) => o.items)
                    .slice(0, 3)
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#FAF7F2] border border-[#171717]/12 overflow-hidden flex flex-col justify-between hover:border-[#A85E43] transition-colors"
                      >
                        <div className="relative aspect-[3/4] w-full bg-[#E5D8C8]/30">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <KDBadge variant="neutral" size="xs">
                              {item.category}
                            </KDBadge>
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <h4 className="font-editorial-serif text-lg text-[#171717] leading-tight">
                            {item.title}
                          </h4>
                          <p className="font-mono text-[10px] text-[#171717]/60">
                            {item.variant || item.size} · ₹{item.price.toLocaleString()}
                          </p>

                          <div className="pt-2 border-t border-[#171717]/10">
                            <button
                              onClick={() => {
                                const pass = passports.find((p) => p.pieceName === item.title) || passports[0];
                                setSelectedPassport(pass);
                              }}
                              className="w-full flex items-center justify-center gap-1.5 p-2 bg-white border border-[#171717]/15 hover:border-[#A85E43] font-mono text-[10px] uppercase tracking-widest text-[#171717] transition-colors cursor-pointer"
                            >
                              <QrCode className="w-3.5 h-3.5 text-[#A85E43]" />
                              <span>VIEW DIGITAL PASSPORT</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY PIECES & ORDERS */}
          {activeTab === 'pieces' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
                <div>
                  <h3 className="font-editorial-serif text-3xl text-[#171717]">
                    My Pieces & Order History
                  </h3>
                  <p className="font-sans text-xs text-[#171717]/70">
                    Explore your commissioned couture garments, verified piece passports, and tracking details.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs uppercase tracking-widest transition-colors"
                >
                  <span>EXPLORE CAPSULES</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {orders.length === 0 ? (
                <KDEmptyState
                  title="Your first piece starts here."
                  description="You have no recorded orders or bespoke pieces with the atelier yet."
                  actionLabel="EXPLORE CAPSULES"
                  onAction={() => (window.location.href = '/shop')}
                />
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <KDCard key={order.id} variant="elevated" density="editorial">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#171717]/10">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-semibold text-[#171717]">
                              ORDER #{order.orderNumber}
                            </span>
                            <span className="text-[#171717]/20">·</span>
                            <span className="font-mono text-xs text-[#171717]/60">
                              {order.createdAt.slice(0, 10)}
                            </span>
                            <KDStatus status={order.status} />
                          </div>
                          <p className="font-sans text-xs text-[#171717]/70">
                            Total: ₹{order.total.toLocaleString()} · Payment: {order.paymentMethod}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <KDButton
                            variant="secondary"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            INSPECT ORDER & TIMELINE
                          </KDButton>
                        </div>
                      </div>

                      {/* Items Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-4 p-3 bg-white/70 border border-[#171717]/10"
                          >
                            <div className="relative w-16 h-20 bg-[#E5D8C8]/40 shrink-0 overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0 space-y-1">
                              <h5 className="font-editorial-serif text-lg text-[#171717] truncate">
                                {item.title}
                              </h5>
                              <p className="font-mono text-[10px] text-[#171717]/60">
                                {item.variant} · Qty: {item.quantity}
                              </p>
                              <p className="font-mono text-xs text-[#A85E43] font-medium">
                                ₹{item.price.toLocaleString()}
                              </p>
                            </div>

                            <button
                              onClick={() => {
                                const pass = passports.find((p) => p.pieceName === item.title) || passports[0];
                                setSelectedPassport(pass);
                              }}
                              className="p-2 text-[#171717]/70 hover:text-[#A85E43] border border-[#171717]/10 hover:border-[#A85E43] transition-colors cursor-pointer"
                              title="View Digital Passport"
                            >
                              <QrCode className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </KDCard>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CUSTOM PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
                <div>
                  <h3 className="font-editorial-serif text-3xl text-[#171717]">
                    Custom Commissions & Atelier Projects
                  </h3>
                  <p className="font-sans text-xs text-[#171717]/70">
                    Direct stage-by-stage monitoring of your made-to-measure and bespoke couture developments.
                  </p>
                </div>
                <KDButton
                  variant="primary"
                  size="sm"
                  icon={<Plus className="w-3.5 h-3.5" />}
                  onClick={() => setIsStartProjectOpen(true)}
                >
                  START NEW PROJECT
                </KDButton>
              </div>

              {projects.length === 0 ? (
                <KDEmptyState
                  title="Your atelier journey starts here."
                  description="Begin a personalized bespoke inquiry with Kirti Desai for evening corsetry, red-carpet silhouettes, or sustainable handloom tailoring."
                  actionLabel="START A PROJECT"
                  onAction={() => setIsStartProjectOpen(true)}
                />
              ) : (
                <div className="space-y-6">
                  {projects.map((proj) => (
                    <KDCard key={proj.id} variant="elevated" density="editorial">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#171717]/10">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] font-semibold">
                              PROJECT #{proj.requestId}
                            </span>
                            <KDStatus status={proj.status} />
                          </div>
                          <h4 className="font-editorial-serif text-2xl sm:text-3xl text-[#171717]">
                            {proj.projectName}
                          </h4>
                          <p className="font-sans text-xs text-[#171717]/70">
                            Service: {proj.service} · Occasion: {proj.occasion} · Desired Date: {proj.desiredDate}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="font-mono text-[10px] text-[#171717]/50 uppercase tracking-widest block">
                            BUDGET TIER
                          </span>
                          <span className="font-mono text-xs font-semibold text-[#A85E43]">
                            {proj.budgetRange}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 bg-white/70 border border-[#171717]/10 space-y-2 text-xs font-sans">
                        <p className="text-[#171717]/80 leading-relaxed">{proj.description}</p>
                        {proj.designerNotes && (
                          <div className="p-3 bg-[#FAF7F2] border-l-2 border-[#A85E43] text-[11px] font-mono text-[#A85E43]">
                            <strong className="uppercase">Atelier Notes:</strong> {proj.designerNotes}
                          </div>
                        )}
                      </div>

                      {/* Project Stages Tracker */}
                      <div className="space-y-3 pt-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#171717]/60 block font-semibold">
                          CONSTRUCTION MILESTONES
                        </span>

                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 font-mono text-[9px] text-center">
                          {proj.stages.map((st, sIdx) => {
                            const isComp = st.status === 'completed';
                            const isProg = st.status === 'in_progress';

                            return (
                              <div
                                key={sIdx}
                                className={`p-2 border rounded-[2px] transition-colors ${
                                  isComp
                                    ? 'bg-[#27523C]/10 border-[#27523C]/30 text-[#27523C]'
                                    : isProg
                                    ? 'bg-[#A85E43]/15 border-[#A85E43] text-[#A85E43] ring-1 ring-[#A85E43]'
                                    : 'bg-white/40 border-[#171717]/10 text-[#171717]/40'
                                }`}
                              >
                                <span className="block font-bold mb-0.5">
                                  {isComp ? '✓' : sIdx + 1}
                                </span>
                                <span className="uppercase tracking-wider">{st.stageName}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#171717]/10">
                        <div className="flex items-center gap-2 font-mono text-xs text-[#171717]/60">
                          <Clock className="w-3.5 h-3.5 text-[#A85E43]" />
                          <span>Last updated: {proj.updatedAt.slice(0, 10)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <KDButton
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              setIsSupportModalOpen(true);
                              setNewTicketForm({
                                ...newTicketForm,
                                subject: `Inquiry regarding Project ${proj.requestId}`,
                              });
                            }}
                          >
                            MESSAGE DESIGNER
                          </KDButton>
                          <KDButton
                            variant="primary"
                            size="sm"
                            onClick={() => setIsBookConsultationOpen(true)}
                          >
                            BOOK FITTING SESSION
                          </KDButton>
                        </div>
                      </div>
                    </KDCard>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: QUOTES */}
          {activeTab === 'quotes' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
                <div>
                  <h3 className="font-editorial-serif text-3xl text-[#171717]">
                    Bespoke Quotations
                  </h3>
                  <p className="font-sans text-xs text-[#171717]/70">
                    Itemized cost transparent breakdown covering handcraft, materials, pattern drafting, and fitting sessions.
                  </p>
                </div>
              </div>

              {quotes.length === 0 ? (
                <KDEmptyState
                  title="No active quotes."
                  description="When you initiate a bespoke project, your personalized quote will appear here for review and acceptance."
                  actionLabel="START A PROJECT"
                  onAction={() => setIsStartProjectOpen(true)}
                />
              ) : (
                <div className="space-y-6">
                  {quotes.map((quote) => (
                    <KDCard key={quote.id} variant="elevated" density="editorial">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#171717]/10">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-semibold text-[#171717]">
                              QUOTE #{quote.quoteNumber}
                            </span>
                            <span className="text-[#171717]/20">·</span>
                            <span className="font-mono text-xs text-[#171717]/60">
                              Valid until {quote.validUntil}
                            </span>
                            <KDStatus status={quote.status} />
                          </div>
                          <h4 className="font-editorial-serif text-2xl text-[#171717]">
                            {quote.projectName}
                          </h4>
                        </div>

                        <div className="text-right">
                          <span className="font-mono text-[10px] text-[#171717]/50 uppercase tracking-widest block">
                            ESTIMATED TOTAL
                          </span>
                          <span className="font-editorial-serif text-3xl text-[#A85E43] font-normal">
                            ₹{quote.total.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Line items */}
                      <div className="space-y-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#171717]/60 block font-semibold">
                          ITEMIZED ATELIER BREAKDOWN
                        </span>
                        <div className="divide-y divide-[#171717]/10 border border-[#171717]/10 bg-white/70">
                          {quote.items.map((item) => (
                            <div
                              key={item.id}
                              className="p-3 flex items-center justify-between text-xs font-mono"
                            >
                              <div>
                                <span className="font-semibold text-[#171717] block">
                                  {item.category}
                                </span>
                                <span className="text-[11px] text-[#171717]/70 font-sans">
                                  {item.description}
                                </span>
                              </div>
                              <span className="font-medium text-[#171717]">
                                ₹{item.amount.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Calculations summary */}
                      <div className="p-4 bg-[#FAF7F2] border border-[#171717]/10 flex flex-col sm:flex-row justify-between gap-4 font-mono text-xs">
                        <div className="space-y-1 text-[#171717]/70">
                          <p>Subtotal: ₹{quote.subtotal.toLocaleString()}</p>
                          <p>GST & Luxury Handcraft Tax (12%): ₹{quote.tax.toLocaleString()}</p>
                          {quote.discount > 0 && (
                            <p className="text-[#27523C] font-semibold">
                              Patron Privilege Courtesy: -₹{quote.discount.toLocaleString()}
                            </p>
                          )}
                        </div>

                        {quote.status === 'SENT' && (
                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <KDButton
                              variant="secondary"
                              size="sm"
                              onClick={() => handleQuoteResponse(quote.id, 'CHANGES_REQUESTED')}
                            >
                              REQUEST MODIFICATIONS
                            </KDButton>
                            <KDButton
                              variant="primary"
                              size="sm"
                              onClick={() => handleQuoteResponse(quote.id, 'ACCEPTED')}
                            >
                              ACCEPT QUOTATION
                            </KDButton>
                          </div>
                        )}

                        {quote.status === 'ACCEPTED' && (
                          <div className="flex items-center gap-2 text-[#27523C] font-semibold font-mono text-xs">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Quotation Approved · In Muslin Construction</span>
                          </div>
                        )}
                      </div>
                    </KDCard>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: CONSULTATIONS */}
          {activeTab === 'consultations' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
                <div>
                  <h3 className="font-editorial-serif text-3xl text-[#171717]">
                    Atelier Consultations & Fittings
                  </h3>
                  <p className="font-sans text-xs text-[#171717]/70">
                    Schedule private appointments with Kirti Desai for design dialogues, muslin toile fittings, or material reviews.
                  </p>
                </div>
                <KDButton
                  variant="primary"
                  size="sm"
                  icon={<Calendar className="w-3.5 h-3.5" />}
                  onClick={() => setIsBookConsultationOpen(true)}
                >
                  BOOK NEW SESSION
                </KDButton>
              </div>

              <div className="space-y-4">
                {consultations.map((apt) => (
                  <KDCard key={apt.id} variant="elevated" density="dense">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] font-semibold">
                            APPOINTMENT #{apt.appointmentId}
                          </span>
                          <KDStatus status={apt.status} />
                        </div>
                        <h4 className="font-editorial-serif text-2xl text-[#171717]">
                          {apt.format}
                        </h4>
                        <div className="flex items-center gap-2 font-mono text-xs text-[#A85E43] font-semibold">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{apt.date} · {apt.timeSlot}</span>
                        </div>
                        {apt.notes && (
                          <p className="font-sans text-xs text-[#171717]/70 pt-1">
                            Notes: {apt.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <KDBadge variant="outline" size="sm">
                          Assigned: {apt.designerAssigned}
                        </KDBadge>
                      </div>
                    </div>
                  </KDCard>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: MEASUREMENTS */}
          {activeTab === 'measurements' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
                <div>
                  <h3 className="font-editorial-serif text-3xl text-[#171717]">
                    Private Measurement Profiles
                  </h3>
                  <p className="font-sans text-xs text-[#171717]/70">
                    Encrypted anatomical specifications calibrated strictly for bespoke corsetry and tailored outer garments.
                  </p>
                </div>
                <KDBadge variant="clay" size="sm">
                  <Lock className="w-3 h-3 mr-1" /> ENCRYPTED ARCHIVE
                </KDBadge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {measurements.map((meas) => (
                  <KDCard key={meas.id} variant="elevated" density="editorial">
                    <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
                      <div>
                        <h4 className="font-editorial-serif text-2xl text-[#171717]">
                          {meas.name}
                        </h4>
                        <span className="font-mono text-[10px] text-[#171717]/50">
                          Unit: {meas.unit.toUpperCase()} · Last updated: {meas.lastUpdated.slice(0, 10)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                      <div className="p-2.5 bg-white/70 border border-[#171717]/10 flex justify-between">
                        <span className="text-[#171717]/60">Bust:</span>
                        <span className="font-semibold">{meas.bust || '—'} {meas.unit}</span>
                      </div>
                      <div className="p-2.5 bg-white/70 border border-[#171717]/10 flex justify-between">
                        <span className="text-[#171717]/60">Underbust:</span>
                        <span className="font-semibold">{meas.underbust || '—'} {meas.unit}</span>
                      </div>
                      <div className="p-2.5 bg-white/70 border border-[#171717]/10 flex justify-between">
                        <span className="text-[#171717]/60">Waist:</span>
                        <span className="font-semibold text-[#A85E43]">{meas.waist || '—'} {meas.unit}</span>
                      </div>
                      <div className="p-2.5 bg-white/70 border border-[#171717]/10 flex justify-between">
                        <span className="text-[#171717]/60">Full Hip:</span>
                        <span className="font-semibold">{meas.fullHip || '—'} {meas.unit}</span>
                      </div>
                      <div className="p-2.5 bg-white/70 border border-[#171717]/10 flex justify-between">
                        <span className="text-[#171717]/60">Shoulder:</span>
                        <span className="font-semibold">{meas.shoulder || '—'} {meas.unit}</span>
                      </div>
                      <div className="p-2.5 bg-white/70 border border-[#171717]/10 flex justify-between">
                        <span className="text-[#171717]/60">Sleeve Length:</span>
                        <span className="font-semibold">{meas.sleeveLength || '—'} {meas.unit}</span>
                      </div>
                    </div>

                    {meas.notes && (
                      <p className="font-sans text-xs text-[#171717]/70 italic pt-2">
                        {meas.notes}
                      </p>
                    )}
                  </KDCard>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SAVED PIECES (WISHLIST) */}
          {activeTab === 'saved' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
                <div>
                  <h3 className="font-editorial-serif text-3xl text-[#171717]">
                    Saved Pieces & Wishlist
                  </h3>
                  <p className="font-sans text-xs text-[#171717]/70">
                    Silhouettes and craft explorations you want to return to for future commissions.
                  </p>
                </div>
                <span className="font-mono text-xs text-[#171717]/60">
                  {wishlist.length} Items Saved
                </span>
              </div>

              {wishlist.length === 0 ? (
                <KDEmptyState
                  title="Save pieces you want to return to."
                  description="Explore our atelier collections, bespoke capsules, and craft studies to curate your personalized wishlist."
                  actionLabel="EXPLORE CAPSULES"
                  onAction={() => (window.location.href = '/shop')}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#FAF7F2] border border-[#171717]/15 flex flex-col justify-between"
                    >
                      <div className="relative aspect-[3/4] w-full bg-[#E5D8C8]/30">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="p-4 space-y-3">
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] font-semibold">
                            {item.category}
                          </span>
                          <h4 className="font-editorial-serif text-xl text-[#171717]">
                            {item.title}
                          </h4>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-[#171717]/10">
                          <KDButton
                            variant="primary"
                            size="sm"
                            fullWidth
                            onClick={() => {
                              addToBag({
                                id: item.id,
                                title: item.title,
                                category: item.category,
                                image: item.image,
                              });
                            }}
                          >
                            MOVE TO BAG
                          </KDButton>
                          <KDButton
                            variant="secondary"
                            size="sm"
                            fullWidth
                            onClick={() => toggleWishlist(item)}
                          >
                            REMOVE
                          </KDButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: GARMENT CARE & AFTERCARE */}
          {activeTab === 'care' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
                <div>
                  <h3 className="font-editorial-serif text-3xl text-[#171717]">
                    Atelier Garment Care & Preservation
                  </h3>
                  <p className="font-sans text-xs text-[#171717]/70">
                    Artisanal textiles and structural boning require deliberate conservation. Follow these official atelier guides.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {passports.map((pass) => (
                  <KDCard key={pass.id} variant="elevated" density="editorial">
                    <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] font-semibold block">
                          CARE CARD · {pass.passportNumber}
                        </span>
                        <h4 className="font-editorial-serif text-2xl text-[#171717]">
                          {pass.pieceName}
                        </h4>
                      </div>
                      <Scissors className="w-5 h-5 text-[#A85E43]" />
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div>
                        <span className="text-[10px] text-[#171717]/50 uppercase tracking-widest block">
                          FABRIC & COMPOSITION
                        </span>
                        <p className="font-sans text-xs text-[#171717]">{pass.careInstructions.fabric}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <div className="p-2.5 bg-white/70 border border-[#171717]/10">
                          <strong className="text-[10px] uppercase text-[#171717]/70 block">WASHING</strong>
                          <p className="font-sans text-[11px] text-[#171717] leading-relaxed">
                            {pass.careInstructions.washing}
                          </p>
                        </div>
                        <div className="p-2.5 bg-white/70 border border-[#171717]/10">
                          <strong className="text-[10px] uppercase text-[#171717]/70 block">DRYING</strong>
                          <p className="font-sans text-[11px] text-[#171717] leading-relaxed">
                            {pass.careInstructions.drying}
                          </p>
                        </div>
                      </div>

                      <div className="p-3 bg-[#E5D8C8]/30 border border-[#171717]/10 space-y-1">
                        <strong className="text-[10px] uppercase text-[#A85E43] block">CONSERVATION WARNING</strong>
                        <p className="font-sans text-[11px] text-[#171717]/80">
                          {pass.careInstructions.warnings}
                        </p>
                      </div>
                    </div>
                  </KDCard>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: ACCOUNT SETTINGS & ADDRESSES */}
          {activeTab === 'account' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
                <div>
                  <h3 className="font-editorial-serif text-3xl text-[#171717]">
                    Account & Delivery Registry
                  </h3>
                  <p className="font-sans text-xs text-[#171717]/70">
                    Manage your primary contact preferences, delivery residences, and concierge passes.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Card */}
                <KDCard variant="elevated" density="editorial">
                  <h4 className="font-editorial-serif text-2xl text-[#171717] pb-2 border-b border-[#171717]/10">
                    Patron Profile
                  </h4>

                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-[#171717]/50 uppercase tracking-widest block">FULL NAME</span>
                      <p className="font-semibold text-sm">Elena Rossi</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#171717]/50 uppercase tracking-widest block">EMAIL</span>
                      <p className="text-[#171717]">elena.rossi@milanocouture.it</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#171717]/50 uppercase tracking-widest block">PHONE</span>
                      <p className="text-[#171717]">+39 02 8492 104</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#171717]/50 uppercase tracking-widest block">LOCATION</span>
                      <p className="text-[#171717]">Milano, Italy</p>
                    </div>
                  </div>
                </KDCard>

                {/* Shipping Residence */}
                <KDCard variant="elevated" density="editorial">
                  <div className="flex items-center justify-between pb-2 border-b border-[#171717]/10">
                    <h4 className="font-editorial-serif text-2xl text-[#171717]">
                      Primary Residence
                    </h4>
                    <KDBadge variant="neutral" size="xs">
                      DEFAULT
                    </KDBadge>
                  </div>

                  <div className="space-y-1 font-sans text-xs text-[#171717]/80">
                    <p className="font-semibold text-sm">Elena Rossi</p>
                    <p>Via Monte Napoleone 14</p>
                    <p>Piano 3, Residenza Brera</p>
                    <p>20121 Milano, Italy</p>
                    <p className="font-mono text-[11px] pt-1 text-[#171717]/60">Courier Direct: +39 02 8492 104</p>
                  </div>
                </KDCard>
              </div>
            </div>
          )}

          {/* TAB 10: ATELIER LIAISON / SUPPORT */}
          {activeTab === 'support' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
                <div>
                  <h3 className="font-editorial-serif text-3xl text-[#171717]">
                    Direct Atelier Liaison
                  </h3>
                  <p className="font-sans text-xs text-[#171717]/70">
                    Private messaging channel directly to Kirti Desai and the studio team.
                  </p>
                </div>
                <KDButton
                  variant="primary"
                  size="sm"
                  icon={<Mail className="w-3.5 h-3.5" />}
                  onClick={() => setIsSupportModalOpen(true)}
                >
                  NEW MESSAGE
                </KDButton>
              </div>

              <div className="space-y-4">
                {tickets.map((t) => (
                  <KDCard key={t.id} variant="elevated" density="editorial">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#171717]/10">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-semibold text-[#171717]">
                            TICKET #{t.ticketNumber}
                          </span>
                          <span className="text-[#171717]/20">·</span>
                          <span className="font-mono text-[10px] text-[#A85E43] uppercase font-semibold">
                            {t.category}
                          </span>
                          <KDStatus status={t.status} />
                        </div>
                        <h4 className="font-editorial-serif text-2xl text-[#171717]">
                          {t.subject}
                        </h4>
                      </div>
                      <span className="font-mono text-[10px] text-[#171717]/50">
                        {t.createdAt.slice(0, 10)}
                      </span>
                    </div>

                    {/* Messages thread */}
                    <div className="space-y-3 pt-2">
                      {t.messages.map((m) => (
                        <div
                          key={m.id}
                          className={`p-4 border rounded-[2px] ${
                            m.senderRole === 'CLIENT'
                              ? 'bg-white/80 border-[#171717]/15 ml-4'
                              : 'bg-[#E5D8C8]/30 border-[#A85E43]/30 mr-4'
                          }`}
                        >
                          <div className="flex items-center justify-between font-mono text-[10px] mb-1.5">
                            <strong className={m.senderRole === 'CLIENT' ? 'text-[#171717]' : 'text-[#A85E43]'}>
                              {m.senderName} ({m.senderRole})
                            </strong>
                            <span className="text-[#171717]/40">{m.timestamp.slice(11, 16)}</span>
                          </div>
                          <p className="font-sans text-xs text-[#171717] leading-relaxed">
                            {m.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </KDCard>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* --- MODAL 1: DIGITAL PIECE PASSPORT --- */}
      {selectedPassport && (
        <KDModal
          isOpen={Boolean(selectedPassport)}
          onClose={() => setSelectedPassport(null)}
          stamp="DIGITAL PIECE PASSPORT"
          title={selectedPassport.pieceName}
          subtitle={`Verified Authenticity Certificate · ${selectedPassport.passportNumber}`}
          maxWidth="lg"
          footer={
            <KDButton variant="primary" size="sm" onClick={() => setSelectedPassport(null)}>
              CLOSE PASSPORT
            </KDButton>
          }
        >
          <div className="space-y-5 font-mono text-xs">
            <div className="p-4 bg-[#FAF7F2] border border-[#A85E43]/40 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] text-[#A85E43] uppercase tracking-widest font-semibold block">
                  DIGITAL CRYPTOGRAPHIC PROVENANCE
                </span>
                <span className="text-xs font-semibold text-[#171717]">VERIFIED ATELIER ARCHIVE</span>
                <p className="text-[9px] text-[#171717]/50 truncate max-w-xs sm:max-w-md">
                  Hash: {selectedPassport.certificateHash}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#A85E43]/10 flex items-center justify-center text-[#A85E43] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-[#171717]/50 uppercase tracking-widest block">COLLECTION</span>
                <p className="text-[#171717] font-semibold">{selectedPassport.collection}</p>
              </div>
              <div>
                <span className="text-[10px] text-[#171717]/50 uppercase tracking-widest block">EDITION</span>
                <p className="text-[#A85E43] font-semibold">{selectedPassport.edition}</p>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-[#171717]/50 uppercase tracking-widest block">MATERIAL PROVENANCE</span>
              <p className="font-sans text-xs text-[#171717]/80">{selectedPassport.materialProvenance}</p>
            </div>

            <div>
              <span className="text-[10px] text-[#171717]/50 uppercase tracking-widest block">CRAFT TECHNIQUE</span>
              <p className="font-sans text-xs text-[#171717]/80">{selectedPassport.craftTechnique}</p>
            </div>

            <div>
              <span className="text-[10px] text-[#171717]/50 uppercase tracking-widest block">ARTISAN CREDITS</span>
              <p className="font-sans text-xs text-[#171717]/80">{selectedPassport.artisanCredits}</p>
            </div>
          </div>
        </KDModal>
      )}

      {/* --- MODAL 2: ORDER INSPECTOR & TIMELINE --- */}
      {selectedOrder && (
        <KDModal
          isOpen={Boolean(selectedOrder)}
          onClose={() => setSelectedOrder(null)}
          stamp="ATELIER CONSIGNMENT"
          title={`Order #${selectedOrder.orderNumber}`}
          subtitle={`Placed on ${selectedOrder.createdAt.slice(0, 10)} · Total ₹${selectedOrder.total.toLocaleString()}`}
          maxWidth="lg"
          footer={
            <div className="flex items-center justify-between w-full">
              <a
                href={selectedOrder.invoiceUrl || '#'}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-[#A85E43] hover:underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD INVOICE</span>
              </a>
              <KDButton variant="primary" size="sm" onClick={() => setSelectedOrder(null)}>
                CLOSE
              </KDButton>
            </div>
          }
        >
          <div className="space-y-6 font-sans text-xs">
            {/* Timeline */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#171717]/60 block mb-3 font-semibold">
                FULL LOGISTICS AUDIT TRAIL
              </span>
              <KDTimeline
                orientation="vertical"
                steps={selectedOrder.timeline.map((t, idx) => ({
                  label: t.label,
                  date: t.date,
                  description: t.description,
                  status:
                    idx === selectedOrder.timeline.length - 1 ? 'current' : 'completed',
                }))}
              />
            </div>

            {/* Delivery address */}
            <div className="p-4 bg-white border border-[#171717]/10 font-mono text-xs space-y-1">
              <span className="text-[10px] text-[#A85E43] uppercase tracking-widest font-semibold block">
                DELIVERY RECIPIENT
              </span>
              <p className="font-semibold">{selectedOrder.shippingAddress.name}</p>
              <p>{selectedOrder.shippingAddress.line1}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.country}</p>
              <p className="text-[#171717]/60">Carrier: {selectedOrder.carrier} · Tracking: {selectedOrder.trackingNumber || 'Pending'}</p>
            </div>
          </div>
        </KDModal>
      )}

      {/* --- MODAL 3: START A CUSTOM PROJECT --- */}
      <KDModal
        isOpen={isStartProjectOpen}
        onClose={() => setIsStartProjectOpen(false)}
        stamp="BESPOKE APPLICATION"
        title="Start a Custom Project"
        subtitle="Commission a one-of-a-kind silhouette tailored around your body lines, occasion, and aesthetics."
        maxWidth="lg"
      >
        <form onSubmit={handleStartProjectSubmit} className="space-y-4 font-mono text-xs">
          <KDSelect
            label="ATELIER SERVICE"
            value={newProjectForm.service}
            onChange={(e) => setNewProjectForm({ ...newProjectForm, service: e.target.value })}
            options={[
              { value: 'BESPOKE', label: 'Bespoke Garment & Corsetry' },
              { value: 'MADE_TO_MEASURE', label: 'Made-to-Measure Outerwear' },
              { value: 'CUSTOM_GARMENT', label: 'Custom Occasion Gown' },
              { value: 'COSTUME_DESIGN', label: 'Costume & Wearable Art Commission' },
              { value: 'STYLING', label: 'Editorial & Runway Styling' },
            ]}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <KDInput
              label="OCCASION"
              placeholder="e.g. Venice Biennale Gala"
              required
              value={newProjectForm.occasion}
              onChange={(e) => setNewProjectForm({ ...newProjectForm, occasion: e.target.value })}
            />
            <KDInput
              label="DESIRED DELIVERY DATE"
              type="date"
              required
              value={newProjectForm.desiredDate}
              onChange={(e) => setNewProjectForm({ ...newProjectForm, desiredDate: e.target.value })}
            />
          </div>

          <KDSelect
            label="BUDGET TIER"
            value={newProjectForm.budgetRange}
            onChange={(e) => setNewProjectForm({ ...newProjectForm, budgetRange: e.target.value })}
            options={[
              { value: 'INR 25,000 – 50,000', label: 'INR 25,000 – 50,000' },
              { value: 'INR 50,000 – 1,00,000', label: 'INR 50,000 – 1,00,000' },
              { value: 'INR 1,00,000 – 2,00,000', label: 'INR 1,00,000 – 2,00,000' },
              { value: 'INR 2,00,000+', label: 'INR 2,00,000+ (Haute Couture Commission)' },
            ]}
          />

          <KDTextarea
            label="COMMISSION BRIEF & DESIGN VISION"
            rows={4}
            required
            placeholder="Describe your desired silhouette, fabric inclinations (Khadi, Tussar silk, corsetry bones), and neckline..."
            value={newProjectForm.description}
            onChange={(e) => setNewProjectForm({ ...newProjectForm, description: e.target.value })}
          />

          <div className="pt-2 flex justify-end gap-3">
            <KDButton variant="secondary" size="sm" type="button" onClick={() => setIsStartProjectOpen(false)}>
              CANCEL
            </KDButton>
            <KDButton variant="primary" size="sm" type="submit">
              SUBMIT COMMISSION BRIEF
            </KDButton>
          </div>
        </form>
      </KDModal>

      {/* --- MODAL 4: BOOK CONSULTATION --- */}
      <KDModal
        isOpen={isBookConsultationOpen}
        onClose={() => setIsBookConsultationOpen(false)}
        stamp="ATELIER APPOINTMENT"
        title="Schedule Private Consultation"
        subtitle="Book a dedicated dialogue with Kirti Desai for design development, muslin fittings, or material selection."
        maxWidth="md"
      >
        <form onSubmit={handleBookConsultationSubmit} className="space-y-4 font-mono text-xs">
          <KDSelect
            label="SESSION FORMAT"
            value={newConsultationForm.format}
            onChange={(e) => setNewConsultationForm({ ...newConsultationForm, format: e.target.value })}
            options={[
              { value: 'Virtual Atelier', label: 'Virtual Atelier (Encrypted Video Link)' },
              { value: 'Physical Studio - Vadodara', label: 'Physical Studio — Vadodara, Gujarat' },
              { value: 'Private Residence', label: 'Private Residence Fitting (VIP Concierge)' },
            ]}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <KDInput
              label="APPOINTMENT DATE"
              type="date"
              required
              value={newConsultationForm.date}
              onChange={(e) => setNewConsultationForm({ ...newConsultationForm, date: e.target.value })}
            />
            <KDSelect
              label="TIME SLOT"
              value={newConsultationForm.timeSlot}
              onChange={(e) => setNewConsultationForm({ ...newConsultationForm, timeSlot: e.target.value })}
              options={[
                { value: '11:00 – 12:00 IST', label: '11:00 – 12:00 IST (Morning)' },
                { value: '14:30 – 15:30 IST', label: '14:30 – 15:30 IST (Afternoon)' },
                { value: '16:00 – 17:00 IST', label: '16:00 – 17:00 IST (Evening)' },
              ]}
            />
          </div>

          <KDTextarea
            label="CONSULTATION NOTES"
            rows={3}
            placeholder="Fitting queries, specific garment questions, or project references..."
            value={newConsultationForm.notes}
            onChange={(e) => setNewConsultationForm({ ...newConsultationForm, notes: e.target.value })}
          />

          <div className="pt-2 flex justify-end gap-3">
            <KDButton variant="secondary" size="sm" type="button" onClick={() => setIsBookConsultationOpen(false)}>
              CANCEL
            </KDButton>
            <KDButton variant="primary" size="sm" type="submit">
              CONFIRM APPOINTMENT
            </KDButton>
          </div>
        </form>
      </KDModal>

      {/* --- MODAL 5: ATELIER LIAISON TICKET --- */}
      <KDModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        stamp="CLIENT CONCIERGE"
        title="Message the Atelier"
        subtitle="Direct inquiry channel for order questions, sizing advice, or custom garment requests."
        maxWidth="md"
      >
        <form onSubmit={handleSupportSubmit} className="space-y-4 font-mono text-xs">
          <KDInput
            label="SUBJECT"
            required
            placeholder="e.g. Question regarding toile fitting"
            value={newTicketForm.subject}
            onChange={(e) => setNewTicketForm({ ...newTicketForm, subject: e.target.value })}
          />

          <KDSelect
            label="CATEGORY"
            value={newTicketForm.category}
            onChange={(e) => setNewTicketForm({ ...newTicketForm, category: e.target.value })}
            options={[
              { value: 'Orders', label: 'Orders & Deliveries' },
              { value: 'Custom Project', label: 'Custom Project & Bespoke' },
              { value: 'Fitting & Sizing', label: 'Fitting & Anatomical Measurements' },
              { value: 'Care & Aftercare', label: 'Garment Conservation & Care' },
              { value: 'General', label: 'General Concierge Inquiry' },
            ]}
          />

          <KDTextarea
            label="MESSAGE"
            rows={4}
            required
            placeholder="How may our studio assist your fashion journey?"
            value={newTicketForm.message}
            onChange={(e) => setNewTicketForm({ ...newTicketForm, message: e.target.value })}
          />

          <div className="pt-2 flex justify-end gap-3">
            <KDButton variant="secondary" size="sm" type="button" onClick={() => setIsSupportModalOpen(false)}>
              CANCEL
            </KDButton>
            <KDButton variant="primary" size="sm" type="submit">
              SEND MESSAGE
            </KDButton>
          </div>
        </form>
      </KDModal>
    </div>
  );
}
