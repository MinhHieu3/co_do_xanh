import { useState } from "react";
import { vehicles } from "../data/vehicles";
import { CheckCircle2, Calendar, MapPin, User, Phone, Mail, FileText, Info, Hash } from "lucide-react";
import { Link } from "react-router-dom";

export default function BookingPage() {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0].id);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pickupDate: "",
    dropoffDate: "",
    pickupLocation: "Ninh Bình",
    quantity: "1",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Giả lập gọi API
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="p-8 max-w-4xl mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-green-100 text-[#009e4e] rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={50} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0d1b2a] mb-4 font-display">Gửi Yêu Cầu Thành Công!</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-lg">
          Cảm ơn bạn đã lựa chọn Cố Đô Xanh. Yêu cầu đặt xe của bạn đã được tiếp nhận. Nhân viên tư vấn sẽ liên hệ lại qua số điện thoại <span className="font-bold text-[#0d1b2a]">{formData.phone}</span> trong thời gian sớm nhất để xác nhận.
        </p>
        <Link to="/" className="px-8 py-3 bg-[#009e4e] hover:bg-[#008c45] text-white font-bold rounded-lg transition-colors shadow-lg shadow-green-500/30">
          Về Trang Chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-10 md:mb-14 mt-4 md:mt-8">
        <h1 className="text-3xl md:text-5xl font-bold text-[#0d1b2a] mb-4 font-display uppercase tracking-wide">Đặt Xe Trực Tuyến</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
          Lựa chọn dòng xe yêu thích và để lại thông tin, Cố Đô Xanh sẽ chuẩn bị xe sẵn sàng cho chuyến đi của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Cột Trái: Chọn Xe */}
        <div className="lg:col-span-5 flex flex-col space-y-4 lg:space-y-6">
          <h2 className="text-2xl font-bold text-[#0d1b2a] flex items-center">
            <span className="w-8 h-8 rounded-full bg-[#009e4e] text-white flex items-center justify-center text-sm mr-3">1</span>
            Chọn Dòng Xe
          </h2>
          <div className="flex overflow-x-auto lg:grid lg:grid-cols-1 gap-4 pt-4 pb-4 lg:pt-0 lg:pb-0 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 lg:mx-0 lg:px-0">
            {vehicles.map((vehicle) => {
              const isSelected = selectedVehicle === vehicle.id;
              return (
                <div 
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                  className={`shrink-0 w-[85vw] sm:w-[320px] lg:w-auto snap-center group relative p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex items-center gap-4 lg:gap-5 ${
                    isSelected 
                      ? "border-[#009e4e] bg-gradient-to-r from-[#f2fdf5] to-white shadow-[0_10px_40px_rgba(0,196,97,0.12)] scale-[1.02]" 
                      : "border-gray-100 bg-white hover:border-[#009e4e]/40 hover:shadow-lg hover:shadow-gray-200/50"
                  }`}
                >
                  {/* Dấu tick khi được chọn */}
                  {isSelected && (
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#009e4e] rounded-full flex items-center justify-center shadow-lg shadow-green-500/40 z-10 animate-[bounce_0.3s_ease-out]">
                      <CheckCircle2 size={18} className="text-white" />
                    </div>
                  )}
                  
                  {/* Hình ảnh xe */}
                  <div className={`w-28 h-28 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2 transition-transform duration-300 ${
                    isSelected ? "bg-white shadow-sm scale-105 border border-green-100" : "bg-gray-50 group-hover:scale-105"
                  }`}>
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  
                  {/* Thông tin xe */}
                  <div className="flex-1">
                    <h3 className={`font-bold text-xl mb-1.5 transition-colors ${isSelected ? "text-[#009e4e]" : "text-[#0d1b2a] group-hover:text-[#009e4e]"}`}>
                      {vehicle.name}
                    </h3>
                    <div className={`inline-flex items-center text-sm font-bold px-3 py-1.5 rounded-lg transition-colors ${
                      isSelected 
                        ? "bg-[#009e4e] text-white shadow-md shadow-green-500/30" 
                        : "bg-green-50 text-[#009e4e]"
                    }`}>
                      Chỉ từ {vehicle.pricing.day1.split("/")[0]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3 mt-4">
            <Info className="text-yellow-600 shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-yellow-800 leading-relaxed">
              <strong>Lưu ý:</strong> Giá có thể thay đổi nhẹ tùy thuộc vào dịp lễ/tết hoặc các yêu cầu đặc biệt. Nhân viên sẽ báo giá chính xác nhất khi liên hệ.
            </p>
          </div>
        </div>

        {/* Cột Phải: Biểu Mẫu Thông Tin */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 sticky top-24">
            <h2 className="text-2xl font-bold text-[#0d1b2a] mb-6 flex items-center pb-4 border-b border-gray-100">
              <span className="w-8 h-8 rounded-full bg-[#009e4e] text-white flex items-center justify-center text-sm mr-3">2</span>
              Thông Tin Đặt Xe
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Thông tin liên hệ */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-700">Thông tin cá nhân</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><User size={16} className="text-gray-400" />Họ và tên *</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009e4e]/20 focus:border-[#009e4e] transition-all bg-gray-50 focus:bg-white" placeholder="Nguyễn Văn A" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Phone size={16} className="text-gray-400" />Số điện thoại *</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009e4e]/20 focus:border-[#009e4e] transition-all bg-gray-50 focus:bg-white" placeholder="0981 355 455" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Mail size={16} className="text-gray-400" />Email (Không bắt buộc)</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009e4e]/20 focus:border-[#009e4e] transition-all bg-gray-50 focus:bg-white" placeholder="email@example.com" />
                </div>
              </div>

              {/* Chi tiết thuê xe */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-700">Lịch trình & Địa điểm</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Calendar size={16} className="text-gray-400" />Nhận xe lúc *</label>
                    <input required type="datetime-local" name="pickupDate" value={formData.pickupDate} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009e4e]/20 focus:border-[#009e4e] transition-all bg-gray-50 focus:bg-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Calendar size={16} className="text-gray-400" />Trả xe lúc *</label>
                    <input required type="datetime-local" name="dropoffDate" value={formData.dropoffDate} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009e4e]/20 focus:border-[#009e4e] transition-all bg-gray-50 focus:bg-white" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><MapPin size={16} className="text-gray-400" />Khu vực nhận xe *</label>
                    <select required name="pickupLocation" value={formData.pickupLocation} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009e4e]/20 focus:border-[#009e4e] transition-all bg-gray-50 focus:bg-white appearance-none cursor-pointer">
                      <option value="Ninh Bình">Cửa Hàng Cố Đô Xanh (Ninh Bình)</option>
                      <option value="Sân Bay Nội Bài">Trạm giao nhận Sân Bay Nội Bài</option>
                      <option value="Khác">Khu vực khác (Giao tận nơi)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Hash size={16} className="text-gray-400" />Số lượng xe *</label>
                    <input required type="number" min="1" max="50" name="quantity" value={formData.quantity} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009e4e]/20 focus:border-[#009e4e] transition-all bg-gray-50 focus:bg-white" placeholder="1" />
                  </div>
                </div>
              </div>

              {/* Lời nhắn */}
              <div className="space-y-1.5 pt-4 border-t border-gray-100">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><FileText size={16} className="text-gray-400" />Ghi chú đặc biệt</label>
                <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009e4e]/20 focus:border-[#009e4e] transition-all bg-gray-50 focus:bg-white resize-none" placeholder="Ví dụ: Cần mượn thêm 2 mũ bảo hiểm, giao xe tại khách sạn ABC..."></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all flex items-center justify-center gap-2 ${
                  isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#009e4e] hover:bg-[#008c45] shadow-lg shadow-green-500/30 hover:shadow-green-500/40"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </>
                ) : (
                  "Gửi Yêu Cầu Đặt Xe"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
