import { useEffect, useEffectEvent, useMemo, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import Supercluster from "supercluster";
import { NINH_BINH_CENTER, type BatteryStation, type MapBounds, type MapView } from "../data/batterySwap";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "leaflet/dist/leaflet.css";
import "maplibre-gl/dist/maplibre-gl.css";

function getBounds(map: LeafletMap): MapBounds {
  const bounds = map.getBounds();
  return [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
}

export default function BatterySwapMap({
  label, stations, selected, view, onMove, onSelect, onGroup, english,
}: {
  label: string;
  stations: BatteryStation[];
  selected: BatteryStation | undefined;
  view: MapView;
  onMove: () => void;
  onSelect: (station: BatteryStation) => void;
  onGroup: (stations: BatteryStation[]) => void;
  english: boolean;
}) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [instance, setInstance] = useState<{ map: LeafletMap; leaflet: typeof import("leaflet") }>();
  const [failed, setFailed] = useState(false);
  const handleMove = useEffectEvent(onMove);
  const handleSelect = useEffectEvent(onSelect);
  const handleGroup = useEffectEvent(onGroup);

  const index = useMemo(() => new Supercluster<{ station: BatteryStation }>({
    radius: 48,
    maxZoom: 18,
  }).load(stations.flatMap((station) => station.location ? [{
    type: "Feature",
    geometry: { type: "Point", coordinates: [station.location.lng, station.location.lat] },
    properties: { station },
  }] : [])), [stations]);

  useEffect(() => {
    if (!container) return;
    let cancelled = false;
    let map: LeafletMap | undefined;
    let observer: ResizeObserver | undefined;

    import("leaflet").then((leaflet) => {
      if (cancelled) return;
      map = leaflet.map(container, { scrollWheelZoom: false, minZoom: 4, maxZoom: 18 });
      map.setView([NINH_BINH_CENTER.lat, NINH_BINH_CENTER.lng], 10);
      const baseMap = map;
      const osmCredit = '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>';
      Promise.all([import("@maplibre/maplibre-gl-leaflet"), import("maplibre-gl")]).then(([layer, maplibre]) => {
        if (cancelled) return;
        maplibre.setWorkerUrl(workerUrl);
        layer.maplibreGL({ style: "https://tiles.openfreemap.org/styles/liberty", attributionControl: false }).addTo(baseMap);
        baseMap.attributionControl.addAttribution(`<a href="https://openfreemap.org/">OpenFreeMap</a> · <a href="https://openmaptiles.org/">© OpenMapTiles</a> · ${osmCredit}`);
      }).catch(() => {
        if (cancelled) return;
        leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: osmCredit }).addTo(baseMap);
      });

      const activeMap = map;
      activeMap.on("moveend", () => handleMove());
      observer = new ResizeObserver(() => activeMap.invalidateSize({ pan: false, debounceMoveend: true }));
      observer.observe(container);
      setInstance({ map: activeMap, leaflet });
    }).catch(() => {
      if (!cancelled) setFailed(true);
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      map?.remove();
    };
  }, [container]);

  useEffect(() => {
    if (!instance) return;
    const { map } = instance;
    if ("center" in view) {
      map.setView(view.center, view.zoom);
    } else {
      const [west, south, east, north] = view.bounds;
      map.fitBounds([[south, west], [north, east]], { padding: [28, 28], maxZoom: 16 });
    }
  }, [instance, view]);

  useEffect(() => {
    if (!instance) return;
    const { map, leaflet } = instance;
    const markers = leaflet.layerGroup().addTo(map);
    const number = new Intl.NumberFormat(english ? "en" : "vi");

    function addStationMarker(station: BatteryStation) {
      if (!station.location) return;
      const active = station === selected;
      leaflet.marker([station.location.lat, station.location.lng], {
        title: station.name,
        alt: station.name,
        zIndexOffset: active ? 1000 : 0,
        icon: leaflet.divIcon({
          className: active ? "swap-marker swap-marker-selected" : "swap-marker",
          html: '<span class="swap-marker-battery" aria-hidden="true"></span>',
          iconSize: [36, 42],
          iconAnchor: [18, 40],
        }),
      }).on("click", () => handleSelect(station)).addTo(markers);
    }

    function renderMarkers() {
      markers.clearLayers();
      let selectedIsVisible = false;
      for (const point of index.getClusters(getBounds(map), map.getZoom())) {
        const [lng, lat] = point.geometry.coordinates;
        const properties = point.properties;
        if ("cluster" in properties) {
          const count = number.format(properties.point_count);
          const title = english ? `${count} battery swap locations` : `${count} địa điểm đổi pin`;
          leaflet.marker([lat, lng], {
            title,
            alt: title,
            icon: leaflet.divIcon({ className: "swap-cluster", html: count, iconSize: [44, 32] }),
          }).on("click", () => {
            const zoom = index.getClusterExpansionZoom(properties.cluster_id);
            if (zoom <= map.getMaxZoom()) {
              map.setView([lat, lng], zoom);
            } else {
              const leaves = index.getLeaves(properties.cluster_id, Infinity);
              handleGroup(leaves.map((leaf) => leaf.properties.station));
            }
          }).addTo(markers);
          continue;
        }
        addStationMarker(properties.station);
        selectedIsVisible ||= properties.station === selected;
      }
      if (!selectedIsVisible && selected?.location && map.getBounds().contains(selected.location)) addStationMarker(selected);
    }

    renderMarkers();
    map.on("moveend", renderMarkers);
    return () => {
      map.off("moveend", renderMarkers);
      markers.remove();
    };
  }, [english, index, instance, selected]);

  return (
    <div className="swap-map-shell">
      <div className="swap-map" ref={setContainer} aria-label={label} role="region" />
      {failed && <p role="status" className="swap-map-failure">{english ? "The map is unavailable. Use the address list to get directions." : "Không tải được bản đồ. Bạn vẫn có thể xem danh sách địa chỉ và mở chỉ đường."}</p>}
    </div>
  );
}
