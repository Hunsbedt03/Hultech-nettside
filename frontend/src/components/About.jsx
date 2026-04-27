import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-20 md:py-32 border-t border-[#1f1f1f]"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="md:col-span-4"
          >
            <div className="overline mb-5">04 — Om oss</div>
            <h2
              data-testid="about-title"
              className="font-display text-[34px] sm:text-[40px] md:text-[56px] leading-[0.98] font-semibold tracking-[-0.02em]"
            >
              Om
              <br />
              Hultech.
            </h2>

            <ul className="mt-8 md:mt-10 space-y-3 font-mono text-[11.5px] sm:text-[12px] text-[#888]">
              <li className="flex justify-between gap-4 border-b border-[#1f1f1f] pb-2">
                <span>FORM</span>
                <span className="text-[#e5e5e5] text-right">ENKELTPERSONFORETAK</span>
              </li>
              <li className="flex justify-between gap-4 border-b border-[#1f1f1f] pb-2">
                <span>BASE</span>
                <span className="text-[#e5e5e5]">KRISTIANSAND, NO</span>
              </li>
              <li className="flex justify-between gap-4 border-b border-[#1f1f1f] pb-2">
                <span>REGION</span>
                <span className="text-[#e5e5e5]">AGDER</span>
              </li>
              <li className="flex justify-between gap-4 border-b border-[#1f1f1f] pb-2">
                <span>GRUNNLEGGER</span>
                <span className="text-[#e5e5e5]">NICOLAS</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="md:col-span-7 md:col-start-6"
          >
            <p
              data-testid="about-paragraph-1"
              className="font-display text-[22px] sm:text-[26px] md:text-[34px] leading-[1.25] tracking-[-0.01em] text-[#f0f0f0]"
            >
              Hultech er et ingeniørfaglig enkeltpersonforetak basert i
              Kristiansand, Norge. Stiftet av en mekatronikkingeniør med
              fagbrev som industrimekaniker, og betjener industri- og maritime
              kunder i hele Agder-regionen.
            </p>

            <div className="hu-divider my-8 md:my-10" />

            <p
              data-testid="about-paragraph-2"
              className="text-[15px] md:text-[16px] leading-[1.75] text-[#a0a0a0] max-w-[60ch]"
            >
              Vi jobber direkte med tekniske avdelinger, prosjektledere og
              innkjøp — der den faktiske ingeniørutfordringen ligger.
            </p>

            <p
              data-testid="about-paragraph-3"
              className="text-[15px] md:text-[16px] leading-[1.75] text-[#a0a0a0] max-w-[60ch] mt-5"
            >
              Vår styrke er enkel:{" "}
              <span className="text-white">
                senior teknisk kompetanse, levert uten overhead fra et stort
                firma.
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
