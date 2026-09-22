import React, { useState, useEffect } from 'react';
import {
  X,
  Car,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Copy,
  Check,
  User,
  Mail,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VEHICLE_MODELS } from '../data/models';
import { DEALERS } from '../data/dealers';
import type { TestDriveBooking } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedModelId?: string;
  preSelectedDealerId?: string;
  onBookingCreated?: (booking: TestDriveBooking) => void;
  language: 'EN' | 'PH';
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({
  isOpen,
  onClose,
  preSelectedModelId,
  preSelectedDealerId,
  onBookingCreated,
  language,
}) => {
  const t = TRANSLATIONS[language].testDriveModal;
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [modelId, setModelId] = useState(preSelectedModelId || 'vf-5-plus');
  const [dealerId, setDealerId] = useState(preSelectedDealerId || 'dealer-bgc');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [notes, setNotes] = useState('');

  const [submittedBooking, setSubmittedBooking] = useState<TestDriveBooking | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (preSelectedModelId) setModelId(preSelectedModelId);
  }, [preSelectedModelId]);

  useEffect(() => {
    if (preSelectedDealerId) setDealerId(preSelectedDealerId);
  }, [preSelectedDealerId]);

  // Set default preferred date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setPreferredDate(dateStr);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedModel = VEHICLE_MODELS.find((m) => m.id === modelId) || VEHICLE_MODELS[1];
    const selectedDealer = DEALERS.find((d) => d.id === dealerId) || DEALERS[1];

    // Generate reference code
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const referenceCode = `VF-PH-2026-${randomCode}`;

    const newBooking: TestDriveBooking = {
      id: `booking-${Date.now()}`,
      referenceCode,
      fullName: fullName.trim(),
      email: email.trim(),
      mobile: mobile.trim().startsWith('+63') ? mobile.trim() : `+63 ${mobile.trim()}`,
      modelId: selectedModel.id,
      modelName: selectedModel.name,
      dealerId: selectedDealer.id,
      dealerName: selectedDealer.name,
      dealerAddress: selectedDealer.address,
      preferredDate,
      preferredTime,
      notes: notes.trim() || undefined,
      createdAt: new Date().toISOString(),
      status: 'New',
    };

    // Save to localStorage
    try {
      const existing = localStorage.getItem('vf_bookings');
      const list: TestDriveBooking[] = existing ? JSON.parse(existing) : [];
      list.unshift(newBooking);
      localStorage.setItem('vf_bookings', JSON.stringify(list));
    } catch {
      // ignore
    }

    if (onBookingCreated) {
      onBookingCreated(newBooking);
    }

    setSubmittedBooking(newBooking);

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0084FF', '#06B6D4', '#10B981', '#ffffff'],
      });
    } catch {
      // ignore
    }
  };

  const handleCopyCode = () => {
    if (submittedBooking) {
      navigator.clipboard.writeText(submittedBooking.referenceCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleReset = () => {
    setSubmittedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 border border-slate-700/50 flex items-center justify-center overflow-hidden shadow-md">
              <img src="/vinfast-logo.png" alt="VinFast" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {submittedBooking ? t.titleConfirmed : t.titleNew}
              </h3>
              <p className="text-xs text-slate-400">
                {submittedBooking ? t.subtitleConfirmed : t.subtitleNew}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submittedBooking ? (
            /* Confirmation View */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  {t.refCodeLabel}
                </span>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <div className="text-2xl sm:text-3xl font-mono font-extrabold text-blue-400 bg-slate-900/90 border border-blue-600/40 px-4 py-2 rounded-xl">
                    {submittedBooking.referenceCode}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white transition-all"
                    title="Copy Reference Code"
                  >
                    {copiedCode ? (
                      <Check className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Reservation Details Summary Card */}
              <div className="glass-card rounded-2xl p-4 text-left border border-slate-800 space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.reservedModel}</span>
                  <span className="font-bold text-white">{submittedBooking.modelName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.dealership}</span>
                  <span className="font-bold text-white text-right max-w-[60%] truncate">
                    {submittedBooking.dealerName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.dateTime}</span>
                  <span className="font-semibold text-blue-400">
                    {submittedBooking.preferredDate} at {submittedBooking.preferredTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.guest}</span>
                  <span className="text-white">
                    {submittedBooking.fullName} ({submittedBooking.mobile})
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-900/60 text-xs text-slate-300 text-left flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  {t.vipNotice}
                </span>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition-all"
              >
                {t.doneButton}
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.fullName} <span className="text-blue-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.fullNamePlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Email & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t.email} <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="juan@example.ph"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t.mobile} <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="0917 123 4567"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Preferred Model */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.preferredModel} <span className="text-blue-400">*</span>
                </label>
                <div className="relative">
                  <Car className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={modelId}
                    onChange={(e) => setModelId(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    {VEHICLE_MODELS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} — {m.segment} (from ₱{Math.round((m.srpSubscription || m.srpOutright) / 1000)}k)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Dealership (Grouped by Region) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.preferredDealer} <span className="text-blue-400">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={dealerId}
                    onChange={(e) => setDealerId(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    {['Metro Manila', 'North Luzon', 'South Luzon & Cavite', 'Visayas', 'Mindanao'].map(
                      (region) => (
                        <optgroup key={region} label={`-- ${region.toUpperCase()} --`}>
                          {DEALERS.filter((d) => d.region === region).map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name} ({d.city})
                            </option>
                          ))}
                        </optgroup>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t.preferredDate} <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t.preferredTime} <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="09:00 AM">09:00 AM - {language === 'PH' ? 'Pang-umaga' : 'Morning Slot'}</option>
                      <option value="10:30 AM">10:30 AM - {language === 'PH' ? 'Pang-umaga' : 'Morning Slot'}</option>
                      <option value="01:30 PM">01:30 PM - {language === 'PH' ? 'Panghapon' : 'Afternoon Slot'}</option>
                      <option value="03:30 PM">03:30 PM - {language === 'PH' ? 'Panghapon' : 'Afternoon Slot'}</option>
                      <option value="05:00 PM">05:00 PM - {language === 'PH' ? 'Pangtakipsilim' : 'Sunset Slot'}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.notes}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.notesPlaceholder}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Car className="w-4 h-4" />
                <span>{t.confirmButton}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
