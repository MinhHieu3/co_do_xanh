import { useState } from "react";
import { vehicles } from "../data/vehicles";
import { CheckCircle2, Calendar, MapPin, User, Phone, Mail, FileText, Info, Hash } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { Vietnamese } from "flatpickr/dist/l10n/vn.js";
import { useLanguage } from "../context/LanguageContext";
import toast from 'react-hot-toast';

export default function BookingPage() {
  const { language, t } = useLanguage();
  const location = useLocation();
  
  const [selectedVehicle, setSelectedVehicle] = useState(() => {
    if (location.state && location.state.selectedVehicle) {
      return location.state.selectedVehicle;
    }
    return vehicles[0].id;
  });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pickupDate: "",
    dropoffDate: "",
    pickupLocation: "Tại cửa hàng",
    deliveryAddress: "",
    quantity: "1",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pickupDate || !formData.dropoffDate) {
      toast.error("Vui lòng chọn đầy đủ ngày giờ nhận và trả xe!");
      return;
    }

    setIsSubmitting(true);

    // Tên xe đang chọn
    const vehicleName = vehicles.find(v => v.id === selectedVehicle)?.name || selectedVehicle;

    // Format ngày giờ cho đẹp (Antd DatePicker đã tự trả về string đẹp)
    const formatDateTime = (dt: string) => dt;

    // Tạo nội dung tin nhắn gửi Telegram
    const message = `
🛎 <b>YÊU CẦU ĐẶT XE MỚI</b>
--------------------------------
⏱ <b>Ngày đặt:</b> ${new Date().toLocaleString('vi-VN')}
👤 <b>Khách hàng:</b> ${formData.name}
📞 <b>SĐT:</b> ${formData.phone}
✉️ <b>Email:</b> ${formData.email || "Không có"}
🛵 <b>Dòng xe:</b> ${vehicleName}
🔢 <b>Số lượng:</b> ${formData.quantity} chiếc
🗓 <b>Nhận xe:</b> ${formatDateTime(formData.pickupDate)}
🗓 <b>Trả xe:</b> ${formatDateTime(formData.dropoffDate)}
📍 <b>Khu vực nhận:</b> ${formData.pickupLocation}${formData.pickupLocation === 'Giao tận nơi' ? `\n🏠 <b>Địa chỉ giao:</b> ${formData.deliveryAddress}` : ''}
📝 <b>Ghi chú:</b> ${formData.notes || "Không có"}
    `;

    // Lấy thông tin cấu hình từ file .env
    const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    try {
      // 1. Lưu đơn hàng vào Database qua API
      const BASE_URL = import.meta.env.VITE_API_URL || 'https://co_do_xanh_v2.hieubyipro.workers.dev/api';
      const orderData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        time_start: formData.pickupDate,
        time_end: formData.dropoffDate,
        quantity: formData.quantity,
        location: formData.pickupLocation === 'Giao tận nơi' ? formData.deliveryAddress : formData.pickupLocation,
        type_category: vehicleName,
        des_1: formData.notes
      };

      const apiResponse = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const apiResult = await apiResponse.json();

      if (!apiResult.success) {
        throw new Error('Lỗi khi lưu đơn hàng vào hệ thống');
      }

      // 2. Gửi thông báo Telegram (nếu có cấu hình)
      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML',
          }),
        });
        if (!response.ok) {
          console.error('Gửi tin nhắn Telegram thất bại');
        }
      } else {
        console.warn("Chưa cấu hình Telegram Bot Token hoặc Chat ID.");
      }

      setIsSubmitting(false);
      setShowSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử gọi điện trực tiếp cho chúng tôi!");
    }
  };

  if (showSuccess) {
    return (
      <div className="p-8 max-w-4xl mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-green-100 text-[#009e4e] rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={50} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0d1b2a] mb-4 font-display">{t('booking.successTitle')}</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-lg">
          {t('booking.successMsg')}
        </p>
        <Link to="/" className="px-8 py-3 bg-[#009e4e] hover:bg-[#008c45] text-white font-bold rounded-lg transition-colors shadow-lg shadow-green-500/30">
          {language === 'EN' ? 'Back to Home' : 'Về Trang Chủ'}
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-10 md:mb-14 mt-4 md:mt-8">
        <h1 className="text-3xl md:text-5xl font-bold text-[#0d1b2a] mb-4 font-display uppercase tracking-wide">{t('booking.title')}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
          {t('booking.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Cột Trái: Chọn Xe */}
        <div className="lg:col-span-5 flex flex-col space-y-4 lg:space-y-6">
          <h2 className="text-2xl font-bold text-[#0d1b2a] flex items-center">
            <span className="w-8 h-8 rounded-full bg-[#009e4e] text-white flex items-center justify-center text-sm mr-3">1</span>
            {t('booking.chooseVehicle')}
          </h2>
          <div className="flex overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-1 gap-4 pt-4 pb-4 lg:pt-4 lg:pb-4 lg:pr-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 lg:mx-0 lg:px-0">
            {vehicles.map((vehicle) => {
              const isSelected = selectedVehicle === vehicle.id;
              return (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                  className={`shrink-0 w-[85vw] sm:w-[320px] lg:w-auto snap-center group relative p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex items-center gap-4 lg:gap-5 ${isSelected
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
                  <div className={`w-28 h-28 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2 transition-transform duration-300 ${isSelected ? "bg-white shadow-sm scale-105 border border-green-100" : "bg-gray-50 group-hover:scale-105"
                    }`}>
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>

                  {/* Thông tin xe */}
                  <div className="flex-1">
                    <h3 className={`font-bold text-xl mb-1.5 transition-colors ${isSelected ? "text-[#009e4e]" : "text-[#0d1b2a] group-hover:text-[#009e4e]"}`}>
                      {vehicle.name}
                    </h3>
                    <div className={`inline-flex items-center text-sm font-bold px-3 py-1.5 rounded-lg transition-colors ${isSelected
                        ? "bg-[#009e4e] text-white shadow-md shadow-green-500/30"
                        : "bg-green-50 text-[#009e4e]"
                      }`}>
                      {t('booking.fromOnly')} {language === 'EN' ? vehicle.pricingEn.day1.split("/")[0] : vehicle.pricing.day1.split("/")[0]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hiển thị bảng giá chi tiết của xe đang chọn */}
          <div className="bg-gradient-to-br from-[#f2fdf5] to-white p-5 rounded-2xl border border-[#009e4e]/20 shadow-sm mt-2">
            <h3 className="font-bold text-lg text-[#009e4e] mb-3 flex items-center gap-2">
              <Info size={20} />
              {language === 'EN' ? `Rental Pricing: ${vehicles.find(v => v.id === selectedVehicle)?.name}` : `Bảng giá thuê: ${vehicles.find(v => v.id === selectedVehicle)?.name}`}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: language === 'EN' ? '1 Day' : '1 ngày', price: language === 'EN' ? vehicles.find(v => v.id === selectedVehicle)?.pricingEn.day1 : vehicles.find(v => v.id === selectedVehicle)?.pricing.day1 },
                { label: language === 'EN' ? '2 Days' : '2 ngày', price: language === 'EN' ? vehicles.find(v => v.id === selectedVehicle)?.pricingEn.day2 : vehicles.find(v => v.id === selectedVehicle)?.pricing.day2 },
                { label: language === 'EN' ? '3 Days' : '3 ngày', price: language === 'EN' ? vehicles.find(v => v.id === selectedVehicle)?.pricingEn.day3 : vehicles.find(v => v.id === selectedVehicle)?.pricing.day3 },
                { label: language === 'EN' ? '4 Days' : '4 ngày', price: language === 'EN' ? vehicles.find(v => v.id === selectedVehicle)?.pricingEn.day4 : vehicles.find(v => v.id === selectedVehicle)?.pricing.day4 },
              ].map((item, i) => (
                <div key={i} className="flex flex-col bg-white p-3 rounded-xl border border-green-50 shadow-[0_2px_10px_rgba(0,196,97,0.04)]">
                  <span className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">{item.label}</span>
                  <span className="font-bold text-[#0d1b2a]">{item.price?.split('/')[0]}</span>
                </div>
              ))}
            </div>

            {/* Thông số kỹ thuật xe */}
            <div className="mt-4 pt-4 border-t border-[#009e4e]/10">
              <h4 className="font-bold text-sm text-[#0d1b2a] mb-2 uppercase tracking-wide">{language === 'EN' ? 'Vehicle Specifications' : 'Thông tin xe'}</h4>
              <ul className="space-y-2">
                {Object.entries(language === 'EN' ? (vehicles.find(v => v.id === selectedVehicle)?.specsEn || {}) : (vehicles.find(v => v.id === selectedVehicle)?.specs || {})).map(([key, val], i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="font-medium text-gray-500 min-w-[130px] shrink-0">{key}:</span>
                    <span className="text-gray-800 font-bold">{val}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3 mt-2">
            <Info className="text-yellow-600 shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-yellow-800 leading-relaxed">
              <strong>{t('booking.noteTitle')}</strong> {t('booking.noteDesc')}
            </p>
          </div>
        </div>

        {/* Cột Phải: Biểu Mẫu Thông Tin */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 sticky top-24">
            <h2 className="text-2xl font-bold text-[#0d1b2a] mb-6 flex items-center pb-4 border-b border-gray-100">
              <span className="w-8 h-8 rounded-full bg-[#009e4e] text-white flex items-center justify-center text-sm mr-3">2</span>
              {t('booking.formTitle')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Thông tin liên hệ */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-700">{t('booking.personalInfo')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><User size={16} className="text-gray-400" />{t('booking.fullName')}</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009e4e]/20 focus:border-[#009e4e] transition-all bg-gray-50 focus:bg-white" placeholder={t('booking.fullNamePlaceholder')} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Phone size={16} className="text-gray-400" />{t('booking.phone')}</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009e4e]/20 focus:border-[#009e4e] transition-all bg-gray-50 focus:bg-white" placeholder={t('booking.phonePlaceholder')} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Mail size={16} className="text-gray-400" />{t('booking.emailOptional')}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009e4e]/20 focus:border-[#009e4e] transition-all bg-gray-50 focus:bg-white" placeholder={t('booking.emailPlaceholder')} />
                </div>
              </div>

              {/* Chi tiết thuê xe */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-700">{t('booking.scheduleLocation')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Calendar size={16} className="text-gray-400" />{t('booking.pickupTime')}</label>
                    <Flatpickr
                      data-enable-time
                      value={formData.pickupDate}
                      options={{
                        locale: Vietnamese,
                        minDate: "today",
                        dateFormat: "d/m/Y H:i",
                        time_24hr: true,
                        disableMobile: true // Bắt buộc dùng giao diện tuỳ chỉnh đẹp, không dùng giao diện mặc định xấu của trình duyệt
                      }}
                      onChange={([date]) => {
                        if(date) {
                          const dateStr = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                          setFormData(prev => ({ ...prev, pickupDate: dateStr }));
                        }
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009e4e]/20 focus:border-[#009e4e] transition-all bg-gray-50 focus:bg-white"
                      placeholder={t('booking.pickupTimePlaceholder')}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Calendar size={16} className="text-gray-400" />{t('booking.dropoffTime')}</label>
                    <Flatpickr
                      data-enable-time
                      value={formData.dropoffDate}
                      options={{
                        locale: Vietnamese,
                        minDate: "today",
                        dateFormat: "d/m/Y H:i",
                        time_24hr: true,
                        disableMobile: true
                      }}
                      onChange={([date]) => {
                        if(date) {
                          const dateStr = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                          setFormData(prev => ({ ...prev, dropoffDate: dateStr }));
                        }
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009e4e]/20 focus:border-[#009e4e] transition-all bg-gray-50 focus:bg-white"
                      placeholder={t('booking.dropoffTimePlaceholder')}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><MapPin size={16} className="text-gray-400" />{t('booking.pickupLocation')}</label>
                    <select required name="pickupLocation" value={formData.pickupLocation} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009e4e]/20 focus:border-[#009e4e] transition-all bg-gray-50 focus:bg-white appearance-none cursor-pointer">
                      <option value="Tại cửa hàng">{t('booking.atStore')}</option>
                      <option value="Giao tận nơi">{t('booking.delivery')}</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Hash size={16} className="text-gray-400" />{t('booking.quantity')}</label>
                    <input required type="number" min="1" max="50" name="quantity" value={formData.quantity} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009e4e]/20 focus:border-[#009e4e] transition-all bg-gray-50 focus:bg-white" placeholder="1" />
                  </div>
                </div>
                
                {/* Địa chỉ giao xe (Chỉ hiện khi chọn Giao tận nơi) */}
                <div className={`space-y-1.5 overflow-hidden transition-all duration-300 ${formData.pickupLocation === 'Giao tận nơi' ? 'max-h-24 mt-4 opacity-100' : 'max-h-0 mt-0 opacity-0'}`}>
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><MapPin size={16} className="text-gray-400" />{t('booking.deliveryAddress')}</label>
                  <input required={formData.pickupLocation === 'Giao tận nơi'} type="text" name="deliveryAddress" value={formData.deliveryAddress} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009e4e]/20 focus:border-[#009e4e] transition-all bg-gray-50 focus:bg-white" placeholder={t('booking.deliveryAddressPlaceholder')} />
                </div>
              </div>

              {/* Lời nhắn */}
              <div className="space-y-1.5 pt-4 border-t border-gray-100">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><FileText size={16} className="text-gray-400" />{t('booking.specialNotes')}</label>
                <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009e4e]/20 focus:border-[#009e4e] transition-all bg-gray-50 focus:bg-white resize-none" placeholder={t('booking.specialNotesPlaceholder')}></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all flex items-center justify-center gap-2 ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#009e4e] hover:bg-[#008c45] shadow-lg shadow-green-500/30 hover:shadow-green-500/40"
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('booking.submitting')}
                  </>
                ) : (
                  t('booking.submitBtn')
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
