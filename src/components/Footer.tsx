import React from 'react';
import { Phone, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  language: 'EN' | 'PH';
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = TRANSLATIONS[language].footer;

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center overflow-hidden shadow-md border border-slate-700/50">
                <img src="/vinfast-logo.png" alt="VinFast" className="w-full h-full object-contain" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                VinFast Philippines
              </span>
              <span className="text-[10px] uppercase font-semibold text-blue-400 bg-blue-950/80 border border-blue-800/60 px-2 py-0.5 rounded-full">
                {t.networkBadge}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {t.mission}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-slate-300">
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
        <div className="pt-8 border-t border-slate-800/80 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
            {t.legalNotice}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <span>© {new Date().getFullYear()} {t.copyright}</span>
            <span>{t.companionTag}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
