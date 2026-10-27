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
import { getRouteMeta } from "./seo/routeMeta";

function RouteMetadata() {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const path = location.pathname;
    const meta = getRouteMeta(path, language === "EN");
    document.title = meta.title;

    const setMeta = (selector: string, attribute: string, key: string, value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = value;
    };
    setMeta('meta[name="description"]', "name", "description", meta.description);
    setMeta('meta[property="og:title"]', "property", "og:title", meta.title);
    setMeta('meta[property="og:description"]', "property", "og:description", meta.description);
    setMeta('meta[property="og:url"]', "property", "og:url", meta.canonical);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = meta.canonical;

    // Xoá schema do prerender chèn sẵn, rồi chèn schema theo route + ngôn ngữ hiện tại
    document.head.querySelectorAll("script[data-route-schema]").forEach((s) => s.remove());
    const added = meta.schemas.map((schema) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.dataset.routeSchema = "";
      s.text = JSON.stringify(schema);
      document.head.appendChild(s);
      return s;
    });
    return () => added.forEach((s) => s.remove());
  }, [language, location.pathname]);

  return null;
}

function App({ initialLanguage }: { initialLanguage?: "VI" | "EN" } = {}) {
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
    <LanguageProvider initialLanguage={initialLanguage}>
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
