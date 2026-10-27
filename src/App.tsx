import { useEffect } from "react";
import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";

const HomePage = lazy(() => import("./page/HomePage"));
const BookingPage = lazy(() => import("./page/BookingPage"));
const PricingPage = lazy(() => import("./page/PricingPage"));
const ContactPage = lazy(() => import("./page/ContactPage"));
const NewsPage = lazy(() => import("./page/NewsPage"));
const AdminLayout = lazy(() => import("./page/Admin/AdminLayout"));
const KinhNghiemThueXe = lazy(() => import("./page/EditorialGuidePage"));
const ArticlePage = lazy(() => import("./page/ArticlePage"));
const PolicyPage = lazy(() => import("./page/PolicyPage"));
const FaqPage = lazy(() => import("./page/FaqPage"));
const PrivacyPage = lazy(() => import("./page/PrivacyPage"));
import { LanguageProvider } from "./context/LanguageContext";
import { Toaster } from 'react-hot-toast';
import { useLanguage } from "./context/LanguageContext";
import { articles } from "./data/articles";
import { ebikeContent } from "./data/ebikeContent";
import { vehicles } from "./data/vehicles";
import { BUSINESS } from "./data/business";

/** "150.000đ/ngày" -> 150000 */
const toVnd = (s: string) => Number(s.replace(/[^\d]/g, "")) || undefined;

function RouteMetadata() {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const isEnglish = language === "EN";
    const path = location.pathname;
    const slug = path.split("/").filter(Boolean).at(-1);
    const article = path.startsWith("/news/") ? articles.find((item) => item.slug === slug) : undefined;
    const titles: Record<string, [string, string]> = {
      "/": ["Thuê Xe Máy Điện Ninh Bình, Hoa Lư | Xe Cố Đô Xanh", "Ninh Binh Electric Motorbike Rental | Xe Cố Đô Xanh"],
      "/index-en.html": ["Thuê Xe Máy Điện Ninh Bình, Hoa Lư | Xe Cố Đô Xanh", "Ninh Binh Electric Motorbike Rental | Xe Cố Đô Xanh"],
      "/booking": ["Đặt Thuê Xe Máy Điện Ninh Bình Online | Xe Cố Đô Xanh", "Book an Electric Motorbike in Ninh Binh | Xe Cố Đô Xanh"],
      "/pricing": ["Giá Thuê Xe Máy Điện Ninh Bình 1 Ngày | Xe Cố Đô Xanh", "Ninh Binh Motorbike Rental Prices | Xe Cố Đô Xanh"],
      "/contact": ["Liên hệ | Xe Cố Đô Xanh", "Contact | Xe Cố Đô Xanh"],
      "/news": ["Tin tức Ninh Bình | Xe Cố Đô Xanh", "Ninh Binh Travel News | Xe Cố Đô Xanh"],
      "/faq": ["Câu hỏi thường gặp | Xe Cố Đô Xanh", "Frequently Asked Questions | Xe Cố Đô Xanh"],
      "/policy": ["Chính sách thuê xe | Xe Cố Đô Xanh", "Rental Policy | Xe Cố Đô Xanh"],
      "/privacy": ["Chính sách bảo mật | Xe Cố Đô Xanh", "Privacy Policy | Xe Cố Đô Xanh"],
      "/news/kinh-nghiem-thue-xe-may-dien-ninh-binh": ["Kinh nghiệm thuê xe máy điện Ninh Bình | Xe Cố Đô Xanh", "Electric Motorbike Rental Guide | Xe Cố Đô Xanh"],
    };
    const descriptions: Record<string, [string, string]> = {
      "/": ["Thuê xe máy điện Ninh Bình từ 120.000đ/ngày: VinFast Evo, Evo Lite, Feliz II và xe đạp trợ lực. Giao xe tận khách sạn ở Hoa Lư, Tam Cốc, Tràng An.", "Rent an electric motorbike in Ninh Binh from 120,000 VND/day. VinFast Evo, Evo Lite, Feliz II and e-bikes, delivered to your hotel in Hoa Lu, Tam Coc or Trang An."],
      "/index-en.html": ["Thuê xe máy điện Ninh Bình từ 120.000đ/ngày: VinFast Evo, Evo Lite, Feliz II và xe đạp trợ lực. Giao xe tận khách sạn ở Hoa Lư, Tam Cốc, Tràng An.", "Rent an electric motorbike in Ninh Binh from 120,000 VND/day. VinFast Evo, Evo Lite, Feliz II and e-bikes, delivered to your hotel in Hoa Lu, Tam Coc or Trang An."],
      "/booking": ["Chọn xe, ngày thuê và gửi yêu cầu đặt xe máy điện tại Ninh Bình, Hoa Lư trong vài phút. Không cần đặt cọc.", "Choose your electric motorbike and dates, then send a booking request in minutes."],
      "/pricing": ["Giá thuê xe máy điện Ninh Bình: 150.000đ/ngày, xe đạp trợ lực 120.000đ/ngày, gói 5 giờ từ 80.000đ. Bao gồm mũ bảo hiểm, áo mưa, sạc.", "Compare electric motorbike and e-bike rental prices in Ninh Binh."],
      "/contact": ["Liên hệ Xe Cố Đô Xanh để thuê xe máy điện tại Ninh Bình. Gọi hotline, gửi tin nhắn hoặc ghé 61 ngõ 281 Đinh Tiên Hoàng; hỗ trợ hằng ngày từ 07:00 đến 22:00.", "Contact Xe Co Do Xanh to rent an electric motorbike in Ninh Binh. Call, message or visit 61 Alley 281 Dinh Tien Hoang. Open daily from 07:00 to 22:00."],
      "/news": ["Cẩm nang du lịch, thông tin thuê xe và kinh nghiệm khám phá Ninh Bình.", "Travel guides, rental advice and local tips for exploring Ninh Binh."],
      "/faq": ["Giải đáp thủ tục, giao nhận, pin và các câu hỏi khi thuê xe tại Ninh Bình.", "Answers about booking, delivery, batteries and renting in Ninh Binh."],
      "/policy": ["Điều khoản và quy định khi thuê xe tại Xe Cố Đô Xanh.", "Terms and conditions for rentals with Xe Co Do Xanh."],
      "/privacy": ["Thông tin về cách Xe Cố Đô Xanh xử lý dữ liệu cá nhân.", "Learn how Xe Co Do Xanh handles personal information."],
    };
    const content = ebikeContent[isEnglish ? "EN" : "VI"];
    const title = article ? `${article[isEnglish ? "EN" : "VI"].title} | Xe Cố Đô Xanh` : (titles[path] ?? titles["/"])[isEnglish ? 1 : 0];
    const description = article ? article[isEnglish ? "EN" : "VI"].desc : (descriptions[path] ?? descriptions["/"])[isEnglish ? 1 : 0];
    document.title = title;

    const setMeta = (selector: string, attribute: string, key: string, value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = value;
    };
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", `https://xecodoxanh.com${path}`);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = path === "/index-en.html" ? "https://xecodoxanh.com/index-en.html" : `https://xecodoxanh.com${path}`;

    const faqSchema = document.createElement("script");
    faqSchema.type = "application/ld+json";
    if (path === "/faq") {
      faqSchema.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a.join(" ") },
        })),
      });
      document.head.appendChild(faqSchema);
    }
    const extraSchemas: HTMLScriptElement[] = [];
    if (path === "/" || path === "/index-en.html" || path === "/pricing") {
      const products = vehicles.map((v) => {
        const price = toVnd(v.pricing.day1);
        const name = isEnglish && v.nameEn ? v.nameEn : v.name;
        const specs = isEnglish ? v.specsEn : v.specs;
        return {
          "@type": "Product",
          "@id": `${BUSINESS.url}/#${v.id}`,
          name: isEnglish ? `${name} rental in Ninh Binh` : `Thuê ${name} Ninh Bình`,
          image: `${BUSINESS.url}${v.image}`,
          description: Object.entries(specs).map(([k, val]) => `${k}: ${val}`).join(". "),
          brand: { "@type": "Brand", name: v.name.toLowerCase().includes("phoenix") ? "Phoenix" : "VinFast" },
          ...(price && {
            offers: {
              "@type": "Offer",
              url: `${BUSINESS.url}/booking`,
              priceCurrency: "VND",
              price,
              availability: "https://schema.org/InStock",
              seller: { "@id": `${BUSINESS.url}/#business` },
              priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "VND", unitCode: "DAY" },
            },
          }),
        };
      });
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.text = JSON.stringify({ "@context": "https://schema.org", "@graph": products });
      document.head.appendChild(s);
      extraSchemas.push(s);
    }
    return () => { faqSchema.remove(); extraSchemas.forEach((s) => s.remove()); };
  }, [language, location.pathname]);

  return null;
}

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  if (isAdminRoute) {
    return (
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading Admin...</div>}>
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <LanguageProvider>
      <RouteMetadata />
      <Toaster position="top-center" toastOptions={{ duration: 4000, style: { borderRadius: '16px', fontWeight: 'bold' } }} />
      <div className="eb min-h-screen flex flex-col w-full relative">
        <Header />
        <main id="main" className="flex-1 w-full min-h-[100vh] relative z-10">
          <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/index-en.html" element={<HomePage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/kinh-nghiem-thue-xe-may-dien-ninh-binh" element={<KinhNghiemThueXe />} />
              <Route path="/news/:slug" element={<ArticlePage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/policy" element={<PolicyPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
            </Routes>
          </Suspense>
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
