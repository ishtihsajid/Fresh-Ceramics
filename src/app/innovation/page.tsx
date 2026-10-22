"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Leaf, 
  Flame, 
  Feather, 
  Sun, 
  Droplet, 
  Wind, 
  ShieldCheck, 
  Building, 
  ArrowRight,
  Sparkles,
  Calculator,
  Sliders,
  DollarSign,
  TrendingDown,
  Car,
  Layers,
  FileText
} from "lucide-react";

export default function InnovationPage() {
  // Slim Tiles Calculator State
  const [storeys, setStoreys] = useState<number>(10);
  const [areaPerFloorSqFt, setAreaPerFloorSqFt] = useState<number>(5000);

  // Heatproof Calculator State
  const [roofAreaSqFt, setRoofAreaSqFt] = useState<number>(2500);
  const [acHoursPerDay, setAcHoursPerDay] = useState<number>(12);
  const [monthlyCoolingBillBdt, setMonthlyCoolingBillBdt] = useState<number>(35000);

  // Slim Tiles Calculations:
  // Traditional tile weight: ~25.04 kg/m²
  // Fresh Slim tile weight: ~17.83 kg/m² (28.8% reduction)
  // Conversion: 1 sq meter = 10.7639 sq ft
  const totalFloorAreaSqFt = storeys * areaPerFloorSqFt;
  const totalFloorAreaSqM = totalFloorAreaSqFt / 10.7639;

  const traditionalWeightKg = totalFloorAreaSqM * 25.04;
  const slimWeightKg = totalFloorAreaSqM * 17.83;
  const deadLoadSavedKg = traditionalWeightKg - slimWeightKg;
  const deadLoadSavedMT = Math.round((deadLoadSavedKg / 1000) * 10) / 10;

  // Toyota Corolla car average curb weight = 1,340 kg (1.34 MT)
  const carsEquivalent = Math.round(deadLoadSavedKg / 1340);

  // Heatproof Calculations:
  // Reduces solar thermal heat ingress by up to 30%
  const monthlySavingsBdt = Math.round(monthlyCoolingBillBdt * 0.30);
  const annualSavingsBdt = monthlySavingsBdt * 12;
  const tenYearSavingsBdt = annualSavingsBdt * 10;
  const carbonTonsSavedPerYear = Math.round((roofAreaSqFt * 0.008) * 10) / 10;

  const ecoPoints = [
    { 
      title: "100% Surface Water", 
      desc: "Water recycling system protecting underground aquifers from depletion.", 
      icon: Droplet 
    },
    { 
      title: "Zero Black Smoke", 
      desc: "Advanced multi-stage scrubbers and clean gas combustion technology.", 
      icon: Wind 
    },
    { 
      title: "Rooftop Solar Array", 
      desc: "Renewable solar generation installed across the massive plant roof.", 
      icon: Sun 
    },
    { 
      title: "Dust-Free Workplace", 
      desc: "Robotic enclosed pressing and polishing safeguarding human health.", 
      icon: ShieldCheck 
    },
    { 
      title: "Smart Heat Recovery", 
      desc: "Kiln exhaust energy recovered to power spray driers, cutting gas use.", 
      icon: Flame 
    },
    { 
      title: "Natural Daylight Architecture", 
      desc: "Plant roof engineered with transparent sky-prisms to eliminate daytime lighting.", 
      icon: Leaf 
    },
  ];

  return (
    <div className="min-h-screen bg-[#111215] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header - Architectural Precision */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-stone-300">
              <span className="w-2 h-2 rounded-full bg-fresh-red animate-pulse" />
              <span>SUSTAINABLE MATERIAL ENGINEERING // ARCHITECTURAL INNOVATION</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight font-display leading-[1.05]">
              Engineering Safer, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-200 to-fresh-red">
                Cooler Architecture.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl font-light">
              Fresh Ceramics invests in high-performance green architectural materials that directly reduce 
              building dead load in seismic zones, cut air conditioning cooling costs, and protect Bangladesh&apos;s natural ecosystems.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="#slim-calculator"
              className="px-5 py-3 bg-fresh-red hover:bg-fresh-red-dark text-white text-xs font-mono font-bold uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Dead Load Calculator</span>
            </a>
            <Link
              href="/products"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-mono font-bold uppercase tracking-widest rounded-sm transition-all flex items-center gap-2"
            >
              <span>Explore 385 SKUs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* SECTION 1: SLIM TILES & INTERACTIVE DEAD-LOAD CALCULATOR */}
        <div id="slim-calculator" className="bg-[#18191E] border border-white/10 p-8 sm:p-12 rounded-sm space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-fresh-red/10 border border-fresh-red/30 rounded-sm flex items-center justify-center text-fresh-red">
                <Feather className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-fresh-red tracking-widest font-bold">
                  STRUCTURAL INNOVATION // THE MATHEMATICAL PROOF
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase text-white font-display">
                  Slim Tiles: Dead Load Reduction Simulator
                </h2>
              </div>
            </div>
            <div className="px-4 py-2 bg-fresh-red/10 border border-fresh-red/30 text-fresh-red font-mono text-xs font-bold rounded-sm self-start md:self-auto">
              -29% Structural Weight
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Interactive Controls */}
            <div className="lg:col-span-6 space-y-6 bg-white/5 p-6 rounded-sm border border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase font-bold text-stone-300 tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-fresh-red" />
                  <span>Building Parameters</span>
                </h3>
                <span className="text-[11px] font-mono text-stone-400">
                  Total Area: {totalFloorAreaSqFt.toLocaleString()} sq ft
                </span>
              </div>

              {/* Slider 1: Storeys */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-400">Building Height (Storeys):</span>
                  <span className="text-white font-bold text-sm">{storeys} Floors</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="1"
                  value={storeys}
                  onChange={(e) => setStoreys(parseInt(e.target.value))}
                  className="w-full accent-fresh-red cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-500">
                  <span>1 Floor (Villa)</span>
                  <span>10 Floors (Mid-rise)</span>
                  <span>25 Floors (High-rise)</span>
                </div>
              </div>

              {/* Slider 2: Area per Floor */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-400">Floor Area per Storey:</span>
                  <span className="text-white font-bold text-sm">{areaPerFloorSqFt.toLocaleString()} sq ft</span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="20000"
                  step="500"
                  value={areaPerFloorSqFt}
                  onChange={(e) => setAreaPerFloorSqFt(parseInt(e.target.value))}
                  className="w-full accent-fresh-red cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-500">
                  <span>1,500 sq ft</span>
                  <span>10,000 sq ft</span>
                  <span>20,000 sq ft</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs font-mono text-stone-400 space-y-1.5">
                <p>• Traditional Tile Benchmark: 25.04 kg/m²</p>
                <p>• Fresh Slim Tile Benchmark: 17.83 kg/m²</p>
                <p>• Net Gravitational Reduction: 7.21 kg per m² of floor</p>
              </div>
            </div>

            {/* Right: Real-time Structural Results Dashboard */}
            <div className="lg:col-span-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Metric 1: Dead Load Saved */}
                <div className="bg-stone-900 border border-white/10 p-6 rounded-sm space-y-2">
                  <span className="text-[10px] font-mono uppercase text-stone-400 tracking-wider">
                    Total Dead Weight Saved
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-fresh-red font-display">
                    {deadLoadSavedMT} MT
                  </div>
                  <p className="text-xs font-mono text-stone-400">
                    {Math.round(deadLoadSavedKg).toLocaleString()} kg removed from foundation
                  </p>
                </div>

                {/* Metric 2: Passenger Cars Equivalent */}
                <div className="bg-stone-900 border border-white/10 p-6 rounded-sm space-y-2">
                  <span className="text-[10px] font-mono uppercase text-stone-400 tracking-wider flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-stone-400" />
                    <span>Corolla Equivalent</span>
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white font-display">
                    {carsEquivalent} Cars
                  </div>
                  <p className="text-xs font-mono text-stone-400">
                    Equal to lifting {carsEquivalent} passenger sedans off columns
                  </p>
                </div>
              </div>

              {/* Structural Engineering Benefits */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-3 font-mono text-xs">
                <h4 className="text-white uppercase font-bold tracking-wider">
                  Key Architectural &amp; Contractor Advantages:
                </h4>
                <ul className="space-y-2 text-stone-300">
                  <li className="flex items-center gap-2">
                    <span className="text-fresh-red">✓</span>
                    <span><strong>High-Seismic Safety:</strong> Significantly reduces lateral sway momentum during earthquakes.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-fresh-red">✓</span>
                    <span><strong>Direct Tile-on-Tile Renovation:</strong> Install over old tiles without costly debris demolition.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-fresh-red">✓</span>
                    <span><strong>LEED Certification:</strong> Earns credits under Materials &amp; Resources (MR) category.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-fresh-red">✓</span>
                    <span><strong>Logistics Efficiency:</strong> 30% more tile area per truckload, slashing transport emissions.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: HEATPROOF TILES & THERMAL ROI CALCULATOR */}
        <div className="bg-[#18191E] border border-white/10 p-8 sm:p-12 rounded-sm space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-fresh-red/10 border border-fresh-red/30 rounded-sm flex items-center justify-center text-fresh-red">
                <Flame className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-fresh-red tracking-widest font-bold">
                  UN SDG 11 // THERMAL EFFICIENCY
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase text-white font-display">
                  Heatproof Tiles: Thermal ROI &amp; Electricity Simulator
                </h2>
              </div>
            </div>
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold rounded-sm self-start md:self-auto">
              Up to -30% AC Energy Costs
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Inputs */}
            <div className="lg:col-span-6 space-y-6 bg-white/5 p-6 rounded-sm border border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase font-bold text-stone-300 tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span>Rooftop &amp; Cooling Parameters</span>
                </h3>
              </div>

              {/* Slider 1: Rooftop Area */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-400">Exposed Roof / Terrace Area:</span>
                  <span className="text-white font-bold text-sm">{roofAreaSqFt.toLocaleString()} sq ft</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="250"
                  value={roofAreaSqFt}
                  onChange={(e) => setRoofAreaSqFt(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Slider 2: Monthly AC Cooling Bill */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-400">Current Monthly Cooling Bill (BDT):</span>
                  <span className="text-white font-bold text-sm">৳{monthlyCoolingBillBdt.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="5000"
                  value={monthlyCoolingBillBdt}
                  onChange={(e) => setMonthlyCoolingBillBdt(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="pt-4 border-t border-white/10 text-xs font-mono text-stone-400 space-y-1.5">
                <p>• High Solar Reflectance Index (SRI) reflects 85% of infrared rays</p>
                <p>• Low Thermal Mass prevents daytime heat absorption into concrete slab</p>
                <p>• Maintains indoor temperatures 4°C to 7°C cooler during peak summer</p>
              </div>
            </div>

            {/* Right: Thermal Savings Dashboard */}
            <div className="lg:col-span-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-stone-900 border border-white/10 p-6 rounded-sm space-y-2">
                  <span className="text-[10px] font-mono uppercase text-stone-400 tracking-wider">
                    Annual Electricity Savings
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-display">
                    ৳{annualSavingsBdt.toLocaleString()}
                  </div>
                  <p className="text-xs font-mono text-stone-400">
                    ৳{monthlySavingsBdt.toLocaleString()} monthly reduction on electricity
                  </p>
                </div>

                <div className="bg-stone-900 border border-white/10 p-6 rounded-sm space-y-2">
                  <span className="text-[10px] font-mono uppercase text-stone-400 tracking-wider">
                    10-Year Cumulative ROI
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white font-display">
                    ৳{tenYearSavingsBdt.toLocaleString()}
                  </div>
                  <p className="text-xs font-mono text-stone-400">
                    ~{carbonTonsSavedPerYear} Tons CO₂ avoided per annum
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-3 font-mono text-xs">
                <h4 className="text-white uppercase font-bold tracking-wider">
                  Engineered For Bangladesh&apos;s Tropical Heat:
                </h4>
                <p className="text-stone-300 leading-relaxed">
                  During peak April–June temperatures in Dhaka and Chattogram, bare concrete rooftops reach over 65°C, 
                  radiating unbearable heat directly down into top-floor bedrooms and offices. 
                  Fresh Heatproof Tiles act as a permanent solar shield, extending AC compressor lifespan and saving thousands in operational costs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: THE 6 FACTORY SUSTAINABILITY PILLARS */}
        <div id="eco" className="space-y-8">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-mono uppercase text-fresh-red tracking-widest font-bold">
              // RESPONSIBLE MANUFACTURING
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white font-display mt-1">
              The 6 Factory Sustainability Commitments
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 max-w-2xl mt-1">
              At our 18.6M m² plant in Narsingdi, every square meter of tile is crafted under stringent 
              ecological protocols, ensuring our aesthetic creations never compromise our planet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecoPoints.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-[#18191E] border border-white/10 p-8 rounded-sm space-y-4 hover:border-fresh-red transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-sm bg-white/5 group-hover:bg-fresh-red group-hover:text-white text-stone-300 flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-stone-500 font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold uppercase text-white font-display">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="bg-stone-900 border border-white/10 p-8 sm:p-12 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-display">
              Ready to specify Fresh Slim or Heatproof Tiles?
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 max-w-xl">
              Request architectural engineering sample kits, laboratory test reports, or book a consultation with our technical materials team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/craftsmen#register"
              className="px-6 py-3.5 bg-fresh-red hover:bg-fresh-red-dark text-white text-xs font-mono font-bold uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center gap-2"
            >
              <span>Consult an Engineer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
