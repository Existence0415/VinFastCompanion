import React from 'react';
import { ArrowDown, Car } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface HeroProps {
  onOpenTestDrive: () => void;
  language: 'EN' | 'PH';
}

export const Hero: React.FC<HeroProps> = ({ onOpenTestDrive, language }) => {
  const t = TRANSLATIONS[language].hero;

  return (
    <section className="relative overflow-hidden pt-6 pb-3 sm:pt-8 sm:pb-4 lg:pt-12 lg:pb-6 w-full max-w-full">
      {/* High-tech ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-[380px] bg-gradient-to-b from-blue-600/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-24 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-full lg:max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-8">
        <div className="text-center w-full max-w-full lg:max-w-4xl mx-auto">

          {/* Headline */}
          <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6">
            {t.headlinePart1}{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400">
              {t.headlinePart2}
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xs sm:text-base lg:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-6 sm:mb-10 px-1">
            {t.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto">
            <a
              href="#estimator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-semibold text-sm sm:text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>{t.startEstimating}</span>
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
            </a>

            <button
              type="button"
              onClick={onOpenTestDrive}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-semibold text-sm sm:text-base backdrop-blur-md hover:border-slate-600 transition-all"
            >
              <Car className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <span>{t.bookTestDrive}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
