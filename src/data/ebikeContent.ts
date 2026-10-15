import en from "./en";
import vi from "./vi";

export { BRAND, PRICE } from "./ebikeShared";
export type { Content, Faq } from "./ebikeShared";

export const ebikeContent = { EN: en, VI: vi } as const;
