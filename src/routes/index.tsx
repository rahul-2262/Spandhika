import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function Reveal({
  children,
  className = "",
  delay,
  stagger = false,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  as?: "div" | "ul" | "section";
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const Tag = as as "div";
  return (
    <Tag
      ref={ref as unknown as React.Ref<HTMLDivElement>}
      className={`${stagger ? "stagger" : "reveal"} ${inView ? "is-visible" : ""} ${className}`}
      style={delay != null ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}


import logoAsset from "@/assets/spandhika-logo.png.asset.json";
import heroFootAsset from "@/assets/hero-foot-pressure.png.asset.json";
const heroFoot = heroFootAsset.url;
import explodedInsole from "@/assets/exploded-insole.jpg";
import footPainImg from "@/assets/foot-pain.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden>
      {name}
    </span>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 label-caps text-on-surface-variant">
      <span className="h-px w-6 bg-tertiary-fixed-dim" />
      {children}
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#problem", label: "The problem" },
    { href: "#features", label: "Features" },
    { href: "#audience", label: "Who it's for" },
    { href: "#purpose", label: "Purpose" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/40">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20 flex items-center justify-between h-14 sm:h-20">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight text-primary" onClick={() => setOpen(false)}>
          <img src={logoAsset.url} alt="Spandhika Orthotics" className="h-9 sm:h-12 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-on-surface-variant">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#waitlist"
            className="hidden sm:inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
          >
            Join waitlist
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant text-primary"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      >
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" />
      </div>
      <aside
        className={`md:hidden fixed top-0 right-0 z-50 h-[100dvh] w-[82%] max-w-sm glass-strong border-l border-white/40 transform transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between h-14 px-4 border-b border-outline-variant">
          <img src={logoAsset.url} alt="Spandhika Orthotics" className="h-9 w-auto" />
          <button
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant text-primary"
            aria-label="Close menu"
          >
            <Icon name="close" />
          </button>
        </div>
        <nav className="px-5 py-6 flex flex-col">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-4 text-lg font-medium text-on-surface border-b border-outline-variant/60 hover:text-primary transition-colors"
            >
              <span>{l.label}</span>
              <Icon name="arrow_forward" className="text-base text-on-surface-variant" />
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3.5 font-medium"
          >
            Join waitlist
            <Icon name="arrow_forward" className="text-base" />
          </a>
          <a
            href="mailto:spandhikaorthotics@gmail.com"
            className="mt-4 inline-flex items-center justify-center gap-2 text-sm text-on-surface-variant"
          >
            <Icon name="mail" className="text-sm" />
            spandhikaorthotics@gmail.com
          </a>
        </nav>
      </aside>
    </header>
  );
}

function FloatingCard({
  className,
  label,
  value,
  unit,
  sub,
  accent,
}: {
  className?: string;
  label: string;
  value: string;
  unit?: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`absolute rounded-2xl glass-strong p-3 sm:p-4 w-32 sm:w-44 ${className ?? ""}`}
    >
      <div className="flex items-center gap-2 label-caps text-on-surface-variant whitespace-nowrap text-[10px] sm:text-xs">
        <span className={`w-2 h-2 rounded-full shrink-0 ${accent ? "bg-tertiary-fixed-dim pressure-pulse" : "bg-primary"}`} />
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-lg sm:text-2xl font-semibold text-primary">{value}</span>
        {unit && <span className="text-xs text-on-surface-variant">{unit}</span>}
      </div>
      <div className="text-[11px] sm:text-xs text-on-surface-variant mt-1">{sub}</div>
    </div>
  );
}

const heroStats = [
  { value: "32", label: "Pressure zones" },
  { value: "24", label: "Gait variables" },
  { value: "94%", label: "Balance accuracy" },
  { value: "1M+", label: "Data points / day" },
];

function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="blob bg-tertiary-fixed-dim w-[460px] h-[460px] -top-32 -right-24" />
      <div className="blob bg-secondary-container w-[420px] h-[420px] top-40 -left-32" style={{ animationDelay: "2s" }} />
      <div className="blob bg-on-primary-container/40 w-[360px] h-[360px] bottom-0 left-1/3" style={{ animationDelay: "4s" }} />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20 pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-28 lg:pb-32 grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center relative">
        <div className="text-center lg:text-left order-2 lg:order-none">
          <div className="fade-up flex justify-center lg:justify-start" style={{ animationDelay: "60ms" }}>
            <Eyebrow>Smart orthotic insoles</Eyebrow>
          </div>
          <h1
            className="mt-4 sm:mt-6 text-[34px] sm:text-5xl lg:text-[64px] leading-[1.08] tracking-[-0.02em] font-bold text-primary fade-up"
            style={{ animationDelay: "120ms" }}
          >
            Better movement starts from{" "}
            <span className="text-gradient-primary">your feet.</span>
          </h1>
          <p
            className="mt-4 sm:mt-6 text-[15px] sm:text-lg text-on-surface-variant max-w-xl mx-auto lg:mx-0 leading-relaxed fade-up"
            style={{ animationDelay: "220ms" }}
          >
            Most people ignore foot problems until they affect posture, comfort, and daily life.
            Spandhika is a smart orthotic insole that listens to how you walk — and helps you move better.
          </p>

          <form
            id="waitlist"
            onSubmit={onSubmit}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0 fade-up"
            style={{ animationDelay: "320ms" }}
          >
            <label className="sr-only" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-full glass px-5 py-3.5 text-base placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-medium shadow-lg shadow-primary/20 hover:scale-[1.02] hover:shadow-primary/30 transition-all"
            >
              {submitted ? "You're in" : "Join Waitlist"}
              <Icon name={submitted ? "check" : "arrow_forward"} className="text-base" />
            </button>
          </form>

          <div
            className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-on-surface-variant fade-up"
            style={{ animationDelay: "400ms" }}
          >
            <a href="#features" className="inline-flex items-center gap-1 text-primary font-medium group">
              Learn more
              <Icon name="arrow_forward" className="text-base group-hover:translate-x-0.5 transition-transform" />
            </a>
            <span>No spam · Launching 2026</span>
          </div>

          {/* Trust analytics strip */}
          <div
            className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-xl mx-auto lg:mx-0 border-t border-outline-variant/60 pt-6 fade-up"
            style={{ animationDelay: "500ms" }}
          >
            {heroStats.map((s, i) => (
              <div
                key={s.label}
                className="fade-up text-center sm:text-left"
                style={{ animationDelay: `${560 + i * 80}ms` }}
              >
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-gradient-primary">{s.value}</div>
                <div className="mt-1 label-caps text-on-surface-variant text-[10px]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="relative h-[340px] sm:h-[520px] lg:h-[600px] order-1 lg:order-none mx-auto w-full max-w-[440px] sm:max-w-none fade-up"
          style={{ animationDelay: "180ms" }}
        >
          {/* Ambient glow ring */}
          <div className="absolute inset-6 rounded-full bg-tertiary-fixed/20 blur-3xl pointer-events-none" />

          <div className="absolute inset-0 rounded-[2.25rem] overflow-hidden glass-strong">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-secondary-container/40 to-tertiary-fixed/30" />
            <img
              src={heroFoot}
              alt="Foot pressure heatmap with live readings"
              width={1024}
              height={1024}
              className="relative w-full h-full object-contain object-center p-4 sm:p-6 drop-shadow-2xl float-slow"
            />

            {/* Subtle grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Scan line sweep */}
            <div
              className="absolute left-0 right-0 h-24 -top-24 scan-sweep pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--primary) 22%, transparent), transparent)",
              }}
            />
          </div>

          {/* Pulsing sensor dots */}
          <div className="absolute top-[42%] left-[34%] pointer-events-none">
            <span className="block w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_18px_var(--primary)]" />
            <span className="absolute inset-0 rounded-full bg-primary/50 ring-pulse" />
          </div>
          <div className="absolute top-[70%] left-[60%] pointer-events-none">
            <span className="block w-2 h-2 rounded-full bg-tertiary-fixed-dim shadow-[0_0_14px_var(--tertiary-fixed)]" />
            <span className="absolute inset-0 rounded-full bg-tertiary-fixed/50 ring-pulse" style={{ animationDelay: "1.2s" }} />
          </div>

          <FloatingCard
            className="top-2 right-2 sm:top-6 sm:-right-3 lg:-right-6 float-slow"
            label="Live Pressure"
            value="38.2"
            unit="kPa"
            sub="Heel · Right"
            accent
          />
          <FloatingCard
            className="bottom-2 left-2 sm:bottom-8 sm:-left-6 lg:-left-10 float-slow-rev"
            label="Gait Balance"
            value="94%"
            sub="Symmetry score"
          />

        </div>
      </div>
    </section>
  );
}


const signs = [
  {
    icon: "accessible_forward",
    title: "Heel pain after waking up",
    body: "That first painful step in the morning is often plantar fasciitis — and it doesn't fix itself.",
  },
  {
    icon: "schedule",
    title: "Foot fatigue after long hours",
    body: "Burning, aching, heavy feet after work or a long day on your feet is a signal — not normal.",
  },
  {
    icon: "swap_horiz",
    title: "Uneven shoe wear",
    body: "If one shoe wears down faster, your weight distribution is off — and your body is compensating.",
  },
  {
    icon: "airline_seat_legroom_reduced",
    title: "Knee or lower back discomfort",
    body: "Pain that feels unrelated often starts at the ground. Your feet are the foundation of every step.",
  },
];

function Problem() {
  return (
    <section id="problem" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="blob bg-secondary-container w-[420px] h-[420px] -top-32 -left-24 opacity-60" />
      <div className="blob bg-tertiary-fixed-dim w-[360px] h-[360px] bottom-0 -right-24 opacity-40" style={{ animationDelay: "3s" }} />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20 relative">
        <div className="max-w-2xl">
          <Eyebrow>The signs</Eyebrow>
          <h2 className="mt-4 text-[28px] sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary">
            You might be ignoring{" "}
            <span className="text-gradient-primary">the signs.</span>
          </h2>
          <p className="mt-5 text-on-surface-variant text-[15px] sm:text-lg leading-relaxed">
            Small discomforts are usually the first chapter of a bigger story. Here's what your feet might be trying to tell you.
          </p>
        </div>

        <Reveal stagger className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {signs.map((s, i) => (
            <div
              key={s.title}
              className="group relative rounded-3xl p-5 sm:p-7 bg-surface/70 backdrop-blur border border-outline-variant/60 hover-lift hover:shadow-2xl hover:border-primary/30 transition-all overflow-hidden"
            >
              {/* Index ribbon */}
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 label-caps text-on-surface-variant/60 text-[10px] tracking-[0.2em]">
                0{i + 1}
              </div>

              {/* Hover glow */}
              <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(60% 60% at 50% 0%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)",
                }}
              />

              {/* Icon */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-secondary-container to-tertiary-fixed/40 text-primary flex items-center justify-center shadow-inner shadow-white/40 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-lg group-hover:shadow-primary/20">
                <Icon name={s.icon} className="text-2xl sm:text-3xl" />
                <span className="absolute inset-0 rounded-2xl ring-1 ring-primary/10" />
              </div>

              <h3 className="relative mt-5 sm:mt-6 text-base sm:text-xl font-semibold text-primary leading-snug">
                {s.title}
              </h3>
              <p className="relative mt-2 sm:mt-2.5 text-sm sm:text-base text-on-surface-variant leading-relaxed">
                {s.body}
              </p>

              {/* Bottom accent line that grows on hover */}
              <div className="relative mt-5 h-px bg-outline-variant/60 overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-primary to-tertiary-fixed-dim group-hover:w-full transition-[width] duration-700 ease-out" />
              </div>

              {/* Footer cue */}
              <div className="relative mt-4 flex items-center justify-between">
                <span className="label-caps text-[10px] text-on-surface-variant">Early signal</span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Icon name="arrow_outward" className="text-base group-hover:rotate-12 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </Reveal>

      </div>
    </section>
  );
}

const features = [
  {
    icon: "check_circle",
    title: "Pressure Mapping",
    body: "High-density sensor array captures dynamic load distribution.",
  },
  {
    icon: "directions_walk",
    title: "Real-Time Gait Analysis",
    body: "Monitor pronation, supination, and cadence instantly.",
  },
  {
    icon: "insights",
    title: "Preventive Insights",
    body: "Predictive algorithms alert you before strain becomes pain.",
  },
];

function Features() {
  return (
    <section id="features" className="py-14 sm:py-20 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="blob bg-tertiary-fixed w-[500px] h-[500px] -bottom-40 -right-40 opacity-20" />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20 relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 label-caps text-tertiary-fixed-dim">
              <span className="h-px w-6 bg-tertiary-fixed-dim" />
              Flagship innovation
            </div>
            <h2 className="mt-4 text-[32px] sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Meet SAARTHI<span className="text-tertiary-fixed-dim">™</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-[15px] sm:text-lg text-on-primary-container leading-relaxed">
            The world's most advanced smart insole system. SAARTHI™ doesn't just cushion your step; it understands it.
          </p>
        </div>

        {/* Exploded insole visual */}
        <div className="mt-10 lg:mt-16 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="absolute inset-0 -m-6 rounded-[2rem] bg-tertiary-fixed/10 blur-3xl" />
            <div className="relative rounded-[2rem] overflow-hidden bg-[#f4f1e6] border border-on-primary-container/20">
              <img
                src={explodedInsole}
                alt="Exploded view of the SAARTHI smart insole showing fabric cover, sensor array, foam, carbon arch plate, and base"
                width={1280}
                height={1024}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:flex absolute -bottom-4 -right-4 rounded-2xl glass-strong text-on-surface px-4 py-3 items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim pressure-pulse" />
              <div>
                <div className="label-caps text-on-surface-variant">Sensor array</div>
                <div className="text-sm font-semibold text-primary">32-channel · 200Hz</div>
              </div>
            </div>
          </div>
          <Reveal as="ul" stagger className="lg:col-span-6 space-y-4">
            {[
              { layer: "01", name: "Breathable top cover", desc: "Moisture-wicking, antimicrobial fabric." },
              { layer: "02", name: "Pressure sensor array", desc: "32 zones reading at 200 Hz across the foot." },
              { layer: "03", name: "Adaptive foam", desc: "Energy-return cushioning tuned to your gait." },
              { layer: "04", name: "Carbon arch plate", desc: "Lightweight stability where it matters most." },
              { layer: "05", name: "Anti-slip base", desc: "Fits inside the shoes you already own." },
            ].map((l) => (
              <li key={l.layer} className="flex items-start gap-4 rounded-2xl bg-primary-container/40 p-4 border border-on-primary-container/15 hover-lift hover:border-tertiary-fixed/40">
                <span className="label-caps text-tertiary-fixed-dim mt-1">{l.layer}</span>
                <div>
                  <div className="text-[15px] sm:text-lg font-semibold">{l.name}</div>
                  <div className="text-sm text-on-primary-container/90">{l.desc}</div>
                </div>
              </li>
            ))}
          </Reveal>

        </div>

        <Reveal stagger className="mt-14 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl glass-dark p-6 sm:p-7 text-primary-foreground hover-lift hover:brightness-110"
            >
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-primary flex items-center justify-center transition-transform group-hover:scale-110 group-hover:-rotate-3">
                <Icon name={f.icon} />
              </div>
              <h3 className="mt-5 text-lg sm:text-xl font-semibold">{f.title}</h3>

              <p className="mt-2 text-on-primary-container leading-relaxed">{f.body}</p>
            </div>
          ))}
        </Reveal>

      </div>
    </section>
  );
}

const orthotics = [
  { title: "Ball of Foot Pain", desc: "Targeted metatarsal support", icon: "radio_button_checked" },
  { title: "Bunions", desc: "Pressure relief and alignment", icon: "adjust" },
  { title: "Diabetic Foot", desc: "Maximum cushioning and care", icon: "favorite" },
  { title: "Fallen Arches", desc: "Firm medial arch elevation", icon: "show_chart" },
  { title: "Flat Feet", desc: "Structured stability control", icon: "horizontal_rule" },
  { title: "Heel Pain", desc: "Deep heel cup and shock absorption", icon: "vertical_align_bottom" },
];

function Range() {
  const [showAll, setShowAll] = useState(false);
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="blob bg-tertiary-fixed-dim w-[420px] h-[420px] -top-32 -right-24 opacity-40" />
      <div className="blob bg-secondary-container w-[360px] h-[360px] bottom-0 -left-24 opacity-50" style={{ animationDelay: "2.5s" }} />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20 relative">
        <Eyebrow>Problems we are solving</Eyebrow>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-[28px] sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary flex items-center gap-3">
            <Icon name="footprint" className="text-4xl text-tertiary-fixed-dim" />
            <span>Orthotics <span className="text-gradient-primary">Range.</span></span>
          </h2>
          <p className="max-w-md text-on-surface-variant text-[15px] sm:text-base">
            Condition-specific support engineered around six of the most common foot complaints.
          </p>
        </div>

        <Reveal stagger className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {orthotics.map((o, i) => (
            <div
              key={o.title}
              className={`group relative rounded-2xl p-6 sm:p-7 glass hover-lift hover:shadow-xl hover:border-primary/20 transition-all duration-500 ${
                !showAll && i >= 4 ? "hidden sm:block" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-secondary-container text-primary flex items-center justify-center transition-transform duration-500 group-hover:-rotate-6">
                  <Icon name={o.icon} className="text-2xl sm:text-3xl" />
                </div>
                <span className="label-caps text-[10px] text-on-surface-variant/70">0{i + 1}</span>
              </div>

              <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl font-semibold text-primary leading-snug tracking-tight">
                {o.title}
              </h3>
              <p className="mt-2 text-[14px] sm:text-[15px] text-on-surface-variant leading-relaxed">
                {o.desc}
              </p>
            </div>
          ))}
        </Reveal>

        {/* Mobile-only toggle */}
        <button
          onClick={() => setShowAll((v) => !v)}
          className="sm:hidden mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-card text-primary px-4 py-3 text-sm font-medium hover:bg-secondary-container transition"
        >
          {showAll ? "Show less" : `View all ${orthotics.length}`}
          <Icon name={showAll ? "expand_less" : "expand_more"} className="text-base" />
        </button>

      </div>
    </section>
  );
}


const audiences = [
  {
    icon: "work",
    title: "Working professionals",
    body: "Long hours on hard floors. End the day without dragging your feet.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: "directions_run",
    title: "Athletes",
    body: "Better load distribution. Better recovery. Better performance.",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: "healing",
    title: "People with foot pain",
    body: "Targeted support for plantar fasciitis, fatigue, and recurring discomfort.",
    image: footPainImg,
  },
  {
    icon: "groups",
    title: "People standing long hours",
    body: "Teachers, nurses, retail, hospitality — comfort that lasts the whole shift.",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=800&q=80",
  },
];

function Audience() {
  return (
    <section id="audience" className="py-14 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20">
        <Eyebrow>Applications</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-[26px] sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary">
          Designed for everyday movement.
        </h2>
        <p className="mt-5 max-w-2xl text-on-surface-variant text-[15px] sm:text-lg">
          Built for anyone whose day depends on their feet — which is to say, almost everyone.
        </p>
        <Reveal stagger className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {audiences.map((a) => (
            <div key={a.title} className="group rounded-2xl overflow-hidden glass hover-lift hover:shadow-xl flex flex-col">
              <div className="relative aspect-[4/3] sm:aspect-[5/4] overflow-hidden bg-primary-container">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-primary/10 to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-card/95 text-primary flex items-center justify-center shadow transition-transform group-hover:-rotate-6">
                  <Icon name={a.icon} className="text-lg sm:text-xl" />
                </div>
              </div>
              <div className="p-4 sm:p-6 flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-primary leading-snug">{a.title}</h3>
                <p className="mt-1.5 sm:mt-2 text-sm text-on-surface-variant leading-relaxed">{a.body}</p>
              </div>
            </div>
          ))}
        </Reveal>

      </div>
    </section>
  );
}

const stats = [
  { value: "32", label: "Pressure zones" },
  { value: "24", label: "Gait variables" },
  { value: "100%", label: "Comfort-first" },
];

const pillars = [
  { icon: "science", title: "Rooted in biomechanics", body: "Decades of foot-and-gait research, distilled into something you can wear." },
  { icon: "favorite", title: "Comfort-first design", body: "If it doesn't feel right, it isn't right. Every choice starts with comfort." },
  { icon: "lock", title: "Privacy by design", body: "Your movement data is yours. We use it to help, never to sell." },
];

function Trust() {
  return (
    <section className="py-14 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20">
        <Eyebrow>Why trust Spandhika</Eyebrow>
        <h2 className="mt-4 max-w-3xl text-[26px] sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary">
          Built with research. Designed for real life.
        </h2>
        <p className="mt-5 max-w-3xl text-on-surface-variant text-[15px] sm:text-lg">
          Inspired by biomechanics and shaped by real-world movement challenges. We're combining what scientists know about gait with what people actually feel at the end of a long day.
        </p>

        <Reveal stagger className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8 border-y border-outline-variant py-8 sm:py-10">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group rounded-2xl p-3 sm:p-5 transition-all duration-500 hover-lift"
            >
              <div className="text-[28px] sm:text-5xl lg:text-6xl font-bold tracking-tight text-gradient-primary">
                {s.value}
              </div>
              <div className="mt-2 label-caps text-on-surface-variant">
                {s.label}
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal stagger className="mt-8 sm:mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl p-6 sm:p-7 glass hover-lift hover:shadow-xl hover:border-primary/20 transition-all duration-500"
            >
              <Icon name={p.icon} className="text-3xl text-primary transition-transform duration-500 group-hover:-rotate-6" />
              <h3 className="mt-4 text-lg sm:text-xl font-semibold text-primary">{p.title}</h3>
              <p className="mt-2 text-on-surface-variant leading-relaxed">{p.body}</p>
            </div>
          ))}
        </Reveal>


        <blockquote className="mt-12 sm:mt-16 max-w-4xl">
          <p className="text-[20px] sm:text-3xl lg:text-4xl font-medium text-primary leading-snug tracking-tight">
            "We started Spandhika because the most invisible part of our body — the soles of our feet — quietly shapes everything above them."
          </p>
          <footer className="mt-4 text-on-surface-variant label-caps">— The Spandhika team</footer>
        </blockquote>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitted, setSubmitted] = useState<(typeof formData & { ref: string; date: string }) | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const ref = `SPD-${Date.now().toString(36).toUpperCase()}`;
    const date = new Date().toLocaleString();
    setSubmitted({ ...formData, ref, date });
    setSent(true);
  }

  function downloadReceipt() {
    if (!submitted) return;
    const lines = [
      "SPANDHIKA ORTHOTICS — MESSAGE RECEIPT",
      "=======================================",
      "",
      `Reference: ${submitted.ref}`,
      `Date:      ${submitted.date}`,
      "",
      "FROM",
      "----",
      `Name:  ${submitted.name}`,
      `Email: ${submitted.email}`,
      "",
      "SUBJECT",
      "-------",
      submitted.subject,
      "",
      "MESSAGE",
      "-------",
      submitted.message,
      "",
      "---",
      "Thank you for reaching out. We'll respond to the email above shortly.",
      "spandhikaorthotics@gmail.com",
    ].join("\n");
    const blob = new Blob([lines], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `spandhika-receipt-${submitted.ref}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function resetForm() {
    setSent(false);
    setSubmitted(null);
    setFormData({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <section id="contact" className="py-14 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20">
        <Eyebrow>Get in touch</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-[26px] sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary">
          We'd love to hear from you.
        </h2>
        <p className="mt-5 max-w-2xl text-on-surface-variant text-[15px] sm:text-lg">
          Whether you have questions about SAARTHI, want to partner with us, or just want to say hello — drop us a message.
        </p>

        <div className="mt-10 lg:mt-16 grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact info + Map */}
          <Reveal className="space-y-6">
            <div className="rounded-2xl overflow-hidden h-64 sm:h-80 glass-strong border border-outline-variant">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.1%2C28.5%2C77.3%2C28.7&layer=mapnik"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(30%) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Spandhika location map"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl glass p-5 sm:p-6 hover-lift">
                <div className="w-10 h-10 rounded-xl bg-secondary-container text-primary flex items-center justify-center">
                  <Icon name="mail" />
                </div>
                <div className="mt-3 label-caps text-on-surface-variant">Email</div>
                <a href="mailto:spandhikaorthotics@gmail.com" className="mt-1 text-primary font-medium hover:opacity-80 break-all">
                  spandhikaorthotics@gmail.com
                </a>
              </div>
              <div className="rounded-2xl glass p-5 sm:p-6 hover-lift">
                <div className="w-10 h-10 rounded-xl bg-secondary-container text-primary flex items-center justify-center">
                  <Icon name="chat" />
                </div>
                <div className="mt-3 label-caps text-on-surface-variant">Social</div>
                <a href="https://www.linkedin.com/company/spandhika-orthotics" target="_blank" rel="noopener noreferrer" className="mt-1 text-primary font-medium hover:opacity-80">
                  LinkedIn
                </a>
              </div>
            </div>
          </Reveal>

          {/* Message form */}
          <Reveal delay={120} className="rounded-2xl glass-strong p-6 sm:p-8 border border-outline-variant">
            {sent && submitted ? (
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-tertiary-fixed/20 flex items-center justify-center shrink-0">
                    <Icon name="check_circle" className="text-3xl text-tertiary-fixed-dim" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary">Message sent!</h3>
                    <p className="text-sm text-on-surface-variant">We'll get back to you shortly.</p>
                  </div>
                </div>

                <dl className="mt-6 rounded-xl glass p-5 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="label-caps text-on-surface-variant">Reference</dt>
                    <dd className="font-mono text-primary">{submitted.ref}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="label-caps text-on-surface-variant">Date</dt>
                    <dd className="text-primary">{submitted.date}</dd>
                  </div>
                  <div className="h-px bg-outline-variant" />
                  <div>
                    <dt className="label-caps text-on-surface-variant">Name</dt>
                    <dd className="mt-1 text-primary">{submitted.name}</dd>
                  </div>
                  <div>
                    <dt className="label-caps text-on-surface-variant">Email</dt>
                    <dd className="mt-1 text-primary break-all">{submitted.email}</dd>
                  </div>
                  <div>
                    <dt className="label-caps text-on-surface-variant">Subject</dt>
                    <dd className="mt-1 text-primary">{submitted.subject}</dd>
                  </div>
                  <div>
                    <dt className="label-caps text-on-surface-variant">Message</dt>
                    <dd className="mt-1 text-primary whitespace-pre-wrap">{submitted.message}</dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={downloadReceipt}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:opacity-90 transition"
                  >
                    <Icon name="download" className="text-base" />
                    Download receipt
                  </button>
                  <button
                    onClick={resetForm}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full glass border border-outline-variant text-primary px-5 py-3 text-sm font-medium hover:bg-secondary-container/50 transition"
                  >
                    Send another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <h3 className="text-lg sm:text-xl font-semibold text-primary">Send us a message</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="label-caps text-on-surface-variant mb-2 block">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl glass px-4 py-3 text-base placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="label-caps text-on-surface-variant mb-2 block">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl glass px-4 py-3 text-base placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="label-caps text-on-surface-variant mb-2 block">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-xl glass px-4 py-3 text-base placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="label-caps text-on-surface-variant mb-2 block">Message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl glass px-4 py-3 text-base placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-medium shadow-lg shadow-primary/20 hover:scale-[1.01] hover:shadow-primary/30 transition-all"
                >
                  Send message
                  <Icon name="send" className="text-base" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Purpose() {
  return (
    <section id="purpose" className="py-14 sm:py-20 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="blob bg-tertiary-fixed w-[600px] h-[600px] -top-60 left-1/2 -translate-x-1/2 opacity-20" />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20 relative text-center">
        <div className="inline-flex items-center gap-2 label-caps text-tertiary-fixed-dim justify-center">
          <span className="h-px w-6 bg-tertiary-fixed-dim" />
          Brand purpose
        </div>
        <h2 className="mt-4 text-[28px] sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto">
          We're not just building insoles.
        </h2>
        <p className="mt-6 text-[15px] sm:text-lg text-on-primary-container max-w-2xl mx-auto leading-relaxed">
          We're building confidence, comfort, and better movement for everyday life — quietly, underfoot, for the people who carry the world on theirs.
        </p>
        <a
          href="#waitlist"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-tertiary-fixed text-primary px-6 py-3.5 font-medium hover:bg-tertiary-fixed-dim transition"
        >
          Join the waitlist
          <Icon name="arrow_forward" className="text-base" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="glass border-t border-white/40">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20 py-12 sm:py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 font-semibold text-primary">
            <img src={logoAsset.url} alt="Spandhika Orthotics" className="h-14 sm:h-16 w-auto" />
          </div>
          <p className="mt-4 text-on-surface-variant max-w-sm leading-relaxed">
            Smart orthotic insoles designed for better movement, posture, and everyday comfort.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 label-caps text-on-surface-variant">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim pressure-pulse" />
            Launching soon
          </span>
        </div>
        <div>
          <div className="label-caps text-on-surface-variant">Contact</div>
          <a
            href="mailto:spandhikaorthotics@gmail.com"
            className="mt-3 inline-flex items-center gap-2 text-primary hover:opacity-80 group break-all"
          >
            <Icon name="mail" className="text-base group-hover:scale-110 transition" />
            spandhikaorthotics@gmail.com
          </a>
          <div className="mt-4">
            <a href="https://www.linkedin.com/company/spandhika-orthotics" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary">LinkedIn</a>
          </div>
          <p className="mt-4 text-sm text-on-surface-variant">For press, partnerships, and early access.</p>
        </div>
        <div className="md:text-right">
          <div className="label-caps text-on-surface-variant">Legal</div>
          <div className="mt-3 flex md:justify-end gap-4 text-on-surface-variant">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
          </div>
        </div>
      </div>
      <div className="border-t border-outline-variant">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20 py-6 text-sm text-on-surface-variant">
          © 2026 Spandhika. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Features />
        <Range />
        <Audience />
        <Trust />
        <Contact />
        <Purpose />
      </main>
      <Footer />
    </div>
  );
}
