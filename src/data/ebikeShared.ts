export const BRAND = { top: "Xe Cố Đô", sub: "Xanh" };
export const PRICE = { moto: "150,000", ebike: "120,000", motoUsd: "6", ebikeUsd: "5" };

export type Faq = { q: string; a: string[] };
export type Content = {
  nav: { day: string; rides: string; reach: string; book: string; faq: string; cta: string };
  hero: any; day: any; rides: any; guide: any; versus: any; review: any; incl: any; reach: any;
  faq: { eyebrow: string; title: string; items: Faq[]; more: string };
  closing: any; foot: any; bookbar: any;
};
