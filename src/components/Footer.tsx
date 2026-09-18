import React from 'react';
import { Scale } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  language: Language;
  onOpenPrivacy: () => void;
  onOpenRegulations: () => void;
  onOpenAdvisory: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenPrivacy,
  onOpenRegulations,
  onOpenAdvisory,
}) => {
  const t = TRANSLATIONS[language].footer;

  return (
    <footer className="bg-[#002045] text-[#94A3B8] py-8 border-t border-[#1A365D]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        {/* Left: Emblem & Copyright */}
        <div className="flex items-center gap-2.5 text-center md:text-left">
          <div className="w-6 h-6 rounded-full bg-[#1A365D] border border-[#B8860B]/50 flex items-center justify-center text-[#B8860B] shrink-0">
            <Scale className="w-3.5 h-3.5" />
          </div>
          <span className="text-[#CBD5E1] font-mono text-[11px] sm:text-xs">
            {t.copyright}
          </span>
        </div>

        {/* Right: Policy Links */}
        <div className="flex items-center gap-6 font-medium">
          <button
            onClick={onOpenRegulations}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {t.regulations}
          </button>
          <button
            onClick={onOpenPrivacy}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {t.privacy}
          </button>
          <button
            onClick={onOpenAdvisory}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {t.advisory}
          </button>
        </div>
      </div>
    </footer>
  );
};
