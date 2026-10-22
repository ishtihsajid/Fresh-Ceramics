"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Award, 
  ShieldCheck, 
  Truck, 
  Package, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Phone, 
  Calendar, 
  MapPin, 
  Wrench,
  FileText,
  BadgeCheck,
  Send
} from "lucide-react";

export default function CraftsmenPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "Dhaka",
    profession: "Tile Fitter / Mason",
    experienceYears: "5-10 years",
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fitterAdvantages = [
    {
      title: "Ultra Fine Squaring Technology",
      bengaliTitle: "জিরো কর্নার গ্যাপ — পারফেক্ট অ্যালাইনমেন্ট",
      desc: "Italian laser-guided diamond edge squaring ensures true 90° corners. Fitters achieve a perfectly flat, seamless floor with zero lippage and zero corner gaps without frustrating tile trimming.",
      icon: Wrench,
      stat: "0.0 mm Gap"
    },
    {
      title: "Protective Poly-Wrap & Corner Caps",
      bengaliTitle: "সুরক্ষিত প্যাকেজিং — কর্নার ক্যাপ প্রটেকশন",
      desc: "Every box of Fresh Ceramics is shrink-wrapped with waterproof poly-wrap and reinforced with heavy-duty corner caps. Tiles arrive on your job site without chipped corners or transport breakage.",
      icon: Package,
      stat: "Zero Chip"
    },
    {
      title: "Guaranteed 4-Day Site Delivery",
      bengaliTitle: "৪ দিনে সরাসরি সাইট ডেলিভারি নিশ্চয়তা",
      desc: "No waiting for shipments while site labor stands idle. With 81+ authorized dealer galleries across 64 districts, orders are delivered directly to your project site within 4 working days.",
      icon: Truck,
      stat: "4 Days"
    },
    {
      title: "Consistent Shade Grading",
      bengaliTitle: "একই শেডের গ্যারান্টি — নো কালার ভেরিয়েশন",
      desc: "High-speed digital sorting separates tiles into strict, identical shade lots. Never worry about color mismatches between the first box laid and the last box finished in a room.",
      icon: ShieldCheck,
      stat: "98% A-Grade"
    }
  ];

  const upcomingMeets = [
    {
      region: "Dhaka Division",
      city: "Gazipur & Narayanganj Region",
      date: "November 14, 2026",
      venue: "Fresh Ceramics Regional Center, Narsingdi",
      seats: "250 Fitters",
      status: "Registration Open"
    },
    {
      region: "Chattogram Division",
      city: "Agrabad & Halishahar Region",
      date: "November 28, 2026",
      venue: "House of Aesthetics, Kazir Dewri Display Center",
      seats: "180 Fitters",
      status: "Registration Open"
    },
    {
      region: "Sylhet Division",
      city: "Zindabazar & Shahjalal Region",
      date: "December 08, 2026",
      venue: "Rose View Grand Convention, Sylhet",
      seats: "150 Fitters",
      status: "Filling Fast"
    },
    {
      region: "Rajshahi Division",
      city: "Bogura & Rangpur Highway",
      date: "December 18, 2026",
      venue: "MomIn Grand Convention Center, Bogura",
      seats: "200 Fitters",
      status: "Registration Open"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-stone-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header - Editorial Prestige */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-stone-200 pb-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 border border-stone-200 rounded-full text-xs font-mono text-stone-700">
              <span className="w-2 h-2 rounded-full bg-fresh-red animate-pulse" />
              <span>নান্দনিকতার কারিগর // FITTER &amp; CRAFTSMEN PORTAL</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-stone-900 tracking-tight font-display leading-[1.05]">
              The Hands Behind <br />
              <span className="text-fresh-red">The Aesthetic Life.</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
              An architectural tile is only as beautiful as the hands that lay it. 
              Fresh Ceramics proudly partners with over 10,000 master fitters, contractors, and craftsmen 
              across Bangladesh, delivering tools, training, and the highest precision tiles in the nation.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 bg-white border border-stone-200 p-5 rounded-sm shadow-xs font-mono shrink-0">
            <div>
              <div className="text-2xl font-black text-fresh-red">10K+</div>
              <div className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Fitters</div>
              <div className="text-[10px] text-stone-400">Certified Partners</div>
            </div>
            <div className="border-l border-stone-200 pl-4">
              <div className="text-2xl font-black text-stone-900">4-Day</div>
              <div className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Delivery</div>
              <div className="text-[10px] text-stone-400">To Any Project</div>
            </div>
            <div className="border-l border-stone-200 pl-4">
              <div className="text-2xl font-black text-stone-900">0.0 mm</div>
              <div className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Corner Gap</div>
              <div className="text-[10px] text-stone-400">Ultra-Fine Squaring</div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Engineering for Fitters */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-fresh-red font-bold tracking-widest">// FITTER EXCELLENCE</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-stone-900 font-display">
                Why Craftsmen Prefer Fresh Ceramics
              </h2>
            </div>
            <span className="text-xs font-mono text-stone-500">
              Designed from real feedback on construction sites
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fitterAdvantages.map((adv) => {
              const Icon = adv.icon;
              return (
                <div
                  key={adv.title}
                  className="bg-white border border-stone-200 p-8 rounded-sm space-y-4 hover:border-fresh-red hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-sm bg-stone-100 group-hover:bg-fresh-red group-hover:text-white text-stone-900 flex items-center justify-center transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 bg-stone-100 text-stone-700 text-xs font-mono font-bold rounded-sm">
                        {adv.stat}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold uppercase text-stone-900 font-display">
                        {adv.title}
                      </h3>
                      <p className="text-xs text-fresh-red font-semibold mt-0.5">
                        {adv.bengaliTitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {adv.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-mono text-stone-500">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Tested &amp; certified across 14 factory QC checks</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fitter Meets Schedule */}
        <div className="bg-[#121316] text-white p-8 sm:p-12 rounded-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-fresh-red tracking-widest font-bold">
                // NATIONWIDE FITTER MEETS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-white font-display">
                নান্দনিকতার কারিগর সম্মেলন ২০২৬
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 max-w-xl">
                Join our regional craftsmen conventions for live laying demonstrations, 
                expert tile leveling masterclasses, tool giveaways, and trade certificates.
              </p>
            </div>
            <a
              href="#register"
              className="px-6 py-3 bg-fresh-red hover:bg-fresh-red-dark text-white text-xs font-mono font-bold uppercase tracking-widest rounded-sm transition-all shadow-md shrink-0 inline-flex items-center gap-2"
            >
              <span>Register for Next Meet</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingMeets.map((meet) => (
              <div
                key={meet.city}
                className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4 hover:border-fresh-red transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-fresh-red font-bold">
                    {meet.region}
                  </span>
                  <h4 className="text-lg font-bold uppercase text-white font-display">
                    {meet.city}
                  </h4>
                  <div className="text-xs text-stone-400 space-y-1 pt-2 font-mono">
                    <div className="flex items-center gap-1.5 text-stone-300">
                      <Calendar className="w-3.5 h-3.5 text-fresh-red" />
                      <span>{meet.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span className="truncate">{meet.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-stone-400">{meet.seats}</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-xs font-bold">
                    {meet.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architect & Fitter Registration Form */}
        <div id="register" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-fresh-red tracking-widest font-bold">
                // JOIN THE NETWORK
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase text-stone-900 font-display">
                Become a Fresh Certified Partner
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Whether you are a master tile fitter, building contractor, or architect, 
                registering gives you direct factory hotline support, complimentary sample boxes, 
                free technical spec sheets, and priority event invitations.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-6 rounded-sm space-y-4">
              <h4 className="text-xs font-mono uppercase font-bold text-stone-900 tracking-wider">
                Direct Craftsmen Hotline:
              </h4>
              <div className="space-y-2 text-xs font-mono text-stone-700">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-fresh-red" />
                  <span className="font-bold">+880 9666 777 055 (Ext. 4)</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                  <span>Toll-Free Fitter Helpdesk: 16595</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-stone-200 p-8 sm:p-10 rounded-sm shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold uppercase text-stone-900 font-display">
                  Registration Received!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                  ধন্যবাদ! Our Regional Technical Representative will contact you within 24 hours 
                  with your Welcome Kit and regional event details.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-black text-white text-xs font-mono uppercase rounded-sm"
                >
                  Submit Another Registration
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold uppercase text-stone-900 font-display pb-2 border-b border-stone-100">
                  Craftsmen &amp; Contractor Registration Form
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-stone-600 font-bold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Md. Rafiqul Islam"
                      className="w-full px-4 py-2.5 border border-stone-300 rounded-sm text-xs font-mono focus:outline-hidden focus:border-fresh-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-stone-600 font-bold mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="017XXXXXXXX"
                      className="w-full px-4 py-2.5 border border-stone-300 rounded-sm text-xs font-mono focus:outline-hidden focus:border-fresh-red"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-stone-600 font-bold mb-1">
                      District / Region
                    </label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-3 py-2.5 border border-stone-300 rounded-sm text-xs font-mono focus:outline-hidden focus:border-fresh-red bg-white"
                    >
                      <option>Dhaka</option>
                      <option>Chattogram</option>
                      <option>Sylhet</option>
                      <option>Rajshahi</option>
                      <option>Khulna</option>
                      <option>Barisal</option>
                      <option>Rangpur</option>
                      <option>Mymensingh</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-stone-600 font-bold mb-1">
                      Profession
                    </label>
                    <select
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      className="w-full px-3 py-2.5 border border-stone-300 rounded-sm text-xs font-mono focus:outline-hidden focus:border-fresh-red bg-white"
                    >
                      <option>Tile Fitter / Mason</option>
                      <option>General Contractor</option>
                      <option>Architect / Interior</option>
                      <option>Project Engineer</option>
                      <option>Tile Dealer / Retailer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-stone-600 font-bold mb-1">
                      Experience
                    </label>
                    <select
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                      className="w-full px-3 py-2.5 border border-stone-300 rounded-sm text-xs font-mono focus:outline-hidden focus:border-fresh-red bg-white"
                    >
                      <option>Under 2 years</option>
                      <option>2 - 5 years</option>
                      <option>5 - 10 years</option>
                      <option>10+ years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 font-bold mb-1">
                    Project Details or Inquiries
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us about your ongoing projects, or ask for a sample catalogue..."
                    className="w-full px-4 py-2.5 border border-stone-300 rounded-sm text-xs font-mono focus:outline-hidden focus:border-fresh-red"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-fresh-red hover:bg-fresh-red-dark text-white font-mono text-xs uppercase font-bold tracking-widest rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Partner Registration</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
