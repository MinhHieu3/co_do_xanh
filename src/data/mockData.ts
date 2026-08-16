export interface Vehicle {
  id: string;
  name: string;
  image: string;
  price: number;
  priceUnit: string;
  type: "xe-so" | "xe-tay-ga" | "xe-dien";
  cc: string;
  features: string[];
  isBestChoice?: boolean;
}

export interface Location {
  id: string;
  name: string;
  image: string;
  address: string;
  storeCount: number;
  mapUrl: string;
}

export interface Tour {
  id: string;
  title: string;
  image: string;
  duration: string;
  price: number;
  rating: number;
  reviewCount: number;
}

export interface BlogPost {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  date: string;
}

export const BRAND_NAME = "NB MOTO";
export const PHONE = "0912 345 678";
export const PHONE_LINK = "tel:0912345678";
export const EMAIL = "contact@nbmoto.vn";
export const ZALO = "https://zalo.me/0912345678";
export const FACEBOOK = "https://facebook.com/nbmoto";
export const ADDRESS_MAIN = "Số 10, Đường Trần Hưng Đạo, TP. Ninh Bình";

export const VEHICLES: Vehicle[] = [
  {
    id: "vinfast-evo",
    name: "VinFast Evo 200",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop&q=80",
    price: 150000,
    priceUnit: "đ/ngày",
    type: "xe-dien",
    cc: "Điện",
    features: ["2 mũ bảo hiểm", "Sạc đầy pin", "Giá đỡ điện thoại", "Cứu hộ 24/7"],
    isBestChoice: true,
  },
  {
    id: "vinfast-klara",
    name: "VinFast Klara S",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop&q=80",
    price: 180000,
    priceUnit: "đ/ngày",
    type: "xe-dien",
    cc: "Điện",
    features: ["2 mũ bảo hiểm", "Sạc đầy pin", "Giá đỡ điện thoại", "Cứu hộ 24/7"],
  },
  {
    id: "yadea-xmen",
    name: "Yadea Xmen Neo",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop&q=80",
    price: 120000,
    priceUnit: "đ/ngày",
    type: "xe-dien",
    cc: "Điện",
    features: ["2 mũ bảo hiểm", "Sạc đầy pin", "Áo mưa", "Cứu hộ 24/7"],
  },
  {
    id: "dat-bike-weaver",
    name: "Dat Bike Weaver++",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop&q=80",
    price: 250000,
    priceUnit: "đ/ngày",
    type: "xe-dien",
    cc: "Điện",
    features: ["2 mũ bảo hiểm", "Sạc đầy pin", "GPS tracking", "Cứu hộ 24/7"],
  },
  {
    id: "honda-vision",
    name: "Honda Vision 110cc",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop&q=80",
    price: 160000,
    priceUnit: "đ/ngày",
    type: "xe-tay-ga",
    cc: "110cc",
    features: ["2 mũ bảo hiểm", "2 áo mưa", "Giá đỡ điện thoại", "Cứu hộ 24/7"],
  },
  {
    id: "yamaha-sirius",
    name: "Yamaha Sirius 110cc",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=400&h=300&fit=crop&q=80",
    price: 120000,
    priceUnit: "đ/ngày",
    type: "xe-so",
    cc: "110cc",
    features: ["2 mũ bảo hiểm", "2 áo mưa", "Giá đỡ điện thoại", "Cứu hộ 24/7"],
  },
];

export const LOCATIONS: Location[] = [
  {
    id: "tp-ninh-binh",
    name: "TP. Ninh Bình",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&q=80",
    address: "Số 10, Trần Hưng Đạo, TP. Ninh Bình",
    storeCount: 2,
    mapUrl: "https://maps.google.com/?q=Trần+Hưng+Đạo,+Ninh+Bình",
  },
  {
    id: "tam-coc",
    name: "Tam Cốc - Bích Động",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop&q=80",
    address: "Xã Ninh Hải, Hoa Lư, Ninh Bình",
    storeCount: 1,
    mapUrl: "https://maps.google.com/?q=Tam+Coc+Ninh+Binh",
  },
  {
    id: "trang-an",
    name: "Tràng An",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop&q=80",
    address: "Trường Yên, Hoa Lư, Ninh Bình",
    storeCount: 1,
    mapUrl: "https://maps.google.com/?q=Tràng+An+Ninh+Bình",
  },
  {
    id: "bai-dinh",
    name: "Chùa Bái Đính",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&h=300&fit=crop&q=80",
    address: "Gia Sinh, Gia Viễn, Ninh Bình",
    storeCount: 0,
    mapUrl: "https://maps.google.com/?q=Chùa+Bái+Đính+Ninh+Bình",
  },
];

export const TOURS: Tour[] = [
  {
    id: "trang-an-tam-coc",
    title: "Tour Tràng An - Tam Cốc 1 ngày",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500&h=350&fit=crop&q=80",
    duration: "1 ngày",
    price: 500000,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: "ninh-binh-2-ngay",
    title: "Khám phá Ninh Bình 2 ngày 1 đêm",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=500&h=350&fit=crop&q=80",
    duration: "2 ngày 1 đêm",
    price: 1200000,
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: "cuc-phuong",
    title: "Tour Cúc Phương - Vân Long 1 ngày",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&h=350&fit=crop&q=80",
    duration: "1 ngày",
    price: 600000,
    rating: 4.7,
    reviewCount: 56,
  },
  {
    id: "bai-dinh-trang-an",
    title: "Tour Bái Đính - Tràng An xe điện",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=500&h=350&fit=crop&q=80",
    duration: "1 ngày",
    price: 450000,
    rating: 4.6,
    reviewCount: 73,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  { id: "1", title: "Top 10 địa điểm du lịch Ninh Bình không thể bỏ qua",          image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop&q=80", excerpt: "Khám phá những điểm đến nổi tiếng nhất tại Ninh Bình...",           date: "15/03/2026" },
  { id: "2", title: "Kinh nghiệm thuê xe máy điện đi Tam Cốc",                      image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop&q=80", excerpt: "Hướng dẫn chi tiết cách thuê xe máy điện tại Ninh Bình...",    date: "10/03/2026" },
  { id: "3", title: "Lộ trình xe máy điện Ninh Bình 2 ngày 1 đêm",                  image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=250&fit=crop&q=80", excerpt: "Lộ trình chi tiết để khám phá Ninh Bình bằng xe điện...",    date: "05/03/2026" },
  { id: "4", title: "So sánh xe máy điện và xe xăng khi du lịch",                   image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&q=80", excerpt: "Ưu nhược điểm của xe điện so với xe xăng khi đi tour...",       date: "01/03/2026" },
  { id: "5", title: "Ẩm thực Ninh Bình: Thịt dê núi và cơm cháy",               image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop&q=80", excerpt: "Những món ăn đặc sản không thể bỏ lỡ khi đến Ninh Bình...",    date: "28/02/2026" },
  { id: "6", title: "Mùa vàng Tam Cốc - Thời điểm đẹp nhất để đến",             image: "https://images.unsplash.com/photo-1573455494060-c5595004f6b4?w=400&h=250&fit=crop&q=80", excerpt: "Tháng 5-6 là thời điểm lý tưởng nhất để ngắm mùa lúa chín...", date: "25/02/2026" },
];

export const WHY_CHOOSE = [
  { icon: "shield", title: "Không cần đặt cọc", desc: "Thủ tục nhanh gọn, chỉ cần CCCD" },
  { icon: "clock", title: "1 ngày thuê = 24 giờ", desc: "Tính theo giờ thực tế sử dụng" },
  { icon: "truck", title: "Giao xe tận nơi", desc: "Giao & nhận xe tại khách sạn, bến xe" },
  { icon: "zap", title: "Xe điện xanh", desc: "Thân thiện môi trường, không khí thải" },
  { icon: "battery", title: "Pin sạc đầy", desc: "Tầm hoạt động 80-150km/lần sạc" },
  { icon: "headphones", title: "Hỗ trợ 24/7", desc: "Cứu hộ & tư vấn suốt hành trình" },
];

export function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN");
}

export type ChargingType = "swap" | "fast" | "standard";

export interface ChargingStation {
  id: string;
  name: string;
  address: string;
  area: string;         // khu vực: TP. Ninh Bình / Tam Cốc / Tràng An / ...
  type: ChargingType;   // swap = đổi pin, fast = sạc nhanh, standard = sạc thường
  slots: number;        // số cổng/pin sẵn
  hours: string;
  mapUrl: string;
  available: boolean;   // còn pin/cổng không
}

export const CHARGING_STATIONS: ChargingStation[] = [
  // ── NB Moto stations ──
  {
    id: "cs-1",
    name: "NB Moto – Trần Hưng Đạo",
    address: "Số 10, Trần Hưng Đạo, TP. Ninh Bình",
    area: "TP. Ninh Bình",
    type: "swap",
    slots: 12,
    hours: "6:00 – 22:00",
    mapUrl: "https://maps.google.com/?q=10+Trần+Hưng+Đạo+Ninh+Bình",
    available: true,
  },
  {
    id: "cs-2",
    name: "NB Moto – Lê Hồng Phong",
    address: "Số 5, Lê Hồng Phong, TP. Ninh Bình",
    area: "TP. Ninh Bình",
    type: "swap",
    slots: 8,
    hours: "6:00 – 22:00",
    mapUrl: "https://maps.google.com/?q=5+Lê+Hồng+Phong+Ninh+Bình",
    available: true,
  },
  {
    id: "cs-3",
    name: "NB Moto – Tam Cốc",
    address: "Xã Ninh Hải, Hoa Lư, Ninh Bình",
    area: "Tam Cốc – Bích Động",
    type: "swap",
    slots: 6,
    hours: "6:00 – 21:00",
    mapUrl: "https://maps.google.com/?q=Tam+Coc+Ninh+Hai+Hoa+Lu+Ninh+Binh",
    available: true,
  },
  {
    id: "cs-4",
    name: "NB Moto – Tràng An",
    address: "Trường Yên, Hoa Lư, Ninh Bình",
    area: "Tràng An",
    type: "swap",
    slots: 6,
    hours: "6:30 – 20:30",
    mapUrl: "https://maps.google.com/?q=Tràng+An+Trường+Yên+Ninh+Bình",
    available: true,
  },
  // ── VinFast Fast Charge ──
  {
    id: "cs-5",
    name: "VinFast – Vincom Ninh Bình",
    address: "Đại lộ Tràng An, TP. Ninh Bình",
    area: "TP. Ninh Bình",
    type: "fast",
    slots: 4,
    hours: "7:00 – 22:00",
    mapUrl: "https://maps.google.com/?q=Vincom+Ninh+Binh",
    available: true,
  },
  {
    id: "cs-6",
    name: "VinFast – KS Hoàng Sơn Peace",
    address: "Số 128, Lương Văn Tụy, TP. Ninh Bình",
    area: "TP. Ninh Bình",
    type: "fast",
    slots: 2,
    hours: "24/7",
    mapUrl: "https://maps.google.com/?q=Hoàng+Sơn+Peace+Hotel+Ninh+Bình",
    available: true,
  },
  {
    id: "cs-7",
    name: "VinFast – Bến xe Ninh Bình",
    address: "Đường Lê Đại Hành, TP. Ninh Bình",
    area: "TP. Ninh Bình",
    type: "fast",
    slots: 4,
    hours: "5:30 – 21:00",
    mapUrl: "https://maps.google.com/?q=Bến+xe+Ninh+Bình",
    available: false,
  },
  {
    id: "cs-8",
    name: "Trạm sạc – Bái Đính Pilgrim",
    address: "Gia Sinh, Gia Viễn, Ninh Bình",
    area: "Chùa Bái Đính",
    type: "standard",
    slots: 6,
    hours: "7:00 – 18:00",
    mapUrl: "https://maps.google.com/?q=Chùa+Bái+Đính+Ninh+Bình",
    available: true,
  },
  {
    id: "cs-9",
    name: "Trạm sạc – Khu DL Tràng An",
    address: "Trường Yên, Hoa Lư, Ninh Bình",
    area: "Tràng An",
    type: "standard",
    slots: 8,
    hours: "6:00 – 19:00",
    mapUrl: "https://maps.google.com/?q=Khu+du+lịch+Tràng+An+Ninh+Bình",
    available: true,
  },
  {
    id: "cs-10",
    name: "Trạm sạc – Tam Cốc Garden",
    address: "Ninh Hải, Hoa Lư, Ninh Bình",
    area: "Tam Cốc – Bích Động",
    type: "standard",
    slots: 4,
    hours: "7:00 – 20:00",
    mapUrl: "https://maps.google.com/?q=Tam+Coc+Garden+Resort+Ninh+Binh",
    available: true,
  },
];
