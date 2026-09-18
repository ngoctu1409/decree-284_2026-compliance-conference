import React, { useState } from 'react';
import { Shield, ShieldAlert, Lock, Info, Landmark } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface RegulatorySignificanceProps {
  language: Language;
}

export const RegulatorySignificance: React.FC<RegulatorySignificanceProps> = ({ language }) => {
  const t = TRANSLATIONS[language].significance;
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  const segments = [
    {
      id: 0,
      label: t.chartItem1,
      percent: 45,
      color: '#B8860B',
      detail: language === 'vi' ? 'Vốn điều lệ tối thiểu 50 tỷ VNĐ & kiểm toán hệ thống' : 'Min 50B VND statutory capital & server custody audit',
    },
    {
      id: 1,
      label: t.chartItem2,
      percent: 35,
      color: '#002045',
      detail: language === 'vi' ? 'Định danh eKYC, chuẩn Travel Rule & khấu trừ thuế' : 'Mandatory eKYC, Travel Rule protocols & tax clawbacks',
    },
    {
      id: 2,
      label: t.chartItem3,
      percent: 20,
      color: '#94A3B8',
      detail: language === 'vi' ? 'Phân tách 95% tài sản ví lạnh & bảo hiểm bồi thường' : '95% cold storage segregation & compensation fund',
    },
  ];

  // SVG Donut calculation
  // Radius = 60, strokeWidth = 20, circumference = 2 * PI * 60 ~= 376.99
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  return (
    <section id="overview" className="py-16 md:py-20 bg-[#F8F9FA] border-b border-[#E2E8F0]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-12">
          {/* Left Column: Narrative & Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Section Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-3.5 bg-[#B8860B] rounded-xs" />
              <span className="font-['Montserrat'] font-bold text-xs tracking-wider text-[#7B5800] uppercase">
                {t.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h2
              id="significance-headline"
              className="font-['Montserrat'] font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#002045] leading-tight mb-5"
            >
              {t.headline}
            </h2>

            {/* Paragraph Description */}
            <p
              id="significance-paragraph"
              className="text-sm sm:text-base text-[#475569] leading-relaxed mb-8"
            >
              {t.paragraph}
            </p>

            {/* Two Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: FATF */}
              <div
                id="significance-card-fatf"
                className="bg-white border border-[#E2E8F0] hover:border-[#C5A880] rounded-xl p-5 shadow-xs transition-all hover:shadow-sm"
              >
                <div className="w-9 h-9 rounded-lg bg-[#FDF8EE] border border-[#E2CFAD] flex items-center justify-center text-[#B8860B] mb-3">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-['Montserrat'] font-bold text-sm text-[#002045] mb-2 leading-snug">
                  {t.card1Title}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {t.card1Desc}
                </p>
              </div>

              {/* Card 2: Safe Harbor */}
              <div
                id="significance-card-safeharbor"
                className="bg-white border border-[#E2E8F0] hover:border-[#C5A880] rounded-xl p-5 shadow-xs transition-all hover:shadow-sm"
              >
                <div className="w-9 h-9 rounded-lg bg-[#FDF8EE] border border-[#E2CFAD] flex items-center justify-center text-[#B8860B] mb-3">
                  <Landmark className="w-5 h-5" />
                </div>
                <h3 className="font-['Montserrat'] font-bold text-sm text-[#002045] mb-2 leading-snug">
                  {t.card2Title}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {t.card2Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 2026 Ecosystem Impact Allocation Donut Chart Card (5 cols) */}
          <div className="lg:col-span-5">
            <div
              id="ecosystem-impact-card"
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs relative"
            >
              {/* Header with Title & Info Icon */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F1F5F9]">
                <span className="font-mono text-xs font-bold text-[#002045] tracking-wider uppercase">
                  {t.chartTitle}
                </span>
                <div className="group relative">
                  <Info className="w-4 h-4 text-[#94A3B8] cursor-pointer hover:text-[#002045] transition-colors" />
                  <div className="absolute right-0 top-6 hidden group-hover:block w-56 p-2 bg-[#002045] text-white text-[11px] rounded-lg shadow-lg z-20">
                    {language === 'vi'
                      ? 'Thống kê trọng số phân bổ nguồn lực tuân thủ và chế tài giám sát theo Nghị định 284/2026.'
                      : 'Weighted compliance resource allocation and regulatory oversight index under Decree 284/2026.'}
                  </div>
                </div>
              </div>

              {/* Donut Chart SVG */}
              <div className="relative flex items-center justify-center my-4">
                <svg className="w-48 h-48 -rotate-90" viewBox="0 0 160 160">
                  {/* Background Track */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke="#F1F5F9"
                    strokeWidth="18"
                  />
                  {/* Segments */}
                  {segments.map((seg) => {
                    const strokeDasharray = `${(seg.percent / 100) * circumference} ${circumference}`;
                    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
                    accumulatedPercent += seg.percent;

                    const isHovered = hoveredSegment === seg.id;

                    return (
                      <circle
                        key={seg.id}
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="transparent"
                        stroke={seg.color}
                        strokeWidth={isHovered ? 22 : 18}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => setHoveredSegment(seg.id)}
                        onMouseLeave={() => setHoveredSegment(null)}
                      />
                    );
                  })}
                </svg>

                {/* Inner Donut Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
                  {hoveredSegment !== null ? (
                    <>
                      <span className="font-['Montserrat'] font-extrabold text-2xl text-[#002045]">
                        {segments[hoveredSegment].percent}%
                      </span>
                      <span className="text-[10px] text-[#64748B] font-semibold line-clamp-2 max-w-[110px] leading-tight">
                        {segments[hoveredSegment].label}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-['Montserrat'] font-extrabold text-xl text-[#002045]">
                        100%
                      </span>
                      <span className="text-[10px] font-mono text-[#B8860B] font-bold uppercase tracking-wider">
                        COMPLIANCE
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Segment Legend Items */}
              <div className="space-y-3 pt-3 border-t border-[#F1F5F9]">
                {segments.map((seg) => (
                  <div
                    key={seg.id}
                    onMouseEnter={() => setHoveredSegment(seg.id)}
                    onMouseLeave={() => setHoveredSegment(null)}
                    className={`flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer ${
                      hoveredSegment === seg.id ? 'bg-[#F8F9FA]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: seg.color }}
                      />
                      <span className="text-xs font-medium text-[#334155]">
                        {seg.label}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#002045]">
                      {seg.percent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Counter Bar (4 Columns) */}
        <div
          id="key-metrics-counter-bar"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0]"
        >
          {/* Metric 1 */}
          <div className="text-center pt-2 md:pt-0">
            <div className="font-['Montserrat'] font-extrabold text-3xl sm:text-4xl text-[#002045] mb-1">
              {t.stat1Number}
            </div>
            <div className="font-mono text-[10px] sm:text-xs tracking-wider text-[#64748B] font-semibold uppercase">
              {t.stat1Label}
            </div>
          </div>

          {/* Metric 2 */}
          <div className="text-center pt-2 md:pt-0">
            <div className="font-['Montserrat'] font-extrabold text-3xl sm:text-4xl text-[#002045] mb-1">
              {t.stat2Number}
            </div>
            <div className="font-mono text-[10px] sm:text-xs tracking-wider text-[#64748B] font-semibold uppercase">
              {t.stat2Label}
            </div>
          </div>

          {/* Metric 3 */}
          <div className="text-center pt-2 md:pt-0">
            <div className="font-['Montserrat'] font-extrabold text-3xl sm:text-4xl text-[#002045] mb-1">
              {t.stat3Number}
            </div>
            <div className="font-mono text-[10px] sm:text-xs tracking-wider text-[#64748B] font-semibold uppercase">
              {t.stat3Label}
            </div>
          </div>

          {/* Metric 4 */}
          <div className="text-center pt-2 md:pt-0">
            <div className="font-['Montserrat'] font-extrabold text-3xl sm:text-4xl text-[#B8860B] mb-1">
              {t.stat4Number}
            </div>
            <div className="font-mono text-[10px] sm:text-xs tracking-wider text-[#64748B] font-semibold uppercase">
              {t.stat4Label}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
