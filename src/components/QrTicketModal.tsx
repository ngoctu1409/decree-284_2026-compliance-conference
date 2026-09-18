import React from 'react';
import { X, CheckCircle, Download, Printer, ShieldCheck, Scale, QrCode } from 'lucide-react';
import { RegistrationData, Language } from '../types';

interface QrTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: RegistrationData | null;
  language: Language;
}

export const QrTicketModal: React.FC<QrTicketModalProps> = ({
  isOpen,
  onClose,
  data,
  language,
}) => {
  if (!isOpen || !data) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPass = () => {
    // Generates a mock printable text badge file
    const content = `=====================================================
DECREE 284/2026 COMPLIANCE CONFERENCE
OFFICIAL ACCREDITATION DELEGATE PASS
=====================================================
Delegate: ${data.fullName}
Organization: ${data.organization}
Registration ID: ${data.registrationId || 'VASP-884920'}
Seat Assignment: ${data.seatNumber || 'VIP-A12'}
Attendance Mode: ${data.attendanceMode}
Sector: ${data.sector}
Issuance: 29/08/2026 • 09:00 AM ICT
Venue: Hanoi Convention Center / Global Virtual Stream
Verification Hash: 0x7f9a882c91b40d3ef51296c0b9a14
=====================================================
Keep this pass confidential. Present QR code at check-in desk.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Pass-${data.registrationId || 'VASP-2026'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E2CFAD] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#64748B] hover:text-[#002045] transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Pass Header */}
        <div className="bg-[#002045] text-white p-6 relative overflow-hidden text-center border-b-2 border-[#B8860B]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#B8860B] text-[10px] font-mono font-bold tracking-wider uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>
              {language === 'vi' ? 'THẺ ĐẠI BIỂU XÁC THỰC BLOCKCHAIN' : 'BLOCKCHAIN-VERIFIED ACCREDITED PASS'}
            </span>
          </div>
          <h3 className="font-['Montserrat'] font-bold text-lg sm:text-xl text-white">
            {language === 'vi' ? 'Hội nghị Triển khai Nghị định 284/2026' : 'Decree 284/2026 Compliance Conference'}
          </h3>
          <p className="font-mono text-xs text-[#E2CFAD] mt-1">
            29/08/2026 • 09:00 - 17:00 ICT
          </p>
        </div>

        {/* Pass Body */}
        <div className="p-6 sm:p-8 flex flex-col items-center text-center">
          {/* QR Code graphic container */}
          <div className="p-4 bg-white border-2 border-[#E2CFAD] rounded-2xl shadow-sm mb-5 relative group">
            {/* Simulated high-fidelity QR Code representation */}
            <div className="w-40 h-40 bg-[#FDF8EE] rounded-xl flex flex-col items-center justify-center p-2 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#002045]">
                {/* 3 Position marks */}
                <rect x="5" y="5" width="26" height="26" fill="#002045" rx="3" />
                <rect x="9" y="9" width="18" height="18" fill="#FDF8EE" rx="2" />
                <rect x="13" y="13" width="10" height="10" fill="#B8860B" />

                <rect x="69" y="5" width="26" height="26" fill="#002045" rx="3" />
                <rect x="73" y="9" width="18" height="18" fill="#FDF8EE" rx="2" />
                <rect x="77" y="13" width="10" height="10" fill="#B8860B" />

                <rect x="5" y="69" width="26" height="26" fill="#002045" rx="3" />
                <rect x="9" y="73" width="18" height="18" fill="#FDF8EE" rx="2" />
                <rect x="13" y="77" width="10" height="10" fill="#B8860B" />

                {/* Random pseudo QR data pattern */}
                <rect x="36" y="8" width="6" height="6" fill="#002045" />
                <rect x="46" y="8" width="6" height="12" fill="#002045" />
                <rect x="56" y="8" width="6" height="6" fill="#002045" />
                <rect x="36" y="20" width="12" height="6" fill="#002045" />
                <rect x="8" y="36" width="12" height="6" fill="#002045" />
                <rect x="24" y="36" width="6" height="12" fill="#002045" />
                <rect x="36" y="36" width="28" height="28" fill="#002045" rx="4" />
                <rect x="42" y="42" width="16" height="16" fill="#FDF8EE" />
                <rect x="46" y="46" width="8" height="8" fill="#B8860B" />
                <rect x="68" y="36" width="6" height="6" fill="#002045" />
                <rect x="78" y="36" width="14" height="6" fill="#002045" />
                <rect x="86" y="46" width="6" height="14" fill="#002045" />
                <rect x="8" y="48" width="6" height="14" fill="#002045" />
                <rect x="18" y="54" width="12" height="6" fill="#002045" />
                <rect x="36" y="68" width="6" height="24" fill="#002045" />
                <rect x="46" y="68" width="12" height="6" fill="#002045" />
                <rect x="62" y="68" width="6" height="12" fill="#002045" />
                <rect x="72" y="74" width="20" height="6" fill="#002045" />
                <rect x="82" y="84" width="10" height="10" fill="#002045" />
                <rect x="46" y="82" width="10" height="10" fill="#002045" />
              </svg>
            </div>
            <div className="font-mono text-[10px] text-[#B8860B] font-bold tracking-wider mt-1.5">
              PASS ID: {data.registrationId}
            </div>
          </div>

          {/* Delegate Info */}
          <h4 className="font-['Montserrat'] font-bold text-lg text-[#002045] mb-1">
            {data.fullName}
          </h4>
          <p className="text-xs font-semibold text-[#7B5800] mb-3">
            {data.organization}
          </p>

          <div className="w-full bg-[#F8F9FA] rounded-xl p-3.5 border border-[#E2E8F0] grid grid-cols-2 gap-2 text-left mb-5 text-xs">
            <div>
              <span className="text-[10px] font-mono text-[#94A3B8] block uppercase">
                {language === 'vi' ? 'HÌNH THỨC' : 'ATTENDANCE'}
              </span>
              <span className="font-semibold text-[#002045] text-xs line-clamp-1">
                {data.attendanceMode}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#94A3B8] block uppercase">
                {language === 'vi' ? 'SỐ GHẾ / MÃ' : 'SEAT ASSIGNMENT'}
              </span>
              <span className="font-mono font-bold text-[#B8860B] text-xs">
                {data.seatNumber}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#94A3B8] block uppercase">
                {language === 'vi' ? 'ĐỐI TƯỢNG' : 'SECTOR'}
              </span>
              <span className="font-medium text-[#334155] text-xs line-clamp-1">
                {data.sector}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#94A3B8] block uppercase">
                {language === 'vi' ? 'TRẠNG THÁI' : 'STATUS'}
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                {language === 'vi' ? 'Đã cấp thẻ' : 'Accredited'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={handleDownloadPass}
              className="flex-1 py-2.5 px-4 bg-[#B8860B] hover:bg-[#996F08] text-white rounded-full font-['Montserrat'] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Tải thẻ thông hành' : 'Download Pass'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="py-2.5 px-4 border border-[#CBD5E1] hover:border-[#002045] text-[#334155] rounded-full font-['Montserrat'] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'In thẻ' : 'Print'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
