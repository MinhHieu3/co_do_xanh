import { stockOf, vehicles } from "../src/data/vehicles.ts";
import { getBookingDates } from "../src/data/bookingDates.ts";
import { DEFAULT_ORDER_API } from "../src/data/business.ts";

export type Settings = Record<string, string | undefined>;
type OrderResponse = { success?: boolean; data?: { id?: unknown }; id?: unknown; order_id?: unknown };
const BUSINESS_DATE = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" });

export const MAX_FORM_BYTES = 8192;

export function json(status: number, body: object) {
  return { status, body };
}

function field(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function readBooking(input: Record<string, unknown>, name: string, phone: string) {
  const vehicle = vehicles.find(({ id }) => id === input.vehicleId);
  const days = Number(input.days);
  const quantity = Number(input.quantity);
  const hour = Number(input.windowStart);
  const date = field(input.startDate, 10);
  const notes = field(input.notes, 500);
  const delivery = input.pickupLocation === "Giao tận nơi";
  const location = delivery ? field(input.deliveryAddress, 160) : "Tại cửa hàng";

  if (!vehicle || !Number.isInteger(quantity) || quantity < 1 || quantity > stockOf(vehicle.id)
    || !Number.isInteger(days) || days < 1 || days > 14 || ![7, 9, 11, 13, 15, 17].includes(hour)
    || !/^\d{4}-\d{2}-\d{2}$/.test(date) || date < BUSINESS_DATE.format(new Date())
    || !location || (!delivery && input.pickupLocation !== "Tại cửa hàng")) return;

  const dates = getBookingDates(date, days, hour, vehicle.id);
  if (!dates) return;
  const { pickupDate: time_start, dropoffDate: time_end } = dates;
  const pickupWindow = `${time_start} – ${hour + 2}:00`;
  const order = {
    name, phone, quantity: String(quantity), time_start, time_end, location,
    email: field(input.email, 120),
    type_category: vehicle.name,
    des_1: `Loại hình: Thuê theo ngày. ${notes}`,
  };
  const total = days * quantity * Number(vehicle.pricing.day1.split("/")[0].replace(/\D/g, ""));
  const text = [
    "🆕 ĐƠN ĐẶT XE MỚI",
    `📅 Nhận ${pickupWindow} · trả ${time_end}`,
    `🏨 ${location}`,
    `👤 ${name} · ${phone}`,
    `🛵 ${quantity} × ${vehicle.name} · ${days} ngày`,
  ];
  const mapLink = delivery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location}, Ninh Bình, Việt Nam`)}`
    : undefined;
  return { order, text, notes, total, mapLink };
}

async function sendZalo(env: Settings, text: string) {
  const token = env.ZALO_BOT_TOKEN?.trim();
  const chatId = env.ZALO_CHAT_ID?.trim();
  if (!token || !chatId) {
    console.warn("Zalo bot is missing its server configuration");
    return false;
  }
  try {
    const response = await fetch(`https://bot-api.zaloplatforms.com/bot${encodeURIComponent(token)}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(5_000),
    });
    const result = await response.json().catch(() => null) as { ok?: boolean } | null;
    if (response.ok && result?.ok === true) return true;
    console.warn("Zalo bot did not accept the message", response.status);
  } catch {
    console.warn("Zalo bot request failed");
  }
  return false;
}

export async function submitForm(value: unknown, env: Settings) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return json(400, { success: false });
  const input = value as Record<string, unknown>;
  const name = field(input.name, 100);
  const phone = field(input.phone, 32);
  if (!name || !phone || phone.replace(/\D/g, "").length < 7) return json(400, { success: false });

  if (input.kind === "contact") {
    const message = field(input.message, 1400);
    if (!message) return json(400, { success: false });
    const sent = await sendZalo(env, [
      "📩 TIN NHẮN LIÊN HỆ MỚI",
      `${name} · ${phone}`,
      field(input.subject, 100),
      message,
    ].filter(Boolean).join("\n"));
    return json(sent ? 200 : 503, { success: sent });
  }

  const booking = input.kind === "booking" ? readBooking(input, name, phone) : undefined;
  if (!booking) return json(400, { success: false });

  let id: number | string | undefined;
  try {
    const orderApi = (env.ORDER_API_URL?.trim() || env.VITE_API_URL?.trim() || DEFAULT_ORDER_API).replace(/\/+$/, "");
    const response = await fetch(`${orderApi}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking.order),
      signal: AbortSignal.timeout(10_000),
    });
    const result = await response.json().catch(() => null) as OrderResponse | null;
    if (!response.ok || result?.success !== true) {
      console.warn("Order API did not confirm the save", response.status);
      return json(502, { success: false });
    }
    const storedId = result.data?.id ?? result.id ?? result.order_id;
    if (typeof storedId === "number" || typeof storedId === "string") id = storedId;
  } catch {
    console.warn("Order API request failed");
    return json(502, { success: false });
  }

  const text = booking.text;
  if (id !== undefined) text.unshift(`Mã đơn #${id}`);
  if (env.VITE_SHOW_PRICE?.trim().toLowerCase() !== "false") {
    text.push(`💵 Dự kiến ${booking.total.toLocaleString("vi-VN")}đ`);
  }
  if (booking.notes) text.push(`📝 ${booking.notes}`);
  if (booking.mapLink && [...text, booking.mapLink].join("\n").length <= 2000) text.push(booking.mapLink);
  const notified = await sendZalo(env, text.join("\n"));
  if (!notified) console.warn("Order was saved but Zalo notification failed", { id });

  return json(200, { success: true, orderId: id });
}
