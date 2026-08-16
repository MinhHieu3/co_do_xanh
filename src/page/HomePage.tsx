import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MousePointerClick, FileCheck, Map, RotateCcw } from "lucide-react";
import { vehicles } from "../data/vehicles";
import slide1 from "../assets/dulich/ninhbinh_slider_1.png";
import slide2 from "../assets/dulich/ninhbinh_slider_2.png";

const SLIDER_IMAGES = [
  slide1,
  slide2
];

export default function HomePage() {
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
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white backdrop-blur-md text-[#0d1b2a] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white backdrop-blur-md text-[#0d1b2a] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5">
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
          Tất cả xe máy
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="flex flex-col items-center text-center group cursor-pointer">
              {/* Vehicle Image */}
              <div className="w-full relative pt-[75%] mb-6 bg-transparent">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.15] drop-shadow-lg group-hover:drop-shadow-2xl"
                />
              </div>

              {/* Vehicle Name */}
              <h3 className="text-[#e33527] font-bold text-[17px] mb-3 uppercase tracking-wider group-hover:text-red-700 transition-colors font-display">
                {vehicle.name}
              </h3>

              {/* Pricing details */}
              <div className="text-[14px] text-gray-700 font-medium space-x-1 leading-relaxed max-w-[250px]">
                <span>{vehicle.pricing.day1} -</span>
                <span>{vehicle.pricing.day2} -</span>
                <span>{vehicle.pricing.day3} -</span>
                <span>{vehicle.pricing.day4}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rental Process Section */}
      <div className="w-full bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16 text-[#0d1b2a] font-display tracking-tight">
            Quy Trình Cho Thuê
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-10 lg:gap-12 relative pt-6 md:pt-0">
            {/* Connecting Line for Desktop */}
            <div className="hidden lg:block absolute top-[4.5rem] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative z-10 group">
              <div className="text-[100px] md:text-[120px] font-black text-gray-50 absolute -top-14 md:-top-20 -z-10 transition-transform duration-500 group-hover:-translate-y-2 select-none leading-none">1</div>
              <div className="w-[80px] h-[80px] md:w-[90px] md:h-[90px] bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-gray-200/50 flex items-center justify-center mb-6 md:mb-8 border border-gray-100 group-hover:border-red-500 transition-all duration-300 transform group-hover:-translate-y-2 rotate-3 group-hover:rotate-0">
                <MousePointerClick size={32} className="text-[#e33527] md:w-9 md:h-9" />
              </div>
              <h3 className="text-[#e33527] font-bold text-[16px] md:text-[17px] mb-3 md:mb-4 uppercase tracking-wider font-display">Chọn xe và gọi xe</h3>
              <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed max-w-[260px]">
                Xem xe và chọn xe yêu thích trên trang, đặt xe hoặc liên hệ trực tiếp số hotline <span className="font-bold text-[#0d1b2a]">0866399986</span> để đặt xe.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative z-10 group">
              <div className="text-[100px] md:text-[120px] font-black text-gray-50 absolute -top-14 md:-top-20 -z-10 transition-transform duration-500 group-hover:-translate-y-2 select-none leading-none">2</div>
              <div className="w-[80px] h-[80px] md:w-[90px] md:h-[90px] bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-gray-200/50 flex items-center justify-center mb-6 md:mb-8 border border-gray-100 group-hover:border-red-500 transition-all duration-300 transform group-hover:-translate-y-2 -rotate-3 group-hover:rotate-0">
                <FileCheck size={32} className="text-[#e33527] md:w-9 md:h-9" />
              </div>
              <h3 className="text-[#e33527] font-bold text-[16px] md:text-[17px] mb-3 md:mb-4 uppercase tracking-wider font-display">Thủ tục nhận xe</h3>
              <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed max-w-[260px]">
                Giao xe tận nơi hoặc nhận tại cửa hàng. Bạn chỉ cần cung cấp CCCD/GPLX, thanh toán tiền thuê và một khoản cọc nhỏ.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative z-10 group">
              <div className="text-[100px] md:text-[120px] font-black text-gray-50 absolute -top-14 md:-top-20 -z-10 transition-transform duration-500 group-hover:-translate-y-2 select-none leading-none">3</div>
              <div className="w-[80px] h-[80px] md:w-[90px] md:h-[90px] bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-gray-200/50 flex items-center justify-center mb-6 md:mb-8 border border-gray-100 group-hover:border-red-500 transition-all duration-300 transform group-hover:-translate-y-2 rotate-3 group-hover:rotate-0">
                <Map size={32} className="text-[#e33527] md:w-9 md:h-9" />
              </div>
              <h3 className="text-[#e33527] font-bold text-[16px] md:text-[17px] mb-3 md:mb-4 uppercase tracking-wider font-display">Tận hưởng chuyến đi</h3>
              <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed max-w-[260px]">
                Xe luôn được kiểm tra kỹ, sạc đầy pin. Thoải mái tham khảo lộ trình, điều khiển xe an toàn và tận hưởng chuyến du lịch.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center relative z-10 group">
              <div className="text-[100px] md:text-[120px] font-black text-gray-50 absolute -top-14 md:-top-20 -z-10 transition-transform duration-500 group-hover:-translate-y-2 select-none leading-none">4</div>
              <div className="w-[80px] h-[80px] md:w-[90px] md:h-[90px] bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-gray-200/50 flex items-center justify-center mb-6 md:mb-8 border border-gray-100 group-hover:border-red-500 transition-all duration-300 transform group-hover:-translate-y-2 -rotate-3 group-hover:rotate-0">
                <RotateCcw size={32} className="text-[#e33527] md:w-9 md:h-9" />
              </div>
              <h3 className="text-[#e33527] font-bold text-[16px] md:text-[17px] mb-3 md:mb-4 uppercase tracking-wider font-display">Trả xe đã thuê</h3>
              <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed max-w-[260px]">
                Nhân viên sẽ đến nhận xe tận nơi hoặc bạn tự mang đến cửa hàng (trực 24/7). Nhận lại đầy đủ tiền cọc sau khi kiểm tra xe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
