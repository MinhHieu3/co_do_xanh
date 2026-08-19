import felizImage from "../assets/image/Vinfast Feliz II.webp";
import evoImage from "../assets/image/Xe Máy Điện Vinfast Evo.jpg";
import phoenixImage from "../assets/image/XE ĐẠP TRỢ LỰC ĐIỆN PHOENIX.jpeg";
import waveAlphaImage from "../assets/image/Wave Alpha 110.jpeg";

export interface Vehicle {
  id: string;
  name: string;
  image: string;
  pricing: {
    day1: string;
    day2: string;
    day3: string;
    day4: string;
  };
  pricingEn: {
    day1: string;
    day2: string;
    day3: string;
    day4: string;
  };
  specs: {
    [key: string]: string;
  };
  specsEn: {
    [key: string]: string;
  };
}

export const vehicles: Vehicle[] = [
  {
    id: "vinfast-feliz-2",
    name: "Vinfast Feliz II",
    image: felizImage,
    pricing: {
      day1: "150k/1 ngày",
      day2: "280k/2 ngày",
      day3: "390k/3 ngày",
      day4: "480k/4 ngày"
    },
    pricingEn: {
      day1: "$6/1 day",
      day2: "$11/2 days",
      day3: "$16/3 days",
      day4: "$19/4 days"
    },
    specs: {
      "Loại xe": "Xe máy điện",
      "Quãng đường": "Lên tới 198km / lần sạc",
      "Vận tốc tối đa": "78 km/h",
      "Thể tích cốp": "25 Lít (Rộng rãi)",
      "Phụ kiện": "2 Mũ bảo hiểm, Áo mưa, Sạc pin"
    },
    specsEn: {
      "Type": "Electric Motorbike",
      "Range": "Up to 198km / charge",
      "Max Speed": "78 km/h",
      "Trunk Space": "25 Liters (Spacious)",
      "Accessories": "2 Helmets, Raincoat, Charger"
    }
  },
  {
    id: "vinfast-evo",
    name: "Vinfast Evo",
    image: evoImage,
    pricing: {
      day1: "150k/1 ngày",
      day2: "280k/2 ngày",
      day3: "390k/3 ngày",
      day4: "480k/4 ngày"
    },
    pricingEn: {
      day1: "$6/1 day",
      day2: "$11/2 days",
      day3: "$16/3 days",
      day4: "$19/4 days"
    },
    specs: {
      "Loại xe": "Xe máy điện",
      "Quãng đường": "Lên tới 203km / lần sạc",
      "Vận tốc tối đa": "70 km/h",
      "Thể tích cốp": "22 Lít",
      "Phụ kiện": "2 Mũ bảo hiểm, Áo mưa, Sạc pin"
    },
    specsEn: {
      "Type": "Electric Motorbike",
      "Range": "Up to 203km / charge",
      "Max Speed": "70 km/h",
      "Trunk Space": "22 Liters",
      "Accessories": "2 Helmets, Raincoat, Charger"
    }
  },
  {
    id: "xe-dap-phoenix",
    name: "XE ĐẠP TRỢ LỰC PHOENIX",
    image: phoenixImage,
    pricing: {
      day1: "100k/1 ngày",
      day2: "180k/2 ngày",
      day3: "250k/3 ngày",
      day4: "300k/4 ngày"
    },
    pricingEn: {
      day1: "$4/1 day",
      day2: "$7/2 days",
      day3: "$10/3 days",
      day4: "$12/4 days"
    },
    specs: {
      "Loại xe": "Xe đạp trợ lực điện",
      "Quãng đường": "50 - 100km / lần sạc",
      "Vận tốc tối đa": "25 - 40 km/h",
      "Khung xe": "Hợp kim siêu nhẹ",
      "Phụ kiện": "Khóa xe, Sạc pin, Mũ bảo hiểm"
    },
    specsEn: {
      "Type": "Electric Bicycle",
      "Range": "50 - 100km / charge",
      "Max Speed": "25 - 40 km/h",
      "Frame": "Ultra-lightweight alloy",
      "Accessories": "Lock, Charger, Helmet"
    }
  },
  {
    id: "wave-alpha-110",
    name: "Wave Alpha 110",
    image: waveAlphaImage,
    pricing: {
      day1: "100k/1 ngày",
      day2: "180k/2 ngày",
      day3: "250k/3 ngày",
      day4: "300k/4 ngày"
    },
    pricingEn: {
      day1: "$4/1 day",
      day2: "$7/2 days",
      day3: "$10/3 days",
      day4: "$12/4 days"
    },
    specs: {
      "Loại xe": "Xe máy xăng",
      "Phân khối": "109.1 cc",
      "Tiêu hao nhiên liệu": "1.72 Lít / 100km",
      "Dung tích bình xăng": "3.7 Lít",
      "Trọng lượng": "97 kg",
      "Phụ kiện": "2 Mũ bảo hiểm, Áo mưa"
    },
    specsEn: {
      "Type": "Gasoline Motorbike",
      "Engine": "109.1 cc",
      "Fuel Efficiency": "1.72 L / 100km",
      "Fuel Tank": "3.7 Liters",
      "Weight": "97 kg",
      "Accessories": "2 Helmets, Raincoat"
    }
  }
];
