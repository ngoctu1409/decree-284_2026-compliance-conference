import React, { useState, useEffect } from 'react';
import { Scale, Shield, Globe } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onOpenRegistration: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  onOpenRegistration,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const t = TRANSLATIONS[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'overview', 'speakers', 'agenda', 'penalties', 'handbook', 'registration', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E2E8F0]'
          : 'bg-white border-b border-[#E2E8F0]'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        {/* Brand / Emblem Logo */}
        <div
          id="nav-logo"
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-[#002045] border-2 border-[#B8860B] flex items-center justify-center text-[#B8860B] shadow-xs group-hover:scale-105 transition-transform">
            <Scale className="w-5 h-5 text-[#B8860B]" />
          </div>
          <div className="flex flex-col">
            <span className="font-['Montserrat'] font-bold text-xs sm:text-sm tracking-tight text-[#002045] leading-tight group-hover:text-[#B8860B] transition-colors">
              {t.brandTop}
            </span>
            <span className="font-mono text-[10px] tracking-wider text-[#B8860B] font-semibold">
              {t.brandSub}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <button
            id="nav-link-home"
            onClick={() => scrollToSection('home')}
            className={`font-['Montserrat'] text-xs font-semibold tracking-wider transition-colors hover:text-[#B8860B] ${
              activeSection === 'home' ? 'text-[#002045] font-bold' : 'text-[#64748B]'
            }`}
          >
            {t.home}
          </button>
          <button
            id="nav-link-overview"
            onClick={() => scrollToSection('overview')}
            className={`font-['Montserrat'] text-xs font-semibold tracking-wider transition-colors hover:text-[#B8860B] ${
              activeSection === 'overview' ? 'text-[#002045] font-bold' : 'text-[#64748B]'
            }`}
          >
            {t.overview}
          </button>
          <button
            id="nav-link-speakers"
            onClick={() => scrollToSection('speakers')}
            className={`font-['Montserrat'] text-xs font-semibold tracking-wider transition-colors hover:text-[#B8860B] ${
              activeSection === 'speakers' ? 'text-[#002045] font-bold' : 'text-[#64748B]'
            }`}
          >
            {t.speakers}
          </button>
          <button
            id="nav-link-agenda"
            onClick={() => scrollToSection('agenda')}
            className={`font-['Montserrat'] text-xs font-semibold tracking-wider transition-colors hover:text-[#B8860B] ${
              activeSection === 'agenda' ? 'text-[#002045] font-bold' : 'text-[#64748B]'
            }`}
          >
            {t.agenda}
          </button>
          <button
            id="nav-link-penalties"
            onClick={() => scrollToSection('penalties')}
            className={`font-['Montserrat'] text-xs font-semibold tracking-wider transition-colors hover:text-[#B8860B] ${
              activeSection === 'penalties' ? 'text-[#002045] font-bold' : 'text-[#64748B]'
            }`}
          >
            {t.penalties}
          </button>
          <button
            id="nav-link-registration"
            onClick={() => scrollToSection('registration')}
            className={`font-['Montserrat'] text-xs font-semibold tracking-wider transition-colors hover:text-[#B8860B] ${
              activeSection === 'registration' ? 'text-[#002045] font-bold' : 'text-[#64748B]'
            }`}
          >
            {t.registration}
          </button>
          <button
            id="nav-link-contact"
            onClick={() => scrollToSection('contact')}
            className={`font-['Montserrat'] text-xs font-semibold tracking-wider transition-colors hover:text-[#B8860B] ${
              activeSection === 'contact' ? 'text-[#002045] font-bold' : 'text-[#64748B]'
            }`}
          >
            {t.contact}
          </button>
        </nav>

        {/* Right Action Area: Language Switcher & Register Button */}
        <div className="flex items-center gap-3">
          {/* Language Switcher Pill */}
          <div
            id="language-switcher"
            className="flex items-center bg-[#F1F5F9] p-1 rounded-full border border-[#E2E8F0]"
          >
            <button
              id="lang-btn-vi"
              onClick={() => onToggleLanguage('vi')}
              className={`px-2.5 py-1 text-xs font-['Montserrat'] font-bold rounded-full transition-all ${
                language === 'vi'
                  ? 'bg-[#002045] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              VI
            </button>
            <button
              id="lang-btn-en"
              onClick={() => onToggleLanguage('en')}
              className={`px-2.5 py-1 text-xs font-['Montserrat'] font-bold rounded-full transition-all ${
                language === 'en'
                  ? 'bg-[#002045] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              EN
            </button>
          </div>

          {/* Primary CTA Button */}
          <button
            id="nav-register-btn"
            onClick={onOpenRegistration}
            className="px-5 py-2.5 bg-[#B8860B] hover:bg-[#996F08] active:scale-95 text-white font-['Montserrat'] font-bold text-xs uppercase tracking-wider rounded-full shadow-sm hover:shadow transition-all"
          >
            {t.registerBtn}
          </button>
        </div>
      </div>
    </header>
  );
};
