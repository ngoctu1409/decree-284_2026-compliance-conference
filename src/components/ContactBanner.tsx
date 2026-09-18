import React from 'react';
import { MapPin, Landmark, PhoneCall, Mail } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ContactBannerProps {
  language: Language;
}

export const ContactBanner: React.FC<ContactBannerProps> = ({ language }) => {
  const t = TRANSLATIONS[language].contact;

  return (
    <section id="contact" className="py-12 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Reception Venues */}
          <div className="bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-5 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-[#FDF8EE] border border-[#E2CFAD] flex items-center justify-center text-[#B8860B] shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-['Montserrat'] font-bold text-xs text-[#002045] uppercase tracking-wider mb-1">
                {t.venuesTitle}
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {t.venuesDesc}
              </p>
            </div>
          </div>

          {/* Card 2: Standing Secretariat */}
          <div className="bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-5 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-[#FDF8EE] border border-[#E2CFAD] flex items-center justify-center text-[#B8860B] shrink-0 mt-0.5">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-['Montserrat'] font-bold text-xs text-[#002045] uppercase tracking-wider mb-1">
                {t.secretariatTitle}
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {t.secretariatDesc}
              </p>
            </div>
          </div>

          {/* Card 3: Official Hotline */}
          <div className="bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-5 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-[#FDF8EE] border border-[#E2CFAD] flex items-center justify-center text-[#B8860B] shrink-0 mt-0.5">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-['Montserrat'] font-bold text-xs text-[#002045] uppercase tracking-wider mb-1">
                {t.hotlineTitle}
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {t.hotlineDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
