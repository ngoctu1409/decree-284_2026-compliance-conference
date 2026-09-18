import React, { useState } from 'react';
import { QrCode, CheckCircle2, ShieldCheck, Ticket } from 'lucide-react';
import { Language, RegistrationData } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface RegistrationSectionProps {
  language: Language;
  onRegistered: (data: RegistrationData) => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  language,
  onRegistered,
}) => {
  const t = TRANSLATIONS[language].registration;

  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    organization: '',
    workEmail: '',
    phone: '',
    attendanceMode: t.attendanceOffline,
    sector: t.sector1,
    advanceQuestion: '',
    confirmed: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = language === 'vi' ? 'Vui lòng nhập họ và tên' : 'Full name is required';
    if (!formData.organization.trim()) errs.organization = language === 'vi' ? 'Vui lòng nhập tên cơ quan/doanh nghiệp' : 'Organization is required';
    if (!formData.workEmail.trim() || !formData.workEmail.includes('@')) {
      errs.workEmail = language === 'vi' ? 'Email không hợp lệ' : 'Valid work email is required';
    }
    if (!formData.phone.trim()) errs.phone = language === 'vi' ? 'Vui lòng nhập số điện thoại' : 'Phone number is required';
    if (!formData.confirmed) {
      errs.confirmed = language === 'vi' ? 'Vui lòng xác nhận thông tin' : 'Please accept the declaration';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const regId = 'VASP-' + Math.floor(100000 + Math.random() * 900000);
      const seat = formData.attendanceMode.includes('Offline')
        ? 'VIP-A' + Math.floor(10 + Math.random() * 89)
        : 'VIRTUAL-' + Math.floor(100 + Math.random() * 899);

      onRegistered({
        ...formData,
        registrationId: regId,
        seatNumber: seat,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }, 400);
  };

  return (
    <section id="registration" className="py-16 md:py-24 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Accreditation Card Frame */}
        <div className="bg-[#F8F9FA]/60 border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
          {/* Subtle gold watermark emblem */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#B8860B]/5 rounded-full blur-2xl pointer-events-none" />

          {/* Form Header */}
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <span className="font-['Montserrat'] font-bold text-xs tracking-wider text-[#7B5800] uppercase block mb-2">
              {t.portal}
            </span>
            <h2
              id="registration-title"
              className="font-['Montserrat'] font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#002045] leading-tight mb-3"
            >
              {t.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  {t.fullNameLabel}
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder={t.fullNamePlaceholder}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border ${
                    errors.fullName ? 'border-red-500' : 'border-[#E2E8F0]'
                  } rounded-lg text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#B8860B] transition-colors`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Organization */}
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  {t.orgLabel}
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder={t.orgPlaceholder}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border ${
                    errors.organization ? 'border-red-500' : 'border-[#E2E8F0]'
                  } rounded-lg text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#B8860B] transition-colors`}
                />
                {errors.organization && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.organization}</p>
                )}
              </div>

              {/* Work Email */}
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  placeholder={t.emailPlaceholder}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border ${
                    errors.workEmail ? 'border-red-500' : 'border-[#E2E8F0]'
                  } rounded-lg text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#B8860B] transition-colors`}
                />
                {errors.workEmail && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.workEmail}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  {t.phoneLabel}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t.phonePlaceholder}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border ${
                    errors.phone ? 'border-red-500' : 'border-[#E2E8F0]'
                  } rounded-lg text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#B8860B] transition-colors`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Attendance Mode */}
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  {t.attendanceLabel}
                </label>
                <select
                  value={formData.attendanceMode}
                  onChange={(e) => setFormData({ ...formData, attendanceMode: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#B8860B] transition-colors"
                >
                  <option value={t.attendanceOffline}>{t.attendanceOffline}</option>
                  <option value={t.attendanceOnline}>{t.attendanceOnline}</option>
                </select>
              </div>

              {/* Sector / Seniority Level */}
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  {t.sectorLabel}
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#B8860B] transition-colors"
                >
                  <option value={t.sector1}>{t.sector1}</option>
                  <option value={t.sector2}>{t.sector2}</option>
                  <option value={t.sector3}>{t.sector3}</option>
                  <option value={t.sector4}>{t.sector4}</option>
                  <option value={t.sector5}>{t.sector5}</option>
                </select>
              </div>
            </div>

            {/* Advance Question */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#334155]">
                  {t.questionLabel}
                </label>
                <span className="text-[11px] text-[#94A3B8]">Optional</span>
              </div>
              <textarea
                rows={3}
                value={formData.advanceQuestion}
                onChange={(e) => setFormData({ ...formData, advanceQuestion: e.target.value })}
                placeholder={t.questionPlaceholder}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#B8860B] transition-colors"
              />
            </div>

            {/* Agreement Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.confirmed}
                  onChange={(e) => setFormData({ ...formData, confirmed: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded text-[#B8860B] border-[#CBD5E1] focus:ring-[#B8860B]"
                />
                <span className="text-xs text-[#64748B] leading-relaxed">
                  {t.agreeTerms}
                </span>
              </label>
              {errors.confirmed && (
                <p className="text-[11px] text-red-500 mt-1">{errors.confirmed}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                id="registration-submit-btn"
                className="w-full py-4 px-6 bg-[#B8860B] hover:bg-[#996F08] active:scale-[0.99] text-white font-['Montserrat'] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                <Ticket className="w-4 h-4" />
                <span>
                  {isSubmitting
                    ? language === 'vi'
                      ? 'Đang xử lý cấp thẻ...'
                      : 'Generating Pass...'
                    : t.submitBtn}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
