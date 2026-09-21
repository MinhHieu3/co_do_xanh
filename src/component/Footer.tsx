import { MapPin, Phone, Facebook, Youtube, Instagram } from "lucide-react";
import { WhatsappIcon, MessengerIcon, ZaloIcon } from "./Icons";
import logo from "../assets/logo/logo3.png";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const zaloNumber = import.meta.env.VITE_ZALO_NUMBER || "0866399986";
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER || "0866399986";
  const messengerUrl = import.meta.env.VITE_MESSENGER_URL || "https://www.facebook.com/profile.php?id=61593578486189";
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "84866399986";

  return (
    <>
      <footer className="bg-[#0d1b2a] pt-8 pb-20 md:pb-8 text-gray-300 text-[14px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Cột 1: Thông tin chính */}
            <div className="flex flex-col space-y-4">
              <div className="bg-white inline-block px-4 py-2 rounded-xl self-start shadow-sm mb-2">
                <img src={logo} alt="Xe Cố Đô Xanh" className="h-[40px] w-auto object-contain" />
              </div>
              <p className="leading-relaxed text-gray-300">
                {t('footer.about')}
              </p>
              <div className="space-y-3 mt-4 font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-[#14b8a6]" />
                  </div>
                  <p>{t('footer.hotline')}: <span className="text-white font-bold">{phoneNumber}</span></p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-[#14b8a6]" />
                  </div>
                  <p>{t('footer.email')}: <span className="text-white font-bold">hieubyi@gmail.com</span></p>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <a href="https://www.facebook.com/profile.php?id=61593578486189" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 shadow-sm flex items-center justify-center text-white hover:bg-[#14b8a6] transition-all">
                  <Facebook size={18} className="fill-current" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 shadow-sm flex items-center justify-center text-white hover:bg-[#14b8a6] transition-all">
                  <Youtube size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 shadow-sm flex items-center justify-center text-white hover:bg-[#14b8a6] transition-all">
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Cột 2: Địa điểm */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-bold text-[16px] uppercase tracking-wide text-white mb-2">{t('footer.location')}</h3>

              <div className="bg-white/5 p-4 md:p-5 rounded-2xl border border-white/10">
                <h4 className="flex items-center text-white font-bold mb-2">
                  <MapPin size={18} className="text-[#14b8a6] mr-2" />
                  {t('footer.storeLocation')}
                </h4>
                <p className="pl-6 mb-4 leading-relaxed text-gray-300">{t('footer.address1')}</p>
                
                <div className="w-full h-28 md:h-32 bg-gray-900 rounded-xl overflow-hidden border border-white/10">
                  <iframe
                    src="https://maps.google.com/maps?q=Xe+C%E1%BB%91+%C4%90%C3%B4+Xanh,+Ninh+B%C3%ACnh&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-[13px] font-medium text-gray-400">
            <p>© {new Date().getFullYear()} Xe Cố Đô Xanh. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">{t('footer.policy')}</a>
              <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-[90px] lg:bottom-6 right-4 lg:right-6 flex flex-col items-end gap-3.5 z-50">

        {/* Phone Button */}
        <div className="relative group">
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-30"></div>
          <a
            href={`tel:${phoneNumber.split(/[|\-]/)[0].trim()}`}
            className="flex items-center justify-start w-11 h-11 lg:hover:w-[130px] bg-gradient-to-tr from-[#ff3b3f] to-[#ff6b6b] text-white rounded-full shadow-lg shadow-red-500/30 transition-all duration-300 overflow-hidden relative z-10"
          >
            <div className="w-11 h-11 flex items-center justify-center shrink-0">
              <Phone size={20} className="fill-current animate-pulse" />
            </div>
            <span className="font-bold text-[14px] whitespace-nowrap opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 pr-4">{t('footer.phone')}</span>
          </a>
        </div>

        {/* WhatsApp Button */}
        <div className="relative group">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank" rel="noreferrer"
            className="flex items-center justify-start w-11 h-11 lg:hover:w-[130px] bg-gradient-to-tr from-[#20b558] to-[#25D366] text-white rounded-full shadow-lg shadow-teal-500/20 transition-all duration-300 overflow-hidden relative z-10 hover:-translate-y-1"
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
            href={messengerUrl}
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
            href={`https://zalo.me/${zaloNumber}`}
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
