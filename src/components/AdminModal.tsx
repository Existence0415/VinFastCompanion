import { useState, useEffect } from 'react';
import {
  X,
  Download,
  Trash2,
  Phone,
  Mail,
  Filter,
} from 'lucide-react';
import type { TestDriveBooking } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'EN' | 'PH';
}

const SAMPLE_BOOKINGS: TestDriveBooking[] = [
  {
    id: 'booking-sample-1',
    referenceCode: 'VF-PH-2026-88120',
    fullName: 'Maria Santos',
    email: 'maria.santos@gmail.com',
    mobile: '+63 917 882 1923',
    modelId: 'vf-5-plus',
    modelName: 'VF 5 Plus',
    dealerId: 'dealer-bgc',
    dealerName: 'VinFast BGC (Taguig)',
    dealerAddress: 'BCCT, BGC, Taguig',
    preferredDate: '2026-09-23',
    preferredTime: '10:30 AM',
    notes: 'Interested in Battery Subscription vs Outright purchase',
    createdAt: '2026-09-21T10:15:00.000Z',
    status: 'Confirmed',
  },
  {
    id: 'booking-sample-2',
    referenceCode: 'VF-PH-2026-44192',
    fullName: 'David Lim',
    email: 'dlim.transport@yahoo.com',
    mobile: '+63 928 554 9912',
    modelId: 'vf-3',
    modelName: 'VF 3',
    dealerId: 'dealer-atc',
    dealerName: 'VinFast ATC (Muntinlupa)',
    dealerAddress: 'Phase 1 Block 7, Spectrum District, Filinvest Ave, Muntinlupa',
    preferredDate: '2026-09-24',
    preferredTime: '01:30 PM',
    notes: 'Inquiring about yellow colorway and 20% down payment terms',
    createdAt: '2026-09-21T11:42:00.000Z',
    status: 'New',
  },
  {
    id: 'booking-sample-3',
    referenceCode: 'VF-PH-2026-92813',
    fullName: 'Atty. Roberto Tan',
    email: 'rtan.law@gmail.com',
    mobile: '+63 917 554 1122',
    modelId: 'vf-7',
    modelName: 'VF 7',
    dealerId: 'dealer-eton-centris',
    dealerName: 'VinFast Eton Centris (Quezon City)',
    dealerAddress: 'Cyberpod 2, Eton Center Centris, EDSA cor Quezon Ave, QC',
    preferredDate: '2026-09-25',
    preferredTime: '03:30 PM',
    notes: 'Wants to test 348 hp Plus AWD version along EDSA',
    createdAt: '2026-09-21T14:10:00.000Z',
    status: 'Contacted',
  },
];

export const AdminModal = ({ isOpen, onClose, language }: AdminModalProps) => {
  const t = TRANSLATIONS[language].adminModal;
  const [bookings, setBookings] = useState<TestDriveBooking[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const getStatusLabel = (st: string) => {
    switch (st) {
      case 'All': return language === 'PH' ? 'Lahat' : 'All';
      case 'New': return t.statusNew;
      case 'Contacted': return t.statusContacted;
      case 'Confirmed': return t.statusConfirmed;
      case 'Completed': return t.statusCompleted;
      case 'Cancelled': return t.statusCancelled;
      default: return st;
    }
  };

  // Load from localStorage or initialize with sample data
  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem('vf_bookings');
        if (stored) {
          const parsed = JSON.parse(stored);
          setBookings(parsed.length > 0 ? parsed : SAMPLE_BOOKINGS);
        } else {
          localStorage.setItem('vf_bookings', JSON.stringify(SAMPLE_BOOKINGS));
          setBookings(SAMPLE_BOOKINGS);
        }
      } catch {
        setBookings(SAMPLE_BOOKINGS);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUpdateStatus = (id: string, newStatus: TestDriveBooking['status']) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
    setBookings(updated);
    try {
      localStorage.setItem('vf_bookings', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleExportCSV = () => {
    if (bookings.length === 0) return;

    const headers = [
      'Reference Code',
      'Full Name',
      'Email',
      'Mobile',
      'Model',
      'Dealership',
      'Preferred Date',
      'Preferred Time',
      'Status',
      'Notes',
    ];

    const rows = bookings.map((b) => [
      b.referenceCode,
      `"${b.fullName}"`,
      b.email,
      b.mobile,
      b.modelName,
      `"${b.dealerName}"`,
      b.preferredDate,
      b.preferredTime,
      b.status,
      `"${(b.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `VinFast_TestDrive_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetData = () => {
    if (window.confirm('Reset leads back to sample demo data?')) {
      localStorage.setItem('vf_bookings', JSON.stringify(SAMPLE_BOOKINGS));
      setBookings(SAMPLE_BOOKINGS);
    }
  };

  const filtered = bookings.filter(
    (b) => statusFilter === 'All' || b.status === statusFilter
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 border border-slate-700/50 flex items-center justify-center overflow-hidden shadow-md">
              <img src="/vinfast-logo.png" alt="VinFast" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {t.title}
                </h3>
                <span className="text-[10px] font-semibold text-blue-400 px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800/60">
                  {t.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {t.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Analytics Top Strip */}
        <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-900/40 border-b border-slate-800">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">{t.totalReservations}</div>
            <div className="text-2xl font-bold text-white mt-1">{bookings.length}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">{t.topModel}</div>
            <div className="text-2xl font-bold text-blue-400 mt-1">VF 5 Plus</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">{t.activeDealers}</div>
            <div className="text-2xl font-bold text-cyan-400 mt-1">29 Nationwide</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">{t.conversionRate}</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">94% Target</div>
          </div>
        </div>

        {/* Controls & Filter Bar */}
        <div className="p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-300">{t.filterLabel}</span>
            {['All', 'New', 'Contacted', 'Confirmed', 'Completed'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  statusFilter === st
                    ? 'bg-blue-600 text-white border-blue-400'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                {getStatusLabel(st)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.exportCsv}</span>
            </button>

            <button
              type="button"
              onClick={handleResetData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 text-xs font-semibold transition-all"
              title="Reset to demo data"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.reset}</span>
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="p-6 max-h-[480px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              {t.noReservations} "{getStatusLabel(statusFilter)}".
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((b) => (
                <div
                  key={b.id}
                  className="glass-card rounded-2xl p-4 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-extrabold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-900/60">
                        {b.referenceCode}
                      </span>
                      <span className="font-bold text-white text-sm">{b.fullName}</span>
                      <span className="text-xs text-slate-400">· {b.modelName}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-500" />
                        {b.mobile}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-500" />
                        {b.email}
                      </span>
                      <span className="text-slate-400 truncate max-w-xs">
                        📍 {b.dealerName}
                      </span>
                      <span className="text-cyan-400 font-medium">
                        🗓️ {b.preferredDate} ({b.preferredTime})
                      </span>
                    </div>

                    {b.notes && (
                      <p className="text-[11px] text-slate-400 italic bg-slate-900/60 px-2 py-1 rounded border border-slate-800/80 mt-1">
                        "{b.notes}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Status Dropdown */}
                    <select
                      value={b.status}
                      onChange={(e) =>
                        handleUpdateStatus(b.id, e.target.value as TestDriveBooking['status'])
                      }
                      className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                          : b.status === 'Contacted'
                          ? 'bg-blue-950/80 text-blue-300 border-blue-800'
                          : b.status === 'Completed'
                          ? 'bg-purple-950/80 text-purple-300 border-purple-800'
                          : 'bg-amber-950/80 text-amber-300 border-amber-800'
                      }`}
                    >
                      <option value="New">{t.statusNew}</option>
                      <option value="Contacted">{t.statusContacted}</option>
                      <option value="Confirmed">{t.statusConfirmed}</option>
                      <option value="Completed">{t.statusCompleted}</option>
                      <option value="Cancelled">{t.statusCancelled}</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
