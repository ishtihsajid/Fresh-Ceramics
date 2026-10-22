import showroomsJson from "@/data/showrooms.json";

export interface Showroom {
  id: string;
  sl: number;
  name: string;
  type: string;
  isFlagship: boolean;
  division: string;
  district: string;
  area: string;
  address: string;
  phone: string;
  mapLink: string;
  fbLink?: string | null;
  hasVisualizer: boolean;
  lat: number;
  lng: number;
}

export const SHOWROOMS_DATA: Showroom[] = showroomsJson as Showroom[];

export const DIVISIONS = [
  "All Divisions",
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Rangpur",
  "Mymensingh"
] as const;
