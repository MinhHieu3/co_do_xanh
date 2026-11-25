import { Link, Navigate, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { articles } from "../data/articles";

export default function ArticlePage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const lang = (language === "EN" ? "EN" : "VI") as "VI" | "EN";
  const a = articles.find((x) => x.slug === slug);

  if (!a) return <Navigate to="/news" replace />;
  const c = a[lang];
  const L = (vi: string, en: string) => (lang === "EN" ? en : vi);

  return (
    <article>
      <div className="page-head">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <p className="eyebrow">
            {a.category[lang]} · <time dateTime={a.date}>{new Date(a.date).toLocaleDateString(lang === "VI" ? "vi-VN" : "en-GB")}</time>
            {` · ${L("Cập nhật", "Updated")} ${new Date(a.modified).toLocaleDateString(lang === "VI" ? "vi-VN" : "en-GB")}`}
          </p>
          <h1>{c.title}</h1>
          <p className="lead">{c.desc}</p>
        </div>
      </div>
      <div className="wrap prose">
        <figure className="postcard" style={{ transform: "none", marginBottom: 28 }}>
          <img
            src={a.image}
            srcSet={`${a.thumbnail.path} ${a.thumbnail.width}w, ${a.image} ${a.imageWidth}w`}
            sizes="(min-width: 800px) 760px, 92vw"
            width={a.imageWidth}
            height={a.imageHeight}
            alt={c.title}
          />
        </figure>
        <p className="lead">{c.intro}</p>
        {c.sections.map((s) => (
          <section key={s.h} style={{ padding: 0 }}>
            <h2>{s.h}</h2>
            {s.p.map((t) => (<p key={t}>{t}</p>))}
          </section>
        ))}
        <section style={{ padding: 0 }}>
          <h2>{c.conclusionHeading ?? L("Kết luận", "The takeaway")}</h2>
          <p>{c.conclusion}</p>
        </section>
        <p style={{ marginTop: 32, display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
          <Link className="btn" to="/booking">{L("Đặt xe ngay", "Book your ride")}</Link>
          <Link className="link-arrow" to="/news">{L("Tất cả bài viết", "All articles")}</Link>
        </p>
      </div>
    </article>
  );
}
