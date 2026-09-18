/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, RegistrationData, DocumentItem, Speaker } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RegulatorySignificance } from './components/RegulatorySignificance';
import { AgendaSection } from './components/AgendaSection';
import { SpeakersSection } from './components/SpeakersSection';
import { PenaltyMatrixSection } from './components/PenaltyMatrixSection';
import { DocumentsSection } from './components/DocumentsSection';
import { RegistrationSection } from './components/RegistrationSection';
import { FaqSection } from './components/FaqSection';
import { ContactBanner } from './components/ContactBanner';
import { Footer } from './components/Footer';
import { QrTicketModal } from './components/QrTicketModal';
import { DocumentModal } from './components/DocumentModal';
import { SpeakerModal } from './components/SpeakerModal';
import { PolicyModal } from './components/PolicyModal';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');

  // Modal states
  const [registeredData, setRegisteredData] = useState<RegistrationData | null>(null);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);

  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isSpeakerModalOpen, setIsSpeakerModalOpen] = useState(false);

  const [policyType, setPolicyType] = useState<'regulations' | 'privacy' | 'advisory' | null>(null);

  const handleToggleLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const handleOpenRegistration = () => {
    const el = document.getElementById('registration');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegistrationComplete = (data: RegistrationData) => {
    setRegisteredData(data);
    setIsPassModalOpen(true);
  };

  const handleOpenDocument = (doc: DocumentItem) => {
    setSelectedDoc(doc);
    setIsDocModalOpen(true);
  };

  const handleSelectSpeaker = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setIsSpeakerModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] flex flex-col font-['Inter'] selection:bg-[#B8860B]/20 selection:text-[#002045]">
      {/* Top Sticky Header */}
      <Navbar
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onOpenRegistration={handleOpenRegistration}
      />

      {/* Main Summit Portal Content */}
      <main className="grow">
        {/* Hero Section */}
        <Hero
          language={language}
          onRegisterClick={handleOpenRegistration}
        />

        {/* Regulatory Context & Vital Significance + Donut Chart + Metrics */}
        <RegulatorySignificance language={language} />

        {/* Thematic Conference Program (Agenda) */}
        <AgendaSection language={language} />

        {/* Specialized Advisory Board & Keynote Speakers */}
        <SpeakersSection
          language={language}
          onSelectSpeaker={handleSelectSpeaker}
        />

        {/* Chapter IV Statutory Remedies: Administrative Penalty Matrix */}
        <PenaltyMatrixSection language={language} />

        {/* Official Gazette Repository & Practitioner Guides (Handbook & Library) */}
        <DocumentsSection
          language={language}
          onOpenDocument={handleOpenDocument}
        />

        {/* Delegate Accreditation Portal (Registration Form) */}
        <RegistrationSection
          language={language}
          onRegistered={handleRegistrationComplete}
        />

        {/* Frequently Asked Questions (FAQ) */}
        <FaqSection language={language} />

        {/* Reception Venues & Standing Secretariat Contact Information */}
        <ContactBanner language={language} />
      </main>

      {/* Institutional Footer */}
      <Footer
        language={language}
        onOpenRegulations={() => setPolicyType('regulations')}
        onOpenPrivacy={() => setPolicyType('privacy')}
        onOpenAdvisory={() => setPolicyType('advisory')}
      />

      {/* Pop-up Modals */}
      <QrTicketModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        data={registeredData}
        language={language}
      />

      <DocumentModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        document={selectedDoc}
        language={language}
      />

      <SpeakerModal
        isOpen={isSpeakerModalOpen}
        onClose={() => setIsSpeakerModalOpen(false)}
        speaker={selectedSpeaker}
        language={language}
      />

      <PolicyModal
        isOpen={policyType !== null}
        onClose={() => setPolicyType(null)}
        type={policyType}
        language={language}
      />
    </div>
  );
}
