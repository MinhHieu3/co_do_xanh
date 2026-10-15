const evoImage = "/ebike/img/ride-evo-640.jpg";
const felizImage = "/ebike/img/ride-feliz2-640.jpg";
const evoLiteImage = "/ebike/img/ride-evo-lite-640.jpg";
const phoenixImageNam = "/ebike/img/phoenix-pair-640.webp";
const phoenixImageNu = "/ebike/img/phoenix-pair-640.webp";


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
  /** true = khách phải có giấy phép lái xe; hiện cảnh báo ở trang đặt xe */
  requiresLicense?: boolean;
}

export const vehicles: Vehicle[] = [
  {
    id: "vinfast-evo",
    name: "Vinfast Evo",
    image: evoImage,
    requiresLicense: true,
    pricing: {
      day1: "150.000đ/ngày",

    },
    pricingEn: {
      day1: "$6/day",
    },
    hourlyPricing: {
      price: "100.000đ/5h"
    },
    hourlyPricingEn: {
      price: "$4/5h"
    },
    specs: {
      "Loại xe": "Xe máy điện",
      "Dạng pin": "Đổi pin tại tủ + Sạc pin",
      "Quãng đường": "Lên tới 82km / 1 lần đổi pin",
      "Vận tốc tối đa": "70 km/h",
      "Thể tích cốp": "20 Lít",
      "Phụ kiện": "2 Mũ bảo hiểm, Áo mưa, Sạc pin",
      "Bằng lái": "Yêu cầu có giấy phép lái xe"
    },
    specsEn: {
      "Type": "Electric Motorbike",
      "Battery": "Swap + Charge",
      "Range": "Up to 82km / 1 battery swap",
      "Max Speed": "70 km/h",
      "Trunk Space": "20 Liters",
      "Accessories": "2 Helmets, Raincoat, Charger",
      "License": "Driver's license required"
    }
  },
  {
    id: "vinfast-feliz-2",
    name: "Vinfast Feliz II",
    image: felizImage,
    requiresLicense: true,
    isPopular: true,
    pricing: {
      day1: "150.000đ/ngày"

    },
    pricingEn: {
      day1: "$6/day",
    },
    hourlyPricing: {
      price: "100.000đ/5h"
    },
    hourlyPricingEn: {
      price: "$4/5h"
    },
    specs: {
      "Loại xe": "Xe máy điện",
      "Dạng pin": "Đổi pin tại tủ + Sạc pin",
      "Quãng đường": "Lên tới 82km / 1 lần đổi pin",
      "Vận tốc tối đa": "70 km/h",
      "Thể tích cốp": "20 Lít",
      "Phụ kiện": "2 Mũ bảo hiểm, Áo mưa, Sạc pin",
      "Bằng lái": "Yêu cầu có giấy phép lái xe"
    },
    specsEn: {
      "Type": "Electric Motorbike",
      "Battery": "Swap + Charge",
      "Range": "Up to 82km / 1 battery swap",
      "Max Speed": "70 km/h",
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
      day1: "150.000đ/ngày",

    },
    pricingEn: {
      day1: "$6/day",
    },
    hourlyPricing: {
      price: "100.000đ/ 5h"
    },
    hourlyPricingEn: {
      price: "$4/ 5h"
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
      day1: "120.000đ/ngày",

    },
    pricingEn: {
      day1: "$5/day",

    },
    hourlyPricing: {
      price: "80.000đ/ 5h"
    },
    hourlyPricingEn: {
      price: "$3.2/ 5h"
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
      day1: "120.000đ/ngày",

    },
    pricingEn: {
      day1: "$5/day",

    },
    hourlyPricing: {
      price: "80.000đ/ 5h"
    },
    hourlyPricingEn: {
      price: "$3.2/ 5h"
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
];

// Units available per model. Both Phoenix e-bikes (men's / women's) share one pool.
export const STOCK: Record<string, number> = {
  "vinfast-evo": 5,
  "vinfast-feliz-2": 10,
  "vinfast-evo-lite": 10,
  "xe-dap-phoenix": 5,
};
export const stockOf = (id: string): number =>
  STOCK[id.startsWith("xe-dap-phoenix") ? "xe-dap-phoenix" : id] ?? 0;
