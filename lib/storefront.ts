export type FulfillmentMethod = "delivery" | "pickup";

export const STORE_ADDRESS = "Baltijos pr. 101, Klaipėda, 94116 Klaipėdos m. sav.";
export const STORE_COORDINATES = {
  lat: 55.686628,
  lng: 21.161434
} as const;
export const DELIVERY_FEE_EUR = 3;
export const STORE_TIMEZONE = "Europe/Vilnius";
export const STORE_HOURS_LABEL = "10:00–22:00";
export const STORE_CONTACT_WINDOW_MINUTES = 30;

export function isFulfillmentMethod(value: string | null | undefined): value is FulfillmentMethod {
  return value === "delivery" || value === "pickup";
}

export function getFulfillmentFee(method: FulfillmentMethod) {
  return method === "delivery" ? DELIVERY_FEE_EUR : 0;
}

export function getPickupMapEmbedUrl() {
  return `https://www.google.com/maps?q=${encodeURIComponent(STORE_ADDRESS)}&z=16&output=embed`;
}

export function getGoogleMapsDirectionsUrl() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STORE_ADDRESS)}`;
}

export function getAppleMapsDirectionsUrl() {
  return `https://maps.apple.com/?daddr=${encodeURIComponent(STORE_ADDRESS)}&dirflg=d`;
}

export function getWazeDirectionsUrl() {
  const { lat, lng } = STORE_COORDINATES;
  return `https://www.waze.com/ul?ll=${lat},${lng}&navigate=yes&zoom=17`;
}
