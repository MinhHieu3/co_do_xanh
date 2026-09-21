import felizImage from "../assets/image/Vinfast Feliz II.webp";
import evoImage from "../assets/image/Xe Máy Điện Vinfast Evo.jpg";
import evoLiteImage from "../assets/image/Evo lite.png";
import phoenixImageNam from "../assets/image/TLNAM.jpg";
import phoenixImageNu from "../assets/image/TLN.jpg";


export interface Vehicle {
  id: string;
  name: string;
  nameEn?: string;
  image: string;
  pricing: {
    day1: string;
  };
  pricingEn: {
    day1: string;
  };
  hourlyPricing?: {
    price: string;
  };
  hourlyPricingEn?: {
    price: string;
  };
  specs: {
    [key: string]: string;
  };
  specsEn: {
    [key: string]: string;
  };
  isPopular?: boolean;
}

export const vehicles: Vehicle[] = [
  {
    id: "vinfast-evo",
    name: "Vinfast Evo",
    image: evoImage,
    pricing: {
      day1: "150.000đ/ 24h",

    },
    pricingEn: {
      day1: "$6/ 24h",
    },
    hourlyPricing: {
      price: "30.000đ/ 1h"
    },
    hourlyPricingEn: {
      price: "$1.2/ 1h"
    },
    specs: {
      "Loại xe": "Xe máy điện",
      "Dạng pin": "Đổi pin tại tủ + Sạc pin",
      "Quãng đường": "Lên tới 82km / 1 lần đổi pin",
      "Vận tốc tối đa": "60 km/h",
      "Thể tích cốp": "20 Lít",
      "Phụ kiện": "2 Mũ bảo hiểm, Áo mưa, Sạc pin",
      "Bằng lái": "Yêu cầu có giấy phép lái xe"
    },
    specsEn: {
      "Type": "Electric Motorbike",
      "Battery": "Swap + Charge",
      "Range": "Up to 82km / 1 battery swap",
      "Max Speed": "60 km/h",
      "Trunk Space": "20 Liters",
      "Accessories": "2 Helmets, Raincoat, Charger",
      "License": "Driver's license required"
    }
  },
  {
    id: "vinfast-feliz-2",
    name: "Vinfast Feliz II",
    image: felizImage,
    isPopular: true,
    pricing: {
      day1: "150.000đ/ 24h"

    },
    pricingEn: {
      day1: "$6/ 24h",
    },
    hourlyPricing: {
      price: "30.000đ/ 1h"
    },
    hourlyPricingEn: {
      price: "$1.2/ 1h"
    },
    specs: {
      "Loại xe": "Xe máy điện",
      "Dạng pin": "Đổi pin tại tủ + Sạc pin",
      "Quãng đường": "Lên tới 82km / 1 lần đổi pin",
      "Vận tốc tối đa": "78 km/h",
      "Thể tích cốp": "20 Lít",
      "Phụ kiện": "2 Mũ bảo hiểm, Áo mưa, Sạc pin",
      "Bằng lái": "Yêu cầu có giấy phép lái xe"
    },
    specsEn: {
      "Type": "Electric Motorbike",
      "Battery": "Swap + Charge",
      "Range": "Up to 82km / 1 battery swap",
      "Max Speed": "78 km/h",
      "Trunk Space": "25 Liters (Spacious)",
      "Accessories": "2 Helmets, Raincoat, Charger",
      "License": "Driver's license required"
    }
  },
  {
    id: "vinfast-evo-lite",
    name: "Vinfast Evo Lite",
    image: evoLiteImage,
    pricing: {
      day1: "150.000đ/ 24h",

    },
    pricingEn: {
      day1: "$6/ 24h",
    },
    hourlyPricing: {
      price: "30.000đ/ 1h"
    },
    hourlyPricingEn: {
      price: "$1.2/ 1h"
    },
    specs: {
      "Loại xe": "Xe máy điện",
      "Dạng pin": "Đổi pin tại tủ + Sạc pin",
      "Quãng đường": "Lên tới 82km / 1 lần đổi pin",
      "Vận tốc tối đa": "60 km/h",
      "Thể tích cốp": "20 Lít",
      "Phụ kiện": "2 Mũ bảo hiểm, Áo mưa, Sạc pin",
      "Bằng lái": "Không yêu cầu giấy phép lái xe (từ 16 tuổi trở lên)"
    },
    specsEn: {
      "Type": "Electric Motorbike",
      "Battery": "Swap + Charge",
      "Range": "Up to 82km / 1 battery swap",
      "Max Speed": "60 km/h",
      "Trunk Space": "20 Liters",
      "Accessories": "2 Helmets, Raincoat, Charger",
      "License": "No driver's license required"
    }
  },
  {
    id: "xe-dap-phoenix-nam",
    name: "Xe đạp trợ lực Phoenix (Nam)",
    nameEn: "Phoenix E-Bike (Men)",
    image: phoenixImageNam,
    pricing: {
      day1: "100.000đ/ 24h",

    },
    pricingEn: {
      day1: "$4/ 24h",

    },
    hourlyPricing: {
      price: "20.000đ/ 1h"
    },
    hourlyPricingEn: {
      price: "$0.8/ 1h"
    },
    specs: {
      "Loại xe": "Xe đạp trợ lực điện",
      "Dạng pin": "Sạc pin",
      "Quãng đường": "50 - 80km / lần sạc",
      "Vận tốc tối đa": "25 - 40 km/h",
      "Khung xe": "Hợp kim siêu nhẹ",
      "Phụ kiện": "Khóa xe, Sạc pin",
      "Bằng lái": "Không yêu cầu giấy phép lái xe"
    },
    specsEn: {
      "Type": "Electric Bicycle",
      "Battery": "Charge",
      "Range": "50 - 80km / charge",
      "Max Speed": "25 - 40 km/h",
      "Frame": "Ultra-lightweight alloy",
      "Accessories": "Lock, Charger",
      "License": "No driver's license required"
    }
  },
  {
    id: "xe-dap-phoenix-nu",
    name: "Xe đạp trợ lực Phoenix (Nữ)",
    nameEn: "Phoenix E-Bike (Women)",
    image: phoenixImageNu,
    pricing: {
      day1: "100.000đ/ 24h",

    },
    pricingEn: {
      day1: "$4/ 24h",

    },
    hourlyPricing: {
      price: "20.000đ/ 1h"
    },
    hourlyPricingEn: {
      price: "$0.8/ 1h"
    },
    specs: {
      "Loại xe": "Xe đạp trợ lực điện",
      "Dạng pin": "Sạc pin",
      "Quãng đường": "50 - 80km / lần sạc",
      "Vận tốc tối đa": "25 - 40 km/h",
      "Khung xe": "Hợp kim siêu nhẹ",
      "Phụ kiện": "Khóa xe, Sạc pin",
      "Bằng lái": "Không yêu cầu giấy phép lái xe"
    },
    specsEn: {
      "Type": "Electric Bicycle",
      "Battery": "Charge",
      "Range": "50 - 80km / charge",
      "Max Speed": "25 - 40 km/h",
      "Frame": "Ultra-lightweight alloy",
      "Accessories": "Lock, Charger",
      "License": "No driver's license required"
    }
  },
  // {
  //   id: "wave-alpha-110",
  //   name: "Wave Alpha 110",
  //   image: waveAlphaImage,
  //   pricing: {
  //     day1: "100k/1 ngày",
  //     day2: "180k/2 ngày",
  //     day3: "250k/3 ngày",
  //     day4: "300k/4 ngày"
  //   },
  //   pricingEn: {
  //     day1: "$4/1 day",
  //     day2: "$7/2 days",
  //     day3: "$10/3 days",
  //     day4: "$12/4 days"
  //   },
  //   specs: {
  //     "Loại xe": "Xe máy xăng",
  //     "Phân khối": "109.1 cc",
  //     "Tiêu hao nhiên liệu": "1.72 Lít / 100km",
  //     "Dung tích bình xăng": "3.7 Lít",
  //     "Trọng lượng": "97 kg",
  //     "Phụ kiện": "2 Mũ bảo hiểm, Áo mưa"
  //   },
  //   specsEn: {
  //     "Type": "Gasoline Motorbike",
  //     "Engine": "109.1 cc",
  //     "Fuel Efficiency": "1.72 L / 100km",
  //     "Fuel Tank": "3.7 Liters",
  //     "Weight": "97 kg",
  //     "Accessories": "2 Helmets, Raincoat"
  //   }
  // }
];
