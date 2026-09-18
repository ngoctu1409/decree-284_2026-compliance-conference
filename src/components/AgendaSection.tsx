import React, { useState } from 'react';
import { Clock, MapPin, Search, CalendarPlus, CheckCircle2 } from 'lucide-react';
import { Language, AgendaSession } from '../types';
import { AGENDA_SESSIONS } from '../data/conferenceData';
import { TRANSLATIONS } from '../data/translations';

interface AgendaSectionProps {
  language: Language;
}

export const AgendaSection: React.FC<AgendaSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].agenda;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedSessions, setAddedSessions] = useState<Record<string, boolean>>({});

  const filteredSessions = AGENDA_SESSIONS.filter((session) => {
    const matchesCategory =
      activeCategory === 'all' ||
      (activeCategory === 'keynote' && session.category === 'keynote') ||
      (activeCategory === 'panel' && (session.category === 'panel' || session.category === 'regulatory')) ||
      (activeCategory === 'networking' && session.category === 'networking');

    const searchLower = searchQuery.toLowerCase();
    const title = language === 'vi' ? session.titleVi : session.title;
    const desc = language === 'vi' ? session.descriptionVi : session.description;
    const loc = language === 'vi' ? session.locationVi : session.location;

    const matchesSearch =
      title.toLowerCase().includes(searchLower) ||
      desc.toLowerCase().includes(searchLower) ||
      loc.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  const handleToggleCalendar = (sessionId: string) => {
    setAddedSessions((prev) => ({
      ...prev,
      [sessionId]: !prev[sessionId],
    }));
  };

  const getBadgeStyle = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'bg-[#002045] text-white border-[#002045]';
      case 'gold':
        return 'bg-[#FDF8EE] text-[#7B5800] border-[#E2CFAD]';
      case 'danger':
        return 'bg-[#FFF1F2] text-[#9F1239] border-[#FECDD3]';
      default:
        return 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]';
    }
  };

  return (
    <section id="agenda" className="py-16 md:py-24 bg-white border-b border-[#E2E8F0]">
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
              id="agenda-title"
              className="font-['Montserrat'] font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#002045] leading-tight"
            >
              {t.title}
            </h2>
          </div>

          {/* Time badge on the right */}
          <div
            id="agenda-time-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8F9FA] border border-[#E2E8F0] text-[#64748B] font-mono text-xs font-semibold self-start md:self-auto"
          >
            <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>{t.timeBadge}</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-['Montserrat'] font-semibold transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#002045] text-white shadow-xs'
                  : 'bg-[#F8F9FA] text-[#64748B] hover:text-[#002045] border border-[#E2E8F0]'
              }`}
            >
              {t.allTab}
            </button>
            <button
              onClick={() => setActiveCategory('keynote')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-['Montserrat'] font-semibold transition-all ${
                activeCategory === 'keynote'
                  ? 'bg-[#002045] text-white shadow-xs'
                  : 'bg-[#F8F9FA] text-[#64748B] hover:text-[#002045] border border-[#E2E8F0]'
              }`}
            >
              {t.filterKeynotes}
            </button>
            <button
              onClick={() => setActiveCategory('panel')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-['Montserrat'] font-semibold transition-all ${
                activeCategory === 'panel'
                  ? 'bg-[#002045] text-white shadow-xs'
                  : 'bg-[#F8F9FA] text-[#64748B] hover:text-[#002045] border border-[#E2E8F0]'
              }`}
            >
              {t.filterPanels}
            </button>
            <button
              onClick={() => setActiveCategory('networking')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-['Montserrat'] font-semibold transition-all ${
                activeCategory === 'networking'
                  ? 'bg-[#002045] text-white shadow-xs'
                  : 'bg-[#F8F9FA] text-[#64748B] hover:text-[#002045] border border-[#E2E8F0]'
              }`}
            >
              {t.filterNetworking}
            </button>
          </div>

          {/* Search box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E2E8F0] rounded-lg text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#B8860B]"
            />
          </div>
        </div>

        {/* Sessions Stack */}
        <div className="space-y-4">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => {
              const title = language === 'vi' ? session.titleVi : session.title;
              const desc = language === 'vi' ? session.descriptionVi : session.description;
              const loc = language === 'vi' ? session.locationVi : session.location;
              const isAdded = addedSessions[session.id];

              return (
                <div
                  key={session.id}
                  id={`agenda-item-${session.id}`}
                  className="bg-white border border-[#E2E8F0] hover:border-[#C5A880] rounded-xl p-5 md:p-6 transition-all shadow-xs hover:shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-5"
                >
                  {/* Time & Duration on Left */}
                  <div className="shrink-0 md:w-44 flex md:flex-col items-baseline md:items-start justify-between md:justify-start gap-1">
                    <span className="font-mono font-bold text-base sm:text-lg text-[#002045]">
                      {session.time}
                    </span>
                    <span className="font-mono text-[11px] text-[#64748B] font-medium tracking-wide uppercase">
                      {session.duration}
                    </span>
                  </div>

                  {/* Center: Badges, Title, Description */}
                  <div className="grow">
                    {/* Category badges */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                      {session.badges.map((b, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${getBadgeStyle(
                            b.variant
                          )}`}
                        >
                          {b.text}
                        </span>
                      ))}
                    </div>

                    {/* Session Title */}
                    <h3 className="font-['Montserrat'] font-bold text-base sm:text-lg text-[#002045] mb-2 leading-snug">
                      {title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-3">
                      {desc}
                    </p>

                    {/* Location or Speaker Tag */}
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7B5800]">
                      <MapPin className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                      <span>{loc}</span>
                    </div>
                  </div>

                  {/* Right: Add to Schedule / Bookmark Action */}
                  <div className="shrink-0 self-end md:self-center">
                    <button
                      onClick={() => handleToggleCalendar(session.id)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isAdded
                          ? 'bg-[#FDF8EE] border-[#B8860B] text-[#7B5800]'
                          : 'border-[#E2E8F0] text-[#64748B] hover:text-[#002045] hover:border-[#CBD5E1]'
                      }`}
                      title={t.addToCalendar}
                    >
                      {isAdded ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B]" />
                          <span className="hidden sm:inline">Saved</span>
                        </>
                      ) : (
                        <>
                          <CalendarPlus className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{t.addToCalendar}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-[#94A3B8] text-sm">
              {t.noResults}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
