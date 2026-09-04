'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Search,
  Sliders,
  DollarSign,
  Package,
  FolderCheck,
  Calendar,
  AlertTriangle,
  Users,
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Plus,
  RefreshCw,
  Download,
  Filter,
  Eye,
  Scissors,
  QrCode,
  Lock,
  ChevronRight,
  TrendingUp,
  Mail,
  Send,
} from 'lucide-react';
import {
  KDButton,
  KDCard,
  KDStatus,
  KDBadge,
  KDModal,
  KDDrawer,
  KDTable,
  KDTabs,
  KDStat,
  KDInput,
  KDSelect,
  KDTextarea,
  KDEmptyState,
} from '@/design-system';
import {
  Order,
  CustomProject,
  Quote,
  Consultation,
  MeasurementProfile,
  DigitalPiecePassport,
  InventoryItem,
  SupportTicket,
  AuditLogEntry,
  AnalyticsSummary,
} from '@/lib/atelier-db/types';
import { projects as initialProjects } from '@/data/projects';
import { siteSettings as initialSiteSettings } from '@/data/siteContent';

export default function AtelierControlAdminPage() {
  type AdminTab =
    | 'dashboard'
    | 'orders'
    | 'projects'
    | 'quotes'
    | 'calendar'
    | 'customers'
    | 'inventory'
    | 'passports'
    | 'cms'
    | 'audit'
    | 'staff';

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Live Data States
  const [orders, setOrders] = useState<Order[]>([]);
  const [projects, setProjects] = useState<CustomProject[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [passports, setPassports] = useState<DigitalPiecePassport[]>([]);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  // Existing CMS state preserved
  const [cmsProjects, setCmsProjects] = useState(initialProjects);
  const [selectedCmsProjectId, setSelectedCmsProjectId] = useState(cmsProjects[0].id);
  const [siteSettings, setSiteSettings] = useState(initialSiteSettings);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('ALL');
  const [isSearchCommandOpen, setIsSearchCommandOpen] = useState(false);

  // Modals & Drawers
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedProject, setSelectedProject] = useState<CustomProject | null>(null);
  const [isCreateQuoteOpen, setIsCreateQuoteOpen] = useState(false);
  const [isEditStockOpen, setIsEditStockOpen] = useState<InventoryItem | null>(null);

  // Form states
  const [newQuoteForm, setNewQuoteForm] = useState({
    projectId: '',
    projectName: 'Bespoke Evening Bodice',
    customerId: 'user-client-01',
    customerName: 'Elena Rossi',
    customerEmail: 'elena.rossi@milanocouture.it',
    baseDesign: 35000,
    materials: 25000,
    labour: 30000,
    craft: 40000,
    shipping: 6500,
    discount: 5000,
    validUntil: '2026-04-30',
  });

  const [statusUpdateForm, setStatusUpdateForm] = useState({
    status: '',
    trackingNumber: '',
    carrier: 'DHL Express Luxury Courier',
  });

  // Fetch all backend admin data
  const fetchData = async () => {
    try {
      const [ordRes, projRes, quoteRes, aptRes, invRes, passRes, auditRes, analRes, tickRes] =
        await Promise.all([
          fetch('/api/atelier/orders'),
          fetch('/api/atelier/projects'),
          fetch('/api/atelier/quotes'),
          fetch('/api/atelier/consultations'),
          fetch('/api/atelier/inventory'),
          fetch('/api/atelier/passports'),
          fetch('/api/atelier/audit'),
          fetch('/api/atelier/analytics'),
          fetch('/api/atelier/support'),
        ]);

      const [ord, proj, quo, apt, inv, pass, aud, anal, tick] = await Promise.all([
        ordRes.json(),
        projRes.json(),
        quoteRes.json(),
        aptRes.json(),
        invRes.json(),
        passRes.json(),
        auditRes.json(),
        analRes.json(),
        tickRes.json(),
      ]);

      if (ord.orders) setOrders(ord.orders);
      if (proj.projects) setProjects(proj.projects);
      if (quo.quotes) setQuotes(quo.quotes);
      if (apt.consultations) setConsultations(apt.consultations);
      if (inv.inventory) setInventory(inv.inventory);
      if (pass.passports) setPassports(pass.passports);
      if (aud.auditLog) setAuditLog(aud.auditLog);
      if (anal.summary) setAnalytics(anal.summary);
      if (tick.tickets) setTickets(tick.tickets);
    } catch (err) {
      console.error('Failed to load admin data', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Keyboard shortcut CMD+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Order status update action
  const handleOrderStatusUpdate = async (orderId: string) => {
    if (!statusUpdateForm.status) return;
    try {
      const res = await fetch('/api/atelier/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          status: statusUpdateForm.status,
          trackingNumber: statusUpdateForm.trackingNumber,
          carrier: statusUpdateForm.carrier,
          actorName: 'Kirti Desai',
          actorRole: 'SUPER_ADMIN',
        }),
      });
      if (res.ok) {
        setSelectedOrder(null);
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Project phase update action
  const handleProjectPhaseAdvance = async (projectId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/atelier/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          status: newStatus,
          actorName: 'Kirti Desai',
          actorRole: 'SUPER_ADMIN',
        }),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Create Quote Action
  const handleCreateQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subtotal =
      newQuoteForm.baseDesign +
      newQuoteForm.materials +
      newQuoteForm.labour +
      newQuoteForm.craft +
      newQuoteForm.shipping;
    const tax = Math.round(subtotal * 0.12);
    const total = subtotal + tax - newQuoteForm.discount;

    const items = [
      { id: 'qi-1', category: 'Base Design', description: 'Pattern development & 3D drafting', amount: newQuoteForm.baseDesign },
      { id: 'qi-2', category: 'Material', description: 'Artisanal silk, canvas & steel boning', amount: newQuoteForm.materials },
      { id: 'qi-3', category: 'Labour', description: 'Atelier construction & hand-finishing', amount: newQuoteForm.labour },
      { id: 'qi-4', category: 'Craft', description: 'Living craft surface embellishment', amount: newQuoteForm.craft },
      { id: 'qi-5', category: 'Shipping', description: 'Insured express logistics', amount: newQuoteForm.shipping },
    ];

    try {
      const res = await fetch('/api/atelier/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: newQuoteForm.projectId || (projects[0]?.id ?? 'proj-01'),
          projectName: newQuoteForm.projectName,
          customerId: newQuoteForm.customerId,
          customerName: newQuoteForm.customerName,
          customerEmail: newQuoteForm.customerEmail,
          items,
          subtotal,
          additionalCharges: 0,
          tax,
          discount: newQuoteForm.discount,
          total,
          validUntil: newQuoteForm.validUntil,
          status: 'SENT',
        }),
      });
      if (res.ok) {
        setIsCreateQuoteOpen(false);
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Stock update action
  const handleStockUpdate = async (id: string, newStock: number) => {
    try {
      const res = await fetch('/api/atelier/inventory', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, stock: newStock }),
      });
      if (res.ok) {
        setIsEditStockOpen(null);
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // JSON Export action preserved from previous version
  const handleDownloadJSON = () => {
    const exportData = {
      siteSettings,
      cmsProjects,
      orders,
      projects,
      quotes,
      inventory,
      auditLog,
      exportTimestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kirti-desai-atelier-control-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'ALL' && o.status !== orderStatusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const selectedCmsProject =
    cmsProjects.find((p) => p.id === selectedCmsProjectId) || cmsProjects[0];

  return (
    <div className="pt-28 pb-28 px-4 sm:px-6 lg:px-12 max-w-[1700px] mx-auto min-h-screen">
      {/* Top Header Command Bar */}
      <div className="pb-6 mb-8 border-b border-[#171717]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-[#171717]/60 hover:text-[#A85E43] transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>RETURN TO STUDIO</span>
            </Link>
            <span className="text-[#171717]/20">/</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#A85E43] font-semibold">
              KIRTI DESAI · ATELIER COMMAND CENTRE
            </span>
          </div>
          <h1 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] font-normal tracking-tight">
            ATELIER CONTROL
          </h1>
        </div>

        {/* Global Search & Quick Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSearchCommandOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#FAF7F2] border border-[#171717]/15 hover:border-[#A85E43] font-mono text-xs text-[#171717]/70 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-[#A85E43]" />
            <span className="hidden sm:inline">GLOBAL COMMAND</span>
            <kbd className="px-1.5 py-0.5 bg-white border text-[10px] rounded-[2px] font-sans">
              ⌘K
            </kbd>
          </button>

          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
          >
            <span>MY ATELIER (CLIENT VIEW)</span>
            <ArrowLeft className="w-3 h-3 rotate-180" />
          </Link>
        </div>
      </div>

      {/* ACTION REQUIRED BANNER ("What needs my attention?") */}
      <div className="mb-8 p-4 bg-[#FAF7F2] border-l-4 border-[#A85E43] border border-[#171717]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-[#A85E43] shrink-0" />
          <div className="space-y-0.5">
            <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-[#A85E43]">
              TODAY'S ATELIER ACTION ITEMS
            </span>
            <p className="font-sans text-xs text-[#171717]">
              {analytics?.pendingQuotes || 1} quotes awaiting client response ·{' '}
              {analytics?.lowStockAlerts || 1} low-stock capsule silhouette ·{' '}
              {analytics?.upcomingConsultations || 1} scheduled toile fitting session
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <KDButton
            variant="secondary"
            size="sm"
            onClick={() => setActiveTab('quotes')}
          >
            BUILD QUOTE
          </KDButton>
          <KDButton
            variant="primary"
            size="sm"
            onClick={() => setIsCreateQuoteOpen(true)}
          >
            DISPATCH QUOTE
          </KDButton>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="mb-8">
        <KDTabs
          activeTab={activeTab}
          onChange={(tab) => setActiveTab(tab as AdminTab)}
          tabs={[
            { id: 'dashboard', label: 'DASHBOARD' },
            { id: 'orders', label: 'ORDERS', count: orders.length },
            { id: 'projects', label: 'CUSTOM PROJECTS', count: projects.length },
            { id: 'quotes', label: 'QUOTE BUILDER', count: quotes.length },
            { id: 'calendar', label: 'CALENDAR & FITTINGS', count: consultations.length },
            { id: 'customers', label: 'CUSTOMER CRM' },
            { id: 'inventory', label: 'INVENTORY & CAPSULES', count: inventory.length },
            { id: 'passports', label: 'PIECE PASSPORTS', count: passports.length },
            { id: 'cms', label: 'CONTENT CMS' },
            { id: 'audit', label: 'AUDIT LOG', count: auditLog.length },
            { id: 'staff', label: 'STAFF & ROLES' },
          ]}
        />
      </div>

      {/* TAB 1: DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Top KPI Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <KDStat
              label="TOTAL REVENUE"
              value={`₹${(analytics?.revenue || 82600).toLocaleString()}`}
              trend={{ value: '+14.2%', isPositive: true }}
              subvalue="Net atelier collections"
            />
            <KDStat
              label="ACTIVE BESPOKE PROJECTS"
              value={analytics?.activeProjects || 2}
              trend={{ value: '1 In Fitting', isPositive: true }}
              subvalue="Live custom commissions"
              variant="highlight"
            />
            <KDStat
              label="TOTAL COMPLETED ORDERS"
              value={analytics?.totalOrders || 2}
              subvalue={`Avg ticket: ₹${(analytics?.averageOrderValue || 41300).toLocaleString()}`}
            />
            <KDStat
              label="INVENTORY ALERTS"
              value={analytics?.lowStockAlerts || 1}
              variant={analytics?.lowStockAlerts ? 'alert' : 'standard'}
              subvalue="Silhouettes at threshold"
            />
          </div>

          {/* Revenue Overview & Custom Pipeline Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Revenue Trend */}
            <div className="lg:col-span-7 bg-[#FAF7F2] p-6 sm:p-7 border border-[#171717]/15 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] font-semibold block">
                    COMMERCE TRAJECTORY
                  </span>
                  <h3 className="font-editorial-serif text-2xl text-[#171717]">
                    Atelier Revenue & Capsules
                  </h3>
                </div>
                <KDBadge variant="clay" size="xs">
                  SLOW FASHION ACCUMULATION
                </KDBadge>
              </div>

              <div className="space-y-3 pt-2 font-mono text-xs">
                {analytics?.revenueTrend.map((t, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#171717]/70">{t.date}</span>
                      <span className="font-semibold text-[#171717]">₹{t.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-[#E5D8C8]/40 overflow-hidden rounded-[1px]">
                      <div
                        className="h-full bg-[#A85E43]"
                        style={{ width: `${Math.min(100, (t.amount / 300000) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Top Capsule Pieces */}
            <div className="lg:col-span-5 bg-[#FAF7F2] p-6 sm:p-7 border border-[#171717]/15 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] font-semibold block">
                    CAPSULE METRICS
                  </span>
                  <h3 className="font-editorial-serif text-2xl text-[#171717]">
                    Top Silhouettes
                  </h3>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {analytics?.topPieces.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white/70 border border-[#171717]/10 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold text-[#171717] block font-editorial-serif text-base">
                        {p.title}
                      </span>
                      <span className="text-[10px] text-[#171717]/60">
                        {p.count} pieces drafted & tailored
                      </span>
                    </div>
                    <span className="font-semibold text-[#A85E43]">
                      ₹{p.revenue.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Operational Activity Stream */}
          <div className="bg-[#FAF7F2] p-6 sm:p-7 border border-[#171717]/15 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] font-semibold block">
                  REAL-TIME AUDIT TRAIL
                </span>
                <h3 className="font-editorial-serif text-2xl text-[#171717]">
                  Recent Atelier Activity
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('audit')}
                className="font-mono text-xs text-[#A85E43] hover:underline uppercase tracking-wider cursor-pointer"
              >
                VIEW FULL AUDIT LOG →
              </button>
            </div>

            <div className="divide-y divide-[#171717]/8 font-mono text-xs">
              {auditLog.slice(0, 5).map((log) => (
                <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#A85E43]">{log.actorName}</span>
                    <span className="text-[10px] text-[#171717]/40">·</span>
                    <span className="text-[11px] text-[#171717]">{log.details}</span>
                  </div>
                  <span className="text-[10px] text-[#171717]/50 shrink-0">{log.timestamp.slice(0, 16).replace('T', ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Controls Bar */}
          <div className="p-4 bg-[#FAF7F2] border border-[#171717]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] text-[#171717]/60 uppercase tracking-widest">
                FILTER STATUS:
              </span>
              {['ALL', 'ORDER_CONFIRMED', 'CRAFTING', 'PACKED', 'SHIPPED', 'DELIVERED'].map((s) => (
                <button
                  key={s}
                  onClick={() => setOrderStatusFilter(s)}
                  className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest border transition-colors cursor-pointer ${
                    orderStatusFilter === s
                      ? 'bg-[#171717] text-white border-[#171717]'
                      : 'bg-white text-[#171717] border-[#171717]/15 hover:border-[#A85E43]'
                  }`}
                >
                  {s.replace(/_/g, ' ')}
                </button>
              ))}
            </div>

            <div className="w-full sm:w-64">
              <KDInput
                placeholder="Search orders, patron name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Orders Table */}
          <KDTable
            data={filteredOrders}
            keyExtractor={(o) => o.id}
            columns={[
              {
                header: 'ORDER #',
                cell: (o) => (
                  <span className="font-mono font-semibold text-xs text-[#171717]">
                    {o.orderNumber}
                  </span>
                ),
              },
              {
                header: 'PATRON',
                cell: (o) => (
                  <div>
                    <span className="font-editorial-serif text-sm font-medium block">
                      {o.customerName}
                    </span>
                    <span className="font-mono text-[10px] text-[#171717]/60 block">
                      {o.customerEmail}
                    </span>
                  </div>
                ),
              },
              {
                header: 'ITEMS',
                cell: (o) => (
                  <span className="font-mono text-xs">
                    {o.items.map((i) => `${i.title} (${i.size})`).join(', ')}
                  </span>
                ),
              },
              {
                header: 'TOTAL',
                cell: (o) => (
                  <span className="font-mono text-xs font-semibold text-[#171717]">
                    ₹{o.total.toLocaleString()}
                  </span>
                ),
              },
              {
                header: 'STATUS',
                cell: (o) => <KDStatus status={o.status} />,
              },
              {
                header: 'DISPATCH CARRIER',
                cell: (o) => (
                  <span className="font-mono text-[10px] text-[#171717]/70">
                    {o.carrier || 'Pending Dispatch'}
                  </span>
                ),
              },
              {
                header: 'ACTIONS',
                align: 'right',
                cell: (o) => (
                  <KDButton
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSelectedOrder(o);
                      setStatusUpdateForm({
                        status: o.status,
                        trackingNumber: o.trackingNumber || '',
                        carrier: o.carrier || 'DHL Express Luxury Courier',
                      });
                    }}
                  >
                    INSPECT / ADVANCE
                  </KDButton>
                ),
              },
            ]}
          />
        </div>
      )}

      {/* TAB 3: CUSTOM PROJECTS KANBAN PIPELINE */}
      {activeTab === 'projects' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
            <div>
              <h3 className="font-editorial-serif text-3xl text-[#171717]">
                Custom Bespoke Pipeline
              </h3>
              <p className="font-sans text-xs text-[#171717]/70">
                Comprehensive stage management from initial patron inquiry to toile muslin fitting and final couture handover.
              </p>
            </div>
            <KDButton
              variant="primary"
              size="sm"
              icon={<Plus className="w-3.5 h-3.5" />}
              onClick={() => setIsCreateQuoteOpen(true)}
            >
              CREATE BESPOKE QUOTE
            </KDButton>
          </div>

          {/* Kanban / Pipeline Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {[
              { title: 'INQUIRIES & REVIEW', status: 'SUBMITTED' },
              { title: 'QUOTE SENT', status: 'QUOTE_SENT' },
              { title: 'TOILE & FITTING', status: 'FITTING' },
              { title: 'FINAL FINISH & HANDOVER', status: 'COMPLETED' },
            ].map((col, idx) => {
              const colProjects = projects.filter((p) => p.status === col.status);

              return (
                <div
                  key={idx}
                  className="bg-[#FAF7F2] p-4 border border-[#171717]/15 rounded-[2px] space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#171717]/10">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#171717]/70 font-semibold">
                      {col.title}
                    </span>
                    <span className="font-mono text-xs px-2 py-0.5 bg-[#E5D8C8] text-[#A85E43] rounded-[2px] font-bold">
                      {colProjects.length}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {colProjects.map((p) => (
                      <div
                        key={p.id}
                        className="bg-white p-4 border border-[#171717]/12 shadow-xs space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] font-semibold">
                            {p.requestId}
                          </span>
                          <KDBadge variant="outline" size="xs">
                            {p.service}
                          </KDBadge>
                        </div>

                        <h4 className="font-editorial-serif text-lg text-[#171717] leading-tight">
                          {p.projectName}
                        </h4>

                        <div className="font-mono text-[10px] text-[#171717]/60 space-y-0.5">
                          <p>Patron: {p.customerName}</p>
                          <p>Target: {p.desiredDate}</p>
                          <p>Budget: {p.budgetRange}</p>
                        </div>

                        <div className="pt-2 border-t border-[#171717]/10 flex gap-1.5">
                          {p.status === 'SUBMITTED' && (
                            <KDButton
                              variant="primary"
                              size="sm"
                              fullWidth
                              onClick={() => handleProjectPhaseAdvance(p.id, 'QUOTE_SENT')}
                            >
                              PREPARE QUOTE
                            </KDButton>
                          )}
                          {p.status === 'QUOTE_SENT' && (
                            <KDButton
                              variant="secondary"
                              size="sm"
                              fullWidth
                              onClick={() => handleProjectPhaseAdvance(p.id, 'FITTING')}
                            >
                              ADVANCE TO FITTING
                            </KDButton>
                          )}
                          {p.status === 'FITTING' && (
                            <KDButton
                              variant="primary"
                              size="sm"
                              fullWidth
                              onClick={() => handleProjectPhaseAdvance(p.id, 'COMPLETED')}
                            >
                              COMPLETE COUTURE
                            </KDButton>
                          )}
                        </div>
                      </div>
                    ))}

                    {colProjects.length === 0 && (
                      <div className="p-8 text-center border border-dashed border-[#171717]/15">
                        <span className="font-mono text-[10px] text-[#171717]/40 uppercase tracking-wider">
                          NO ACTIVE PROJECTS
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: QUOTE BUILDER */}
      {activeTab === 'quotes' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
            <div>
              <h3 className="font-editorial-serif text-3xl text-[#171717]">
                Atelier Quotation Builder
              </h3>
              <p className="font-sans text-xs text-[#171717]/70">
                Draft transparent cost structures for custom patrons, automatically calculating materials, craft labor, and taxes.
              </p>
            </div>
            <KDButton
              variant="primary"
              size="sm"
              icon={<Plus className="w-3.5 h-3.5" />}
              onClick={() => setIsCreateQuoteOpen(true)}
            >
              CREATE NEW QUOTE
            </KDButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quotes.map((quote) => (
              <KDCard key={quote.id} variant="elevated" density="editorial">
                <div className="flex items-baseline justify-between pb-3 border-b border-[#171717]/10">
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#171717]">
                      QUOTE #{quote.quoteNumber}
                    </span>
                    <h4 className="font-editorial-serif text-2xl text-[#171717]">
                      {quote.projectName}
                    </h4>
                    <span className="font-mono text-[10px] text-[#171717]/60">
                      Patron: {quote.customerName} ({quote.customerEmail})
                    </span>
                  </div>
                  <KDStatus status={quote.status} />
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  {quote.items.map((i) => (
                    <div key={i.id} className="flex justify-between py-1 border-b border-[#171717]/6">
                      <span className="text-[#171717]/70">{i.category}: {i.description}</span>
                      <span className="font-semibold">₹{i.amount.toLocaleString()}</span>
                    </div>
                  ))}

                  <div className="pt-2 flex justify-between font-bold text-sm text-[#A85E43]">
                    <span>TOTAL QUOTED:</span>
                    <span>₹{quote.total.toLocaleString()}</span>
                  </div>
                </div>
              </KDCard>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CALENDAR & CONSULTATIONS */}
      {activeTab === 'calendar' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
            <div>
              <h3 className="font-editorial-serif text-3xl text-[#171717]">
                Atelier Consultation Schedule
              </h3>
              <p className="font-sans text-xs text-[#171717]/70">
                Scheduled client design dialogues and muslin fitting appointments.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {consultations.map((c) => (
              <KDCard key={c.id} variant="elevated" density="dense" className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] font-semibold">
                    {c.appointmentId}
                  </span>
                  <KDStatus status={c.status} />
                </div>

                <h4 className="font-editorial-serif text-2xl text-[#171717]">
                  {c.format}
                </h4>

                <div className="font-mono text-xs space-y-1 text-[#171717]/80">
                  <p className="font-semibold text-[#A85E43]">{c.date} · {c.timeSlot}</p>
                  <p>Client: {c.customerName}</p>
                  <p>Email: {c.customerEmail}</p>
                  <p>Notes: {c.notes || 'No special requirements noted'}</p>
                </div>
              </KDCard>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: CUSTOMER CRM */}
      {activeTab === 'customers' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
            <div>
              <h3 className="font-editorial-serif text-3xl text-[#171717]">
                Patron & Client CRM
              </h3>
              <p className="font-sans text-xs text-[#171717]/70">
                Private patron profiles, acquisition records, bespoke histories, and encrypted measurement access logs.
              </p>
            </div>
          </div>

          <KDCard variant="elevated" density="editorial">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#171717]/10">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] font-semibold block">
                  PATRON RECORD #KD-PAT-001
                </span>
                <h4 className="font-editorial-serif text-2xl text-[#171717]">
                  Elena Rossi
                </h4>
                <p className="font-mono text-xs text-[#171717]/60">
                  elena.rossi@milanocouture.it · Milano, Italy
                </p>
              </div>

              <KDBadge variant="clay" size="sm">
                COUTURE VIP PATRON
              </KDBadge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 font-mono text-xs">
              <div className="p-3 bg-white border border-[#171717]/10">
                <span className="text-[#171717]/60 block text-[10px] uppercase">TOTAL COMMISSIONS</span>
                <span className="font-semibold text-sm">2 Pieces (₹82,600)</span>
              </div>
              <div className="p-3 bg-white border border-[#171717]/10">
                <span className="text-[#171717]/60 block text-[10px] uppercase">ACTIVE BESPOKE PROJECT</span>
                <span className="font-semibold text-sm">Venice Biennale Corset</span>
              </div>
              <div className="p-3 bg-white border border-[#171717]/10">
                <span className="text-[#171717]/60 block text-[10px] uppercase">MEASUREMENT PRIVACY</span>
                <span className="font-semibold text-sm text-[#27523C]">Calibrated & Locked</span>
              </div>
            </div>
          </KDCard>
        </div>
      )}

      {/* TAB 7: INVENTORY & CAPSULES */}
      {activeTab === 'inventory' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
            <div>
              <h3 className="font-editorial-serif text-3xl text-[#171717]">
                Capsule Silhouettes & Inventory
              </h3>
              <p className="font-sans text-xs text-[#171717]/70">
                Track ready-to-wear stock on hand, reservations against client orders, and lead times.
              </p>
            </div>
          </div>

          <KDTable
            data={inventory}
            keyExtractor={(i) => i.id}
            columns={[
              {
                header: 'SKU',
                cell: (i) => <span className="font-mono font-semibold text-xs">{i.sku}</span>,
              },
              {
                header: 'SILHOUETTE',
                cell: (i) => (
                  <div>
                    <span className="font-editorial-serif text-sm font-medium block">
                      {i.productTitle}
                    </span>
                    <span className="font-mono text-[10px] text-[#171717]/60">{i.size}</span>
                  </div>
                ),
              },
              {
                header: 'PRICE',
                cell: (i) => <span className="font-mono text-xs">₹{i.price.toLocaleString()}</span>,
              },
              {
                header: 'STOCK ON HAND',
                cell: (i) => <span className="font-mono font-bold text-xs">{i.stock}</span>,
              },
              {
                header: 'RESERVED',
                cell: (i) => <span className="font-mono text-xs">{i.reserved}</span>,
              },
              {
                header: 'AVAILABLE',
                cell: (i) => (
                  <span
                    className={`font-mono font-bold text-xs ${
                      i.available <= i.lowStockThreshold ? 'text-[#B45309]' : 'text-[#27523C]'
                    }`}
                  >
                    {i.available}
                  </span>
                ),
              },
              {
                header: 'STATUS',
                cell: (i) => <KDStatus status={i.status} />,
              },
              {
                header: 'ACTIONS',
                align: 'right',
                cell: (i) => (
                  <KDButton
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsEditStockOpen(i)}
                  >
                    ADJUST STOCK
                  </KDButton>
                ),
              },
            ]}
          />
        </div>
      )}

      {/* TAB 8: PIECE PASSPORTS */}
      {activeTab === 'passports' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
            <div>
              <h3 className="font-editorial-serif text-3xl text-[#171717]">
                Digital Piece Passports Registry
              </h3>
              <p className="font-sans text-xs text-[#171717]/70">
                Verified digital authenticity documents issued with certified Kirti Desai silhouettes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {passports.map((p) => (
              <KDCard key={p.id} variant="elevated" density="editorial">
                <div className="flex items-baseline justify-between pb-3 border-b border-[#171717]/10">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] font-semibold block">
                      {p.passportNumber}
                    </span>
                    <h4 className="font-editorial-serif text-2xl text-[#171717]">
                      {p.pieceName}
                    </h4>
                  </div>
                  <KDBadge variant="clay" size="xs">
                    AUTHENTICITY VERIFIED
                  </KDBadge>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <p><strong className="text-[#171717]/60">Owner:</strong> {p.ownerName}</p>
                  <p><strong className="text-[#171717]/60">Edition:</strong> {p.edition}</p>
                  <p><strong className="text-[#171717]/60">Material:</strong> {p.materialProvenance}</p>
                  <p><strong className="text-[#171717]/60">Technique:</strong> {p.craftTechnique}</p>
                  <p className="text-[10px] text-[#171717]/40 truncate">
                    Hash: {p.certificateHash}
                  </p>
                </div>
              </KDCard>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: CONTENT CMS (Preserving & upgrading existing functionality) */}
      {activeTab === 'cms' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
            <div>
              <h3 className="font-editorial-serif text-3xl text-[#171717]">
                Portfolio & Designer Profile CMS
              </h3>
              <p className="font-sans text-xs text-[#171717]/70">
                Update editorial narratives, craft studies, and site profile metadata in memory with JSON backup export.
              </p>
            </div>

            <KDButton
              variant="secondary"
              size="sm"
              icon={<Download className="w-3.5 h-3.5" />}
              onClick={handleDownloadJSON}
            >
              DOWNLOAD JSON BACKUP
            </KDButton>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Project List */}
            <div className="lg:col-span-4 space-y-2">
              <span className="font-mono text-[10px] text-[#171717]/50 uppercase tracking-widest block mb-2 font-semibold">
                CATALOG PROJECTS ({cmsProjects.length})
              </span>
              {cmsProjects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedCmsProjectId(p.id)}
                  className={`w-full text-left p-4 border transition-all cursor-pointer ${
                    selectedCmsProjectId === p.id
                      ? 'bg-[#FAF7F2] border-[#A85E43] shadow-xs'
                      : 'bg-white/60 border-[#171717]/10 hover:border-[#171717]/30'
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#A85E43] block">
                    PROJECT {p.projectNumber} · {p.date}
                  </span>
                  <h5 className="font-editorial-serif text-base text-[#171717]">
                    {p.title}
                  </h5>
                </button>
              ))}
            </div>

            {/* Project Editor */}
            <div className="lg:col-span-8 bg-[#FAF7F2] p-6 border border-[#171717]/15 space-y-4">
              <h4 className="font-editorial-serif text-2xl text-[#171717] pb-2 border-b border-[#171717]/10">
                Edit: {selectedCmsProject.title}
              </h4>

              <KDInput
                label="PROJECT TITLE"
                value={selectedCmsProject.title}
                onChange={(e) =>
                  setCmsProjects((prev) =>
                    prev.map((p) =>
                      p.id === selectedCmsProjectId ? { ...p, title: e.target.value } : p
                    )
                  )
                }
              />

              <KDInput
                label="SUBTITLE / CONCEPT"
                value={selectedCmsProject.subtitle || ''}
                onChange={(e) =>
                  setCmsProjects((prev) =>
                    prev.map((p) =>
                      p.id === selectedCmsProjectId ? { ...p, subtitle: e.target.value } : p
                    )
                  )
                }
              />

              <KDTextarea
                label="SUMMARY NARRATIVE"
                rows={3}
                value={selectedCmsProject.summary}
                onChange={(e) =>
                  setCmsProjects((prev) =>
                    prev.map((p) =>
                      p.id === selectedCmsProjectId ? { ...p, summary: e.target.value } : p
                    )
                  )
                }
              />

              <KDTextarea
                label="RESEARCH & CRAFT STUDY"
                rows={3}
                value={selectedCmsProject.research || ''}
                onChange={(e) =>
                  setCmsProjects((prev) =>
                    prev.map((p) =>
                      p.id === selectedCmsProjectId ? { ...p, research: e.target.value } : p
                    )
                  )
                }
              />

              <div className="pt-2 flex justify-end">
                <KDButton
                  variant="primary"
                  size="sm"
                  onClick={() => alert('Changes applied to local session memory.')}
                >
                  SAVE CMS CHANGES
                </KDButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 10: AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
            <div>
              <h3 className="font-editorial-serif text-3xl text-[#171717]">
                Operational Audit Log
              </h3>
              <p className="font-sans text-xs text-[#171717]/70">
                Immutable record of status modifications, quotations dispatched, inventory shifts, and patron record accesses.
              </p>
            </div>
          </div>

          <KDTable
            data={auditLog}
            keyExtractor={(l) => l.id}
            columns={[
              {
                header: 'TIMESTAMP',
                cell: (l) => (
                  <span className="font-mono text-[10px] text-[#171717]/60">
                    {l.timestamp.slice(0, 16).replace('T', ' ')}
                  </span>
                ),
              },
              {
                header: 'ACTOR',
                cell: (l) => (
                  <div>
                    <span className="font-mono font-semibold text-xs block">{l.actorName}</span>
                    <span className="font-mono text-[9px] text-[#A85E43] uppercase">{l.actorRole}</span>
                  </div>
                ),
              },
              {
                header: 'ACTION',
                cell: (l) => (
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#FAF7F2] border border-[#171717]/15">
                    {l.action}
                  </span>
                ),
              },
              {
                header: 'RESOURCE',
                cell: (l) => (
                  <span className="font-mono text-xs">
                    {l.resource} #{l.resourceId}
                  </span>
                ),
              },
              {
                header: 'DETAILS',
                cell: (l) => <span className="font-sans text-xs text-[#171717]/80">{l.details}</span>,
              },
            ]}
          />
        </div>
      )}

      {/* TAB 11: STAFF & ROLES (RBAC) */}
      {activeTab === 'staff' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
            <div>
              <h3 className="font-editorial-serif text-3xl text-[#171717]">
                Staff Roles & Access Permissions
              </h3>
              <p className="font-sans text-xs text-[#171717]/70">
                Role-based least-privilege matrix governing studio ateliers, fulfillment, design, and patron privacy.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { role: 'SUPER ADMIN', staff: 'Kirti Desai', perms: 'Full Authority over CMS, CRM, Orders, Finances, Staff' },
              { role: 'DESIGNER', staff: 'Aarav Mehta', perms: 'Bespoke Projects, Sketches, Quotes, Fittings' },
              { role: 'FULFILLMENT LEAD', staff: 'Studio Logistics', perms: 'Orders, Courier Tracking, Inventory, Quality Checks' },
              { role: 'SUPPORT', staff: 'Concierge Team', perms: 'Client Tickets, Inquiries, General Appointments' },
            ].map((st, idx) => (
              <KDCard key={idx} variant="elevated" density="editorial">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] font-semibold block">
                  ATELIER ROLE
                </span>
                <h4 className="font-editorial-serif text-2xl text-[#171717]">
                  {st.role}
                </h4>
                <p className="font-mono text-xs font-semibold text-[#171717]/80">
                  {st.staff}
                </p>
                <p className="font-sans text-xs text-[#171717]/70 pt-2 border-t border-[#171717]/10 leading-relaxed">
                  {st.perms}
                </p>
              </KDCard>
            ))}
          </div>
        </div>
      )}

      {/* --- MODAL 1: ORDER INSPECTOR & STATUS ADVANCER --- */}
      {selectedOrder && (
        <KDModal
          isOpen={Boolean(selectedOrder)}
          onClose={() => setSelectedOrder(null)}
          stamp="OPERATIONAL CONSIGNMENT"
          title={`Order #${selectedOrder.orderNumber}`}
          subtitle={`Patron: ${selectedOrder.customerName} · Total ₹${selectedOrder.total.toLocaleString()}`}
          maxWidth="lg"
          footer={
            <div className="flex items-center justify-end gap-3 w-full">
              <KDButton variant="secondary" size="sm" onClick={() => setSelectedOrder(null)}>
                CANCEL
              </KDButton>
              <KDButton
                variant="primary"
                size="sm"
                onClick={() => handleOrderStatusUpdate(selectedOrder.id)}
              >
                APPLY STATUS TRANSITION
              </KDButton>
            </div>
          }
        >
          <div className="space-y-4 font-mono text-xs">
            <KDSelect
              label="FULFILLMENT STAGE"
              value={statusUpdateForm.status}
              onChange={(e) => setStatusUpdateForm({ ...statusUpdateForm, status: e.target.value })}
              options={[
                { value: 'ORDER_CONFIRMED', label: 'ORDER CONFIRMED' },
                { value: 'PREPARING', label: 'PREPARING & MATERIAL CALIBRATION' },
                { value: 'CRAFTING', label: 'CRAFTING & BONING SEAMS' },
                { value: 'QUALITY_CHECK', label: 'QUALITY & TENSILE CHECK' },
                { value: 'PACKED', label: 'PACKED IN LINEN DUST POUCH' },
                { value: 'SHIPPED', label: 'SHIPPED VIA LUXURY COURIER' },
                { value: 'DELIVERED', label: 'DELIVERED TO PATRON' },
              ]}
            />

            <KDInput
              label="COURIER CARRIER"
              value={statusUpdateForm.carrier}
              onChange={(e) => setStatusUpdateForm({ ...statusUpdateForm, carrier: e.target.value })}
            />

            <KDInput
              label="TRACKING NUMBER"
              placeholder="e.g. KD-EXP-99201482-IT"
              value={statusUpdateForm.trackingNumber}
              onChange={(e) =>
                setStatusUpdateForm({ ...statusUpdateForm, trackingNumber: e.target.value })
              }
            />

            <div className="p-3 bg-[#FAF7F2] border border-[#171717]/10 font-sans text-xs">
              <strong className="font-mono text-[10px] uppercase text-[#A85E43] block mb-1">
                DELIVERY DESTINATION
              </strong>
              <p>{selectedOrder.shippingAddress.name}</p>
              <p>{selectedOrder.shippingAddress.line1}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.country}</p>
            </div>
          </div>
        </KDModal>
      )}

      {/* --- MODAL 2: CREATE QUOTE --- */}
      <KDModal
        isOpen={isCreateQuoteOpen}
        onClose={() => setIsCreateQuoteOpen(false)}
        stamp="BESPOKE QUOTE BUILDER"
        title="Construct Client Quotation"
        subtitle="Itemized breakdown calculates material, craft labour, taxes and pushes directly to My Atelier."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateQuoteSubmit} className="space-y-4 font-mono text-xs">
          <KDInput
            label="PROJECT / COMMISSION TITLE"
            required
            value={newQuoteForm.projectName}
            onChange={(e) => setNewQuoteForm({ ...newQuoteForm, projectName: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <KDInput
              label="PATRON NAME"
              required
              value={newQuoteForm.customerName}
              onChange={(e) => setNewQuoteForm({ ...newQuoteForm, customerName: e.target.value })}
            />
            <KDInput
              label="PATRON EMAIL"
              required
              type="email"
              value={newQuoteForm.customerEmail}
              onChange={(e) => setNewQuoteForm({ ...newQuoteForm, customerEmail: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <KDInput
              label="BASE DESIGN (₹)"
              type="number"
              value={newQuoteForm.baseDesign}
              onChange={(e) =>
                setNewQuoteForm({ ...newQuoteForm, baseDesign: Number(e.target.value) })
              }
            />
            <KDInput
              label="MATERIALS (₹)"
              type="number"
              value={newQuoteForm.materials}
              onChange={(e) =>
                setNewQuoteForm({ ...newQuoteForm, materials: Number(e.target.value) })
              }
            />
            <KDInput
              label="LABOUR (₹)"
              type="number"
              value={newQuoteForm.labour}
              onChange={(e) =>
                setNewQuoteForm({ ...newQuoteForm, labour: Number(e.target.value) })
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <KDInput
              label="CRAFT (₹)"
              type="number"
              value={newQuoteForm.craft}
              onChange={(e) =>
                setNewQuoteForm({ ...newQuoteForm, craft: Number(e.target.value) })
              }
            />
            <KDInput
              label="SHIPPING (₹)"
              type="number"
              value={newQuoteForm.shipping}
              onChange={(e) =>
                setNewQuoteForm({ ...newQuoteForm, shipping: Number(e.target.value) })
              }
            />
            <KDInput
              label="DISCOUNT (₹)"
              type="number"
              value={newQuoteForm.discount}
              onChange={(e) =>
                setNewQuoteForm({ ...newQuoteForm, discount: Number(e.target.value) })
              }
            />
          </div>

          <div className="p-3 bg-[#FAF7F2] border border-[#171717]/10 flex justify-between font-bold text-sm text-[#A85E43]">
            <span>AUTOMATIC TOTAL (INCL. 12% TAX):</span>
            <span>
              ₹
              {(
                (newQuoteForm.baseDesign +
                  newQuoteForm.materials +
                  newQuoteForm.labour +
                  newQuoteForm.craft +
                  newQuoteForm.shipping) *
                  1.12 -
                newQuoteForm.discount
              ).toLocaleString()}
            </span>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <KDButton variant="secondary" size="sm" type="button" onClick={() => setIsCreateQuoteOpen(false)}>
              CANCEL
            </KDButton>
            <KDButton variant="primary" size="sm" type="submit">
              DISPATCH QUOTE TO CLIENT
            </KDButton>
          </div>
        </form>
      </KDModal>

      {/* --- MODAL 3: ADJUST STOCK --- */}
      {isEditStockOpen && (
        <KDModal
          isOpen={Boolean(isEditStockOpen)}
          onClose={() => setIsEditStockOpen(null)}
          stamp="INVENTORY REGULATION"
          title={`Adjust: ${isEditStockOpen.productTitle}`}
          subtitle={`SKU: ${isEditStockOpen.sku} · Size ${isEditStockOpen.size}`}
          maxWidth="sm"
        >
          <div className="space-y-4 font-mono text-xs">
            <KDInput
              label="CURRENT PHYSICAL STOCK"
              type="number"
              defaultValue={isEditStockOpen.stock}
              id="new-stock-input"
            />
            <div className="flex justify-end gap-3">
              <KDButton variant="secondary" size="sm" onClick={() => setIsEditStockOpen(null)}>
                CANCEL
              </KDButton>
              <KDButton
                variant="primary"
                size="sm"
                onClick={() => {
                  const input = document.getElementById('new-stock-input') as HTMLInputElement;
                  if (input) handleStockUpdate(isEditStockOpen.id, Number(input.value));
                }}
              >
                UPDATE STOCK
              </KDButton>
            </div>
          </div>
        </KDModal>
      )}

      {/* --- MODAL 4: GLOBAL SEARCH COMMAND (CMD+K) --- */}
      {isSearchCommandOpen && (
        <KDModal
          isOpen={isSearchCommandOpen}
          onClose={() => setIsSearchCommandOpen(false)}
          stamp="GLOBAL ATELIER SEARCH"
          title="Command Palette (⌘K)"
          subtitle="Instant lookup across Orders, Bespoke Projects, Customers, and Catalogues."
          maxWidth="md"
        >
          <div className="space-y-4">
            <KDInput
              autoFocus
              placeholder="Search by patron name, order #, project ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="max-h-60 overflow-y-auto divide-y divide-[#171717]/10 font-mono text-xs">
              {orders
                .filter(
                  (o) =>
                    o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    o.customerName.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((o) => (
                  <div
                    key={o.id}
                    onClick={() => {
                      setIsSearchCommandOpen(false);
                      setSelectedOrder(o);
                    }}
                    className="p-3 hover:bg-white cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold block">{o.orderNumber} · {o.customerName}</span>
                      <span className="text-[10px] text-[#171717]/60">Order · {o.status}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  </div>
                ))}
              {projects
                .filter((p) => p.projectName.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setIsSearchCommandOpen(false);
                      setActiveTab('projects');
                    }}
                    className="p-3 hover:bg-white cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold block">{p.requestId} · {p.projectName}</span>
                      <span className="text-[10px] text-[#A85E43]">Project · {p.status}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  </div>
                ))}
            </div>
          </div>
        </KDModal>
      )}
    </div>
  );
}
