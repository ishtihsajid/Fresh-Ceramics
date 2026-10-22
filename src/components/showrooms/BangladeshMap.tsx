"use client";

import React, { useState, useMemo } from "react";
import { Showroom } from "@/lib/showrooms-data";
import mapPathsData from "@/data/bangladesh-svg-paths.json";
import { 
  MapPin, 
  Navigation, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Building2, 
  ExternalLink,
  Phone,
  Compass,
  X
} from "lucide-react";

interface BangladeshMapProps {
  showrooms: Showroom[];
  selectedDivision: string;
  onSelectDivision: (div: string) => void;
  selectedShowroom: Showroom | null;
  onSelectShowroom: (shw: Showroom | null) => void;
}

// Mathematically exact Mercator coordinate projection mapped directly to Bangladesh SVG Canvas [760 x 980]
function projectCoords(lng: number, lat: number): { x: number; y: number } {
  const rad = Math.PI / 180;
  const lambda = (lng - 90.3563) * rad;
  const phi = lat * rad;
  const phi0 = 23.6850 * rad;
  const yMerc = Math.log(Math.tan(Math.PI / 4 + phi / 2));
  const yMerc0 = Math.log(Math.tan(Math.PI / 4 + phi0 / 2));
  const x = 380 + 6800 * lambda;
  const y = 480 - 6800 * (yMerc - yMerc0);
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

export default function BangladeshMap({
  showrooms,
  selectedDivision,
  onSelectDivision,
  selectedShowroom,
  onSelectShowroom
}: BangladeshMapProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredShowroom, setHoveredShowroom] = useState<Showroom | null>(null);
  const [hoveredDivision, setHoveredDivision] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "flagship">("all");

  const filteredPins = useMemo(() => {
    return showrooms.filter(s => {
      const matchesDiv = selectedDivision === "All Divisions" || 
        s.division.toLowerCase() === selectedDivision.toLowerCase() ||
        (selectedDivision === "Barisal" && s.division.toLowerCase() === "barishal");
      const matchesType = activeTab === "all" || s.isFlagship;
      return matchesDiv && matchesType;
    });
  }, [showrooms, selectedDivision, activeTab]);

  const activeShowroom = selectedShowroom || hoveredShowroom;

  return (
    <div className="relative bg-[#0F0F0D] rounded-sm border border-stone-800 shadow-2xl overflow-hidden">
      {/* Decorative Top Bar */}
      <div className="px-6 py-4 bg-[#141412] border-b border-stone-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-fresh-red animate-ping" />
          <span className="font-mono text-xs uppercase tracking-widest text-stone-300 font-semibold">
            Real Geographic Map of Bangladesh // 8 Divisions // 81 Showrooms
          </span>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === "all"
                ? "bg-stone-200 text-stone-900 font-bold"
                : "bg-stone-800 text-stone-400 hover:text-white"
            }`}
          >
            All Showrooms ({showrooms.length})
          </button>
          <button
            onClick={() => setActiveTab("flagship")}
            className={`px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === "flagship"
                ? "bg-fresh-red text-white font-bold shadow-md shadow-fresh-red/30"
                : "bg-stone-800 text-stone-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Own Flagships (2)</span>
          </button>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="relative flex flex-col lg:flex-row items-center justify-between p-6 lg:p-10 gap-8 min-h-[640px]">
        {/* Left Side: Division Selector & Legend */}
        <div className="w-full lg:w-72 space-y-6 shrink-0 z-20">
          <div>
            <div className="text-[11px] font-mono text-fresh-red uppercase tracking-widest mb-1">
              Filter By Division
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-stone-100 font-display">
              Select Region
            </h3>
          </div>

          {/* Division Pill Buttons */}
          <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
            <button
              onClick={() => onSelectDivision("All Divisions")}
              className={`p-2 rounded-sm text-left transition-all border ${
                selectedDivision === "All Divisions"
                  ? "bg-fresh-red border-fresh-red text-white font-bold"
                  : "bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700"
              }`}
            >
              All Bangladesh
            </button>
            {(mapPathsData.divisions as any[]).map((div: any) => {
              const count = showrooms.filter(s => 
                s.division.toLowerCase() === div.name.toLowerCase() ||
                (div.name === "Barishal" && s.division.toLowerCase() === "barisal")
              ).length;
              const isSelected = selectedDivision.toLowerCase() === div.name.toLowerCase() ||
                (selectedDivision === "Barisal" && div.name === "Barishal");

              return (
                <button
                  key={div.id}
                  onClick={() => onSelectDivision(div.name === "Barishal" ? "Barisal" : div.name)}
                  onMouseEnter={() => setHoveredDivision(div.name)}
                  onMouseLeave={() => setHoveredDivision(null)}
                  className={`p-2 rounded-sm text-left transition-all border flex items-center justify-between ${
                    isSelected
                      ? "bg-fresh-red border-fresh-red text-white font-bold shadow-md shadow-fresh-red/20"
                      : "bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700"
                  }`}
                >
                  <span>{div.name}</span>
                  <span className="text-[10px] opacity-60">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Map Legend */}
          <div className="p-4 bg-stone-900/90 border border-stone-800 rounded-sm space-y-3 font-mono text-xs">
            <div className="text-[10px] uppercase tracking-wider text-stone-400 font-bold border-b border-stone-800 pb-2">
              Pinpoints Legend
            </div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fresh-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-fresh-red border border-white"></span>
              </span>
              <span className="text-stone-200 font-medium">Own Flagship Center (2)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#B5A99A] border border-stone-900"></span>
              <span className="text-stone-300">Exclusive Dealer Showroom ({showrooms.length - 2})</span>
            </div>
            <div className="text-[10px] text-stone-400 pt-2 border-t border-stone-800/80 leading-relaxed">
              Hover over markers for address and live GPS navigation link.
            </div>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
              className="p-2 bg-stone-900 hover:bg-stone-800 text-stone-300 rounded-sm border border-stone-800 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
              className="p-2 bg-stone-900 hover:bg-stone-800 text-stone-300 rounded-sm border border-stone-800 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setZoomLevel(1); onSelectDivision("All Divisions"); onSelectShowroom(null); }}
              className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-stone-300 rounded-sm border border-stone-800 transition-colors flex items-center gap-1.5 font-mono text-xs"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Center: The Official Bangladesh Vector Map */}
        <div className="relative flex-1 flex items-center justify-center w-full max-w-[620px] aspect-[760/980]">
          <div 
            className="w-full h-full transition-transform duration-500 ease-out"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg
              viewBox="0 0 760 980"
              className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Glow Filter */}
              <defs>
                <filter id="glow-flagship" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-pin" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Bangladesh Divisions Polygons */}
              <g className="divisions-layer">
                {(mapPathsData.divisions as any[]).map((div: any) => {
                  const isSelected = selectedDivision.toLowerCase() === div.name.toLowerCase() ||
                    (selectedDivision === "Barisal" && div.name === "Barishal");
                  const isHovered = hoveredDivision === div.name;

                  return (
                    <g key={div.id}>
                      <path
                        d={div.path}
                        className="cursor-pointer transition-all duration-300"
                        fill={
                          isSelected 
                            ? "rgba(237, 28, 36, 0.22)" 
                            : isHovered 
                            ? "rgba(181, 169, 154, 0.18)" 
                            : "rgba(35, 33, 30, 0.95)"
                        }
                        stroke={
                          isSelected 
                            ? "#ED1C24" 
                            : isHovered 
                            ? "#B5A99A" 
                            : "#3A3530"
                        }
                        strokeWidth={isSelected ? "1.8" : "1.0"}
                        strokeLinejoin="round"
                        onClick={() => onSelectDivision(div.name === "Barishal" ? "Barisal" : div.name)}
                        onMouseEnter={() => setHoveredDivision(div.name)}
                        onMouseLeave={() => setHoveredDivision(null)}
                      />
                      {/* Division Name Label */}
                      <text
                        x={div.labelX}
                        y={div.labelY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="font-mono text-[10px] pointer-events-none uppercase tracking-wider select-none font-bold"
                        fill={isSelected ? "#F5F3EF" : "#7A7369"}
                        opacity={0.85}
                      >
                        {div.name}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* Showroom Markers */}
              <g className="markers-layer">
                {filteredPins.map((shw) => {
                  const { x, y } = projectCoords(shw.lng, shw.lat);
                  const isSelected = selectedShowroom?.id === shw.id;
                  const isHovered = hoveredShowroom?.id === shw.id;

                  if (shw.isFlagship) {
                    return (
                      <g
                        key={shw.id}
                        className="cursor-pointer group"
                        transform={`translate(${x}, ${y})`}
                        onClick={() => onSelectShowroom(shw)}
                        onMouseEnter={() => setHoveredShowroom(shw)}
                        onMouseLeave={() => setHoveredShowroom(null)}
                      >
                        {/* Outer pulsing ring */}
                        <circle
                          r="10"
                          fill="none"
                          stroke="#ED1C24"
                          strokeWidth="1.5"
                          opacity="0.8"
                          className="animate-ping"
                        />
                        {/* Halo */}
                        <circle
                          r="7"
                          fill="#ED1C24"
                          opacity="0.3"
                          filter="url(#glow-flagship)"
                        />
                        {/* Core pin */}
                        <circle
                          r="4.5"
                          fill="#ED1C24"
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                        />
                      </g>
                    );
                  }

                  return (
                    <g
                      key={shw.id}
                      className="cursor-pointer group"
                      transform={`translate(${x}, ${y})`}
                      onClick={() => onSelectShowroom(shw)}
                      onMouseEnter={() => setHoveredShowroom(shw)}
                      onMouseLeave={() => setHoveredShowroom(null)}
                    >
                      {/* Hover ring */}
                      {(isSelected || isHovered) && (
                        <circle
                          r="6.5"
                          fill="none"
                          stroke="#ED1C24"
                          strokeWidth="1.2"
                          opacity="0.9"
                        />
                      )}
                      {/* Standard pin dot */}
                      <circle
                        r={isSelected || isHovered ? "3.5" : "2.5"}
                        fill={isSelected || isHovered ? "#ED1C24" : "#B5A99A"}
                        stroke="#0F0F0D"
                        strokeWidth="0.8"
                        filter="url(#glow-pin)"
                        className="transition-all duration-200"
                      />
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>
        </div>

        {/* Right Side: Active Showroom Inspector Card */}
        <div className="w-full lg:w-80 z-20">
          {activeShowroom ? (
            <div className="bg-[#181815] border border-stone-700/80 p-5 rounded-sm shadow-xl space-y-4 animate-in fade-in duration-200">
              <div className="flex items-start justify-between gap-2 border-b border-stone-800 pb-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    {activeShowroom.isFlagship ? (
                      <span className="px-2 py-0.5 bg-fresh-red text-white text-[9px] font-mono uppercase tracking-wider rounded-xs font-bold">
                        ★ Own Flagship
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-stone-800 text-stone-300 text-[9px] font-mono uppercase tracking-wider rounded-xs">
                        Exclusive Dealer
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-stone-400">
                      {activeShowroom.division}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white font-display uppercase tracking-tight mt-1">
                    {activeShowroom.name}
                  </h4>
                </div>
                <button
                  onClick={() => onSelectShowroom(null)}
                  className="text-stone-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex items-start gap-2 text-stone-300">
                  <MapPin className="w-3.5 h-3.5 text-fresh-red shrink-0 mt-0.5" />
                  <span className="leading-snug">{activeShowroom.address}</span>
                </div>

                <div className="flex items-center gap-2 text-stone-400">
                  <Phone className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                  <span>{activeShowroom.phone}</span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-stone-400 pt-1">
                  <Compass className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                  <span>GPS: {activeShowroom.lat.toFixed(4)}° N, {activeShowroom.lng.toFixed(4)}° E</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex items-center gap-2">
                <a
                  href={activeShowroom.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 bg-fresh-red hover:bg-[#c91219] text-white text-[11px] font-mono uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {activeShowroom.hasVisualizer && (
                  <a
                    href="/visualizer"
                    className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-[11px] font-mono uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1"
                    title="Experience Studio Visualizer"
                  >
                    <Sparkles className="w-3 h-3 text-fresh-red" />
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-[#181815]/60 border border-dashed border-stone-800 p-6 rounded-sm text-center space-y-2">
              <MapPin className="w-6 h-6 text-stone-600 mx-auto" />
              <div className="text-xs font-mono uppercase tracking-wider text-stone-400 font-bold">
                Interactive Pinpoints
              </div>
              <p className="text-[11px] font-mono text-stone-400 leading-relaxed">
                Click any marker on the map to inspect showroom details, contact numbers, and get instant GPS directions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
