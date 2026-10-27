/**
 * NAP (Name – Address – Phone) chuẩn duy nhất của doanh nghiệp.
 * Mọi nơi hiển thị tên/địa chỉ/số điện thoại (website, schema, Google Business Profile,
 * Facebook, Zalo, TripAdvisor...) phải khớp 100% với dữ liệu ở đây.
 */
export const BUSINESS = {
  name: "Xe Cố Đô Xanh",
  url: "https://xecodoxanh.com",
  phone: "0866399986",
  phoneIntl: "+84866399986",
  street: "Số 61, Ngõ 281, Đường Đinh Tiên Hoàng",
  ward: "Phường Hoa Lư",
  city: "TP. Ninh Bình",
  region: "Ninh Bình",
  country: "VN",
  /** Địa chỉ đầy đủ, dùng nguyên văn ở mọi nơi */
  addressFull: "Số 61, Ngõ 281, Đường Đinh Tiên Hoàng, Phường Hoa Lư, TP. Ninh Bình",
  addressFullEn: "No. 61, Alley 281, Dinh Tien Hoang Street, Hoa Lu Ward, Ninh Binh City",
  opens: "07:00",
  closes: "22:00",
} as const;
