import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { ebikeContent, PRICE } from "../data/ebikeContent";
import { SHOW_PRICE, contactLabel } from "../config";

const Tick = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
);

export default function HomePage() {
  const { language } = useLanguage();
  const c = ebikeContent[language as "VI" | "EN"];
  const [left, setLeft] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const bookbarRef = useRef<HTMLDivElement | null>(null);
  const firstBtnRef = useRef<HTMLAnchorElement | null>(null);

  // Countdown to the 6 am cutoff (Vietnam time, UTC+7)
  useEffect(() => {
    const tick = () => {
      const d = new Date(Date.now() + 7 * 3600 * 1000);
      const now = d.getUTCHours() * 60 + d.getUTCMinutes();
      const cut = 6 * 60;
      const mins = now < cut ? cut - now : cut + 1440 - now;
      const h = Math.floor(mins / 60), m = mins % 60;
      const today = now < cut;
      const vi = language === "VI";
      const when = vi ? (today ? "sáng nay" : "sáng mai") : today ? "this morning" : "tomorrow morning";
      setLeft(
        vi
          ? `Đặt trong ${h > 0 ? `${h} giờ ` : ""}${m} phút nữa để nhận xe ${when}`
          : `Book within ${h > 0 ? `${h} h ` : ""}${m} min for delivery ${when}`
      );
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [language]);

  // Load the hero video only after it is visible and the browser is idle.
  useEffect(() => {
    const hv = videoRef.current;
    if (!hv) return;
    const conn = (navigator as any).connection || {};
    const slow = conn.saveData || /(^|-)(2g|3g)$/.test(conn.effectiveType || "");
    const still = slow || matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) return;
    const start = () => {
      hv.src = window.innerWidth < 700 ? "/ebike/video/hero-540.mp4" : "/ebike/video/hero-720.mp4";
      hv.muted = true;
      const p = hv.play();
      p.catch(() => { });
    };
    const schedule = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(start, { timeout: 2000 });
      } else {
        setTimeout(start, 250);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      schedule();
    }, { rootMargin: "100px" });
    observer.observe(hv);
    return () => observer.disconnect();
  }, []);

  // Mobile book bar appears once the first button scrolls away
  useEffect(() => {
    const bar = bookbarRef.current, first = firstBtnRef.current;
    if (!bar || !first || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((e) => {
      bar.classList.toggle("on", !e[0].isIntersecting && e[0].boundingClientRect.top < 0);
    });
    io.observe(first);
    return () => io.disconnect();
  }, []);

  const h = c.hero;
  const fares = [
    { l: h.moto, p: PRICE.moto, u: PRICE.motoUsd },
    { l: h.ebike, p: PRICE.ebike, u: PRICE.ebikeUsd },
  ];
  const prices = [PRICE.moto, PRICE.ebike, PRICE.moto, PRICE.moto];
  const usd = [PRICE.motoUsd, PRICE.ebikeUsd, PRICE.motoUsd, PRICE.motoUsd];
  const rideIds = ["vinfast-evo-lite", "xe-dap-phoenix-nam", "vinfast-evo", "vinfast-feliz-2"];
  const rideImgs = [
    { s: "/ebike/img/ride-evo-lite-640.jpg", s2: "/ebike/img/ride-evo-lite-1100.jpg", w: 1100, h: 911, alt: "VinFast Evo Lite", q: "motorbike" },
    { s: "/ebike/img/phoenix-pair-640.webp", s2: "/ebike/img/phoenix-pair-1100.webp", w: 1100, h: 688, alt: "Phoenix electric bicycles", q: "ebike" },
    { s: "/ebike/img/ride-evo-640.jpg", s2: "/ebike/img/ride-evo-1100.jpg", w: 1100, h: 901, alt: "VinFast Evo", q: "evo" },
    { s: "/ebike/img/ride-feliz2-640.jpg", s2: "/ebike/img/ride-feliz2-1100.jpg", w: 1100, h: 884, alt: "VinFast Feliz II", q: "feliz" },
  ];
  const snapSrc = ["tam-coc", "trang-an", "hoa-lu", "bai-dinh"];

  return (
    <div className="eb-home">
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-a">
            <p className="eyebrow">{h.eyebrow}</p>
            <h1>{h.h1a}<span className="nw">{h.h1b}</span>{h.h1c}<em>{h.h1d}</em>{h.h1e}</h1>
            <p className="lead">{h.lead}</p>
            <div className="hero-cta">
              <Link ref={firstBtnRef} className="btn" to="/booking">{h.cta}</Link>
              <Link className="link-arrow" to="/#day">{h.see}</Link>
            </div>
            <p className="deadline">{left || h.deadline}</p>
          </div>
          <div className="cards">
            <figure className="postcard p1 p-video">
              <video ref={videoRef} className="hero-video" muted loop playsInline preload="none" poster="/ebike/img/hero-poster-new.jpg" width={1280} height={720} aria-label="Riding an electric scooter between the rice fields">
                <img src="/ebike/img/hero-poster-new.jpg" width={1280} height={720} alt="A quiet road between the rice fields with the limestone mountains behind" />
              </video>
              <figcaption>{h.caption1}</figcaption>
            </figure>
            <figure className="postcard p2">
              <img src="/ebike/img/riders-520.webp" srcSet="/ebike/img/riders-520.webp 520w, /ebike/img/riders-900.webp 900w" sizes="(min-width: 900px) 240px, 30vw" width={900} height={675} alt="Two happy riders in helmets on electric motorbikes" loading="lazy" />
              <figcaption>{h.caption2}</figcaption>
            </figure>
            <svg className="stamp" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="st" d="M100 100m-72 0a72 72 0 1 1 144 0a72 72 0 1 1-144 0" /></defs><circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="4" /><circle cx="100" cy="100" r="86" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="100" cy="100" r="52" fill="none" stroke="currentColor" strokeWidth="1.5" /><text fontFamily="Be Vietnam Pro, Arial, sans-serif" fontSize="17.5" fontWeight="700" letterSpacing="3.2" fill="currentColor"><textPath href="#st">{h.stamp}</textPath></text><image href="/favicon.png" x="33" y="33" width="134" height="134" preserveAspectRatio="xMidYMid meet" /></svg>
          </div>
          <div className="hero-b">
            <div className="fares">
              {fares.map((f) => (
                <div className="fare" key={f.l}><span>{f.l}</span> <b>{SHOW_PRICE ? `${f.p} ${language === "VI" ? "/Ngày" : "VND"}` : contactLabel(language)}</b> {SHOW_PRICE && <small>{h.perDay}{f.u}</small>}</div>
              ))}
            </div>
            <ul className="ticks">
              {h.ticks.map((t: string) => (<li key={t}><Tick /> {t}</li>))}
            </ul>
          </div>
        </div>
      </section>

      <section className="day" id="day">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">{c.day.eyebrow}</p>
            <h2>{c.day.title}</h2>
            <p className="lead">{c.day.lead}</p>
          </div>
          <ol className="timeline">
            {c.day.steps.map(([when, title, text]: string[]) => (
              <li key={title}>
                <div className="when">{when}</div>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="rides">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">{c.rides.eyebrow}</p>
            <h2>{c.rides.title}</h2>
            <p className="lead">{c.rides.lead}</p>
          </div>
          <div className="rides">
            {/* Thứ tự hiển thị: xe máy điện trước, xe đạp trợ lực (index 1) cuối cùng */}
            {[0, 2, 3, 1].map((i) => rideImgs[i]).map((r, pos) => { const i = [0, 2, 3, 1][pos]; return (
              <article className="ride" key={r.q}>
                <img src={r.s} srcSet={i < 2 ? `${r.s} 640w, ${r.s2} 1100w` : undefined} sizes="(min-width: 820px) 520px, 92vw" width={r.w} height={r.h} alt={r.alt} loading="lazy" style={i >= 2 ? { objectFit: "cover" } : undefined} />
                <div className="ride-body">
                  <span className="kind">{c.rides.kind[i]}</span>
                  <h3>{c.rides.names[i]}</h3>
                  <p className="pitch">{c.rides.pitch[i]}</p>
                  <ul className="specs">
                    {c.rides.specs[i].map((s: string) => (<li key={s}><Tick /> {s}</li>))}
                  </ul>
                  <p className="goodfor"><b>{c.rides.good[0]}</b> {c.rides.good[i + 1]}</p>
                </div>
                <div className="ride-foot">
                  <div className="price"><b>{SHOW_PRICE ? `${prices[i]} ${language === "VI" ? "/Ngày" : "VND"}` : contactLabel(language)}</b>{SHOW_PRICE && <span>{c.rides.perDay}{usd[i]}</span>}</div>
                  <Link className="btn btn-sm" to="/booking" state={{ selectedVehicle: rideIds[i] }}>{c.rides.book}</Link>
                </div>
              </article>
            ); })}
          </div>
        </div>
      </section>

      {/* AI guide section (hidden)
      <section className="guide" id="guide">
        <div className="wrap guide-grid">
          <div>
            <p className="eyebrow">{c.guide.eyebrow}</p>
            <h2>{c.guide.title}</h2>
            <p className="lead">{c.guide.lead}</p>
            <p className="guide-sample">
              <button type="button" className="btn alt sample-btn" onClick={toggleSample}>{playing ? c.guide.stop : c.guide.listen}</button>{" "}
              <span className="hint">{c.guide.hint}</span>
            </p>
            <ul className="guide-list">
              {c.guide.list.map(([b, s]: string[]) => (<li key={b}><b>{b}</b><span>{s}</span></li>))}
            </ul>
            <p className="guide-langs">{c.guide.langs}</p>
            <p className="row-btns"><Link className="btn" to="/booking">{c.guide.plan}</Link></p>
          </div>
          <div className="guide-phones">
            <img src="/ebike/img/guide-today-640.webp" srcSet="/ebike/img/guide-today-640.webp 640w, /ebike/img/guide-today-1100.webp 1100w" sizes="(min-width: 900px) 480px, 92vw" width={1100} height={930} alt="The guide on a phone" loading="lazy" />
          </div>
        </div>
      </section>
      */}

      <section className="versus" id="compare">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">{c.versus.eyebrow}</p>
            <h2>{c.versus.title}</h2>
            <p className="lead">{c.versus.lead}</p>
          </div>
          <div className="vs">
            <div className="vs-head"><span /><span>{c.versus.head[0]}</span><span>{c.versus.head[1]}</span></div>
            {c.versus.rows.map(([b, them, us]: string[]) => (
              <div className="vs-row" key={b}>
                <b>{b}</b>
                <span className="them" data-l={c.versus.lThem}>{them}</span>
                <span className="us" data-l={c.versus.lUs}>{us}</span>
              </div>
            ))}
          </div>
          <Link className="btn" to="/booking">{c.versus.cta}</Link>
        </div>
      </section>

      <section id="review">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">{c.review.eyebrow}</p>
            <h2>{c.review.title}</h2>
          </div>
          <div className="voice-top">
            <blockquote className="voice-main">
              <p className="stars" role="img" aria-label={c.review.stars}>★★★★★</p>
              <p>{c.review.main}</p>
              <footer>{c.review.by}</footer>
            </blockquote>
            <figure className="postcard voice-photo">
              <img src="/ebike/img/review-delivery-640.webp" srcSet="/ebike/img/review-delivery-420.webp 420w, /ebike/img/review-delivery-640.webp 640w" sizes="(min-width: 820px) 300px, 70vw" width={640} height={800} alt={c.review.photoAlt} loading="lazy" />
              <figcaption>{c.review.cap}</figcaption>
            </figure>
          </div>
          <div className="review-gallery">
            <figure>
              <img
                src="/ebike/img/review-customer-3549-900.webp"
                srcSet="/ebike/img/review-customer-3549-420.webp 420w, /ebike/img/review-customer-3549-900.webp 900w"
                sizes="(min-width: 820px) 360px, 46vw"
                width={900}
                height={1200}
                alt={language === "EN" ? "Guests with an electric motorbike in Ninh Binh" : "Du khách nhận xe máy điện tại Ninh Bình"}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{language === "EN" ? "Guests picking up their ride" : "Khách nhận xe trước chuyến đi"}</figcaption>
            </figure>
            <figure>
              <img
                src="/ebike/img/review-customer-3583-900.webp"
                srcSet="/ebike/img/review-customer-3583-420.webp 420w, /ebike/img/review-customer-3583-900.webp 900w"
                sizes="(min-width: 820px) 360px, 46vw"
                width={900}
                height={1200}
                alt={language === "EN" ? "Guests posing with two electric motorbikes before a ride" : "Nhóm khách chụp ảnh cùng hai xe máy điện trước chuyến đi"}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{language === "EN" ? "Ready to explore Ninh Binh" : "Sẵn sàng khám phá Ninh Bình"}</figcaption>
            </figure>
            <figure>
              <img
                src="/ebike/img/review-customer-3747-900.webp"
                srcSet="/ebike/img/review-customer-3747-420.webp 420w, /ebike/img/review-customer-3747-900.webp 900w"
                sizes="(min-width: 820px) 235px, 44vw"
                width={900}
                height={1200}
                alt={language === "EN" ? "Customer receiving an electric motorbike in the evening" : "Khách nhận xe máy điện vào buổi tối"}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{language === "EN" ? "Evening vehicle handover" : "Bàn giao xe buổi tối"}</figcaption>
            </figure>
            <figure>
              <img
                src="/ebike/img/review-customer-3748-900.webp"
                srcSet="/ebike/img/review-customer-3748-420.webp 420w, /ebike/img/review-customer-3748-900.webp 900w"
                sizes="(min-width: 820px) 235px, 44vw"
                width={900}
                height={1200}
                alt={language === "EN" ? "Guests collecting an electric scooter outside the rental shop" : "Khách nhận xe điện trước cửa hàng"}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{language === "EN" ? "Pickup at the shop" : "Nhận xe tại cửa hàng"}</figcaption>
            </figure>
            <figure>
              <img
                src="/ebike/img/review-customer-3750-900.webp"
                srcSet="/ebike/img/review-customer-3750-420.webp 420w, /ebike/img/review-customer-3750-900.webp 900w"
                sizes="(min-width: 820px) 235px, 44vw"
                width={900}
                height={1200}
                alt={language === "EN" ? "A couple posing beside their electric motorbike" : "Cặp đôi chụp ảnh bên xe máy điện"}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{language === "EN" ? "A ride together" : "Cùng nhau khám phá"}</figcaption>
            </figure>
          </div>
          <div className="voice-grid">
            {c.review.grid.map(([b, p]: string[]) => (<blockquote key={b}><b>{b}</b><p>{p}</p></blockquote>))}
          </div>
          <blockquote className="voice-second">
            <p>{c.review.second}</p>
            <footer>{c.review.second_by}</footer>
          </blockquote>
        </div>
      </section>

      <section className="included">
        <div className="wrap incl-grid">
          <div>
            <p className="eyebrow">{c.incl.eyebrow}</p>
            <h2>{c.incl.title}</h2>
            <p className="lead" style={{ marginTop: 14 }}>{c.incl.lead}</p>
            <p>{c.incl.p}</p>
            <p><Link className="link-arrow" to="/booking">{c.incl.link}</Link></p>
          </div>
          <div className="receipt">
            <h3>{c.incl.receipt}</h3>
            <dl>
              {c.incl.rows.map(([dt, dd]: string[]) => (<div className="row" key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>))}
              <div className="row total"><dt>{c.incl.total}</dt><dd>{language === "VI" ? "0 $" : "0 VND"}</dd></div>
            </dl>
            <p className="thanks">{c.incl.thanks}</p>
          </div>
        </div>
      </section>

      <section id="reach">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">{c.reach.eyebrow}</p>
            <h2>{c.reach.title}</h2>
            <p className="lead">{c.reach.lead}</p>
          </div>
          <div className="reach-grid">
            <div>
              <ol className="reach">
                {c.reach.items.map(([km, name, alt, text, tag]: any[]) => (
                  <li key={name}>
                    <div className="km">{km}<small>{c.reach.km}</small></div>
                    <div>
                      <h3>{name} <i>{alt}</i></h3>
                      <p>{text}</p>
                      <span className={`tag${tag ? " m" : ""}`}>{c.reach.tags[tag]}</span>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="reach-note">{c.reach.note}</p>
            </div>
            <div className="snaps">
              {snapSrc.map((s, i) => (
                <figure className="postcard" key={s}>
                  <img src={`/ebike/img/place-${s}-400.webp`} srcSet={`/ebike/img/place-${s}-400.webp 400w, /ebike/img/place-${s}-640.webp 640w`} sizes="(min-width: 900px) 220px, 44vw" width={640} height={480} alt={c.reach.snaps[i]} loading="lazy" />
                  <figcaption>{c.reach.snaps[i]}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--sky)" }} id="questions">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">{c.faq.eyebrow}</p>
            <h2>{c.faq.title}</h2>
          </div>
          <div className="faq-list">
            {c.faq.items.map((f) => (
              <details className="faq" key={f.q}>
                <summary>{f.q}</summary>
                <div className="a">{f.a.map((p) => (<p key={p}>{p}</p>))}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="closing">
        <picture>
          <img src="/ebike/img/road-900.webp" srcSet="/ebike/img/road-900.webp 900w, /ebike/img/road-1600.webp 1600w" sizes="100vw" width={1600} height={900} alt="" loading="lazy" />
        </picture>
        <div className="wrap">
          <span className="vn">{c.closing.vn}</span>
          <h2>{c.closing.title}</h2>
          <p>{c.closing.p}</p>
          <Link className="btn" to="/booking">{c.closing.cta}</Link>
        </div>
      </section>

      <div className="bookbar" id="bookbar" ref={bookbarRef}>
        <span>{c.bookbar.a}<b>{c.bookbar.b}</b></span>
        <Link className="btn btn-sm" to="/booking">{c.bookbar.cta}</Link>
      </div>
    </div>
  );
}
