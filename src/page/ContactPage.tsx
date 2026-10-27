import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import toast from "react-hot-toast";

export default function ContactPage() {
  const { language } = useLanguage();
  const L = (vi: string, en: string) => (language === "EN" ? en : vi);
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER || "0866399986";
  const [formData, setFormData] = useState({ name: "", phone: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const set = (k: string, v: string) => setFormData((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const text = `
📩 <b>TIN NHẮN LIÊN HỆ MỚI</b>
--------------------------------
⏱ <b>Thời gian:</b> ${new Date().toLocaleString("vi-VN")}
👤 <b>Người gửi:</b> ${formData.name}
📞 <b>SĐT:</b> ${formData.phone}
📌 <b>Tiêu đề:</b> ${formData.subject || "Không có"}
📝 <b>Nội dung:</b>
${formData.message}
    `;
    const TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const CHAT = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    if (!TOKEN || !CHAT) {
      setTimeout(() => { setIsSubmitting(false); setShowSuccess(true); }, 1000);
      return;
    }
    try {
      await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT, text, parse_mode: "HTML" }),
      });
      setIsSubmitting(false);
      setShowSuccess(true);
    } catch {
      setIsSubmitting(false);
      toast.error(L("Có lỗi xảy ra khi gửi tin nhắn!", "An error occurred while sending the message!"));
    }
  };

  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <p className="eyebrow">{L("Liên hệ", "Contact")}</p>
          <h1>{L("Nhắn cho chúng tôi", "Get in touch")}</h1>
          <p className="lead">{L("Có câu hỏi về chuyến đi? Chúng tôi trả lời nhanh nhất có thể.", "Questions about your trip? We reply as fast as we can.")}</p>
        </div>
      </div>
      <section className="book">
        <div className="wrap">
          {showSuccess ? (
            <div className="done on">
              <p className="eyebrow">{L("Đã gửi", "Sent")}</p>
              <h2 className="h1">{L("Cảm ơn bạn!", "Thank you!")}</h2>
              <p className="lead">{L("Chúng tôi đã nhận tin nhắn và sẽ phản hồi sớm.", "We have your message and will reply soon.")}</p>
            </div>
          ) : (
            <div className="book-grid">
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <legend><i>✉</i> {L("Tin nhắn của bạn", "Your message")}</legend>
                  <div className="fields">
                    <div className="fields two">
                      <div className="field">
                        <label htmlFor="c-name">{L("Họ và tên", "Full name")}</label>
                        <input id="c-name" required placeholder={L("Nhập họ và tên của bạn", "Enter your full name")} value={formData.name} onChange={(e) => set("name", e.target.value)} />
                      </div>
                      <div className="field">
                        <label htmlFor="c-phone">{L("Số điện thoại", "Phone")}</label>
                        <input id="c-phone" type="tel" required placeholder={L("Nhập số điện thoại", "Enter your phone number")} value={formData.phone} onChange={(e) => set("phone", e.target.value)} />
                      </div>
                    </div>
                    <div className="field">
                      <label htmlFor="c-subject">{L("Tiêu đề", "Subject")}</label>
                      <input id="c-subject" placeholder={L("Bạn cần hỗ trợ điều gì?", "What do you need help with?")} value={formData.subject} onChange={(e) => set("subject", e.target.value)} />
                    </div>
                    <div className="field">
                      <label htmlFor="c-msg">{L("Nội dung", "Message")}</label>
                      <textarea id="c-msg" required placeholder={L("Viết nội dung bạn muốn nhắn cho chúng tôi...", "Write your message here...")} value={formData.message} onChange={(e) => set("message", e.target.value)} />
                    </div>
                  </div>
                </fieldset>
                <div className="submit-row"><button className="btn" type="submit" disabled={isSubmitting}>{isSubmitting ? L("Đang gửi...", "Sending...") : L("Gửi tin nhắn", "Send message")}</button></div>
              </form>
              <aside>
                <div className="ticket">
                  <div className="ticket-top"><small>{L("Liên hệ trực tiếp", "Reach us directly")}</small><b>Xe Cố Đô Xanh</b></div>
                  <div className="ticket-body">
                    <div className="row"><span>Hotline</span><span><a href={`tel:${phoneNumber}`}>{phoneNumber}</a></span></div>
                    <div className="row"><span>Email</span><span><a href="mailto:hieubyi@gmail.com">hieubyi@gmail.com</a></span></div>
                    <div className="row"><span>{L("Giờ làm việc", "Hours")}</span><span>07:00 - 22:00</span></div>
                    <div className="row"><span>{L("Địa chỉ", "Address")}</span><span>Số 61, Ngõ 281, Đường Đinh Tiên Hoàng, Phường Hoa Lư, TP. Ninh Bình</span></div>
                  </div>
                  <p className="ticket-note" style={{ paddingTop: 12 }}>
                    <iframe title="map" src="https://maps.google.com/maps?q=Xe+C%E1%BB%91+%C4%90%C3%B4+Xanh,+Ninh+B%C3%ACnh&t=&z=16&ie=UTF8&iwloc=&output=embed" width="100%" height="180" style={{ border: 0 }} loading="lazy" />
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
