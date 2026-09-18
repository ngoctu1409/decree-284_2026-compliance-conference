import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, Search } from 'lucide-react';
import { Language } from '../types';
import { PENALTY_MATRIX } from '../data/conferenceData';
import { TRANSLATIONS } from '../data/translations';

interface PenaltyMatrixSectionProps {
  language: Language;
}

export const PenaltyMatrixSection: React.FC<PenaltyMatrixSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].penalties;
  const [filterQuery, setFilterQuery] = useState('');

  const filteredItems = PENALTY_MATRIX.filter((item) => {
    const q = filterQuery.toLowerCase();
    const violation = (language === 'vi' ? item.violationVi : item.violation).toLowerCase();
    const entity = (language === 'vi' ? item.applicableEntityVi : item.applicableEntity).toLowerCase();
    const ref = (language === 'vi' ? item.legalReferenceVi : item.legalReference).toLowerCase();
    return violation.includes(q) || entity.includes(q) || ref.includes(q);
  });

  const getTagStyle = (tag: string) => {
    if (tag === 'Criminal Referral' || tag === 'Chuyển cơ quan điều tra') {
      return 'bg-[#FFF1F2] text-[#9F1239] border-[#FECDD3]';
    }
    if (tag === 'Forced Cessation' || tag === 'Đình chỉ bắt buộc') {
      return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]';
    }
    if (tag === 'Technical Suspension' || tag === 'Tạm ngưng kỹ thuật') {
      return 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]';
    }
    return 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]';
  };

  return (
    <section id="penalties" className="py-16 md:py-24 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-3.5 bg-[#B8860B] rounded-xs" />
              <span className="font-['Montserrat'] font-bold text-xs tracking-wider text-[#7B5800] uppercase">
                {t.eyebrow}
              </span>
            </div>
            <h2
              id="penalties-title"
              className="font-['Montserrat'] font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#002045] leading-tight"
            >
              {t.title}
            </h2>
          </div>

          {/* Mandatory Enforcement Pill Alert */}
          <div
            id="penalties-alert-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-xs font-semibold self-start md:self-auto"
          >
            <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
            <span>{t.alertBadge}</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 max-w-sm">
          <div className="relative">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F8F9FA] border border-[#E2E8F0] rounded-lg text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#B8860B]"
            />
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto rounded-xl border border-[#E2E8F0] bg-white shadow-xs">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#E2E8F0]">
                <th className="py-3.5 px-5 font-mono text-xs font-bold text-[#002045] uppercase tracking-wider w-[28%]">
                  {t.colViolation}
                </th>
                <th className="py-3.5 px-5 font-mono text-xs font-bold text-[#002045] uppercase tracking-wider w-[24%]">
                  {t.colEntity}
                </th>
                <th className="py-3.5 px-5 font-mono text-xs font-bold text-[#002045] uppercase tracking-wider w-[18%]">
                  {t.colPenalty}
                </th>
                <th className="py-3.5 px-5 font-mono text-xs font-bold text-[#002045] uppercase tracking-wider w-[30%]">
                  {t.colRemedy}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredItems.map((row) => {
                const violation = language === 'vi' ? row.violationVi : row.violation;
                const ref = language === 'vi' ? row.legalReferenceVi : row.legalReference;
                const entity = language === 'vi' ? row.applicableEntityVi : row.applicableEntity;
                const penalty = language === 'vi' ? row.monetaryPenaltyVi : row.monetaryPenalty;
                const remedyTag = language === 'vi' ? row.remedialTagVi : row.remedialTag;
                const remedyMeasure = language === 'vi' ? row.remedialMeasureVi : row.remedialMeasure;

                return (
                  <tr
                    key={row.id}
                    id={`penalty-row-${row.id}`}
                    className="hover:bg-[#F8F9FA]/70 transition-colors"
                  >
                    {/* Violation Category */}
                    <td className="py-4 px-5 align-top">
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] shrink-0 mt-1.5" />
                        <div>
                          <p className="font-semibold text-xs sm:text-sm text-[#002045] leading-snug">
                            {violation}
                          </p>
                          <p className="font-mono text-[10px] sm:text-[11px] text-[#64748B] mt-1 font-medium">
                            {ref}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Applicable Entity */}
                    <td className="py-4 px-5 align-top text-xs text-[#334155] leading-relaxed">
                      {entity}
                    </td>

                    {/* Monetary Penalty */}
                    <td className="py-4 px-5 align-top">
                      <span
                        className={`font-['Montserrat'] font-bold text-xs sm:text-sm ${
                          row.penaltyType === 'red' ? 'text-[#B91C1C]' : 'text-[#B8860B]'
                        }`}
                      >
                        {penalty}
                      </span>
                    </td>

                    {/* Remedial & Enforcement Measures */}
                    <td className="py-4 px-5 align-top">
                      <div className="flex flex-col items-start gap-1.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${getTagStyle(
                            remedyTag
                          )}`}
                        >
                          {remedyTag}
                        </span>
                        <p className="text-xs text-[#475569] leading-relaxed">
                          {remedyMeasure}
                        </p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
