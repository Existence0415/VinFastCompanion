import { useState, useMemo } from 'react';
import { MapPin, Phone, Search, Car, Navigation, X } from 'lucide-react';
import { DEALERS } from '../data/dealers';
import type { Region } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface DealerLocatorProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTestDriveWithDealer: (dealerId: string) => void;
  language: 'EN' | 'PH';
}

const REGIONS: (Region | 'All')[] = [
  'All',
  'Metro Manila',
  'North Luzon',
  'South Luzon & Cavite',
  'Visayas',
  'Mindanao',
];

export const DealerLocator = ({
  isOpen,
  onClose,
  onBookTestDriveWithDealer,
  language,
}: DealerLocatorProps) => {
  const t = TRANSLATIONS[language].dealers;
  const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const getRegionLabel = (region: Region | 'All') => {
    if (region === 'All') return t.allRegions;
    if (region === 'North Luzon') return t.northLuzon;
    if (region === 'South Luzon & Cavite') return t.southLuzon;
    return region;
  };

  const filteredDealers = useMemo(() => {
    return DEALERS.filter((dealer) => {
      const matchesRegion = selectedRegion === 'All' || dealer.region === selectedRegion;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        dealer.name.toLowerCase().includes(q) ||
        dealer.city.toLowerCase().includes(q) ||
        dealer.address.toLowerCase().includes(q) ||
        (dealer.province && dealer.province.toLowerCase().includes(q)) ||
        dealer.serves.some((s) => s.toLowerCase().includes(q));

      return matchesRegion && matchesSearch;
    });
  }, [selectedRegion, searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      id="dealers"
      data-testid="dealers-modal"
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-0 lg:p-4 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-full lg:max-w-5xl h-full lg:h-auto max-h-[100dvh] lg:max-h-[90vh] bg-slate-950 border-0 lg:border border-slate-800 rounded-none lg:rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 flex flex-col cursor-default"
      >
        {/* Header Bar */}
        <div className="p-3.5 sm:p-5 lg:p-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white p-1 border border-slate-700/50 flex items-center justify-center overflow-hidden shadow-md shrink-0">
              <img src="/vinfast-logo.png" alt="VinFast" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="text-sm sm:text-lg font-bold text-white tracking-tight truncate">
                  {t.title}
                </h3>
                <span className="text-[9px] sm:text-[10px] font-semibold text-cyan-400 px-1.5 sm:px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 shrink-0">
                  {t.badge}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 max-w-2xl mt-0.5 hidden sm:block truncate">
                {t.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Region Filter Bar */}
        <div className="p-3 sm:px-6 bg-slate-900/40 border-b border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {REGIONS.map((region) => {
              const count =
                region === 'All'
                  ? DEALERS.length
                  : DEALERS.filter((d) => d.region === region).length;
              const isSelected = selectedRegion === region;

              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => setSelectedRegion(region)}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold shrink-0 transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{getRegionLabel(region)}</span>
                  <span
                    className={`ml-1 sm:ml-1.5 px-1.5 py-0.2 rounded-full text-[9px] sm:text-[10px] ${
                      isSelected ? 'bg-blue-800 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dealers Grid (Scrollable) */}
        <div className="p-3.5 sm:p-5 lg:p-6 overflow-y-auto flex-grow max-h-none lg:max-h-[560px]">
          {filteredDealers.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center text-slate-400">
              <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-base font-semibold text-slate-300">{t.noDealersFound} "{searchQuery}"</p>
              <p className="text-xs mt-1">{t.noDealersSub}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDealers.map((dealer) => (
                <div
                  key={dealer.id}
                  className="glass-card glass-card-hover rounded-2xl p-4 border border-slate-800/90 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-bold text-white text-sm leading-snug">
                        {dealer.name}
                      </h3>
                      <span className="text-[10px] font-semibold text-blue-400 px-2 py-0.5 rounded-full bg-blue-950/80 border border-blue-800/60 shrink-0">
                        {dealer.region}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mb-2.5 flex items-start gap-1.5 leading-relaxed">
                      <Navigation className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                      <span>{dealer.address}</span>
                    </p>

                    <div className="mb-3">
                      <span className="text-[10px] font-medium text-slate-400">{t.areasServed} </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {dealer.serves.map((area) => (
                          <span
                            key={area}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <a
                      href={`tel:${dealer.hotlineRaw}`}
                      className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold py-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{dealer.hotline}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onBookTestDriveWithDealer(dealer.id);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-sm"
                    >
                      <Car className="w-3.5 h-3.5" />
                      <span>{t.bookHere}</span>
                    </button>
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
