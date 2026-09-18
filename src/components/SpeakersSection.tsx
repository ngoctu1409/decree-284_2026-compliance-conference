import React from 'react';
import { Award, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Language, Speaker } from '../types';
import { SPEAKERS } from '../data/conferenceData';
import { TRANSLATIONS } from '../data/translations';

interface SpeakersSectionProps {
  language: Language;
  onSelectSpeaker: (speaker: Speaker) => void;
}

export const SpeakersSection: React.FC<SpeakersSectionProps> = ({
  language,
  onSelectSpeaker,
}) => {
  const t = TRANSLATIONS[language].speakers;

  return (
    <section id="speakers" className="py-16 md:py-24 bg-[#F8F9FA] border-b border-[#E2E8F0]">
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
            id="speakers-title"
            className="font-['Montserrat'] font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#002045] leading-tight"
          >
            {t.title}
          </h2>
        </div>

        {/* 3 Speaker Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SPEAKERS.map((speaker) => {
            const role = language === 'vi' ? speaker.roleVi : speaker.role;
            const bio = language === 'vi' ? speaker.bioVi : speaker.bio;
            const topic = language === 'vi' ? speaker.keynoteTopicVi : speaker.keynoteTopic;
            const badge = language === 'vi' ? speaker.badgeVi : speaker.badge;

            return (
              <div
                key={speaker.id}
                id={`speaker-card-${speaker.id}`}
                onClick={() => onSelectSpeaker(speaker)}
                className="bg-white border border-[#E2E8F0] hover:border-[#C5A880] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Top Area: Avatar & Badge */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="relative">
                      <img
                        src={speaker.avatarUrl}
                        alt={speaker.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover border-2 border-[#B8860B]/40 group-hover:border-[#B8860B] transition-colors shadow-xs"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#B8860B] text-white rounded-full flex items-center justify-center shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded bg-[#FDF8EE] border border-[#E2CFAD] text-[#7B5800] text-[10px] font-mono font-bold tracking-wider uppercase">
                      {badge}
                    </span>
                  </div>

                  {/* Speaker Name */}
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-['Montserrat'] font-bold text-base sm:text-lg text-[#002045] group-hover:text-[#B8860B] transition-colors leading-snug">
                      {speaker.name}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>

                  {/* Role */}
                  <p className="text-xs font-semibold text-[#7B5800] mb-4 leading-normal">
                    {role}
                  </p>

                  {/* Bio */}
                  <p className="text-xs text-[#64748B] leading-relaxed mb-6 line-clamp-4">
                    {bio}
                  </p>
                </div>

                {/* Footer Topic Tag */}
                <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                  <span className="text-[11px] text-[#94A3B8] font-medium">
                    {t.keynoteTopicLabel}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FDF8EE] text-[#7B5800] border border-[#E2CFAD] text-xs font-semibold">
                    {topic}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
