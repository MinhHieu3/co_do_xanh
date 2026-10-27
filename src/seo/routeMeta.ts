import { articles } from "../data/articles";
import { ebikeContent } from "../data/ebikeContent";
import { vehicles } from "../data/vehicles";
import { BUSINESS } from "../data/business";

/** "150.000đ/ngày" -> 150000 */
const toVnd = (s: string) => Number(s.replace(/[^\d]/g, "")) || undefined;

const TITLES: Record<string, [string, string]> = {
  "/": ["Thuê Xe Máy Điện Ninh Bình, Hoa Lư | Xe Cố Đô Xanh", "Electric Motorbike Rental Ninh Binh | Xe Cố Đô Xanh"],
  "/index-en.html": ["Thuê Xe Máy Điện Ninh Bình, Hoa Lư | Xe Cố Đô Xanh", "Electric Motorbike Rental Ninh Binh | Xe Cố Đô Xanh"],
  "/booking": ["Đặt Thuê Xe Máy Điện Ninh Bình Online | Xe Cố Đô Xanh", "Book Electric Motorbike Ninh Binh | Xe Cố Đô Xanh"],
  "/pricing": ["Giá Thuê Xe Máy Điện Ninh Bình 1 Ngày | Xe Cố Đô Xanh", "Electric Motorbike Rental Prices Ninh Binh | Xe Cố Đô Xanh"],
  "/contact": ["Liên hệ Thuê Xe Máy Điện Ninh Bình | Xe Cố Đô Xanh", "Contact – Electric Motorbike Rental Ninh Binh | Xe Cố Đô Xanh"],
  "/news": ["Cẩm nang Thuê Xe Máy Điện Ninh Bình | Xe Cố Đô Xanh", "Electric Motorbike Rental Ninh Binh – Travel Guides | Xe Cố Đô Xanh"],
  "/faq": ["Câu hỏi khi Thuê Xe Máy Điện Ninh Bình | Xe Cố Đô Xanh", "FAQ – Renting an Electric Motorbike in Ninh Binh | Xe Cố Đô Xanh"],
  "/policy": ["Chính sách Thuê Xe Máy Điện Ninh Bình | Xe Cố Đô Xanh", "Electric Motorbike Rental Policy Ninh Binh | Xe Cố Đô Xanh"],
  "/privacy": ["Chính sách bảo mật | Xe Cố Đô Xanh", "Privacy Policy | Xe Cố Đô Xanh"],
  "/news/kinh-nghiem-thue-xe-may-dien-ninh-binh": ["Kinh nghiệm thuê xe máy điện Ninh Bình | Xe Cố Đô Xanh", "Electric Motorbike Rental Guide Ninh Binh | Xe Cố Đô Xanh"],
};

const DESCRIPTIONS: Record<string, [string, string]> = {
  "/": ["Thuê xe máy điện Ninh Bình từ 120.000đ/ngày: VinFast Evo, Evo Lite, Feliz II và xe đạp điện. Giao xe tận khách sạn ở Hoa Lư, Tam Cốc, Tràng An.", "Rent an electric motorbike in Ninh Binh from 120,000 VND/day. VinFast Evo, Evo Lite, Feliz II and e-bikes, delivered to your hotel in Hoa Lu, Tam Coc or Trang An."],
  "/index-en.html": ["Thuê xe máy điện Ninh Bình từ 120.000đ/ngày: VinFast Evo, Evo Lite, Feliz II và xe đạp điện. Giao xe tận khách sạn ở Hoa Lư, Tam Cốc, Tràng An.", "Rent an electric motorbike in Ninh Binh from 120,000 VND/day. VinFast Evo, Evo Lite, Feliz II and e-bikes, delivered to your hotel in Hoa Lu, Tam Coc or Trang An."],
  "/booking": ["Chọn xe, ngày thuê và gửi yêu cầu đặt xe máy điện tại Ninh Bình trong vài phút. Giao xe tận khách sạn, không cần đặt cọc.", "Choose your electric motorbike, rental dates and location. We deliver to your hotel in Ninh Binh. No deposit, pay on delivery."],
  "/pricing": ["Bảng giá thuê xe máy điện Ninh Bình: 150.000đ/ngày, xe đạp điện 120.000đ/ngày. Bảo gồm mũ bảo hiểm, áo mưa, sạc. Không phí giao xe.", "Electric motorbike rental prices in Ninh Binh: from 120,000 VND/day. Includes helmets, raincoats and charger. Free delivery to your hotel."],
  "/contact": ["Liên hệ Xe Cố Đô Xanh để thuê xe máy điện tại Ninh Bình. Gọi hotline, gửi tin nhắn hoặc ghé 61 ngõ 281 Đinh Tiên Hoàng; hỗ trợ hằng ngày từ 07:00 đến 22:00.", "Contact Xe Co Do Xanh to rent an electric motorbike in Ninh Binh. Call, message or visit 61 Alley 281 Dinh Tien Hoang. Open daily 07:00\u201322:00."],
  "/news": ["Cẩm nang thuê xe máy điện Ninh Bình: lịch trình, giá thuê và kinh nghiệm khám phá các điểm du lịch.", "Electric motorbike rental guides for Ninh Binh: routes, prices and travel tips for Tam Coc, Trang An and Hoa Lu."],
  "/faq": ["Câu hỏi thường gặp khi thuê xe máy điện Ninh Bình: bằng lái, hộ chiếu, giao xe, pin và hủy đặt xe.", "Answers to common questions about renting an electric motorbike in Ninh Binh: licence, passport, delivery, battery and cancellation."],
  "/policy": ["Chính sách và điều kiện thuê xe máy điện tại Xe Cố Đô Xanh, Ninh Bình.", "Terms and conditions for renting an electric motorbike with Xe Co Do Xanh in Ninh Binh."],
  "/privacy": ["Thông tin về cách Xe Cố Đô Xanh xử lý dữ liệu cá nhân.", "Learn how Xe Co Do Xanh handles personal information."],
};

export type RouteMeta = { title: string; description: string; canonical: string; schemas: object[] };

/** Metadata cho một route. Dùng chung cho trình duyệt (App.tsx) và prerender (entry-server.tsx). */
export function getRouteMeta(path: string, isEnglish: boolean): RouteMeta {
  const L = isEnglish ? 1 : 0;
  const slug = path.split("/").filter(Boolean).at(-1);
  const article = path.startsWith("/news/") ? articles.find((a) => a.slug === slug) : undefined;
  const title = article ? `${article[isEnglish ? "EN" : "VI"].title} | Xe Cố Đô Xanh` : (TITLES[path] ?? TITLES["/"])[L];
  const description = article ? article[isEnglish ? "EN" : "VI"].desc : (DESCRIPTIONS[path] ?? DESCRIPTIONS["/"])[L];
  const canonical = `${BUSINESS.url}${path}`;
  const schemas: object[] = [];

  if (path === "/faq") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: ebikeContent[isEnglish ? "EN" : "VI"].faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a.join(" ") },
      })),
    });
  }

  if (path === "/" || path === "/index-en.html" || path === "/pricing") {
    schemas.push({
      "@context": "https://schema.org",
      "@graph": vehicles.map((v) => {
        const price = toVnd(v.pricing.day1);
        const name = isEnglish && v.nameEn ? v.nameEn : v.name;
        const specs = isEnglish ? v.specsEn : v.specs;
        return {
          "@type": "Product",
          "@id": `${BUSINESS.url}/#${v.id}`,
          name: isEnglish ? `${name} rental in Ninh Binh` : `Thuê ${name} Ninh Bình`,
          image: `${BUSINESS.url}${v.image}`,
          description: Object.entries(specs).map(([k, val]) => `${k}: ${val}`).join(". "),
          brand: { "@type": "Brand", name: v.name.toLowerCase().includes("phoenix") ? "Phoenix" : "VinFast" },
          ...(price && {
            offers: {
              "@type": "Offer",
              url: `${BUSINESS.url}/booking`,
              priceCurrency: "VND",
              price,
              availability: "https://schema.org/InStock",
              seller: { "@id": `${BUSINESS.url}/#business` },
              priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "VND", unitCode: "DAY" },
            },
          }),
        };
      }),
    });
  }

  return { title, description, canonical, schemas };
}
