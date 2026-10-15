import { Phone } from "lucide-react";
import { WhatsappIcon, MessengerIcon, ZaloIcon } from "./Icons";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import { ebikeContent } from "../data/ebikeContent";
// import { BrandMark } from "./Header";

export default function Footer() {
  const { language } = useLanguage();
  const f = ebikeContent[language as "VI" | "EN"].foot;
  const zaloNumber = import.meta.env.VITE_ZALO_NUMBER || "0866399986";
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER || "0866399986";
  const messengerUrl = import.meta.env.VITE_MESSENGER_URL || "https://www.facebook.com/profile.php?id=61593578486189";
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "84866399986";

  return (
    <>
      <div className="wave-band" role="presentation" />
      <footer className="site-foot" itemScope itemType="https://schema.org/LocalBusiness">
        <meta itemProp="name" content="Xe Cố Đô Xanh" />
        <meta itemProp="image" content="https://xecodoxanh.com/og-image.png" />
        <meta itemProp="url" content="https://xecodoxanh.com" />
        <meta itemProp="priceRange" content="VND" />
        <div className="wrap">
          <div className="foot-grid">
            <div>
              {/* <Link className="brand" to="/" aria-label={`${BRAND.top} ${BRAND.sub}`}><BrandMark /></Link> */}
              <p style={{ margin: "16px 0 0", maxWidth: "36ch" }} itemProp="description">{f.about}</p>
              <p style={{ margin: "12px 0 0" }}>
                <a href={`tel:${phoneNumber}`} itemProp="telephone">{phoneNumber}</a>
                <br />
                <a href="mailto:hieubyi@gmail.com" itemProp="email">hieubyi@gmail.com</a>
              </p>
              <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress" style={{ display: "none" }}>
                <span itemProp="streetAddress">Số 61, ngõ 281 Đinh Tiên Hoàng</span>
                <meta itemProp="addressLocality" content="Ninh Bình" />
                <meta itemProp="addressCountry" content="VN" />
              </div>
            </div>
            <div>
              <h2>{f.site}</h2>
              <ul>
                <li><Link to="/booking">{f.links[0]}</Link></li>
                <li><Link to="/news">{f.links[1]}</Link></li>
                <li><Link to="/contact">{f.links[2]}</Link></li>
                <li><Link to="/policy">{f.links[3]}</Link></li>
                <li><Link to="/privacy">{f.links[4]}</Link></li>
              </ul>
            </div>
            <div>
              <h2>{f.phrases}</h2>
              <ul className="phrases">
                <li><b>Zalo</b> <a href={`https://zalo.me/${zaloNumber}`} target="_blank" rel="noreferrer">{zaloNumber}</a></li>
                <li><b>WhatsApp</b> <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">+{whatsappNumber}</a></li>
                <li><b>Messenger</b> <a href={messengerUrl} target="_blank" rel="noreferrer">Xe Cố Đô Xanh</a></li>
                <li><b>{language === "EN" ? "Phone" : "Điện thoại"}</b> <a href={`tel:${phoneNumber}`}>{phoneNumber}</a></li>
              </ul>
            </div>
          </div>
          <p className="fine">&copy; {new Date().getFullYear()} Xe Cố Đô Xanh. {f.fine}</p>
        </div>
      </footer>

      {/* Floating contact buttons */}
      <div className="eb-fab">
        <a href={`tel:${phoneNumber.split(/[|-]/)[0].trim()}`} className="eb-fab-btn" style={{ background: "#c63d2f" }} aria-label="Phone"><Phone size={20} /></a>
        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="eb-fab-btn" style={{ background: "#25D366" }} aria-label="WhatsApp"><WhatsappIcon size={22} className="fill-current" /></a>
        <a href={messengerUrl} target="_blank" rel="noreferrer" className="eb-fab-btn" style={{ background: "#0088ff" }} aria-label="Messenger"><MessengerIcon size={22} className="fill-current" /></a>
        <a href={`https://zalo.me/${zaloNumber}`} target="_blank" rel="noreferrer" className="eb-fab-btn" style={{ background: "#0054cc" }} aria-label="Zalo"><ZaloIcon size={22} className="fill-current" /></a>
      </div>
    </>
  );
}
