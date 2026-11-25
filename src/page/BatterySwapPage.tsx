import { useDeferredValue, useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowUpRight, LocateFixed, MapPin, Search } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { NINH_BINH_CENTER, NINH_BINH_VIEW, type BatteryStation, type Coordinates, type MapView } from "../data/batterySwap";
import BatterySwapMap from "./BatterySwapMap";
import "./batterySwap.css";

const LOCATOR = "https://vinfastauto.com/vn_vi/tim-kiem-showroom-tram-sac";
const PAGE_SIZE = 30;

type StationRow = [lat: number | null, lng: number | null, name: string, address: string];
type StationData = { generation: number; updated: string; stations: StationRow[] };

const normalize = (value: string) => value.normalize("NFD").replace(/\p{M}/gu, "")
  .toLowerCase().replace(/đ/g, "d").replace(/[^a-z0-9]+/g, " ").trim();

function matchesSearch(stationSearch: string, query: string) {
  let offset = 0;
  for (const word of query.split(" ")) {
    const position = stationSearch.indexOf(` ${word}`, offset);
    if (position === -1) return false;
    offset = position + word.length + 1;
  }
  return true;
}

function distanceKm(a: Coordinates, b: Coordinates) {
  const radians = Math.PI / 180;
  const dlat = (a.lat - b.lat) * radians;
  const dlng = (a.lng - b.lng) * radians;
  const distance = Math.sin(dlat / 2) ** 2
    + Math.cos(a.lat * radians) * Math.cos(b.lat * radians) * Math.sin(dlng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(Math.min(distance, 1)));
}

function getStationView(stations: BatteryStation[]): MapView | undefined {
  let west = Infinity, south = Infinity, east = -Infinity, north = -Infinity;
  for (const { location } of stations) {
    if (!location) continue;
    const { lat, lng } = location;
    west = Math.min(west, lng);
    south = Math.min(south, lat);
    east = Math.max(east, lng);
    north = Math.max(north, lat);
  }
  if (west !== Infinity) return { bounds: [west, south, east, north] };
}

export default function BatterySwapPage() {
  const { language } = useLanguage();
  const english = language === "EN";
  const locale = english ? "en-GB" : "vi-VN";
  const count = new Intl.NumberFormat(locale);
  const decimals = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  const [retry, setRetry] = useState(0);
  const [data, setData] = useState<StationData>();
  const [loadError, setLoadError] = useState(false);
  const [query, setQuery] = useState("");
  const search = useDeferredValue(normalize(query));
  const [view, setView] = useState<MapView>(NINH_BINH_VIEW);
  const [origin, setOrigin] = useState<Coordinates>();
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [selected, setSelected] = useState<BatteryStation>();
  const [group, setGroup] = useState<BatteryStation[]>();
  const [limit, setLimit] = useState(PAGE_SIZE);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/ebike/data/vinfast-battery-swap.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Station data is unavailable");
        return response.json() as Promise<StationData>;
      })
      .then(setData)
      .catch(() => {
        if (!controller.signal.aborted) setLoadError(true);
      });

    return () => controller.abort();
  }, [retry]);

  const stations = useMemo(() => (data?.stations ?? []).map(([lat, lng, name, address], id) => ({
    id,
    location: lat === null || lng === null ? null : { lat, lng },
    name, address, search: ` ${normalize(`${name} ${address}`)}`,
  })), [data]);
  const matches = useMemo(() => {
    if (!search) return stations;
    const phrase = ` ${search}`;
    return stations.filter((station) => matchesSearch(station.search, search))
      .sort((a, b) => Number(b.search.includes(phrase)) - Number(a.search.includes(phrase)));
  }, [search, stations]);
  const results = useMemo(() => {
    const visible: BatteryStation[] = group ?? matches;
    if (search && !origin) return visible;
    const center = origin ?? NINH_BINH_CENTER;
    return visible.map((station) => ({ station, distance: station.location ? distanceKm(center, station.location) : Number.MAX_VALUE }))
      .sort((a, b) => a.distance - b.distance).map(({ station }) => station);
  }, [group, matches, origin, search]);

  const searchLabel = english ? "Search by location name or address" : "Tìm theo tên điểm hoặc địa chỉ";
  const mapLabel = english ? "VinFast battery swap map in Ninh Binh" : "Bản đồ đổi pin VinFast tại Ninh Bình";

  function resetMap(nextView: MapView) {
    setQuery("");
    setSelected(undefined);
    setGroup(undefined);
    setOrigin(undefined);
    setLimit(PAGE_SIZE);
    setLocationError(false);
    setView({ ...nextView });
  }

  function findNearby() {
    setLocationError(false);
    if (!navigator.geolocation) {
      setLocationError(true);
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const position = { lat: coords.latitude, lng: coords.longitude };
      const nearest = stations.reduce<Coordinates | undefined>((closest, station) => {
        if (!station.location) return closest;
        return !closest || distanceKm(position, station.location) < distanceKm(position, closest) ? station.location : closest;
      }, undefined);
      resetMap(nearest ? { center: [nearest.lat, nearest.lng], zoom: 13 } : NINH_BINH_VIEW);
      setOrigin(position);
      setLocating(false);
    }, () => {
      setLocationError(true);
      setLocating(false);
    }, { timeout: 10_000, maximumAge: 60_000 });
  }

  function focusStation(station: BatteryStation) {
    setSelected(station);
    if (station.location) setView({ center: [station.location.lat, station.location.lng], zoom: 16 });
  }

  const directions = selected && `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    selected.location ? `${selected.location.lat},${selected.location.lng}` : `${selected.address}, Việt Nam`,
  )}`;
  const directionsLabel = english ? "Directions" : "Chỉ đường";

  const resultLabel = search || group
    ? (english ? "matches" : "kết quả")
    : (english ? "locations in Ninh Binh" : "điểm đổi pin tại Ninh Bình");

  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <h1>{mapLabel}</h1>
          <p className="lead">{english ? "Find electric motorbike battery swap stations across Ninh Binh Province." : "Tra cứu các tủ đổi pin xe máy điện trong tỉnh Ninh Bình."}</p>
        </div>
      </div>
      <section className="wrap swap-section" aria-label={mapLabel}>
        <div className="swap-toolbar">
          <form role="search" onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const currentSearch = normalize(query);
            const submitted = currentSearch === search ? matches
              : stations.filter((station) => !currentSearch || matchesSearch(station.search, currentSearch));
            const nextView = getStationView(submitted);
            if (nextView) setView(nextView);
          }}>
            <input type="search" aria-label={searchLabel} placeholder={searchLabel} value={query} onChange={(event) => {
              setQuery(event.target.value);
              setSelected(undefined);
              setGroup(undefined);
              setLimit(PAGE_SIZE);
            }} />
            <button className="btn btn-sm" type="submit" aria-label={english ? "Show results on map" : "Hiện kết quả trên bản đồ"}><Search size={18} aria-hidden="true" /></button>
          </form>
          <div className="swap-actions">
            <button className="btn btn-sm" type="button" onClick={() => resetMap(NINH_BINH_VIEW)}>{english ? "Whole province" : "Cả tỉnh"}</button>
            <button className="btn btn-sm" type="button" onClick={findNearby} disabled={locating || !data}>
              <LocateFixed size={17} aria-hidden="true" />{locating ? (english ? "Locating…" : "Đang định vị…") : (english ? "Near me" : "Gần tôi")}
            </button>
          </div>
        </div>
        {locationError && <p role="status">{english ? "Location is unavailable. Search by an address instead." : "Không lấy được vị trí. Bạn có thể tìm theo địa chỉ."}</p>}
        <div className="swap-layout">
          <div className="swap-map-column">
            <BatterySwapMap label={mapLabel} stations={matches} selected={selected} view={view} english={english}
            onMove={() => setGroup(undefined)}
            onSelect={setSelected}
            onGroup={(nextGroup) => {
              setGroup(nextGroup);
              setSelected(undefined);
              setLimit(PAGE_SIZE);
            }} />
            {selected && (
              <div className="swap-mobile-selection">
                <strong>{selected.name}</strong>
                <a href={directions} target="_blank" rel="noreferrer">{directionsLabel} <ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
            )}
          </div>
          <aside className="swap-list" aria-label={english ? "Station list" : "Danh sách điểm đổi pin"}>
            <h2>{english ? "Battery swap locations" : "Địa điểm đổi pin"}</h2>
            <p className="swap-status" role="status">
              {loadError ? (english ? "The station list could not be loaded." : "Không tải được danh sách đổi pin.")
                : data ? `${count.format(results.length)} ${resultLabel}`
                  : (english ? "Loading locations…" : "Đang tải địa điểm…")}
            </p>
            {loadError && <button className="btn btn-sm" type="button" onClick={() => {
              setLoadError(false);
              setRetry((attempt) => attempt + 1);
            }}>{english ? "Try again" : "Thử lại"}</button>}
            {selected && (
              <article className="swap-selection">
                <strong>{selected.name}</strong>
                <p>{selected.address || (english ? "Address unavailable" : "Chưa có địa chỉ")}</p>
                {!selected.location && <p>{english ? "Map coordinates unavailable" : "Tọa độ chưa xác định"}</p>}
                <a className="link-arrow" href={directions} target="_blank" rel="noreferrer">
                  {directionsLabel} <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </article>
            )}
            {data && !results.length && <p>{english ? "Try another place name or address in Ninh Binh." : "Thử tên hoặc địa chỉ khác trong tỉnh Ninh Bình."}</p>}
            <ul>
              {results.slice(0, limit).map((station) => (
                <li key={station.id}>
                  <button type="button" className="swap-result" onClick={() => focusStation(station)} aria-pressed={station === selected}>
                    <MapPin size={17} aria-hidden="true" />
                    <span>
                      <strong>{station.name}</strong>
                      <span>{station.address || (english ? "Address unavailable" : "Chưa có địa chỉ")}</span>
                      {origin && station.location && <small>{decimals.format(distanceKm(origin, station.location))} km</small>}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {limit < results.length && <button className="btn btn-sm" type="button" onClick={() => setLimit(limit + PAGE_SIZE)}>
              {english ? "Show more" : "Xem thêm"}
            </button>}
          </aside>
        </div>
        <p className="swap-source">
          {data && <>{english ? "Data retrieved on" : "Ngày lấy dữ liệu"} {new Intl.DateTimeFormat(locale, { timeZone: "Asia/Ho_Chi_Minh" }).format(new Date(data.updated))}. </>}
          <a href={LOCATOR} target="_blank" rel="noreferrer">{english ? "Official VinFast locator" : "Nguồn bản đồ VinFast"}</a>
          {" · "}<a href="https://data.humdata.org/dataset/viet-nam-administrative-boundaries-polygon-polyline" target="_blank" rel="noreferrer">{english ? "Province boundary: UN OCHA / GSO" : "Ranh giới tỉnh (UN OCHA / Tổng cục Thống kê)"}</a>
          {" · "}{english ? "Check battery availability in the VinFast E-Scooter app." : "Xem tình trạng pin trên ứng dụng VinFast E-Scooter trước khi đi."}
        </p>
      </section>
    </>
  );
}
