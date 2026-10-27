/**
 * Entry chỉ dùng lúc build để prerender HTML tĩnh cho từng route (scripts/prerender.mjs).
 * Không được import vào bundle trình duyệt.
 */
import { StrictMode } from "react";
import { prerender } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { getRouteMeta } from "./seo/routeMeta";
import { articles, rentalGuide } from "./data/editorialArticles";

export { getRouteMeta };

/** Các route công khai cần prerender (không gồm /admin) */
export function publicRoutes(): string[] {
  const today = new Date().toISOString().slice(0, 10);
  const posts = [...articles.map((a) => ({ slug: a.slug, date: a.date })), { slug: "kinh-nghiem-thue-xe-may-dien-ninh-binh", date: rentalGuide.date }]
    .filter((p) => p.date <= today)
    .map((p) => `/news/${p.slug}`);
  return ["/", "/index-en.html", "/booking", "/pricing", "/contact", "/news", "/faq", "/policy", "/privacy", ...posts];
}

async function streamToString(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let html = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  return html + decoder.decode();
}

export async function render(url: string, language: "VI" | "EN") {
  // prerender() (React 19) chờ mọi lazy()/Suspense xong mới trả HTML
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <App initialLanguage={language} />
      </StaticRouter>
    </StrictMode>,
  );
  return streamToString(prelude as ReadableStream<Uint8Array>);
}
