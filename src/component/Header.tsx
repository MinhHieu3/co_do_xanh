import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import logo from "../assets/logo/logo3.png";

const NAV_LINKS = [
  { name: "TRANG CHỦ", path: "/" },
  // { name: "DỊCH VỤ", path: "/dich-vu" },
  { name: "ĐẶT XE", path: "/dat-xe" },
  // { name: "BÁO GIÁ", path: "/bang-gia" },
  { name: "TIN TỨC", path: "/tin-tuc" },
  { name: "LIÊN HỆ", path: "/lien-he" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('VI');
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
              className="h-[60px] md:h-[60px] lg:h-[70px] w-auto object-contain drop-shadow-md transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-lg"
            />
          </Link>

          {/* Desktop Navigation and Language */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <nav className="flex items-center space-x-1 xl:space-x-2">
              {NAV_LINKS.map((link, index) => {
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
                    {index < NAV_LINKS.length - 1 && (
                      <span className="text-gray-200 font-light mx-1 select-none">|</span>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Language Selector */}
            <div className="ml-4 pl-4 border-l border-gray-200 flex items-center">
              <button
                onClick={() => setLanguage(lang => lang === 'VI' ? 'EN' : 'VI')}
                className="flex items-center gap-2 text-sm font-bold text-[#0d1b2a] hover:text-[#009e4e] transition-colors bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 hover:border-[#009e4e]/30 hover:bg-[#e6fff2] group"
              >
                <img src={language === 'VI' ? "https://flagcdn.com/w20/vn.png" : "https://flagcdn.com/w20/gb.png"} alt={language} className="w-5 h-auto shadow-sm" />
                <span className="font-display tracking-wider">{language}</span>
              </button>
            </div>
          </div>

          {/* Mobile Actions: Language + Hamburger */}
          <div className="flex lg:hidden items-center space-x-1.5">
            <button
              onClick={() => setLanguage(lang => lang === 'VI' ? 'EN' : 'VI')}
              className="flex items-center justify-center gap-1.5 font-bold text-[#0d1b2a] bg-white px-2.5 h-[34px] rounded-md border border-gray-100 shadow-sm hover:border-[#009e4e]/50 transition-all"
            >
              <img src={language === 'VI' ? "https://flagcdn.com/w20/vn.png" : "https://flagcdn.com/w20/gb.png"} alt={language} className="w-[18px] h-auto drop-shadow-sm rounded-[1px]" />
              <span className="font-display tracking-wider text-[13px] leading-none mt-[1px]">{language}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-[34px] h-[34px] flex items-center justify-center text-[#0d1b2a] hover:text-[#009e4e] transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 origin-top overflow-hidden border-t border-gray-100 ${mobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          }`}
      >
        <div className="p-4 flex flex-col space-y-2.5">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-bold uppercase tracking-wide font-display transition-all ${isActive
                  ? "bg-[#009e4e]/10 text-[#009e4e] shadow-sm"
                  : "text-[#0d1b2a] bg-gray-50 hover:bg-gray-100 hover:text-[#009e4e]"
                  }`}
              >
                <span className="text-[15px]">{link.name}</span>
                <ChevronRight size={18} className={isActive ? "text-[#009e4e]" : "text-gray-400 group-hover:text-[#009e4e]"} />
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
