import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MousePointerClick, FileCheck, Map, RotateCcw, Shield, Gift, BatteryCharging } from "lucide-react";
import { vehicles } from "../data/vehicles";
import slide1 from "../assets/dulich/ninhbinh_slider_1.png";
import slide2 from "../assets/dulich/ninhbinh_slider_2.png";
import slide3 from "../assets/dulich/blog_hangmua.png";
import slide4 from "../assets/dulich/blog_hoalu.png";
import { useLanguage } from "../context/LanguageContext";

const SLIDER_IMAGES = [
  slide1,
  slide2,
  slide3,
  slide4
];

export default function HomePage() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length);

  return (
    <div className="w-full flex flex-col items-center bg-white/50 backdrop-blur-sm min-h-screen">
      {/* Hero Slider */}
      <div className="relative w-full h-[180px] sm:h-[240px] md:h-[320px] lg:h-[400px] overflow-hidden group">
        {SLIDER_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white backdrop-blur-md text-[#0d1b2a] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md z-20"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white backdrop-blur-md text-[#0d1b2a] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md z-20"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
          {SLIDER_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? "bg-white scale-125 w-8" : "bg-white/60 hover:bg-white"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Vehicle List Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-16 text-[#0d1b2a] font-display tracking-tight">
          {t('home.ourVehicles')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {vehicles.map((vehicle, idx) => (
            <motion.div 
              key={vehicle.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => navigate('/booking', { state: { selectedVehicle: vehicle.id } })}
              className={`relative flex flex-col items-center text-center group cursor-pointer bg-white rounded-2xl p-6 transition-all duration-300 ${
                vehicle.isPopular 
                  ? 'border border-[#009e4e]/40 shadow-[0_15px_50px_rgba(0,196,97,0.12)] -translate-y-2 order-first md:order-none' 
                  : 'shadow-sm border border-gray-100 hover:border-[#009e4e]/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1'
              }`}
            >
              {/* Popular Badge */}
              {vehicle.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#009e4e] to-[#00c461] text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap z-10 flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  {language === 'EN' ? 'Most Popular' : 'Được Ưa Chuộng Nhất'}
                </div>
              )}

              {/* Vehicle Image */}
              <div className="w-full relative pt-[75%] mb-4 transition-all">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className={`absolute inset-0 w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-out p-4 ${
                    vehicle.isPopular 
                      ? 'scale-110 drop-shadow-xl' 
                      : 'drop-shadow-md group-hover:scale-110 group-hover:drop-shadow-2xl'
                  }`}
                />
              </div>

              {/* Vehicle Name */}
              <div className="h-[48px] flex items-center justify-center mb-3 mt-2">
                <h3 className={`font-bold text-[18px] uppercase tracking-wider transition-colors font-display line-clamp-2 ${
                  vehicle.isPopular ? 'text-[#00c461]' : 'text-[#0d1b2a] group-hover:text-[#00c461]'
                }`}>
                  {vehicle.name}
                </h3>
              </div>

              {/* Pricing details */}
              <div className="text-[14px] text-gray-600 py-1 w-full text-center leading-relaxed px-2 font-medium flex items-center justify-center">
                <span className="text-[#009e4e] font-bold text-xl drop-shadow-sm">
                  {language === 'EN' ? vehicle.pricingEn.day1 : vehicle.pricing.day1}
                </span>
              </div>

              {/* Specs: Battery, Accessories & License */}
              <div className="w-full flex flex-col gap-2 mt-3 mb-2 text-left px-1">
                <div className="flex items-start gap-2 text-[13px] text-gray-500">
                  <BatteryCharging size={15} className="text-[#009e4e] shrink-0 mt-0.5" />
                  <span className="line-clamp-2 leading-tight">
                    {language === 'EN' ? vehicle.specsEn["Battery"] : vehicle.specs["Dạng pin"]}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-[13px] text-gray-500">
                  <Gift size={15} className="text-[#009e4e] shrink-0 mt-0.5" />
                  <span className="line-clamp-2 leading-tight">
                    {language === 'EN' ? vehicle.specsEn["Accessories"] : vehicle.specs["Phụ kiện"]}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-[13px] text-gray-500">
                  <Shield size={15} className="text-[#009e4e] shrink-0 mt-0.5" />
                  <span className="line-clamp-2 leading-tight">
                    {language === 'EN' ? vehicle.specsEn["License"] : vehicle.specs["Bằng lái"]}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full mt-4 flex justify-center">
                <Link 
                  to="/booking" 
                  state={{ selectedVehicle: vehicle.id }}
                  className={`inline-flex items-center justify-center w-full gap-2 px-6 py-3 rounded-xl font-bold text-[14px] uppercase tracking-wider transition-all duration-300 shadow-sm ${
                    vehicle.isPopular 
                      ? 'bg-[#00c461] text-white shadow-md hover:bg-[#009e4e]' 
                      : 'bg-gray-50 text-[#0d1b2a] group-hover:bg-[#00c461] group-hover:text-white group-hover:shadow-md'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>{t('home.bookVehicleBtn')}</span>
                  <ChevronRight size={16} strokeWidth={2.5} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Rental Process Section */}
      <div className="w-full bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16 text-[#0d1b2a] font-display tracking-tight">
            {t('home.howItWorks')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-10 lg:gap-12 relative pt-6 md:pt-0">
            {/* Connecting Line for Desktop */}
            <div className="hidden lg:block absolute top-[4.5rem] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0"></div>

            {[
              { num: 1, icon: MousePointerClick, titleKey: 'home.step1', descKey: 'home.step1Desc' },
              { num: 2, icon: FileCheck, titleKey: 'home.step2', descKey: 'home.step2Desc' },
              { num: 3, icon: Map, titleKey: 'home.step3', descKey: 'home.step3Desc' },
              { num: 4, icon: RotateCcw, titleKey: 'home.step4', descKey: 'home.step4Desc' }
            ].map((step, idx) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="flex flex-col items-center text-center relative z-10 group"
              >
                <div className="text-[100px] md:text-[120px] font-black text-gray-50 absolute -top-14 md:-top-20 -z-10 transition-transform duration-500 group-hover:-translate-y-2 select-none leading-none">
                  {step.num}
                </div>
                <div className="w-[80px] h-[80px] md:w-[90px] md:h-[90px] bg-white rounded-full shadow-xl shadow-gray-200/50 flex items-center justify-center mb-6 md:mb-8 border border-gray-100 group-hover:border-[#00c461] transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-[#00c461]/20">
                  <step.icon size={32} className="text-[#0d1b2a] group-hover:text-[#00c461] md:w-9 md:h-9 transition-colors" />
                </div>
                <h3 className="text-[#0d1b2a] font-bold text-[16px] md:text-[17px] mb-3 md:mb-4 uppercase tracking-wider font-display group-hover:text-[#00c461] transition-colors">
                  {t(step.titleKey)}
                </h3>
                <p className="text-gray-500 text-[14px] md:text-[15px] leading-relaxed max-w-[260px]">
                  {t(step.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
