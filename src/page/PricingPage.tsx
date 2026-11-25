import { Link } from "react-router-dom";
import { SHOW_PRICE, contactLabel } from "../config";
import { useLanguage } from "../context/LanguageContext";
import { usesCalendarDay } from "../data/bookingDates";
import { vehicles } from "../data/vehicles";

export default function PricingPage() {
  const { language } = useLanguage();
  const isEnglish = language === "EN";
  const label = (vi: string, en: string) => isEnglish ? en : vi;

  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <h1>{label("Bảng giá thuê xe", "Rental prices")}</h1>
        </div>
      </div>
      <div className="wrap prose">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-current">
                <th scope="col" className="p-3">{label("Xe", "Vehicle")}</th>
                <th scope="col" className="p-3">{label("Giá thuê", "Rate")}</th>
                <th scope="col" className="p-3">{label("Thời gian thuê một ngày", "One-day rental period")}</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-b border-black/10">
                  <th scope="row" className="p-3 font-semibold">
                    {isEnglish ? vehicle.nameEn ?? vehicle.name : vehicle.name}
                  </th>
                  <td className="p-3">
                    {SHOW_PRICE ? (isEnglish ? vehicle.pricingEn.day1 : vehicle.pricing.day1) : contactLabel(language)}
                  </td>
                  <td className="p-3">
                    {usesCalendarDay(vehicle.id)
                      ? label("Đến 23:59 cùng ngày", "Until 23:59 on the pickup date")
                      : label("24 giờ kể từ lúc nhận xe", "24 hours from pickup")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6">
          <Link className="btn" to="/booking">{label("Đặt xe ngay", "Book your ride")}</Link>
        </p>
      </div>
    </>
  );
}
