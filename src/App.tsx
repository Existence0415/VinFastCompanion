import { useState, useEffect } from 'react';
import { Bot } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Estimator } from './components/Estimator';
import { AISalesChat } from './components/AISalesChat';
import { DealerLocator } from './components/DealerLocator';
import { TestDriveModal } from './components/TestDriveModal';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';

export function App() {
  const [selectedModelId, setSelectedModelId] = useState<string>('vf-5-plus');
  const [isTestDriveOpen, setIsTestDriveOpen] = useState<boolean>(false);
  const [isDealersOpen, setIsDealersOpen] = useState<boolean>(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<'EN' | 'PH'>('EN');

  // Modal context overrides
  const [testDriveDealerId, setTestDriveDealerId] = useState<string | undefined>(undefined);
  const [testDriveModelId, setTestDriveModelId] = useState<string | undefined>('vf-5-plus');

  // AI Prompt trigger
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string | undefined>(undefined);

  // Deep-link and URL hash listener (#ai-specialist, #ai-assistant, #dealers, #test-drive)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#ai-specialist' || hash === '#ai-assistant' || hash === '#ai-chat' || hash === '#ai') {
        setIsAiChatOpen(true);
      } else if (hash === '#dealers' || hash === '#dealer-locator' || hash === '#showrooms') {
        setIsDealersOpen(true);
      } else if (hash === '#test-drive' || hash === '#book-test-drive') {
        setIsTestDriveOpen(true);
      } else if (hash === '#admin') {
        setIsAdminOpen(true);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenTestDrive = (modelId?: string, dealerId?: string) => {
    setTestDriveModelId(modelId || selectedModelId);
    setTestDriveDealerId(dealerId);
    setIsTestDriveOpen(true);
  };

  const handleSelectModel = (modelId: string) => {
    setSelectedModelId(modelId);
    setTestDriveModelId(modelId);
  };

  const handleAskAI = (prompt: string) => {
    setAiInitialPrompt(prompt);
    setIsAiChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans relative">
      {/* Navigation Header */}
      <Header
        onOpenTestDrive={() => handleOpenTestDrive()}
        onOpenDealers={() => setIsDealersOpen(true)}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        language={language}
        onToggleLanguage={setLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onOpenTestDrive={() => handleOpenTestDrive()}
          language={language}
        />

        {/* Interactive Estimator Dashboard */}
        <Estimator
          selectedModelId={selectedModelId}
          onSelectModel={handleSelectModel}
          onBookTestDrive={(modelId) => handleOpenTestDrive(modelId)}
          onAskAI={handleAskAI}
          language={language}
        />
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Floating AI Specialist Action Button (Always Accessible on Desktop & Mobile) */}
      <button
        type="button"
        id="floating-ai-specialist-btn"
        onClick={() => setIsAiChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-semibold text-xs sm:text-sm shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-blue-400/30"
        aria-label="Open VinFast AI Sales Specialist"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
        </span>
        <span className="flex items-center gap-1.5">
          <Bot className="w-4 h-4 text-white" />
          <span>AI Specialist</span>
        </span>
      </button>

      {/* Modals */}
      <AISalesChat
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        initialPrompt={aiInitialPrompt}
        onClearInitialPrompt={() => setAiInitialPrompt(undefined)}
        onBookTestDriveWithDealer={(dealerId, modelId) => handleOpenTestDrive(modelId, dealerId)}
        onSelectModel={handleSelectModel}
        language={language}
      />

      <DealerLocator
        isOpen={isDealersOpen}
        onClose={() => setIsDealersOpen(false)}
        onBookTestDriveWithDealer={(dealerId) => handleOpenTestDrive(undefined, dealerId)}
        language={language}
      />

      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        preSelectedModelId={testDriveModelId}
        preSelectedDealerId={testDriveDealerId}
        language={language}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        language={language}
      />
    </div>
  );
}

export default App;
