import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { ebikeContent } from "../data/ebikeContent";

export default function FaqPage() {
  const { language } = useLanguage();
  const c = ebikeContent[language as "VI" | "EN"];
  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <p className="eyebrow">{c.faq.eyebrow}</p>
          <h1>{c.faq.title}</h1>
        </div>
      </div>
      <div className="wrap prose">
        <div className="faq-list" style={{ maxWidth: 820 }}>
          {c.faq.items.map((f) => (
            <details className="faq" key={f.q}>
              <summary>{f.q}</summary>
              <div className="a">{f.a.map((p) => (<p key={p}>{p}</p>))}</div>
            </details>
          ))}
        </div>
        <p className="faq-more"><Link className="link-arrow" to="/booking">{c.closing.cta}</Link></p>
      </div>
    </>
  );
}
