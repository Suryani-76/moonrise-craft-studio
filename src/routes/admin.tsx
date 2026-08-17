import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, LogOut, Save, RefreshCw, Download, Upload, Plus, Trash2, Edit3, Image as ImageIcon,
  Video as VideoIcon, Award, Building2, Home, Sofa, Sparkles, MessageSquare, Phone, Globe, Shield, Check, X, ArrowLeft
} from "lucide-react";
import {
  useSiteData, resetSiteData, DEFAULT_SITE_DATA,
  type SiteData, type ServiceItem, type PortfolioPhotoItem, type AwardPhotoItem, type ProjectItem, type TestimonialItem
} from "@/lib/siteData";
import logo from "@/assets/moon-logo.png";

export const Route = createFileRoute("/admin")({
  head: () => ({
    title: "Admin Panel — Moon Construction & Interiors",
  }),
  component: AdminPage,
});

function AdminPage() {
  const [siteData, setSiteData] = useSiteData();
  const [authed, setAuthed] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("moon_admin_authed") === "true";
  });
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "hero" | "about" | "services" | "photos" | "videos" | "awards" | "projects" | "testimonials" | "contact" | "settings"
  >("hero");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === siteData.adminPassword) {
      sessionStorage.setItem("moon_admin_authed", "true");
      setAuthed(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect password. Default is admin123");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("moon_admin_authed");
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: "var(--gradient-navy)" }}>
        {/* Glow backdrop */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 50% 30%, oklch(0.78 0.13 85 / 0.3), transparent 60%)" }} />

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md glass-card rounded-3xl p-8 text-white shadow-2xl border border-white/20 relative z-10">
          <div className="text-center mb-8">
            <img src={logo} alt="Moon Construction" className="h-16 w-16 mx-auto mb-3 object-contain drop-shadow-[0_2px_10px_rgba(212,175,55,0.6)]" />
            <h1 className="font-display text-2xl font-bold">Admin Portal</h1>
            <p className="text-xs text-white/70 mt-1 uppercase tracking-widest">Moon Construction & Interiors</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gold mb-2">Admin Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter password..."
                  value={passwordInput}
                  onChange={(e) => { setPasswordInput(e.target.value); setAuthError(""); }}
                  className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-gold transition"
                />
                <Lock className="absolute right-3.5 top-3.5 h-4 w-4 text-white/50" />
              </div>
              {authError && <p className="text-red-400 text-xs mt-2">{authError}</p>}
            </div>

            <button type="submit" className="btn-gold btn-gold-hover w-full justify-center py-3 text-sm font-semibold cursor-pointer border-0">
              Access Admin CMS
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-xs text-white/70 hover:text-gold transition">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Main Website
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-5 right-5 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 font-medium text-sm">
            <Check className="h-4 w-4" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="h-10 w-10 object-contain" />
          <div>
            <div className="font-display font-bold text-lg text-white leading-tight">Moon Admin CMS</div>
            <div className="text-[10px] text-amber-400 tracking-widest uppercase font-semibold">Full Website Management</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/" className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition flex items-center gap-2">
            <Home className="h-3.5 w-3.5 text-amber-400" /> View Website
          </Link>
          <button onClick={handleLogout} className="px-4 py-2 rounded-xl bg-red-900/40 border border-red-700/50 hover:bg-red-900/70 text-xs font-semibold text-red-300 transition flex items-center gap-2 cursor-pointer">
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* Body Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 border-r border-slate-800 bg-slate-900/50 p-4 space-y-1 shrink-0">
          {[
            { id: "hero", label: "Hero & Banner", icon: Sparkles },
            { id: "about", label: "About & Founder", icon: Building2 },
            { id: "services", label: "Services", icon: Sofa },
            { id: "photos", label: "Portfolio Photos", icon: ImageIcon },
            { id: "videos", label: "Videos Gallery", icon: VideoIcon },
            { id: "awards", label: "Awards & Marquee", icon: Award },
            { id: "projects", label: "Featured Projects", icon: Building2 },
            { id: "testimonials", label: "Testimonials", icon: MessageSquare },
            { id: "contact", label: "Contact & Socials", icon: Phone },
            { id: "settings", label: "Settings & Backup", icon: Shield },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as typeof activeTab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition cursor-pointer text-left border-0 ${
                  active ? "bg-amber-400 text-slate-950 font-bold shadow-lg" : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Main Content Form Panel */}
        <main className="flex-1 p-6 md:p-10 max-w-5xl overflow-y-auto">
          {activeTab === "hero" && (
            <HeroEditor siteData={siteData} setSiteData={setSiteData} showToast={showToast} />
          )}
          {activeTab === "about" && (
            <AboutEditor siteData={siteData} setSiteData={setSiteData} showToast={showToast} />
          )}
          {activeTab === "services" && (
            <ServicesEditor siteData={siteData} setSiteData={setSiteData} showToast={showToast} />
          )}
          {activeTab === "photos" && (
            <PhotosEditor siteData={siteData} setSiteData={setSiteData} showToast={showToast} />
          )}
          {activeTab === "videos" && (
            <VideosEditor siteData={siteData} setSiteData={setSiteData} showToast={showToast} />
          )}
          {activeTab === "awards" && (
            <AwardsEditor siteData={siteData} setSiteData={setSiteData} showToast={showToast} />
          )}
          {activeTab === "projects" && (
            <ProjectsEditor siteData={siteData} setSiteData={setSiteData} showToast={showToast} />
          )}
          {activeTab === "testimonials" && (
            <TestimonialsEditor siteData={siteData} setSiteData={setSiteData} showToast={showToast} />
          )}
          {activeTab === "contact" && (
            <ContactEditor siteData={siteData} setSiteData={setSiteData} showToast={showToast} />
          )}
          {activeTab === "settings" && (
            <SettingsEditor siteData={siteData} setSiteData={setSiteData} showToast={showToast} />
          )}
        </main>
      </div>
    </div>
  );
}

/* ---------------- EDITORS ---------------- */

function HeroEditor({ siteData, setSiteData, showToast }: { siteData: SiteData; setSiteData: (d: SiteData) => void; showToast: (m: string) => void }) {
  const [form, setForm] = useState(siteData.hero);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSiteData({ ...siteData, hero: form });
    showToast("Hero section updated successfully!");
  };

  return (
    <form onSubmit={save} className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Edit Hero & Banner</h2>
          <p className="text-xs text-slate-400 mt-1">Main banner text, headline, stats counter, and founder hero card.</p>
        </div>
        <button type="submit" className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer border-0">
          <Save className="h-4 w-4" /> Save Hero Changes
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <label className="block space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Eyebrow Badge</span>
          <input type="text" value={form.eyebrow} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
        </label>
        <label className="block space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Headline Line 1</span>
          <input type="text" value={form.titleLine1} onChange={(e) => setForm({ ...form, titleLine1: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
        </label>
        <label className="block space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Headline Line 2 (Italic Gold)</span>
          <input type="text" value={form.titleLine2} onChange={(e) => setForm({ ...form, titleLine2: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
        </label>
        <label className="block space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Headline Line 3</span>
          <input type="text" value={form.titleLine3} onChange={(e) => setForm({ ...form, titleLine3: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Subtitle Text</span>
        <textarea rows={3} value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
      </label>

      <div className="grid md:grid-cols-3 gap-5">
        <label className="block space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Happy Clients Count</span>
          <input type="number" value={form.happyClientsCount} onChange={(e) => setForm({ ...form, happyClientsCount: Number(e.target.value) })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
        </label>
        <label className="block space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Projects Count</span>
          <input type="number" value={form.projectsCount} onChange={(e) => setForm({ ...form, projectsCount: Number(e.target.value) })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
        </label>
        <label className="block space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Years Experience</span>
          <input type="number" value={form.yearsExperience} onChange={(e) => setForm({ ...form, yearsExperience: Number(e.target.value) })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
        </label>
      </div>

      <div className="border-t border-slate-800 pt-5 space-y-5">
        <h3 className="font-display font-semibold text-lg text-white">Founder Hero Card</h3>
        <div className="grid md:grid-cols-2 gap-5">
          <label className="block space-y-2">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Founder Name</span>
            <input type="text" value={form.founderName} onChange={(e) => setForm({ ...form, founderName: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
          </label>
          <label className="block space-y-2">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Founder Title</span>
            <input type="text" value={form.founderTitle} onChange={(e) => setForm({ ...form, founderTitle: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
          </label>
        </div>
        <label className="block space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Founder Quote</span>
          <textarea rows={2} value={form.founderQuote} onChange={(e) => setForm({ ...form, founderQuote: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
        </label>
      </div>
    </form>
  );
}

function AboutEditor({ siteData, setSiteData, showToast }: { siteData: SiteData; setSiteData: (d: SiteData) => void; showToast: (m: string) => void }) {
  const [form, setForm] = useState(siteData.about);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSiteData({ ...siteData, about: form });
    showToast("About section updated!");
  };

  return (
    <form onSubmit={save} className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Edit About & Founder Section</h2>
          <p className="text-xs text-slate-400 mt-1">Company history, founder biography, and vision statement.</p>
        </div>
        <button type="submit" className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer border-0">
          <Save className="h-4 w-4" /> Save About Changes
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <label className="block space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Section Eyebrow</span>
          <input type="text" value={form.eyebrow} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
        </label>
        <label className="block space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Section Title</span>
          <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Paragraph 1</span>
        <textarea rows={3} value={form.paragraph1} onChange={(e) => setForm({ ...form, paragraph1: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
      </label>

      <label className="block space-y-2">
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Paragraph 2</span>
        <textarea rows={3} value={form.paragraph2} onChange={(e) => setForm({ ...form, paragraph2: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
      </label>

      <div className="border-t border-slate-800 pt-5 space-y-5">
        <h3 className="font-display font-semibold text-lg text-white">Founder Profile Card (About Page)</h3>
        <div className="grid md:grid-cols-2 gap-5">
          <label className="block space-y-2">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Founder Name</span>
            <input type="text" value={form.founderName} onChange={(e) => setForm({ ...form, founderName: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
          </label>
          <label className="block space-y-2">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Founder Role</span>
            <input type="text" value={form.founderRole} onChange={(e) => setForm({ ...form, founderRole: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
          </label>
        </div>
        <label className="block space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Founder Mission Quote</span>
          <textarea rows={2} value={form.founderQuote} onChange={(e) => setForm({ ...form, founderQuote: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
        </label>
      </div>
    </form>
  );
}

function ServicesEditor({ siteData, setSiteData, showToast }: { siteData: SiteData; setSiteData: (d: SiteData) => void; showToast: (m: string) => void }) {
  const [list, setList] = useState<ServiceItem[]>(siteData.services);
  const [newName, setNewName] = useState("");

  const save = () => {
    setSiteData({ ...siteData, services: list });
    showToast("Services saved!");
  };

  const add = () => {
    if (!newName.trim()) return;
    const newItem: ServiceItem = {
      id: "s-" + Date.now(),
      iconName: "Sparkles",
      name: newName.trim(),
      description: "Custom premium engineering service.",
    };
    const updated = [...list, newItem];
    setList(updated);
    setSiteData({ ...siteData, services: updated });
    setNewName("");
    showToast("Service added!");
  };

  const remove = (id: string) => {
    const updated = list.filter((s) => s.id !== id);
    setList(updated);
    setSiteData({ ...siteData, services: updated });
    showToast("Service deleted!");
  };

  const updateItem = (id: string, name: string) => {
    const updated = list.map((s) => (s.id === id ? { ...s, name } : s));
    setList(updated);
    setSiteData({ ...siteData, services: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Manage Services ({list.length})</h2>
          <p className="text-xs text-slate-400 mt-1">Add, rename, or remove signature construction & interior services.</p>
        </div>
        <button onClick={save} className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer border-0">
          <Save className="h-4 w-4" /> Save Services
        </button>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="New service title (e.g. Smart Home Automation)..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-1 rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400"
        />
        <button onClick={add} className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer border-0">
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {list.map((s, idx) => (
          <div key={s.id} className="rounded-xl bg-slate-900 border border-slate-800 p-4 flex items-center gap-3">
            <span className="text-xs font-mono text-amber-400 font-bold w-6">{idx + 1}.</span>
            <input
              type="text"
              value={s.name}
              onChange={(e) => updateItem(s.id, e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
            />
            <button onClick={() => remove(s.id)} className="p-2 text-slate-400 hover:text-red-400 bg-transparent border-0 cursor-pointer" title="Delete">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhotosEditor({ siteData, setSiteData, showToast }: { siteData: SiteData; setSiteData: (d: SiteData) => void; showToast: (m: string) => void }) {
  const [photos, setPhotos] = useState<PortfolioPhotoItem[]>(siteData.photos);
  const [newTitle, setNewTitle] = useState("");
  const [newCat, setNewCat] = useState("Commercial");
  const [newImgUrl, setNewImgUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const save = () => {
    setSiteData({ ...siteData, photos });
    showToast("Portfolio photos saved!");
  };

  const remove = (id: string) => {
    const updated = photos.filter((p) => p.id !== id);
    setPhotos(updated);
    setSiteData({ ...siteData, photos: updated });
    showToast("Photo removed!");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch("/api/upload-award-image", { method: "POST", body: fd });
      const json = await res.json();
      if (json.path) {
        const item: PortfolioPhotoItem = {
          id: "p-" + Date.now(),
          img: json.path,
          cat: newCat,
          title: newTitle.trim() || file.name.replace(/\.[^.]+$/, ""),
        };
        const updated = [item, ...photos];
        setPhotos(updated);
        setSiteData({ ...siteData, photos: updated });
        setNewTitle("");
        showToast("Photo uploaded to gallery top!");
      }
    } catch {
      showToast("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const addByUrl = () => {
    if (!newImgUrl.trim()) return;
    const item: PortfolioPhotoItem = {
      id: "p-" + Date.now(),
      img: newImgUrl.trim(),
      cat: newCat,
      title: newTitle.trim() || "Custom Gallery Photo",
    };
    const updated = [item, ...photos];
    setPhotos(updated);
    setSiteData({ ...siteData, photos: updated });
    setNewImgUrl("");
    setNewTitle("");
    showToast("Photo added to gallery!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Manage Portfolio Photos ({photos.length})</h2>
          <p className="text-xs text-slate-400 mt-1">Upload new gallery images, edit titles/categories, or remove items.</p>
        </div>
        <button onClick={save} className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer border-0">
          <Save className="h-4 w-4" /> Save Photos
        </button>
      </div>

      {/* Upload Block */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <h3 className="font-display font-semibold text-sm text-white">Add New Photo (Appears at Top of Gallery)</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Photo Title (e.g. Award Ceremony)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white focus:outline-none focus:border-amber-400"
          />
          <select
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            {["Commercial", "Luxury Villas", "Living Rooms", "Modular Kitchens", "Offices", "Bedrooms"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Image URL or upload file..."
            value={newImgUrl}
            onChange={(e) => setNewImgUrl(e.target.value)}
            className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex gap-3">
          <button onClick={addByUrl} className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-400 flex items-center gap-2 cursor-pointer border-0">
            <Plus className="h-3.5 w-3.5" /> Add via Image URL
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          <button onClick={() => fileRef.current?.click()} disabled={uploading} className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-2 cursor-pointer border-0 disabled:opacity-50">
            <Upload className="h-3.5 w-3.5" /> {uploading ? "Uploading..." : "Upload Photo File"}
          </button>
        </div>
      </div>

      {/* Grid of photos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((p) => (
          <div key={p.id} className="group relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 aspect-[4/3]">
            <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-950/80 p-3 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-amber-400 font-semibold">{p.cat}</span>
                <p className="text-xs font-semibold text-white truncate mt-1">{p.title}</p>
              </div>
              <button onClick={() => remove(p.id)} className="self-end px-2.5 py-1.5 rounded-lg bg-red-600 text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer border-0">
                <Trash2 className="h-3 w-3" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VideosEditor({ siteData, setSiteData, showToast }: { siteData: SiteData; setSiteData: (d: SiteData) => void; showToast: (m: string) => void }) {
  const [videos, setVideos] = useState(siteData.videos);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Interior Design");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const save = () => {
    setSiteData({ ...siteData, videos });
    showToast("Videos saved!");
  };

  const remove = (id: string) => {
    const updated = videos.filter((v) => v.id !== id);
    setVideos(updated);
    setSiteData({ ...siteData, videos: updated });
    showToast("Video removed!");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("video", file);
      const res = await fetch("/api/upload-video", { method: "POST", body: fd });
      const json = await res.json();
      if (json.path) {
        const item = {
          id: "v-" + Date.now(),
          path: json.path,
          filename: json.filename,
          title: title.trim() || file.name.replace(/\.[^.]+$/, ""),
          category,
        };
        const updated = [item, ...videos];
        setVideos(updated);
        setSiteData({ ...siteData, videos: updated });
        setTitle("");
        showToast("Video uploaded successfully!");
      }
    } catch {
      showToast("Video upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Manage Walkthrough Videos ({videos.length})</h2>
          <p className="text-xs text-slate-400 mt-1">Upload video walkthroughs (MP4/WebM) and manage video items.</p>
        </div>
        <button onClick={save} className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer border-0">
          <Save className="h-4 w-4" /> Save Videos
        </button>
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <h3 className="font-display font-semibold text-sm text-white">Upload New Video</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Video Title (e.g. Villa Interior Tour)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white focus:outline-none focus:border-amber-400"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            {["Interior Design", "Construction", "Villa Tours", "Kitchen", "Office", "Before & After"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={handleUpload} />
        <button onClick={() => fileRef.current?.click()} disabled={uploading} className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-2 cursor-pointer border-0 disabled:opacity-50">
          <Upload className="h-4 w-4" /> {uploading ? "Uploading Video..." : "Choose & Upload Video File"}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {videos.map((v) => (
          <div key={v.id} className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
            <video src={v.path} controls className="w-full aspect-video object-cover bg-black" />
            <div className="p-3 flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-amber-400 font-semibold">{v.category}</span>
                <p className="text-xs font-semibold text-white truncate">{v.title}</p>
              </div>
              <button onClick={() => remove(v.id)} className="p-2 text-slate-400 hover:text-red-400 bg-transparent border-0 cursor-pointer">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AwardsEditor({ siteData, setSiteData, showToast }: { siteData: SiteData; setSiteData: (d: SiteData) => void; showToast: (m: string) => void }) {
  const [awards, setAwards] = useState<AwardPhotoItem[]>(siteData.awards);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const save = () => {
    setSiteData({ ...siteData, awards });
    showToast("Awards saved!");
  };

  const remove = (id: string) => {
    const updated = awards.filter((a) => a.id !== id);
    setAwards(updated);
    setSiteData({ ...siteData, awards: updated });
    showToast("Award photo removed!");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch("/api/upload-award-image", { method: "POST", body: fd });
      const json = await res.json();
      if (json.path) {
        const item: AwardPhotoItem = {
          id: "award-" + Date.now(),
          path: json.path,
          filename: json.filename,
        };
        const updated = [item, ...awards];
        setAwards(updated);
        setSiteData({ ...siteData, awards: updated });
        showToast("Award photo added!");
      }
    } catch {
      showToast("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Manage Award Photos & Marquee ({awards.length})</h2>
          <p className="text-xs text-slate-400 mt-1">Upload award event photos shown on the homepage marquee and Awards gallery.</p>
        </div>
        <button onClick={save} className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer border-0">
          <Save className="h-4 w-4" /> Save Awards
        </button>
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      <button onClick={() => fileRef.current?.click()} disabled={uploading} className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-2 cursor-pointer border-0 disabled:opacity-50">
        <Upload className="h-4 w-4" /> {uploading ? "Uploading..." : "Add Award Ceremony Photo"}
      </button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {awards.map((a) => (
          <div key={a.id} className="group relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 aspect-[3/4]">
            <img src={a.path} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-950/80 p-3 flex items-end justify-end opacity-0 group-hover:opacity-100 transition">
              <button onClick={() => remove(a.id)} className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer border-0">
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsEditor({ siteData, setSiteData, showToast }: { siteData: SiteData; setSiteData: (d: SiteData) => void; showToast: (m: string) => void }) {
  const [projects, setProjects] = useState<ProjectItem[]>(siteData.projects);
  const [editing, setEditing] = useState<ProjectItem | null>(null);

  const save = () => {
    setSiteData({ ...siteData, projects });
    showToast("Featured projects saved!");
  };

  const remove = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    setSiteData({ ...siteData, projects: updated });
    showToast("Project removed!");
  };

  const add = () => {
    const item: ProjectItem = {
      id: "proj-" + Date.now(),
      img: "/pic 19.jpeg",
      title: "New Featured Project",
      desc: "Custom luxury construction project description.",
      location: "Hyderabad",
      size: "5,000 sq.ft",
      time: "12 months",
    };
    const updated = [item, ...projects];
    setProjects(updated);
    setSiteData({ ...siteData, projects: updated });
    setEditing(item);
  };

  const updateItem = (updated: ProjectItem) => {
    const next = projects.map((p) => (p.id === updated.id ? updated : p));
    setProjects(next);
    setSiteData({ ...siteData, projects: next });
    setEditing(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Manage Featured Projects ({projects.length})</h2>
          <p className="text-xs text-slate-400 mt-1">Edit case studies, images, locations, timelines, and descriptions.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={add} className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer border-0">
            <Plus className="h-4 w-4" /> Add Project
          </button>
          <button onClick={save} className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer border-0">
            <Save className="h-4 w-4" /> Save Projects
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p) => (
          <div key={p.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={p.title}
                onChange={(e) => updateItem({ ...p, title: e.target.value })}
                className="font-display text-lg font-bold text-white bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-400"
              />
              <button onClick={() => remove(p.id)} className="text-slate-400 hover:text-red-400 p-1 bg-transparent border-0 cursor-pointer">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <textarea
              rows={2}
              value={p.desc}
              onChange={(e) => updateItem({ ...p, desc: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 focus:outline-none focus:border-amber-400"
            />

            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Location"
                value={p.location}
                onChange={(e) => updateItem({ ...p, location: e.target.value })}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Size"
                value={p.size}
                onChange={(e) => updateItem({ ...p, size: e.target.value })}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Timeline"
                value={p.time}
                onChange={(e) => updateItem({ ...p, time: e.target.value })}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>

            <input
              type="text"
              placeholder="Image Path (e.g. /pic 19.jpeg)"
              value={p.img}
              onChange={(e) => updateItem({ ...p, img: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-amber-400"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsEditor({ siteData, setSiteData, showToast }: { siteData: SiteData; setSiteData: (d: SiteData) => void; showToast: (m: string) => void }) {
  const [list, setList] = useState<TestimonialItem[]>(siteData.testimonials);

  const save = () => {
    setSiteData({ ...siteData, testimonials: list });
    showToast("Testimonials saved!");
  };

  const add = () => {
    const item: TestimonialItem = {
      id: "t-" + Date.now(),
      q: "Moon Construction delivered outstanding quality and completed our project smoothly.",
      n: "New Client",
      r: "Homeowner",
      loc: "Hyderabad",
    };
    const updated = [item, ...list];
    setList(updated);
    setSiteData({ ...siteData, testimonials: updated });
  };

  const remove = (id: string) => {
    const updated = list.filter((t) => t.id !== id);
    setList(updated);
    setSiteData({ ...siteData, testimonials: updated });
    showToast("Testimonial removed!");
  };

  const updateItem = (updated: TestimonialItem) => {
    const next = list.map((t) => (t.id === updated.id ? updated : t));
    setList(next);
    setSiteData({ ...siteData, testimonials: next });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Manage Client Reviews ({list.length})</h2>
          <p className="text-xs text-slate-400 mt-1">Add, edit, or remove client quotes, ratings, and locations.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={add} className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer border-0">
            <Plus className="h-4 w-4" /> Add Review
          </button>
          <button onClick={save} className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer border-0">
            <Save className="h-4 w-4" /> Save Reviews
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {list.map((t) => (
          <div key={t.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={t.n}
                onChange={(e) => updateItem({ ...t, n: e.target.value })}
                className="font-bold text-sm text-amber-400 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5"
              />
              <button onClick={() => remove(t.id)} className="text-slate-400 hover:text-red-400 p-1 bg-transparent border-0 cursor-pointer">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <textarea
              rows={2}
              value={t.q}
              onChange={(e) => updateItem({ ...t, q: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Role / Title"
                value={t.r}
                onChange={(e) => updateItem({ ...t, r: e.target.value })}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Location"
                value={t.loc}
                onChange={(e) => updateItem({ ...t, loc: e.target.value })}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactEditor({ siteData, setSiteData, showToast }: { siteData: SiteData; setSiteData: (d: SiteData) => void; showToast: (m: string) => void }) {
  const [form, setForm] = useState(siteData.contact);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSiteData({ ...siteData, contact: form });
    showToast("Contact details saved!");
  };

  return (
    <form onSubmit={save} className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Contact & Social Info</h2>
          <p className="text-xs text-slate-400 mt-1">Phone numbers, email address, physical location, WhatsApp, and social links.</p>
        </div>
        <button type="submit" className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer border-0">
          <Save className="h-4 w-4" /> Save Contact Details
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <label className="block space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Phone Number</span>
          <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
        </label>
        <label className="block space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Email Address</span>
          <input type="text" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
        </label>
        <label className="block space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">WhatsApp Number (digits with country code)</span>
          <input type="text" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
        </label>
        <label className="block space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Facebook Page URL</span>
          <input type="text" value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
        </label>
        <label className="block space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Instagram Profile URL</span>
          <input type="text" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
        </label>
        <label className="block space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">LinkedIn Page URL</span>
          <input type="text" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Office Address</span>
        <textarea rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400" />
      </label>

      <label className="block space-y-2">
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Google Maps Embed URL</span>
        <input type="text" value={form.mapEmbedUrl} onChange={(e) => setForm({ ...form, mapEmbedUrl: e.target.value })} className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-xs font-mono text-slate-300 focus:outline-none focus:border-amber-400" />
      </label>
    </form>
  );
}

function SettingsEditor({ siteData, setSiteData, showToast }: { siteData: SiteData; setSiteData: (d: SiteData) => void; showToast: (m: string) => void }) {
  const [pass, setPass] = useState(siteData.adminPassword);

  const updatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pass.trim()) return;
    setSiteData({ ...siteData, adminPassword: pass.trim() });
    showToast("Admin password changed!");
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(siteData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `moon_cms_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Site data exported successfully!");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (parsed.hero && parsed.contact) {
          setSiteData(parsed);
          showToast("Site data imported successfully!");
        } else {
          showToast("Invalid JSON format.");
        }
      } catch {
        showToast("Error reading backup JSON.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm("Reset all website content back to original defaults?")) {
      resetSiteData();
      showToast("Reset to defaults complete!");
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="font-display text-2xl font-bold text-white">Admin Settings & Backups</h2>
        <p className="text-xs text-slate-400 mt-1">Change admin password, export site backups, or reset site content.</p>
      </div>

      <form onSubmit={updatePassword} className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 max-w-md">
        <h3 className="font-display font-semibold text-sm text-white">Change Admin Password</h3>
        <input
          type="text"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400"
        />
        <button type="submit" className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer border-0">
          <Save className="h-4 w-4" /> Save New Password
        </button>
      </form>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
        <h3 className="font-display font-semibold text-sm text-white">Backup & Data Portability</h3>
        <p className="text-xs text-slate-400">Export your site configuration to JSON file, or restore from a previous JSON backup.</p>
        <div className="flex flex-wrap gap-3">
          <button onClick={handleExport} className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold flex items-center gap-2 cursor-pointer border-0">
            <Download className="h-4 w-4" /> Export Backup JSON
          </button>
          <label className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer border-0">
            <Upload className="h-4 w-4" /> Import Backup JSON
            <input type="file" accept=".json" className="hidden" onChange={handleImport} />
          </label>
          <button onClick={handleReset} className="px-5 py-3 rounded-xl bg-red-900/40 border border-red-700/50 hover:bg-red-900/70 text-red-300 text-xs font-semibold flex items-center gap-2 cursor-pointer border-0">
            <RefreshCw className="h-4 w-4" /> Reset to Original Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
