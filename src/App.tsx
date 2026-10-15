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
const KinhNghiemThueXe = lazy(() => import("./page/KinhNghiemThueXe"));
const ArticlePage = lazy(() => import("./page/ArticlePage"));
const PolicyPage = lazy(() => import("./page/PolicyPage"));
const FaqPage = lazy(() => import("./page/FaqPage"));
const PrivacyPage = lazy(() => import("./page/PrivacyPage"));
import { LanguageProvider } from "./context/LanguageContext";
import { Toaster } from 'react-hot-toast';

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
      <Toaster position="top-center" toastOptions={{ duration: 4000, style: { borderRadius: '16px', fontWeight: 'bold' } }} />
      <div className="eb min-h-screen flex flex-col w-full relative">
        <Header />
        <main id="main" className="flex-1 w-full min-h-[100vh] relative z-10">
          <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
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
