import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoUrl from "../logo.svg";

const links = [
  { href: "#services", label: "Tjenester", id: "tjenester" },
  { href: "#why", label: "Hvorfor Hultech", id: "hvorfor-hultech" },
  { href: "#about", label: "Om", id: "om" },
  { href: "#contact", label: "Kontakt", id: "kontakt" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      data-testid="site-nav"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#0f0f0f]/85 backdrop-blur-md border-b border-[#1f1f1f]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          data-testid="nav-logo"
          className="flex items-center gap-3 group"
        >
          <img
            src={logoUrl}
            alt="Hultech"
            width={120}
            className="h-auto w-[120px] block"
          />
          <span className="hidden md:inline font-mono text-[10px] text-[#666] uppercase tracking-[0.22em] pl-3 border-l border-[#1f1f1f]">
            Ingeniørfag · NO
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.id}`}
              className="text-[13px] text-[#a0a0a0] hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            data-testid="nav-cta"
            className="btn-primary !py-2.5 !px-4 text-[13px]"
          >
            Diskuter prosjektet ditt
          </a>
        </nav>

        <button
          data-testid="nav-menu-toggle"
          aria-label="Meny"
          className="md:hidden text-white p-2 -mr-2"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          data-testid="nav-mobile-menu"
          className="md:hidden border-t border-[#1f1f1f] bg-[#0f0f0f]"
        >
          <div className="px-5 sm:px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                data-testid={`nav-mobile-link-${l.id}`}
                className="text-[16px] text-[#e5e5e5]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              data-testid="nav-mobile-cta"
              className="btn-primary w-fit"
            >
              Diskuter prosjektet ditt
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
