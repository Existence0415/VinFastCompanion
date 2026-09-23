import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Phone,
  ChevronRight,
  X,
  ZoomIn,
} from 'lucide-react';
import type { ChatMessage } from '../types';
import { generateSalesResponse } from '../data/salesBrain';
import { TRANSLATIONS } from '../data/translations';
import { ImageLightboxModal } from './ImageLightboxModal';

interface AISalesChatProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTestDriveWithDealer?: (dealerId?: string, modelId?: string) => void;
  onSelectModel?: (modelId: string) => void;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
  language: 'EN' | 'PH';
}

export const AISalesChat = ({
  isOpen,
  onClose,
  onBookTestDriveWithDealer: _onBookTestDriveWithDealer,
  onSelectModel: _onSelectModel,
  initialPrompt,
  onClearInitialPrompt,
  language,
}: AISalesChatProps) => {
  const t = TRANSLATIONS[language].aiChat;

  const getWelcomeMessage = (lang: 'EN' | 'PH'): ChatMessage => {
    const tr = TRANSLATIONS[lang].aiChat;
    return {
      id: `msg-welcome-${lang}`,
      sender: 'assistant',
      text: [
        tr.welcomeHeader,
        '',
        tr.welcomeBody,
        '',
        tr.welcomeQuestion,
      ].join('\n'),
      timestamp: 'Just now',
    };
  };

  const [messages, setMessages] = useState<ChatMessage[]>([getWelcomeMessage(language)]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionLanguage, setSessionLanguage] = useState<string | null>(null);
  const [enlargedPhoto, setEnlargedPhoto] = useState<{ url: string; title?: string } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // When language changes, update welcome message if only 1 message exists, and reset session language
  useEffect(() => {
    setSessionLanguage(null);
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [getWelcomeMessage(language)];
      }
      return prev;
    });
  }, [language]);

  // Handle external prompt passed from another component (e.g. from Estimator "Ask AI")
  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate realistic instantaneous AI response time
    setTimeout(() => {
      const activeLang = sessionLanguage || language;
      const response = generateSalesResponse(query, activeLang, updatedMessages);

      if (response.detectedLanguage && response.detectedLanguage !== sessionLanguage) {
        setSessionLanguage(response.detectedLanguage);
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        mediaUrls: response.mediaUrls,
        suggestedDealer: response.suggestedDealer,
        quickActions: response.quickActions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Helper to render message text following strict formatting guidelines
  const renderMessageContent = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Check if line is an image URL
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        return;
      }

      // Empty lines become vertical spacing
      if (!trimmed) {
        elements.push(<div key={`space-${index}`} className="h-2.5" />);
        return;
      }

      // Check for UPPERCASE SECTION TITLE
      const isUppercaseHeader =
        trimmed.length > 3 &&
        trimmed === trimmed.toUpperCase() &&
        !trimmed.startsWith('-') &&
        !trimmed.includes(':');

      if (isUppercaseHeader) {
        elements.push(
          <div key={`header-${index}`} className="mt-3 mb-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-900/60 inline-block">
              {trimmed}
            </span>
          </div>
        );
        return;
      }

      // Check for bullet items
      if (trimmed.startsWith('- ')) {
        const bulletContent = trimmed.substring(2);
        elements.push(
          <div key={`bullet-${index}`} className="flex items-start gap-2 my-1 text-slate-200 min-w-0">
            <span className="text-blue-400 font-bold mt-0.5 shrink-0">•</span>
            <span className="text-xs sm:text-sm leading-relaxed break-words [overflow-wrap:anywhere] min-w-0">{bulletContent}</span>
          </div>
        );
        return;
      }

      // Check for Key: Value pairs
      if (trimmed.includes(': ') && !trimmed.startsWith('http')) {
        const [label, ...valParts] = trimmed.split(': ');
        const val = valParts.join(': ');
        elements.push(
          <div key={`kv-${index}`} className="flex flex-wrap items-baseline gap-1.5 text-xs sm:text-sm my-0.5 min-w-0 break-words">
            <span className="text-slate-400 font-medium shrink-0">{label}:</span>
            <span className="text-slate-100 font-semibold break-words [overflow-wrap:anywhere] min-w-0">{val}</span>
          </div>
        );
        return;
      }

      // Standard text (like natural closing questions)
      const isQuestion = trimmed.endsWith('?');
      elements.push(
        <p
          key={`text-${index}`}
          className={`text-xs sm:text-sm leading-relaxed break-words [overflow-wrap:anywhere] min-w-0 ${
            isQuestion
              ? 'text-cyan-300 font-semibold pt-2 border-t border-slate-800/80'
              : 'text-slate-200'
          }`}
        >
          {trimmed}
        </p>
      );
    });

    return elements;
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        id="ai-specialist"
        data-testid="ai-specialist-modal"
        onClick={onClose}
        className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-0 lg:p-4 cursor-pointer"
      >
        <div
          id="ai-assistant"
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-full lg:max-w-5xl h-full lg:h-auto max-h-[100dvh] lg:max-h-[90vh] bg-slate-950 border-0 lg:border border-slate-800 rounded-none lg:rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 flex flex-col cursor-default"
        >
          {/* Header Bar */}
          <div className="p-3 sm:p-4 lg:p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0 gap-2 w-full max-w-full">
            <div className="flex items-center gap-2 sm:gap-3.5 min-w-0 flex-1">
              <div className="relative shrink-0">
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-white p-1 shadow-lg shadow-blue-500/25 flex items-center justify-center overflow-hidden border border-slate-700/50">
                  <img src="/vinfast-logo.png" alt="VinFast" className="w-full h-full object-contain" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-sm" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <h3 className="text-xs sm:text-base lg:text-lg font-bold text-white tracking-tight truncate">
                    {t.agentTitle}
                  </h3>
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="hidden sm:inline">{t.agentBadge}</span>
                    <span className="sm:hidden">Online</span>
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-400 truncate">
                  {t.agentSubtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>{t.connectedDealers}</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close AI Specialist chat"
                className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Reply Suggestion Chips */}
          <div className="px-3 py-2 sm:px-4 sm:py-2.5 bg-slate-950/60 border-b border-slate-800/60 overflow-x-auto flex items-center gap-1.5 sm:gap-2 no-scrollbar w-full max-w-full shrink-0">
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-semibold uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-400" />
              {t.suggestedLabel}
            </span>
            {t.chips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleSendMessage(chip)}
                className="shrink-0 text-[10px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-blue-500/50 transition-all flex items-center gap-1"
              >
                <span>{chip}</span>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </button>
            ))}
          </div>

          {/* Chat Messages Log */}
          <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 flex-1 overflow-y-auto overflow-x-hidden w-full max-w-full min-w-0">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`w-full flex ${isAssistant ? 'justify-start' : 'justify-end'} min-w-0`}
                >
                  <div
                    className={`max-w-[95%] sm:max-w-[85%] lg:max-w-[80%] rounded-2xl p-3 sm:p-4 lg:p-5 transition-all text-xs sm:text-sm break-words [overflow-wrap:anywhere] overflow-hidden min-w-0 ${
                      isAssistant
                        ? 'bg-slate-900/95 text-slate-100 border border-slate-800 shadow-md'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20'
                    }`}
                  >
                    {/* Message Header */}
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 mb-2 gap-3">
                      <span className="font-semibold text-slate-300 truncate">
                        {isAssistant ? (language === 'PH' ? 'VinFast Senior Sales Consultant' : 'VinFast Senior Sales Consultant') : (language === 'PH' ? 'Ikaw' : 'You')}
                      </span>
                      <span className="shrink-0">{msg.timestamp}</span>
                    </div>

                    {/* Formatted Text Content */}
                    <div className="space-y-1">{renderMessageContent(msg.text)}</div>

                    {/* Media Gallery (if mediaUrls present) */}
                    {msg.mediaUrls && msg.mediaUrls.length > 0 && (
                      <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-800/80">
                        <div className="text-[10px] sm:text-[11px] font-semibold text-blue-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                          <span>{t.officialMedia} ({msg.mediaUrls.length} {language === 'PH' ? 'Litrato' : 'Photos'})</span>
                          <span className="text-slate-400 text-[9px] sm:text-[10px]">{t.clickToEnlarge}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                          {msg.mediaUrls.map((url, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() =>
                                setEnlargedPhoto({
                                  url,
                                  title: `${t.officialMedia} · ${language === 'PH' ? 'Litrato' : 'Photo'} ${idx + 1}`,
                                })
                              }
                              className="group relative h-24 sm:h-28 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/80 overflow-hidden cursor-pointer flex items-center justify-center p-2 transition-all hover:scale-[1.02] text-left focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                              title={t.clickToEnlarge}
                            >
                              <img
                                src={url}
                                alt={`VinFast Vehicle ${idx + 1}`}
                                className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-blue-950/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-white bg-blue-600/90 px-2 py-1 rounded-lg shadow-lg">
                                  <ZoomIn className="w-3.5 h-3.5" />
                                  <span>{language === 'PH' ? 'Palakihin' : 'Enlarge'}</span>
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggested Dealer Card (if applicable) */}
                    {msg.suggestedDealer && (
                      <div className="mt-3 sm:mt-4 p-3 rounded-xl bg-blue-950/40 border border-blue-800/60 text-xs w-full max-w-full overflow-hidden min-w-0">
                        <div className="flex items-center justify-between mb-1 gap-2 min-w-0">
                          <span className="font-bold text-white text-xs sm:text-sm truncate">
                            {msg.suggestedDealer.name}
                          </span>
                          <span className="text-[9px] sm:text-[10px] text-blue-300 font-semibold px-1.5 sm:px-2 py-0.5 rounded bg-blue-900/60 border border-blue-700/60 shrink-0">
                            {msg.suggestedDealer.region}
                          </span>
                        </div>
                        <p className="text-slate-300 mb-2 text-[11px] sm:text-xs break-words [overflow-wrap:anywhere]">{msg.suggestedDealer.address}</p>
                        <div className="flex items-center gap-3">
                          <a
                            href={`tel:${msg.suggestedDealer.hotlineRaw}`}
                            className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold text-xs"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{msg.suggestedDealer.hotline}</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-slate-400 text-xs flex items-center gap-2">
                  <div className="flex space-x-1">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[11px] sm:text-xs">{t.typingIndicator}</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-2.5 sm:p-3 lg:p-4 bg-slate-900/90 border-t border-slate-800 shrink-0 w-full max-w-full">
            <div className="flex items-center gap-2 w-full min-w-0">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.inputPlaceholder}
                className="flex-1 min-w-0 bg-slate-950 border border-slate-700/80 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isTyping}
                className="p-2.5 sm:p-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white transition-all shadow-md shadow-blue-500/30 flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 mt-1.5 sm:mt-2 px-1 min-w-0 gap-2">
              <span className="truncate flex-1 min-w-0">{t.disclaimer}</span>
              <span className="hidden sm:inline shrink-0">{t.pressEnter}</span>
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
    </>
  );
};
