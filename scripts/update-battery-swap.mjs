import { readFile, rename, writeFile } from "node:fs/promises";
import { gunzipSync } from "node:zlib";

const source = new URL("https://static-cms-prod.vinfastauto.com/locators/");
const output = new URL("../public/ebike/data/vinfast-battery-swap.json", import.meta.url);
const headers = { Origin: "https://vinfastauto.com", Referer: "https://vinfastauto.com/" };

async function download(url) {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(120_000) });
  if (!response.ok) throw new Error(`VinFast returned HTTP ${response.status} for ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

// The local-file option also works when VinFast serves the file as JSON with HTTP compression.
const [localFile, localVersion] = process.argv.slice(2);
const generation = localFile
  ? Number(localVersion)
  : JSON.parse(await download(new URL("locators-meta.json", source))).generation;
if (!Number.isSafeInteger(generation) || generation < 1) {
  throw new Error("A valid VinFast locator generation is required");
}

const bytes = localFile ? await readFile(localFile) : await download(new URL(`locators-${generation}.json.gz`, source));
const json = bytes[0] === 0x1f && bytes[1] === 0x8b ? gunzipSync(bytes) : bytes;
const { data } = JSON.parse(json);
if (!Array.isArray(data)) throw new Error("Unexpected VinFast locator format");

const boundaryFile = new URL("./data/ninh-binh-boundary.geojson", import.meta.url);
const { bbox: [west, south, east, north], geometry } = JSON.parse(await readFile(boundaryFile, "utf8"));

function inRing(lng, lat, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[j];
    if ((y1 > lat) !== (y2 > lat) && lng < x1 + (x2 - x1) * (lat - y1) / (y2 - y1)) {
      inside = !inside;
    }
  }
  return inside;
}

function inNinhBinh(lng, lat) {
  return lng >= west && lng <= east && lat >= south && lat <= north
    && geometry.coordinates.some(([outer, ...holes]) => (
      inRing(lng, lat, outer) && !holes.some((hole) => inRing(lng, lat, hole))
    ));
}

// Use the stated province to catch mislocated pins and retain local addresses with bad coordinates.
const localProvince = /(?:^|[,;.]\s*|tỉnh\s+)(?:Ninh Bình|Hà Nam|Nam Định)[\s.,;]*$/iu;
const otherProvince = /(?:^|[,;.]\s*|tỉnh\s+|thành phố\s+|tp\.\s*)(?:Hà Nội|Thanh H[oó]a|Hưng Yên|Thái Bình|Hải Phòng|Hải Dương|Phú Thọ|Hòa Bình)[\s.,;]*$/iu;
const stations = [];
for (const row of data) {
  if (row.category_slug !== "battery_swap_station") continue;
  const lat = Number(row.lat);
  const lng = Number(row.lng);
  const address = row.address.trim();
  const name = row.name.trim();
  if (otherProvince.test(address)) continue;
  if (inNinhBinh(lng, lat)) {
    stations.push([lat, lng, name, address]);
  } else if (localProvince.test(address)) {
    stations.push([null, null, name, address]);
  }
}

if (!stations.length) throw new Error("No VinFast battery swap locations found in Ninh Bình");

const updated = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" }).format(new Date());
const temporary = new URL(`${output.href}.tmp`);
const metadata = JSON.stringify({ generation, updated }).slice(0, -1);
await writeFile(temporary, `${metadata},"stations":[\n${stations.map((station) => JSON.stringify(station)).join(",\n")}\n]}\n`);
await rename(temporary, output);

console.log(`Saved ${stations.length} battery swap locations in Ninh Bình from VinFast generation ${generation}.`);
