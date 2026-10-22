"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, 
  Sparkles, 
  Eye, 
  Maximize2, 
  Check, 
  ArrowRight,
  X,
  Layers,
  Ruler,
  ShieldCheck,
  Scale
} from "lucide-react";
import { PRODUCTS_CATALOG, SIZES, FINISHES, TileProduct } from "@/lib/products-data";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSize, setSelectedSize] = useState<string>("All Sizes");
  const [selectedFinish, setSelectedFinish] = useState<string>("All Finishes");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Modal for deep zoom inspection
  const [zoomedProduct, setZoomedProduct] = useState<TileProduct | null>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((tile) => {
      const matchesCategory = 
        selectedCategory === "All" || 
        tile.category.toLowerCase().includes(selectedCategory.toLowerCase());
      
      const matchesSize = 
        selectedSize === "All Sizes" || 
        tile.size === selectedSize;
      
      const matchesFinish = 
        selectedFinish === "All Finishes" || 
        (tile.surface || "").toLowerCase().includes(selectedFinish.toLowerCase()) ||
        tile.finish.toLowerCase().includes(selectedFinish.toLowerCase());
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        tile.name.toLowerCase().includes(query) ||
        tile.code.toLowerCase().includes(query) ||
        (tile.surface || "").toLowerCase().includes(query) ||
        tile.concept.toLowerCase().includes(query) ||
        tile.size.toLowerCase().includes(query);

      return matchesCategory && matchesSize && matchesFinish && matchesSearch;
    });
  }, [selectedCategory, selectedSize, selectedFinish, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0F0F0D] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-fresh-red">
              <span className="w-2 h-2 rounded-full bg-fresh-red animate-pulse" />
              <span>ARCHITECTURAL CERAMIC &amp; VITRIFIED PORTFOLIO</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight font-display">
              Tile Collections
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl font-editorial">
              Explore 480+ authentic architectural ceramic and vitrified porcelain tiles. 
              Rendered in authentic physical aspect ratios &amp; true dimensional scale — featuring 
              60×120 cm vertical monoliths (1:2 ratio), Double Charge series, and PGVT Mirror Polished finishes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/visualizer"
              className="px-6 py-3 bg-fresh-red hover:bg-fresh-red-dark text-white text-xs uppercase tracking-wider font-semibold rounded-sm transition-all flex items-center gap-2 shadow-lg shadow-fresh-red/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch 3D Visualizer</span>
            </Link>
            <Link
              href="/catalogue"
              className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs uppercase tracking-wider font-mono rounded-sm transition-colors"
            >
              PDF Catalogue
            </Link>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#181815] border border-white/10 p-6 rounded-sm space-y-6 shadow-xl">
          {/* Top Bar: Search and Category Pills */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search code (e.g. 12 PGVT, 6 DC, W 6009) or surface..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-sm text-xs text-white placeholder-gray-500 focus:outline-none focus:border-fresh-red font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Segmented Buttons */}
            <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 font-mono">
              {[
                { id: "All", label: "All Collections" },
                { id: "Floor", label: "Floor Tiles" },
                { id: "Wall", label: "Wall Tiles" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all shrink-0 ${
                    selectedCategory === cat.id
                      ? "bg-fresh-red text-white shadow-md"
                      : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sub Filters: Size and Finish Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
            <div>
              <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5 block">
                Filter by Size &amp; Aspect Ratio:
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-gray-200 focus:outline-none focus:border-fresh-red"
              >
                {SIZES.map((sz) => (
                  <option key={sz} value={sz} className="bg-[#181815] text-white">
                    {sz} {sz === "60x120 cm" ? "(1:2 Vertical)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5 block">
                Filter by Surface Finish:
              </label>
              <select
                value={selectedFinish}
                onChange={(e) => setSelectedFinish(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-gray-200 focus:outline-none focus:border-fresh-red"
              >
                {FINISHES.map((fn) => (
                  <option key={fn} value={fn} className="bg-[#181815] text-white">
                    {fn}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end justify-between sm:col-span-2 md:col-span-1">
              <span className="text-gray-400 text-xs">
                Showing <strong className="text-white font-mono">{filteredProducts.length}</strong> Architectural SKUs
              </span>
              {(selectedCategory !== "All" || selectedSize !== "All Sizes" || selectedFinish !== "All Finishes" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedSize("All Sizes");
                    setSelectedFinish("All Finishes");
                    setSearchQuery("");
                  }}
                  className="text-fresh-red hover:underline text-[11px] font-mono"
                >
                  Reset Filters ↺
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Cards Grid with Proportional Aspect Ratios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((tile) => {
            // Normalize aspect ratio representation
            const ratioStr = (tile.aspectRatio || "").replace(":", "/");
            const isVertical12 = ratioStr === "1/2" || tile.size.includes("60x120");
            const isSquare = ratioStr === "1/1" || tile.size.includes("80x80") || tile.size.includes("60x60") || tile.size.includes("40x40") || tile.size.includes("30x30");
            const isHorizontalStair = ratioStr === "2/1" || tile.size.includes("Stair");
            
            // Calculate proportional CSS styling inside the presentation stage
            let tileBoxStyle: React.CSSProperties = {};

            if (isVertical12) {
              // 60x120 or 30x60: true vertical rectangle 1:2 ratio
              const isGrandSlab = tile.size.includes("60x120");
              tileBoxStyle = {
                height: isGrandSlab ? "95%" : "78%",
                aspectRatio: "1 / 2",
              };
            } else if (isSquare) {
              // Physically proportional scale: 80x80 is largest (94%), 60x60 is 72%, 40x40 is 50%, 30x30 is 38%
              let pct = 72;
              if (tile.size.includes("80x80")) pct = 94;
              else if (tile.size.includes("60x60")) pct = 72;
              else if (tile.size.includes("40x40")) pct = 50;
              else if (tile.size.includes("30x30")) pct = 38;

              tileBoxStyle = {
                width: `${pct}%`,
                aspectRatio: "1 / 1",
              };
            } else if (isHorizontalStair) {
              tileBoxStyle = {
                width: "90%",
                aspectRatio: "2 / 1",
              };
            } else {
              // 30x50, 30x45, 25x40, 20x30 vertical wall tiles
              let hPct = "82%";
              let ar = "2 / 3";
              if (tile.size.includes("30x50")) { hPct = "82%"; ar = "3 / 5"; }
              else if (tile.size.includes("30x45")) { hPct = "76%"; ar = "2 / 3"; }
              else if (tile.size.includes("25x40")) { hPct = "70%"; ar = "5 / 8"; }
              else if (tile.size.includes("20x30")) { hPct = "60%"; ar = "2 / 3"; }
              else if (tile.widthCm && tile.heightCm) {
                ar = `${tile.widthCm} / ${tile.heightCm}`;
              }

              tileBoxStyle = {
                height: hPct,
                aspectRatio: ar,
              };
            }

            return (
              <div
                key={tile.id}
                className="group bg-[#161614] border border-white/10 hover:border-fresh-red/50 rounded-sm overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                {/* Tile Architectural Presentation Stage */}
                <div 
                  className="relative h-72 sm:h-80 bg-[#0A0A08] overflow-hidden flex items-center justify-center p-4 cursor-pointer"
                  onClick={() => setZoomedProduct(tile)}
                >
                  {/* Subtle surface grid texture behind tile */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                  {/* Tile Mounted with Authentic Aspect Ratio and Proportional Scale */}
                  <div 
                    className="relative transition-transform duration-500 group-hover:scale-105 shadow-2xl rounded-xs overflow-hidden flex items-center justify-center"
                    style={tileBoxStyle}
                  >
                    <img
                      src={tile.image}
                      alt={tile.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Subtle Bevel Highlight Edge */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/20 pointer-events-none" />
                  </div>

                  {/* Badges: Size, Aspect Ratio, Surface */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    <span className="px-2 py-0.5 bg-black/85 backdrop-blur-xs text-[10px] font-mono uppercase text-gray-200 rounded-xs border border-white/15 font-semibold">
                      {tile.size} {isVertical12 ? "• 1:2" : ""}
                    </span>
                    {tile.featured && (
                      <span className="px-2 py-0.5 bg-fresh-red text-white text-[9px] font-mono uppercase tracking-wider rounded-xs font-bold">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Aspect Ratio Caliper Tooltip */}
                  <div className="absolute top-3 right-3 text-[9px] font-mono text-gray-400 bg-black/70 px-2 py-0.5 rounded-xs border border-white/10">
                    {tile.specs.dimensions}
                  </div>

                  {/* Quick Zoom Inspector Overlay Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomedProduct(tile);
                    }}
                    className="absolute bottom-3 right-3 p-2 bg-black/85 hover:bg-fresh-red text-white rounded-xs border border-white/20 transition-all opacity-0 group-hover:opacity-100 shadow-md"
                    title="Deep High-Resolution Texture Inspection"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Tile Metadata */}
                <div className="p-5 space-y-3 bg-[#161614] border-t border-white/5">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                      <span className="text-fresh-red font-bold">{tile.surface}</span>
                      <span className="text-gray-400">{tile.category}</span>
                    </div>
                    <h3 className="text-sm font-bold uppercase text-white truncate mt-0.5 font-display">
                      {tile.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-mono truncate">
                      {tile.concept}
                    </p>
                  </div>

                  {/* Technical Box Specs */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-400 font-mono">
                    <span>Coverage: {tile.specs.sqmPerBox}</span>
                    <span>{tile.specs.piecesPerBox}</span>
                    <span className="text-gray-400">{tile.specs.thickness}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <Link
                      href={`/visualizer?tile=${encodeURIComponent(tile.code)}`}
                      className="flex-grow py-2 bg-white/5 hover:bg-fresh-red text-gray-300 hover:text-white border border-white/10 hover:border-fresh-red text-xs uppercase tracking-wider font-semibold rounded-sm transition-all text-center flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Visualize</span>
                    </Link>

                    <button
                      onClick={() => setZoomedProduct(tile)}
                      className="px-3 py-2 bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white rounded-sm text-xs transition-colors"
                      title="Inspect Details"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Zoom Modal (Hi-Res Glaze Texture Inspector) */}
        {zoomedProduct && (
          <div 
            className="fixed inset-0 z-[600] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
            onClick={() => setZoomedProduct(null)}
          >
            <div 
              className="relative max-w-4xl w-full bg-[#181815] border border-white/20 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setZoomedProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/80 hover:bg-fresh-red text-white rounded-sm border border-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Hi-Res Texture Viewer Stage (Preserves Exact Aspect Ratio) */}
              <div className="md:w-1/2 bg-[#0A0A08] p-8 flex items-center justify-center relative min-h-[380px] border-b md:border-b-0 md:border-r border-white/10">
                <div 
                  className="relative max-h-[460px] shadow-2xl rounded-xs overflow-hidden flex items-center justify-center"
                  style={{
                    aspectRatio: `${zoomedProduct.widthCm} / ${zoomedProduct.heightCm}`,
                    height: (zoomedProduct.aspectRatio === "1:2" || zoomedProduct.aspectRatio === "1/2" || zoomedProduct.size.includes("60x120")) ? "420px" : "320px",
                  }}
                >
                  <img
                    src={zoomedProduct.image}
                    alt={zoomedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/30 pointer-events-none" />
                </div>

                <div className="absolute bottom-4 left-4 font-mono text-[10px] text-gray-400 bg-black/70 px-2 py-1 rounded-xs">
                  Physical Aspect Ratio: {zoomedProduct.aspectRatio} ({zoomedProduct.specs.dimensions})
                </div>
              </div>

              {/* Specs & Narrative Details */}
              <div className="md:w-1/2 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-mono uppercase text-fresh-red tracking-wider font-bold">
                      {zoomedProduct.surface}
                    </span>
                    <h2 className="text-2xl font-black uppercase text-white font-display mt-1">
                      {zoomedProduct.name}
                    </h2>
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mt-1">
                      <span>Model Code: <strong className="text-white">{zoomedProduct.code}</strong></span>
                      <span>•</span>
                      <span>{zoomedProduct.category}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 font-editorial leading-relaxed border-t border-white/10 pt-4">
                    {zoomedProduct.concept}. Precision sintered under high thermal pressure with low porosity 
                    and authentic architectural resilience. Specially calibrated for high-traffic environments.
                  </p>

                  {/* Technical Specifications Table */}
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                    <div className="bg-white/5 p-3 rounded-xs border border-white/5">
                      <div className="text-[10px] text-gray-400 uppercase">Dimensions</div>
                      <div className="text-white font-bold">{zoomedProduct.specs.dimensions}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xs border border-white/5">
                      <div className="text-[10px] text-gray-400 uppercase">Thickness</div>
                      <div className="text-white font-bold">{zoomedProduct.specs.thickness}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xs border border-white/5">
                      <div className="text-[10px] text-gray-400 uppercase">Coverage per Box</div>
                      <div className="text-white font-bold">{zoomedProduct.specs.sqmPerBox}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xs border border-white/5">
                      <div className="text-[10px] text-gray-400 uppercase">Pieces per Box</div>
                      <div className="text-white font-bold">{zoomedProduct.specs.piecesPerBox}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xs border border-white/5">
                      <div className="text-[10px] text-gray-400 uppercase">Water Absorption</div>
                      <div className="text-white font-bold">{zoomedProduct.specs.waterAbsorption}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xs border border-white/5">
                      <div className="text-[10px] text-gray-400 uppercase">Box Weight</div>
                      <div className="text-white font-bold">{zoomedProduct.specs.weightPerBox}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <Link
                    href={`/visualizer?tile=${encodeURIComponent(zoomedProduct.code)}`}
                    className="flex-1 py-3 bg-fresh-red hover:bg-fresh-red-dark text-white text-xs uppercase tracking-wider font-semibold rounded-sm transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-fresh-red/20"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Apply in 3D Visualizer</span>
                  </Link>
                  <Link
                    href="/showrooms"
                    className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs uppercase tracking-wider font-mono rounded-sm transition-colors"
                  >
                    Find Showroom
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
