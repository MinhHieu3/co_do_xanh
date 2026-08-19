import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Home, Newspaper, MapPin } from "lucide-react";
import logo from "../assets/logo/logo3.png";
import { useLanguage } from "../context/LanguageContext";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // No more mobile menu state needed since it's a bottom bar now
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b border-[#00c461]/10 ${isScrolled
          ? "bg-white/95 shadow-md py-1"
          : "bg-gradient-to-b from-[#f2fdf5]/90 to-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-1.5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Area */}
            <Link to="/" className="flex items-center group py-1">
              <img
                src={logo}
                alt="Cố Đô Xanh"
                className="h-[53px] md:h-[70px] w-auto object-contain drop-shadow-md transition-transform duration-300 scale-[1.5] md:scale-[1.6] origin-left group-hover:scale-[1.55] md:group-hover:scale-[1.65]"
              />
            </Link>

            {/* Desktop Navigation and Language */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <nav className="flex items-center space-x-1 xl:space-x-2">
                {[
                  { name: t('header.home'), path: "/" },
                  { name: t('header.booking'), path: "/booking" },
                  { name: t('header.news'), path: "/news" },
                  { name: t('header.contact'), path: "/contact" },
                ].map((link, index, array) => {
                  const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                  return (
                    <div key={link.name} className="flex items-center">
                      <Link
                        to={link.path}
                        className={`px-3 py-2 text-[14px] font-bold transition-all uppercase font-display tracking-widest ${isActive
                          ? "text-[#00c461] drop-shadow-sm"
                          : "text-gray-600 hover:text-[#00c461]"
                          }`}
                      >
                        {link.name}
                      </Link>
                      {index < array.length - 1 && (
                        <span className="text-gray-200 font-light mx-1 select-none">|</span>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Language Selector */}
              <div className="ml-4 pl-4 border-l border-gray-200 flex items-center">
                <button
                  onClick={() => setLanguage(language === 'VI' ? 'EN' : 'VI')}
                  className="flex items-center gap-2 text-sm font-bold text-[#0d1b2a] hover:text-[#009e4e] transition-colors bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 hover:border-[#009e4e]/30 hover:bg-[#e6fff2] group shadow-sm"
                >
                  <img src={language === 'VI' ? "https://flagcdn.com/w20/vn.png" : "https://flagcdn.com/w20/gb.png"} alt={language} className="w-5 h-auto shadow-sm rounded-sm" />
                  <span className="font-display tracking-wider">{language}</span>
                </button>
              </div>
            </div>

            {/* Mobile Actions: Language only */}
            <div className="flex lg:hidden items-center space-x-1.5">
              <button
                onClick={() => setLanguage(language === 'VI' ? 'EN' : 'VI')}
                className="flex items-center justify-center gap-2 font-bold text-[#009e4e] bg-gradient-to-r from-[#f2fdf5] to-white px-3.5 h-[38px] rounded-full border border-[#00c461]/30 shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <img src={language === 'VI' ? "https://flagcdn.com/w20/vn.png" : "https://flagcdn.com/w20/gb.png"} alt={language} className="w-[20px] h-[14px] object-cover drop-shadow-sm rounded-[2px]" />
                <span className="font-display tracking-widest text-[14px] leading-none mt-[1px]">{language}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Bottom Tab Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.08)] flex items-center justify-between px-2 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] backdrop-blur-md bg-white/90">
        <Link to="/" className={`flex-1 flex flex-col items-center justify-center transition-colors ${location.pathname === '/' ? 'text-[#009e4e]' : 'text-gray-500 hover:text-[#009e4e]'}`}>
          <Home size={26} className="mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{t('header.home')}</span>
        </Link>
        <Link to="/news" className={`flex-1 flex flex-col items-center justify-center transition-colors ${location.pathname.startsWith('/news') ? 'text-[#009e4e]' : 'text-gray-500 hover:text-[#009e4e]'}`}>
          <Newspaper size={26} className="mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{t('header.news')}</span>
        </Link>

        <Link to="/booking" className={`flex-1 flex flex-col items-center justify-center transition-colors ${location.pathname.startsWith('/booking') ? 'text-[#009e4e]' : 'text-gray-500 hover:text-[#009e4e]'}`}>
          <Calendar size={26} className="mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{t('header.booking')}</span>
        </Link>

        <Link to="/contact" className={`flex-1 flex flex-col items-center justify-center transition-colors ${location.pathname.startsWith('/contact') ? 'text-[#009e4e]' : 'text-gray-500 hover:text-[#009e4e]'}`}>
          <MapPin size={26} className="mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{t('header.contact')}</span>
        </Link>
      </div>
    </>
  );
}
