import React from "react";
import { motion } from "framer-motion";

const points = [
  {
    n: "01",
    title: "Fagbrev som industrimekaniker.",
    body: "Ikke bare en ingeniør bak en skjerm. Praktisk erfaring med maskinene vi designer for.",
  },
  {
    n: "02",
    title: "Bakgrunn i mekatronikk.",
    body: "Systemtenkning — mekanikk, elektro og styring — ikke bare isolerte komponenter.",
  },
  {
    n: "03",
    title: "Basert i Agder.",
    body: "På stedet når det teller. Vi går rundt på gulvet, måler objektet og snakker med operatøren.",
  },
  {
    n: "04",
    title: "Lite team. Direkte tilgang.",
    body: "Snakk med ingeniøren som gjør jobben. Beslutninger på timer, ikke endringskontrollsykluser.",
  },
  {
    n: "05",
    title: "Ingen overleveringer. Ingen kundeansvarlige.",
    body: "Bare resultater — tegninger, filer, prototyper og sertifiseringer. Levert.",
  },
];

export default function WhyHultech() {
  return (
    <section
      id="why"
      data-testid="why-section"
      className="relative py-20 md:py-32 border-t border-[#1f1f1f] bg-[#0c0c0c]"
    >
      <div
        aria-hidden
        className="absolute inset-0 bp-grid-fine opacity-40 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0) 70%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0) 70%)",
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="md:col-span-5"
          >
            <div className="overline mb-5">03 — Hvorfor Hultech</div>
            <h2
              data-testid="why-title"
              className="font-display text-[34px] sm:text-[40px] md:text-[56px] leading-[0.98] font-semibold tracking-[-0.02em]"
            >
              Hvorfor
              <br />
              Hultech.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="md:col-span-6 md:col-start-7 flex items-end"
          >
            <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#a0a0a0]">
              Den typen ingeniørpartner som vet hvordan en momentnøkkel
              kjennes ved -10 °C, hva en maritim kran utsettes for i en
              nordsjøvinter, og hvordan myndighetene faktisk leser en teknisk
              fil.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#1f1f1f]">
          {points.map((p, i) => (
            <motion.div
              key={p.n}
              data-testid={`why-point-${p.n}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: 0.05 * i,
                ease: "easeOut",
              }}
              className={`p-7 sm:p-8 md:p-10 border-b border-[#1f1f1f] ${
                i % 2 === 0 ? "md:border-r md:border-[#1f1f1f]" : ""
              }`}
            >
              <div className="flex items-baseline gap-4 mb-3">
                <span className="idx-tag">{p.n}</span>
                <span className="h-px w-10 sm:w-12 bg-[#C9A84C]" />
              </div>
              <h3 className="font-display text-[20px] sm:text-[22px] md:text-[26px] font-semibold tracking-[-0.01em] leading-[1.2] mb-3">
                {p.title}
              </h3>
              <p className="text-[14px] md:text-[15px] leading-[1.65] text-[#a0a0a0] max-w-[46ch]">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
