import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { ebikeContent, BRAND } from "../data/ebikeContent";
import logo from "../assets/logo/logo3.png";

export function BrandMark() {
  return (
    <img src={logo} alt={`${BRAND.top} ${BRAND.sub}`} style={{ height: 56, width: "auto", objectFit: "contain" }} />
  );
}

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const c = ebikeContent[language as "VI" | "EN"].nav;
  const { pathname, hash } = useLocation();

  // Xác định link nào đang active
  const activeHash = hash || "";
  const isHome = pathname === "/" || pathname === "";

  const hashActive = (h: string) =>
    isHome && activeHash === h ? "page" : undefined;
  const pathActive = (p: string) =>
    pathname.startsWith(p) ? "page" : undefined;

  return (
    <header className="site-head">
      <div className="wrap">
        <Link className="brand" to="/" aria-label={`${BRAND.top} ${BRAND.sub}`}><BrandMark /></Link>
        <nav className="nav" aria-label="Main menu">
          <Link to="/#day" aria-current={hashActive("#day")}>{c.day}</Link>
          <Link to="/#rides" aria-current={hashActive("#rides")}>{c.rides}</Link>
          <Link to="/#reach" aria-current={hashActive("#reach")}>{c.reach}</Link>
          <Link to="/faq" aria-current={pathActive("/faq")}>{c.faq}</Link>
          <Link to="/news" aria-current={pathActive("/news")}>{language === "VI" ? "Tin tức" : "News"}</Link>
          <Link to="/contact" aria-current={pathActive("/contact")}>{language === "VI" ? "Liên hệ" : "Contact"}</Link>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            className="btn btn-sm lang-btn"
            onClick={() => setLanguage(language === "VI" ? "EN" : "VI")}
            aria-label="Switch language"
          >
            {language === "VI" ? "EN" : "VI"}
          </button>
          <Link className="btn btn-sm" to="/booking">{c.cta}</Link>
        </div>
      </div>
    </header>
  );
}
