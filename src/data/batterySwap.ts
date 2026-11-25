export type Coordinates = { lat: number; lng: number };
export type BatteryStation = { id: number; name: string; address: string; location: Coordinates | null };
export type MapBounds = [west: number, south: number, east: number, north: number];
export type MapView = { center: [number, number]; zoom: number } | { bounds: MapBounds };

export const NINH_BINH_CENTER: Coordinates = { lat: 20.251, lng: 105.967 };
export const NINH_BINH_VIEW = { bounds: [105.54, 19.86, 106.60, 20.71] } satisfies MapView;
