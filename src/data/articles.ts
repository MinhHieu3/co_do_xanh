export type Section = { h: string; p: string[] };
export type Lang = { title: string; desc: string; sections: Section[] };
export type Article = {
  slug: string;
  image: string;
  date: string; // ISO
  category: { VI: string; EN: string };
  VI: Lang;
  EN: Lang;
};

export const articles: Article[] = [
  {
    slug: "gia-thue-xe-may-dien-ninh-binh",
    image: "/ebike/img/motorbikes-1100.webp",
    date: "2026-10-10",
    category: { VI: "Giá & thủ tục", EN: "Prices & rules" },
    VI: {
      title: "Giá thuê xe máy điện Ninh Bình mới nhất 2026: bao nhiêu một ngày?",
      desc: "Bảng giá thuê xe máy điện và xe đạp điện Ninh Bình 2026, chi phí phát sinh, so sánh với xe xăng và mẹo thuê xe rẻ mà không lo chất lượng.",
      sections: [
        { h: "Giá thuê xe máy điện ở Ninh Bình hiện nay", p: [
          "Thuê xe máy điện ở Ninh Bình thường có giá từ 130.000đ đến 200.000đ mỗi ngày tùy dòng xe và thời điểm. Tại Xe Cố Đô Xanh, xe máy điện VinFast Evo Lite có giá 150.000đ mỗi 24 giờ, xe đạp điện trợ lực Phoenix có giá 120.000đ mỗi 24 giờ.",
          "Thuê theo giờ phù hợp khi bạn chỉ đi nửa ngày: tối thiểu 2 tiếng, và nếu tổng chi phí chạm mức giá một ngày thì bạn chỉ trả theo giá ngày."] },
        { h: "Giá đã bao gồm những gì?", p: [
          "Một mức giá minh bạch nên gồm mũ bảo hiểm, áo mưa, sạc và giao nhận xe. Hãy hỏi rõ trước khi đặt để không phát sinh phí giao xe, phí đổi pin hay tiền cọc.",
          "Xe máy điện không tốn xăng, một lần sạc đầy đủ cho cả ngày tham quan 30 đến 60 km quanh Tam Cốc, Tràng An và Bích Động."] },
        { h: "So sánh với xe máy xăng", p: [
          "Xe xăng thường rẻ hơn một chút trên giấy tờ nhưng bạn phải tự đổ xăng, tự chịu rủi ro xe cũ, phanh yếu hoặc đồng hồ xăng hỏng. Xe điện mới chạy êm, không khói, không ồn, phù hợp du khách lần đầu đến Ninh Bình."] },
        { h: "Mẹo thuê xe giá tốt", p: [
          "Đặt trước qua website để chủ động xe, thuê từ 2 ngày trở lên để thoải mái lịch trình, và chọn đơn vị giao xe tận khách sạn để tiết kiệm tiền taxi.",
          "Đặt xe tại Xe Cố Đô Xanh chỉ mất vài phút, chưa cần thanh toán trước."] },
      ],
    },
    EN: {
      title: "Electric Motorbike Rental Price in Ninh Binh 2026: How Much Per Day?",
      desc: "Up-to-date 2026 prices for electric motorbike and e-bike rental in Ninh Binh, what is included, and how it compares with a petrol scooter.",
      sections: [
        { h: "What electric motorbike rental costs in Ninh Binh", p: [
          "Renting an electric motorbike in Ninh Binh usually costs between 130,000 and 200,000 VND a day. At Xe Co Do Xanh the VinFast Evo Lite is 150,000 VND per 24 hours and the Phoenix e-bike is 120,000 VND per 24 hours.",
          "Hourly rental suits half-day trips: a minimum of 2 hours, and once the total reaches the day price you simply pay the day price."] },
        { h: "What the price should include", p: [
          "A fair price covers helmets, a raincoat, a charger and delivery. Ask before you book so there are no surprise delivery, battery or deposit fees.",
          "An electric motorbike needs no petrol and one charge easily covers a 30 to 60 km day around Tam Coc, Trang An and Bich Dong."] },
        { h: "Compared with a petrol scooter", p: [
          "A petrol scooter can look slightly cheaper, but you refuel it yourself and risk an old bike with weak brakes or a broken fuel gauge. A new electric bike is quiet, clean and ideal for first-time visitors."] },
        { h: "Tips for a good price", p: [
          "Book ahead online, rent for two days or more for a relaxed itinerary, and choose a shop that delivers to your hotel to save on taxis.",
          "Booking with Xe Co Do Xanh takes a few minutes and you pay nothing upfront."] },
      ],
    },
  },
  {
    slug: "lich-trinh-tam-coc-trang-an-1-ngay",
    image: "/ebike/img/place-trang-an-640.webp",
    date: "2026-10-08",
    category: { VI: "Cẩm nang du lịch", EN: "Travel guide" },
    VI: {
      title: "Lịch trình Tam Cốc, Tràng An, Hang Múa trong 1 ngày bằng xe máy điện",
      desc: "Gợi ý lịch trình 1 ngày khám phá Ninh Bình bằng xe máy điện: Hang Múa, Tam Cốc, Bích Động, Tràng An với thời gian và quãng đường cụ thể.",
      sections: [
        { h: "Sáng sớm: Hang Múa", p: [
          "Xuất phát khoảng 6h30 để lên Hang Múa khi trời còn mát và vắng khách. Gần 500 bậc thang dẫn lên điểm ngắm toàn cảnh thung lũng Tam Cốc, cách trung tâm Tam Cốc khoảng 5 km."] },
        { h: "Cuối buổi sáng: Tam Cốc và Bích Động", p: [
          "Sau Hang Múa, bạn có thể đi thuyền Tam Cốc hoặc ghé chùa Bích Động cách khoảng 3 km. Con đường giữa đầm sen và núi đá vôi là một trong những cung đường đẹp nhất vùng."] },
        { h: "Buổi chiều: Tràng An", p: [
          "Sau bữa trưa, di chuyển khoảng 10 km tới Tràng An, di sản UNESCO. Chuyến thuyền kéo dài khoảng 3 giờ qua các hang động và đền cổ."] },
        { h: "Quãng đường và pin", p: [
          "Toàn bộ lịch trình chỉ khoảng 30 đến 50 km, một lần sạc xe máy điện là đủ. Nếu pin xuống thấp, bạn có thể đổi pin tại các trạm trong thành phố."] },
      ],
    },
    EN: {
      title: "One Day in Tam Coc, Trang An and Mua Cave by Electric Motorbike",
      desc: "A one-day Ninh Binh itinerary by electric motorbike: Mua Cave, Tam Coc, Bich Dong and Trang An with distances and timings.",
      sections: [
        { h: "Early morning: Mua Cave", p: [
          "Set off around 6:30 to climb Mua Cave while it is cool and quiet. Almost 500 steps lead to the view over the Tam Coc valley, about 5 km from central Tam Coc."] },
        { h: "Late morning: Tam Coc and Bich Dong", p: [
          "After Mua Cave, take the Tam Coc boat or visit Bich Dong Pagoda about 3 km away. The road between lotus ponds and limestone is among the prettiest around."] },
        { h: "Afternoon: Trang An", p: [
          "After lunch ride about 10 km to Trang An, a UNESCO site. The boat trip takes about three hours through caves and past old temples."] },
        { h: "Distance and battery", p: [
          "The whole day is only 30 to 50 km, well within one charge. If the battery runs low you can swap it at stations around the city."] },
      ],
    },
  },
  {
    slug: "thue-xe-may-dien-co-can-bang-lai-khong",
    image: "/ebike/img/riders-900.webp",
    date: "2026-10-06",
    category: { VI: "Giá & thủ tục", EN: "Prices & rules" },
    VI: {
      title: "Thuê xe máy điện có cần bằng lái không? Quy định mới nhất",
      desc: "Giải đáp thuê xe máy điện, xe đạp điện ở Ninh Bình có cần bằng lái không, độ tuổi, giấy tờ cần chuẩn bị và lưu ý bảo hiểm du lịch.",
      sections: [
        { h: "Xe máy điện dưới 50 km/h có cần bằng lái?", p: [
          "Các dòng xe máy điện giới hạn tốc độ dưới 50 km/h như VinFast Evo Lite (49 km/h) thường không yêu cầu bằng lái theo quy định dành cho nhóm xe này, với người từ 16 tuổi. Xe đạp điện trợ lực không cần bằng lái."] },
        { h: "Giấy tờ cần chuẩn bị", p: [
          "Bạn chỉ cần một giấy tờ tùy thân có ảnh như căn cước công dân hoặc hộ chiếu. Tại Xe Cố Đô Xanh, hầu hết xe không yêu cầu đặt cọc tiền mặt."] },
        { h: "Lưu ý an toàn và bảo hiểm", p: [
          "Luôn đội mũ bảo hiểm, tuân thủ luật giao thông và không lái xe khi đã uống rượu bia. Hãy kiểm tra bảo hiểm du lịch của bạn có chi trả khi đi xe máy hay không vì mỗi gói quy định khác nhau."] },
        { h: "Người chưa từng đi xe máy", p: [
          "Xe điện chạy tự động, nhẹ và dễ điều khiển. Nếu vẫn lo lắng, xe đạp điện trợ lực là lựa chọn an toàn: biết đi xe đạp là đi được."] },
      ],
    },
    EN: {
      title: "Do You Need a Licence to Rent an Electric Motorbike? Latest Rules",
      desc: "Whether you need a driving licence to rent an electric motorbike or e-bike in Ninh Binh, the age limit, documents and travel insurance tips.",
      sections: [
        { h: "Electric motorbikes under 50 km/h", p: [
          "Electric motorbikes limited to under 50 km/h, such as the VinFast Evo Lite (49 km/h), generally need no licence under the rules for that class, from the age of 16. E-bikes need no licence."] },
        { h: "Documents to bring", p: [
          "You only need a photo ID such as an ID card or passport. At Xe Co Do Xanh most bikes need no cash deposit."] },
        { h: "Safety and insurance", p: [
          "Always wear a helmet, follow traffic law and never ride after drinking. Check whether your travel insurance covers riding, since policies differ."] },
        { h: "Never ridden a motorbike?", p: [
          "Electric bikes are automatic, light and easy to handle. If you are still unsure, the pedal-assist e-bike is the safe choice: if you can ride a bicycle, you can ride it."] },
      ],
    },
  },
  {
    slug: "dia-diem-du-lich-ninh-binh-khoang-cach",
    image: "/ebike/img/place-hoa-lu-640.webp",
    date: "2026-10-04",
    category: { VI: "Điểm đến", EN: "Destinations" },
    VI: {
      title: "Top 6 điểm đến Ninh Bình và khoảng cách từ Tam Cốc",
      desc: "Bích Động, Hang Múa, Thung Nham, Tràng An, Hoa Lư, Bái Đính: khoảng cách từ Tam Cốc và nên đi bằng xe máy điện hay xe đạp điện.",
      sections: [
        { h: "Gần Tam Cốc: Bích Động, Hang Múa, Thung Nham", p: [
          "Chùa Bích Động cách bến thuyền khoảng 3 km, Hang Múa khoảng 5 km, vườn chim Thung Nham khoảng 8 km. Cả ba đều đi thoải mái bằng xe đạp điện hoặc xe máy điện."] },
        { h: "Xa hơn: Tràng An, Hoa Lư, Bái Đính", p: [
          "Tràng An cách khoảng 10 km, cố đô Hoa Lư khoảng 16 km và chùa Bái Đính khoảng 25 km. Với những điểm này, xe máy điện sẽ thoải mái hơn."] },
        { h: "Nên đi xe nào?", p: [
          "Muốn ngắm cảnh chậm rãi quanh làng quê, chọn xe đạp điện. Muốn đi được nhiều nơi trong ngày hoặc đi cùng người thân, chọn xe máy điện chở được hai người."] },
        { h: "Thời điểm đẹp", p: [
          "Hang Múa đẹp nhất lúc sáng sớm hoặc hoàng hôn, vườn chim Thung Nham đẹp vào cuối chiều khi cò và diệc về tổ, Tràng An nên đi trước khi xe du lịch kéo đến."] },
      ],
    },
    EN: {
      title: "Top 6 Ninh Binh Sights and Their Distance From Tam Coc",
      desc: "Bich Dong, Mua Cave, Thung Nham, Trang An, Hoa Lu and Bai Dinh: distances from Tam Coc and whether to ride an e-bike or electric motorbike.",
      sections: [
        { h: "Close to Tam Coc: Bich Dong, Mua Cave, Thung Nham", p: [
          "Bich Dong Pagoda is about 3 km from the boat pier, Mua Cave about 5 km and Thung Nham bird valley about 8 km. All three are easy by e-bike or electric motorbike."] },
        { h: "Further out: Trang An, Hoa Lu, Bai Dinh", p: [
          "Trang An is about 10 km away, the ancient capital Hoa Lu about 16 km and Bai Dinh Pagoda about 25 km. For these the motorbike is more comfortable."] },
        { h: "Which bike?", p: [
          "For slow village lanes choose the e-bike. To see more in one day or ride as a couple, choose the electric motorbike that seats two."] },
        { h: "Best timing", p: [
          "Mua Cave is best early or at sunset, Thung Nham late afternoon when storks and herons return, and Trang An before the tour buses arrive."] },
      ],
    },
  },
];
