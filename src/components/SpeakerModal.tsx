import React from 'react';
import { X, CheckCircle2, Award, BookOpen, Building2 } from 'lucide-react';
import { Speaker, Language } from '../types';

interface SpeakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  speaker: Speaker | null;
  language: Language;
}

export const SpeakerModal: React.FC<SpeakerModalProps> = ({
  isOpen,
  onClose,
  speaker,
  language,
}) => {
  if (!isOpen || !speaker) return null;

  const role = language === 'vi' ? speaker.roleVi : speaker.role;
  const bio = language === 'vi' ? speaker.bioVi : speaker.bio;
  const topic = language === 'vi' ? speaker.keynoteTopicVi : speaker.keynoteTopic;
  const badge = language === 'vi' ? speaker.badgeVi : speaker.badge;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E2E8F0] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#64748B] hover:text-[#002045] transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header */}
        <div className="p-6 bg-[#002045] text-white flex items-center gap-4">
          <div className="relative">
            <img
              src={speaker.avatarUrl}
              alt={speaker.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-xl object-cover border-2 border-[#B8860B] shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#B8860B] text-white rounded-full flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded bg-[#FDF8EE] text-[#7B5800] text-[10px] font-mono font-bold tracking-wider uppercase inline-block mb-1">
              {badge}
            </span>
            <h3 className="font-['Montserrat'] font-bold text-lg text-white">
              {speaker.name}
            </h3>
            <p className="text-xs text-[#E2CFAD] font-medium">{role}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs sm:text-sm text-[#475569] leading-relaxed">
          <div>
            <span className="font-mono text-[11px] font-bold text-[#002045] uppercase tracking-wider block mb-1">
              {language === 'vi' ? 'LÝ LỊCH CHUYÊN GIA' : 'PROFESSIONAL BIOGRAPHY'}
            </span>
            <p className="text-[#334155]">{bio}</p>
          </div>

          <div className="bg-[#F8F9FA] rounded-xl p-4 border border-[#E2E8F0] space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#002045]">
              <Building2 className="w-4 h-4 text-[#B8860B]" />
              <span>{speaker.organization}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#002045]">
              <BookOpen className="w-4 h-4 text-[#B8860B]" />
              <span>
                {language === 'vi' ? 'Chủ đề tham luận: ' : 'Keynote Topic: '}
                <span className="text-[#7B5800]">{topic}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E2E8F0] bg-[#F8F9FA] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#002045] hover:bg-[#1A365D] text-white rounded-full text-xs font-['Montserrat'] font-bold uppercase transition-colors"
          >
            {language === 'vi' ? 'Đóng' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
