import React, { useState, useMemo } from 'react';
import {
  Car,
  Gauge,
  Zap,
  BatteryCharging,
  DollarSign,
  Calendar,
  Sparkles,
  CheckCircle2,
  TrendingDown,
  ZoomIn,
} from 'lucide-react';
import { VEHICLE_MODELS } from '../data/models';
import type { VehicleModel } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ImageLightboxModal } from './ImageLightboxModal';

interface EstimatorProps {
  selectedModelId: string;
  onSelectModel: (id: string) => void;
  onBookTestDrive: (modelId: string) => void;
  onAskAI: (prompt: string) => void;
  language: 'EN' | 'PH';
}

export const Estimator: React.FC<EstimatorProps> = ({
  selectedModelId,
  onSelectModel,
  onBookTestDrive,
  onAskAI,
  language,
}) => {
  const t = TRANSLATIONS[language].estimator;

  // Current selected model (default VF 5 Plus)
  const currentModel: VehicleModel = useMemo(() => {
    return (
      VEHICLE_MODELS.find((m) => m.id === selectedModelId) ||
      VEHICLE_MODELS.find((m) => m.id === 'vf-5-plus')!
    );
  }, [selectedModelId]);

  // Selected color variant index
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  // When model changes, reset color index to 0
  React.useEffect(() => {
    setSelectedColorIndex(0);
  }, [selectedModelId]);

  // Ownership plan: 'outright' | 'subscription'
  const [ownershipPlan, setOwnershipPlan] = useState<'outright' | 'subscription'>('outright');

  // Interactive Sliders State
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // 10% to 50%
  const [loanTenureMonths, setLoanTenureMonths] = useState<number>(36); // 12 to 60 mo, step 12
  const [dailyCommuteKm, setDailyCommuteKm] = useState<number>(45); // 10 to 150 km
  const [enlargedPhoto, setEnlargedPhoto] = useState<{ url: string; title?: string } | null>(null);

  // Determine active SRP based on ownership plan
  const activeSRP = useMemo(() => {
    if (ownershipPlan === 'subscription' && currentModel.hasSubscriptionOption && currentModel.srpSubscription) {
      return currentModel.srpSubscription;
    }
    return currentModel.srpOutright;
  }, [currentModel, ownershipPlan]);

  // Calculations
  const calculations = useMemo(() => {
    const downPaymentRate = downPaymentPercent / 100;
    const downPaymentAmount = activeSRP * downPaymentRate;
    const loanAmount = activeSRP * (1 - downPaymentRate);

    // 8.0% p.a. monthly interest rate
    const annualRate = 0.08;
    const monthlyRate = annualRate / 12;
    const n = loanTenureMonths;

    // Amortization = [Loan Amount * r * (1 + r)^n] / [((1 + r)^n) - 1]
    const factor = Math.pow(1 + monthlyRate, n);
    const monthlyAmortization = (loanAmount * monthlyRate * factor) / (factor - 1);
    const totalLoanPayments = monthlyAmortization * n;
    const totalFinanceCost = totalLoanPayments - loanAmount;

    // Commute & Charging Stats
    // Monthly Distance: Daily Commute * 30.4 days
    const monthlyDistance = dailyCommuteKm * 30.4;
    // Effective usable range considering real-world conditions (85% buffer)
    const effectiveRange = currentModel.rangeKm * 0.85;
    // Charging Cycles / Month: Monthly Distance / (Model Range * 0.85)
    const chargingCyclesPerMonth = monthlyDistance / effectiveRange;
    // Days between charges: Math.round((Model Range * 0.85) / Daily Commute)
    const daysBetweenCharges = Math.max(1, Math.round(effectiveRange / dailyCommuteKm));

    // Gas vs EV fuel savings
    const costPerKmGas = 7.0;
    const costPerKmEV = 1.85;
    const monthlyGasCost = monthlyDistance * costPerKmGas;
    const monthlyEVCost = monthlyDistance * costPerKmEV;
    const monthlySavings = monthlyGasCost - monthlyEVCost;
    const annualSavings = monthlySavings * 12;

    return {
      downPaymentAmount,
      loanAmount,
      monthlyAmortization,
      totalLoanPayments,
      totalFinanceCost,
      monthlyDistance,
      chargingCyclesPerMonth,
      daysBetweenCharges,
      monthlyGasCost,
      monthlyEVCost,
      monthlySavings,
      annualSavings,
    };
  }, [activeSRP, downPaymentPercent, loanTenureMonths, dailyCommuteKm, currentModel.rangeKm]);

  // Philippine Peso Formatter
  const formatPHP = (val: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  const activeColor = currentModel.colors[selectedColorIndex] || currentModel.colors[0];

  return (
    <section id="estimator" className="pb-16 lg:pb-24 pt-1 sm:pt-2 lg:pt-2 scroll-mt-20 relative w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full lg:max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-8">
        {/* 1. Model Selector Strip */}
        <div className="glass-card rounded-xl sm:rounded-2xl p-1.5 sm:p-3 mb-4 sm:mb-6 border border-slate-800 shadow-2xl w-full max-w-full">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1 sm:gap-2 w-full">
            {VEHICLE_MODELS.map((model) => {
              const isSelected = model.id === currentModel.id;
              return (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => onSelectModel(model.id)}
                  className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl transition-all duration-200 text-center ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02] border border-blue-400/40'
                      : 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-white border border-slate-800/80'
                  }`}
                >
                  <span className="text-xs sm:text-base font-bold tracking-tight">
                    {model.name}
                  </span>
                  <span
                    className={`text-[9px] sm:text-[10px] mt-0.5 font-medium truncate max-w-full ${
                      isSelected ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    {model.segment}
                  </span>
                  <span
                    className={`text-[10px] sm:text-[11px] font-semibold mt-1 ${
                      isSelected ? 'text-white' : 'text-blue-400'
                    }`}
                  >
                    {t.from} {formatPHP(model.hasSubscriptionOption && model.srpSubscription ? model.srpSubscription : model.srpOutright)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Model Spec Bar */}
        <div className="glass-card rounded-2xl p-3.5 sm:p-5 mb-6 sm:mb-8 border border-slate-800/90 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-950/80 border border-blue-800/80 flex items-center justify-center text-blue-400 shadow-inner shrink-0">
              <Car className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight truncate">
                  {currentModel.name}
                </h3>
                {currentModel.badge && (
                  <span className="text-[10px] sm:text-[11px] font-semibold text-cyan-300 px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 shrink-0">
                    {currentModel.badge}
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-sm text-slate-400 mt-0.5 truncate">
                {currentModel.batteryKwh} kWh Battery · {currentModel.segment} · {currentModel.seats} Seats · {currentModel.drivetrain}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-6 text-sm">
            <div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-medium truncate">{t.standardSrp}</div>
              <div className="text-sm sm:text-lg font-bold text-white">{formatPHP(activeSRP)}</div>
            </div>

            <div className="h-8 w-px bg-slate-800 hidden sm:block" />

            <div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-medium truncate">{t.fullRange}</div>
              <div className="text-sm sm:text-lg font-bold text-blue-400">
                {currentModel.rangeKm} km <span className="text-[10px] sm:text-xs text-slate-400">({currentModel.rangeStandard})</span>
              </div>
            </div>

            <div className="h-8 w-px bg-slate-800 hidden sm:block" />

            <div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-medium truncate">{t.performance}</div>
              <div className="text-sm sm:text-lg font-bold text-white">
                {currentModel.powerHp} hp <span className="text-[10px] sm:text-xs text-slate-400">/ {currentModel.torqueNm} Nm</span>
              </div>
            </div>
          </div>

          {/* Battery Subscription Toggle for VF 3 and VF 5 Plus */}
          {currentModel.hasSubscriptionOption && currentModel.srpSubscription && (
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between sm:justify-start gap-2 sm:gap-3 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-slate-800">
              <span className="text-[11px] sm:text-xs font-semibold text-slate-300">{t.ownershipPlan}</span>
              <div className="grid grid-cols-2 sm:inline-flex p-1 rounded-xl bg-slate-900 border border-slate-700/80 text-[10px] sm:text-xs">
                <button
                  type="button"
                  onClick={() => setOwnershipPlan('outright')}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-medium transition-all text-center ${
                    ownershipPlan === 'outright'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.outright} ({formatPHP(currentModel.srpOutright)})
                </button>
                <button
                  type="button"
                  onClick={() => setOwnershipPlan('subscription')}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-medium transition-all text-center ${
                    ownershipPlan === 'subscription'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.subscription} ({formatPHP(currentModel.srpSubscription)})
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Two-Column Grid: Sliders & Visual on Left, Real-time Output Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start w-full max-w-full">
          {/* LEFT COLUMN: Vehicle Showcase & Sliders (7 cols) */}
          <div className="w-full max-w-full lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Interactive Vehicle Visual & Color Switcher */}
            <div className="glass-card rounded-2xl p-4 sm:p-6 border border-slate-800 relative overflow-hidden group">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 mb-3 sm:mb-4">
                <div>
                  <span className="text-[10px] sm:text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    {t.exteriorFinish}
                  </span>
                  <div className="text-base sm:text-lg font-bold text-white">
                    {activeColor ? activeColor.name : t.standard}
                  </div>
                </div>

                {/* Color Swatches */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap max-w-full">
                  {currentModel.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      type="button"
                      title={color.name}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-all ${
                        selectedColorIndex === idx
                          ? 'border-blue-400 scale-125 shadow-lg shadow-blue-500/40 ring-2 ring-blue-500/30'
                          : 'border-slate-700 opacity-70 hover:opacity-100 hover:scale-110'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Vehicle Image Preview */}
              <div className="relative w-full h-44 sm:h-72 flex items-center justify-center my-1 sm:my-2">
                {activeColor?.imageUrl ? (
                  <button
                    type="button"
                    onClick={() =>
                      setEnlargedPhoto({
                        url: activeColor.imageUrl,
                        title: `${currentModel.name} · ${activeColor.name}`,
                      })
                    }
                    className="relative group max-h-full max-w-full flex items-center justify-center cursor-zoom-in focus:outline-none"
                    title={language === 'PH' ? 'I-click para palakihin ang litrato' : 'Click to enlarge vehicle photo'}
                  >
                    <img
                      src={activeColor.imageUrl}
                      alt={`${currentModel.name} in ${activeColor.name}`}
                      className="max-h-full max-w-full object-contain drop-shadow-[0_20px_25px_rgba(0,132,255,0.2)] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/85 backdrop-blur-sm border border-slate-700/80 text-slate-300 text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 pointer-events-none shadow-md">
                      <ZoomIn className="w-3 h-3 text-blue-400" />
                      <span>{language === 'PH' ? 'Palakihin' : 'Enlarge'}</span>
                    </div>
                  </button>
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <Car className="w-16 h-16 sm:w-20 sm:h-20 mb-2" />
                    <span className="text-xs">Showcase preview</span>
                  </div>
                )}
              </div>

              {/* Vehicle Quick Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-3 sm:pt-4 border-t border-slate-800/80 text-[11px] sm:text-xs">
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 font-medium">{t.battery}</div>
                  <div className="font-semibold text-white mt-0.5">{currentModel.batteryKwh} kWh</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 font-medium">{t.topRange}</div>
                  <div className="font-semibold text-blue-400 mt-0.5">{currentModel.rangeKm} km</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 font-medium">{t.groundClearance}</div>
                  <div className="font-semibold text-white mt-0.5">
                    {currentModel.groundClearanceMm ? `${currentModel.groundClearanceMm} mm` : '170 mm'}
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 font-medium">{t.screen}</div>
                  <div className="font-semibold text-white mt-0.5 truncate">{currentModel.screenSize.split('+')[0]}</div>
                </div>
              </div>
            </div>

            {/* Interactive Sliders Card */}
            <div className="glass-card rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-4 sm:space-y-6">
              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                <span>{t.slidersTitle}</span>
              </h4>

              {/* Slider 1: Down Payment (10% to 50%) */}
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <label className="font-semibold text-slate-200">
                    {t.downPayment}: <span className="text-blue-400 font-bold">{downPaymentPercent}%</span>
                  </label>
                  <span className="font-bold text-white bg-slate-900/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-slate-700/80 text-xs sm:text-sm">
                    {formatPHP(calculations.downPaymentAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-400 font-medium">
                  <span>10% (₱{Math.round(activeSRP * 0.1 / 1000)}k)</span>
                  <span>20% ({t.recommended})</span>
                  <span>30%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Slider 2: Loan Tenure (12 to 60 months, step 12) */}
              <div className="space-y-2 sm:space-y-2.5">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                    <span>{t.loanTenure}: <span className="text-cyan-400 font-bold">{loanTenureMonths} {t.months} ({loanTenureMonths / 12} {t.years})</span></span>
                  </label>
                  <span className="text-[11px] sm:text-xs text-slate-400">{t.indicativeRate}</span>
                </div>

                {/* Tenure Quick Pills */}
                <div className="grid grid-cols-5 gap-1 sm:gap-2">
                  {[12, 24, 36, 48, 60].map((months) => (
                    <button
                      key={months}
                      type="button"
                      onClick={() => setLoanTenureMonths(months)}
                      className={`py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold border transition-all ${
                        loanTenureMonths === months
                          ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/30'
                          : 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {months} mo
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 3: Daily Commute Travel (10 km to 150 km) */}
              <div className="space-y-1.5 sm:space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                    <span>{t.dailyCommute}: <span className="text-emerald-400 font-bold">{dailyCommuteKm} km / day</span></span>
                  </label>
                  <span className="font-bold text-slate-300 text-[10px] sm:text-xs bg-slate-900 px-2 py-0.5 sm:py-1 rounded border border-slate-800">
                    ~{Math.round(calculations.monthlyDistance)} km {t.perMonth}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={dailyCommuteKm}
                  onChange={(e) => setDailyCommuteKm(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Real-time Output Cards (5 cols) */}
          <div className="w-full max-w-full lg:col-span-5 space-y-4 sm:space-y-6">
            {/* Card 1: Estimated Monthly Amortization */}
            <div className="glass-card rounded-2xl p-4 sm:p-6 border border-blue-600/40 relative overflow-hidden glow-blue">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-blue-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  {t.amortizationTitle}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/60">
                  8.0% p.a.
                </span>
              </div>

              {/* Big Monthly Amortization Value */}
              <div className="my-2 sm:my-3">
                <div className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {formatPHP(calculations.monthlyAmortization)}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1">
                  {t.perMonthFor} {loanTenureMonths} {t.months} ({loanTenureMonths / 12} {t.years})
                </div>
              </div>

              {/* Financial Breakdown Table */}
              <div className="space-y-1.5 sm:space-y-2 pt-3 sm:pt-4 border-t border-slate-800 text-[11px] sm:text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">{t.netLoanAmount}</span>
                  <span className="font-semibold text-white">{formatPHP(calculations.loanAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">{t.downPayment} ({downPaymentPercent}%):</span>
                  <span className="font-semibold text-white">{formatPHP(calculations.downPaymentAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Annual Interest:</span>
                  <span className="font-semibold text-blue-400">8.0% {t.fixedRate}</span>
                </div>
                <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-800/60">
                  <span className="text-slate-400">{t.totalLoanPayments}</span>
                  <span className="font-semibold text-slate-200">{formatPHP(calculations.totalLoanPayments)}</span>
                </div>
              </div>

              {/* CTAs Inside the Primary Card */}
              <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-2.5">
                <button
                  type="button"
                  onClick={() => onBookTestDrive(currentModel.id)}
                  className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <Car className="w-4 h-4" />
                  <span>{t.lockEstimateCta}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const prompt =
                      language === 'PH'
                        ? `Maaari mo ba akong bigyan ng buong breakdown para sa ${currentModel.name} sa halagang ${formatPHP(calculations.monthlyAmortization)} kada buwan?`
                        : `Can you give me a full breakdown of the ${currentModel.name} at ${formatPHP(calculations.monthlyAmortization)} per month?`;
                    onAskAI(prompt);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] sm:text-xs font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>{t.askAiCta}</span>
                </button>
              </div>
            </div>

            {/* Card 2: Real-World Commute & Charging Stats */}
            <div className="glass-card rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 sm:gap-2">
                  <BatteryCharging className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                  <span>{t.commuteStatsTitle}</span>
                </h4>
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">{t.bufferNote}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">{t.daysBetweenCharges}</div>
                  <div className="text-lg sm:text-2xl font-extrabold text-emerald-400 mt-0.5 sm:mt-1">
                    {t.every} {calculations.daysBetweenCharges} {calculations.daysBetweenCharges === 1 ? t.day : t.days}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5">{t.atCommute} {dailyCommuteKm} km daily commute</div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">{t.chargesPerMonth}</div>
                  <div className="text-lg sm:text-2xl font-extrabold text-cyan-400 mt-0.5 sm:mt-1">
                    ~{Math.max(1, Math.round(calculations.chargingCyclesPerMonth))} {t.times}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5">{t.plugInNote}</div>
                </div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-blue-950/30 border border-blue-900/40 text-[11px] sm:text-xs text-slate-300 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">{t.homeChargingTitle} </span>
                  {t.homeChargingDesc}
                </div>
              </div>
            </div>

            {/* Card 3: Fuel Savings vs Gasoline Comparison */}
            <div className="glass-card rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 sm:gap-2">
                  <TrendingDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                  <span>{t.savingsTitle}</span>
                </h4>
                <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                  {t.savingsBadge}
                </span>
              </div>

              <div className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs">
                <div className="flex justify-between items-center text-slate-400">
                  <span>{t.gasolineCar}</span>
                  <span className="text-rose-400 font-semibold">{formatPHP(calculations.monthlyGasCost)} / mo</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>{t.vinfastEV}</span>
                  <span className="text-emerald-400 font-semibold">{formatPHP(calculations.monthlyEVCost)} / mo</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-800 font-bold text-xs sm:text-sm">
                  <span className="text-white">{t.annualSavings}</span>
                  <span className="text-emerald-400 font-extrabold">{formatPHP(calculations.annualSavings)} {t.perYear}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enlarged Photo Lightbox Modal */}
      <ImageLightboxModal
        isOpen={Boolean(enlargedPhoto)}
        imageUrl={enlargedPhoto?.url || null}
        title={enlargedPhoto?.title}
        onClose={() => setEnlargedPhoto(null)}
        language={language}
      />
    </section>
  );
};
