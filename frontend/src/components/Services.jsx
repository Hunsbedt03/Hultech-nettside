import React from "react";
import { motion } from "framer-motion";
import {
  Cog,
  ShieldCheck,
  FileText,
  Hammer,
  ScanLine,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    n: "01",
    icon: Cog,
    title: "Mekanisk ingeniørarbeid og design",
    body: "Strukturanalyse, mekanismedesign og lastberegninger. Løsninger bygget for reelle driftsforhold — ikke ideelle.",
    tags: ["FEM", "LASTBEREGNING", "MEKANISMER"],
  },
  {
    n: "02",
    icon: ShieldCheck,
    title: "CE-merking og samsvarsvurdering",
    body: "Hele CE-merkingsprosessen: risikovurdering, teknisk dokumentasjon og samsvarserklæring. Vi tar papirarbeidet, slik at produktet ditt kommer på markedet.",
    tags: ["CE", "RISIKOVURDERING", "DOK"],
  },
  {
    n: "03",
    icon: FileText,
    title: "Teknisk dokumentasjon",
    body: "Produksjonstegninger, monteringsanvisninger, delelister og komplette tekniske filer i henhold til ISO- og EN-standarder.",
    tags: ["ISO", "EN", "TEGNINGER"],
  },
  {
    n: "04",
    icon: Hammer,
    title: "Produktutvikling og prototyping",
    body: "Fra konsept til fungerende prototype. Rask iterasjon med 3D-modellering og 3D-printing internt.",
    tags: ["CAD", "FDM", "ITERASJON"],
  },
  {
    n: "05",
    icon: ScanLine,
    title: "3D-skanning og omvendt utvikling",
    body: "Punktskykartlegging og CAD-rekonstruksjon av eksisterende deler og sammenstillinger. Nyttig når dokumentasjonen ikke lenger finnes.",
    tags: ["PUNKTSKY", "CAD-REKON"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative py-20 md:py-32 border-t border-[#1f1f1f]"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-12 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="md:col-span-4"
          >
            <div className="overline mb-5">02 — Kompetanse</div>
            <h2
              data-testid="services-title"
              className="font-display text-[34px] sm:text-[40px] md:text-[56px] leading-[0.98] font-semibold tracking-[-0.02em]"
            >
              Hva vi
              <br />
              leverer.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="md:col-span-7 md:col-start-6 flex items-end"
          >
            <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#a0a0a0] max-w-[58ch]">
              Fem fagfelt, utført ende-til-ende av senioringeniører. Ingen
              underleverandører som kaster ballen videre. Ingen oppblåst
              omfang. Tegninger, filer og prototyper som tåler verkstedgulvet
              og myndighetene.
            </p>
          </motion.div>
        </div>

        <div className="border-t border-[#1f1f1f]">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.a
                key={s.n}
                href="#contact"
                data-testid={`service-row-${s.n}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.45,
                  delay: 0.05 * i,
                  ease: "easeOut",
                }}
                className="group grid grid-cols-12 gap-x-3 sm:gap-x-4 md:gap-8 gap-y-3 py-7 md:py-12 border-b border-[#1f1f1f] hover:bg-[#121212] transition-colors"
              >
                <div className="col-span-2 md:col-span-1 flex items-start">
                  <span className="idx-tag pt-1">{s.n}</span>
                </div>

                <div className="col-span-10 md:col-span-5 flex items-start gap-3 sm:gap-4">
                  <Icon
                    size={20}
                    strokeWidth={1.4}
                    className="mt-[2px] text-[#C9A84C] shrink-0 sm:size-[22px]"
                  />
                  <h3 className="font-display text-[18px] sm:text-[20px] md:text-[26px] font-semibold tracking-[-0.01em] leading-[1.2]">
                    {s.title}
                  </h3>
                </div>

                <div className="col-span-12 md:col-span-5 md:col-start-7 md:flex md:items-start md:justify-between gap-6">
                  <p className="text-[14px] md:text-[15px] leading-[1.65] text-[#a0a0a0] max-w-[48ch]">
                    {s.body}
                  </p>
                </div>

                <div className="col-span-12 md:col-span-1 flex md:justify-end items-start mt-1 md:mt-0">
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.4}
                    className="text-[#666] group-hover:text-[#C9A84C] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                  />
                </div>

                <div className="col-span-12 md:col-span-11 md:col-start-2 flex flex-wrap gap-x-4 sm:gap-x-5 gap-y-2 mt-1">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] sm:text-[10.5px] tracking-[0.2em] text-[#666]"
                    >
                      · {t}
                    </span>
                  ))}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
