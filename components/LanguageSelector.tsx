import React from 'react';
import { Language } from '../types';
import { Languages } from 'lucide-react';

interface Props {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSelector: React.FC<Props> = ({ currentLang, onLanguageChange }) => {
  const getLabel = (l: Language) => {
    switch(l) {
      case Language.JA: return 'JP';
      case Language.ZH: return 'CN';
      case Language.EN: return 'EN';
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <div className="flex items-center bg-slate-100 rounded-full p-1 pl-2 pr-1 border border-slate-200">
        <Languages className="w-3 h-3 text-slate-400 mr-1.5" />
        <select 
          value={currentLang}
          onChange={(e) => onLanguageChange(e.target.value as Language)}
          className="appearance-none bg-transparent font-bold text-xs text-slate-600 focus:outline-none cursor-pointer pr-6 py-1"
          style={{ textAlignLast: 'center' }}
        >
          <option value={Language.JA}>日本語</option>
          <option value={Language.ZH}>中文</option>
          <option value={Language.EN}>English</option>
        </select>
        {/* Custom Arrow */}
        <div className="pointer-events-none absolute right-2 flex items-center text-slate-400">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;