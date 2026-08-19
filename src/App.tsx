import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import HomePage from "./page/HomePage";
import BookingPage from "./page/BookingPage";
import PricingPage from "./page/PricingPage";
import ContactPage from "./page/ContactPage";
import NewsPage from "./page/NewsPage";
import LeavesBackground from "./component/LeavesBackground";
import AdminLayout from "./page/Admin/AdminLayout";
import { LanguageProvider } from "./context/LanguageContext";
import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    );
  }

  return (
    <LanguageProvider>
      <Toaster position="top-center" toastOptions={{ duration: 4000, style: { borderRadius: '16px', fontWeight: 'bold' } }} />
      <div className="min-h-screen flex flex-col w-full relative pb-[calc(80px+env(safe-area-inset-bottom))] lg:pb-0">
        <LeavesBackground />
        <Header />
        <main className="flex-1 w-full pt-[90px] min-h-[100vh] relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/news" element={<NewsPage />} />
          </Routes>
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
