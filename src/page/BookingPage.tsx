import { useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { vehicles } from "../data/vehicles";
import { CheckCircle2, Calendar, MapPin, User, Phone, Mail, FileText, Info, Hash, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { Vietnamese } from "flatpickr/dist/l10n/vn.js";
import { useLanguage } from "../context/LanguageContext";
import toast from 'react-hot-toast';

const flatpickrOptions = {
  locale: Vietnamese,
  minDate: "today",
  dateFormat: "d/m/Y H:i",
  time_24hr: true,
  disableMobile: true
};

const handleFlatpickrTimeRestricton = (selectedDates: Date[], instance: any) => {
  const date = selectedDates[0];
  if (!date) return;
  const now = new Date();
  if (date.toDateString() === now.toDateString()) {
    const newMinTime = now.getHours() + ":" + String(now.getMinutes()).padStart(2, '0');
    if (instance._customMinTime !== newMinTime) {
      instance.set("minTime", newMinTime);
      instance._customMinTime = newMinTime;
    }
  } else {
    if (instance._customMinTime !== null) {
      instance.set("minTime", null);
      instance._customMinTime = null;
    }
  }
};

export default function BookingPage() {
  const { language, t } = useLanguage();
  const location = useLocation();

  const [selectedVehicle, setSelectedVehicle] = useState(() => {
    if (location.state && location.state.selectedVehicle) {
      return location.state.selectedVehicle;
    }
    return vehicles[0].id;
  });
  const [rentalType, setRentalType] = useState<'day' | 'hour'>('day');
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
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const selectedVehicleData = useMemo(() => vehicles.find(v => v.id === selectedVehicle), [selectedVehicle]);

  const calculateTotalEstimate = () => {
    const fallback = { total: 0, base: 0, overtime: 0, overtimeHours: 0 };
    if (!formData.pickupDate || !formData.dropoffDate) return fallback;
    try {
      const parseDate = (str: string) => {
        const [d, t] = str.split(' ');
        const [day, mo, yr] = d.split('/');
        const [hr, min] = t.split(':');
        return new Date(Number(yr), Number(mo) - 1, Number(day), Number(hr), Number(min));
      };
      const p = parseDate(formData.pickupDate);
      const d = parseDate(formData.dropoffDate);
      const diffHours = (d.getTime() - p.getTime()) / (1000 * 60 * 60);
      if (diffHours <= 0) return fallback;

      const vInfo = selectedVehicleData;
      if (!vInfo) return fallback;

      const quantity = parseInt(formData.quantity) || 1;

      if (rentalType === 'hour') {
        const isMoto = !selectedVehicle.includes('phoenix'); // true for xe điện
        const halfDayRate = isMoto ? 100000 : 80000;

        const priceStr = vInfo.pricing.day1;
        const fullDayRate = parseInt(priceStr.split('/')[0].replace(/\D/g, ''));

        const hourlyRate = isMoto ? 15000 : 10000;

        let base = 0;
        let overtime = 0;
        let overtimeHours = 0;

        if (diffHours <= 5) {
          base = halfDayRate * quantity;
        } else if (diffHours >= 10) {
          base = fullDayRate * quantity;
        } else {
          base = halfDayRate * quantity;
          overtimeHours = Math.ceil(diffHours) - 5;
          overtime = overtimeHours * hourlyRate * quantity;
        }

        if (base + overtime >= fullDayRate * quantity) {
          base = fullDayRate * quantity;
          overtime = 0;
          overtimeHours = 0;
        }

        return { total: base + overtime, base, overtime, overtimeHours, hourlyRate };
      } else {
        const priceStr = vInfo.pricing.day1;
        const price = parseInt(priceStr.split('/')[0].replace(/\D/g, ''));
        const total = Math.ceil(diffHours / 24) * price * quantity;
        return { total, base: total, overtime: 0, overtimeHours: 0 };
      }
    } catch (e) {
      return fallback;
    }
  };

  const dropoffOptions = useMemo(() => {
    let minD = "today";
    if (formData.pickupDate) {
      minD = formData.pickupDate.split(' ')[0];
    }
    return {
      locale: Vietnamese,
      minDate: minD,
      dateFormat: "d/m/Y H:i",
      time_24hr: true,
      disableMobile: true
    };
  }, [formData.pickupDate]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pickupDate || !formData.dropoffDate) {
      toast.error(language === 'EN' ? "Please select both pickup and drop-off dates and times!" : "Vui lòng chọn đầy đủ ngày giờ nhận và trả xe!");
      return;
    }

    const parseDate = (str: string) => {
      const [d, t] = str.split(' ');
      const [day, mo, yr] = d.split('/');
      const [hr, min] = t.split(':');
      return new Date(Number(yr), Number(mo) - 1, Number(day), Number(hr), Number(min));
    };
    const p = parseDate(formData.pickupDate);
    const d = parseDate(formData.dropoffDate);
    const diffHours = (d.getTime() - p.getTime()) / (1000 * 60 * 60);

    if (diffHours <= 0) {
      toast.error(language === 'EN' ? "Drop-off time must be after pickup time!" : "Thời gian trả xe phải sau thời gian nhận xe!");
      return;
    }

    if (rentalType === 'day' && diffHours < 24) {
      toast.error(language === 'EN' ? "Rent by Day requires at least 24 hours. Please select Rent by Hour instead." : "Thuê theo ngày yêu cầu thời gian tối thiểu 24h. Nếu ngắn hơn, vui lòng chọn Thuê theo giờ!");
      return;
    }

    if (rentalType === 'hour' && diffHours < 2) {
      toast.error(language === 'EN' ? "Hourly rental requires a minimum of 2 hours." : "Thuê theo giờ yêu cầu thời gian tối thiểu là 2 tiếng!");
      return;
    }

    if (rentalType === 'hour' && diffHours >= 24) {
      toast.error(language === 'EN' ? "For rentals of 24 hours or more, please select Rent by Day." : "Với thời gian từ 24h trở lên, vui lòng chọn Thuê theo ngày!");
      return;
    }

    setShowConfirmModal(true);
  };

  const executeBooking = async () => {
    setIsSubmitting(true);

    // Tên xe đang chọn
    const vInfo = selectedVehicleData;
    const vehicleName = (language === 'EN' && vInfo?.nameEn) ? vInfo.nameEn : (vInfo?.name || selectedVehicle);

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
🛵 <b>Dòng xe:</b> ${vehicleName} (${rentalType === 'hour' ? 'Thuê theo giờ' : 'Thuê theo ngày'})
🔢 <b>Số lượng:</b> ${formData.quantity} chiếc
🗓 <b>Nhận xe:</b> ${formatDateTime(formData.pickupDate)}
🗓 <b>Trả xe:</b> ${formatDateTime(formData.dropoffDate)}
⏳ <b>Loại hình:</b> ${rentalType === 'hour' ? 'Thuê theo giờ' : 'Thuê theo ngày'}
📍 <b>Khu vực nhận:</b> ${formData.pickupLocation}${formData.pickupLocation === 'Giao tận nơi' ? `\n🏠 <b>Địa chỉ giao:</b> ${formData.deliveryAddress}` : ''}
📝 <b>Ghi chú:</b> ${formData.notes || "Không có"}
${calculateTotalEstimate().overtime > 0 ? `💰 <b>Giá gốc (0-5h):</b> ${calculateTotalEstimate().base.toLocaleString('vi-VN')}đ
⏳ <b>Phụ thu quá giờ (${calculateTotalEstimate().overtimeHours}h):</b> ${calculateTotalEstimate().overtime.toLocaleString('vi-VN')}đ` : ''}
💰 <b>Tổng tiền dự kiến:</b> ${calculateTotalEstimate().total.toLocaleString('vi-VN')}đ
    `;

    // Lấy thông tin cấu hình từ file .env
    const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    try {
      // 1. Lưu đơn hàng vào Database qua API
      const BASE_URL = import.meta.env.VITE_API_URL;
      const orderData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        time_start: formData.pickupDate,
        time_end: formData.dropoffDate,
        quantity: formData.quantity,
        location: formData.pickupLocation === 'Giao tận nơi' ? formData.deliveryAddress : formData.pickupLocation,
        type_category: `${vehicleName} (${rentalType === 'hour' ? 'Thuê theo giờ' : 'Thuê theo ngày'})`,
        des_1: `Loại hình: ${rentalType === 'hour' ? 'Thuê theo giờ' : 'Thuê theo ngày'}. ${formData.notes}`
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
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử gọi điện trực tiếp cho chúng tôi!");
    }
  };

  if (showSuccess) {
    return (
      <div className="p-8 max-w-4xl mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-teal-100 text-[#0d9488] rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={50} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0d1b2a] mb-4 font-display">{t('booking.successTitle')}</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-lg">
          {t('booking.successMsg')}
        </p>
        <Link to="/" className="px-8 py-3 bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold rounded-lg transition-colors shadow-lg shadow-teal-500/30">
          {language === 'EN' ? 'Back to Home' : 'Về Trang Chủ'}
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-10 md:mb-14 mt-4 md:mt-8">
        <h1 className="text-2xl md:text-4xl font-bold text-[#0d1b2a] mb-4 font-display uppercase tracking-wide">{t('booking.title')}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
          {t('booking.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Cột Trái: Chọn Xe */}
        <div className="lg:col-span-5 flex flex-col space-y-4 lg:space-y-6">
          <h2 className="text-xl font-bold text-[#0d1b2a] flex items-center">
            <span className="w-8 h-8 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-sm mr-3">1</span>
            {t('booking.chooseVehicle')}
          </h2>

          <div className="flex bg-gray-100 p-1.5 rounded-xl w-full">
            <button
              type="button"
              onClick={() => setRentalType('day')}
              className={`flex-1 px-5 py-2.5 rounded-lg font-bold transition-all text-sm ${rentalType === 'day' ? 'bg-white text-[#0d9488] shadow-[0_2px_8px_rgba(0,196,97,0.15)]' : 'text-gray-500 hover:text-[#0d9488]'}`}
            >
              {language === 'EN' ? 'Rent by Day' : 'Thuê theo ngày'}
            </button>
            <button
              type="button"
              onClick={() => setRentalType('hour')}
              className={`flex-1 px-5 py-2.5 rounded-lg font-bold transition-all text-sm ${rentalType === 'hour' ? 'bg-white text-[#0d9488] shadow-[0_2px_8px_rgba(0,196,97,0.15)]' : 'text-gray-500 hover:text-[#0d9488]'}`}
            >
              {language === 'EN' ? 'Rent by Hour' : 'Thuê theo giờ'}
            </button>
          </div>

          {/* Showcase Stage (Selected Vehicle) */}
          {(() => {
            const selectedV = selectedVehicleData;
            return selectedV ? (
              <div className="relative bg-gradient-to-b from-[#f2fdf5] to-white rounded-3xl p-6 border border-[#0d9488]/20 shadow-sm flex flex-col items-center text-center mt-4">
                <div className="absolute top-4 right-4 w-10 h-10 bg-[#0d9488] rounded-full flex items-center justify-center shadow-lg shadow-teal-500/30">
                  <CheckCircle2 size={22} className="text-white" />
                </div>
                <div className="w-full h-48 md:h-64 flex items-center justify-center mb-4 mt-2">
                  <img src={selectedV.image} alt={selectedV.name} className="w-full h-full object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105" />
                </div>
                <h3 className="text-2xl font-black text-[#0d1b2a] mb-2">{(language === 'EN' && selectedV.nameEn) ? selectedV.nameEn : selectedV.name}</h3>
                <div className="inline-flex items-center text-sm font-bold px-4 py-2 rounded-xl bg-[#0d9488] text-white shadow-md shadow-teal-500/30">
                  {t('booking.fromOnly')} {rentalType === 'hour' ? (language === 'EN' ? selectedV.hourlyPricingEn?.price.split("/")[0] : selectedV.hourlyPricing?.price.split("/")[0]) : (language === 'EN' ? selectedV.pricingEn.day1.split("/")[0] : selectedV.pricing.day1.split("/")[0])}
                </div>
              </div>
            ) : null;
          })()}

          {/* Thumbnails Gallery */}
          <div className="flex gap-3 overflow-x-auto pt-2 pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 lg:mx-0 lg:px-0">
            {vehicles.map((vehicle) => {
              const isSelected = selectedVehicle === vehicle.id;
              return (
                <button
                  key={vehicle.id}
                  type="button"
                  onClick={() => setSelectedVehicle(vehicle.id)}
                  className={`shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-2xl p-2 flex flex-col items-center justify-center transition-all duration-300 snap-center relative outline-none ${isSelected
                    ? "bg-white border-2 border-[#0d9488] shadow-[0_4px_16px_rgba(0,196,97,0.15)] scale-[1.02]"
                    : "bg-gray-50 border-2 border-transparent hover:bg-white hover:border-teal-200 hover:shadow-md opacity-60 hover:opacity-100"
                    }`}
                >
                  <div className="w-full h-[60%] flex items-center justify-center mb-1">
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm" />
                  </div>
                  <span className={`text-[10px] md:text-xs font-bold truncate w-full text-center px-1 ${isSelected ? 'text-[#0d9488]' : 'text-gray-500'}`}>
                    {(language === 'EN' && vehicle.nameEn) ? vehicle.nameEn.replace('Vinfast ', '').replace('Xe đạp trợ lực ', '') : vehicle.name.replace('Vinfast ', '').replace('Xe đạp trợ lực ', '')}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Hiển thị bảng giá chi tiết của xe đang chọn */}
          <div className="bg-gradient-to-br from-[#f2fdf5] to-white p-5 rounded-2xl border border-[#0d9488]/20 shadow-sm mt-2">
            <h3 className="font-bold text-lg text-[#0d9488] mb-3 flex items-center gap-2">
              <Info size={20} />
              {language === 'EN' ? `Rental Pricing: ${selectedVehicleData?.nameEn || selectedVehicleData?.name}` : `Bảng giá thuê: ${selectedVehicleData?.name}`}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: rentalType === 'hour' ? (language === 'EN' ? '0-5 Hours' : 'Thuê 0-5 tiếng') : (language === 'EN' ? '24 Hours' : '24 Giờ'),
                  price: rentalType === 'hour' ? (language === 'EN' ? selectedVehicleData?.hourlyPricingEn?.price : selectedVehicleData?.hourlyPricing?.price) : (language === 'EN' ? selectedVehicleData?.pricingEn.day1 : selectedVehicleData?.pricing.day1),
                  isHourInfo: rentalType === 'hour',
                  hideUnit: rentalType === 'hour'
                },
                ...(rentalType === 'hour' ? [{
                  label: language === 'EN' ? '≥10 Hours' : 'Từ 10 tiếng',
                  price: language === 'EN' ? selectedVehicleData?.pricingEn.day1 : selectedVehicleData?.pricing.day1,
                  isHourInfo: false,
                  hideUnit: true
                }] : [])
              ].filter(item => item.price).map((item, i, arr) => (
                <div key={i} className={`${arr.length === 1 ? 'col-span-2' : ''} flex flex-col bg-white p-4 rounded-xl border border-teal-100/50 shadow-[0_4px_20px_rgba(0,196,97,0.08)] items-center justify-center transition-transform hover:-translate-y-1`}>
                  <span className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">{item.label}</span>
                  <span className="font-black text-2xl text-[#0d9488]">{item.price?.split('/')[0]}</span>
                  {!item.hideUnit && (
                    <span className="text-xs text-gray-400 mt-1">{language === 'EN' ? '/ 24 hours' : '/ 24h'}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Thông số kỹ thuật xe */}
            <div className="mt-4 pt-4 border-t border-[#0d9488]/10">
              <h4 className="font-bold text-sm text-[#0d1b2a] mb-2 uppercase tracking-wide">{language === 'EN' ? 'Vehicle Specifications' : 'Thông tin xe'}</h4>
              <ul className="space-y-2">
                {Object.entries(language === 'EN' ? (selectedVehicleData?.specsEn || {}) : (selectedVehicleData?.specs || {})).map(([key, val], i) => (
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
            <div className="text-sm text-yellow-800 leading-relaxed space-y-1.5">
              <p><strong>{t('booking.noteTitle')}</strong> {t('booking.noteDesc')}</p>
            </div>
          </div>

        </div>

        {/* Cột Phải: Biểu Mẫu Thông Tin */}
        <div className="lg:col-span-7">
          <div className="sticky top-24 flex flex-col space-y-4 lg:space-y-6">
            <h2 className="text-xl font-bold text-[#0d1b2a] flex items-center">
              <span className="w-8 h-8 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-sm mr-3">2</span>
              {t('booking.formTitle')}
            </h2>

            <form onSubmit={handlePreSubmit} className="space-y-6">

              {/* Thông tin liên hệ */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-700">{t('booking.personalInfo')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><User size={16} className="text-gray-400" />{t('booking.fullName')}</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition-all bg-gray-50 focus:bg-white" placeholder={t('booking.fullNamePlaceholder')} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Phone size={16} className="text-gray-400" />{t('booking.phone')}</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition-all bg-gray-50 focus:bg-white" placeholder={t('booking.phonePlaceholder')} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Mail size={16} className="text-gray-400" />{t('booking.emailOptional')}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition-all bg-gray-50 focus:bg-white" placeholder={t('booking.emailPlaceholder')} />
                </div>
              </div>

              {/* Chi tiết thuê xe */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-700">{t('booking.scheduleLocation')}</h3>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
                  <Info className="text-yellow-600 shrink-0 mt-0.5" size={20} />
                  <div className="text-sm text-yellow-800 leading-relaxed space-y-1.5">
                    <p>
                      <strong>{t('booking.overtimeTitle')}</strong>{' '}
                      {(() => {
                        const isEbike = selectedVehicleData?.name.toLowerCase().includes('đạp');
                        const price = isEbike ? '10.000đ' : '15.000đ';
                        const priceEn = isEbike ? '$0.4' : '$0.6';
                        const halfDayPrice = isEbike ? '80.000đ' : '100.000đ';
                        const halfDayPriceEn = isEbike ? '$3.2' : '$4';
                        return t('booking.overtimePolicy')
                          .replace('{price}', language === 'EN' ? priceEn : price)
                          .replace('{halfDayPrice}', language === 'EN' ? halfDayPriceEn : halfDayPrice);
                      })()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Calendar size={16} className="text-gray-400" />{t('booking.pickupTime')}</label>
                    <Flatpickr
                      data-enable-time
                      value={formData.pickupDate}
                      options={flatpickrOptions}
                      onChange={(selectedDates, _dateStr, instance: any) => {
                        handleFlatpickrTimeRestricton(selectedDates, instance);
                        const date = selectedDates[0];
                        if (date) {
                          const str = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                          setFormData(prev => ({ ...prev, pickupDate: str }));
                        }
                      }}
                      onOpen={(selectedDates, _dateStr, instance: any) => {
                        handleFlatpickrTimeRestricton(selectedDates.length ? selectedDates : [new Date()], instance);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition-all bg-gray-50 focus:bg-white"
                      placeholder={t('booking.pickupTimePlaceholder')}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Calendar size={16} className="text-gray-400" />{t('booking.dropoffTime')}</label>
                    <Flatpickr
                      data-enable-time
                      value={formData.dropoffDate}
                      options={dropoffOptions}
                      onChange={(selectedDates, _dateStr, instance: any) => {
                        const date = selectedDates[0];
                        if (date) {
                          const now = new Date();
                          let expectedMinTime: string | null = null;
                          if (formData.pickupDate) {
                            const [pDate, pTime] = formData.pickupDate.split(' ');
                            const dStr = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                            if (dStr === pDate) {
                              expectedMinTime = pTime;
                            }
                          }
                          if (!expectedMinTime && date.toDateString() === now.toDateString()) {
                            expectedMinTime = now.getHours() + ":" + String(now.getMinutes()).padStart(2, '0');
                          }
                          if (instance._customMinTime !== expectedMinTime) {
                            instance.set("minTime", expectedMinTime);
                            instance._customMinTime = expectedMinTime;
                          }
                          const str = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                          setFormData(prev => ({ ...prev, dropoffDate: str }));
                        }
                      }}
                      onOpen={(selectedDates, _dateStr, instance: any) => {
                        const date = selectedDates.length ? selectedDates[0] : new Date();
                        const now = new Date();
                        let expectedMinTime: string | null = null;
                        if (formData.pickupDate) {
                          const [pDate, pTime] = formData.pickupDate.split(' ');
                          const dStr = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                          if (dStr === pDate) {
                            expectedMinTime = pTime;
                          }
                        }
                        if (!expectedMinTime && date.toDateString() === now.toDateString()) {
                          expectedMinTime = now.getHours() + ":" + String(now.getMinutes()).padStart(2, '0');
                        }
                        if (instance._customMinTime !== expectedMinTime) {
                          instance.set("minTime", expectedMinTime);
                          instance._customMinTime = expectedMinTime;
                        }
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition-all bg-gray-50 focus:bg-white"
                      placeholder={t('booking.dropoffTimePlaceholder')}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><MapPin size={16} className="text-gray-400" />{t('booking.pickupLocationLabel')}</label>
                    <select required name="pickupLocation" value={formData.pickupLocation} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition-all bg-gray-50 focus:bg-white appearance-none cursor-pointer">
                      <option value="Tại cửa hàng">{t('booking.atStore')}</option>
                      <option value="Giao tận nơi">{t('booking.delivery')}</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Hash size={16} className="text-gray-400" />{t('booking.quantity')}</label>
                    <input required type="number" min="1" max="50" name="quantity" value={formData.quantity} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition-all bg-gray-50 focus:bg-white" placeholder="1" />
                  </div>
                </div>

                {/* Địa chỉ giao xe (Chỉ hiện khi chọn Giao tận nơi) */}
                <div className={`space-y-1.5 overflow-hidden transition-all duration-300 ${formData.pickupLocation === 'Giao tận nơi' ? 'max-h-24 mt-4 opacity-100' : 'max-h-0 mt-0 opacity-0'}`}>
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><MapPin size={16} className="text-gray-400" />{t('booking.deliveryAddress')}</label>
                  <input required={formData.pickupLocation === 'Giao tận nơi'} type="text" name="deliveryAddress" value={formData.deliveryAddress} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition-all bg-gray-50 focus:bg-white" placeholder={t('booking.deliveryAddressPlaceholder')} />
                </div>
              </div>

              {/* Lời nhắn */}
              <div className="space-y-1.5 pt-4 border-t border-gray-100">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><FileText size={16} className="text-gray-400" />{t('booking.specialNotes')}</label>
                <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition-all bg-gray-50 focus:bg-white resize-none" placeholder={t('booking.specialNotesPlaceholder')}></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all flex items-center justify-center gap-2 ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#0d9488] hover:bg-[#0f766e] shadow-lg shadow-teal-500/30 hover:shadow-teal-500/40"
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
                  language === 'EN' ? 'Confirm Booking' : 'Xác Nhận Đặt Xe'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal Xác Nhận */}
      {showConfirmModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-3 pb-16 md:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="p-4 md:p-6 bg-white border-b border-gray-100 flex justify-between items-center relative">
              <h3 className="font-bold text-lg text-gray-800">{language === 'EN' ? 'Confirm Booking Details' : 'Xác Nhận Thông Tin Đặt Xe'}</h3>
              <button onClick={() => setShowConfirmModal(false)} className="p-2 hover:bg-gray-100 text-gray-500 rounded-full transition-colors absolute right-4"><X size={20} /></button>
            </div>
            <div className="p-5 md:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center p-2 border border-gray-100 shrink-0">
                  <img src={selectedVehicleData?.image} className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm" alt="Vehicle" />
                </div>
                <div>
                  <div className="font-black text-gray-800 text-xl mb-1">{(language === 'EN' && selectedVehicleData?.nameEn) ? selectedVehicleData?.nameEn : selectedVehicleData?.name}</div>
                  <div className="flex flex-wrap gap-2">
                    <div className="inline-flex items-center text-xs font-bold px-2 py-1 rounded-md bg-teal-50 text-[#0d9488]">
                      {rentalType === 'hour' ? (language === 'EN' ? 'Rent by Hour' : 'Thuê theo giờ') : (language === 'EN' ? 'Rent by Day' : 'Thuê theo ngày')} x {formData.quantity} {language === 'EN' ? 'vehicle(s)' : 'xe'}
                    </div>
                    <div className="inline-flex items-center text-xs font-bold px-2 py-1 rounded-md bg-gray-100 text-gray-700">
                      {rentalType === 'hour'
                        ? (language === 'EN' ? selectedVehicleData?.hourlyPricingEn?.price : selectedVehicleData?.hourlyPricing?.price)?.replace('/ ', language === 'EN' ? '/vehicle/' : '/xe/')
                        : (language === 'EN' ? selectedVehicleData?.pricingEn?.day1 : selectedVehicleData?.pricing?.day1)?.replace('/ ', language === 'EN' ? '/vehicle/' : '/xe/')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{language === 'EN' ? 'Customer Info' : 'Khách hàng'}</span>
                  <span className="font-bold text-gray-800">{formData.name} • {formData.phone}</span>
                </div>
                <div className="h-px bg-gray-200/60 my-2"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{language === 'EN' ? 'Pickup Date' : 'Nhận xe'}</span>
                    <span className="font-bold text-gray-800 text-sm">{formData.pickupDate}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{language === 'EN' ? 'Dropoff Date' : 'Trả xe'}</span>
                    <span className="font-bold text-gray-800 text-sm">{formData.dropoffDate}</span>
                  </div>
                </div>
                <div className="h-px bg-gray-200/60 my-2"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{language === 'EN' ? 'Location' : 'Địa điểm'}</span>
                  <span className="font-bold text-gray-800 text-sm">{formData.pickupLocation === 'Giao tận nơi' ? formData.deliveryAddress : formData.pickupLocation}</span>
                </div>
                {formData.notes && (
                  <>
                    <div className="h-px bg-gray-200/60 my-2"></div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{language === 'EN' ? 'Notes' : 'Ghi chú'}</span>
                      <span className="font-bold text-gray-800 text-sm line-clamp-4 break-words">{formData.notes}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-5 rounded-2xl border border-teal-100/50 flex flex-col items-center text-center">
                <span className="text-sm font-bold text-teal-800 mb-1">{language === 'EN' ? 'Estimated Total' : 'Tổng tiền dự kiến'}</span>

                {calculateTotalEstimate().overtime > 0 && (
                  <div className="w-full flex flex-col items-center mb-2 mt-1 space-y-1">
                    <div className="flex justify-between w-full max-w-[200px] text-xs text-gray-600">
                      <span>{language === 'EN' ? 'Base (0-5h):' : 'Giá gốc (0-5h):'}</span>
                      <span className="font-bold">{calculateTotalEstimate().base.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between w-full max-w-[200px] text-xs text-gray-600">
                      <span>{language === 'EN' ? `Overtime (${calculateTotalEstimate().overtimeHours}h):` : `Phụ thu quá giờ (${calculateTotalEstimate().overtimeHours}h):`}</span>
                      <span className="font-bold">{calculateTotalEstimate().overtime.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="w-full max-w-[200px] h-px bg-teal-200 my-1"></div>
                  </div>
                )}

                <span className="font-black text-3xl text-[#0d9488]">{calculateTotalEstimate().total.toLocaleString('vi-VN')}đ</span>
                <p className="text-[10px] text-teal-600/80 mt-2 italic max-w-[90%]">
                  {language === 'EN' ? '* Prices may vary slightly during holidays. Exact price will be confirmed upon contact.' : '* Giá có thể thay đổi nhẹ dịp Lễ/Tết. Nhân viên sẽ liên hệ xác nhận giá chính xác nhất.'}
                </p>
              </div>
            </div>

            <div className="p-4 md:p-5 border-t border-gray-100 bg-white flex gap-3">
              <button onClick={() => setShowConfirmModal(false)} className="flex-1 py-4 font-bold text-gray-600 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors">
                {language === 'EN' ? 'Cancel' : 'Hủy bỏ'}
              </button>
              <button onClick={() => { setShowConfirmModal(false); executeBooking(); }} className="flex-1 py-4 font-bold text-white bg-[#0d9488] rounded-xl hover:bg-[#0f766e] transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/40 hover:-translate-y-0.5">
                {language === 'EN' ? 'Confirm & Book' : 'Xác Nhận Đặt'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
