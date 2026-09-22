import React, { useState } from 'react';
import { Car, ShieldCheck, PhoneCall, Bot, Menu, X } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  onOpenTestDrive: () => void;
  onOpenDealers: () => void;
  onOpenAiChat: () => void;
  onOpenAdmin: () => void;
  language: 'EN' | 'PH';
  onToggleLanguage: (lang: 'EN' | 'PH') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTestDrive,
  onOpenDealers,
  onOpenAiChat,
  onOpenAdmin,
  language,
  onToggleLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Header always stays in English regardless of active language selection
  const t = TRANSLATIONS['EN'].nav;

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: VinFast Emblem & Title */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="relative w-11 h-11 rounded-xl bg-white p-1 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center overflow-hidden border border-slate-700/50">
            <img
              src="/vinfast-logo.png"
              alt="VinFast"
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                VinFast EV Companion
              </span>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-blue-400 px-2 py-0.5 rounded-full bg-blue-950/80 border border-blue-800/60 shadow-sm">
                {t.philippines}
              </span>
            </div>
            <span className="text-xs text-slate-400 hidden sm:block">
              {t.tagline}
            </span>
          </div>
        </a>

        {/* Right Navigation & Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300 mr-2">
            <a
              href="#estimator"
              className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Car className="w-4 h-4 text-blue-500" />
              {t.calculator}
            </a>
            <a
              href="#dealers"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                onOpenDealers();
              }}
              className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              {t.dealers}
            </a>
            <a
              href="#ai-specialist"
              role="button"
              id="header-ai-specialist-link"
              onClick={(e) => {
                e.preventDefault();
                onOpenAiChat();
              }}
              className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              {t.aiSpecialist}
            </a>
            <a
              href="#admin"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                onOpenAdmin();
              }}
              className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-slate-400 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              {t.admin}
            </a>
          </nav>

          {/* Language Toggle Pill: [ EN | PH ] */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => onToggleLanguage('EN')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                language === 'EN'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onToggleLanguage('PH')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                language === 'PH'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              PH
            </button>
          </div>

          {/* Book Test Drive Button */}
          <button
            type="button"
            onClick={onOpenTestDrive}
            className="relative group overflow-hidden px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Car className="w-4 h-4" />
              <span>{t.bookTestDrive}</span>
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 py-4 space-y-2 backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
          <a
            href="#estimator"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 hover:text-blue-400 transition-all cursor-pointer"
          >
            <Car className="w-4 h-4 text-blue-500" />
            <span>{t.calculator}</span>
          </a>
          <a
            href="#dealers"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              onOpenDealers();
            }}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition-all cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-cyan-400" />
            <span>{t.dealers}</span>
          </a>
          <a
            href="#ai-specialist"
            role="button"
            id="mobile-ai-specialist-link"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              onOpenAiChat();
            }}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 hover:text-emerald-400 transition-all cursor-pointer"
          >
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>{t.aiSpecialist}</span>
          </a>
          <a
            href="#admin"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              onOpenAdmin();
            }}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-slate-500" />
            <span>{t.admin}</span>
          </a>
        </div>
      )}
    </header>
  );
};
