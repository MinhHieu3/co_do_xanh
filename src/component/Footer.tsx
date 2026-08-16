import { MapPin, Phone, Mail, Clock, Facebook, MessageCircle } from "lucide-react";
import logo from "../assets/logo/logo.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-white border-t border-gray-100 py-12 text-[#0d1b2a] shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Cột 1: Thông tin cửa hàng */}
            <div className="flex flex-col space-y-4">
              <img src={logo} alt="Cố Đô Xanh" className="h-[70px] w-auto object-contain self-start" />
              <p className="text-gray-600 text-[15px] leading-relaxed mt-2 pr-4">
                Khách hàng sẽ luôn cảm thấy hài lòng, vui vẻ bởi đội ngũ nhân viên nhiệt tình, thân thiện.
              </p>
              <div className="flex space-x-3 mt-4">
                <a href="#" className="w-9 h-9 rounded-full border border-[#00c461] text-[#00c461] flex items-center justify-center hover:bg-[#00c461] hover:text-white transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-9 h-9 rounded-full border border-[#00c461] text-[#00c461] flex items-center justify-center hover:bg-[#00c461] hover:text-white transition-colors">
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            {/* Cột 2: Bản đồ */}
            <div className="flex flex-col space-y-5">
              <h3 className="font-bold text-[17px] uppercase tracking-wide">Vị trí cửa hàng</h3>
              <div className="w-full h-44 bg-gray-200 rounded-lg overflow-hidden shadow-inner border border-gray-100">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.110435402324!2d108.2131976!3d16.059758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792252a13%3A0xfc14e3a044436487!2zMzkgxJDDoG8gRHV5IEFuaCwgVGjhuqFjIEdpw6FuLCBUaGFuaCBLaMOqLCDEkMOgIE7hurVuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Cột 3: Liên hệ */}
            <div className="flex flex-col space-y-5 md:pl-8">
              <h3 className="font-bold text-[17px] uppercase tracking-wide">Liên hệ</h3>
              <ul className="space-y-4 text-[15px] text-gray-600">
                <li className="flex items-start gap-3">
                  <MapPin className="text-gray-400 mt-1 shrink-0" size={18} />
                  <span>39 Đào Duy Anh - Tp. Đà Nẵng</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="text-gray-400 mt-1 shrink-0" size={18} />
                  <span>0981 355 455</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="text-gray-400 mt-1 shrink-0" size={18} />
                  <span>qnguyendong@gmail.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="text-gray-400 mt-1 shrink-0" size={18} />
                  <span>Giờ làm việc: 24/7</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        <a 
          href="tel:0981355455" 
          className="flex items-center gap-3 bg-[#ea4335] text-white px-4 py-3 rounded-full shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all hover:scale-105"
        >
          <div className="bg-white/20 p-1.5 rounded-full">
            <Phone size={18} className="fill-current" />
          </div>
          <span className="font-bold text-[15px] hidden sm:inline-block pr-2">Điện thoại</span>
        </a>
        <a 
          href="https://zalo.me/0981355455" 
          target="_blank" rel="noreferrer"
          className="flex items-center gap-3 bg-[#0068ff] text-white px-4 py-3 rounded-full shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-all hover:scale-105"
        >
          <div className="bg-white/20 p-1.5 rounded-full">
            <MessageCircle size={18} className="fill-current" />
          </div>
          <span className="font-bold text-[15px] hidden sm:inline-block pr-2">Zalo</span>
        </a>
      </div>
    </>
  );
}
