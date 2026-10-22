export interface RoomPreset {
  id: string;
  name: string;
  category: "Living Room" | "Bathroom" | "Kitchen" | "Commercial Lobby" | "Bedroom";
  description: string;
  lightingMood: "Natural Daylight" | "Warm Architectural Evening" | "Minimalist Studio";
  defaultFloorTileId: string;
  defaultWallTileId: string;
  floorPerspective: {
    topLeft: [number, number];
    topRight: [number, number];
    bottomRight: [number, number];
    bottomLeft: [number, number];
  };
  wallPerspective: {
    topLeft: [number, number];
    topRight: [number, number];
    bottomRight: [number, number];
    bottomLeft: [number, number];
  };
  previewColor: string;
}

export const ROOM_PRESETS: RoomPreset[] = [
  {
    id: "penthouse-living",
    name: "Modern Duplex Living Salon",
    category: "Living Room",
    description: "Expansive high-ceiling lounge with floor-to-ceiling glass apertures and balanced ambient light.",
    lightingMood: "Natural Daylight",
    defaultFloorTileId: "FC-010",
    defaultWallTileId: "FC-004",
    floorPerspective: {
      topLeft: [0.15, 0.62],
      topRight: [0.85, 0.62],
      bottomRight: [1.0, 1.0],
      bottomLeft: [0.0, 1.0],
    },
    wallPerspective: {
      topLeft: [0.18, 0.15],
      topRight: [0.82, 0.15],
      bottomRight: [0.85, 0.62],
      bottomLeft: [0.15, 0.62],
    },
    previewColor: "#2A2D34",
  },
  {
    id: "luxury-master-bath",
    name: "Minimalist Wellness Bathroom",
    category: "Bathroom",
    description: "Spa-grade sanctuary featuring free-standing stone tub, floating vanities, and recessed LED shadow coves.",
    lightingMood: "Minimalist Studio",
    defaultFloorTileId: "FC-015",
    defaultWallTileId: "FC-002",
    floorPerspective: {
      topLeft: [0.1, 0.68],
      topRight: [0.9, 0.68],
      bottomRight: [1.0, 1.0],
      bottomLeft: [0.0, 1.0],
    },
    wallPerspective: {
      topLeft: [0.12, 0.08],
      topRight: [0.88, 0.08],
      bottomRight: [0.9, 0.68],
      bottomLeft: [0.1, 0.68],
    },
    previewColor: "#1E2228",
  },
  {
    id: "contemporary-kitchen",
    name: "Architectural Island Kitchen",
    category: "Kitchen",
    description: "Open-format culinary kitchen with fluted cabinetry, granite waterfall cantilever, and clean backsplash run.",
    lightingMood: "Natural Daylight",
    defaultFloorTileId: "FC-022",
    defaultWallTileId: "FC-008",
    floorPerspective: {
      topLeft: [0.2, 0.65],
      topRight: [0.8, 0.65],
      bottomRight: [1.0, 1.0],
      bottomLeft: [0.0, 1.0],
    },
    wallPerspective: {
      topLeft: [0.22, 0.2],
      topRight: [0.78, 0.2],
      bottomRight: [0.8, 0.65],
      bottomLeft: [0.2, 0.65],
    },
    previewColor: "#332F2C",
  },
  {
    id: "corporate-lobby",
    name: "Commercial Executive Atrium",
    category: "Commercial Lobby",
    description: "Heavy-traffic commercial hospitality atrium with high-spec vitrified reflective flooring and monumental accent walls.",
    lightingMood: "Warm Architectural Evening",
    defaultFloorTileId: "FC-001",
    defaultWallTileId: "FC-006",
    floorPerspective: {
      topLeft: [0.25, 0.55],
      topRight: [0.75, 0.55],
      bottomRight: [1.0, 1.0],
      bottomLeft: [0.0, 1.0],
    },
    wallPerspective: {
      topLeft: [0.28, 0.1],
      topRight: [0.72, 0.1],
      bottomRight: [0.75, 0.55],
      bottomLeft: [0.25, 0.55],
    },
    previewColor: "#1A1C20",
  }
];
