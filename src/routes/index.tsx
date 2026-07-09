import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useScroll, useSpring, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, ArrowUp, Award, Building2, CheckCircle2, ChevronDown, Clock, Compass,
  Facebook, Hammer, HardHat, Home, Instagram, Layers, Layout, Leaf, Lightbulb,
  Linkedin, Mail, MapPin, Menu, MessageCircle, Palette, Phone, Ruler, ShieldCheck,
  Sofa, Sparkles, Star, Trees, Users, Utensils, X,
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
const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl border-b border-white/10" : ""
      }`}
      style={{ background: scrolled ? "oklch(0.16 0.05 258 / 0.85)" : "transparent" }}
    >
      <div className="container-luxe flex items-center justify-between py-3">
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt="Moon Construction & Interiors" className="h-12 w-12 md:h-14 md:w-14 object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]" />
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-white text-lg font-semibold tracking-wide">Moon</div>
            <div className="text-[10px] tracking-[0.3em] text-gold uppercase">Construction & Interiors</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="group relative text-sm text-white/85 hover:text-white transition-colors">
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden lg:inline-flex btn-gold btn-gold-hover !py-2.5 !px-5 !text-xs">
          Get Quote <ArrowRight className="h-3.5 w-3.5" />
        </a>
        <button className="lg:hidden text-white p-2" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu />
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" style={{ background: "oklch(0.14 0.04 258 / 0.98)" }}>
          <div className="flex items-center justify-between container-luxe py-4">
            <img src={logo} alt="" className="h-12 w-12 object-contain" />
            <button className="text-white p-2" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
          </div>
          <div className="container-luxe mt-10 flex flex-col gap-5">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)}
                className="text-2xl font-display text-white/90 hover:text-gold transition-colors">
                {n.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-gold btn-gold-hover mt-4 self-start">Get Quote</a>
          </div>
        </div>
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

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroVilla} alt="Luxury modern villa" className="h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, oklch(0.14 0.04 258 / 0.92) 0%, oklch(0.18 0.05 258 / 0.65) 60%, oklch(0.14 0.04 258 / 0.85) 100%)" }} />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, oklch(0.78 0.13 85 / 0.25), transparent 40%)",
        }} />
      </div>

      <div className="container-luxe relative z-10 pt-32 pb-20 md:pt-40">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div initial="hidden" animate="show" variants={fadeUp} className="eyebrow mb-6">
              ✦ Premium Construction & Interior Design
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
              <a href="#contact" className="btn-gold btn-gold-hover">
                Get Free Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#portfolio" className="btn-outline-gold hover:bg-white/10">View Portfolio</a>
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

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-4 hidden lg:block">
            <div className="glass-card rounded-2xl p-8 text-white">
              <div className="eyebrow mb-4">Since 2015</div>
              <p className="font-display text-2xl leading-snug">
                "Engineering excellence meets timeless design — crafted for the way you live."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[Award, ShieldCheck, Sparkles].map((I, i) => (
                    <div key={i} className="h-9 w-9 rounded-full grid place-items-center gold-border" style={{ background: "oklch(0.22 0.06 258 / 0.6)" }}>
                      <I className="h-4 w-4 text-gold" />
                    </div>
                  ))}
                </div>
                <div className="text-xs text-white/70">Award-winning craftsmanship</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-gold transition-colors">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </a>
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
  { img: heroVilla, cat: "Luxury Villas", title: "Skyline Villa" },
  { img: livingRoom, cat: "Living Rooms", title: "Golden Lounge" },
  { img: kitchenImg, cat: "Modular Kitchens", title: "Midnight Kitchen" },
  { img: officeImg, cat: "Offices", title: "Boardroom Suite" },
  { img: bedroomImg, cat: "Bedrooms", title: "Velvet Retreat" },
  { img: commercialImg, cat: "Commercial", title: "Downtown Tower" },
  { img: livingRoom, cat: "Living Rooms", title: "Marble Salon" },
  { img: kitchenImg, cat: "Modular Kitchens", title: "Chef's Island" },
];
function Portfolio() {
  const [cat, setCat] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const items = PORTFOLIO.filter((p) => cat === "All" || p.cat === cat);
  return (
    <Section id="portfolio" eyebrow="Portfolio" title={<>Selected <span className="text-gold-gradient">Work</span></>}
      subtitle="A curated look at the spaces we've had the privilege to design and build.">
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
    </Section>
  );
}

/* ---------------- PROJECTS ---------------- */
const PROJECTS = [
  { img: heroVilla, title: "Sky Crest Villa", desc: "A modernist 6,500 sq.ft villa featuring floor-to-ceiling glass, a floating staircase and cantilevered pool deck.", location: "Jubilee Hills, Hyderabad", size: "6,500 sq.ft", time: "14 months" },
  { img: officeImg, title: "Meridian Corporate HQ", desc: "A warm-wood executive suite designed for a leading fintech, blending Japandi calm with corporate authority.", location: "HITEC City, Hyderabad", size: "18,000 sq.ft", time: "8 months" },
  { img: kitchenImg, title: "Indigo Culinary Studio", desc: "Navy-and-brass modular kitchen with quartz island, integrated appliances and warm ambient lighting.", location: "Kondapur", size: "420 sq.ft", time: "6 weeks" },
  { img: bedroomImg, title: "Velvet Master Suite", desc: "A tufted, layered master bedroom finished in bronze, marble and hand-loomed textiles.", location: "Banjara Hills", size: "680 sq.ft", time: "10 weeks" },
];
function Projects() {
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
              <a href="#portfolio" className="mt-8 inline-flex items-center gap-2 text-navy font-semibold group">
                View Gallery <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
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
          {[
            { icon: Mail, label: "Email", value: "moonconstructionandinteriors@gmail.com", href: "mailto:moonconstructionandinteriors@gmail.com" },
            { icon: Phone, label: "Phone", value: "+91 — Available on request", href: "#" },
            { icon: MapPin, label: "Studio", value: "Second Floor, Samridhi Vasyam, D No 1/98/9/3/23, Capital Park Road, Beside Narayana High School, Cyber Hills Colony, VIP Hills, Jaihind Enclave, Madhapur, Hyderabad, Telangana 500081" },
          ].map((c) => (
            <a key={c.label} href={c.href} className="flex gap-4 rounded-2xl p-6 gold-border bg-white hover:shadow-[var(--shadow-luxe)] transition-shadow">
              <div className="h-11 w-11 shrink-0 rounded-xl grid place-items-center" style={{ background: "var(--gradient-gold)" }}>
                <c.icon className="h-5 w-5 text-navy" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{c.label}</div>
                <div className="mt-1 text-sm text-navy font-medium leading-relaxed">{c.value}</div>
              </div>
            </a>
          ))}
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
function Footer() {
  return (
    <footer className="relative text-white pt-20 pb-8" style={{ background: "var(--gradient-navy)" }}>
      <div className="container-luxe">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Moon Construction & Interiors" className="h-16 w-16 object-contain" />
              <div>
                <div className="font-display text-2xl">Moon</div>
                <div className="text-[11px] tracking-[0.3em] text-gold uppercase">Construction & Interiors</div>
              </div>
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
              {NAV.map((n) => <li key={n.href}><a href={n.href} className="hover:text-gold transition-colors">{n.label}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-4">Contact</div>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex gap-2"><Mail className="h-4 w-4 text-gold shrink-0 mt-0.5" /> moonconstructionandinteriors@gmail.com</li>
              <li className="flex gap-2"><MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" /> Madhapur, Hyderabad — 500081</li>
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

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollBar />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Portfolio />
        <Projects />
        <Stats />
        <Testimonials />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
      <Floating />
    </div>
  );
}
