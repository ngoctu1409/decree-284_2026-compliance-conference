import React from 'react';
import { X, ShieldCheck, Scale, Users } from 'lucide-react';
import { Language } from '../types';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'regulations' | 'privacy' | 'advisory' | null;
  language: Language;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  onClose,
  type,
  language,
}) => {
  if (!isOpen || !type) return null;

  const getContent = () => {
    switch (type) {
      case 'regulations':
        return {
          title: language === 'vi' ? 'Quy chế Tham dự Hội nghị' : 'Conference Participation Regulations',
          icon: <Scale className="w-5 h-5 text-[#B8860B]" />,
          body: language === 'vi' ? (
            <div className="space-y-3">
              <p>1. <strong>Tư cách đại biểu:</strong> Thẻ tham dự được cấp đúng danh tính, không chuyển nhượng sau khi hoàn tất thủ tục check-in.</p>
              <p>2. <strong>Bảo mật thông tin:</strong> Các phiên toạ đàm bàn tròn kín (Chatham House Rules) nghiêm cấm ghi âm, phát sóng trực tiếp khi chưa có sự chấp thuận của Ban tổ chức.</p>
              <p>3. <strong>Chứng nhận CPE:</strong> Đại biểu cần có mặt tối thiểu 80% thời lượng các phiên chuyên đề để đủ điều kiện cấp chứng chỉ số.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p>1. <strong>Accreditation:</strong> Conference passes are issued on an individual basis and non-transferable post check-in.</p>
              <p>2. <strong>Confidentiality:</strong> Closed-door roundtables follow the Chatham House Rule; unauthorized recording or re-broadcasting is prohibited.</p>
              <p>3. <strong>CPE Certification:</strong> Delegates must attend at least 80% of official sessions to receive verifiable CPE credentials.</p>
            </div>
          ),
        };
      case 'privacy':
        return {
          title: language === 'vi' ? 'Chính sách Bảo mật Dữ liệu' : 'Data Privacy & Protection Policy',
          icon: <ShieldCheck className="w-5 h-5 text-[#B8860B]" />,
          body: language === 'vi' ? (
            <div className="space-y-3">
              <p>1. <strong>Bảo vệ dữ liệu cá nhân:</strong> Dữ liệu đăng ký được mã hoá và lưu trữ tuân thủ Nghị định 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân.</p>
              <p>2. <strong>Mục đích sử dụng:</strong> Thông tin đại biểu chỉ phục vụ công tác đối soát an ninh hội nghị và gửi tài liệu văn kiện chính thống.</p>
              <p>3. <strong>Cam kết:</strong> Không chia sẻ hoặc thương mại hoá dữ liệu người tham dự cho bất kỳ bên thứ ba nào ngoài ban thư ký.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p>1. <strong>Personal Data Protection:</strong> All registration information is encrypted and managed in accordance with Vietnam Personal Data Protection regulations (Decree 13/2023/ND-CP).</p>
              <p>2. <strong>Authorized Usage:</strong> Delegate records are strictly utilized for summit accreditation, security clearance, and official document dispatch.</p>
              <p>3. <strong>Commitment:</strong> Information will never be monetized or transferred to third-party commercial entities.</p>
            </div>
          ),
        };
      case 'advisory':
        return {
          title: language === 'vi' ? 'Hội đồng Cố vấn & Thường trực' : 'Advisory Council & Joint Taskforce',
          icon: <Users className="w-5 h-5 text-[#B8860B]" />,
          body: language === 'vi' ? (
            <div className="space-y-3">
              <p>Hội đồng Cố vấn Chuyên gia bao gồm đại diện Vụ Pháp chế, Ban chỉ đạo Phòng chống Rửa tiền Quốc gia, Hiệp hội Blockchain Việt Nam và các chuyên gia tài chính quốc tế.</p>
              <p>Hội đồng chịu trách nhiệm thẩm tra nội dung tham luận, phản biện chính sách và giải đáp trực tiếp các vướng mắc về thủ tục pháp lý cho doanh nghiệp.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p>The Specialized Advisory Board convenes senior representatives from the Ministry of Justice Drafting Committee, National AML/CFT Taskforce, and leading international financial technology jurists.</p>
              <p>The Council is tasked with reviewing presentation materials, policy critiques, and presiding over the live Q&A town-hall sessions.</p>
            </div>
          ),
        };
    }
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E2E8F0] relative">
        <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8F9FA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FDF8EE] border border-[#E2CFAD] flex items-center justify-center">
              {content.icon}
            </div>
            <h3 className="font-['Montserrat'] font-bold text-sm sm:text-base text-[#002045]">
              {content.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#64748B] hover:text-[#002045]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 text-xs sm:text-sm text-[#334155] leading-relaxed">
          {content.body}
        </div>

        <div className="p-4 border-t border-[#E2E8F0] bg-[#F8F9FA] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#002045] hover:bg-[#1A365D] text-white rounded-full text-xs font-['Montserrat'] font-bold uppercase transition-colors"
          >
            {language === 'vi' ? 'Đã hiểu' : 'Understood'}
          </button>
        </div>
      </div>
    </div>
  );
};
