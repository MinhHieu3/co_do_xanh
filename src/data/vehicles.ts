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
    }
  }
];
