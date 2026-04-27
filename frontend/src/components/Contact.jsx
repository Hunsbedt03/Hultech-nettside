import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Mail, Phone, MapPin, ArrowUpRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      toast.error("Navn og melding er påkrevd.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        company: form.company.trim(),
        message: form.message.trim(),
      };
      if (form.email.trim()) payload.email = form.email.trim();

      await axios.post(`${API}/contact`, payload);
      setSent(true);
      toast.success("Melding sendt. Nicolas svarer direkte.");
      setForm({ name: "", company: "", email: "", message: "" });
    } catch (err) {
      const detail =
        err?.response?.data?.detail ||
        (Array.isArray(err?.response?.data?.detail)
          ? err.response.data.detail[0]?.msg
          : null) ||
        "Kunne ikke sende meldingen. Send e-post direkte til nicolas@hultech.no.";
      toast.error(typeof detail === "string" ? detail : "Kunne ikke sende meldingen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-20 md:py-32 border-t border-[#1f1f1f] overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 bp-grid bp-fade pointer-events-none opacity-70"
      />
      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="md:col-span-6"
          >
            <div className="overline mb-5">05 — Kontakt</div>
            <h2
              data-testid="contact-title"
              className="font-display text-[36px] sm:text-[44px] md:text-[64px] leading-[0.98] font-semibold tracking-[-0.02em]"
            >
              La oss snakke
              <br />
              ingeniørfag.
            </h2>
            <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#a0a0a0] mt-6 md:mt-7 max-w-[52ch]">
              Kom med din tekniske utfordring. Vi sier ærlig fra om vi kan
              løse den — og hvordan.
            </p>

            <div className="mt-10 md:mt-12 border-t border-[#1f1f1f]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-y-0 py-7 sm:py-8 sm:divide-x sm:divide-[#1f1f1f]">
                <div className="sm:pr-6">
                  <div className="font-mono text-[10.5px] tracking-[0.22em] text-[#666] mb-2">
                    DIREKTE KONTAKT
                  </div>
                  <div className="font-display text-[18px] font-semibold">
                    Nicolas
                  </div>
                  <div className="text-[13px] text-[#a0a0a0]">
                    Grunnlegger og daglig leder
                  </div>
                </div>
                <div className="sm:pl-6 space-y-3">
                  <a
                    href="mailto:nicolas@hultech.no"
                    data-testid="contact-email-link"
                    className="flex items-center gap-3 text-[14px] text-[#e5e5e5] hover:text-[#4A90D9] transition-colors break-all"
                  >
                    <Mail size={15} strokeWidth={1.4} className="shrink-0" />
                    nicolas@hultech.no
                  </a>
                  <a
                    href="tel:+4790658567"
                    data-testid="contact-phone-link"
                    className="flex items-center gap-3 text-[14px] text-[#e5e5e5] hover:text-[#4A90D9] transition-colors"
                  >
                    <Phone size={15} strokeWidth={1.4} className="shrink-0" />
                    +47 906 58 567
                  </a>
                  <div className="flex items-center gap-3 text-[14px] text-[#a0a0a0]">
                    <MapPin size={15} strokeWidth={1.4} className="shrink-0" />
                    Kristiansand, Norge
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="md:col-span-5 md:col-start-8"
          >
            <form
              data-testid="contact-form"
              onSubmit={onSubmit}
              className="border-t border-[#1f1f1f] pt-7 md:pt-8"
            >
              <div className="flex items-center justify-between mb-7 md:mb-8 gap-4">
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-[#666]">
                  PROSJEKTHENVENDELSE · SKJEMA
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-[#666]">
                  REV.A
                </span>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10.5px] tracking-[0.22em] text-[#666]">
                  NAVN *
                </label>
                <input
                  data-testid="contact-input-name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Ditt fulle navn"
                  className="hu-input"
                  required
                  maxLength={120}
                />
              </div>

              <div className="space-y-1 mt-6 md:mt-7">
                <label className="font-mono text-[10.5px] tracking-[0.22em] text-[#666]">
                  BEDRIFT
                </label>
                <input
                  data-testid="contact-input-company"
                  name="company"
                  value={form.company}
                  onChange={onChange}
                  placeholder="Organisasjon"
                  className="hu-input"
                  maxLength={200}
                />
              </div>

              <div className="space-y-1 mt-6 md:mt-7">
                <label className="font-mono text-[10.5px] tracking-[0.22em] text-[#666]">
                  E-POST
                </label>
                <input
                  data-testid="contact-input-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="navn@bedrift.no"
                  className="hu-input"
                />
              </div>

              <div className="space-y-1 mt-6 md:mt-7">
                <label className="font-mono text-[10.5px] tracking-[0.22em] text-[#666]">
                  MELDING *
                </label>
                <textarea
                  data-testid="contact-input-message"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={5}
                  placeholder="Kort beskrivelse av den tekniske utfordringen."
                  className="hu-input"
                  required
                  maxLength={5000}
                />
              </div>

              <div className="mt-8 md:mt-10 flex items-center justify-between gap-4 flex-wrap">
                <span className="font-mono text-[10px] sm:text-[10.5px] tracking-[0.22em] text-[#666]">
                  {sent ? "SENDT" : "KLAR TIL SENDING"}
                </span>
                <button
                  data-testid="contact-submit"
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      Sender
                      <Loader2 size={15} className="animate-spin" />
                    </>
                  ) : sent ? (
                    <>
                      Sendt
                      <Check size={16} strokeWidth={1.6} />
                    </>
                  ) : (
                    <>
                      Send melding
                      <ArrowUpRight size={16} strokeWidth={1.6} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
