import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import newsBg from "../assets/dulich/ninhbinh_slider_1.png";
import img1 from "../assets/dulich/ninhbinh_slider_2.png";
import img2 from "../assets/dulich/blog_hoalu.png";
import img3 from "../assets/dulich/blog_hangmua.png";
import img4 from "../assets/dulich/blog_thuexe.png";
import img5 from "../assets/dulich/ninhbinh_slider_1.png";
import img6 from "../assets/dulich/blog_denui.jpg";

// Mock Data cho Tin tức
const newsData = [
  {
    id: 1,
    title: "Kinh nghiệm du lịch Tràng An - Bái Đính trong 1 ngày",
    excerpt: "Khám phá trọn vẹn vẻ đẹp hùng vĩ của Tràng An và sự linh thiêng của chùa Bái Đính chỉ trong 24 giờ với lịch trình chi tiết này.",
    image: img1,
    date: "12/08/2026",
    author: "Cố Đô Xanh",
    category: "Cẩm nang du lịch",
    featured: true
  },
  {
    id: 2,
    title: "5 Cung đường phượt xe máy đẹp nhất Ninh Bình",
    excerpt: "Thuê một chiếc xe máy và vi vu trên những cung đường uốn lượn quanh những dãy núi đá vôi tuyệt đẹp tại Ninh Bình.",
    image: img2,
    date: "05/08/2026",
    author: "Admin",
    category: "Kinh nghiệm phượt",
    featured: false
  },
  {
    id: 3,
    title: "Ăn gì ở Ninh Bình? Top 10 đặc sản không thể bỏ lỡ",
    excerpt: "Thịt dê núi, cơm cháy, ốc núi... Hãy cùng khám phá bản đồ ẩm thực phong phú của vùng đất cố đô ngàn năm văn hiến.",
    image: img3,
    date: "28/07/2026",
    author: "Cố Đô Xanh",
    category: "Ẩm thực",
    featured: false
  },
  {
    id: 4,
    title: "Lưu ý quan trọng khi thuê xe máy tại Ninh Bình",
    excerpt: "Những kinh nghiệm xương máu giúp bạn thuê được chiếc xe máy chất lượng, giá tốt và tránh bị chặt chém khi du lịch.",
    image: img4,
    date: "15/07/2026",
    author: "Admin",
    category: "Thuê xe",
    featured: false
  },
  {
    id: 5,
    title: "Check-in Hang Múa: Lên đỉnh ngoạn cảnh Tam Cốc",
    excerpt: "Được mệnh danh là Vạn Lý Trường Thành thu nhỏ của Việt Nam, Hang Múa là điểm đến không thể bỏ qua để có bức ảnh sống ảo tuyệt đẹp.",
    image: img5,
    date: "01/07/2026",
    author: "Cố Đô Xanh",
    category: "Điểm đến",
    featured: false
  },
  {
    id: 6,
    title: "Bảo dưỡng dàn xe điện chuẩn bị đón khách dịp Lễ",
    excerpt: "Cố Đô Xanh vừa hoàn tất việc kiểm tra và bảo dưỡng toàn bộ hệ thống xe điện, sẵn sàng phục vụ du khách một cách an toàn nhất.",
    image: img6,
    date: "20/06/2026",
    author: "Thông báo",
    category: "Tin nội bộ",
    featured: false
  }
];

export default function NewsPage() {
  const featuredArticle = newsData.find(n => n.featured) || newsData[0];
  const otherArticles = newsData.filter(n => n.id !== featuredArticle.id);

  return (
    <div className="w-full flex flex-col items-center bg-gray-50/50 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden flex items-center justify-center group">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[15s] ease-out scale-100 group-hover:scale-110"
          style={{ backgroundImage: `url(${newsBg})` }}
        ></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-[#00c461]/40 to-black/80 mix-blend-multiply"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 relative z-10 mt-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 font-display tracking-tight text-center drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
            Tin Tức & Cẩm Nang
          </h1>
          <p className="text-lg md:text-xl font-medium max-w-2xl text-center text-gray-200 drop-shadow-md">
            Khám phá vẻ đẹp Ninh Bình qua lăng kính của Cố Đô Xanh, cùng những mẹo du lịch và thuê xe hữu ích nhất.
          </p>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 relative z-10 pb-20">

        {/* Tin nổi bật (Featured) */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden mb-12 group cursor-pointer animate-fade-in-up">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-[300px] lg:h-[400px] overflow-hidden">
              <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-6 left-6 bg-[#00c461] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-green-500/30">
                Bài Viết Nổi Bật
              </div>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1.5"><Calendar size={16} /> {featuredArticle.date}</span>
                <span className="flex items-center gap-1.5"><User size={16} /> {featuredArticle.author}</span>
                <span className="flex items-center gap-1.5 text-[#009e4e] font-medium"><BookOpen size={16} /> {featuredArticle.category}</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0d1b2a] mb-4 font-display group-hover:text-[#00c461] transition-colors line-clamp-2">
                {featuredArticle.title}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed line-clamp-3 lg:line-clamp-none">
                {featuredArticle.excerpt}
              </p>
              <button className="self-start px-6 py-3 border-2 border-[#00c461] text-[#009e4e] font-bold rounded-xl hover:bg-[#00c461] hover:text-white transition-colors flex items-center gap-2">
                Đọc Tiếp <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Danh sách tin tức */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherArticles.map((article, idx) => (
            <div key={article.id} className={`bg-white rounded-2xl shadow-lg shadow-gray-200/40 border border-gray-100 overflow-hidden group cursor-pointer card-hover animate-fade-in-up delay-${(idx % 3 + 1) * 100}`}>
              <div className="relative h-[220px] overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#009e4e] text-xs font-bold px-3 py-1 rounded-lg">
                  {article.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {article.date}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0d1b2a] mb-3 font-display group-hover:text-[#00c461] transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-[#009e4e] font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  Đọc thêm <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang (Giả) */}
        <div className="mt-16 flex justify-center gap-2">
          <button className="w-10 h-10 rounded-lg flex items-center justify-center font-bold bg-[#00c461] text-white shadow-md shadow-green-500/20">1</button>
          <button className="w-10 h-10 rounded-lg flex items-center justify-center font-bold bg-white text-gray-600 border border-gray-200 hover:border-[#00c461] hover:text-[#00c461] transition-colors">2</button>
          <button className="w-10 h-10 rounded-lg flex items-center justify-center font-bold bg-white text-gray-600 border border-gray-200 hover:border-[#00c461] hover:text-[#00c461] transition-colors">3</button>
          <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
          <button className="w-10 h-10 rounded-lg flex items-center justify-center font-bold bg-white text-gray-600 border border-gray-200 hover:border-[#00c461] hover:text-[#00c461] transition-colors"><ArrowRight size={16} /></button>
        </div>

      </div>
    </div>
  );
}
