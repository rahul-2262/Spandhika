import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";

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
import insoleAsset from "@/assets/insole.png.asset.json";
const explodedInsole = insoleAsset.url;
import footPainImg from "@/assets/foot-pain.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spandhika — Smart Orthotic Insoles for Better Movement" },
      { name: "description", content: "SAARTHI by Spandhika is a smart orthotic insole that maps pressure, detects gait issues, and helps improve posture, comfort, and everyday movement." },
      { property: "og:title", content: "Spandhika — Smart Orthotic Insoles for Better Movement" },
      { property: "og:description", content: "SAARTHI maps pressure, detects gait issues, and helps you move better — every step." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://spandhikaorthotics.in/" },
      { property: "og:image", content: "https://spandhikaorthotics.in/og-spandhika.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Spandhika SAARTHI smart orthotic insole" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Spandhika — Smart Orthotic Insoles for Better Movement" },
      { name: "twitter:description", content: "SAARTHI maps pressure, detects gait issues, and helps you move better — every step." },
      { name: "twitter:image", content: "https://spandhikaorthotics.in/og-spandhika.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://spandhikaorthotics.in/" },
    ],
  }),
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
    { href: "#saarthi", label: "Features" },
    { href: "#audience", label: "Who it's for" },
    { href: "#purpose", label: "Our Story" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 glass-strong border-b border-white/40 backdrop-blur-xl">
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
            className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-medium hover:opacity-90 transition"
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

// Researched foot-health facts & quotes (APMA, NIH, WHO, Mayo, Cleveland Clinic, J. Foot & Ankle Research)
const footFacts: { text: string; source: string }[] = [
  { text: "The average person takes 8,000–10,000 steps a day — roughly 115,000 miles in a lifetime, or 4 times around the Earth.", source: "APMA" },
  { text: "Each foot has 26 bones, 33 joints, and over 100 muscles, tendons and ligaments — a quarter of all the bones in your body are in your feet.", source: "NIH" },
  { text: "Around 75% of people experience foot pain at some point in their lives, yet most ignore it until it affects posture and mobility.", source: "APMA" },
  { text: "Plantar fasciitis affects nearly 1 in 10 adults and is the most common cause of heel pain worldwide.", source: "J. Foot & Ankle Research" },
  { text: "Flat feet and high arches can silently misalign the knees, hips and lower back — foot mechanics influence the entire kinetic chain.", source: "Harvard Health" },
  { text: "Diabetic foot complications cause a lower-limb amputation somewhere in the world every 30 seconds.", source: "WHO" },
  { text: "Walking 30 minutes a day can reduce the risk of heart disease, diabetes and stroke — but only if your gait is balanced.", source: "WHO" },
  { text: "Wearing the wrong shoes is linked to over 60% of chronic foot problems in adults.", source: "APMA" },
  { text: "Your feet sweat up to half a pint of moisture every day — ventilation and the right insole really do matter.", source: "Cleveland Clinic" },
  { text: "“When your feet hurt, you hurt all over.” — Socrates", source: "Quote" },
  { text: "Poor posture often starts at the feet — uneven pressure distribution can cause back pain you'd never connect to your stride.", source: "Mayo Clinic" },
  { text: "Children's feet grow rapidly until age 12 — ill-fitting shoes during these years can shape lifelong foot problems.", source: "Pediatric Orthopaedics" },
];

function FootFactBanner() {
  const [fact, setFact] = useState<{ text: string; source: string } | null>(null);
  useEffect(() => {
    setFact(footFacts[Math.floor(Math.random() * footFacts.length)]);
  }, []);
  if (!fact) return <div className="h-10 sm:h-11" aria-hidden />;
  return (
    <div className="relative z-10 border-b border-outline-variant/50 bg-secondary-container/40 backdrop-blur-sm">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20 py-2.5 sm:py-3 flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 label-caps text-[10px] text-primary shrink-0">
          <Icon name="lightbulb" className="text-sm" />
          <span className="hidden sm:inline">Did you know</span>
        </span>
        <p key={fact.text} className="fade-up text-xs sm:text-sm text-on-surface-variant leading-snug flex-1">
          <span>{fact.text}</span>
          <span className="ml-2 text-on-surface-variant/60">— {fact.source}</span>
        </p>
      </div>
    </div>
  );
}


const emailSchema = z.string().trim().email("Enter a valid email").max(255);
const nameSchema = z.string().trim().max(80).optional();
const painOptions = [
  "Heel / arch pain",
  "Knee or back pain",
  "Diabetic foot care",
  "Sports & performance",
  "Just exploring",
] as const;

function Hero() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pain, setPain] = useState<string>("");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState<string | null>(null);

  function onSubmitEmail(e: FormEvent) {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setError(null);
    setStep(2);
  }
  function onSubmitDetails(e: FormEvent) {
    e.preventDefault();
    const parsed = nameSchema.safeParse(name);
    if (!parsed.success) {
      setError("Name too long");
      return;
    }
    setError(null);
    setStep(3);
  }

  return (
    <section id="top" className="relative overflow-hidden">
      <FootFactBanner />
      <div className="blob bg-tertiary-fixed-dim w-[460px] h-[460px] -top-32 -right-24" />
      <div className="blob bg-secondary-container w-[420px] h-[420px] top-40 -left-32" style={{ animationDelay: "2s" }} />
      <div className="blob bg-on-primary-container/40 w-[360px] h-[360px] bottom-0 left-1/3" style={{ animationDelay: "4s" }} />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20 pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-28 lg:pb-32 grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center relative">
        <div className="text-center lg:text-left order-2 lg:order-none">
          <div className="fade-up flex justify-center lg:justify-start" style={{ animationDelay: "60ms" }}>
            <Eyebrow>Premium smart insole · Made in India</Eyebrow>
          </div>
          <h1
            className="mt-4 sm:mt-6 text-[32px] sm:text-5xl lg:text-[60px] leading-[1.06] tracking-[-0.02em] font-bold text-primary fade-up"
            style={{ animationDelay: "120ms" }}
          >
            Meet <span className="text-gradient-primary">SAARTHI™</span> — the smart insole that reads your every step.
          </h1>
          <p
            className="mt-4 sm:mt-6 text-[15px] sm:text-lg text-on-surface-variant max-w-xl mx-auto lg:mx-0 leading-relaxed fade-up"
            style={{ animationDelay: "220ms" }}
          >
            Real-time pressure mapping, gait analytics, and condition-specific support — engineered in
            biomechanics, designed for everyday Indian feet.
          </p>

          {/* Mobile-first waitlist form */}
          <div
            id="waitlist"
            className="mt-6 sm:mt-8 max-w-lg mx-auto lg:mx-0 fade-up"
            style={{ animationDelay: "320ms" }}
          >
            {step === 1 && (
              <form onSubmit={onSubmitEmail} className="flex flex-col sm:flex-row gap-3" noValidate>
                <label className="sr-only" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 rounded-full glass px-5 py-3.5 text-base placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] hover:shadow-primary/30 transition-all whitespace-nowrap"
                >
                  Get Early Access
                  <Icon name="arrow_forward" className="text-base" />
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={onSubmitDetails} className="rounded-3xl glass p-4 sm:p-5 space-y-3 text-left" noValidate>
                <div className="text-sm text-on-surface-variant">
                  One quick step so we can tailor your early access.
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  autoComplete="name"
                  maxLength={80}
                  className="w-full rounded-full glass px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <div>
                  <div className="label-caps text-on-surface-variant mb-2">What brings you here?</div>
                  <div className="flex flex-wrap gap-2">
                    {painOptions.map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setPain(p)}
                        className={`rounded-full border px-3 py-1.5 text-sm transition ${
                          pain === p
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-outline-variant hover:border-primary/40"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold"
                  >
                    Confirm my spot
                    <Icon name="arrow_forward" className="text-base" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="rounded-full px-4 py-3 text-sm text-on-surface-variant hover:text-primary"
                  >
                    Skip
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="rounded-3xl glass p-5 text-left flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                  <Icon name="check" />
                </div>
                <div>
                  <div className="font-semibold text-primary">You're on the early-access list.</div>
                  <div className="text-sm text-on-surface-variant mt-0.5">
                    We'll email <span className="font-medium text-on-surface">{email}</span> when pre-orders open in Q3 2026.
                  </div>
                </div>
              </div>
            )}

            {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
          </div>

          <div
            className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm text-on-surface-variant fade-up"
            style={{ animationDelay: "400ms" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Join 1,200+ early supporters
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="lock" className="text-base" />
              No spam · Pre-orders open Q3 2026
            </span>
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

            {/* Scan sweep — soft band */}
            <div
              className="absolute left-0 right-0 h-32 -top-32 scan-sweep pointer-events-none mix-blend-screen"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--tertiary-fixed) 28%, transparent) 45%, color-mix(in oklab, var(--tertiary-fixed) 38%, transparent) 50%, color-mix(in oklab, var(--tertiary-fixed) 28%, transparent) 55%, transparent 100%)",
              }}
            />
            {/* Scan sweep — leading bright line */}
            <div
              className="absolute left-0 right-0 -top-32 scan-sweep pointer-events-none"
              style={{
                height: "2px",
                background:
                  "linear-gradient(to right, transparent 0%, color-mix(in oklab, var(--tertiary-fixed) 90%, white) 30%, color-mix(in oklab, var(--tertiary-fixed) 95%, white) 70%, transparent 100%)",
                boxShadow: "0 0 14px color-mix(in oklab, var(--tertiary-fixed) 70%, transparent), 0 0 28px color-mix(in oklab, var(--tertiary-fixed) 40%, transparent)",
                animationDelay: "0.2s",
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

function SignCard({ sign, index }: { sign: (typeof signs)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`group relative rounded-3xl p-5 sm:p-7 bg-surface/70 backdrop-blur border border-outline-variant/60 hover:shadow-2xl hover:border-primary/30 transition-all overflow-hidden ${open ? "shadow-2xl border-primary/30" : ""}`}
    >
      <div className="absolute top-4 right-4 sm:top-5 sm:right-5 label-caps text-on-surface-variant/60 text-[10px] tracking-[0.2em]">
        0{index + 1}
      </div>
      <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(60% 60% at 50% 0%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%)" }}
      />
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-secondary-container to-tertiary-fixed/40 text-primary flex items-center justify-center shadow-inner shadow-white/40 transition-all duration-500 group-hover:-rotate-6">
        <Icon name={sign.icon} className="text-2xl sm:text-3xl" />
        <span className="absolute inset-0 rounded-2xl ring-1 ring-primary/10" />
      </div>
      <h3 className="relative mt-5 sm:mt-6 text-base sm:text-xl font-semibold text-primary leading-snug">{sign.title}</h3>
      <p className="relative mt-2 sm:mt-2.5 text-sm sm:text-base text-on-surface-variant leading-relaxed">{sign.body}</p>

      <div
        className="relative grid transition-all duration-500 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0, marginTop: open ? "1rem" : 0 }}
      >
        <div className="overflow-hidden">
          <div className="rounded-2xl bg-secondary-container/50 border border-outline-variant/40 p-4 text-sm text-on-surface-variant leading-relaxed space-y-3">
            <p>{sign.details}</p>
            <div>
              <div className="label-caps text-[10px] text-primary/70 mb-1.5">Common causes</div>
              <ul className="flex flex-wrap gap-1.5">
                {sign.causes.map((c) => (
                  <li key={c} className="inline-flex items-center text-[11px] rounded-full bg-card/80 border border-outline-variant/60 px-2.5 py-1 text-primary">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="label-caps text-[10px] text-primary/70 mb-1">How SAARTHI helps</div>
              <p className="text-[13px] text-on-surface">{sign.helps}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-5 h-px bg-outline-variant/60 overflow-hidden">
        <div className={`absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-tertiary-fixed-dim transition-[width] duration-700 ease-out ${open ? "w-full" : "w-0 group-hover:w-full"}`} />
      </div>

      <div className="relative mt-4 flex items-center justify-between">
        <span className="label-caps text-[10px] text-on-surface-variant">{open ? "Hide details" : "Early signal"}</span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Hide details" : "Show more details"}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <Icon name="expand_more" className={`text-base transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
    </div>
  );
}

function OrthoticCard({
  item,
  index,
  hidden,
}: {
  item: (typeof orthotics)[number];
  index: number;
  hidden: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`group relative rounded-2xl p-6 sm:p-7 glass hover:shadow-xl hover:border-primary/20 transition-all duration-500 ${open ? "shadow-xl border-primary/20" : ""} ${hidden ? "hidden sm:block" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-secondary-container text-primary flex items-center justify-center transition-transform duration-500 group-hover:-rotate-6">
          <Icon name={item.icon} className="text-2xl sm:text-3xl" />
        </div>
        <span className="label-caps text-[10px] text-on-surface-variant/70">0{index + 1}</span>
      </div>

      <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl font-semibold text-primary leading-snug tracking-tight">
        {item.title}
      </h3>
      <p className="mt-2 text-[14px] sm:text-[15px] text-on-surface-variant leading-relaxed">
        {item.desc}
      </p>

      <div
        className="grid transition-all duration-500 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0, marginTop: open ? "1.25rem" : 0 }}
      >
        <div className="overflow-hidden">
          <div className="rounded-xl bg-secondary-container/50 border border-outline-variant/40 p-4 text-sm text-on-surface-variant leading-relaxed space-y-3">
            <p>{item.details}</p>
            <div>
              <div className="label-caps text-[10px] text-primary/70 mb-1.5">Common causes</div>
              <ul className="flex flex-wrap gap-1.5">
                {item.causes.map((c) => (
                  <li key={c} className="inline-flex items-center text-[11px] rounded-full bg-card/80 border border-outline-variant/60 px-2.5 py-1 text-primary">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="label-caps text-[10px] text-primary/70 mb-1">Our solution</div>
              <p className="text-[13px] text-on-surface">{item.solution}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="label-caps text-[10px] text-on-surface-variant">
          {open ? "Hide details" : "Targeted support"}
        </span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Hide details" : "Show more details"}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <Icon name="expand_more" className={`text-base transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
    </div>
  );
}




import { signs } from "@/data/signs";




function Problem() {
  return (
    <section id="problem" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 lg:py-24 relative overflow-hidden">
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

        <Reveal stagger className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-start">
          {signs.map((s, i) => (
            <SignCard key={s.title} sign={s} index={i} />
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

function PressureGaitDemo() {
  const phases = ["Heel strike", "Midstance", "Toe-off", "Swing"] as const;
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % phases.length), 1100);
    return () => clearInterval(id);
  }, []);

  // Heat zones per gait phase: [heel, lateral-mid, medial-mid, ball-lat, ball-med, hallux]
  const intensity: Record<number, number[]> = {
    0: [1.0, 0.45, 0.35, 0.15, 0.10, 0.08], // heel strike
    1: [0.55, 0.85, 0.80, 0.45, 0.40, 0.20], // midstance
    2: [0.15, 0.35, 0.40, 0.95, 1.00, 0.85], // toe-off
    3: [0.10, 0.12, 0.10, 0.10, 0.08, 0.06], // swing
  };
  const zones = intensity[phase];
  const labels = [
    { id: "Heel", val: zones[0] },
    { id: "Midfoot", val: (zones[1] + zones[2]) / 2 },
    { id: "Forefoot", val: (zones[3] + zones[4]) / 2 },
    { id: "Hallux", val: zones[5] },
  ];

  return (
    <Reveal className="mt-14 lg:mt-20">
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
        {/* Left: foot + live heatmap */}
        <div className="lg:col-span-7 relative rounded-[2rem] overflow-hidden border border-on-primary-container/15 bg-[#0b1f1c]/60 backdrop-blur p-5 sm:p-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <div className="label-caps text-tertiary-fixed-dim">Live demo</div>
              <div className="text-base sm:text-lg font-semibold">Pressure map · gait cycle</div>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono tabular-nums text-on-primary-container/80">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim pressure-pulse" />
              200 Hz · 32 zones
            </div>
          </div>

          <div className="relative mx-auto aspect-[3/4] max-w-[360px]">
            {/* sweep line */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[40%]">
              <div className="heat-sweep absolute inset-x-0 h-6 bg-gradient-to-b from-transparent via-tertiary-fixed/50 to-transparent blur-md" />
            </div>
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <defs>
                <radialGradient id="heatRed" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff3b30" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#ff7a18" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#ff7a18" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="heatYellow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffd60a" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffd60a" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="heatCool" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* foot outline */}
              <path
                d="M100 8 C140 8 165 40 162 90 C160 130 175 160 175 200 C175 245 145 272 100 272 C55 272 25 245 25 200 C25 160 40 130 38 90 C35 40 60 8 100 8 Z"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(220,255,240,0.25)"
                strokeWidth="1.2"
              />
              {/* sensor dots grid */}
              {Array.from({ length: 64 }).map((_, i) => {
                const col = i % 8;
                const row = Math.floor(i / 8);
                const cx = 40 + col * 17;
                const cy = 30 + row * 30;
                return <circle key={i} cx={cx} cy={cy} r="1.2" fill="rgba(220,255,240,0.18)" />;
              })}

              {/* dynamic heat zones */}
              {[
                { cx: 100, cy: 240, r: 42, fill: "url(#heatRed)",    v: zones[0] }, // heel
                { cx: 130, cy: 165, r: 34, fill: "url(#heatYellow)", v: zones[1] }, // lateral mid
                { cx: 72,  cy: 165, r: 34, fill: "url(#heatCool)",   v: zones[2] }, // medial mid
                { cx: 130, cy: 95,  r: 32, fill: "url(#heatYellow)", v: zones[3] }, // ball lat
                { cx: 78,  cy: 80,  r: 36, fill: "url(#heatRed)",    v: zones[4] }, // ball med
                { cx: 95,  cy: 38,  r: 26, fill: "url(#heatRed)",    v: zones[5] }, // hallux
              ].map((z, i) => (
                <circle
                  key={i}
                  cx={z.cx}
                  cy={z.cy}
                  r={z.r}
                  fill={z.fill}
                  className="heat-zone"
                  style={{
                    opacity: 0.15 + z.v * 0.85,
                    transition: "opacity 700ms ease, transform 700ms ease",
                    animationDelay: `${i * 0.25}s`,
                  }}
                />
              ))}
            </svg>
          </div>

          {/* phase strip */}
          <div className="mt-5 grid grid-cols-4 gap-2">
            {phases.map((p, i) => (
              <div
                key={p}
                className={`rounded-lg border px-2 py-2 text-center text-[11px] font-mono tabular-nums transition-all duration-500 ${
                  i === phase
                    ? "bg-tertiary-fixed/20 border-tertiary-fixed text-tertiary-fixed-dim"
                    : "bg-on-primary-container/5 border-on-primary-container/10 text-on-primary-container/60"
                }`}
              >
                <div className="text-[9px] opacity-70">0{i + 1}</div>
                <div>{p}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: live readouts */}
        <div className="lg:col-span-5 rounded-[2rem] overflow-hidden border border-on-primary-container/15 bg-on-primary-container/[0.04] backdrop-blur p-5 sm:p-7 flex flex-col">
          <div className="label-caps text-tertiary-fixed-dim">Telemetry</div>
          <div className="text-lg font-semibold mb-5">What SAARTHI sees, in real time</div>

          <ul className="space-y-3">
            {labels.map((l) => {
              const pct = Math.round(l.val * 100);
              return (
                <li key={l.id} className="rounded-xl bg-primary-container/30 border border-on-primary-container/10 px-4 py-3">
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium">{l.id}</span>
                    <span className="font-mono tabular-nums text-tertiary-fixed-dim">{pct.toString().padStart(2, "0")}%</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-on-primary-container/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-tertiary-fixed-dim via-amber-400 to-red-500 transition-[width] duration-700 ease-out"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>

          {/* live waveform */}
          <div className="mt-6 rounded-xl bg-primary-container/30 border border-on-primary-container/10 px-4 py-3">
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium">Cadence</span>
              <span className="font-mono tabular-nums text-tertiary-fixed-dim">
                {[112, 118, 124, 96][phase]} spm
              </span>
            </div>
            <div className="mt-3 flex items-end gap-1 h-10">
              {Array.from({ length: 28 }).map((_, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-sm bg-tertiary-fixed/70 origin-bottom"
                  style={{
                    animation: `wave-bar 1.4s ease-in-out ${i * 0.05}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>

          <p className="mt-5 text-[12px] text-on-primary-container/70 leading-relaxed">
            Demo visualization. Live device streams 32-channel pressure at 200 Hz; companion app shows per-step balance, asymmetry, and strain trends.
          </p>
        </div>
      </div>
    </Reveal>
  );
}



function Features() {
  return (
    <section id="features" className="scroll-mt-20 sm:scroll-mt-24 py-16 sm:py-20 lg:py-28 bg-primary text-primary-foreground relative overflow-hidden">
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
                alt="SAARTHI smart insole exploded view alongside the companion app showing pressure maps, gait charts, and balance metrics"
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

        {/* Live pressure-map / gait demo */}
        <PressureGaitDemo />



        <Reveal stagger className="mt-14 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 items-start">
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
  {
    title: "Ball of Foot Pain",
    desc: "Targeted metatarsal support",
    icon: "radio_button_checked",
    details:
      "Metatarsalgia is sharp, burning, or aching pain under the ball of the foot, often from overloading the metatarsal heads during walking, running, or long standing hours.",
    causes: ["High-impact activity", "Tight calves", "High heels", "Morton's neuroma"],
    solution: "A pre-metatarsal pad that offloads the metatarsal heads, paired with a deep forefoot cushion to absorb peak pressure.",
  },
  {
    title: "Bunions",
    desc: "Pressure relief and alignment",
    icon: "adjust",
    details:
      "A bunion (hallux valgus) is a bony bump at the base of the big toe caused by gradual misalignment of the first metatarsal joint, often worsened by narrow footwear.",
    causes: ["Narrow toe boxes", "Genetic foot structure", "Overpronation", "Weak intrinsic muscles"],
    solution: "Soft cushioning around the joint plus a medial flare that re-centers the big toe and reduces lateral pressure.",
  },
  {
    title: "Diabetic Foot",
    desc: "Maximum cushioning and care",
    icon: "favorite",
    details:
      "Diabetic neuropathy reduces sensation in the feet, so small pressure points and friction can develop into ulcers without warning. Even pressure distribution is critical.",
    causes: ["Peripheral neuropathy", "Reduced circulation", "Calluses", "Foot deformities"],
    solution: "Multi-density EVA with seamless top cover and a 32-zone pressure map to flag high-load areas before tissue damage starts.",
  },
  {
    title: "Fallen Arches",
    desc: "Firm medial arch elevation",
    icon: "show_chart",
    details:
      "Fallen arches (acquired flatfoot) develop when the posterior tibial tendon weakens, letting the midfoot collapse inward and causing pain along the arch and ankle.",
    causes: ["Aging", "Excess body load", "Tendon injury", "Repetitive impact"],
    solution: "Firm medial arch lift with a heel-stabilizing cup that supports the posterior tibial tendon through the gait cycle.",
  },
  {
    title: "Flat Feet",
    desc: "Structured stability control",
    icon: "horizontal_rule",
    details:
      "Flat feet collapse the arch on weight-bearing, leading to overpronation. Over time this rotates the knee and hip inward, straining the medial chain.",
    causes: ["Hereditary structure", "Ligament laxity", "Childhood foot development", "Overpronation"],
    solution: "Carbon arch plate plus a stability frame that controls medial roll while keeping forefoot flexibility intact.",
  },
  {
    title: "Heel Pain",
    desc: "Deep heel cup and shock absorption",
    icon: "vertical_align_bottom",
    details:
      "Heel pain typically stems from plantar fasciitis, fat pad atrophy, or heel spurs. Repeated impact without cushioning inflames the tissue at the heel insertion.",
    causes: ["Plantar fasciitis", "Fat pad thinning", "Heel spurs", "Hard, flat shoes"],
    solution: "Deep heel cup that cradles the fat pad, plus a viscoelastic insert that absorbs heel-strike shock at every step.",
  },
];

function Range() {
  const [showAll, setShowAll] = useState(false);
  return (
    <section className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 lg:py-24 relative overflow-hidden">
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

        <Reveal stagger className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-start">
          {orthotics.map((o, i) => (
            <OrthoticCard key={o.title} item={o} index={i} hidden={!showAll && i >= 4} />
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
    <section id="audience" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20">
        <Eyebrow>Applications</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-[26px] sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary">
          Designed for everyday movement.
        </h2>
        <p className="mt-5 max-w-2xl text-on-surface-variant text-[15px] sm:text-lg">
          Built for anyone whose day depends on their feet — which is to say, almost everyone.
        </p>
        <Reveal stagger className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-start">
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
  {
    icon: "science",
    title: "Rooted in biomechanics",
    body: "Designed on the principles of gait analysis, plantar pressure distribution, and lower-limb kinematics — the same fundamentals used in clinical podiatry and sports medicine.",
  },
  {
    icon: "verified",
    title: "Engineered to clinical standards",
    body: "Materials, sensor placement, and arch geometry are developed with biomechanics references and benchmarked against established orthotic design practices.",
  },
  {
    icon: "lock",
    title: "Privacy by design",
    body: "Your movement data stays yours. Stored encrypted, never sold to third parties, never used for ads. You can export or delete everything from your account at any time.",
  },
];

const advisors = [
  {
    initials: "BM",
    role: "Biomechanics Advisor",
    focus: "Gait analysis · Lower-limb kinematics",
    note: "Guides our pressure-mapping methodology and arch-support geometry.",
  },
  {
    initials: "PT",
    role: "Physiotherapy Advisor",
    focus: "Sports rehab · Plantar fasciitis",
    note: "Validates clinical use cases and patient-comfort protocols.",
  },
  {
    initials: "PD",
    role: "Product Design Lead",
    focus: "Wearables · Sensor integration",
    note: "Translates biomechanics into a wearable people actually want to use.",
  },
];

const credentials = [
  { icon: "school", label: "Biomechanics-informed", sub: "Designed on peer-reviewed gait research" },
  { icon: "flag", label: "Made in India", sub: "Designed, prototyped, and assembled locally" },
  { icon: "factory", label: "Quality-tested materials", sub: "Medical-grade EVA, breathable fabric cover" },
  { icon: "shield", label: "Privacy by design", sub: "Encrypted in transit · You own your data" },
];

function Trust() {
  return (
    <section className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20">
        <Eyebrow>Why trust Spandhika</Eyebrow>
        <h2 className="mt-4 max-w-3xl text-[26px] sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary">
          Built with biomechanics. Designed for real life.
        </h2>
        <p className="mt-5 max-w-3xl text-on-surface-variant text-[15px] sm:text-lg">
          SAARTHI is shaped by clinical biomechanics, product engineering, and the people who actually spend their days on their feet — combining what researchers know about gait with what real bodies feel at the end of a long day.
        </p>

        <Reveal stagger className="mt-8 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8 border-y border-outline-variant py-8 sm:py-10">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group rounded-2xl p-2 sm:p-4 lg:p-5 transition-all duration-500 hover-lift text-center sm:text-left"
            >
              <div className="text-[28px] sm:text-5xl lg:text-6xl font-bold tracking-tight text-gradient-primary">
                {s.value}
              </div>
              <div className="mt-2 label-caps text-on-surface-variant text-[10px] sm:text-xs whitespace-nowrap">
                {s.label}
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal stagger className="mt-8 sm:mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 items-start">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl p-6 sm:p-7 glass border border-white/40 transition-[background-color,box-shadow,backdrop-filter,transform,border-color] duration-500 ease-out hover:bg-card/70 hover:backdrop-blur-2xl hover:border-white/70 hover:shadow-[0_18px_40px_-22px_color-mix(in_oklab,var(--primary)_30%,transparent)] hover:-translate-y-1"
            >
              <Icon name={p.icon} className="text-3xl text-primary transition-transform duration-500 group-hover:-rotate-3" />
              <h3 className="mt-4 text-lg sm:text-xl font-semibold text-primary">{p.title}</h3>
              <p className="mt-2 text-on-surface-variant leading-relaxed">{p.body}</p>
            </div>
          ))}
        </Reveal>

        {/* Advisors */}
        <div className="mt-14 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <Eyebrow>Advisors & expertise</Eyebrow>
              <h3 className="mt-3 text-[22px] sm:text-3xl lg:text-4xl font-semibold tracking-tight text-primary">
                Guided by clinical and engineering experts.
              </h3>
            </div>
            <p className="max-w-md text-on-surface-variant text-[15px] sm:text-base">
              Our advisory circle spans biomechanics, physiotherapy, and wearable product design — keeping SAARTHI grounded in clinical reality.
            </p>
          </div>

          <Reveal stagger className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-start">
            {advisors.map((a) => (
              <div
                key={a.role}
                className="rounded-2xl p-6 glass border border-white/40 hover-lift transition-all duration-500"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-container text-primary flex items-center justify-center font-semibold tracking-tight">
                    {a.initials}
                  </div>
                  <div>
                    <div className="text-primary font-semibold">{a.role}</div>
                    <div className="text-xs text-on-surface-variant">{a.focus}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-on-surface-variant leading-relaxed">{a.note}</p>
              </div>
            ))}
          </Reveal>

          <p className="mt-4 text-xs text-on-surface-variant/80">
            Named advisor profiles and institutional partners will be published as collaborations are formalised.
          </p>
        </div>

        {/* Credentials strip */}
        <Reveal className="mt-12 sm:mt-16 rounded-2xl glass-strong border border-white/40 p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {credentials.map((c) => (
              <div key={c.label} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container text-primary flex items-center justify-center shrink-0">
                  <Icon name={c.icon} />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-semibold text-primary leading-tight">{c.label}</div>
                  <div className="mt-1 text-xs text-on-surface-variant leading-snug">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Privacy deep-dive */}
        <Reveal className="mt-10 sm:mt-12 rounded-2xl glass border border-white/40 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-primary flex items-center justify-center">
              <Icon name="lock" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-primary">Privacy by design — in detail</h3>
          </div>
          <p className="mt-4 text-on-surface-variant text-[15px] leading-relaxed max-w-3xl">
            Your gait, posture, and pressure patterns are personal. We treat your data with the same care a clinician would.
          </p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-on-surface-variant">
            {[
              "Encrypted in transit and at rest",
              "You own your data — export or delete anytime",
              "No selling or sharing with advertisers",
              "Account-scoped — only you and people you invite can view",
              "Aggregated, anonymised analytics only for product improvement (opt-out available)",
              "Minimal data collection — we ask only for what's needed to help you move better",
            ].map((p) => (
              <li key={p} className="flex items-start gap-2">
                <Icon name="check_circle" className="text-base text-tertiary-fixed-dim mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
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
    <section id="contact" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 lg:py-24">
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
            <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 glass-strong border border-outline-variant">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=76.4712%2C31.6339%2C76.5712%2C31.7339&layer=mapnik&marker=31.6839%2C76.5212"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(30%) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Spandhika location map — Hamirpur, Himachal Pradesh"
              />
              <a
                href="https://www.openstreetmap.org/?mlat=31.6839&mlon=76.5212#map=13/31.6839/76.5212"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full glass-strong px-3 py-1.5 text-xs text-primary hover:opacity-90"
              >
                <Icon name="location_on" className="text-sm" />
                Hamirpur, Himachal Pradesh
              </a>
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
              <a
                href="https://www.linkedin.com/company/spandhika-orthotics"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl glass p-5 sm:p-6 hover-lift group"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary-container text-primary flex items-center justify-center transition-transform group-hover:-rotate-6">
                  <Icon name="link" />
                </div>
                <div className="mt-3 label-caps text-on-surface-variant">Social</div>
                <div className="mt-1 inline-flex items-center gap-1 text-primary font-medium group-hover:opacity-80">
                  LinkedIn
                  <Icon name="arrow_outward" className="text-base" />
                </div>
              </a>
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
    <section id="purpose" className="scroll-mt-20 sm:scroll-mt-24 py-16 sm:py-20 lg:py-28 bg-primary text-primary-foreground relative overflow-hidden">
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
      <main className="pt-14 sm:pt-20 scroll-pt-14 sm:scroll-pt-20">
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
