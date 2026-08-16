import { Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import HomePage from "./page/HomePage";
import BookingPage from "./page/BookingPage";
import PricingPage from "./page/PricingPage";
import ContactPage from "./page/ContactPage";
import LeavesBackground from "./component/LeavesBackground";

function App() {
  return (
    <div className="min-h-screen flex flex-col w-full relative">
      <LeavesBackground />
      <Header />
      <main className="flex-1 w-full pt-[90px] min-h-[100vh] relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dat-xe" element={<BookingPage />} />
          <Route path="/bang-gia" element={<PricingPage />} />
          <Route path="/lien-he" element={<ContactPage />} />
        </Routes>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
