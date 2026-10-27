import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { articles } from "../data/articles";

export default function NewsPage() {
  const { language } = useLanguage();
  const lang = (language === "EN" ? "EN" : "VI") as "VI" | "EN";

  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <p className="eyebrow">{lang === "EN" ? "Rental guides" : "Cẩm nang thuê xe"}</p>
          <h1>{lang === "EN" ? "Electric motorbike rental in Ninh Binh – travel guides & tips" : "Thuê xe máy điện Ninh Bình – cẩm nang & kinh nghiệm"}</h1>
          <p className="lead">
            {lang === "EN"
              ? "Routes, prices and itineraries for renting an electric motorbike and exploring Ninh Binh."
              : "Lịch trình, giá thuê và kinh nghiệm khi thuê xe máy điện khám phá Ninh Bình."}
          </p>
        </div>
      </div>
      <section style={{ paddingTop: 36 }}>
        <div className="wrap">
          <div className="rides">
            {articles.map((a) => (
              <article className="ride" key={a.slug}>
                <Link to={`/news/${a.slug}`} style={{ display: "contents", textDecoration: "none", color: "inherit" }}>
                  <img src={a.image} alt={a[lang].title} loading="lazy" />
                  <div className="ride-body">
                    <span className="kind">{a.category[lang]} · {new Date(a.date).toLocaleDateString(lang === "VI" ? "vi-VN" : "en-GB")}</span>
                    <h3>{a[lang].title}</h3>
                    <p className="pitch">{a[lang].desc}</p>
                  </div>
                  <div className="ride-foot">
                    <span className="link-arrow">{lang === "EN" ? "Read more" : "Đọc tiếp"}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
