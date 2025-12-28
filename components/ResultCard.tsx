import React from 'react';
import { SearchResult, SafetyStatus, Translations, Language } from '../types';
import { CheckCircle2, AlertTriangle, HelpCircle, Globe, ExternalLink, X, Building2 } from 'lucide-react';

interface Props {
  result: SearchResult;
  translations: Translations;
  currentLang: Language;
  onClose: () => void;
}

const ResultCard: React.FC<Props> = ({ result, translations, currentLang, onClose }) => {
  const t = translations[currentLang];

  const getStatusColor = () => {
    switch (result.status) {
      case SafetyStatus.SAFE: return 'bg-emerald-500 text-white';
      case SafetyStatus.SCAM: return 'bg-rose-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  const getStatusIcon = () => {
    switch (result.status) {
      case SafetyStatus.SAFE: return <CheckCircle2 className="w-12 h-12" />;
      case SafetyStatus.SCAM: return <AlertTriangle className="w-12 h-12" />;
      default: return <HelpCircle className="w-12 h-12" />;
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white w-full rounded-t-[2rem] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] animate-slide-up flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle Area */}
        <div className="w-full flex justify-center pt-3 pb-1" onClick={onClose}>
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header / Status Section */}
        <div className={`px-6 py-8 flex flex-col items-center text-center ${getStatusColor()}`}>
          <div className="mb-3 p-3 bg-white/20 rounded-full backdrop-blur-md shadow-inner">
            {getStatusIcon()}
          </div>
          <h2 key={`status-${currentLang}`} className="text-2xl font-bold tracking-tight mb-1 animate-fade-in">
            {result.status === SafetyStatus.SAFE && t.resultLabels.safe}
            {result.status === SafetyStatus.SCAM && t.resultLabels.scam}
            {result.status === SafetyStatus.UNKNOWN && t.resultLabels.unknown}
          </h2>
          <p className="font-mono opacity-90 tracking-wider text-sm">{result.phoneNumber}</p>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
          
          {/* Entity Name */}
          {result.entityName && result.status !== SafetyStatus.UNKNOWN && (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-start space-x-4">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p key={`lbl-entity-${currentLang}`} className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1 animate-fade-in">{t.resultLabels.entity}</p>
                <p className="text-lg font-bold text-slate-900 leading-tight">{result.entityName}</p>
              </div>
            </div>
          )}

          {/* Website Link */}
          {result.status === SafetyStatus.SAFE && result.website && (
            <a 
              href={result.website.startsWith('http') ? result.website : `https://${result.website}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="group block bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-50 p-2 rounded-lg group-hover:bg-emerald-100 transition-colors">
                    <Globe className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p key={`lbl-web-${currentLang}`} className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5 animate-fade-in">{t.resultLabels.website}</p>
                    <p className="text-sm font-medium text-emerald-700 truncate max-w-[200px]">{result.website}</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-emerald-500" />
              </div>
            </a>
          )}

          {/* Description */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center">
              <span className="w-1 h-4 bg-slate-300 rounded-full mr-2"></span>
              <span key={`lbl-reason-${currentLang}`} className="animate-fade-in">{t.resultLabels.reason}</span>
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {result.status === SafetyStatus.UNKNOWN ? (
                <span key={`msg-unknown-${currentLang}`} className="animate-fade-in">{t.unknownMessage}</span>
              ) : (
                result.description
              )}
            </p>
          </div>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="w-full py-4 bg-slate-200 text-slate-700 font-bold rounded-xl active:scale-[0.98] transition-transform"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;