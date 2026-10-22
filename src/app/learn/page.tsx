"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Compass, 
  ShieldCheck, 
  Eye, 
  FileText,
  Clock,
  Play,
  Calculator,
  ChevronRight,
  Flame,
  Droplet
} from "lucide-react";

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<"history" | "selection" | "buying" | "care">("selection");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const guides = [
    {
      id: "selection",
      badge: "GUIDE 01",
      title: "Which Tile Where? (Spatial Selection Guide)",
      bengaliTitle: "কোন স্থানে কোন টাইলস নির্বাচন করবেন?",
      subtitle: "Matching slip resistance, water absorption, and abrasion classes to specific architectural zones.",
      readTime: "6 min read",
      views: "230.1K Views",
      content: [
        {
          heading: "1. High-Traffic Living Rooms & Atriums",
          body: "For main living salons, grand atriums, and commercial lobbies with heavy pedestrian flow, specify Full Line Double Charge vitrified tiles or Mirror-Polished Glazed Vitrified Tiles (PGVT). Look for a Modulus of Rupture (MOR) ≥ 38 N/mm² and water absorption < 0.05% to ensure the surface will never show wear paths or loss of gloss over decades.",
          recommendation: "Fresh 60x120 cm & 80x80 cm Double Charge Series"
        },
        {
          heading: "2. Bathrooms, Showers & Wet Zones",
          body: "Wet spaces demand tactile safety without compromising elegance. For bathroom floors, select honed, matte, or anti-slip surfaces with an R10/R11 slip rating. For walls, pair with our exclusive DewDrop or Candy glazes, which feature micro-embossed droplet textures that catch natural daylight while remaining impervious to steam and soap residues.",
          recommendation: "Fresh DewDrop 30x60 cm Wall + Anti-Slip Matt Floor"
        },
        {
          heading: "3. Kitchen Counters & Culinary Zones",
          body: "Kitchen floors and backsplashes face constant oil splashes, hot turmeric, and cleaning agents. Standard ceramic wall tiles can absorb cooking oils if glaze quality is low. Fresh Ceramics uses Italian nanotech glazes fired at 1,220°C, rendering the surface completely stain-proof against curry, spices, and lemon acid.",
          recommendation: "Fresh Candy Series & Mirror-Polished Vitrified Slabs"
        },
        {
          heading: "4. Rooftops, Terraces & Facades",
          body: "Rooftop and outdoor balconies are subjected to harsh tropical UV rays and monsoonal rains. Specify Fresh Heatproof Tiles on open terraces to reflect solar infrared radiation and cut indoor temperatures by up to 30%, or high-impact Rustic exterior slabs for weather-resistant facades.",
          recommendation: "Fresh Heatproof Tiles & 20x120 cm Rustic Planks"
        }
      ]
    },
    {
      id: "buying",
      badge: "GUIDE 02",
      title: "Essential Tile Buying Considerations",
      bengaliTitle: "টাইলস কেনার সময় যে বিষয়গুলো যাচাই করবেন",
      subtitle: "How to calculate accurate square footage, wastage allowance, and inspect batch codes.",
      readTime: "8 min read",
      views: "185.4K Views",
      content: [
        {
          heading: "1. Calculate Square Footage & 10% Wastage",
          body: "Always measure each room's width and length accurately in feet or meters. Add an essential 8% to 10% cutting and wastage allowance (12% for diagonal patterns). Tiles must be cut along perimeter walls, around plumbing stacks, and door sills. Ordering extra ensures you have identical batch tiles if unforeseen site breakage occurs.",
          recommendation: "Rule of thumb: Total Area × 1.10 = Required Tile Quantity"
        },
        {
          heading: "2. Inspect the Batch / Tone Number",
          body: "Every box of ceramic and vitrified tiles is imprinted with a Tone/Shade number and Caliber size. Because ceramic clay is a natural raw material fired under intense thermal heat, slight microscopic tone shifts can occur between different production runs. Always verify that every box delivered to your site bears the identical Batch & Shade Code.",
          recommendation: "Fresh automated sorting guarantees 98% A-grade shade consistency"
        },
        {
          heading: "3. Choose the Right Adhesive vs Mortar",
          body: "Laying large-format vitrified tiles (such as 60x120 cm or 80x80 cm) using traditional thick cement-sand mortar is a common cause of hollow sounds and pop-ups. Low-absorption vitrified tiles require polymer-modified tile adhesive (C2TE standard) which bonds mechanically and chemically to the tile back.",
          recommendation: "Use polymer-modified thin-set adhesive with notched trowels"
        },
        {
          heading: "4. Ultra Fine Squaring & Joint Spacers",
          body: "Even with Fresh Ceramics' Ultra Fine Squaring technology that allows virtually zero-corner gaps, reputable structural engineers advise leaving a 1.5mm to 2mm hairline expansion joint using tile leveling spacers. This allows concrete slabs to expand and contract during tropical seasonal heat without buckling.",
          recommendation: "Use tile leveling clips with anti-fungal epoxy grout"
        }
      ]
    },
    {
      id: "care",
      badge: "GUIDE 03",
      title: "Tile Care, Cleaning & Maintenance",
      bengaliTitle: "টাইলসের দীর্ঘস্থায়ী পরিচর্যা ও পরিচ্ছন্নতা",
      subtitle: "Preserving mirror polish brilliance and stain resistance over decades.",
      readTime: "5 min read",
      views: "142.0K Views",
      content: [
        {
          heading: "1. The Danger of Harsh Toilet Acids",
          body: "Never use concentrated hydrochloric acid or muriatic acid on glazed vitrified tiles. Strong acid attacks the nano-protective glaze layer, creating microscopic pitting that permanently destroys the mirror reflection and causes dirt to stick. Clean instead with neutral pH floor cleaners or mild detergent diluted in warm water.",
          recommendation: "Use neutral pH floor wash; avoid muriatic and battery acids"
        },
        {
          heading: "2. Grout Line Maintenance & Sealing",
          body: "While the tile body itself is impervious to water (<0.05% absorption), cementitious grout lines are porous. Clean grout lines using a soft nylon bristle brush with baking soda and warm water paste. Applying an acrylic grout sealer once every two years prevents mold growth and discoloration.",
          recommendation: "Re-seal cement grout periodically or upgrade to epoxy grout"
        },
        {
          heading: "3. Protecting High-Gloss Polish From Sand Scratches",
          body: "Coarse silica sand brought in on outdoor shoes is the primary abrasive that scratches polished porcelain over time. Place heavy-duty coir or rubber entrance mats at all exterior doorways to trap grit before it enters the living salon.",
          recommendation: "Dual door-mat barrier system at main residential entrances"
        }
      ]
    },
    {
      id: "history",
      badge: "GUIDE 04",
      title: "The Evolution of Ceramics: Terracotta to Sintered Porcelain",
      bengaliTitle: "সিরামিকসের ইতিহাস: পোড়ামাটি থেকে আধুনিক পোরসেলিন",
      subtitle: "How centuries of ceramic mastery culminated in Italian automated vitrification.",
      readTime: "7 min read",
      views: "96.8K Views",
      content: [
        {
          heading: "1. From Ancient Terracotta to Glazed Tiles",
          body: "Humanity has fired clay since Mesopotamian and Egyptian antiquity. In Bengal, historic terracotta plaques on medieval mosques and temples proved the durability of local clays. However, traditional porous earthenware easily absorbed moisture, cracked during thermal shock, and lacked structural density.",
          recommendation: "Bengal's terracotta heritage transformed into modern engineering"
        },
        {
          heading: "2. The Vitrification Revolution",
          body: "True vitrification happens when feldspar, quartz, and ball clay are pressurized at upwards of 7,200 tons/m² and fired in automated Italian Sacmi roller kilns at 1,220°C. The minerals undergo liquid sintering, creating a dense, glass-like molecular matrix that is completely non-porous (<0.05% absorption).",
          recommendation: "Sacmi Italian high-pressure roller kilns at Narsingdi plant"
        },
        {
          heading: "3. The Double Charge Innovation",
          body: "Traditional printed tiles only have a microscopic digital ink surface. Double Charge technology compacts two distinct porcelain layers: a structural base and a 3-4mm top layer infused with natural colored mineral veining. Even after decades of high-traffic wear, the pattern never rubs off.",
          recommendation: "Fresh is Bangladesh's sole producer of all 3 Double Charge sizes"
        }
      ]
    }
  ];

  const faqs = [
    {
      q: "What is the difference between Ceramic and Porcelain Vitrified tiles?",
      a: "Ceramic tiles are made of red or white clay fired at lower temperatures, resulting in 3% to 7% water absorption, making them ideal for indoor walls. Porcelain Vitrified tiles are pressed under immense pressure and fired at over 1,200°C, producing a dense body with less than 0.05% water absorption, suitable for heavy-duty floors, commercial lobbies, and outdoor facades."
    },
    {
      q: "What is Double Charge Vitrified tile and why is it unique to Fresh Ceramics?",
      a: "Double Charge tiles feature two fused layers of porcelain: a reinforced structural body and a thick 3-4mm layer infused with natural mineral veining. Unlike single-glazed tiles where a surface scratch exposes a plain clay body, Double Charge veining penetrates deep into the slab. Fresh Ceramics is the first and only manufacturer in Bangladesh with the automated machinery to produce all three standard Double Charge sizes: 60x60, 80x80, and 60x120 cm."
    },
    {
      q: "How does Ultra Fine Squaring prevent corner gaps?",
      a: "In standard tile production, kiln thermal shrinkage creates minor edge curvature and slight trapezoidal angles, leading to 2mm corner gaps when installed. Fresh Ceramics passes every single tile through continuous Italian diamond squaring calibrators that true every edge to an exact 90° angle, allowing fitters to achieve a virtually seamless joint."
    },
    {
      q: "How much tile wastage should I calculate for my project?",
      a: "We recommend adding 8% to 10% over the actual room area for standard straight grid layouts. For diagonal laying patterns or rooms with intricate niches and pillars, allocate 12% to 15% wastage to account for angular cuts."
    },
    {
      q: "Can Fresh Slim Tiles be installed over existing old tiles?",
      a: "Yes! Fresh Slim Tiles are engineered with a reduced thickness and 29% lower dead load, making them ideal for retrofit renovation. Using a high-performance polymer tile-on-tile adhesive, they can be laid directly over clean existing tiles without the labor, debris, and structural stress of demolishing old floors."
    }
  ];

  const currentGuide = guides.find((g) => g.id === activeTab) || guides[0];

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-stone-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header - Editorial Prestige */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-stone-200 pb-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 border border-stone-200 rounded-full text-xs font-mono text-stone-700">
              <span className="w-2 h-2 rounded-full bg-fresh-red animate-pulse" />
              <span>KNOWLEDGE SHARING SERIES // ARCHITECTURAL ACADEMY</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-stone-900 tracking-tight font-display leading-[1.05]">
              The Tile Knowledge <br />
              <span className="text-fresh-red">Academy &amp; Guides.</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
              Fresh Ceramics has led the conversation on architectural materials in Bangladesh through our 
              celebrated video series (watched by over 200,000 specifiers). Explore comprehensive guides on 
              tile selection, testing standards, site calculation, and long-term surface care.
            </p>
          </div>

          {/* Quick Nav Tools */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/visualizer"
              className="px-5 py-3 bg-fresh-red hover:bg-fresh-red-dark text-white text-xs font-mono font-bold uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch 3D Visualizer</span>
            </Link>
            <Link
              href="/products"
              className="px-5 py-3 bg-white border border-stone-300 hover:bg-stone-50 text-stone-900 text-xs font-mono font-bold uppercase tracking-widest rounded-sm transition-all flex items-center gap-2"
            >
              <span>Explore 385 SKUs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-4">
          {guides.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveTab(g.id as any)}
              className={`px-5 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-2 ${
                activeTab === g.id
                  ? "bg-fresh-red text-white shadow-xs"
                  : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              <span>{g.badge}:</span>
              <span>{g.title.split("(")[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Guide Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Content Article */}
          <div className="lg:col-span-8 bg-white border border-stone-200 p-8 sm:p-12 rounded-sm space-y-8 shadow-xs">
            <div className="space-y-3 border-b border-stone-100 pb-6">
              <div className="flex items-center gap-3 font-mono text-xs text-stone-400">
                <span className="text-fresh-red font-bold">{currentGuide.badge}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {currentGuide.readTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <Eye className="w-3.5 h-3.5" />
                  {currentGuide.views}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black uppercase text-stone-900 font-display">
                {currentGuide.title}
              </h2>

              <p className="text-base text-fresh-red font-semibold">
                {currentGuide.bengaliTitle}
              </p>

              <p className="text-sm text-stone-600 leading-relaxed pt-1">
                {currentGuide.subtitle}
              </p>
            </div>

            {/* Article Chapters */}
            <div className="space-y-8">
              {currentGuide.content.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-lg font-bold text-stone-900 uppercase font-display flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center text-xs font-mono font-bold">
                      {idx + 1}
                    </span>
                    <span>{sec.heading}</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-8">
                    {sec.body}
                  </p>

                  <div className="ml-8 bg-[#FBFBFA] border border-stone-200 p-3 rounded-sm text-xs font-mono text-stone-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-fresh-red shrink-0" />
                    <span><strong>Fresh Recommendation:</strong> {sec.recommendation}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Next Step Link */}
            <div className="pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-stone-500">
                Have specific technical questions for a commercial project?
              </div>
              <Link
                href="/craftsmen#register"
                className="text-xs font-mono uppercase font-bold text-fresh-red hover:text-fresh-red-dark flex items-center gap-1.5"
              >
                <span>Consult Our Materials Engineer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Sidebar: Tile Specifier Cheat Sheet & Quick Tools */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Tile Matrix Card */}
            <div className="bg-[#121316] text-white p-6 rounded-sm space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-fresh-red tracking-widest font-bold">
                  // QUICK SPECIFIER MATRIX
                </span>
                <h4 className="text-lg font-bold uppercase text-white font-display">
                  14 Factory Lab Tests
                </h4>
                <p className="text-xs text-stone-400">
                  Every batch of Fresh Ceramics is certified against 14 global performance benchmarks:
                </p>
              </div>

              <div className="space-y-2 text-xs font-mono text-stone-300">
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-stone-400">Water Absorption</span>
                  <span className="text-emerald-400 font-bold">&lt; 0.05% (Vitrified)</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-stone-400">Modulus of Rupture</span>
                  <span className="text-white font-bold">&ge; 38 N/mm²</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-stone-400">Surface Flatness</span>
                  <span className="text-white font-bold">&plusmn; 0.1% Laser</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-stone-400">Thermal Shock</span>
                  <span className="text-emerald-400 font-bold">10 Cycles Resistant</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-stone-400">Chemical Resistance</span>
                  <span className="text-white font-bold">Class GA / GLA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Stain Resistance</span>
                  <span className="text-emerald-400 font-bold">Class 5 (Impervious)</span>
                </div>
              </div>

              <Link
                href="/catalogue"
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase font-bold tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 border border-white/20"
              >
                <FileText className="w-3.5 h-3.5 text-fresh-red" />
                <span>Download Tech Data Sheet</span>
              </Link>
            </div>

            {/* Visualizer Promo Card */}
            <div className="bg-white border border-stone-200 p-6 rounded-sm space-y-4 shadow-xs">
              <div className="w-10 h-10 rounded-sm bg-fresh-red/10 text-fresh-red flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold uppercase text-stone-900 font-display">
                  Test Surfaces in 3D
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Before finalizing your tile order, visualize it live in 4 luxury room presets or upload a photo of your own room.
                </p>
              </div>
              <Link
                href="/visualizer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-fresh-red hover:text-fresh-red-dark"
              >
                <span>Launch 3D Visualizer Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Specifier FAQ Accordion */}
        <div className="space-y-6 pt-6 border-t border-stone-200">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-fresh-red tracking-widest font-bold">
              // SPECIFIER &amp; HOMEOWNER FAQS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-stone-900 font-display">
              Frequently Asked Questions About Tiles
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-stone-200 rounded-sm overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
                >
                  <span className="text-sm font-bold uppercase text-stone-900 font-display">
                    {faq.q}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 text-fresh-red shrink-0 transition-transform duration-300 ${
                      activeFaq === idx ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {activeFaq === idx && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-[#FBFBFA]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
