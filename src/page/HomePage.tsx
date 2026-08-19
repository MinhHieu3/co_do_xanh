import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MousePointerClick, FileCheck, Map, RotateCcw } from "lucide-react";
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {vehicles.map((vehicle, idx) => (
            <motion.div 
              key={vehicle.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => navigate('/booking', { state: { selectedVehicle: vehicle.id } })}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Vehicle Image */}
              <div className="w-full relative pt-[75%] mb-6 bg-transparent">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-md group-hover:drop-shadow-2xl"
                />
              </div>

              {/* Vehicle Name */}
              <div className="h-[48px] flex items-center justify-center mb-3">
                <h3 className="text-[#e33527] font-bold text-[17px] uppercase tracking-wider group-hover:text-[#00c461] transition-colors font-display line-clamp-2">
                  {vehicle.name}
                </h3>
              </div>

              {/* Pricing details */}
              <div className="text-[14px] text-gray-800 py-2 w-full text-center leading-relaxed px-2 font-medium">
                {language === 'EN' ? vehicle.pricingEn.day1 : vehicle.pricing.day1} - {language === 'EN' ? vehicle.pricingEn.day2 : vehicle.pricing.day2} - {language === 'EN' ? vehicle.pricingEn.day3 : vehicle.pricing.day3} - {language === 'EN' ? vehicle.pricingEn.day4 : vehicle.pricing.day4}
              </div>

              {/* Action Button */}
              <div className="w-full mt-3 flex justify-center">
                <Link 
                  to="/booking" 
                  state={{ selectedVehicle: vehicle.id }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[#0d1b2a] group-hover:text-[#009e4e] font-bold text-[13px] uppercase tracking-wider transition-all duration-300 relative overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="relative z-10">{t('home.bookVehicleBtn')}</span>
                  <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-[#e6fff2] flex items-center justify-center transition-colors">
                    <ChevronRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
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
