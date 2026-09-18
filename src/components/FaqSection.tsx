import React, { useState } from 'react';
import { ChevronDown, HelpCircle, BookOpen } from 'lucide-react';
import { Language } from '../types';
import { FAQ_ITEMS } from '../data/conferenceData';
import { TRANSLATIONS } from '../data/translations';

interface FaqSectionProps {
  language: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].faq;
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#F8F9FA] border-b border-[#E2E8F0]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
            <span className="w-1 h-3.5 bg-[#B8860B] rounded-xs" />
            <span className="font-['Montserrat'] font-bold text-xs tracking-wider text-[#7B5800] uppercase">
              {t.eyebrow}
            </span>
          </div>
          <h2
            id="faq-title"
            className="font-['Montserrat'] font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#002045] leading-tight"
          >
            {t.title}
          </h2>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = !!openIds[item.id];
            const question = language === 'vi' ? item.questionVi : item.question;
            const answer = language === 'vi' ? item.answerVi : item.answer;

            return (
              <div
                key={item.id}
                id={`faq-item-${item.id}`}
                className={`bg-white border rounded-xl transition-all shadow-xs ${
                  isOpen ? 'border-[#C5A880] ring-1 ring-[#C5A880]/20' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                }`}
              >
                {/* Accordion Question Header */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs font-bold text-[#B8860B] shrink-0">
                      {item.num}
                    </span>
                    <span className="font-['Montserrat'] font-bold text-xs sm:text-sm text-[#002045] leading-snug">
                      {question}
                    </span>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[#64748B] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#B8860B]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Body */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#F1F5F9]">
                    <p className="mb-3">{answer}</p>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-[#7B5800] bg-[#FDF8EE] px-2.5 py-1 rounded border border-[#E2CFAD]">
                      <BookOpen className="w-3 h-3" />
                      <span>{t.legalBasisLabel} {item.legalBasis}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
