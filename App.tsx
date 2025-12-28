import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck, Loader2, Info, Phone } from 'lucide-react';
import { Language, SearchResult, SafetyStatus } from './types';
import { APP_TRANSLATIONS } from './constants';
import { analyzePhoneNumber } from './services/geminiService';
import LanguageSelector from './components/LanguageSelector';
import ResultCard from './components/ResultCard';

const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>(Language.EN);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) {
      setCurrentLang(Language.ZH);
    } else if (browserLang.startsWith('ja')) {
      setCurrentLang(Language.JA);
    } else {
      setCurrentLang(Language.EN);
    }
  }, []);

  const t = APP_TRANSLATIONS[currentLang];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setIsLoading(true);
    setResult(null);

    // Unfocus input to close keyboard on mobile
    (document.activeElement as HTMLElement)?.blur();

    try {
      const data = await analyzePhoneNumber(phoneNumber, currentLang);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setResult(null);
    setPhoneNumber('');
  };

  return (
    <div className="w-full h-full max-w-[420px] bg-slate-50 md:h-[844px] md:max-h-[90vh] md:rounded-[2.5rem] md:shadow-2xl md:border-[8px] md:border-slate-800 flex flex-col relative overflow-hidden font-sans">
      
      {/* Top Status Bar Area (Visual only) */}
      <div className="h-2 w-full bg-transparent shrink-0"></div>

      {/* App Header */}
      <header className="px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
             <ShieldCheck className="w-5 h-5 text-white" />
           </div>
           <span className="font-bold text-slate-800 tracking-tight">ScamCheck</span>
        </div>
        <LanguageSelector currentLang={currentLang} onLanguageChange={setCurrentLang} />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col px-6 relative z-0">
        
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center pb-20 transition-all duration-500">
          <div className={`transition-all duration-500 ${phoneNumber ? 'scale-75 opacity-50' : 'scale-100 opacity-100'}`}>
            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mb-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
              {isLoading ? (
                 <Loader2 className="w-20 h-20 text-indigo-500 animate-spin" />
              ) : (
                 <Phone className="w-20 h-20 text-indigo-500 fill-indigo-50" />
              )}
            </div>
          </div>
          
          <h1 
            key={currentLang}
            className="text-2xl font-bold text-slate-900 text-center mb-2 leading-tight animate-fade-in"
          >
            {t.title}
          </h1>
          <p 
            key={`${currentLang}-subtitle`}
            className="text-slate-500 text-center text-sm max-w-[260px] leading-relaxed animate-fade-in"
          >
            {t.subtitle}
          </p>
        </div>

        {/* Input & Action Area - Pinned to bottom-ish */}
        <div className="pb-8 w-full">
           <form onSubmit={handleSearch} className="flex flex-col gap-4">
             <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-400 font-bold">#</span>
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full pl-10 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-900 placeholder-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-0 shadow-sm transition-all text-xl font-medium tracking-wide"
                  placeholder="090-1234-5678"
                  disabled={isLoading}
                />
             </div>

             <button
              type="submit"
              disabled={isLoading || !phoneNumber.trim()}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
             >
               {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span key={`loading-${currentLang}`} className="animate-fade-in">{t.analyzing}</span>
                  </>
               ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span key={`btn-${currentLang}`} className="animate-fade-in">{t.searchButton}</span>
                  </>
               )}
             </button>
           </form>

           <div className="mt-6 flex justify-center">
             <div className="flex items-center gap-2 text-[10px] text-slate-400 max-w-[80%] text-center leading-tight">
                <Info className="w-3 h-3 shrink-0" />
                <p key={`disclaimer-${currentLang}`} className="animate-fade-in">{t.disclaimer}</p>
             </div>
           </div>
        </div>

      </main>

      {/* Result Bottom Sheet */}
      {result && (
        <ResultCard 
          result={result} 
          translations={APP_TRANSLATIONS} 
          currentLang={currentLang} 
          onClose={() => setResult(null)}
        />
      )}

    </div>
  );
};

export default App;