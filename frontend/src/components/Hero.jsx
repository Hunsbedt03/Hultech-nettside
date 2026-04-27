import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.08, duration: 0.55, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-28 md:pt-36 pb-20 md:pb-32 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 bp-grid bp-fade pointer-events-none"
      />
      <svg
        aria-hidden
        className="absolute right-0 top-24 w-[55%] max-w-[820px] opacity-[0.18] pointer-events-none hidden md:block"
        viewBox="0 0 800 600"
        fill="none"
      >
        <g stroke="#4A90D9" strokeWidth="1">
          <circle cx="500" cy="300" r="220" />
          <circle cx="500" cy="300" r="160" />
          <circle cx="500" cy="300" r="100" />
          <line x1="50" y1="300" x2="780" y2="300" />
          <line x1="500" y1="40" x2="500" y2="560" />
          <line x1="280" y1="120" x2="720" y2="480" />
          <line x1="280" y1="480" x2="720" y2="120" />
        </g>
        <g stroke="#ffffff" strokeWidth="0.5" opacity="0.35">
          <rect x="60" y="60" width="120" height="80" />
          <rect x="60" y="160" width="120" height="40" />
          <line x1="60" y1="220" x2="180" y2="220" />
          <text x="60" y="240" fill="#666" fontFamily="JetBrains Mono" fontSize="10">
            DRW-001 · REV.A
          </text>
        </g>
      </svg>

      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-6 md:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="flex items-center justify-between mb-10 md:mb-20"
        >
          <div className="flex items-center gap-3">
            <span className="block w-1.5 h-1.5 bg-[#4A90D9]" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#888]">
              ETABL. KRISTIANSAND · AGDER · NORGE
            </span>
          </div>
          <span className="hidden md:inline font-mono text-[11px] uppercase tracking-[0.22em] text-[#666]">
            01 — INNHOLD
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          data-testid="hero-headline"
          className="font-display text-[40px] sm:text-[60px] md:text-[88px] lg:text-[112px] leading-[0.95] font-semibold tracking-[-0.03em] max-w-[14ch]"
        >
          Ingeniørarbeid
          <br />
          <span className="text-white">som </span>
          <span className="relative inline-block">
            <span className="text-[#4A90D9]">holder.</span>
          </span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mt-10 md:mt-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="md:col-span-7"
          >
            <p
              data-testid="hero-subheadline"
              className="text-[15px] md:text-[17px] leading-[1.65] text-[#bdbdbd] max-w-[58ch]"
            >
              Hultech leverer mekanisk ingeniørarbeid, CE-merking, teknisk
              dokumentasjon og produktutvikling for industri- og maritime
              kunder. Vi forstår miljøene løsningene våre opererer i — fordi vi
              jobber i dem.
            </p>

            <div className="flex flex-wrap gap-3 mt-8 md:mt-9">
              <a
                href="#contact"
                data-testid="hero-cta-primary"
                className="btn-primary"
              >
                Diskuter prosjektet ditt
                <ArrowUpRight size={16} strokeWidth={1.6} />
              </a>
              <a
                href="#services"
                data-testid="hero-cta-secondary"
                className="btn-secondary"
              >
                Våre tjenester
                <ArrowDownRight size={16} strokeWidth={1.6} />
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="md:col-span-5 md:pl-8 md:border-l md:border-[#1f1f1f] flex flex-col justify-end mt-10 md:mt-0"
          >
            <ul className="space-y-3 font-mono text-[11.5px] sm:text-[12px] text-[#888]">
              <li className="flex items-center justify-between gap-4">
                <span>FAGFELT</span>
                <span className="text-[#e5e5e5]">5</span>
              </li>
              <li className="flex items-center justify-between gap-4">
                <span>SEKTORER</span>
                <span className="text-[#e5e5e5] text-right">INDUSTRI · MARITIM</span>
              </li>
              <li className="flex items-center justify-between gap-4">
                <span>LOKASJON</span>
                <span className="text-[#e5e5e5] text-right">58.16° N · 8.02° Ø</span>
              </li>
              <li className="flex items-center justify-between gap-4">
                <span>STATUS</span>
                <span className="flex items-center gap-2 text-[#e5e5e5]">
                  <span className="w-1.5 h-1.5 bg-[#4A90D9] inline-block" />
                  TAR I MOT PROSJEKTER
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={4}
        className="spec-strip mt-16 md:mt-28"
      >
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          {[
            "MEKANISK DESIGN",
            "CE-MERKING",
            "TEKNISK DOK.",
            "PRODUKTUTVIKLING",
            "3D-SKANNING",
          ].map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-[#888]"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
