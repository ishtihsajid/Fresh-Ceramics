"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { 
  MapPin, 
  Search, 
  ExternalLink,
  Building2,
  Sparkles,
  Navigation,
  Phone,
  Compass,
  CheckCircle2
} from "lucide-react";
import { SHOWROOMS_DATA, DIVISIONS, Showroom } from "@/lib/showrooms-data";
import BangladeshMap from "@/components/showrooms/BangladeshMap";

export default function ShowroomsPage() {
  const [selectedDivision, setSelectedDivision] = useState<string>("All Divisions");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedShowroom, setSelectedShowroom] = useState<Showroom | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filtered = SHOWROOMS_DATA.filter((shw) => {
    const normSelected = selectedDivision.toLowerCase();
    const normDiv = shw.division.toLowerCase();
    const matchesDiv = 
      selectedDivision === "All Divisions" || 
      normDiv === normSelected ||
      (normSelected.includes("chattogram") && (normDiv.includes("chittagong") || normDiv.includes("chattogram"))) ||
      (normSelected.includes("barisal") && (normDiv.includes("barishal") || normDiv.includes("barisal")));
    const matchesSearch = 
      shw.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shw.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shw.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiv && matchesSearch;
  });

  const handleSelectFromMap = (shw: Showroom | null) => {
    setSelectedShowroom(shw);
    if (shw && cardRefs.current[shw.id]) {
      cardRefs.current[shw.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-stone-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header - Editorial Architectural Luxury */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-stone-200 pb-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 border border-stone-200 rounded-full text-xs font-mono text-stone-700">
              <span className="w-2 h-2 rounded-full bg-fresh-red animate-pulse" />
              <span>NATIONWIDE ARCHITECTURAL NETWORK</span>
              <span className="text-stone-300">|</span>
              <span>FRESH CERAMICS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-stone-900 tracking-tight font-display leading-[1.05]">
              Showrooms &amp; Dealer Points
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
              Fresh Ceramics is accessible across all 64 districts of Bangladesh. 
              Explore our 2 Own Flagship Display Centers (&ldquo;House of Aesthetics&rdquo; in Dhaka &amp; Chattogram) 
              and 79+ Exclusive Dealer Showrooms with live interactive map plotting.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-4 bg-white border border-stone-200 p-5 rounded-sm shadow-xs font-mono shrink-0">
            <div>
              <div className="text-2xl font-black text-fresh-red">2</div>
              <div className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Flagships</div>
              <div className="text-[10px] text-stone-400">Dhaka &amp; Ctg</div>
            </div>
            <div className="border-l border-stone-200 pl-4">
              <div className="text-2xl font-black text-stone-900">79+</div>
              <div className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Exclusive</div>
              <div className="text-[10px] text-stone-400">Authorized Hubs</div>
            </div>
            <div className="border-l border-stone-200 pl-4">
              <div className="text-2xl font-black text-stone-900">64</div>
              <div className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Districts</div>
              <div className="text-[10px] text-stone-400">Total Coverage</div>
            </div>
          </div>
        </div>

        {/* 1. Centerpiece: Interactive Bangladesh Vector Map */}
        <BangladeshMap
          showrooms={SHOWROOMS_DATA}
          selectedDivision={selectedDivision}
          onSelectDivision={setSelectedDivision}
          selectedShowroom={selectedShowroom}
          onSelectShowroom={handleSelectFromMap}
        />

        {/* 2. Search & Division Filter Controls */}
        <div className="bg-white border border-stone-200 p-6 rounded-sm space-y-5 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by area, district or showroom name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-sm text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-fresh-red font-mono transition-colors"
              />
            </div>

            <div className="text-xs font-mono text-stone-500">
              Showing <span className="font-bold text-stone-900">{filtered.length}</span> of {SHOWROOMS_DATA.length} showrooms
            </div>
          </div>

          {/* Division Filter Buttons - Wrapping Cleanly with No Cutoff */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
            <span className="text-xs font-mono uppercase text-stone-400 mr-2 tracking-wider">
              Filter Division:
            </span>
            {DIVISIONS.map((div) => {
              const isSelected = selectedDivision === div;
              const count = div === "All Divisions" 
                ? SHOWROOMS_DATA.length 
                : SHOWROOMS_DATA.filter(s => s.division.toLowerCase() === div.toLowerCase()).length;

              return (
                <button
                  key={div}
                  onClick={() => setSelectedDivision(div)}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase rounded-sm transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-fresh-red text-white font-bold shadow-xs"
                      : "bg-stone-100 text-stone-700 hover:text-black hover:bg-stone-200 border border-stone-200"
                  }`}
                >
                  <span>{div}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-stone-200 text-stone-500"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Showrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((shw) => {
            const isFlagship = shw.type.includes("Own");
            const isSelected = selectedShowroom?.id === shw.id;

            return (
              <div
                key={shw.id}
                ref={(el) => { cardRefs.current[shw.id] = el; }}
                id={`shw-${shw.id}`}
                onClick={() => setSelectedShowroom(shw)}
                className={`p-6 sm:p-7 rounded-sm border transition-all duration-300 flex flex-col justify-between space-y-6 cursor-pointer ${
                  isSelected
                    ? "bg-white border-fresh-red shadow-xl ring-2 ring-fresh-red/30 -translate-y-1"
                    : isFlagship
                    ? "bg-white border-fresh-red/60 shadow-md ring-1 ring-fresh-red/20 hover:border-fresh-red hover:shadow-lg"
                    : "luxury-card hover:-translate-y-0.5"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm font-bold flex items-center gap-1 ${
                      isFlagship
                        ? "bg-fresh-red text-white"
                        : "bg-stone-100 text-stone-700 border border-stone-200"
                    }`}>
                      {isFlagship && <Sparkles className="w-3 h-3 text-white" />}
                      <span>{shw.type}</span>
                    </span>
                    <span className="text-xs text-stone-400 font-mono font-semibold">{shw.division}</span>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono text-fresh-red font-bold uppercase tracking-wider">
                      {shw.area}
                    </div>
                    <h3 className="text-base font-bold text-stone-900 uppercase leading-snug mt-1">
                      {shw.name}
                    </h3>
                  </div>

                  <div className="space-y-2 text-xs text-stone-600 font-mono">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-fresh-red shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{shw.address}</span>
                    </div>
                  </div>

                  {shw.hasVisualizer && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-sm text-[10px] text-amber-900 font-mono">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>In-Store 3D Visualizer Kiosk</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-mono">
                  <a
                    href={shw.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-fresh-red hover:underline flex items-center gap-1.5 font-bold"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Google Maps Directions &rarr;</span>
                  </a>

                  <Link
                    href={`/visualizer`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-stone-500 hover:text-black font-semibold flex items-center gap-1"
                  >
                    <span>Simulate Tiles</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
