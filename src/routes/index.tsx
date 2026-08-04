import { createFileRoute, useLocation, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence, useInView, useScroll, useSpring, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, ArrowUp, Award, Building2, Camera, CheckCircle2, ChevronDown, Clock, Compass,
  Facebook, Hammer, HardHat, Home, Instagram, Layers, Layout, Leaf, Lightbulb,
  Linkedin, Mail, MapPin, Menu, Palette, Phone, Ruler, ShieldCheck,
  Sofa, Sparkles, Star, Trees, Users, Utensils, Video, X,
} from "lucide-react";
import logo from "@/assets/moon-logo.png";
import heroVilla from "@/assets/hero-villa.jpg";
import livingRoom from "@/assets/living-room.jpg";
import kitchenImg from "@/assets/kitchen.jpg";
import officeImg from "@/assets/office.jpg";
import bedroomImg from "@/assets/bedroom.jpg";
import commercialImg from "@/assets/commercial.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "https://id-preview--1b1525ea-94aa-4fcd-aaa8-2872a8e46f41.lovable.app/favicon.png" },
    ],
  }),
  component: Index,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

function Section({
  id, eyebrow, title, subtitle, children, dark = false,
}: {
  id?: string; eyebrow?: string; title?: React.ReactNode; subtitle?: string;
  children: React.ReactNode; dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative py-24 md:py-32 ${dark ? "text-white" : ""}`}
      style={dark ? { background: "var(--gradient-navy)" } : undefined}
    >
      <div className="container-luxe">
        {(eyebrow || title) && (
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp} className="mx-auto mb-14 max-w-3xl text-center"
          >
            {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
            {title && (
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-semibold ${dark ? "text-white" : "text-navy"}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`mt-5 text-base md:text-lg leading-relaxed ${dark ? "text-white/70" : "text-muted-foreground"}`}>
                {subtitle}
              </p>
            )}
            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

/* ---------------- NAV ---------------- */
/* ---------------- NAV ---------------- */
const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Gallery" },
  { id: "awards", label: "Awards" },
  { id: "projects", label: "Projects" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

function Navbar({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tabId: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 backdrop-blur-2xl ${
        scrolled
          ? "border-b border-[color:var(--gold)]/30 shadow-[0_10px_35px_rgba(0,0,0,0.5)] py-2.5"
          : "border-b border-white/10 py-3.5"
      }`}
      style={{
        background: scrolled
          ? "linear-gradient(135deg, rgba(14, 20, 36, 0.94) 0%, rgba(10, 14, 26, 0.96) 100%)"
          : "linear-gradient(135deg, rgba(16, 24, 44, 0.82) 0%, rgba(12, 18, 34, 0.85) 100%)",
      }}
    >
      <div className="container-luxe flex items-center justify-between">
        <button onClick={() => onTabChange("home")} className="flex items-center gap-3 cursor-pointer text-left bg-transparent border-0 p-0 focus:outline-none group">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gold/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            <img src={logo} alt="Moon Construction & Interiors" className="relative h-12 w-12 md:h-14 md:w-14 object-contain drop-shadow-[0_2px_12px_rgba(212,175,55,0.5)]" />
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-white text-lg font-semibold tracking-wide">Moon</div>
            <div className="text-[10px] tracking-[0.3em] text-gold uppercase font-medium">Construction &amp; Interiors</div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-2 bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-white/15 shadow-inner">
          {NAV.map((n) => {
            const isActive = activeTab === n.id;
            return (
              <button
                key={n.id}
                onClick={() => onTabChange(n.id)}
                className={`relative px-4 py-1.5 text-xs uppercase tracking-wider font-medium cursor-pointer transition-all duration-300 rounded-full bg-transparent border-0 focus:outline-none ${
                  isActive ? "text-navy-deep font-semibold" : "text-white/80 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navTabGlass"
                    className="absolute inset-0 rounded-full shadow-md"
                    style={{ background: "var(--gradient-gold)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{n.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center">
          <button
            onClick={() => onTabChange("contact")}
            className="btn-gold btn-gold-hover !py-2.5 !px-5 !text-xs cursor-pointer bg-transparent border-0 focus:outline-none shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
          >
            Get Quote <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <button className="lg:hidden text-white p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 cursor-pointer focus:outline-none" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu />
        </button>
      </div>

      {/* Mobile Glass Menu */}
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] lg:hidden bg-black/60 backdrop-blur-2xl">
          <div className="flex items-center justify-between container-luxe py-4 border-b border-white/10 bg-white/5 backdrop-blur-xl">
            <img src={logo} alt="" className="h-12 w-12 object-contain" />
            <button className="text-white p-2 rounded-xl bg-white/10 border border-white/20 cursor-pointer focus:outline-none" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
          </div>
          <div className="container-luxe mt-8 flex flex-col gap-4">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => {
                  onTabChange(n.id);
                  setOpen(false);
                }}
                className={`text-xl font-display text-left p-3 rounded-2xl cursor-pointer transition-all border focus:outline-none ${
                  activeTab === n.id ? "text-navy-deep font-bold border-gold/50 shadow-md" : "text-white/90 hover:text-gold border-white/10 bg-white/5"
                }`}
                style={activeTab === n.id ? { background: "var(--gradient-gold)" } : undefined}
              >
                {n.label}
              </button>
            ))}
            <button
              onClick={() => {
                onTabChange("contact");
                setOpen(false);
              }}
              className="btn-gold btn-gold-hover mt-4 w-full justify-center cursor-pointer border-0 focus:outline-none"
            >
              Get Quote
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );

}

/* ---------------- HERO ---------------- */
function Counter({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.floor(eased * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function Hero({ onTabChange }: { onTabChange: (tabId: string) => void }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroVilla} alt="Luxury modern villa" className="h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, oklch(0.14 0.04 258 / 0.92) 0%, oklch(0.18 0.05 258 / 0.65) 60%, oklch(0.14 0.04 258 / 0.85) 100%)" }} />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, oklch(0.78 0.13 85 / 0.25), transparent 40%)",
        }} />
      </div>

      <div className="container-luxe relative z-10 pt-20 pb-20 md:pt-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div initial="hidden" animate="show" variants={fadeUp} className="eyebrow mb-6 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span>Premium Construction &amp; Interior Design</span>
            </motion.div>
            <motion.h1
              initial="hidden" animate="show" custom={1} variants={fadeUp}
              className="font-display text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.02] font-semibold"
            >
              Building Spaces. <br />
              <span className="text-gold-gradient italic">Designing Dreams.</span> <br />
              Inspiring Futures.
            </motion.h1>
            <motion.p
              initial="hidden" animate="show" custom={2} variants={fadeUp}
              className="mt-8 max-w-2xl text-white/75 text-base md:text-lg leading-relaxed"
            >
              Delivering premium construction and interior design solutions for homes, villas,
              apartments, offices, commercial spaces, and turnkey projects — with over 700+
              satisfied clients worldwide.
            </motion.p>
            <motion.div initial="hidden" animate="show" custom={3} variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-4">
              <button onClick={() => onTabChange("contact")} className="btn-gold btn-gold-hover cursor-pointer bg-transparent border-0 focus:outline-none">
                Get Free Consultation <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => onTabChange("portfolio")} className="btn-outline-gold hover:bg-white/10 cursor-pointer bg-transparent border-0 focus:outline-none">
                View Portfolio
              </button>
            </motion.div>

            <motion.div initial="hidden" animate="show" custom={4} variants={fadeUp}
              className="mt-14 flex flex-wrap items-center gap-10">
              <div>
                <div className="font-display text-5xl md:text-6xl text-gold-gradient font-bold">
                  <Counter end={700} suffix="+" />
                </div>
                <div className="mt-1 text-xs tracking-[0.3em] uppercase text-white/70">Happy Clients</div>
              </div>
              <div className="h-14 w-px bg-white/15" />
              <div>
                <div className="font-display text-5xl md:text-6xl text-white font-bold"><Counter end={150} suffix="+" /></div>
                <div className="mt-1 text-xs tracking-[0.3em] uppercase text-white/70">Projects</div>
              </div>
              <div className="h-14 w-px bg-white/15" />
              <div>
                <div className="font-display text-5xl md:text-6xl text-white font-bold"><Counter end={10} suffix="+" /></div>
                <div className="mt-1 text-xs tracking-[0.3em] uppercase text-white/70">Years</div>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="lg:col-span-4 hidden lg:block">
            <div className="group relative">
              {/* Floating ambient glow backdrop */}
              <div className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-br from-amber-400/30 via-amber-600/20 to-navy-deep/60 blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Glassmorphic Founder Card */}
              <div className="relative glass-card rounded-[2rem] overflow-hidden text-white shadow-2xl border border-white/20 transition-all duration-500 group-hover:border-[color:var(--gold)]/50">
                {/* Gold top accent bar */}
                <div className="h-1 w-full" style={{ background: "var(--gradient-gold)" }} />

                {/* Founder photo */}
                <div className="relative overflow-hidden">
                  <img
                    src="/founder.jpg"
                    alt="Mr. Syed Ghouseuddin — Founder & Managing Director"
                    className="w-full h-80 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Glass gradient overlay blending photo into card */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-[2px]" />
                </div>

                {/* Glassy Info block */}
                <div className="px-6 pb-6 pt-2 relative z-10 bg-white/5 backdrop-blur-md">
                  <div className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-1" style={{ color: "var(--gold)" }}>
                    Founder &amp; Managing Director
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white leading-tight">
                    Mr. Syed<br />
                    <span className="text-gold-gradient">Ghouseuddin</span>
                  </h3>
                  <div className="mt-3 text-xs text-white/80 leading-relaxed italic border-l-2 border-[color:var(--gold)]/80 bg-white/5 backdrop-blur-sm p-3 rounded-r-xl shadow-inner">
                    "Engineering excellence meets timeless design — crafted for the way you live."
                  </div>
                  <div className="mt-4 flex items-center gap-2.5">
                    {[Award, ShieldCheck, Sparkles].map((I, i) => (
                      <div key={i} className="h-9 w-9 rounded-xl grid place-items-center bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
                        <I className="h-4 w-4 text-gold" />
                      </div>
                    ))}
                    <div className="text-[10px] uppercase tracking-wider text-white/70 font-medium ml-1">Since 2015 · 10+ Years</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <button onClick={() => onTabChange("about")} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-gold transition-colors cursor-pointer bg-transparent border-0 p-0 focus:outline-none">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </button>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  const perks = [
    { icon: Users, label: "700+ Happy Clients" },
    { icon: Award, label: "Premium Quality Materials" },
    { icon: HardHat, label: "Experienced Engineers" },
    { icon: Palette, label: "Creative Interior Designers" },
    { icon: Sparkles, label: "Affordable Luxury" },
    { icon: Clock, label: "On-Time Delivery" },
    { icon: Lightbulb, label: "Modern Technology" },
    { icon: ShieldCheck, label: "Dedicated Support" },
  ];
  return (
    <Section id="about" eyebrow="About Us" title={<>About <em className="text-gold-gradient not-italic">Moon Construction</em> & Interiors</>}>
      <div className="grid lg:grid-cols-12 gap-16 items-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          className="lg:col-span-6 relative">
          <div className="absolute -inset-4 rounded-3xl gold-border" />
          <div className="relative overflow-hidden rounded-2xl shadow-[var(--shadow-luxe)]">
            <img src={livingRoom} alt="Luxury living room" className="w-full h-[520px] object-cover transition-transform duration-1000 hover:scale-105" loading="lazy" />
          </div>
          <div className="absolute -bottom-8 -right-6 hidden md:block rounded-2xl bg-white p-6 shadow-[var(--shadow-luxe)] gold-border">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full grid place-items-center" style={{ background: "var(--gradient-gold)" }}>
                <Award className="h-6 w-6 text-navy" />
              </div>
              <div>
                <div className="font-display text-2xl text-navy font-bold">10+ Years</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Of Excellence</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-6">
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-lg text-muted-foreground leading-relaxed">
            Moon Construction & Interiors is a trusted name in premium construction and interior
            design. With more than <strong className="text-navy">700 satisfied clients worldwide</strong>,
            we specialize in residential construction, commercial buildings, luxury villas, office
            interiors, modular kitchens, turnkey projects, renovations, and architectural planning.
          </motion.p>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} custom={1} variants={fadeUp}
            className="mt-5 text-muted-foreground leading-relaxed">
            Our team combines engineering excellence, innovative design, and superior craftsmanship
            to transform every project into a masterpiece.
          </motion.p>

          {/* Founder Profile */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} custom={1.5} variants={fadeUp}
            className="mt-8 flex flex-col sm:flex-row items-center gap-6 rounded-2xl border-2 border-gold bg-navy text-white p-6 shadow-xl relative overflow-hidden">
            {/* Subtle gold background glow */}
            <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
            
            <img src="/pic 23.jpeg" alt="Syed, Founder" className="h-28 w-28 rounded-full object-cover object-[center_18%] border-2 border-gold shadow-lg shrink-0 relative z-10" />
            <div className="text-center sm:text-left relative z-10">
              <div className="text-xs uppercase tracking-[0.25em] text-gold font-bold">Founder & Managing Director</div>
              <h4 className="font-display text-3xl text-white font-bold mt-1">Syed</h4>
              <p className="text-sm text-white/80 mt-3 leading-relaxed italic">
                "Our mission is to combine timeless design with engineering integrity. Every project we undertake is crafted with the highest precision, bringing our clients' dreams to life."
              </p>
            </div>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {perks.map((p, i) => (
              <motion.div key={p.label} initial="hidden" whileInView="show" viewport={{ once: true }}
                custom={i} variants={fadeUp}
                className="flex items-center gap-3 rounded-xl border border-border bg-white/60 px-4 py-3 hover:border-[color:var(--gold)] transition-colors">
                <div className="h-9 w-9 shrink-0 rounded-lg grid place-items-center" style={{ background: "var(--gradient-gold)" }}>
                  <p.icon className="h-4 w-4 text-navy" />
                </div>
                <span className="text-sm font-medium text-navy">{p.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- SERVICES ---------------- */
const SERVICES = [
  { icon: Home, name: "Residential Construction" },
  { icon: Building2, name: "Commercial Construction" },
  { icon: Sparkles, name: "Luxury Villas" },
  { icon: Compass, name: "Architecture" },
  { icon: Sofa, name: "Interior Design" },
  { icon: Layout, name: "Office Interiors" },
  { icon: Utensils, name: "Modular Kitchen" },
  { icon: Layers, name: "False Ceiling" },
  { icon: Lightbulb, name: "Lighting Design" },
  { icon: Trees, name: "Landscape Design" },
  { icon: Hammer, name: "Renovation" },
  { icon: Palette, name: "Painting" },
  { icon: Ruler, name: "Flooring" },
  { icon: Leaf, name: "Wood Works" },
  { icon: ShieldCheck, name: "Turnkey Construction" },
  { icon: HardHat, name: "Structural Design" },
];
function Services() {
  return (
    <Section id="services" eyebrow="What We Do" title={<>Signature <span className="text-gold-gradient">Services</span></>}
      subtitle="End-to-end solutions crafted with precision — from the first blueprint to the final finish."
      dark>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {SERVICES.map((s, i) => (
          <motion.div key={s.name} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            custom={i % 4} variants={fadeUp}
            className="group relative overflow-hidden rounded-2xl p-6 md:p-7 gold-border glass-card transition-all hover:-translate-y-1"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(160deg, oklch(0.78 0.13 85 / 0.15), transparent)" }} />
            <div className="relative">
              <div className="h-12 w-12 rounded-xl grid place-items-center mb-5" style={{ background: "var(--gradient-gold)" }}>
                <s.icon className="h-5 w-5 text-navy-deep" />
              </div>
              <h3 className="font-display text-lg text-white font-semibold">{s.name}</h3>
              <div className="mt-4 flex items-center gap-1 text-xs uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- PROCESS ---------------- */
const STEPS = [
  "Consultation", "Planning", "Site Inspection", "3D Design",
  "Construction", "Interior Installation", "Quality Check", "Project Delivery",
];
function Process() {
  return (
    <Section id="process" eyebrow="Our Process" title={<>A Journey of <span className="text-gold-gradient">Craft</span> & Care</>}
      subtitle="Eight considered steps that transform a vision into a completed masterpiece.">
      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden md:block h-full w-px" style={{ background: "linear-gradient(to bottom, transparent, var(--gold), transparent)" }} />
        <div className="space-y-8 md:space-y-16">
          {STEPS.map((s, i) => (
            <motion.div key={s} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
              className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${i % 2 ? "md:flex-row-reverse" : ""}`}>
              <div className="md:w-1/2 md:px-10">
                <div className={`rounded-2xl bg-white p-6 md:p-8 gold-border shadow-[var(--shadow-luxe)] ${i % 2 ? "md:text-right" : ""}`}>
                  <div className="eyebrow mb-2">Step {String(i + 1).padStart(2, "0")}</div>
                  <h3 className="font-display text-2xl md:text-3xl text-navy font-semibold">{s}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A deliberate step in our proven method for delivering premium, on-time results.
                  </p>
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 hidden md:grid place-items-center">
                <div className="h-14 w-14 rounded-full grid place-items-center font-display text-lg font-bold text-navy"
                  style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}>
                  {i + 1}
                </div>
              </div>
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- PORTFOLIO ---------------- */
const CATEGORIES = ["All", "Luxury Villas", "Living Rooms", "Modular Kitchens", "Offices", "Bedrooms", "Commercial"];
const PORTFOLIO = [
  { img: "/pic 1.jpeg", cat: "Luxury Villas", title: "Modern Elevation" },
  { img: "/pic2.jpeg", cat: "Living Rooms", title: "Cozy Hearth" },
  { img: "/pic 3.jpeg", cat: "Modular Kitchens", title: "Gourmet Kitchen" },
  { img: "/pic 4.jpeg", cat: "Offices", title: "Creative Hub" },
  { img: "/pic 5.jpeg", cat: "Bedrooms", title: "Serene Oasis" },
  { img: "/pic 6.jpeg", cat: "Commercial", title: "Boutique Lobby" },
  { img: "/pic 7.jpeg", cat: "Luxury Villas", title: "Glass Pavilion" },
  { img: "/pic 8.jpeg", cat: "Living Rooms", title: "Urban Salon" },
  { img: "/pic 9.jpeg", cat: "Modular Kitchens", title: "Minimalist Cookery" },
  { img: "/pic 10.jpeg", cat: "Offices", title: "Executive Workspace" },
  { img: "/pic11.jpeg", cat: "Bedrooms", title: "Golden Suite" },
  { img: "/pic 12.jpeg", cat: "Commercial", title: "Retail Showroom" },
  { img: "/pic13.jpeg", cat: "Luxury Villas", title: "Hillside Retreat" },
  { img: "/pic14.jpeg", cat: "Living Rooms", title: "Minimalist Den" },
  { img: "/pic 15.jpeg", cat: "Modular Kitchens", title: "Chic Dining Corner" },
  { img: "/pic 16.jpeg", cat: "Offices", title: "Focus Pod" },
  { img: "/pic 17.jpeg", cat: "Bedrooms", title: "Dream Chambers" },
  { img: "/pic18.jpeg", cat: "Commercial", title: "Corporate Atrium" },
  { img: "/pic 19.jpeg", cat: "Luxury Villas", title: "Infinity Deck" },
  { img: "/pic20.jpeg", cat: "Living Rooms", title: "Luxe Lounge" },
  { img: "/pic21.jpeg", cat: "Modular Kitchens", title: "Bright Kitchenette" },
  { img: "/pic 22.jpeg", cat: "Bedrooms", title: "Warm Sanctuary" },
];

interface VideoEntry {
  id: string;
  path: string;      // e.g. /videos/1234_myfilm.mp4
  filename: string;  // e.g. 1234_myfilm.mp4
  title: string;
  category: string;
}

const VIDEO_CATS = ["Interior Design", "Construction", "Villa Tours", "Kitchen", "Office", "Before & After"];
const STORAGE_KEY = "moon_portfolio_videos_v2";

/* ── Upload Modal ── */
function VideoUploadModal({
  initial,
  onSave,
  onClose,
}: {
  initial?: VideoEntry;
  onSave: (v: VideoEntry) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState(initial?.category ?? VIDEO_CATS[0]);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("video/")) { setError("Please select a video file."); return; }
    setFile(f);
    setError("");
    if (!title) setTitle(f.name.replace(/\.[^.]+$/, "").replace(/[_-]/g, " "));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError("Please enter a title."); return; }

    // Edit-only mode (no new file, just updating metadata)
    if (initial && !file) {
      onSave({ ...initial, title: title.trim(), category });
      return;
    }

    if (!file) { setError("Please select a video file."); return; }

    setUploading(true);
    setProgress(0);

    const fd = new FormData();
    fd.append("video", file);

    try {
      // Use XHR for real progress tracking
      const result = await new Promise<{ path: string; filename: string }>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/upload-video");
        xhr.upload.onprogress = (ev) => {
          if (ev.lengthComputable) setProgress(Math.round((ev.loaded / ev.total) * 95));
        };
        xhr.onload = () => {
          if (xhr.status === 200) {
            setProgress(100);
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error("Upload failed"));
          }
        };
        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send(fd);
      });

      onSave({
        id: initial?.id ?? Date.now().toString(),
        path: result.path,
        filename: result.filename,
        title: title.trim(),
        category,
      });
    } catch {
      setError("Upload failed. Please try again.");
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center p-4"
      style={{ background: "oklch(0.1 0.04 258 / 0.92)" }}
      onClick={(e) => { if (e.target === e.currentTarget && !uploading) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.25 }}
        className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden"
      >
        <div className="h-1 w-full" style={{ background: "var(--gradient-gold)" }} />
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl text-navy font-bold">
              {initial ? "Edit Video" : "Upload Video"}
            </h3>
            {!uploading && (
              <button type="button" onClick={onClose} className="text-navy/50 hover:text-navy bg-transparent border-0 p-1">
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* File drop zone — only show when adding or replacing */}
          {!initial && (
            <div
              onClick={() => !uploading && fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault(); setDragOver(false);
                const f = e.dataTransfer.files[0];
                if (f) handleFile(f);
              }}
              className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all p-8 text-center ${
                dragOver
                  ? "border-[color:var(--gold)] bg-[color:var(--gold)]/5"
                  : file
                  ? "border-green-400 bg-green-50"
                  : "border-border hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)]/5"
              }`}
            >
              <input
                ref={fileRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                disabled={uploading}
              />
              {file ? (
                <>
                  <div className="h-12 w-12 mx-auto rounded-full grid place-items-center mb-3 bg-green-100">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 text-green-600">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="font-semibold text-navy text-sm truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{(file.size / (1024 * 1024)).toFixed(1)} MB · Click to change</p>
                </>
              ) : (
                <>
                  <div className="h-14 w-14 mx-auto rounded-full grid place-items-center mb-3" style={{ background: "var(--gradient-gold)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7 text-navy">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <p className="font-semibold text-navy">Drag & drop your video here</p>
                  <p className="text-xs text-muted-foreground mt-1">or click to browse · MP4, MOV, WebM, AVI supported</p>
                </>
              )}
            </div>
          )}

          {/* Progress bar */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Uploading{progress < 100 ? "..." : " complete!"}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "var(--gradient-gold)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>
          )}

          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Video Title *</span>
            <input
              type="text"
              placeholder="e.g. Sky Crest Villa Walkthrough"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError(""); }}
              disabled={uploading}
              className="mt-2 block w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20 transition disabled:opacity-50"
            />
          </label>

          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={uploading}
              className="mt-2 block w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:border-[color:var(--gold)] transition disabled:opacity-50"
            >
              {VIDEO_CATS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} disabled={uploading}
              className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold text-navy hover:bg-gray-50 transition bg-transparent disabled:opacity-40">
              Cancel
            </button>
            <button type="submit" disabled={uploading}
              className="flex-1 rounded-xl py-3 text-sm font-semibold text-navy transition disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: "var(--gradient-gold)" }}>
              {uploading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Uploading...
                </>
              ) : initial ? "Save Changes" : "Upload Video"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

/* ── Video Card ── */
function VideoCard({ video, onEdit, onDelete }: { video: VideoEntry; onEdit: () => void; onDelete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5 }}
      className="group relative rounded-2xl overflow-hidden gold-border shadow-[var(--shadow-luxe)] bg-navy"
    >
      <video
        src={video.path}
        controls
        preload="metadata"
        className="w-full aspect-video object-cover bg-black"
        playsInline
      />

      {/* Info bar */}
      <div className="p-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-1" style={{ color: "var(--gold)" }}>
            {video.category}
          </div>
          <div className="font-display text-white text-base font-semibold truncate">{video.title}</div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={onEdit} title="Edit"
            className="h-8 w-8 rounded-lg grid place-items-center text-white/60 hover:text-gold hover:bg-white/10 transition bg-transparent border-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button onClick={onDelete} title="Delete"
            className="h-8 w-8 rounded-lg grid place-items-center text-white/60 hover:text-red-400 hover:bg-white/10 transition bg-transparent border-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6M9 6V4h6v2" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Awards Marquee (home page) ── */
function AwardsMarquee() {
  const photos: AwardPhoto[] = (() => {
    try {
      const stored = localStorage.getItem(AWARDS_KEY);
      const parsed: AwardPhoto[] = stored ? JSON.parse(stored) : DEFAULT_AWARD_PHOTOS;
      return parsed.length > 0 ? parsed : DEFAULT_AWARD_PHOTOS;
    } catch { return DEFAULT_AWARD_PHOTOS; }
  })();

  // Duplicate items so the loop feels seamless
  const items = [...photos, ...photos, ...photos];

  return (
    <section className="relative py-16 overflow-hidden" style={{ background: "var(--gradient-navy)" }}>
      {/* Section header */}
      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
        className="text-center mb-10 px-4"
      >
        <div className="eyebrow mb-3 flex items-center justify-center gap-2">
          <Award className="h-3.5 w-3.5 text-gold" />
          <span>Recognition &amp; Awards</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-white font-semibold">
          Our <span className="text-gold-gradient">Achievements</span>
        </h2>
      </motion.div>

      {/* Marquee track */}
      <div className="relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
          style={{ background: "linear-gradient(to right, var(--navy-deep, #0a0e1a) 0%, transparent 100%)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
          style={{ background: "linear-gradient(to left, var(--navy-deep, #0a0e1a) 0%, transparent 100%)" }} />

        <div
          className="flex gap-4 awards-marquee-track"
          style={{
            width: "max-content",
            animation: `awardsScroll ${photos.length * 4}s linear infinite`,
          }}
        >
          {items.map((photo, i) => (
            <div
              key={`${photo.id}-${i}`}
              className="relative shrink-0 rounded-2xl overflow-hidden gold-border shadow-[var(--shadow-luxe)] group"
              style={{ width: "220px", height: "280px" }}
            >
              <img
                src={photo.path}
                alt={`Award ${(i % photos.length) + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "linear-gradient(to top, oklch(0.14 0.04 258 / 0.7), transparent 60%)" }}
              />
              <div className="absolute bottom-0 inset-x-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all text-center">
                <div className="text-[10px] uppercase tracking-widest text-gold font-semibold">Award</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes awardsScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        .awards-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

/* ── Awards Gallery ── */
interface AwardPhoto { id: string; path: string; filename: string; }
const AWARDS_KEY = "moon_award_photos_v1";
const DEFAULT_AWARD_PHOTOS: AwardPhoto[] = [
  { id: "award-1", path: "/awards/award_1.jpg", filename: "award_1.jpg" },
  { id: "award-2", path: "/awards/award_2.jpg", filename: "award_2.jpg" },
  { id: "award-3", path: "/awards/award_3.jpg", filename: "award_3.jpg" },
  { id: "award-4", path: "/awards/award_4.jpg", filename: "award_4.jpg" },
  { id: "award-5", path: "/awards/award_5.jpg", filename: "award_5.jpg" },
];

function AwardUploadModal({ onAdd, onClose }: { onAdd: (p: AwardPhoto) => void; onClose: () => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const addFiles = (fl: FileList | null) => {
    if (!fl) return;
    const valid = Array.from(fl).filter(f => f.type.startsWith("image/"));
    if (!valid.length) { setError("Please select image files."); return; }
    setFiles(v => [...v, ...valid]);
    setPreviews(v => [...v, ...valid.map(f => URL.createObjectURL(f))]);
    setError("");
  };

  const remove = (i: number) => {
    setFiles(v => v.filter((_, idx) => idx !== i));
    setPreviews(v => v.filter((_, idx) => idx !== i));
  };

  const upload = async () => {
    if (!files.length) { setError("Please select at least one image."); return; }
    setUploading(true); setProgress(0); setCurrent(0);
    for (let i = 0; i < files.length; i++) {
      setCurrent(i + 1);
      try {
        const fd = new FormData();
        fd.append("image", files[i]);
        const result = await new Promise<{ path: string; filename: string }>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", "/api/upload-award-image");
          xhr.upload.onprogress = (ev) => { if (ev.lengthComputable) setProgress(Math.round(((i + ev.loaded / ev.total) / files.length) * 100)); };
          xhr.onload = () => { if (xhr.status === 200) resolve(JSON.parse(xhr.responseText)); else reject(); };
          xhr.onerror = () => reject();
          xhr.send(fd);
        });
        onAdd({ id: Date.now().toString() + i, path: result.path, filename: result.filename });
      } catch {
        setError(`Failed to upload image ${i + 1}.`);
        setUploading(false); return;
      }
    }
    setProgress(100);
    setUploading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center p-4" style={{ background: "oklch(0.1 0.04 258 / 0.92)" }}
      onClick={(e) => { if (e.target === e.currentTarget && !uploading) onClose(); }}>
      <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.25 }}
        className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="h-1 w-full shrink-0" style={{ background: "var(--gradient-gold)" }} />
        <div className="p-8 space-y-5 overflow-y-auto flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl text-navy font-bold">Add Award Photos</h3>
            {!uploading && <button type="button" onClick={onClose} className="text-navy/50 hover:text-navy bg-transparent border-0 p-1"><X className="h-5 w-5" /></button>}
          </div>
          <div
            onClick={() => !uploading && fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${dragOver ? "border-[color:var(--gold)] bg-[color:var(--gold)]/5" : "border-border hover:border-[color:var(--gold)]"} ${uploading ? "opacity-50 pointer-events-none" : ""}`}
          >
            <div className="h-12 w-12 mx-auto rounded-xl grid place-items-center mb-3" style={{ background: "var(--gradient-gold)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 text-navy">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p className="font-semibold text-navy">Click or drag photos here</p>
            <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP — select multiple at once</p>
          </div>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" disabled={uploading} onChange={(e) => addFiles(e.target.files)} />
          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {previews.map((src, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-square group">
                  <img src={src} className="w-full h-full object-cover" alt="" />
                  {!uploading && (
                    <button onClick={() => remove(i)} className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/70 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition border-0">
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground"><span>Uploading {current} of {files.length}...</span><span>{progress}%</span></div>
              <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: "var(--gradient-gold)" }} initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ ease: "easeOut" }} />
              </div>
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} disabled={uploading} className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold text-navy hover:bg-gray-50 transition bg-transparent disabled:opacity-40">Cancel</button>
            <button type="button" onClick={upload} disabled={uploading || !files.length}
              className="flex-1 rounded-xl py-3 text-sm font-semibold text-navy transition flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ background: "var(--gradient-gold)" }}>
              {uploading ? (<><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>Uploading...</>) : `Upload ${files.length || ""} Photo${files.length !== 1 ? "s" : ""}`}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------- AWARDS PAGE ---------------- */
function AwardsPage() {
  const [awardPhotos, setAwardPhotos] = useState<AwardPhoto[]>(() => {
    try {
      const stored = localStorage.getItem(AWARDS_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_AWARD_PHOTOS;
    } catch { return DEFAULT_AWARD_PHOTOS; }
  });
  const [showAwardModal, setShowAwardModal] = useState(false);
  const [awardLightbox, setAwardLightbox] = useState<string | null>(null);

  const saveAwardPhotos = (updated: AwardPhoto[]) => {
    setAwardPhotos(updated);
    localStorage.setItem(AWARDS_KEY, JSON.stringify(updated));
  };
  const handlePhotoAdd = (p: AwardPhoto) => saveAwardPhotos([...awardPhotos, p]);
  const handlePhotoDelete = async (photo: AwardPhoto) => {
    if (!confirm("Remove this photo?")) return;
    try { await fetch("/api/delete-award-image", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ filename: photo.filename }) }); } catch { /* ok */ }
    saveAwardPhotos(awardPhotos.filter(p => p.id !== photo.id));
  };

  return (
    <Section
      id="awards"
      eyebrow="Recognition & Awards"
      title={<>Our <span className="text-gold-gradient">Awards</span></>}
      subtitle="Celebrating milestones of excellence, trust, and craftsmanship recognized across the industry."
    >
      <div className="flex items-center justify-between mb-8">
        <p className="text-muted-foreground text-sm">
          {awardPhotos.length} photo{awardPhotos.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={() => setShowAwardModal(true)}
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-navy transition hover:opacity-90"
          style={{ background: "var(--gradient-gold)" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Photos
        </button>
      </div>

      {awardPhotos.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-28 rounded-3xl border-2 border-dashed border-border text-center">
          <div className="h-20 w-20 rounded-full grid place-items-center mb-5" style={{ background: "var(--gradient-gold)" }}>
            <Award className="h-9 w-9 text-navy" />
          </div>
          <h3 className="font-display text-2xl text-navy font-semibold mb-2">No award photos yet</h3>
          <p className="text-muted-foreground text-sm max-w-xs mb-6">Upload your award ceremony photos and newspaper clippings here.</p>
          <button onClick={() => setShowAwardModal(true)}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-navy"
            style={{ background: "var(--gradient-gold)" }}>
            Add Your First Photo
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {awardPhotos.map((photo, i) => (
            <motion.div key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
              className="group relative rounded-2xl overflow-hidden gold-border shadow-[var(--shadow-luxe)] aspect-[3/4] cursor-zoom-in"
              onClick={() => setAwardLightbox(photo.path)}
            >
              <img src={photo.path} alt={`Award ${i + 1}`} loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "linear-gradient(to top, oklch(0.14 0.04 258 / 0.7), transparent 60%)" }} />
              <button
                onClick={(e) => { e.stopPropagation(); handlePhotoDelete(photo); }}
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/60 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition border-0 hover:bg-red-600/80"
                title="Remove photo"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6M9 6V4h6v2" />
                </svg>
              </button>
              <div className="absolute bottom-3 right-3 h-7 w-7 rounded-full grid place-items-center bg-white/80 opacity-0 group-hover:opacity-100 transition">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-navy">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {awardLightbox && (
        <div className="fixed inset-0 z-[80] grid place-items-center p-4" style={{ background: "oklch(0.1 0.04 258 / 0.95)" }} onClick={() => setAwardLightbox(null)}>
          <button className="absolute top-6 right-6 text-white p-2 bg-transparent border-0" onClick={() => setAwardLightbox(null)} aria-label="Close"><X /></button>
          <img src={awardLightbox} className="max-h-[90vh] max-w-[90vw] rounded-xl gold-border object-contain shadow-2xl" alt="Award" />
        </div>
      )}

      {showAwardModal && (
        <AwardUploadModal onAdd={handlePhotoAdd} onClose={() => setShowAwardModal(false)} />
      )}
    </Section>
  );
}

function Portfolio() {
  const [tab, setTab] = useState<"photos" | "videos" | "awards">("photos");
  const [cat, setCat] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [videos, setVideos] = useState<VideoEntry[]>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"); } catch { return []; }
  });
  const [showModal, setShowModal] = useState(false);
  const [editVideo, setEditVideo] = useState<VideoEntry | undefined>();

  // Awards photo gallery state
  const [awardPhotos, setAwardPhotos] = useState<AwardPhoto[]>(() => {
    try {
      const stored = localStorage.getItem(AWARDS_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_AWARD_PHOTOS;
    } catch { return DEFAULT_AWARD_PHOTOS; }
  });
  const [showAwardModal, setShowAwardModal] = useState(false);
  const [awardLightbox, setAwardLightbox] = useState<string | null>(null);

  const saveAwardPhotos = (updated: AwardPhoto[]) => {
    setAwardPhotos(updated);
    localStorage.setItem(AWARDS_KEY, JSON.stringify(updated));
  };
  const handlePhotoAdd = (p: AwardPhoto) => saveAwardPhotos([...awardPhotos, p]);
  const handlePhotoDelete = async (photo: AwardPhoto) => {
    if (!confirm("Remove this photo?")) return;
    try { await fetch("/api/delete-award-image", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ filename: photo.filename }) }); } catch { /* ok */ }
    saveAwardPhotos(awardPhotos.filter(p => p.id !== photo.id));
  };

  const saveVideos = (updated: VideoEntry[]) => {
    setVideos(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSave = (v: VideoEntry) => {
    const updated = editVideo
      ? videos.map((x) => (x.id === editVideo.id ? v : x))
      : [...videos, v];
    saveVideos(updated);
    setShowModal(false);
    setEditVideo(undefined);
  };

  const handleDelete = async (video: VideoEntry) => {
    if (!confirm("Remove this video?")) return;
    // Delete file from disk
    try {
      await fetch("/api/delete-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: video.filename }),
      });
    } catch { /* continue even if file delete fails */ }
    saveVideos(videos.filter((v) => v.id !== video.id));
  };

  const items = PORTFOLIO.filter((p) => cat === "All" || p.cat === cat);

  return (
    <Section id="portfolio" eyebrow="Portfolio" title={<>Selected <span className="text-gold-gradient">Work</span></>}
      subtitle="A curated look at the spaces we've had the privilege to design and build.">

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {(["photos", "videos", "awards"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-7 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all capitalize inline-flex items-center gap-2 ${
              tab === t ? "text-navy shadow-[var(--shadow-gold)]" : "text-navy/60 hover:text-navy border border-border"
            }`}
            style={tab === t ? { background: "var(--gradient-gold)" } : undefined}>
            {t === "photos" && <Camera className="h-4 w-4" />}
            {t === "videos" && <Video className="h-4 w-4" />}
            {t === "awards" && <Award className="h-4 w-4" />}
            {t === "photos" ? "Photos" : t === "videos" ? "Videos" : "Awards"}
          </button>
        ))}
      </div>

      {tab === "photos" && (
        <>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all ${
                  cat === c ? "text-navy shadow-[var(--shadow-gold)]" : "text-navy/70 hover:text-navy border border-border"
                }`}
                style={cat === c ? { background: "var(--gradient-gold)" } : undefined}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] md:auto-rows-[260px] gap-4">
            {items.map((p, i) => (
              <motion.button
                key={i} onClick={() => setLightbox(p.img)}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
                className={`group relative overflow-hidden rounded-2xl gold-border ${i % 5 === 0 ? "md:row-span-2" : ""}`}
              >
                <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(to top, oklch(0.14 0.04 258 / 0.9), transparent 60%)" }} />
                <div className="absolute inset-x-0 bottom-0 p-5 text-left translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <div className="eyebrow !text-[10px]">{p.cat}</div>
                  <div className="font-display text-white text-xl mt-1">{p.title}</div>
                </div>
              </motion.button>
            ))}
          </div>
          {lightbox && (
            <div className="fixed inset-0 z-[80] grid place-items-center p-4" style={{ background: "oklch(0.1 0.04 258 / 0.95)" }} onClick={() => setLightbox(null)}>
              <button className="absolute top-6 right-6 text-white p-2" onClick={() => setLightbox(null)} aria-label="Close"><X /></button>
              <img src={lightbox} className="max-h-[90vh] max-w-[90vw] rounded-xl gold-border object-contain" alt="" />
            </div>
          )}
        </>
      )}

      {/* VIDEOS TAB */}
      {tab === "videos" && (
        <>
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground text-sm">
              {videos.length} video{videos.length !== 1 ? "s" : ""} in your collection
            </p>
            <button
              onClick={() => { setEditVideo(undefined); setShowModal(true); }}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-navy transition hover:opacity-90"
              style={{ background: "var(--gradient-gold)" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Upload Video
            </button>
          </div>

          {videos.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 rounded-3xl border-2 border-dashed border-border text-center">
              <div className="h-20 w-20 rounded-full grid place-items-center mb-5" style={{ background: "var(--gradient-gold)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-9 w-9 text-navy">
                  <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl text-navy font-semibold mb-2">No videos yet</h3>
              <p className="text-muted-foreground text-sm max-w-xs mb-6">
                Upload MP4, MOV, WebM or AVI files directly to showcase your project walkthroughs.
              </p>
              <button
                onClick={() => { setEditVideo(undefined); setShowModal(true); }}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-navy"
                style={{ background: "var(--gradient-gold)" }}
              >
                Upload Your First Video
              </button>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((v) => (
                <VideoCard
                  key={v.id}
                  video={v}
                  onEdit={() => { setEditVideo(v); setShowModal(true); }}
                  onDelete={() => handleDelete(v)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* AWARDS TAB */}
      {tab === "awards" && (
        <>
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground text-sm">
              {awardPhotos.length} photo{awardPhotos.length !== 1 ? "s" : ""}
            </p>
            <button
              onClick={() => setShowAwardModal(true)}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-navy transition hover:opacity-90"
              style={{ background: "var(--gradient-gold)" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Photos
            </button>
          </div>

          {awardPhotos.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-28 rounded-3xl border-2 border-dashed border-border text-center">
              <div className="h-20 w-20 rounded-full grid place-items-center mb-5" style={{ background: "var(--gradient-gold)" }}>
                <Award className="h-9 w-9 text-navy" />
              </div>
              <h3 className="font-display text-2xl text-navy font-semibold mb-2">No award photos yet</h3>
              <p className="text-muted-foreground text-sm max-w-xs mb-6">Upload your award ceremony photos and newspaper clippings here.</p>
              <button onClick={() => setShowAwardModal(true)}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-navy"
                style={{ background: "var(--gradient-gold)" }}>
                Add Your First Photo
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {awardPhotos.map((photo, i) => (
                <motion.div key={photo.id}
                  initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
                  className="group relative rounded-2xl overflow-hidden gold-border shadow-[var(--shadow-luxe)] aspect-[3/4] cursor-zoom-in"
                  onClick={() => setAwardLightbox(photo.path)}
                >
                  <img src={photo.path} alt={`Award ${i + 1}`} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "linear-gradient(to top, oklch(0.14 0.04 258 / 0.7), transparent 60%)" }} />
                  {/* Delete button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePhotoDelete(photo); }}
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/60 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition border-0 hover:bg-red-600/80"
                    title="Remove photo"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6M9 6V4h6v2" />
                    </svg>
                  </button>
                  {/* Expand icon */}
                  <div className="absolute bottom-3 right-3 h-7 w-7 rounded-full grid place-items-center bg-white/80 opacity-0 group-hover:opacity-100 transition">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-navy">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Lightbox */}
          {awardLightbox && (
            <div className="fixed inset-0 z-[80] grid place-items-center p-4" style={{ background: "oklch(0.1 0.04 258 / 0.95)" }} onClick={() => setAwardLightbox(null)}>
              <button className="absolute top-6 right-6 text-white p-2 bg-transparent border-0" onClick={() => setAwardLightbox(null)} aria-label="Close"><X /></button>
              <img src={awardLightbox} className="max-h-[90vh] max-w-[90vw] rounded-xl gold-border object-contain shadow-2xl" alt="Award" />
            </div>
          )}
        </>
      )}

      {/* Upload / Edit Video Modal */}
      {showModal && (
        <VideoUploadModal
          initial={editVideo}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditVideo(undefined); }}
        />
      )}

      {/* Award Photo Upload Modal */}
      {showAwardModal && (
        <AwardUploadModal onAdd={handlePhotoAdd} onClose={() => setShowAwardModal(false)} />
      )}

    </Section>
  );
}


/* ---------------- PROJECTS ---------------- */
const PROJECTS = [
  { img: "/pic 19.jpeg", title: "Sky Crest Villa", desc: "A modernist 6,500 sq.ft villa featuring floor-to-ceiling glass, a floating staircase and cantilevered pool deck.", location: "Jubilee Hills, Hyderabad", size: "6,500 sq.ft", time: "14 months" },
  { img: "/pic 10.jpeg", title: "Meridian Corporate HQ", desc: "A warm-wood executive suite designed for a leading fintech, blending Japandi calm with corporate authority.", location: "HITEC City, Hyderabad", size: "18,000 sq.ft", time: "8 months" },
  { img: "/pic 3.jpeg", title: "Indigo Culinary Studio", desc: "Navy-and-brass modular kitchen with quartz island, integrated appliances and warm ambient lighting.", location: "Kondapur", size: "420 sq.ft", time: "6 weeks" },
  { img: "/pic 22.jpeg", title: "Velvet Master Suite", desc: "A tufted, layered master bedroom finished in bronze, marble and hand-loomed textiles.", location: "Banjara Hills", size: "680 sq.ft", time: "10 weeks" },
];
function Projects({ onTabChange }: { onTabChange: (tabId: string) => void }) {
  return (
    <Section id="projects" eyebrow="Featured Projects" title={<>Signature <span className="text-gold-gradient">Projects</span></>}>
      <div className="space-y-16 md:space-y-24">
        {PROJECTS.map((p, i) => (
          <motion.div key={p.title} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
            <div className="lg:[direction:ltr] relative overflow-hidden rounded-3xl gold-border shadow-[var(--shadow-luxe)] group">
              <img src={p.img} alt={p.title} loading="lazy" className="w-full h-[460px] object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <div className="lg:[direction:ltr]">
              <div className="eyebrow mb-3">Project 0{i + 1}</div>
              <h3 className="font-display text-3xl md:text-5xl text-navy font-semibold">{p.title}</h3>
              <p className="mt-5 text-muted-foreground leading-relaxed">{p.desc}</p>
              <dl className="mt-8 grid grid-cols-3 gap-6">
                {[["Location", p.location], ["Size", p.size], ["Timeline", p.time]].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{k}</dt>
                    <dd className="mt-1 text-sm font-semibold text-navy">{v}</dd>
                  </div>
                ))}
              </dl>
              <button onClick={() => onTabChange("portfolio")} className="mt-8 inline-flex items-center gap-2 text-navy font-semibold group cursor-pointer bg-transparent border-0 focus:outline-none">
                View Gallery <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- STATS ---------------- */
function Stats() {
  const items = [
    { n: 700, s: "+", label: "Happy Clients" },
    { n: 150, s: "+", label: "Completed Projects" },
    { n: 20, s: "+", label: "Design Experts" },
    { n: 10, s: "+", label: "Years Experience" },
    { n: 98, s: "%", label: "Client Satisfaction" },
  ];
  return (
    <section className="relative py-24 text-white overflow-hidden" style={{ background: "var(--gradient-navy)" }}>
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, oklch(0.78 0.13 85 / 0.2), transparent 50%)" }} />
      <div className="container-luxe relative grid grid-cols-2 md:grid-cols-5 gap-10 text-center">
        {items.map((i) => (
          <motion.div key={i.label} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <div className="font-display text-5xl md:text-6xl font-bold text-gold-gradient">
              <Counter end={i.n} suffix={i.s} />
            </div>
            <div className="mt-2 text-xs md:text-sm uppercase tracking-[0.25em] text-white/70">{i.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
const TESTIMONIALS = [
  { q: "Our dream villa exceeded expectations. Every detail was executed flawlessly.", n: "Ananya & Rohit S.", r: "Villa Owner" },
  { q: "Excellent quality and a truly professional team from the first sketch to the final walkthrough.", n: "Karthik R.", r: "Managing Director" },
  { q: "Highly recommended for premium interiors — thoughtful, elegant and beautifully finished.", n: "Priya M.", r: "Homeowner" },
  { q: "Timely delivery and outstanding workmanship. They set a new standard for our office.", n: "Vikram J.", r: "CEO, Meridian" },
];
function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);
  const t = TESTIMONIALS[i];
  return (
    <Section id="testimonials" eyebrow="Testimonials" title={<>Words From Our <span className="text-gold-gradient">Clients</span></>}>
      <div className="mx-auto max-w-4xl">
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white p-10 md:p-14 text-center gold-border shadow-[var(--shadow-luxe)]">
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-5 w-5 fill-[color:var(--gold)] text-[color:var(--gold)]" />)}
          </div>
          <p className="font-display text-2xl md:text-3xl text-navy leading-snug">"{t.q}"</p>
          <div className="mt-8">
            <div className="font-semibold text-navy">{t.n}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{t.r}</div>
          </div>
        </motion.div>
        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((_, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`}
              className={`h-2 rounded-full transition-all ${i === k ? "w-8" : "w-2"}`}
              style={{ background: i === k ? "var(--gradient-gold)" : "oklch(0.85 0.02 260)" }} />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQ = [
  { q: "Do you provide turnkey projects?", a: "Yes — we manage every phase from architecture and civil works to interior installation and final handover, so you can move in without lifting a finger." },
  { q: "How long does construction take?", a: "Timelines depend on scope. A luxury villa typically completes in 10–14 months, an apartment interior in 6–10 weeks, and commercial fit-outs in 4–8 months." },
  { q: "Can I customize my interiors?", a: "Absolutely. Every project is designed around your lifestyle, preferences and material palette. Nothing we deliver is off-the-shelf." },
  { q: "Do you provide 3D designs?", a: "Yes. Photorealistic 3D walkthroughs are part of every design engagement so you can experience the space before we build it." },
  { q: "Do you work internationally?", a: "We serve clients across India and the Middle East, with select international turnkey projects. Get in touch to discuss your location." },
  { q: "What is your pricing process?", a: "After an initial consultation and site visit, we share a transparent proposal with itemized scope, materials and timelines — no hidden costs." },
];
function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" eyebrow="FAQ" title={<>Frequently <span className="text-gold-gradient">Asked</span></>}>
      <div className="mx-auto max-w-3xl space-y-3">
        {FAQ.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="rounded-2xl bg-white gold-border overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-6 p-6 text-left">
                <span className="font-display text-lg md:text-xl text-navy">{f.q}</span>
                <ChevronDown className={`h-5 w-5 text-gold shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Section id="contact" eyebrow="Get In Touch" title={<>Let's Build Something <span className="text-gold-gradient">Extraordinary</span></>}
      subtitle="Share a few details and our team will reach out within 24 hours.">
      <div className="grid lg:grid-cols-5 gap-10">
        <motion.form
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="lg:col-span-3 rounded-3xl bg-white p-8 md:p-10 gold-border shadow-[var(--shadow-luxe)] space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { n: "name", l: "Name", t: "text" },
              { n: "phone", l: "Phone", t: "tel" },
              { n: "email", l: "Email", t: "email" },
              { n: "location", l: "Location", t: "text" },
            ].map((f) => (
              <label key={f.n} className="block">
                <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{f.l}</span>
                <input required name={f.n} type={f.t}
                  className="mt-2 block w-full rounded-lg border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20 transition" />
              </label>
            ))}
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Project Type</span>
              <select name="type" className="mt-2 block w-full rounded-lg border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-[color:var(--gold)]">
                <option>Residential Construction</option>
                <option>Luxury Villa</option>
                <option>Apartment Interiors</option>
                <option>Office Interiors</option>
                <option>Commercial Construction</option>
                <option>Turnkey Project</option>
                <option>Renovation</option>
              </select>
            </label>
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Budget</span>
              <select name="budget" className="mt-2 block w-full rounded-lg border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-[color:var(--gold)]">
                <option>Under ₹10 Lakh</option>
                <option>₹10 – 25 Lakh</option>
                <option>₹25 – 75 Lakh</option>
                <option>₹75 Lakh – 2 Cr</option>
                <option>₹2 Cr+</option>
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Message</span>
            <textarea name="message" rows={4}
              className="mt-2 block w-full rounded-lg border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20 transition" />
          </label>
          <button type="submit" className="btn-gold btn-gold-hover w-full md:w-auto">
            {sent ? <><CheckCircle2 className="h-4 w-4" /> Sent — we'll be in touch</> : <>Submit Enquiry <ArrowRight className="h-4 w-4" /></>}
          </button>
        </motion.form>

        <div className="lg:col-span-2 space-y-5">
          {/* Email */}
          <a
            href="mailto:moonconstructionandinteriors@gmail.com"
            onClick={(e) => { e.preventDefault(); window.open("mailto:moonconstructionandinteriors@gmail.com", "_self"); }}
            className="flex gap-4 rounded-2xl p-6 gold-border bg-white hover:shadow-[var(--shadow-luxe)] transition-shadow cursor-pointer"
          >
            <div className="h-11 w-11 shrink-0 rounded-xl grid place-items-center" style={{ background: "var(--gradient-gold)" }}>
              <Mail className="h-5 w-5 text-navy" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Email</div>
              <div className="mt-1 text-sm text-navy font-medium leading-relaxed">moonconstructionandinteriors@gmail.com</div>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+919000169145"
            className="flex gap-4 rounded-2xl p-6 gold-border bg-white hover:shadow-[var(--shadow-luxe)] transition-shadow"
          >
            <div className="h-11 w-11 shrink-0 rounded-xl grid place-items-center" style={{ background: "var(--gradient-gold)" }}>
              <Phone className="h-5 w-5 text-navy" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Phone</div>
              <div className="mt-1 text-sm text-navy font-medium leading-relaxed">+91 90001 69145</div>
            </div>
          </a>

          {/* Location */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Samridhi+Vasyam+Capital+Park+Road+Madhapur+Hyderabad+500081"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-4 rounded-2xl p-6 gold-border bg-white hover:shadow-[var(--shadow-luxe)] transition-shadow"
          >
            <div className="h-11 w-11 shrink-0 rounded-xl grid place-items-center" style={{ background: "var(--gradient-gold)" }}>
              <MapPin className="h-5 w-5 text-navy" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Studio</div>
              <div className="mt-1 text-sm text-navy font-medium leading-relaxed">Second Floor, Samridhi Vasyam, D No 1/98/9/3/23, Capital Park Road, Beside Narayana High School, Cyber Hills Colony, VIP Hills, Jaihind Enclave, Madhapur, Hyderabad, Telangana 500081</div>
            </div>
          </a>
          <div className="rounded-2xl overflow-hidden gold-border h-64">
            <iframe
              title="Studio location"
              src="https://www.google.com/maps?q=Madhapur+Hyderabad+VIP+Hills&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer({ onTabChange }: { onTabChange: (tabId: string) => void }) {
  return (
    <footer className="relative text-white pt-20 pb-8" style={{ background: "var(--gradient-navy)" }}>
      <div className="container-luxe">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4">
              <button onClick={() => onTabChange("home")} className="flex items-center gap-4 cursor-pointer text-left bg-transparent border-0 p-0 focus:outline-none">
                <img src={logo} alt="Moon Construction & Interiors" className="h-16 w-16 object-contain" />
                <div>
                  <div className="font-display text-2xl text-white">Moon</div>
                  <div className="text-[11px] tracking-[0.3em] text-gold uppercase">Construction & Interiors</div>
                </div>
              </button>
            </div>
            <p className="mt-6 max-w-md text-white/70 leading-relaxed">
              Building Spaces. Designing Dreams. Inspiring Futures. Premium construction and
              interior design trusted by 700+ clients worldwide.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Linkedin].map((I, k) => (
                <a key={k} href="#" className="h-10 w-10 rounded-full grid place-items-center gold-border hover:bg-gold/10 transition-colors">
                  <I className="h-4 w-4 text-gold" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow mb-4">Quick Links</div>
            <ul className="space-y-2 text-white/70 text-sm">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button onClick={() => onTabChange(n.id)} className="hover:text-gold transition-colors cursor-pointer bg-transparent border-0 p-0 text-white/70 text-left">
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-4">Contact</div>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex gap-2">
                <Mail className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <a
                  href="mailto:moonconstructionandinteriors@gmail.com"
                  onClick={(e) => { e.preventDefault(); window.open("mailto:moonconstructionandinteriors@gmail.com", "_self"); }}
                  className="hover:text-gold transition-colors cursor-pointer"
                >
                  moonconstructionandinteriors@gmail.com
                </a>
              </li>
              <li className="flex gap-2">
                <Phone className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <a href="tel:+919000169145" className="hover:text-gold transition-colors">+91 90001 69145</a>
              </li>
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Samridhi+Vasyam+Capital+Park+Road+Madhapur+Hyderabad+500081"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Madhapur, Hyderabad — 500081
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Moon Construction & Interiors. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- FLOATING ---------------- */
function Floating() {
  const [top, setTop] = useState(false);
  useEffect(() => {
    const on = () => setTop(window.scrollY > 600);
    on(); window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!top) return null;
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="h-12 w-12 rounded-full grid place-items-center text-navy shadow-[var(--shadow-luxe)] transition-transform hover:-translate-y-1"
        style={{ background: "var(--gradient-gold)" }}>
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}

function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div style={{ scaleX, transformOrigin: "0% 50%", background: "var(--gradient-gold)" }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[70]" />
  );
}

export const VALID_TABS = ["home", "about", "services", "portfolio", "projects", "testimonials", "faq", "contact"];

export function Index() {
  const router = useRouter();
  const location = useLocation();
  const activeTab = location.pathname.split("/").filter(Boolean)[0] ?? "home";

  const handleTabChange = (tabId: string) => {
    if (tabId === "home") {
      router.navigate({ to: "/" });
    } else {
      router.navigate({ to: "/$tab", params: { tab: tabId } });
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            <Hero onTabChange={handleTabChange} />
            <AwardsMarquee />
          </>
        );
      case "about":
        return (
          <>
            <About />
            <Stats />
          </>
        );
      case "services":
        return (
          <>
            <Services />
            <Process />
          </>
        );
      case "awards":
        return <AwardsPage />;
      case "portfolio":
        return <Portfolio />;
      case "projects":
        return <Projects onTabChange={handleTabChange} />;
      case "testimonials":
        return <Testimonials />;
      case "faq":
        return <FAQSection />;
      case "contact":
        return <Contact />;
      default:
        return <Hero onTabChange={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollBar />
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onTabChange={handleTabChange} />
      <Floating />
    </div>
  );
}
