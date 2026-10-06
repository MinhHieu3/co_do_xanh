import { Calendar, User, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useEffect } from "react";
import imgCover from "../assets/dulich/ninhbinh_slider_1.png";
import imgEvo from "../assets/image/vinfast_evo.jpg";
import imgFeliz from "../assets/image/Vinfast Feliz II.webp";

export default function KinhNghiemThueXe() {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    const title = language === 'EN' 
      ? 'Guide to Renting Electric Motorbikes in Ninh Binh | Xe Cố Đô Xanh' 
      : 'Kinh Nghiệm Thuê Xe Máy Điện Ninh Bình | Xe Cố Đô Xanh';
    
    const description = language === 'EN'
      ? 'Detailed guide to renting electric motorbikes in Ninh Binh. Explore Trang An, Mua Cave with our premium fleet. Save money and protect the environment.'
      : 'Kinh nghiệm thuê xe máy điện tại Ninh Bình chi tiết nhất. Khám phá Tràng An, Hang Múa với dàn xe Vinfast đời mới. Tiết kiệm chi phí, bảo vệ môi trường.';

    document.title = title;

    // Cập nhật Meta Description (Rất quan trọng cho Google)
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    // Cập nhật Open Graph (Cho chia sẻ mạng xã hội)
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Tiêm dữ liệu cấu trúc BlogPosting Schema cho Google
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://xecodoxanh.com/news/kinh-nghiem-thue-xe-may-dien-ninh-binh"
      },
      "headline": title,
      "description": description,
      "image": "https://xecodoxanh.com/og-image.png",  
      "author": {
        "@type": "Organization",
        "name": "Xe Cố Đô Xanh"
      },  
      "publisher": {
        "@type": "Organization",
        "name": "Xe Cố Đô Xanh",
        "logo": {
          "@type": "ImageObject",
          "url": "https://xecodoxanh.com/og-image.png"
        }
      },
      "datePublished": "2026-10-06",
      "dateModified": "2026-10-06"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      // Dọn dẹp schema script khi rời khỏi trang để tránh trùng lặp
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [language]);

  if (language === 'EN') {
    return (
      <div className="w-full bg-white min-h-screen pt-4 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/news" className="inline-flex items-center text-[#14b8a6] hover:text-[#0d9488] font-medium mb-8 transition-colors">
            <ArrowLeft size={20} className="mr-2" /> Back to News
          </Link>

          <article>
            <header className="mb-10 text-center">
              <h1 className="text-3xl md:text-5xl font-black text-[#0d1b2a] mb-6 leading-tight font-display">
                Guide to Renting Electric Motorbikes in Ninh Binh: Green Travel & Savings
              </h1>
              <div className="flex items-center justify-center gap-6 text-gray-500 font-medium">
                <span className="flex items-center gap-2"><Calendar size={18} /> October 06, 2026</span>
                <span className="flex items-center gap-2"><User size={18} /> Xe Cố Đô Xanh</span>
              </div>
            </header>

            <img src={imgCover} alt="Electric Motorbike Rental in Ninh Binh" className="w-full h-[300px] md:h-[500px] object-cover rounded-3xl shadow-xl mb-12" />

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-xl font-medium text-gray-600 mb-8">
                Ninh Binh always captivates tourists with the majestic beauty of Trang An, Tam Coc, and Mua Cave. To fully explore every corner of the ancient capital, motorbikes are the number one choice. But instead of noisy and expensive gasoline motorbikes, the new trend is <strong>renting electric motorbikes in Ninh Binh</strong>.
              </p>

              <h2 className="text-2xl font-bold text-[#0d1b2a] mt-12 mb-6">1. Why Choose Electric Motorbikes in Ninh Binh?</h2>
              
              <h3 className="text-xl font-bold text-[#0d9488] mt-8 mb-4">Save on High Gas Costs</h3>
              <p>
                Instead of searching for gas stations and worrying about fluctuating gas prices, electric motorbikes save you a significant amount. With just a full charge or one battery swap, you can cruise up to 80km – more than enough to visit famous tourist spots in Ninh Binh in a day.
              </p>

              <h3 className="text-xl font-bold text-[#0d9488] mt-8 mb-4">Smooth and Quiet Experience</h3>
              <p>
                Ninh Binh is a peaceful place to immerse yourself in nature. It's wonderful to glide on tree-lined roads in Van Long wetland or Trang An without hearing roaring engines. Electric motorbikes operate extremely smoothly, bringing you ultimate relaxation.
              </p>

              <div className="my-10 bg-[#f2fdf5] border-l-4 border-[#14b8a6] p-6 rounded-r-2xl">
                <p className="font-bold text-[#0d1b2a] m-0">Protecting the "Green Ancient Capital"</p>
                <p className="m-0 mt-2 text-gray-600">Using electric motorbikes means you are directly reducing emissions, preserving the fresh air for the World Heritage Site. This is a civilized and sustainable way to travel.</p>
              </div>

              <h2 className="text-2xl font-bold text-[#0d1b2a] mt-12 mb-6">2. Suggested 1-Day Itinerary by Electric Motorbike</h2>
              <ul className="space-y-4 mb-8 list-none pl-0">
                <li className="flex items-start gap-3"><CheckCircle2 className="text-[#14b8a6] shrink-0 mt-1" /> <span><strong>Morning:</strong> Depart from the city center to Trang An. Enjoy the scenery of boat docks and caves.</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-[#14b8a6] shrink-0 mt-1" /> <span><strong>Noon:</strong> Move to Tuyet Tinh Coc nearby to check-in, rest, and have lunch with mountain goat specialties.</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-[#14b8a6] shrink-0 mt-1" /> <span><strong>Afternoon:</strong> Ride to Mua Cave to climb the mountain and see the panoramic view of Tam Coc rice fields at sunset.</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-[#14b8a6] shrink-0 mt-1" /> <span><strong>Evening:</strong> Leisurely ride back to the city center, finishing a perfect day with battery still to spare.</span></li>
              </ul>

              <h2 className="text-2xl font-bold text-[#0d1b2a] mt-12 mb-6">3. Xe Cố Đô Xanh - The Best Electric Motorbike Rental in Ninh Binh</h2>
              <p>If you are looking for a high-quality rental place with dedicated service, <strong>Xe Cố Đô Xanh</strong> is the top choice.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                <img src={imgEvo} alt="Vinfast Evo" className="w-full h-64 object-contain bg-gray-50 rounded-2xl p-4 border border-gray-100" />
                <img src={imgFeliz} alt="Vinfast Feliz II" className="w-full h-64 object-contain bg-gray-50 rounded-2xl p-4 border border-gray-100" />
              </div>

              <ul className="space-y-4 mb-12 list-none pl-0">
                <li className="flex items-start gap-3"><CheckCircle2 className="text-[#14b8a6] shrink-0 mt-1" /> <span><strong>100% Modern Vinfast Fleet:</strong> We own Vinfast Evo 200 and Feliz II with trendy designs and spacious trunks.</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-[#14b8a6] shrink-0 mt-1" /> <span><strong>No License Required (Evo Lite):</strong> Are you an international tourist without a Vietnamese driver's license? The Evo Lite is a perfect, legal, and safe solution.</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-[#14b8a6] shrink-0 mt-1" /> <span><strong>Reasonable Prices:</strong> From only $6/day or $4/5hours.</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-[#14b8a6] shrink-0 mt-1" /> <span><strong>Fully Equipped:</strong> Each bike comes with 2 helmets, raincoats, and a charger.</span></li>
              </ul>

              <div className="text-center mt-12">
                <Link to="/booking" className="inline-flex items-center justify-center px-8 py-4 bg-[#14b8a6] text-white font-bold rounded-full text-lg shadow-xl shadow-teal-500/30 hover:-translate-y-1 transition-transform">
                  Book Your Vehicle Now
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  // Vietnamese Version
  return (
    <div className="w-full bg-white min-h-screen pt-4 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/news" className="inline-flex items-center text-[#14b8a6] hover:text-[#0d9488] font-medium mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" /> Quay lại Tin Tức
        </Link>

        <article>
          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-5xl font-black text-[#0d1b2a] mb-6 leading-tight font-display">
              Kinh Nghiệm Thuê Xe Máy Điện Ninh Bình: Vi Vu Cố Đô Xanh, Tiết Kiệm & Thân Thiện Môi Trường
            </h1>
            <div className="flex items-center justify-center gap-6 text-gray-500 font-medium">
              <span className="flex items-center gap-2"><Calendar size={18} /> 06 Tháng 10, 2026</span>
              <span className="flex items-center gap-2"><User size={18} /> Xe Cố Đô Xanh</span>
            </div>
          </header>

          <img src={imgCover} alt="Thuê xe máy điện Ninh Bình" className="w-full h-[300px] md:h-[500px] object-cover rounded-3xl shadow-xl mb-12" />

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-xl font-medium text-gray-600 mb-8">
              Ninh Bình luôn làm say lòng du khách bởi vẻ đẹp non nước hữu tình của Tràng An, Tam Cốc hay sự hùng vĩ của Hang Múa. Để khám phá trọn vẹn từng ngóc ngách của vùng đất cố đô, xe máy luôn là lựa chọn số 1. Nhưng thay vì những chiếc xe xăng ồn ào và tốn kém, xu hướng mới của giới trẻ hiện nay chính là <strong>thuê xe máy điện Ninh Bình</strong>.
            </p>

            <h2 className="text-2xl font-bold text-[#0d1b2a] mt-12 mb-6">1. Tại sao nên chọn thuê xe máy điện khi du lịch Ninh Bình?</h2>
            
            <h3 className="text-xl font-bold text-[#0d9488] mt-8 mb-4">Tiết kiệm chi phí đổ xăng đắt đỏ</h3>
            <p>
              Thay vì phải loay hoay tìm cây xăng và đau đầu vì giá xăng lên xuống thất thường, xe máy điện giúp bạn tiết kiệm được một khoản chi phí đáng kể. Chỉ với 1 lần sạc đầy hoặc 1 lần đổi pin, bạn đã có thể vi vu quãng đường lên tới 80km – quá dư dả để đi qua các điểm du lịch nổi tiếng ở Ninh Bình trong ngày.
            </p>

            <h3 className="text-xl font-bold text-[#0d9488] mt-8 mb-4">Trải nghiệm di chuyển êm ái, không tiếng ồn</h3>
            <p>
              Ninh Bình là chốn thanh tịnh, nơi bạn hòa mình vào thiên nhiên. Sẽ thật tuyệt vời khi lướt đi trên con đường rợp bóng cây ở đầm Vân Long hay Tràng An mà không phải nghe tiếng động cơ gầm rú. Xe máy điện vận hành cực kỳ êm ái, mang lại cho bạn cảm giác thư giãn tuyệt đối.
            </p>

            <div className="my-10 bg-[#f2fdf5] border-l-4 border-[#14b8a6] p-6 rounded-r-2xl">
              <p className="font-bold text-[#0d1b2a] m-0">Bảo vệ môi trường "Cố Đô Xanh"</p>
              <p className="m-0 mt-2 text-gray-600">Đúng như tên gọi Xe Cố Đô Xanh, việc sử dụng xe máy điện đồng nghĩa với việc bạn đang trực tiếp giảm thiểu lượng khí thải, giữ gìn bầu không khí trong lành cho Quần thể Di sản Thế giới. Đây là cách du lịch văn minh, bền vững đang được cộng đồng quốc tế cực kỳ ủng hộ.</p>
            </div>

            <h2 className="text-2xl font-bold text-[#0d1b2a] mt-12 mb-6">2. Gợi ý lịch trình vi vu Ninh Bình bằng xe máy điện trong ngày</h2>
            <ul className="space-y-4 mb-8 list-none pl-0">
              <li className="flex items-start gap-3"><CheckCircle2 className="text-[#14b8a6] shrink-0 mt-1" /> <span><strong>Buổi sáng:</strong> Xuất phát từ trung tâm thành phố đi Tràng An. Thưởng ngoạn cảnh sắc bến thuyền và các hang động.</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-[#14b8a6] shrink-0 mt-1" /> <span><strong>Trưa:</strong> Di chuyển qua Tuyệt Tình Cốc ngay gần đó để check-in và nghỉ ngơi, ăn trưa với đặc sản dê núi.</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-[#14b8a6] shrink-0 mt-1" /> <span><strong>Chiều:</strong> Chạy xe tới Hang Múa để leo núi, ngắm trọn vẹn cánh đồng lúa Tam Cốc từ trên cao vào khoảnh khắc hoàng hôn.</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-[#14b8a6] shrink-0 mt-1" /> <span><strong>Tối:</strong> Thong thả đi xe về lại trung tâm thành phố, kết thúc một ngày trọn vẹn mà xe vẫn còn dư pin.</span></li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0d1b2a] mt-12 mb-6">3. Xe Cố Đô Xanh - Địa chỉ cho thuê xe máy điện Ninh Bình uy tín số 1</h2>
            <p>Nếu bạn đang tìm kiếm một nơi thuê xe chất lượng cao, dịch vụ tận tâm thì <strong>Xe Cố Đô Xanh</strong> chính là sự lựa chọn hàng đầu.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
              <img src={imgEvo} alt="Vinfast Evo" className="w-full h-64 object-contain bg-gray-50 rounded-2xl p-4 border border-gray-100" />
              <img src={imgFeliz} alt="Vinfast Feliz II" className="w-full h-64 object-contain bg-gray-50 rounded-2xl p-4 border border-gray-100" />
            </div>

            <ul className="space-y-4 mb-12 list-none pl-0">
              <li className="flex items-start gap-3"><CheckCircle2 className="text-[#14b8a6] shrink-0 mt-1" /> <span><strong>100% Xe Vinfast đời mới:</strong> Cửa hàng sở hữu dàn xe Vinfast Evo 200, Vinfast Feliz II thiết kế thời trang, cốp rộng.</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-[#14b8a6] shrink-0 mt-1" /> <span><strong>Không cần bằng lái (với dòng xe Evo Lite):</strong> Bạn là học sinh, sinh viên hoặc du khách quốc tế? Dòng xe Evo Lite chính là giải pháp hoàn hảo.</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-[#14b8a6] shrink-0 mt-1" /> <span><strong>Giá thuê cực kỳ hợp lý:</strong> Chỉ từ 150.000đ/ 24h hoặc 100.000đ/ 5h (đã bao gồm sạc pin).</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-[#14b8a6] shrink-0 mt-1" /> <span><strong>Trang bị đầy đủ phụ kiện:</strong> Mỗi xe đều được trang bị sẵn 2 mũ bảo hiểm chất lượng, áo mưa và bộ sạc pin.</span></li>
            </ul>

            <div className="text-center mt-12">
              <Link to="/booking" className="inline-flex items-center justify-center px-8 py-4 bg-[#14b8a6] text-white font-bold rounded-full text-lg shadow-xl shadow-teal-500/30 hover:-translate-y-1 transition-transform">
                Đặt Xe Trực Tuyến Ngay
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
