import { useState, useMemo, useSyncExternalStore } from "react";
import { Link, useLocation } from "react-router-dom";
import { vehicles, stockOf, EVO_LITE_ID } from "../data/vehicles";
import { getBookingDates, usesCalendarDay } from "../data/bookingDates";
import { useLanguage } from "../context/LanguageContext";
import CustomSelect from "../component/CustomSelect";
import CustomDatePicker from "../component/CustomDatePicker";
import { SHOW_PRICE, contactLabel } from "../config";

const Tick = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
);

const businessDate = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" });
const bookingMinute = () => Math.floor(Date.now() / 60_000);
const serverBookingMinute = () => null;
const subscribeBookingClock = (update: () => void) => {
  const timer = window.setInterval(update, 30_000);
  return () => window.clearInterval(timer);
};
function bookingPriority(id: string) {
  if (id === EVO_LITE_ID) return 0;
  return id.startsWith("xe-dap-phoenix-") ? 1 : 2;
}
const bookingVehicles = [...vehicles].sort((a, b) => bookingPriority(a.id) - bookingPriority(b.id));
const dayPrice = (day1: string) => parseInt(day1.split("/")[0].replace(/\D/g, ""));

export default function BookingPage() {
  const { language } = useLanguage();
  const L = (vi: string, en: string) => (language === "EN" ? en : vi);
  const location = useLocation();

  const [selectedVehicle, setSelectedVehicle] = useState<string>(() =>
    location.state && (location.state as any).selectedVehicle ? (location.state as any).selectedVehicle : EVO_LITE_ID
  );
  const nowMinute = useSyncExternalStore(subscribeBookingClock, bookingMinute, serverBookingMinute);
  const today = nowMinute === null ? "" : businessDate.format(nowMinute * 60_000);
  const [chosenDate, setStartDate] = useState<string>();
  const startDate = chosenDate ?? today;
  const [days, setDays] = useState(1);
  const [windowStart, setWindowStart] = useState("7");
  const [form0, setForm0] = useState({
    name: "", phone: "", email: "", pickupDate: "", dropoffDate: "",
    pickupLocation: "Giao tận nơi", deliveryAddress: "", quantity: "1", notes: "",
  });
  const [website, setWebsite] = useState(""); // honeypot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const selectedVehicleData = useMemo(() => vehicles.find((v) => v.id === selectedVehicle), [selectedVehicle]);
  const dates = getBookingDates(startDate, days, Number(windowStart), selectedVehicle);
  const formData = { ...form0, pickupDate: dates?.pickupDate ?? "", dropoffDate: dates?.dropoffDate ?? "" };
  const set = (k: string, v: string) => setForm0((p) => ({ ...p, [k]: v }));
  const maxQty = stockOf(selectedVehicle);
  const qty = Math.min(parseInt(formData.quantity) || 1, Math.max(1, maxQty));

  const calculateTotalEstimate = () => {
    if (!startDate || !selectedVehicleData) return { total: 0, base: 0, overtime: 0, overtimeHours: 0 };
    const total = days * dayPrice(selectedVehicleData.pricing.day1) * qty;
    return { total, base: total, overtime: 0, overtimeHours: 0 };
  };
  const est = calculateTotalEstimate();
  const money = (n: number) => (SHOW_PRICE ? `${n.toLocaleString("vi-VN")}đ` : contactLabel(language));

  const validate = (): string => {
    if (!formData.name.trim()) return L("Vui lòng nhập họ và tên.", "Please enter your full name.");
    if (!formData.phone.trim()) return L("Số điện thoại là bắt buộc — chúng tôi cần liên hệ xác nhận giờ giao xe.", "Phone number is required — we need it to confirm delivery time.");
    if (formData.phone.replace(/\D/g, "").length < 7) return L("Số điện thoại không hợp lệ — vui lòng kiểm tra lại.", "Phone number looks invalid — please check it.");
    if (!selectedVehicleData || qty > maxQty) return L(`Chỉ còn ${maxQty} xe loại này.`, `Only ${maxQty} of this ride available.`);
    if (formData.pickupLocation === "Giao tận nơi" && !formData.deliveryAddress.trim()) return L("Vui lòng nhập tên khách sạn hoặc homestay để chúng tôi biết nơi giao xe.", "Please enter your hotel or homestay name so we know where to deliver.");
    if (!startDate) return L("Vui lòng chọn ngày nhận xe!", "Please choose your first day!");
    if (startDate < businessDate.format(new Date())) return L("Ngày nhận xe không được ở quá khứ.", "The first day cannot be in the past.");
    return "";
  };

  const executeBooking = async () => {
    setIsSubmitting(true);
    setError("");
    const unconfirmed = L(
      "Hệ thống chưa xác nhận được đơn. Vui lòng liên hệ cửa hàng để kiểm tra trước khi gửi lại.",
      "We could not confirm your booking. Please contact the shop to check before submitting again.",
    );
    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "booking",
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          vehicleId: selectedVehicle,
          startDate,
          days,
          windowStart,
          quantity: qty,
          pickupLocation: formData.pickupLocation,
          deliveryAddress: formData.deliveryAddress,
          notes: formData.notes,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success !== true) {
        if (response.status === 400 && result?.success === false) {
          setError(L("Vui lòng kiểm tra lại ngày thuê, số lượng xe và thông tin liên hệ.", "Please check the rental date, vehicle quantity and contact details."));
        } else if (result === null) {
          setError(L("Trang này chưa kết nối được với hệ thống đặt xe. Vui lòng liên hệ cửa hàng.", "This page could not connect to the booking service. Please contact the shop."));
        } else {
          setError(unconfirmed);
        }
        return;
      }
      setShowSuccess(true);
      window.scrollTo(0, 0);
    } catch {
      setError(unconfirmed);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || website) return; // honeypot
    const msg = validate();
    setError(msg);
    if (msg) return;
    executeBooking();
  };

  const vName = (v: (typeof vehicles)[number]) => (language === "EN" && v.nameEn ? v.nameEn : v.name);
  const priceOf = (v: (typeof vehicles)[number]) => (!SHOW_PRICE ? contactLabel(language) : language === "EN" ? v.pricingEn.day1 : v.pricing.day1);
  const typeLabel = L(`${days} ngày`, `${days} day${days > 1 ? "s" : ""}`);

  if (showSuccess) {
    return (
      <>
        <div className="page-head"><div className="wrap" /></div>
        <section className="book">
          <div className="wrap">
            <div className="done on">
              <p className="eyebrow">{L("Đã đặt", "Booked")}</p>
              <h2 className="h1">{L("Xe của bạn đã được đặt", "Your ride is reserved")}</h2>
              <p className="lead">
                {L("Chúng tôi đã nhận yêu cầu và sẽ liên hệ xác nhận với bạn sớm nhất.", "We have received your booking and will contact you shortly to confirm.")}
              </p>
              <div className="ticket">
                <div className="ticket-top"><small>{L("Đặt xe", "Booking")}</small><b>{selectedVehicleData ? vName(selectedVehicleData) : ""}</b></div>
                <div className="ticket-body">
                  <div className="row"><span>{L("Nhận xe", "Pickup")}</span><span>{formData.pickupDate}</span></div>
                  <div className="row"><span>{L("Trả xe", "Drop-off")}</span><span>{formData.dropoffDate}</span></div>
                  <div className="row"><span>{L("Số lượng", "Quantity")}</span><span>{formData.quantity}</span></div>
                </div>
                <div className="ticket-total"><span>{L("Tổng, thanh toán khi nhận xe", "Total, pay on delivery")}</span><b>{money(est.total)}</b></div>
              </div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: 10 }}>{L("Bước tiếp theo", "What happens now")}</h2>
              <ol>
                <li>{L("Cửa hàng nhận được đơn của bạn ngay lập tức.", "The rental shop gets your booking right away.")}</li>
                <li>{L("Nhân viên liên hệ xác nhận giờ giao xe. Hãy chuẩn bị giấy tờ tùy thân và chú ý điện thoại.", "The shop confirms the delivery time with you. Have your ID and the cash ready.")}</li>
                <li>{L("Cuối thời gian thuê, nhân viên nhận lại xe.", "At the end of your rental the driver picks the ride up again.")}</li>
              </ol>
              <p style={{ marginTop: 22 }}><Link className="link-arrow" to="/#reach">{L("Gợi ý nơi để đi", "Ideas for where to ride")}</Link></p>
            </div>
          </div>
        </section>
      </>
    );
  }

  let cutoffLine = L("Đặt trước 6:00 để nhận xe trong buổi sáng.", "Book before 6 am for morning delivery.");
  if (nowMinute !== null) {
    const nowMin = (nowMinute + 7 * 60) % (24 * 60);
    const leftMin = nowMin < 360 ? 360 - nowMin : 360 + 1440 - nowMin;
    const whenTxt = nowMin < 360 ? L("sáng nay", "this morning") : L("sáng mai", "tomorrow morning");
    const hh = Math.floor(leftMin / 60), mm = leftMin % 60;
    cutoffLine = language === "EN"
      ? `Book within ${hh > 0 ? `${hh} h ` : ""}${mm} min for delivery ${whenTxt}`
      : `Đặt trong ${hh > 0 ? `${hh} giờ ` : ""}${mm} phút nữa để nhận xe ${whenTxt}`;
  }

  const submitLabel = isSubmitting ? L("Đang gửi...", "Sending...") : L("Xác nhận đặt xe", "Reserve my ride");

  return (
    <>
      <div className="page-head" id="book-head">
        <div className="wrap">
          <p className="eyebrow">{L("Chỉ hai phút, chưa cần trả tiền", "Two minutes, nothing to pay now")}</p>
          <h1>{L("Đặt thuê xe máy điện Ninh Bình", "Book an electric motorbike in Ninh Binh")}</h1>
        </div>
      </div>

      <section className="book">
        <div className="wrap">
          <form className="book-grid" onSubmit={onSubmit} noValidate>
            <div>
              <fieldset>
                <legend><i>1</i> {L("Bạn muốn đi xe nào?", "What would you like to ride?")}</legend>
                {bookingVehicles.map((v) => {
                  const active = v.id === selectedVehicle;
                  return (
                    <div
                      className="pick relative"
                      key={v.id}
                      style={{ borderColor: active ? "var(--jungle)" : undefined, boxShadow: active ? "4px 4px 0 var(--ochre)" : undefined }}
                    >
                      <input
                        type="radio"
                        name="vehicle"
                        className="peer sr-only"
                        id={`booking-${v.id}`}
                        value={v.id}
                        checked={active}
                        aria-describedby={`booking-details-${v.id}`}
                        onChange={() => {
                          setSelectedVehicle(v.id);
                          set("quantity", String(Math.min(qty, Math.max(1, stockOf(v.id)))));
                        }}
                      />
                      <label
                        htmlFor={`booking-${v.id}`}
                        className="absolute inset-0 cursor-pointer rounded-xl peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--ochre)]"
                      >
                        <span className="sr-only">{vName(v)}</span>
                      </label>
                      <img src={v.image} width={84} height={64} alt="" style={{ objectFit: "contain", background: "#fff" }} />
                      <div id={`booking-details-${v.id}`}>
                        <b>{vName(v)}</b>
                        {v.requiresLicense && (
                          <small style={{ color: "var(--red-text)", fontWeight: 600 }}>{L("⚠ Cần giấy phép lái xe", "⚠ Driving licence required")}</small>
                        )}
                        <small><strong>{priceOf(v)}</strong></small>
                        <small style={{ color: stockOf(v.id) <= 3 ? "var(--red-text)" : "var(--jungle)", fontWeight: 600 }}>{L(`Còn ${stockOf(v.id)} xe`, `${stockOf(v.id)} available`)}</small>
                      </div>
                      {active ? (
                        <div className="stepper relative z-10">
                          <button type="button" aria-label={L("Giảm số lượng", "Decrease quantity")} onClick={() => set("quantity", String(Math.max(1, qty - 1)))}>&minus;</button>
                          <output aria-live="polite">{qty}</output>
                          <button type="button" aria-label={L("Tăng số lượng", "Increase quantity")} disabled={qty >= maxQty} onClick={() => set("quantity", String(Math.min(maxQty, qty + 1)))}>+</button>
                        </div>
                      ) : (
                        <span className="tag" style={{ justifySelf: "end" }}>{L("Chọn", "Select")}</span>
                      )}
                    </div>
                  );
                })}
              </fieldset>

              <fieldset>
                <legend><i>2</i> {L("Khi nào?", "When?")}</legend>
                <div className="fields three">
                  <div className="field">
                    <label htmlFor="f-date">{L("Ngày nhận xe", "First day")}</label>
                    <CustomDatePicker id="f-date" min={today} value={startDate} onChange={setStartDate} lang={language} />
                  </div>
                  <div className="field">
                    <label htmlFor="f-days">{L("Số ngày thuê", "How long")}</label>
                    <CustomSelect id="f-days" value={String(days)} onChange={(v) => setDays(Number(v))}
                      options={Array.from({ length: 14 }, (_, i) => i + 1).map((n) => ({ value: String(n), label: L(`${n} ngày`, `${n} day${n > 1 ? "s" : ""}`) }))} />
                  </div>
                  <div className="field">
                    <label htmlFor="f-time">{L("Khung giờ giao xe", "Delivery window")}</label>
                    <CustomSelect id="f-time" value={windowStart} onChange={setWindowStart}
                      options={[7, 9, 11, 13, 15, 17].map((h) => ({ value: String(h), label: `${h}:00 - ${h + 2}:00` }))} />
                  </div>
                </div>
                <p className="hint" style={{ marginTop: 10 }}>
                  {L("Xe có thể được giao bất kỳ lúc nào trong khung giờ bạn chọn.", "Your ride can arrive at any time within the selected delivery window.")}
                  {" "}
                  {usesCalendarDay(selectedVehicle)
                    ? L("Thuê theo ngày lịch. Gói một ngày kết thúc lúc 23:59 cùng ngày nhận xe.", "Rentals are priced by calendar day. A one-day rental ends at 23:59 on the pickup date.")
                    : L("Một ngày thuê kéo dài 24 giờ kể từ giờ nhận xe.", "A rental day runs for 24 hours from pickup.")}
                </p>
                <p className="deadline">{cutoffLine}</p>
              </fieldset>

              <fieldset>
                <legend><i>3</i> {L("Địa điểm và thông tin của bạn", "Where and who?")}</legend>
                <div className="fields">
                  <div className="field">
                    <label htmlFor="f-loc">{L("Nhận xe", "Pickup place")}</label>
                    <CustomSelect id="f-loc" value={formData.pickupLocation} onChange={(v) => set("pickupLocation", v)}
                      options={[
                        { value: "Giao tận nơi", label: L("Giao tận khách sạn / homestay", "Delivered to my hotel / homestay") },
                        { value: "Tại cửa hàng", label: L("Nhận tại cửa hàng", "Collect at the shop") },
                      ]} />
                  </div>
                  {formData.pickupLocation === "Giao tận nơi" && (
                    <div className="field">
                      <label htmlFor="f-hotel">{L("Tên khách sạn / homestay", "Hotel or homestay name")} <span style={{ color: "var(--red-text)", fontSize: "0.85em" }}>*</span></label>
                      <input
                        type="text"
                        id="f-hotel"
                        value={formData.deliveryAddress}
                        maxLength={160}
                        required
                        onChange={(e) => set("deliveryAddress", e.target.value)}
                        placeholder={L("VD: Trang An Boutique Hotel, Ninh Bình", "e.g. Trang An Boutique Hotel, Ninh Binh")}
                      />
                      <p className="hint">{L("Nhập đúng tên khách sạn để chúng tôi tìm trên bản đồ và giao xe đúng chỗ. Miễn phí giao trong khu vực Ninh Bình.", "Enter the exact hotel name so we can find it on the map and deliver to the right place. Free delivery within Ninh Binh.")}</p>
                    </div>
                  )}
                  <div className="fields two">
                    <div className="field">
                      <label htmlFor="f-name">{L("Họ và tên", "Full name")} <span style={{ color: "var(--red-text)", fontSize: "0.85em" }}>*</span></label>
                      <input
                        type="text"
                        id="f-name"
                        autoComplete="name"
                        maxLength={100}
                        value={formData.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder={L("VD: Nguyễn Văn A", "e.g. John Smith")}
                        required
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="f-email">{L("Email", "Email")} <small>{L("(không bắt buộc)", "(optional)")}</small></label>
                      <input
                        type="email"
                        id="f-email"
                        autoComplete="email"
                        maxLength={120}
                        value={formData.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="example@gmail.com"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="f-phone">
                      {L("Số điện thoại / Zalo / WhatsApp", "Phone / Zalo / WhatsApp")}
                      {" "}<span style={{ color: "var(--red-text)", fontSize: "0.85em" }}>*</span>
                    </label>
                    <input
                      type="tel"
                      id="f-phone"
                      autoComplete="tel"
                      maxLength={24}
                      inputMode="numeric"
                      value={formData.phone}
                      onChange={(e) => {
                        // Chỉ cho phép: chữ số, +, khoảng trắng, gạch ngang, ngoặc
                        const cleaned = e.target.value.replace(/[^\d+\s()-]/g, "");
                        set("phone", cleaned);
                      }}
                      placeholder={L("+84 901234567  hoặc  +1 2345678900", "+84 901234567  or  +1 2345678900")}
                      required
                    />
                    <p className="hint">{L("Bắt buộc — nhân viên sẽ liên hệ qua số này để xác nhận giờ giao xe và hướng dẫn thêm.", "Required — our team will contact you on this number to confirm delivery time and give further instructions.")}</p>
                  </div>
                  <div className="field">
                    <label htmlFor="f-notes">{L("Ghi chú thêm", "Anything we should know?")} <small>{L("(không bắt buộc)", "(optional)")}</small></label>
                    <textarea
                      id="f-notes"
                      maxLength={500}
                      value={formData.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      placeholder={L(
                        "VD: Phòng số 302, check-in trưa. Hoặc số hành lý đặc biệt...",
                        "e.g. Room 302, checking in at noon. Or any special luggage needs..."
                      )}
                    />
                  </div>
                </div>
                <div className="hp" aria-hidden="true"><label>Leave this empty <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label></div>
              </fieldset>
            </div>

            <aside>
              <div className="ticket" aria-live="polite">
                <div className="ticket-top"><small>{L("Đơn đặt xe của bạn", "Your booking")}</small><b>{selectedVehicleData ? vName(selectedVehicleData) : ""}</b></div>
                <div className="ticket-body">
                  <div className="row"><span>{L("Hình thức", "Type")}</span><span>{typeLabel}</span></div>
                  <div className="row"><span>{L("Số lượng", "Quantity")}</span><span>{qty}</span></div>
                  {formData.pickupDate ? <div className="row"><span>{L("Nhận xe", "Pickup")}</span><span>{formData.pickupDate}</span></div> : <p className="empty">{L("Chọn ngày để xem chi phí.", "Pick your dates to see the price.")}</p>}
                  {formData.dropoffDate && <div className="row"><span>{L("Trả xe", "Drop-off")}</span><span>{formData.dropoffDate}</span></div>}
                  {est.overtime > 0 && (
                    <>
                      <div className="row"><span>{L("Giá gốc (0-5h)", "Base (0-5h)")}</span><span>{money(est.base)}</span></div>
                      <div className="row"><span>{L(`Phụ thu quá giờ (${est.overtimeHours}h)`, `Overtime (${est.overtimeHours}h)`)}</span><span>{money(est.overtime)}</span></div>
                    </>
                  )}
                </div>
                <div className="ticket-total"><span>{L("Tổng, thanh toán khi nhận xe", "Total, pay on delivery")}</span><b>{money(est.total)}</b></div>
                <p className="ticket-note">{L("Chưa cần thanh toán. Bạn trả tiền mặt khi nhận xe.", "Nothing to pay now. You pay in cash when your ride arrives.")}</p>
              </div>
              <div style={{ marginTop: 24 }}>
                {error && <p className="form-error on" role="alert">{error}</p>}
                <div className="submit-row"><button className="btn" type="submit" disabled={isSubmitting}>{submitLabel}</button></div>
                <p className="agree">{L("Bằng cách đặt xe, bạn đồng ý với ", "By reserving you agree to the ")}<Link to="/policy" target="_blank" rel="noreferrer">{L("điều khoản thuê xe", "booking terms")}</Link>.</p>
              </div>
              <ul className="reassure">
                <li><Tick /> {L("Hủy miễn phí, chưa phải trả tiền", "Free to cancel, nothing is paid upfront")}</li>
                <li><Tick /> {L("Hầu hết các xe không cần đặt cọc", "No cash deposit on most rides")}</li>
                <li><Tick /> {L("Mũ bảo hiểm đi kèm theo xe", "Helmets included with the ride")}</li>
              </ul>
            </aside>
          </form>
        </div>
      </section>

      <div className="bookbar paybar on" id="paybar">
        <span>{L("Tổng, thanh toán khi nhận xe", "Total, pay on delivery")}<b>{money(est.total)}</b></span>
        <button className="btn btn-sm" type="button" disabled={isSubmitting} onClick={(e) => onSubmit(e as any)}>{submitLabel}</button>
      </div>
    </>
  );
}
