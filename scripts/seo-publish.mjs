#!/usr/bin/env node
/**
 * SEO publish bot
 *
 *   node scripts/seo-publish.mjs build    -> chạy sau `vite build`: sinh dist/sitemap.xml + file khoá IndexNow
 *   node scripts/seo-publish.mjs submit   -> chạy SAU KHI deploy đã live (GitHub Action):
 *                                            so sánh sitemap live với lần gửi trước, ping URL mới/đổi
 *
 * Biến môi trường:
 *   INDEXNOW_KEY                 khoá IndexNow (8-128 ký tự a-z0-9-). Bắt buộc ở cả build và submit.
 *   GSC_SERVICE_ACCOUNT_JSON     (tuỳ chọn) JSON service account đã được thêm làm Owner trong Search Console
 *   GSC_SITE_URL                 (tuỳ chọn) mặc định "sc-domain:xecodoxanh.com"
 *   SEO_STATE_FILE               (tuỳ chọn) mặc định ".seo-state.json"
 *   DRY_RUN=1                    chỉ in ra, không gọi API
 *
 * Lưu ý: KHÔNG dùng Google Indexing API — Google chỉ cho phép API đó với JobPosting/BroadcastEvent.
 * Với Google, cách chính thống là sitemap có lastmod chính xác + gửi sitemap qua Search Console API.
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { createSign } from "node:crypto";
import { articles, rentalGuide } from "../src/data/editorialArticles.ts";

const SITE = "https://xecodoxanh.com";
const HOST = "xecodoxanh.com";
const mode = process.argv[2];
const DRY = process.env.DRY_RUN === "1";
const KEY = process.env.INDEXNOW_KEY?.trim();
if (KEY && !/^[a-zA-Z0-9-]{8,128}$/.test(KEY)) {
  console.error("[seo] INDEXNOW_KEY không hợp lệ: cần 8-128 ký tự a-z, A-Z, 0-9 hoặc '-'");
  process.exit(1);
}
const TODAY = new Date().toISOString().slice(0, 10);

/** fetch có timeout 15s và thử lại khi lỗi mạng / 5xx / 429 */
async function http(url, opts = {}, tries = 3) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { ...opts, signal: AbortSignal.timeout(15000) });
      if ((res.status >= 500 || res.status === 429) && i < tries) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (e) {
      if (i >= tries) throw e;
      console.warn(`[seo] ${url}: ${e.message}, thử lại (${i}/${tries - 1})`);
      await new Promise((r) => setTimeout(r, 2000 * i));
    }
  }
}

/* ---------- 1. Danh sách URL ---------- */
// Trang tĩnh: khi sửa nội dung trang nào, cập nhật ngày ở đây để bot ping lại trang đó.
const STATIC_PAGES = [
  { path: "/", lastmod: "2026-10-27", priority: "1.0", changefreq: "weekly", alt: true },
  { path: "/index-en.html", lastmod: "2026-10-27", priority: "0.9", changefreq: "weekly", alt: true },
  { path: "/booking", lastmod: "2026-10-15", priority: "0.8", changefreq: "monthly" },
  { path: "/pricing", lastmod: "2026-10-27", priority: "0.8", changefreq: "monthly" },
  { path: "/news", lastmod: "2026-10-15", priority: "0.8", changefreq: "weekly" },
  { path: "/contact", lastmod: "2026-10-27", priority: "0.7", changefreq: "monthly" },
  { path: "/faq", lastmod: "2026-10-15", priority: "0.7", changefreq: "monthly" },
  { path: "/policy", lastmod: "2026-10-15", priority: "0.4", changefreq: "yearly" },
  { path: "/privacy", lastmod: "2026-10-15", priority: "0.3", changefreq: "yearly" },
];

function collectUrls() {
  const posts = [
    ...articles.map((a) => ({ slug: a.slug, lastmod: a.updated ?? a.date })),
    { slug: "kinh-nghiem-thue-xe-may-dien-ninh-binh", lastmod: rentalGuide.updated ?? rentalGuide.date },
  ].filter((p) => p.lastmod <= TODAY) // bài hẹn ngày đăng trong tương lai chưa vào sitemap
    .map((p) => ({ path: `/news/${p.slug}`, lastmod: p.lastmod, priority: "0.7", changefreq: "monthly" }));
  return [...STATIC_PAGES, ...posts];
}

/* ---------- 2. Sitemap ---------- */
function sitemapXml(urls) {
  const alt = `
    <xhtml:link rel="alternate" hreflang="vi" href="${SITE}/" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}/index-en.html" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/" />`;
  const body = urls
    .map((u) => `  <url>
    <loc>${SITE}${u.path}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${u.alt ? alt : ""}
  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;
}

function build() {
  if (!existsSync("dist")) mkdirSync("dist");
  const urls = collectUrls();
  writeFileSync("dist/sitemap.xml", sitemapXml(urls));
  console.log(`[seo] dist/sitemap.xml: ${urls.length} URL`);
  if (KEY) {
    // IndexNow xác minh quyền sở hữu domain bằng file https://domain/<key>.txt
    writeFileSync(`dist/${KEY}.txt`, KEY);
    console.log(`[seo] dist/${KEY}.txt đã tạo`);
  } else {
    console.warn("[seo] Thiếu INDEXNOW_KEY: bỏ qua file khoá IndexNow");
  }
}

/* ---------- 3. Submit ---------- */
async function liveSitemap() {
  const res = await http(`${SITE}/sitemap.xml`, { headers: { "cache-control": "no-cache" } });
  if (!res.ok) throw new Error(`Không tải được sitemap live: HTTP ${res.status}`);
  const xml = await res.text();
  const map = {};
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) map[m[1]] = m[2];
  return map;
}

async function indexNow(urls) {
  if (!KEY) return console.warn("[seo] Thiếu INDEXNOW_KEY: bỏ qua IndexNow");
  const keyRes = await http(`${SITE}/${KEY}.txt`);
  // vercel.json rewrite mọi đường dẫn về index.html (HTTP 200), nên phải kiểm tra nội dung file
  if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
    throw new Error(`File khoá ${SITE}/${KEY}.txt chưa live hoặc sai nội dung (kiểm tra INDEXNOW_KEY trên Vercel)`);
  }
  if (DRY) return console.log("[seo] (dry) IndexNow:", urls);
  // api.indexnow.org chia sẻ cho Bing, Yandex, Seznam, Naver... (Cốc Cốc dùng dữ liệu Bing)
  const res = await http("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
  });
  console.log(`[seo] IndexNow: HTTP ${res.status}`);
  if (res.status >= 400) throw new Error(`IndexNow lỗi: ${await res.text()}`);
}

const b64url = (b) => Buffer.from(b).toString("base64url");
async function googleToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(JSON.stringify({
    iss: sa.client_email, scope: "https://www.googleapis.com/auth/webmasters",
    aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600,
  }));
  const sig = createSign("RSA-SHA256").update(`${head}.${claim}`).sign(sa.private_key, "base64url");
  const res = await http("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${head}.${claim}.${sig}` }),
  });
  const json = await res.json();
  if (!json.access_token) throw new Error(`Google OAuth lỗi: ${JSON.stringify(json)}`);
  return json.access_token;
}

async function searchConsoleSubmitSitemap() {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw) return console.warn("[seo] Thiếu GSC_SERVICE_ACCOUNT_JSON: bỏ qua Search Console");
  const site = process.env.GSC_SITE_URL || `sc-domain:${HOST}`;
  if (DRY) return console.log(`[seo] (dry) Search Console: gửi sitemap cho ${site}`);
  const token = await googleToken(JSON.parse(raw));
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/sitemaps/${encodeURIComponent(`${SITE}/sitemap.xml`)}`;
  const res = await http(url, { method: "PUT", headers: { authorization: `Bearer ${token}` } });
  console.log(`[seo] Search Console sitemap submit: HTTP ${res.status}`);
  if (!res.ok) throw new Error(`Search Console lỗi: ${await res.text()}`);
}

async function submit() {
  const stateFile = process.env.SEO_STATE_FILE || ".seo-state.json";
  const prev = existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, "utf8")) : {};
  const live = await liveSitemap();
  const changed = Object.keys(live).filter((loc) => prev[loc] !== live[loc]);
  // URL đã bị gỡ khỏi sitemap: IndexNow cũng nhận URL đã xoá để cập nhật chỉ mục nhanh hơn
  const removed = Object.keys(prev).filter((loc) => !(loc in live));
  if (removed.length) console.log(`[seo] ${removed.length} URL đã gỡ:\n  ${removed.join("\n  ")}`);
  changed.push(...removed);

  if (!changed.length) return console.log("[seo] Không có URL mới hoặc thay đổi");
  console.log(`[seo] ${changed.length} URL mới/đổi:\n  ${changed.join("\n  ")}`);

  await indexNow(changed);
  await searchConsoleSubmitSitemap();
  if (!DRY) writeFileSync(stateFile, JSON.stringify(live, null, 2));
}

if (mode === "build") build();
else if (mode === "submit") submit().catch((e) => { console.error(`[seo] ${e.message}`); process.exit(1); });
else { console.error("Dùng: node scripts/seo-publish.mjs build|submit"); process.exit(1); }
