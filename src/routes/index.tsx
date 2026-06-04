import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

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
      ref={ref as React.Ref<HTMLDivElement>}
      className={`${stagger ? "stagger" : "reveal"} ${inView ? "is-visible" : ""} ${className}`}
      style={delay != null ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}


import logoAsset from "@/assets/spandhika-logo.png.asset.json";
import heroFootAsset from "@/assets/hero-foot-heatmap.png.asset.json";
const heroFoot = heroFootAsset.url;
import explodedInsole from "@/assets/exploded-insole.jpg";

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

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20 pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-28 lg:pb-32 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center relative">
        <div>
          <div className="fade-up" style={{ animationDelay: "60ms" }}>
            <Eyebrow>Smart orthotic insoles</Eyebrow>
          </div>
          <h1
            className="mt-5 sm:mt-6 text-[30px] sm:text-5xl lg:text-[64px] leading-[1.05] tracking-[-0.02em] font-bold text-primary fade-up"
            style={{ animationDelay: "120ms" }}
          >
            Better movement starts from{" "}
            <span className="text-gradient-primary">your feet.</span>
          </h1>
          <p
            className="mt-5 sm:mt-6 text-[15px] sm:text-lg text-on-surface-variant max-w-xl leading-relaxed fade-up"
            style={{ animationDelay: "220ms" }}
          >
            Most people ignore foot problems until they affect posture, comfort, and daily life.
            Spandhika is a smart orthotic insole that listens to how you walk — and helps you move better.
          </p>

          <form
            id="waitlist"
            onSubmit={onSubmit}
            className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 max-w-lg fade-up"
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
            className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-on-surface-variant fade-up"
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
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-xl border-t border-outline-variant/60 pt-6 fade-up"
            style={{ animationDelay: "500ms" }}
          >
            {heroStats.map((s, i) => (
              <div
                key={s.label}
                className="fade-up"
                style={{ animationDelay: `${560 + i * 80}ms` }}
              >
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-gradient-primary">{s.value}</div>
                <div className="mt-1 label-caps text-on-surface-variant text-[10px]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="relative h-[220px] sm:h-[480px] lg:h-[580px] order-2 lg:order-none mx-1 sm:mx-0 fade-up"
          style={{ animationDelay: "180ms" }}
        >
          {/* Ambient glow ring */}
          <div className="absolute inset-6 rounded-full bg-tertiary-fixed/20 blur-3xl pointer-events-none" />

          <div className="absolute inset-0 rounded-[2.25rem] overflow-hidden glass-strong">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-primary" />
            <img
              src={heroFoot}
              alt="Foot pressure heatmap visualization"
              width={1024}
              height={1280}
              className="relative w-full h-full object-contain object-center scale-[1.05] sm:scale-100 drop-shadow-2xl"
            />

            {/* Subtle grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Scan line sweep */}
            <div
              className="absolute left-0 right-0 h-24 -top-24 scan-sweep pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--tertiary-fixed) 35%, transparent), transparent)",
              }}
            />

            {/* Top gradient veil */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Pulsing sensor dots */}
          <div className="absolute top-[38%] left-[38%] pointer-events-none">
            <span className="block w-2.5 h-2.5 rounded-full bg-tertiary-fixed shadow-[0_0_18px_var(--tertiary-fixed)]" />
            <span className="absolute inset-0 rounded-full bg-tertiary-fixed/60 ring-pulse" />
          </div>
          <div className="absolute top-[64%] left-[58%] pointer-events-none">
            <span className="block w-2 h-2 rounded-full bg-tertiary-fixed-dim shadow-[0_0_14px_var(--tertiary-fixed)]" />
            <span className="absolute inset-0 rounded-full bg-tertiary-fixed/50 ring-pulse" style={{ animationDelay: "1.2s" }} />
          </div>

          <FloatingCard
            className="top-4 left-2 sm:top-8 sm:-left-3 lg:-left-10 float-slow"
            label="Live Pressure"
            value="38.2"
            unit="kPa"
            sub="Heel · Right"
            accent
          />
          <FloatingCard
            className="bottom-4 right-2 sm:bottom-8 sm:-right-3 lg:-right-6 float-slow-rev"
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
    <section id="problem" className="py-14 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20">
        <Eyebrow>The signs</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-[26px] sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary">
          You might be ignoring the signs.
        </h2>
        <p className="mt-5 max-w-2xl text-on-surface-variant text-[15px] sm:text-lg">
          Small discomforts are usually the first chapter of a bigger story. Here's what your feet might be trying to tell you.
        </p>
        <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-3 sm:gap-5">
          {signs.map((s) => (
            <div
              key={s.title}
              className="group rounded-2xl glass p-4 sm:p-7 hover:shadow-xl transition-all"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary-container text-primary flex items-center justify-center">
                <Icon name={s.icon} className="text-xl sm:text-2xl" />
              </div>
              <h3 className="mt-3 sm:mt-5 text-sm sm:text-xl font-semibold text-primary leading-snug">{s.title}</h3>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-on-surface-variant leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
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
          <ul className="lg:col-span-6 space-y-4">
            {[
              { layer: "01", name: "Breathable top cover", desc: "Moisture-wicking, antimicrobial fabric." },
              { layer: "02", name: "Pressure sensor array", desc: "32 zones reading at 200 Hz across the foot." },
              { layer: "03", name: "Adaptive foam", desc: "Energy-return cushioning tuned to your gait." },
              { layer: "04", name: "Carbon arch plate", desc: "Lightweight stability where it matters most." },
              { layer: "05", name: "Anti-slip base", desc: "Fits inside the shoes you already own." },
            ].map((l) => (
              <li key={l.layer} className="flex items-start gap-4 rounded-2xl bg-primary-container/40 p-4 border border-on-primary-container/15">
                <span className="label-caps text-tertiary-fixed-dim mt-1">{l.layer}</span>
                <div>
                  <div className="text-[15px] sm:text-lg font-semibold">{l.name}</div>
                  <div className="text-sm text-on-primary-container/90">{l.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl glass-dark p-6 sm:p-7 text-primary-foreground hover:brightness-110 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-primary flex items-center justify-center">
                <Icon name={f.icon} />
              </div>
              <h3 className="mt-5 text-lg sm:text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-on-primary-container leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
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
    <section className="py-14 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20">
        <Eyebrow>Problems we are solving</Eyebrow>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-[26px] sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary flex items-center gap-3">
            <Icon name="footprint" className="text-4xl text-tertiary-fixed-dim" />
            Orthotics Range
          </h2>
        </div>
        <div className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {/* On mobile: 4 items + toggle. On sm+: show all */}
          {orthotics.map((o, i) => (
            <div
              key={o.title}
              className={`group rounded-2xl glass p-4 sm:p-7 hover:shadow-xl transition-all ${
                !showAll && i >= 4 ? "hidden sm:block" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-primary-container text-tertiary-fixed flex items-center justify-center shadow-md">
                  <Icon name={o.icon} className="text-xl sm:text-3xl" />
                </div>
                <Icon name="arrow_outward" className="text-primary opacity-0 group-hover:opacity-100 transition text-base sm:text-xl mt-1" />
              </div>
              <h3 className="mt-3 sm:mt-5 text-sm sm:text-xl font-semibold text-primary leading-snug">{o.title}</h3>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-on-surface-variant leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>
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
    image: "https://images.unsplash.com/photo-1559757175-7cb056fba93d?auto=format&fit=crop&w=800&q=80",
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
        <div className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {audiences.map((a) => (
            <div key={a.title} className="rounded-2xl overflow-hidden glass hover:shadow-xl transition flex flex-col">
              <div className="relative h-24 sm:h-44 overflow-hidden bg-primary-container">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary/10 to-transparent" />
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-card/95 text-primary flex items-center justify-center shadow">
                  <Icon name={a.icon} className="text-base sm:text-xl" />
                </div>
              </div>
              <div className="p-3 sm:p-6 flex-1">
                <h3 className="text-sm sm:text-lg font-semibold text-primary leading-snug">{a.title}</h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{a.body}</p>
              </div>
            </div>
          ))}
        </div>
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

        <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8 border-y border-outline-variant py-8 sm:py-10">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-[28px] sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary">{s.value}</div>
              <div className="mt-2 label-caps text-on-surface-variant">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl p-6 sm:p-7 glass">
              <Icon name={p.icon} className="text-3xl text-primary" />
              <h3 className="mt-4 text-lg sm:text-xl font-semibold text-primary">{p.title}</h3>
              <p className="mt-2 text-on-surface-variant leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

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
        <Purpose />
      </main>
      <Footer />
    </div>
  );
}
