import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PolicyPage() {
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
          {language === 'EN' ? 'Rental Policy & Procedures' : 'Chính Sách Thủ Tục Thuê Xe Máy'}
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {language === 'EN' ? (
            <>
              <h2>1. Rental Requirements</h2>
              <p>To rent a motorbike at Xe Cố Đô Xanh, customers must provide the following documents:</p>
              <ul>
                <li>Original ID Card (CCCD) or Passport.</li>
                <li>Valid Driver's License (if required for the specific motorbike model).</li>
              </ul>

              <h2>2. Deposit</h2>
              <p>We require NO cash deposit for most of our motorbike rentals. However, for certain premium models, a small deposit might be required, which will be fully refunded upon vehicle return.</p>

              <h2>3. Rental Period and Pricing</h2>
              <ul>
                <li>1 Day rental is calculated as 24 hours from the time of pickup.</li>
                <li>Late returns exceeding the agreed time will be subject to additional charges per hour.</li>
              </ul>

              <h2>4. Vehicle Usage</h2>
              <ul>
                <li>Customers are responsible for the vehicle during the rental period.</li>
                <li>Do not use the vehicle for illegal activities.</li>
                <li>In case of breakdown, please contact our Hotline immediately for assistance.</li>
              </ul>
            </>
          ) : (
            <>
              <h2>1. Yêu cầu khi thuê xe</h2>
              <p>Để thuê xe máy tại Xe Cố Đô Xanh, quý khách vui lòng chuẩn bị các giấy tờ sau:</p>
              <ul>
                <li>Căn cước công dân (CCCD) bản gốc hoặc Hộ chiếu.</li>
                <li>Giấy phép lái xe hợp lệ (đối với các dòng xe yêu cầu bằng lái).</li>
              </ul>

              <h2>2. Quy định đặt cọc</h2>
              <p>Chúng tôi KHÔNG yêu cầu đặt cọc tiền mặt đối với hầu hết các dòng xe. Tuy nhiên, với một số dòng xe cao cấp, có thể yêu cầu đặt cọc một khoản nhỏ và sẽ được hoàn trả 100% khi trả xe.</p>

              <h2>3. Thời gian và Giá thuê</h2>
              <ul>
                <li>1 Ngày thuê được tính là 24 giờ kể từ thời điểm nhận xe.</li>
                <li>Trả xe quá giờ quy định sẽ bị tính thêm phụ phí theo giờ.</li>
              </ul>

              <h2>4. Trách nhiệm sử dụng xe</h2>
              <ul>
                <li>Khách hàng hoàn toàn chịu trách nhiệm về chiếc xe trong suốt thời gian thuê.</li>
                <li>Không sử dụng xe vào các mục đích vi phạm pháp luật.</li>
                <li>Trong trường hợp xe gặp sự cố, vui lòng liên hệ ngay Hotline để được hỗ trợ.</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
