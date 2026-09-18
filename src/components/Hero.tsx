import React from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeroProps {
  language: Language;
  onRegisterClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onRegisterClick }) => {
  const t = TRANSLATIONS[language].hero;

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 border-b border-[#E2E8F0] bg-gradient-to-b from-[#F8F9FA] via-white to-[#F8F9FA]"
    >
      {/* Blueprint grid background effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(#1A365D 0.75px, transparent 0.75px), radial-gradient(#B8860B 0.75px, #F8F9FA 0.75px)',
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 15px 15px',
        }}
      />

      {/* Subtle radial ambient highlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#B8860B]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Official Ministry Announcement Pill Badge */}
        <div
          id="hero-official-badge"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDF8EE] border border-[#E2CFAD] text-[#7B5800] text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-6 shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-[#B8860B] animate-pulse" />
          <span>{t.officialBadge}</span>
        </div>

        {/* Big Display Title */}
        <h1
          id="hero-title"
          className="font-['Montserrat'] font-extrabold text-3xl sm:text-5xl lg:text-[56px] text-[#002045] leading-[1.15] tracking-tight max-w-4xl mx-auto mb-6"
        >
          {t.title}
        </h1>

        {/* Subtitle */}
        <p
          id="hero-subtitle"
          className="text-sm sm:text-base md:text-lg text-[#475569] max-w-3xl mx-auto leading-relaxed mb-10 font-normal"
        >
          {t.subtitle}
        </p>

        {/* Event Key Details Bar */}
        <div
          id="hero-event-details-bar"
          className="w-full max-w-4xl bg-white border border-[#E2E8F0] rounded-2xl shadow-xs py-4 px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0] mb-10"
        >
          {/* Date */}
          <div className="flex items-center justify-center gap-3 pt-2 md:pt-0">
            <Calendar className="w-5 h-5 text-[#B8860B] shrink-0" />
            <div className="text-left">
              <span className="block font-mono text-xs font-bold text-[#002045] tracking-tight">
                {t.date}
              </span>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center justify-center gap-3 pt-2 md:pt-0">
            <Clock className="w-5 h-5 text-[#B8860B] shrink-0" />
            <div className="text-left">
              <span className="block font-mono text-xs font-bold text-[#002045] tracking-tight">
                {t.time}
              </span>
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-center justify-center gap-3 pt-2 md:pt-0">
            <MapPin className="w-5 h-5 text-[#B8860B] shrink-0" />
            <div className="text-left">
              <span className="block font-['Montserrat'] text-xs font-bold text-[#002045] tracking-tight uppercase">
                {t.venue}
              </span>
            </div>
          </div>

          {/* Target Audience */}
          <div className="flex items-center justify-center gap-3 pt-2 md:pt-0">
            <Users className="w-5 h-5 text-[#B8860B] shrink-0" />
            <div className="text-left">
              <span className="block font-['Montserrat'] text-xs font-bold text-[#002045] tracking-tight uppercase">
                {t.audience}
              </span>
            </div>
          </div>
        </div>

        {/* Primary CTA Golden Button */}
        <div className="flex flex-col items-center gap-3">
          <button
            id="hero-cta-btn"
            onClick={onRegisterClick}
            className="group px-8 py-4 bg-[#B8860B] hover:bg-[#996F08] active:scale-[0.98] text-white font-['Montserrat'] font-bold text-sm uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <span>{t.cta}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Microcopy limit */}
          <p
            id="hero-limits-text"
            className="font-mono text-[11px] sm:text-xs text-[#64748B] tracking-wider uppercase"
          >
            {t.limits}
          </p>
        </div>
      </div>
    </section>
  );
};
