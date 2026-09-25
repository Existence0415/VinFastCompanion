import React from 'react';
import { Phone, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  language: 'EN' | 'PH';
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = TRANSLATIONS[language].footer;

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-10 sm:pt-16 pb-8 sm:pb-12 text-slate-400 text-xs w-full max-w-full">
      <div className="w-full max-w-full lg:max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-8">
        <div className="mb-8 sm:mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="max-w-2xl space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white p-1 flex items-center justify-center overflow-hidden shadow-md border border-slate-700/50 shrink-0">
                <img src="/vinfast-logo.png" alt="VinFast" className="w-full h-full object-contain" />
              </div>
              <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                VinFast Philippines
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-blue-400 bg-blue-950/80 border border-blue-800/60 px-1.5 sm:px-2 py-0.5 rounded-full shrink-0">
                {t.networkBadge}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
              {t.mission}
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>{t.hotline247}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.roadsideAssist}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-6 sm:pt-8 border-t border-slate-800/80 space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[10px] sm:text-[11px] text-slate-400 leading-relaxed">
            {t.legalNotice}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-500 gap-2">
            <span>© {new Date().getFullYear()} {t.copyright}</span>
            <span>{t.companionTag}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
