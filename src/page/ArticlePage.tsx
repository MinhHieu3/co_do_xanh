import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { articles } from "../data/articles";

export default function ArticlePage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const lang = (language === "EN" ? "EN" : "VI") as "VI" | "EN";
  const a = articles.find((x) => x.slug === slug);

  useEffect(() => {
    if (!a) return;
    const c = a[lang];
    const prevTitle = document.title;
    document.title = `${c.title} | Xe Cố Đô Xanh`;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const prevDesc = meta?.content;
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = c.desc;
    const url = `https://xecodoxanh.com/news/${a.slug}`;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const createdLink = !link;
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    const prevHref = link.href;
    link.href = url;
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: c.title,
      description: c.desc,
      image: `https://xecodoxanh.com${a.image}`,
      datePublished: a.date,
      dateModified: a.date,
      inLanguage: lang === "VI" ? "vi" : "en",
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "Xe Cố Đô Xanh" },
      publisher: { "@type": "Organization", name: "Xe Cố Đô Xanh", logo: { "@type": "ImageObject", url: "https://xecodoxanh.com/og-image.png" } },
    });
    document.head.appendChild(ld);
    return () => {
      document.title = prevTitle;
      if (prevDesc !== undefined && meta) meta.content = prevDesc;
      if (createdLink) link?.remove(); else if (link) link.href = prevHref;
      ld.remove();
    };
  }, [a, lang]);

  if (!a) return <Navigate to="/news" replace />;
  const c = a[lang];
  const L = (vi: string, en: string) => (lang === "EN" ? en : vi);

  return (
    <article>
      <div className="page-head">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <p className="eyebrow">{a.category[lang]} · {new Date(a.date).toLocaleDateString(lang === "VI" ? "vi-VN" : "en-GB")}</p>
          <h1>{c.title}</h1>
          <p className="lead">{c.desc}</p>
        </div>
      </div>
      <div className="wrap prose">
        <figure className="postcard" style={{ transform: "none", marginBottom: 28 }}>
          <img src={a.image} alt={c.title} width={1100} height={687} />
        </figure>
        {c.sections.map((s) => (
          <section key={s.h} style={{ padding: 0 }}>
            <h2>{s.h}</h2>
            {s.p.map((t) => (<p key={t}>{t}</p>))}
          </section>
        ))}
        <p style={{ marginTop: 32, display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
          <Link className="btn" to="/booking">{L("Đặt xe ngay", "Book your ride")}</Link>
          <Link className="link-arrow" to="/news">{L("Tất cả bài viết", "All articles")}</Link>
        </p>
      </div>
    </article>
  );
}
