import React, { useEffect } from 'react';
import { X, ExternalLink, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface ImageLightboxModalProps {
  isOpen: boolean;
  imageUrl: string | null;
  title?: string;
  onClose: () => void;
  language: 'EN' | 'PH';
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  imageUrl,
  title,
  onClose,
  language,
}) => {
  const t = TRANSLATIONS[language].aiChat;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageUrl) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Enlarged photo preview'}
      onClick={onClose}
      className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 animate-in fade-in duration-200 cursor-pointer select-none"
    >
      {/* Top Controls Bar */}
      <div
        className="w-full flex items-center justify-between z-20 shrink-0 gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title / Badge */}
        <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-200 shadow-xl backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="font-semibold truncate max-w-[200px] sm:max-w-md">
            {title || (language === 'PH' ? 'Opisyal na Litrato ng VinFast' : 'Official VinFast Showcase Photo')}
          </span>
        </div>

        {/* Top-Right Close Button ("X") */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t.closePhoto || 'Close enlarged photo'}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-900/95 hover:bg-red-600 border border-slate-700 hover:border-red-500 text-slate-200 hover:text-white shadow-2xl transition-all cursor-pointer group"
          title={t.closePhoto || 'Close (Esc)'}
        >
          <span className="text-xs font-semibold hidden sm:inline">
            {language === 'PH' ? 'Isara' : 'Close'}
          </span>
          <X className="w-5 h-5 text-slate-300 group-hover:text-white group-hover:rotate-90 transition-transform duration-200" />
        </button>
      </div>

      {/* Main Enlarged Image Display */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="my-auto relative max-w-5xl w-full flex flex-col items-center justify-center p-2 sm:p-4 cursor-default"
      >
        <img
          src={imageUrl}
          alt={title || 'Enlarged vehicle preview'}
          className="max-h-[68vh] sm:max-h-[75vh] max-w-full object-contain rounded-2xl drop-shadow-[0_25px_60px_rgba(0,132,255,0.25)] animate-in zoom-in-95 duration-200 border border-slate-800/60 bg-slate-950/60"
        />
      </div>

      {/* Bottom Action / Dismissal Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md flex items-center justify-center gap-2.5 sm:gap-3 z-20 shrink-0 pt-2 cursor-default"
      >
        <a
          href={imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs transition-colors shadow-lg"
        >
          <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
          <span>{t.openOriginal || 'Open original'}</span>
        </a>

        {/* Secondary Explicit Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold shadow-lg shadow-red-600/30 transition-all cursor-pointer active:scale-95"
        >
          <X className="w-4 h-4" />
          <span>{language === 'PH' ? 'Isara' : 'Close'}</span>
        </button>
      </div>
    </div>
  );
};
