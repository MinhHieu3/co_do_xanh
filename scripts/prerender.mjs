#!/usr/bin/env node
/**
 * Prerender: sau `vite build`, render từng route công khai thành HTML tĩnh để Googlebot
 * và các bot AI (không chạy JavaScript) đọc được toàn bộ nội dung.
 *
 *   dist/index.html            -> "/"
 *   dist/booking/index.html    -> "/booking"
 *   dist/news/<slug>/index.html
 *
 * Trình duyệt vẫn tải JS như cũ; main.tsx render lại lên #root nên hành vi không đổi.
 */
import { build } from "vite";
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");
const ssrOut = join(root, "node_modules/.prerender");

await build({
  root,
  logLevel: "warn",
  build: { ssr: "src/entry-server.tsx", outDir: ssrOut, emptyOutDir: true, rollupOptions: { input: undefined, output: { manualChunks: undefined } } },
  ssr: { noExternal: true },
});

const { render, getRouteMeta, publicRoutes } = await import(pathToFileURL(join(ssrOut, "entry-server.js")).href);

const templates = {
  VI: readFileSync(join(dist, "index.html"), "utf8"),
  EN: readFileSync(join(dist, "index-en.html"), "utf8"),
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const jsonLd = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

/** Tìm vị trí kết thúc thẻ <div> mở tại `from` (đếm cặp div lồng nhau) */
function divEnd(html, from) {
  const re = /<div\b|<\/div>/g;
  re.lastIndex = from;
  let depth = 0;
  for (let m; (m = re.exec(html)); ) {
    depth += m[0] === "</div>" ? -1 : 1;
    if (depth === 0) return m.index + 6;
  }
  throw new Error("[prerender] Thẻ div không cân bằng");
}

/**
 * React prerender xuất nội dung Suspense đã xong dưới dạng <div hidden id="S:n"> + script $RC để
 * trình duyệt tự hoán đổi. Bot không chạy JS sẽ chỉ thấy fallback "Loading...", nên hoán đổi sẵn ở đây.
 */
function inlineSuspense(html) {
  for (let m; (m = /<div hidden="" id="S:(\d+)">|<div hidden id="S:(\d+)">/.exec(html)); ) {
    const id = m[1] ?? m[2];
    const segStart = m.index;
    const segEnd = divEnd(html, segStart);
    const content = html.slice(segStart + m[0].length, segEnd - 6);
    html = html.slice(0, segStart) + html.slice(segEnd);
    const holeRe = new RegExp(`<!--\\$\\?--><template id="B:${id}"></template>[\\s\\S]*?<!--/\\$-->`);
    if (!holeRe.test(html)) throw new Error(`[prerender] Không tìm thấy chỗ trống B:${id}`);
    html = html.replace(holeRe, () => `<!--$-->${content}<!--/$-->`);
  }
  // Bỏ các script runtime hoán đổi của React (không còn cần)
  return html.replace(/<script>(?:(?!<\/script>)[\s\S])*?\$R[CSX][\s\S]*?<\/script>/g, "");
}

function fill(template, appHtml, meta) {
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${meta.canonical}$2`);
  const schemas = meta.schemas.map((s) => `<script type="application/ld+json" data-route-schema>${jsonLd(s)}</script>`).join("\n  ");
  html = html.replace("</head>", `  <meta property="og:url" content="${meta.canonical}" />\n  ${schemas}\n</head>`);
  // Thay splash screen trong #root bằng nội dung thật
  const start = html.indexOf('<div id="root">');
  const end = html.lastIndexOf("</div>", html.indexOf("</body>"));
  if (start < 0 || end < 0) throw new Error("Không tìm thấy <div id=\"root\"> trong template");
  return html.slice(0, start) + `<div id="root">${appHtml}` + html.slice(end);
}

let ok = 0;
for (const route of publicRoutes()) {
  const lang = route === "/index-en.html" ? "EN" : "VI";
  const appHtml = inlineSuspense(await render(route, lang));
  if (appHtml.length < 2000) throw new Error(`[prerender] ${route}: HTML quá ngắn (${appHtml.length} ký tự), có thể trang bị lỗi`);
  const out = route === "/" ? join(dist, "index.html") : route.endsWith(".html") ? join(dist, route) : join(dist, route, "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, fill(templates[lang], appHtml, getRouteMeta(route, lang === "EN")));
  ok++;
  console.log(`[prerender] ${route}  (${(appHtml.length / 1024).toFixed(1)} KB)`);
}
rmSync(ssrOut, { recursive: true, force: true });
console.log(`[prerender] Xong ${ok} trang`);
