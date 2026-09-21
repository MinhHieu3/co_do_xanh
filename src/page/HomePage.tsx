import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MousePointerClick, FileCheck, Map, RotateCcw, Shield, Gift, BatteryCharging, ChevronRight } from "lucide-react";
import { vehicles } from "../data/vehicles";
import HeroSlider from "../component/HeroSlider";
import { useLanguage } from "../context/LanguageContext";

export default function HomePage() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center bg-white/50 backdrop-blur-sm min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Vehicle List Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-16 text-[#0d1b2a] font-display tracking-tight">
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
                  ? 'border border-[#0d9488]/40 shadow-[0_15px_50px_rgba(0,196,97,0.12)] -translate-y-2 order-first md:order-none' 
                  : 'shadow-sm border border-gray-100 hover:border-[#0d9488]/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1'
              }`}
            >
              {/* Popular Badge */}
              {vehicle.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap z-10 flex items-center gap-1.5 uppercase tracking-wider">
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
                  vehicle.isPopular ? 'text-[#14b8a6]' : 'text-[#0d1b2a] group-hover:text-[#14b8a6]'
                }`}>
                  {(language === 'EN' && vehicle.nameEn) ? vehicle.nameEn : vehicle.name}
                </h3>
              </div>

              {/* Pricing details */}
              <div className="text-[14px] text-gray-600 py-1 w-full text-center leading-relaxed px-2 font-medium flex items-center justify-center">
                <span className="text-[#0d9488] font-bold text-xl drop-shadow-sm">
                  {language === 'EN' ? vehicle.pricingEn.day1 : vehicle.pricing.day1}
                </span>
              </div>

              {/* Specs: Battery, Accessories & License */}
              <div className="w-full flex flex-col gap-2 mt-3 mb-2 text-left px-1">
                <div className="flex items-start gap-2 text-[13px] text-gray-500">
                  <BatteryCharging size={15} className="text-[#0d9488] shrink-0 mt-0.5" />
                  <span className="line-clamp-2 leading-tight">
                    {language === 'EN' ? vehicle.specsEn["Battery"] : vehicle.specs["Dạng pin"]}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-[13px] text-gray-500">
                  <Gift size={15} className="text-[#0d9488] shrink-0 mt-0.5" />
                  <span className="line-clamp-2 leading-tight">
                    {language === 'EN' ? vehicle.specsEn["Accessories"] : vehicle.specs["Phụ kiện"]}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-[13px] text-gray-500">
                  <Shield size={15} className="text-[#0d9488] shrink-0 mt-0.5" />
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
                      ? 'bg-[#14b8a6] text-white shadow-md hover:bg-[#0d9488]' 
                      : 'bg-gray-50 text-[#0d1b2a] group-hover:bg-[#14b8a6] group-hover:text-white group-hover:shadow-md'
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
          <h2 className="text-2xl md:text-3xl font-black text-center mb-16 text-[#0d1b2a] font-display tracking-tight">
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
                <div className="w-[80px] h-[80px] md:w-[90px] md:h-[90px] bg-white rounded-full shadow-xl shadow-gray-200/50 flex items-center justify-center mb-6 md:mb-8 border border-gray-100 group-hover:border-[#14b8a6] transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-[#14b8a6]/20">
                  <step.icon size={32} className="text-[#0d1b2a] group-hover:text-[#14b8a6] md:w-9 md:h-9 transition-colors" />
                </div>
                <h3 className="text-[#0d1b2a] font-bold text-[16px] md:text-[17px] mb-3 md:mb-4 uppercase tracking-wider font-display group-hover:text-[#14b8a6] transition-colors">
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
