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
const BatterySwapPage = lazy(() => import("./page/BatterySwapPage"));
const PrivacyPage = lazy(() => import("./page/PrivacyPage"));
import { LanguageProvider } from "./context/LanguageContext";
import { Toaster } from 'react-hot-toast';
import { useLanguage } from "./context/LanguageContext";
import { getRouteMeta, type RouteMeta } from "./seo/routeMeta";

function applyRouteMetadata(meta: RouteMeta, isEnglish: boolean) {
  document.title = meta.title;
  document.documentElement.lang = isEnglish ? "en" : "vi";

  const tags = [
    ["name", "description", meta.description],
    ["property", "og:title", meta.title],
    ["property", "og:description", meta.description],
    ["property", "og:image", meta.image],
    ["property", "og:url", meta.canonical],
  ];
  for (const [attribute, key, value] of tags) {
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attribute, key);
      document.head.appendChild(element);
    }
    element.content = value;
  }

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = meta.canonical;

  document.head.querySelectorAll("script[data-route-schema]").forEach((script) => script.remove());
  for (const schema of meta.schemas) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.routeSchema = "";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}

function RouteMetadata() {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const isEnglish = language === "EN";
    if (!pathname.startsWith("/news/")) {
      applyRouteMetadata(getRouteMeta(pathname, isEnglish), isEnglish);
      return;
    }

    let active = true;
    void import("./seo/editorialRouteMeta").then(
      ({ getEditorialRouteMeta }) => {
        if (active) applyRouteMetadata(getEditorialRouteMeta(pathname, isEnglish), isEnglish);
      },
      () => {
        if (active) applyRouteMetadata(getRouteMeta(pathname, isEnglish), isEnglish);
      },
    );
    return () => { active = false; };
  }, [language, pathname]);

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
              <Route path="/doi-pin" element={<BatterySwapPage />} />
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
