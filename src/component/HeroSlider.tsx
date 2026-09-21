import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import slide1 from "../assets/dulich/ninhbinh_slider_1.png";
import slide2 from "../assets/dulich/ninhbinh_slider_2.png";
import slide3 from "../assets/dulich/blog_hangmua.png";
import slide4 from "../assets/dulich/blog_hoalu.png";

const SLIDER_IMAGES = [
  slide1,
  slide2,
  slide3,
  slide4
];

export default function HeroSlider() {
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
  );
}
