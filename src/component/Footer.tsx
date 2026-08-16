import { MapPin, Phone, Facebook, Youtube, Instagram, ChevronRight } from "lucide-react";
import { WhatsappIcon, MessengerIcon, ZaloIcon } from "./Icons";
import logo from "../assets/logo/logo3.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#1f1f1f] py-10 md:py-12 text-[#b0b0b0] text-[13px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            {/* Cột 1: Thông tin cửa hàng */}
            <div className="md:col-span-4 flex flex-col space-y-3">
              <div className="bg-white inline-block px-3 py-1.5 rounded-lg self-start shadow-sm mb-1">
                <img src={logo} alt="Cố Đô Xanh" className="h-[35px] w-auto object-contain" />
              </div>
              <p className="leading-relaxed mt-1">
                Cố Đô Xanh là dịch vụ cho thuê xe máy tự lái chuyên nghiệp tại Việt Nam.
              </p>
              <div className="space-y-1.5 mt-2 font-medium">
                <p>Tổng đài (24/24H): <span className="text-white font-bold">0866 399 986</span></p>
                <p>English speaking: <span className="text-white font-bold">0866 399 986</span></p>
                <p>Email: <span className="text-white font-bold">hieubyi@gmail.com</span></p>
                <p>Thứ Hai - Chủ Nhật: <span className="text-white font-bold">7:00 - 22:00</span></p>
              </div>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-[#facc15] hover:text-white transition-colors">
                  <Facebook size={18} className="fill-current" />
                </a>
                <a href="#" className="text-[#facc15] hover:text-white transition-colors">
                  <Youtube size={18} />
                </a>
                <a href="#" className="text-[#facc15] hover:text-white transition-colors">
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Cột 2: Về chúng tôi */}
            <div className="md:col-span-4 flex flex-col space-y-3">
              <h3 className="font-bold text-[14px] uppercase tracking-wide text-[#facc15] mb-1">Về Cố Đô Xanh</h3>
              <ul className="space-y-2 font-medium">
                {[
                  "Giới thiệu về Cố Đô Xanh",
                  "Liên hệ",
                  "FAQs",
                  "Tuyển dụng",
                  "Cửa hàng Cố Đô Xanh",
                  "Chính sách thủ tục thuê xe máy",
                  "Chính sách bảo mật thông tin cá nhân",
                  "Cố Đô Xanh Tours"
                ].map(item => (
                  <li key={item}>
                    <a href="#" className="flex items-center group hover:text-white transition-colors">
                      <ChevronRight size={13} className="mr-1.5 text-[#facc15] shrink-0" />
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cột 3: Địa điểm */}
            <div className="md:col-span-4 flex flex-col space-y-3">
              <h3 className="font-bold text-[14px] uppercase tracking-wide text-[#facc15] mb-1">Địa Điểm</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="flex items-center text-white font-bold mb-1.5">
                    <MapPin size={16} className="text-[#facc15] mr-1.5" />
                    Cửa Hàng Cố Đô Xanh
                  </h4>
                  <p className="pl-6 mb-2 leading-relaxed">CS1: Cửa Hàng Cố Đô Xanh</p>
                  {/* <p className="pl-6 text-[13.5px] leading-relaxed">CS2: Khu du lịch Tam Cốc, Ninh Hải, Hoa Lư, Ninh Bình</p> */}
                  
                  <div className="w-full h-28 bg-gray-800 rounded-lg overflow-hidden shadow-inner border border-[#333] ml-1 mt-1.5 opacity-90 hover:opacity-100 transition-opacity">
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

                {/* <div>
                  <h4 className="flex items-center text-white font-bold mb-1.5">
                    <MapPin size={16} className="text-[#facc15] mr-1.5" />
                    Thuê Xe Máy Hà Nội
                  </h4>
                  <p className="pl-6 leading-relaxed">CS3: Trạm giao nhận xe Sân Bay Nội Bài</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3.5 z-50">

        {/* Phone Button */}
        <div className="relative group">
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-30"></div>
          <a
            href="tel:0981355455"
            className="flex items-center justify-start w-11 h-11 lg:hover:w-[130px] bg-gradient-to-tr from-[#ff3b3f] to-[#ff6b6b] text-white rounded-full shadow-lg shadow-red-500/30 transition-all duration-300 overflow-hidden relative z-10"
          >
            <div className="w-11 h-11 flex items-center justify-center shrink-0">
              <Phone size={20} className="fill-current animate-pulse" />
            </div>
            <span className="font-bold text-[14px] whitespace-nowrap opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 pr-4">Điện thoại</span>
          </a>
        </div>

        {/* WhatsApp Button */}
        <div className="relative group">
          <a
            href="https://wa.me/84981355455"
            target="_blank" rel="noreferrer"
            className="flex items-center justify-start w-11 h-11 lg:hover:w-[130px] bg-gradient-to-tr from-[#20b558] to-[#25D366] text-white rounded-full shadow-lg shadow-green-500/20 transition-all duration-300 overflow-hidden relative z-10 hover:-translate-y-1"
          >
            <div className="w-11 h-11 flex items-center justify-center shrink-0">
              <WhatsappIcon size={22} className="fill-current" />
            </div>
            <span className="font-bold text-[14px] whitespace-nowrap opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 pr-4">WhatsApp</span>
          </a>
        </div>

        {/* Messenger Button */}
        <div className="relative group">
          <a
            href="https://m.me/codoxanh"
            target="_blank" rel="noreferrer"
            className="flex items-center justify-start w-11 h-11 lg:hover:w-[130px] bg-gradient-to-tr from-[#0088ff] to-[#00B2FF] text-white rounded-full shadow-lg shadow-blue-400/20 transition-all duration-300 overflow-hidden relative z-10 hover:-translate-y-1"
          >
            <div className="w-11 h-11 flex items-center justify-center shrink-0">
              <MessengerIcon size={22} className="fill-current" />
            </div>
            <span className="font-bold text-[14px] whitespace-nowrap opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 pr-4">Messenger</span>
          </a>
        </div>

        {/* Zalo Button */}
        <div className="relative group">
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20 delay-300"></div>
          <a
            href="https://zalo.me/0981355455"
            target="_blank" rel="noreferrer"
            className="flex items-center justify-start w-11 h-11 lg:hover:w-[110px] bg-gradient-to-tr from-[#0054cc] to-[#0088ff] text-white rounded-full shadow-lg shadow-blue-600/30 transition-all duration-300 overflow-hidden relative z-10 hover:-translate-y-1"
          >
            <div className="w-11 h-11 flex items-center justify-center shrink-0">
              <ZaloIcon size={22} className="fill-current" />
            </div>
            <span className="font-bold text-[14px] whitespace-nowrap opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 pr-4">Zalo</span>
          </a>
        </div>

      </div>
    </>
  );
}
