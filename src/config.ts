// VITE_SHOW_PRICE=true (default) shows prices; false replaces every price with "Contact".
export const SHOW_PRICE = String(import.meta.env.VITE_SHOW_PRICE ?? "true").trim().toLowerCase() !== "false";

export const contactLabel = (lang: string) => (lang === "EN" ? "Contact us" : "Liên hệ ngay");
