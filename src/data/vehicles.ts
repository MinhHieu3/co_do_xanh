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
    id: "sym-galaxy-50",
    name: "SYM Galaxy 50cc",
    image: "https://placehold.co/400x300/f8fafc/64748b?text=SYM+Galaxy+50cc",
    pricing: {
      day1: "120k/1 ngày",
      day2: "220k/2 ngày",
      day3: "300k/3 ngày",
      day4: "360k/4 ngày"
    }
  },
  {
    id: "honda-wave-rsx-110",
    name: "Honda Wave RSX 110cc",
    image: "https://placehold.co/400x300/f8fafc/64748b?text=Honda+Wave+RSX",
    pricing: {
      day1: "110k/1 ngày",
      day2: "200k/2 ngày",
      day3: "270k/3 ngày",
      day4: "320k/4 ngày"
    }
  },
  {
    id: "yamaha-sirius-110",
    name: "Yamaha Sirius 110cc",
    image: "https://placehold.co/400x300/f8fafc/64748b?text=Yamaha+Sirius",
    pricing: {
      day1: "110k/1 ngày",
      day2: "200k/2 ngày",
      day3: "270k/3 ngày",
      day4: "320k/4 ngày"
    }
  },
  {
    id: "yamaha-pg1-2024",
    name: "Yamaha PG1 2024",
    image: "https://placehold.co/400x300/f8fafc/64748b?text=Yamaha+PG1+2024",
    pricing: {
      day1: "150k/1 ngày",
      day2: "280k/2 ngày",
      day3: "390k/3 ngày",
      day4: "480k/4 ngày"
    }
  }
];
