import React from 'react';
import { FileText, BookOpen, CheckSquare, Download } from 'lucide-react';
import { Language, DocumentItem } from '../types';
import { DOCUMENTS } from '../data/conferenceData';
import { TRANSLATIONS } from '../data/translations';

interface DocumentsSectionProps {
  language: Language;
  onOpenDocument: (doc: DocumentItem) => void;
}

export const DocumentsSection: React.FC<DocumentsSectionProps> = ({
  language,
  onOpenDocument,
}) => {
  const t = TRANSLATIONS[language].documents;

  const getDocIcon = (id: string) => {
    switch (id) {
      case 'doc-1':
        return <FileText className="w-5 h-5 text-[#B8860B]" />;
      case 'doc-2':
        return <BookOpen className="w-5 h-5 text-[#002045]" />;
      default:
        return <CheckSquare className="w-5 h-5 text-[#B8860B]" />;
    }
  };

  return (
    <section id="handbook" className="py-16 md:py-24 bg-[#F8F9FA] border-b border-[#E2E8F0]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1 h-3.5 bg-[#B8860B] rounded-xs" />
            <span className="font-['Montserrat'] font-bold text-xs tracking-wider text-[#7B5800] uppercase">
              {t.eyebrow}
            </span>
          </div>
          <h2
            id="documents-title"
            className="font-['Montserrat'] font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#002045] leading-tight"
          >
            {t.title}
          </h2>
        </div>

        {/* 3 Document Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {DOCUMENTS.map((doc) => {
            const title = language === 'vi' ? doc.titleVi : doc.title;
            const desc = language === 'vi' ? doc.descriptionVi : doc.description;
            const badge = language === 'vi' ? doc.badgeVi : doc.badge;
            const btnLabel = language === 'vi' ? doc.buttonLabelVi : doc.buttonLabel;

            return (
              <div
                key={doc.id}
                id={`doc-card-${doc.id}`}
                className="bg-white border border-[#E2E8F0] hover:border-[#C5A880] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#FDF8EE] border border-[#E2CFAD] flex items-center justify-center shadow-xs">
                      {getDocIcon(doc.id)}
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-[#F8F9FA] border border-[#E2E8F0] text-[#64748B] font-mono text-[10px] font-bold uppercase tracking-wider">
                      {badge}
                    </span>
                  </div>

                  {/* Document Title */}
                  <h3 className="font-['Montserrat'] font-bold text-base sm:text-lg text-[#002045] mb-2 leading-snug">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#64748B] leading-relaxed mb-6">
                    {desc}
                  </p>
                </div>

                {/* Footer File Type & Download CTA */}
                <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-[#94A3B8] font-medium">
                    {doc.fileFormat} ({doc.fileSize})
                  </span>

                  {doc.variant === 'gold' ? (
                    <button
                      onClick={() => onOpenDocument(doc)}
                      className="px-4 py-2 bg-[#B8860B] hover:bg-[#996F08] active:scale-95 text-white font-['Montserrat'] font-bold text-[11px] uppercase tracking-wider rounded-full shadow-xs flex items-center gap-1.5 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{btnLabel}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenDocument(doc)}
                      className="px-3.5 py-1.5 border border-[#CBD5E1] hover:border-[#002045] hover:text-[#002045] active:scale-95 text-[#475569] font-['Montserrat'] font-bold text-[11px] uppercase tracking-wider rounded-full flex items-center gap-1.5 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{btnLabel}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
