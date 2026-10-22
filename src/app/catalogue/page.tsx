"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Download, FileText, ArrowRight, Eye, ShieldCheck, Sparkles, Scale, Layers } from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function CataloguePage() {
  const catalogues = [
    {
      id: "master-2026",
      title: "Fresh Ceramics Master Architectural Catalogue 2026",
      subtitle: "Complete Architectural Wall & Floor Surface Portfolio",
      pages: "128 Pages",
      size: "PDF High Resolution • 16 MB",
      url: "/catalogue/FRESH-CERAMICS-2026.pdf",
      desc: "Comprehensive reference manual for architects, interior designers, and developers. Featuring 480+ models across 60×120 cm Monoliths, Double Charge Vitrified, Mirror Polished PGVT, and Rustic wall textures.",
      featured: true,
      tags: ["Full Catalog", "Architecture Edition", "2026 Master"]
    },
    {
      id: "technical-spec-2026",
      title: "Technical Specifications & Structural Dead-Load Guide",
      subtitle: "Engineering Specs, Kiln Standards & Thermal Resistance",
      pages: "Technical Manual",
      size: "PDF Document • Direct Download • 16 MB",
      url: "/catalogue/FRESH-CERAMICS-2026.pdf",
      desc: "Complete structural data sheets including water absorption (<0.05%), breaking strength (>1300 N), chemical stain resistance (Class 5), and UN SDG 11 heatproof rooftop insulation ratings.",
      featured: false,
      tags: ["ISO 9001 / 14001", "Engineering Specs", "Dead-Load Data"]
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0D] text-white pt-24 pb-12 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 flex-1">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-fresh-red">
              <span className="w-2 h-2 rounded-full bg-fresh-red animate-pulse" />
              <span>ARCHITECTURAL MEDIA LIBRARY // FRESH CERAMICS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight font-display">
              Digital Catalogues
            </h1>
            <p className="text-sm text-gray-400 max-w-xl font-editorial">
              Download our official 2026 master catalogues, structural technical data sheets, and installation guidelines. 
              Everything you need for client presentations, bill of quantities (BOQ), and CAD/BIM drafting.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/5 px-4 py-2 rounded-sm border border-white/10">
            <ShieldCheck className="w-4 h-4 text-fresh-red" />
            <span>Official Fresh Ceramics Ltd Publications</span>
          </div>
        </div>

        {/* Catalogues Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {catalogues.map((cat) => (
            <div
              key={cat.id}
              className={`p-8 sm:p-10 rounded-sm border transition-all duration-300 flex flex-col justify-between space-y-8 ${
                cat.featured
                  ? "bg-[#181815] border-fresh-red/50 shadow-2xl shadow-fresh-red/10"
                  : "bg-[#141412] border-white/10 hover:border-white/25"
              }`}
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center text-fresh-red">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-gray-400 font-mono">
                    {cat.size}
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {cat.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 bg-white/5 text-[9px] font-mono uppercase text-fresh-red border border-white/10 rounded-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold uppercase text-white font-display mt-2 leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-400 mt-1">
                    {cat.subtitle}
                  </p>
                </div>

                <p className="text-xs text-gray-300 font-editorial leading-relaxed border-t border-white/10 pt-4">
                  {cat.desc}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <a
                  href={cat.url}
                  download="FRESH-CERAMICS-2026-CATALOGUE.pdf"
                  className="flex-1 py-3 bg-fresh-red hover:bg-[#c91219] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-fresh-red/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Document</span>
                </a>

                <a
                  href={cat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5"
                  title="View PDF Online"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Help Banner */}
        <div className="bg-[#141412] border border-white/10 p-8 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white font-display uppercase tracking-tight">
              Require Custom Architectural Samples or BOQ Pricing?
            </h4>
            <p className="text-xs text-gray-400 font-editorial">
              Visit our Flagship Display Centers in Dhaka &amp; Chattogram or connect with our structural advisory desk.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/showrooms"
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono uppercase tracking-wider rounded-xs transition-colors"
            >
              81 Showrooms →
            </Link>
            <Link
              href="/products"
              className="px-5 py-2.5 bg-fresh-red hover:bg-[#c91219] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-xs transition-colors shadow-md"
            >
              Browse 480+ SKUs
            </Link>
          </div>
        </div>

      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
