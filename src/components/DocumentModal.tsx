import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';
import { DocumentItem, Language } from '../types';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentItem | null;
  language: Language;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  document,
  language,
}) => {
  if (!isOpen || !document) return null;

  const [downloaded, setDownloaded] = useState(false);

  const title = language === 'vi' ? document.titleVi : document.title;
  const desc = language === 'vi' ? document.descriptionVi : document.description;
  const badge = language === 'vi' ? document.badgeVi : document.badge;

  const handleDownload = () => {
    setDownloaded(true);
    let sampleContent = '';

    if (document.id === 'doc-1') {
      sampleContent = `# GOVERNMENT OF THE SOCIALIST REPUBLIC OF VIETNAM
DECREE NO. 284/2026/ND-CP
Hanoi, August 2026

REGULATIONS ON VIRTUAL ASSET SERVICE PROVIDERS (VASPS),
DIGITAL ASSET CLASSIFICATION AND TRANSACTION MONITORING

CHAPTER I: GENERAL PROVISIONS
Article 1. Scope of Regulation
This Decree governs the legal status of Virtual Assets (VAs), conditions for the establishment, licensing, and operation of Virtual Asset Service Providers (VASPs), custodial mechanisms, anti-money laundering (AML/CFT) compliance, and tax obligations within the territory of Vietnam.

Article 2. Subjects of Application
1. Domestic and foreign organizations providing virtual asset exchange, brokerage, and custodial services in Vietnam.
2. Financial institutions, payment intermediaries, and banking establishments integrating virtual asset trading APIs.
3. Individual and corporate investors holding or transferring virtual assets.

Article 3. Definition of Virtual Assets (VAs)
1. A Virtual Asset is a digital representation of value that can be digitally traded, transferred, and used for payment or investment purposes.
2. Virtual Assets do not include statutory legal tender (VND) issued by the State Bank of Vietnam, securities, or electronic money pegged directly to 1:1 fiat bank reserves unless specifically designated by the State Securities Commission.

CHAPTER II: VASP LICENSING PREREQUISITES
Article 12. Statutory Capital Requirement
Any enterprise applying for a Type A (Exchange & Order Matching) VASP license must possess minimum paid-up charter capital of 50,000,000,000 VND (Fifty Billion Vietnamese Dong).

Article 15. Server and Technical Security
VASPs must maintain primary transaction matching and ledger backup servers physically located within the national territory of Vietnam, certified under ISO/IEC 27001 standards.

CHAPTER IV: STATUTORY SANCTIONS AND REMEDIES
Article 34. Penalties for Unlicensed Operation
Fines from 100,000,000 VND to 200,000,000 VND with mandatory business suspension and confiscation of all illicit gains.
`;
    } else if (document.id === 'doc-2') {
      sampleContent = `# EXECUTIVE SUMMARY: DECREE 284/2026/ND-CP
For Founders, Chief Compliance Officers & Executive Leadership

1. CRITICAL TRANSITION WINDOW
- Effective Date: September 1, 2026.
- Grandfathering Grace Period: 18 months for existing Web3 entities.
- Initial 90-day Registry: Mandatory submission of operational intent letters.

2. CORE THREE COMPLIANCE PILLARS
- Pillar 1: Charter Capital & Physical Server Infrastructure (Min 50B VND, ISO 27001).
- Pillar 2: FATF Travel Rule & eKYC Verification (Counterparty transaction originator & beneficiary disclosure).
- Pillar 3: Segregated Cold Wallet Custody (Min 95% client assets in audited multi-sig offline vaults).

3. TAX & REPORTING OBLIGATIONS
- Real-time suspicious transaction reporting (STR) to State Bank Anti-Money Laundering Dept.
- Withholding tax mechanisms for token swaps and fiat off-ramping.
`;
    } else {
      sampleContent = `# COMPLIANCE CHECKLIST: 85 CORE VASP AUDIT CRITERIA
Decree 284/2026/ND-CP Readiness Audit Tool

SECTION 1: CORPORATE & CAPITALIZATION (Criteria 1-15)
[ ] 1.1 Minimum paid-up charter capital >= 50B VND verified by licensed auditor.
[ ] 1.2 Clear beneficial ownership hierarchy (no undisclosed foreign shell entities).
[ ] 1.3 Chief Executive Officer has clean legal record and >= 5 years FinTech experience.

SECTION 2: INFRASTRUCTURE & CRYPTOGRAPHIC CUSTODY (Criteria 16-45)
[ ] 2.1 Primary database server hosting within Tier 3+ Data Center in Vietnam.
[ ] 2.2 Cold wallet threshold maintains >= 95% user digital assets at all times.
[ ] 2.3 Multi-signature scheme requires minimum 3-of-5 geographically distributed keys.
[ ] 2.4 Annual smart contract penetration testing & vulnerability audits.

SECTION 3: AML/CFT & TRAVEL RULE (Criteria 46-70)
[ ] 3.1 Automated eKYC biometrics check against National Citizen Database.
[ ] 3.2 FATF Travel Rule protocol messaging integrated for transfers exceeding $1,000 USD.
[ ] 3.3 Sanction screening engine updating OFAC, UN, and Ministry of Public Security blacklists.

SECTION 4: INVESTOR SAFEGUARDS & DISCLOSURE (Criteria 71-85)
[ ] 4.1 Transparent token listing assessment criteria and risk rating scorecards.
[ ] 4.2 Segregated reserve compensation fund for technical slippage or system outages.
`;
    }

    const blob = new Blob([sampleContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${document.id}-${document.fileFormat.toLowerCase().replace('/', '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E2E8F0] relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#E2E8F0] flex items-start justify-between gap-4 bg-[#F8F9FA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDF8EE] border border-[#E2CFAD] flex items-center justify-center text-[#B8860B] shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded bg-white border border-[#E2E8F0] text-[#7B5800] font-mono text-[10px] font-bold uppercase tracking-wider">
                {badge}
              </span>
              <h3 className="font-['Montserrat'] font-bold text-base sm:text-lg text-[#002045] mt-1">
                {title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#64748B] hover:text-[#002045] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Document Preview Area */}
        <div className="p-6 overflow-y-auto grow bg-white text-xs sm:text-sm text-[#334155] leading-relaxed font-mono space-y-4">
          <div className="bg-[#F8F9FA] p-4 rounded-xl border border-[#E2E8F0] space-y-3">
            <div className="flex items-center justify-between text-[11px] text-[#64748B] border-b border-[#E2E8F0] pb-2">
              <span>FORMAT: {document.fileFormat}</span>
              <span>SIZE: {document.fileSize}</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED GAZETTE
              </span>
            </div>
            <p className="text-xs text-[#475569] font-sans italic">{desc}</p>
          </div>

          <div className="border border-[#E2E8F0] rounded-xl p-5 bg-white space-y-3 text-xs leading-relaxed text-[#1E293B]">
            <p className="font-bold text-[#002045] font-['Montserrat'] text-sm">
              {language === 'vi' ? 'TRÍCH YẾU NỘI DUNG VĂN KIỆN' : 'EXECUTIVE CONTENT EXTRACT'}
            </p>
            <p>
              {language === 'vi'
                ? 'Nghị định 284/2026/NĐ-CP gồm 8 Chương, 52 Điều quy định chi tiết phân loại Tài sản số (Virtual Assets), điều kiện cấp giấy phép hoạt động cho các Tổ chức cung cấp dịch vụ tài sản ảo (VASP), chế độ an toàn thông tin, bảo vệ khách hàng, báo cáo phòng chống rửa tiền và biểu khung xử phạt hành chính.'
                : 'Decree 284/2026/ND-CP encompasses 8 Chapters and 52 Articles specifying statutory criteria for Virtual Asset Service Providers (VASPs), licensing dossiers, information security standards, AML/CFT reporting mechanisms, and Chapter IV administrative monetary penalty tables.'}
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#475569]">
              <li>
                <strong>Article 12:</strong> Minimum paid-up charter capital 50,000,000,000 VND.
              </li>
              <li>
                <strong>Article 15:</strong> Mandatory physical database and matching engines inside Vietnam.
              </li>
              <li>
                <strong>Article 34:</strong> Administrative fines up to 200,000,000 VND for unauthorized operations.
              </li>
              <li>
                <strong>Article 36:</strong> Stringent compliance with FATF Travel Rule and customer identification.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-6 border-t border-[#E2E8F0] bg-[#F8F9FA] flex items-center justify-between gap-3">
          <span className="text-[11px] text-[#64748B]">
            {downloaded
              ? (language === 'vi' ? '✓ Đã tải tài liệu về máy' : '✓ Document downloaded successfully')
              : (language === 'vi' ? 'Tài liệu phân phối chính thức cho đại biểu' : 'Official delegate distribution material')}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-[#CBD5E1] text-[#475569] hover:text-[#002045] rounded-full text-xs font-['Montserrat'] font-bold uppercase transition-colors"
            >
              {language === 'vi' ? 'Đóng' : 'Close'}
            </button>
            <button
              onClick={handleDownload}
              className="px-5 py-2 bg-[#B8860B] hover:bg-[#996F08] text-white rounded-full text-xs font-['Montserrat'] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Tải tệp ngay' : 'Download File'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
