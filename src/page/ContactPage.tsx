import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import contactBg from "../assets/dulich/ninhbinh_slider_1.png";

export default function ContactPage() {
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER || "0866399986";
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const text = `
📩 <b>TIN NHẮN LIÊN HỆ MỚI</b>
--------------------------------
⏱ <b>Thời gian:</b> ${new Date().toLocaleString('vi-VN')}
👤 <b>Người gửi:</b> ${formData.name}
📞 <b>SĐT:</b> ${formData.phone}
📌 <b>Tiêu đề:</b> ${formData.subject || "Không có"}
📝 <b>Nội dung:</b>
${formData.message}
    `;

    const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
      }, 1000);
      return;
    }

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' }),
      });
      setIsSubmitting(false);
      setShowSuccess(true);
    } catch (error) {
      setIsSubmitting(false);
      alert("Có lỗi xảy ra khi gửi tin nhắn!");
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-50/50 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden flex items-center justify-center group">
        {/* Animated Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[15s] ease-out scale-100 group-hover:scale-110"
          style={{ backgroundImage: `url(${contactBg})` }}
        ></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-[#00c461]/40 to-black/80 mix-blend-multiply"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 relative z-10 mt-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 font-display tracking-tight text-center drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-lg md:text-xl font-medium max-w-2xl text-center text-gray-200 drop-shadow-md">
            Cố Đô Xanh luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7. Hãy gửi tin nhắn hoặc gọi trực tiếp cho chúng tôi!
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl z-10 pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-60 h-60 bg-[#00c461]/30 rounded-full blur-3xl z-10 pointer-events-none"></div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Contact Information Cards (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500"></div>

              <h2 className="text-2xl font-bold text-[#0d1b2a] mb-8 font-display relative z-10">Thông tin liên hệ</h2>

              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-green-100/50 text-[#00c461]">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-[16px] mb-1">Địa chỉ cửa hàng</h3>
                    <p className="text-gray-600 leading-relaxed text-[15px]">Nhà Thi Đấu Thể Thao Tỉnh Ninh Bình<br />Đinh Tiên Hoàng, Đông Thành, Ninh Bình</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-red-100/50 text-[#e33527]">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-[16px] mb-1">Điện thoại / Zalo</h3>
                    <p className="text-gray-600 font-bold text-[17px]">{phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-blue-100/50 text-blue-500">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-[16px] mb-1">Email</h3>
                    <p className="text-gray-600 text-[15px]">hieubyi@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-yellow-100/50 text-yellow-500">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-[16px] mb-1">Giờ mở cửa</h3>
                    <p className="text-gray-600 text-[15px]">24/7 - Phục vụ cả ngày lễ & Chủ Nhật</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 h-full">
              {showSuccess ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-10 animate-fade-in-up">
                  <div className="w-20 h-20 bg-green-100 text-[#00c461] rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0d1b2a] mb-3">Gửi Thành Công!</h3>
                  <p className="text-gray-600">Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi lại trong thời gian sớm nhất qua số điện thoại của bạn.</p>
                  <button 
                    onClick={() => {
                      setShowSuccess(false);
                      setFormData({ name: "", phone: "", subject: "", message: "" });
                    }}
                    className="mt-8 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                  >
                    Gửi tin nhắn khác
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-[#0d1b2a] mb-2 font-display">Gửi tin nhắn cho chúng tôi</h2>
                  <p className="text-gray-500 mb-8 text-[15px]">Vui lòng điền thông tin bên dưới, Cố Đô Xanh sẽ phản hồi bạn trong thời gian sớm nhất.</p>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Họ và Tên *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Nhập họ tên của bạn"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#00c461] focus:ring-2 focus:ring-[#00c461]/20 outline-none transition-all bg-gray-50/50 focus:bg-white text-[15px]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Số điện thoại *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Nhập số điện thoại"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#00c461] focus:ring-2 focus:ring-[#00c461]/20 outline-none transition-all bg-gray-50/50 focus:bg-white text-[15px]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Tiêu đề</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Bạn cần hỗ trợ về vấn đề gì?"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#00c461] focus:ring-2 focus:ring-[#00c461]/20 outline-none transition-all bg-gray-50/50 focus:bg-white text-[15px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Nội dung tin nhắn *</label>
                      <textarea
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Viết tin nhắn của bạn ở đây..."
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#00c461] focus:ring-2 focus:ring-[#00c461]/20 outline-none transition-all bg-gray-50/50 focus:bg-white resize-none text-[15px]"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full sm:w-auto px-10 py-4 ${isSubmitting ? 'bg-gray-400' : 'bg-[#00c461] hover:bg-[#00a852] hover:-translate-y-1 shadow-lg shadow-green-500/30'} text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 mt-4`}
                    >
                      {isSubmitting ? (
                        <>Đang gửi...</>
                      ) : (
                        <><Send size={18} /> Gửi Tin Nhắn Ngay</>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 md:mt-16 bg-white p-3 md:p-4 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className="w-full h-[350px] md:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
            <iframe
              src="https://maps.google.com/maps?q=20.2815256,105.9653496&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
