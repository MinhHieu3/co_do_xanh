import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white min-h-screen pt-4 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-[#14b8a6] hover:text-[#0d9488] font-medium mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" /> 
          {language === 'EN' ? 'Back to Home' : 'Về Trang chủ'}
        </Link>
        
        <h1 className="text-3xl md:text-5xl font-black text-[#0d1b2a] mb-10 leading-tight font-display text-center">
          {language === 'EN' ? 'Privacy Policy' : 'Chính Sách Bảo Mật Thông Tin Cá Nhân'}
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {language === 'EN' ? (
            <>
              <h2>1. Information Collection</h2>
              <p>Xe Cố Đô Xanh collects personal information such as Name, Phone Number, Email, and ID/Passport details solely for the purpose of motorbike rental procedures.</p>

              <h2>2. Use of Information</h2>
              <p>Your information is used to:</p>
              <ul>
                <li>Process your rental booking.</li>
                <li>Contact you regarding your booking or emergencies.</li>
                <li>Comply with local legal requirements.</li>
              </ul>

              <h2>3. Information Protection</h2>
              <p>We are committed to protecting your personal information. We use appropriate security measures to prevent unauthorized access, disclosure, modification, or destruction of your data.</p>

              <h2>4. Information Sharing</h2>
              <p>We do NOT sell, trade, or rent your personal information to third parties. We may only share information with competent authorities if required by law.</p>

              <h2>5. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us via our Hotline or Email.</p>
            </>
          ) : (
            <>
              <h2>1. Thu thập thông tin</h2>
              <p>Xe Cố Đô Xanh thu thập các thông tin cá nhân như Họ tên, Số điện thoại, Email và thông tin giấy tờ tùy thân (CCCD/Hộ chiếu) nhằm mục đích phục vụ cho quá trình làm thủ tục thuê xe.</p>

              <h2>2. Sử dụng thông tin</h2>
              <p>Thông tin của bạn được sử dụng để:</p>
              <ul>
                <li>Xác nhận và xử lý đơn đặt xe của bạn.</li>
                <li>Liên lạc trong các trường hợp cần thiết hoặc khẩn cấp.</li>
                <li>Tuân thủ các yêu cầu quản lý lưu trú, di chuyển của pháp luật địa phương.</li>
              </ul>

              <h2>3. Bảo vệ thông tin</h2>
              <p>Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của bạn. Xe Cố Đô Xanh áp dụng các biện pháp an ninh mạng và quy trình nội bộ nghiêm ngặt để ngăn chặn truy cập trái phép.</p>

              <h2>4. Chia sẻ thông tin</h2>
              <p>Chúng tôi KHÔNG bán, trao đổi hoặc cho thuê thông tin cá nhân của khách hàng cho bất kỳ bên thứ ba nào. Thông tin chỉ được cung cấp cho cơ quan chức năng khi có yêu cầu hợp pháp.</p>

              <h2>5. Liên hệ</h2>
              <p>Nếu bạn có bất kỳ thắc mắc nào về Chính sách bảo mật này, vui lòng liên hệ với chúng tôi qua Hotline hoặc Email được cung cấp trên website.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
