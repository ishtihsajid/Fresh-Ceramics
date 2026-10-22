"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Upload, 
  Download, 
  RefreshCw, 
  Check, 
  Grid, 
  Camera, 
  MapPin, 
  ArrowRight,
  Maximize2,
  Sliders,
  Move,
  Layers,
  Eye,
  Info
} from "lucide-react";
import { PRODUCTS_CATALOG, TileProduct } from "@/lib/products-data";
import { ROOM_PRESETS, RoomPreset } from "@/lib/visualizer-rooms";
import { drawPerspectiveTexture, Point2D } from "@/lib/perspective-renderer";

export default function VisualizerPage() {
  const [activeMode, setActiveMode] = useState<"preset" | "custom">("preset");
  const [selectedRoom, setSelectedRoom] = useState<RoomPreset>(ROOM_PRESETS[0]);

  // Target Surface (Floor vs Wall)
  const [activeSurfaceTarget, setActiveSurfaceTarget] = useState<"floor" | "wall">("floor");
  const [selectedFloorTile, setSelectedFloorTile] = useState<TileProduct>(
    PRODUCTS_CATALOG.find(p => p.id === ROOM_PRESETS[0].defaultFloorTileId) || PRODUCTS_CATALOG[0]
  );
  const [selectedWallTile, setSelectedWallTile] = useState<TileProduct>(
    PRODUCTS_CATALOG.find(p => p.id === ROOM_PRESETS[0].defaultWallTileId) || PRODUCTS_CATALOG[2]
  );

  // Grout & Laying controls
  const [groutWidth, setGroutWidth] = useState<number>(2); // mm
  const [groutColor, setGroutColor] = useState<string>("#333333");
  const [layingPattern, setLayingPattern] = useState<"grid" | "staggered" | "diagonal">("grid");

  // User uploaded image state
  const [userImageSrc, setUserImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 4-Point Perspective Quad for User Image (Normalized 0 to 1)
  const [quadPoints, setQuadPoints] = useState<Point2D[]>([
    { x: 0.12, y: 0.58 }, // Top-Left
    { x: 0.88, y: 0.58 }, // Top-Right
    { x: 1.00, y: 0.98 }, // Bottom-Right
    { x: 0.00, y: 0.98 }, // Bottom-Left
  ]);
  const [draggingPointIndex, setDraggingPointIndex] = useState<number | null>(null);

  // Search in tile drawer
  const [searchQuery, setSearchQuery] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const presetCanvasRef = useRef<HTMLCanvasElement>(null);

  const groutColors = [
    { label: "Anthracite Charcoal", hex: "#22242A" },
    { label: "Cement Grey", hex: "#7E828C" },
    { label: "Pure White", hex: "#EAECEF" },
    { label: "Beige Sand", hex: "#C2B29D" },
  ];

  // Handle file upload
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUserImageSrc(url);
      setActiveMode("custom");
    }
  };

  // 1. Render Preset Architectural Room Canvas
  useEffect(() => {
    if (activeMode !== "preset" || !presetCanvasRef.current) return;
    const canvas = presetCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1400;
    canvas.height = 875; // 16:10 aspect
    const w = canvas.width;
    const h = canvas.height;

    const floorImg = new window.Image();
    floorImg.crossOrigin = "anonymous";
    floorImg.src = selectedFloorTile.image;

    const wallImg = new window.Image();
    wallImg.crossOrigin = "anonymous";
    wallImg.src = selectedWallTile.image;

    let loaded = 0;
    const drawPreset = () => {
      loaded++;
      if (loaded === 2) {
        ctx.clearRect(0, 0, w, h);

        // Ceiling / Horizon line position
        const horizonY = h * 0.55;

        // A. Draw Wall Quad (0,0 to w,horizonY)
        const wallQuad: [Point2D, Point2D, Point2D, Point2D] = [
          { x: 0, y: 0 },
          { x: w, y: 0 },
          { x: w, y: horizonY },
          { x: 0, y: horizonY },
        ];
        drawPerspectiveTexture(ctx, wallImg, wallQuad, {
          groutWidth: groutWidth,
          groutColor: groutColor,
          gridSubdivisions: 8,
          tileRepeatX: 8,
          tileRepeatY: 4,
          opacity: 0.98,
        });

        // Wall Ambient Light & Architectural Window Vignette
        const wallGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
        wallGrad.addColorStop(0, "rgba(0, 0, 0, 0.40)");
        wallGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.08)");
        wallGrad.addColorStop(1, "rgba(0, 0, 0, 0.35)");
        ctx.fillStyle = wallGrad;
        ctx.fillRect(0, 0, w, horizonY);

        // B. Draw Baseboard / Skirting Line
        ctx.fillStyle = "#1E1E1E";
        ctx.fillRect(0, horizonY - 12, w, 12);
        ctx.fillStyle = "#3A3A3A";
        ctx.fillRect(0, horizonY - 12, w, 2);

        // C. Draw Floor Quad (0, horizonY to w, h)
        const floorQuad: [Point2D, Point2D, Point2D, Point2D] = [
          { x: w * 0.12, y: horizonY },
          { x: w * 0.88, y: horizonY },
          { x: w, y: h },
          { x: 0, y: h },
        ];
        drawPerspectiveTexture(ctx, floorImg, floorQuad, {
          groutWidth: groutWidth,
          groutColor: groutColor,
          gridSubdivisions: 12,
          tileRepeatX: 6,
          tileRepeatY: 8,
          opacity: 0.98,
        });

        // Floor Ambient Occlusion & Realistic Contact Gradient
        const floorGrad = ctx.createLinearGradient(0, horizonY, 0, h);
        floorGrad.addColorStop(0, "rgba(0, 0, 0, 0.50)");
        floorGrad.addColorStop(0.2, "rgba(0, 0, 0, 0.15)");
        floorGrad.addColorStop(0.8, "rgba(255, 255, 255, 0.05)");
        floorGrad.addColorStop(1, "rgba(0, 0, 0, 0.30)");
        ctx.fillStyle = floorGrad;
        ctx.fillRect(0, horizonY, w, h - horizonY);

        // D. Draw Architectural Silhouette Elements depending on room category
        if (selectedRoom.category === "Living Room") {
          // Minimalist Luxury Italian Sofa Silhouette
          ctx.save();
          ctx.fillStyle = "rgba(25, 26, 28, 0.88)";
          ctx.beginPath();
          // Sofa backrest
          ctx.roundRect(w * 0.28, horizonY - 60, w * 0.44, 90, 8);
          ctx.fill();
          // Sofa seat base
          ctx.fillStyle = "rgba(35, 36, 40, 0.95)";
          ctx.beginPath();
          ctx.roundRect(w * 0.24, horizonY + 10, w * 0.52, 95, 10);
          ctx.fill();
          // Floor drop shadow under sofa
          ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
          ctx.beginPath();
          ctx.ellipse(w * 0.5, horizonY + 115, w * 0.28, 18, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (selectedRoom.category === "Bathroom") {
          // Freestanding Oval Spa Tub Silhouette
          ctx.save();
          ctx.fillStyle = "rgba(0, 0, 0, 0.40)";
          ctx.beginPath();
          ctx.ellipse(w * 0.5, horizonY + 150, w * 0.22, 22, 0, 0, Math.PI * 2);
          ctx.fill();
          // Bathtub body
          ctx.fillStyle = "rgba(240, 240, 245, 0.96)";
          ctx.beginPath();
          ctx.ellipse(w * 0.5, horizonY + 90, w * 0.20, 70, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "rgba(180, 180, 190, 0.8)";
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.restore();
        } else if (selectedRoom.category === "Kitchen") {
          // Modern Kitchen Island Silhouette
          ctx.save();
          ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
          ctx.fillRect(w * 0.30, horizonY + 120, w * 0.40, 20);
          // Island Countertop
          ctx.fillStyle = "rgba(30, 32, 36, 0.95)";
          ctx.beginPath();
          ctx.roundRect(w * 0.26, horizonY + 15, w * 0.48, 110, 4);
          ctx.fill();
          // Countertop slab highlight
          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.fillRect(w * 0.25, horizonY + 10, w * 0.50, 8);
          ctx.restore();
        } else {
          // Commercial Atrium Columns
          ctx.save();
          ctx.fillStyle = "rgba(20, 20, 25, 0.90)";
          ctx.fillRect(w * 0.10, 0, 70, horizonY + 80);
          ctx.fillRect(w * 0.85, 0, 70, horizonY + 80);
          // Pillar drop shadows
          ctx.fillStyle = "rgba(0, 0, 0, 0.50)";
          ctx.beginPath();
          ctx.ellipse(w * 0.10 + 35, horizonY + 80, 50, 15, 0, 0, Math.PI * 2);
          ctx.ellipse(w * 0.85 + 35, horizonY + 80, 50, 15, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    };

    floorImg.onload = drawPreset;
    wallImg.onload = drawPreset;
  }, [activeMode, selectedRoom, selectedFloorTile, selectedWallTile, groutColor, groutWidth]);

  // 2. Render Custom Uploaded Room Canvas with Perspective Mapping
  useEffect(() => {
    if (activeMode !== "custom" || !userImageSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const baseImg = new window.Image();
    baseImg.crossOrigin = "anonymous";
    baseImg.src = userImageSrc;

    const tileImg = new window.Image();
    tileImg.crossOrigin = "anonymous";
    tileImg.src = activeSurfaceTarget === "floor" ? selectedFloorTile.image : selectedWallTile.image;

    let loadedCount = 0;
    const checkDraw = () => {
      loadedCount++;
      if (loadedCount === 2) {
        canvas.width = baseImg.width || 1200;
        canvas.height = baseImg.height || 800;
        const w = canvas.width;
        const h = canvas.height;

        // 1. Draw base photo
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(baseImg, 0, 0, w, h);

        // 2. Convert normalized quad points to pixel points
        const quadPixels: [Point2D, Point2D, Point2D, Point2D] = [
          { x: quadPoints[0].x * w, y: quadPoints[0].y * h },
          { x: quadPoints[1].x * w, y: quadPoints[1].y * h },
          { x: quadPoints[2].x * w, y: quadPoints[2].y * h },
          { x: quadPoints[3].x * w, y: quadPoints[3].y * h },
        ];

        // 3. Draw perspective tile texture with Realistic Lighting Preservation (multiply blend mode)
        drawPerspectiveTexture(ctx, tileImg, quadPixels, {
          groutWidth: groutWidth * (w / 1000),
          groutColor: groutColor,
          gridSubdivisions: 10,
          tileRepeatX: 6,
          tileRepeatY: 6,
          blendMode: "multiply",
          opacity: 0.92,
        });

        // 4. Subtle ambient room light enhancement
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = "#ED1C24";
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 8]);
        ctx.beginPath();
        ctx.moveTo(quadPixels[0].x, quadPixels[0].y);
        ctx.lineTo(quadPixels[1].x, quadPixels[1].y);
        ctx.lineTo(quadPixels[2].x, quadPixels[2].y);
        ctx.lineTo(quadPixels[3].x, quadPixels[3].y);
        ctx.closePath();
        ctx.stroke();
        ctx.setLineDash([]);

        // Draggable pin handles with clear labels
        const pinLabels = ["TL", "TR", "BR", "BL"];
        quadPixels.forEach((p, idx) => {
          ctx.fillStyle = "#ED1C24";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 11px monospace";
          ctx.fillText(pinLabels[idx], p.x + 18, p.y + 4);
        });
        ctx.restore();
      }
    };

    baseImg.onload = checkDraw;
    tileImg.onload = checkDraw;
  }, [activeMode, userImageSrc, quadPoints, selectedFloorTile, selectedWallTile, activeSurfaceTarget, groutColor, groutWidth]);

  // Calculate exact normalized coordinates taking object-contain letterboxing into account
  const getCanvasNormalizedCoords = (clientX: number, clientY: number): { x: number; y: number } | null => {
    if (!canvasRef.current) return null;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0 || canvas.width === 0 || canvas.height === 0) return null;

    const scale = Math.min(rect.width / canvas.width, rect.height / canvas.height);
    const renderedWidth = canvas.width * scale;
    const renderedHeight = canvas.height * scale;
    const offsetX = (rect.width - renderedWidth) / 2;
    const offsetY = (rect.height - renderedHeight) / 2;

    const clickX = clientX - rect.left - offsetX;
    const clickY = clientY - rect.top - offsetY;

    const normX = Math.min(Math.max(clickX / renderedWidth, 0), 1);
    const normY = Math.min(Math.max(clickY / renderedHeight, 0), 1);

    return { x: normX, y: normY };
  };

  // Handle canvas pointer drag with global tracking
  const handlePointerDown = (clientX: number, clientY: number) => {
    const coords = getCanvasNormalizedCoords(clientX, clientY);
    if (!coords) return;

    let closestIdx = -1;
    let minDistance = Infinity;

    quadPoints.forEach((p, idx) => {
      const dist = Math.hypot(p.x - coords.x, p.y - coords.y);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    // Hit test radius: ~0.12 in normalized coordinates
    if (minDistance < 0.12) {
      setDraggingPointIndex(closestIdx);
    }
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (draggingPointIndex === null) return;
    const coords = getCanvasNormalizedCoords(clientX, clientY);
    if (!coords) return;

    setQuadPoints((prev) => {
      const updated = [...prev];
      updated[draggingPointIndex] = coords;
      return updated;
    });
  };

  const handlePointerUp = () => {
    setDraggingPointIndex(null);
  };

  // Global window listeners to ensure smooth dragging even outside the canvas element
  useEffect(() => {
    if (draggingPointIndex === null) return;

    const onGlobalMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onGlobalTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onGlobalMouseUp = () => {
      handlePointerUp();
    };

    window.addEventListener("mousemove", onGlobalMouseMove);
    window.addEventListener("mouseup", onGlobalMouseUp);
    window.addEventListener("touchmove", onGlobalTouchMove);
    window.addEventListener("touchend", onGlobalMouseUp);

    return () => {
      window.removeEventListener("mousemove", onGlobalMouseMove);
      window.removeEventListener("mouseup", onGlobalMouseUp);
      window.removeEventListener("touchmove", onGlobalTouchMove);
      window.removeEventListener("touchend", onGlobalMouseUp);
    };
  }, [draggingPointIndex]);

  // Handle canvas mouse/touch drag
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    handlePointerDown(e.clientX, e.clientY);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    handlePointerMove(e.clientX, e.clientY);
  };

  const handleCanvasMouseUp = () => {
    handlePointerUp();
  };

  const handleCanvasTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Download high-res visualization
  const handleDownloadImage = () => {
    const activeCanvas = activeMode === "preset" ? presetCanvasRef.current : canvasRef.current;
    if (activeCanvas) {
      const dataUrl = activeCanvas.toDataURL("image/jpeg", 0.95);
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `Fresh-Ceramics-Simulation-${Date.now()}.jpg`;
      a.click();
    }
  };

  // Quick Quad Pin Presets
  const setFloorQuadPreset = () => {
    setQuadPoints([
      { x: 0.12, y: 0.58 },
      { x: 0.88, y: 0.58 },
      { x: 1.00, y: 0.98 },
      { x: 0.00, y: 0.98 },
    ]);
    setActiveSurfaceTarget("floor");
  };

  const setWallQuadPreset = () => {
    setQuadPoints([
      { x: 0.10, y: 0.10 },
      { x: 0.90, y: 0.10 },
      { x: 0.88, y: 0.60 },
      { x: 0.12, y: 0.60 },
    ]);
    setActiveSurfaceTarget("wall");
  };

  // Filter available tiles for the picker drawer
  const displayedTiles = PRODUCTS_CATALOG.filter((tile) => {
    const matchesTarget = activeSurfaceTarget === "floor" 
      ? tile.category === "Floor Tiles" 
      : tile.category === "Wall Tiles";
    const matchesSearch = tile.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tile.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTarget && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F6F6F4] text-stone-900 flex flex-col">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-stone-200 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-16 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-fresh-red text-white rounded-sm shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold uppercase tracking-wider text-stone-900 font-display">
              Fresh 3D Room Visualizer Studio
            </h1>
            <p className="text-[11px] text-stone-500 font-mono">
              Photorealistic Perspective Projection • Dual Surface Swap • Drag &amp; Pin Quad Mapping
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-stone-100 border border-stone-200 rounded-sm p-1">
            <button
              onClick={() => setActiveMode("preset")}
              className={`px-3.5 py-1.5 text-xs uppercase font-bold rounded-sm transition-all ${
                activeMode === "preset"
                  ? "bg-fresh-red text-white shadow-xs"
                  : "text-stone-600 hover:text-black"
              }`}
            >
              Architectural Rooms
            </button>
            <button
              onClick={() => {
                if (!userImageSrc) fileInputRef.current?.click();
                else setActiveMode("custom");
              }}
              className={`px-3.5 py-1.5 text-xs uppercase font-bold rounded-sm transition-all flex items-center gap-1.5 ${
                activeMode === "custom"
                  ? "bg-fresh-red text-white shadow-xs"
                  : "text-stone-600 hover:text-black"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{userImageSrc ? "Custom Room Upload" : "Upload Your Room"}</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleUpload} 
              accept="image/*" 
              className="hidden" 
            />
          </div>

          <button
            onClick={handleDownloadImage}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-900 hover:bg-black text-xs text-white rounded-sm font-mono transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download JPEG</span>
          </button>
        </div>
      </div>

      {/* Main Studio Viewport */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* CENTER CANVAS VIEWPORT */}
        <div className="lg:col-span-8 p-4 sm:p-6 flex flex-col justify-between bg-stone-200 relative min-h-[540px]">
          {/* Main Visualizer Container */}
          <div className="relative w-full h-full aspect-[16/10] bg-white rounded-sm border border-stone-300 overflow-hidden shadow-xl flex flex-col justify-center items-center">
            {activeMode === "preset" ? (
              <div className="relative w-full h-full">
                <canvas
                  ref={presetCanvasRef}
                  className="w-full h-full object-contain"
                />

                {/* Preset Switcher Pills */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-sm border border-stone-300 shadow-md">
                  {ROOM_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSelectedRoom(preset);
                        const fTile = PRODUCTS_CATALOG.find(p => p.id === preset.defaultFloorTileId);
                        const wTile = PRODUCTS_CATALOG.find(p => p.id === preset.defaultWallTileId);
                        if (fTile) setSelectedFloorTile(fTile);
                        if (wTile) setSelectedWallTile(wTile);
                      }}
                      className={`px-3 py-1 text-xs rounded-sm transition-all font-mono font-semibold ${
                        selectedRoom.id === preset.id
                          ? "bg-fresh-red text-white shadow-xs"
                          : "text-stone-600 hover:text-black"
                      }`}
                    >
                      {preset.category}
                    </button>
                  ))}
                </div>

                {/* Surface Labels */}
                <div className="absolute bottom-4 left-4 flex flex-col sm:flex-row gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-sm border border-stone-300 text-xs shadow-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-fresh-red" />
                    <span className="font-mono text-stone-800 font-semibold">Floor: {selectedFloorTile.name}</span>
                    <span className="text-[10px] text-stone-500 font-mono">({selectedFloorTile.size})</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-sm border border-stone-300 text-xs shadow-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <span className="font-mono text-stone-800 font-semibold">Wall: {selectedWallTile.name}</span>
                    <span className="text-[10px] text-stone-500 font-mono">({selectedWallTile.size})</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Custom Room Interactive Canvas Mode */
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {userImageSrc ? (
                  <div className="relative w-full h-full">
                    <canvas
                      ref={canvasRef}
                      onMouseDown={handleCanvasMouseDown}
                      onMouseMove={handleCanvasMouseMove}
                      onMouseUp={handleCanvasMouseUp}
                      onTouchStart={handleCanvasTouchStart}
                      className="w-full h-full object-contain cursor-crosshair touch-none"
                    />
                    {/* Quad Instruction Banner */}
                    <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between p-3 bg-white/95 backdrop-blur-md border border-stone-300 rounded-sm text-xs font-mono shadow-md gap-3">
                      <div className="flex items-center gap-2">
                        <Move className="w-4 h-4 text-fresh-red" />
                        <span className="font-semibold text-stone-900">
                          Drag the 4 red corner pins (TL, TR, BR, BL) to match your room&apos;s real floor or wall plane.
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={setFloorQuadPreset}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-sm text-[11px] font-bold"
                        >
                          Auto Floor
                        </button>
                        <button
                          onClick={setWallQuadPreset}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-sm text-[11px] font-bold"
                        >
                          Auto Wall
                        </button>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="px-2.5 py-1 bg-fresh-red text-white rounded-sm text-[11px] font-bold"
                        >
                          Change Photo
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8 space-y-4">
                    <Camera className="w-12 h-12 text-stone-400 mx-auto" />
                    <h3 className="text-base font-bold uppercase text-stone-800 font-display">
                      Upload Your Room Photo
                    </h3>
                    <p className="text-xs text-stone-500 max-w-sm mx-auto">
                      Snap or upload a photo of your living room, kitchen, or bathroom. 
                      Our 4-point perspective pin tool will project the exact tile dimensions and preserve your photo&apos;s real lighting and shadows.
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 bg-fresh-red hover:bg-fresh-red-dark text-white text-xs uppercase tracking-wider font-bold rounded-sm shadow-md"
                    >
                      Choose Image File
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Grout & Pattern Bar */}
          <div className="mt-4 bg-white border border-stone-300 p-4 rounded-sm flex flex-wrap items-center justify-between gap-4 text-xs font-mono shadow-xs">
            <div className="flex items-center gap-4">
              <span className="text-stone-500 uppercase tracking-wider font-bold">Grout Line Width:</span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((w) => (
                  <button
                    key={w}
                    onClick={() => setGroutWidth(w)}
                    className={`px-2.5 py-1 rounded-sm border ${
                      groutWidth === w
                        ? "bg-stone-900 text-white border-stone-900 font-bold"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    {w}mm
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-stone-500 uppercase tracking-wider font-bold">Grout Color:</span>
              <div className="flex items-center gap-2">
                {groutColors.map((gc) => (
                  <button
                    key={gc.hex}
                    onClick={() => setGroutColor(gc.hex)}
                    style={{ backgroundColor: gc.hex }}
                    title={gc.label}
                    className={`w-5 h-5 rounded-full border-2 transition-transform ${
                      groutColor === gc.hex ? "border-fresh-red scale-125 shadow-sm" : "border-stone-300 hover:scale-110"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT TILE PICKER DRAWER */}
        <div className="lg:col-span-4 bg-white border-l border-stone-300 p-5 flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-8rem)]">
          <div className="space-y-5">
            {/* Target Surface Selector */}
            <div>
              <div className="text-[11px] uppercase tracking-wider font-mono text-stone-400 mb-2 font-bold">
                Select Surface to Replace:
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveSurfaceTarget("floor")}
                  className={`py-2.5 px-3 rounded-sm text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-2 border ${
                    activeSurfaceTarget === "floor"
                      ? "bg-fresh-red text-white border-fresh-red shadow-xs"
                      : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <span>Floor ({selectedFloorTile.code})</span>
                </button>
                <button
                  onClick={() => setActiveSurfaceTarget("wall")}
                  className={`py-2.5 px-3 rounded-sm text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-2 border ${
                    activeSurfaceTarget === "wall"
                      ? "bg-fresh-red text-white border-fresh-red shadow-xs"
                      : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <span>Wall ({selectedWallTile.code})</span>
                </button>
              </div>
            </div>

            {/* Search Box */}
            <input
              type="text"
              placeholder={`Search ${activeSurfaceTarget} tiles (e.g. 6PGVT, W 6009)...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-sm text-xs text-stone-900 font-mono placeholder-stone-400 focus:outline-none focus:border-fresh-red transition-colors"
            />

            {/* Tile Grid */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                <span>Showing {displayedTiles.length} {activeSurfaceTarget} tiles:</span>
                <span className="text-[11px] text-fresh-red font-bold">Click to apply live</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                {displayedTiles.map((tile) => {
                  const isCurrent = activeSurfaceTarget === "floor" 
                    ? selectedFloorTile.id === tile.id 
                    : selectedWallTile.id === tile.id;

                  return (
                    <div
                      key={tile.id}
                      onClick={() => {
                        if (activeSurfaceTarget === "floor") setSelectedFloorTile(tile);
                        else setSelectedWallTile(tile);
                      }}
                      className={`group relative rounded-sm border cursor-pointer overflow-hidden transition-all p-1 bg-stone-50 ${
                        isCurrent
                          ? "border-fresh-red ring-2 ring-fresh-red/30 shadow-md"
                          : "border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      <div className="h-24 w-full relative overflow-hidden bg-stone-100 rounded-xs flex items-center justify-center p-1 border border-stone-200/50">
                        <div 
                          className="relative shadow-xs overflow-hidden flex items-center justify-center"
                          style={{
                            aspectRatio: (tile.aspectRatio === '1:2' || tile.aspectRatio === '1/2' || tile.size.includes('60x120')) ? '1 / 2' : ((tile.aspectRatio === '2:1' || tile.aspectRatio === '2/1' || tile.size.includes('Stair')) ? '2 / 1' : '1 / 1'),
                            height: (tile.aspectRatio === '1:2' || tile.aspectRatio === '1/2' || tile.size.includes('60x120')) ? '95%' : (tile.size.includes('80x80') ? '92%' : (tile.size.includes('60x60') ? '72%' : (tile.size.includes('40x40') ? '50%' : (tile.size.includes('30x30') ? '38%' : '70%')))),
                          }}
                        >
                          <img
                            src={tile.image}
                            alt={tile.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        {isCurrent && (
                          <div className="absolute top-1 right-1 bg-fresh-red text-white p-0.5 rounded-full z-10">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>

                      <div className="mt-1">
                        <div className="text-[10px] font-mono font-bold text-stone-900 truncate">
                          {tile.code}
                        </div>
                        <div className="text-[9px] text-stone-400 font-mono">
                          {tile.size}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Summary & Showroom Direct Link */}
          <div className="pt-4 border-t border-stone-200 mt-4 space-y-3 font-mono text-xs">
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-stone-400">Floor Tile:</span>
                <span className="font-bold text-stone-900">{selectedFloorTile.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Wall Tile:</span>
                <span className="font-bold text-stone-900">{selectedWallTile.name}</span>
              </div>
            </div>

            <Link
              href={`/showrooms?tile=${selectedFloorTile.code}`}
              className="w-full py-2.5 bg-fresh-red hover:bg-fresh-red-dark text-white rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Locate Showroom with These Tiles &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
