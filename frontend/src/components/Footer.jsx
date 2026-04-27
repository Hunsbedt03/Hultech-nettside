import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-[#1f1f1f] bg-[#0a0a0a]"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-6 md:px-10 pt-16 md:pt-20 pb-8 md:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-12 md:pb-16 border-b border-[#1f1f1f]">
          <div className="md:col-span-7">
            <div className="font-display font-semibold tracking-[-0.04em] leading-[0.85] text-[72px] sm:text-[120px] md:text-[180px] lg:text-[220px]">
              <span className="text-[#f5f5f5]">Hul</span>
              <span className="text-[#4A90D9]">tech.</span>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col justify-end">
            <div className="overline mb-4">KONTAKT</div>
            <a
              href="mailto:nicolas@hultech.no"
              data-testid="footer-email"
              className="text-[15px] text-[#e5e5e5] hover:text-[#4A90D9] transition-colors break-all"
            >
              nicolas@hultech.no
            </a>
            <a
              href="tel:+4790658567"
              data-testid="footer-phone"
              className="text-[15px] text-[#e5e5e5] hover:text-[#4A90D9] transition-colors mt-1"
            >
              +47 906 58 567
            </a>
            <div className="text-[14px] text-[#a0a0a0] mt-3">
              Kristiansand, Norge
            </div>
          </div>
        </div>

        <div className="pt-7 md:pt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 items-start md:items-center font-mono text-[10px] sm:text-[11px] tracking-[0.18em] text-[#666] uppercase">
          <div>© {year} Hultech</div>
          <div className="md:text-center">
            Enkeltpersonforetak · Kristiansand · NO
          </div>
          <div className="md:text-right flex md:justify-end items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#4A90D9] inline-block" />
            Tar i mot prosjekter
          </div>
        </div>
      </div>
    </footer>
  );
}
