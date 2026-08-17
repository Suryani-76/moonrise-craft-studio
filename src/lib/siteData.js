import { useState, useEffect } from "react";


































































































export const DEFAULT_SITE_DATA = {
  adminPassword: "admin123",
  hero: {
    eyebrow: "Premium Construction & Interior Design",
    titleLine1: "Building Spaces.",
    titleLine2: "Designing Dreams.",
    titleLine3: "Inspiring Futures.",
    subtitle: "Delivering premium construction and interior design solutions for homes, villas, apartments, offices, commercial spaces, and turnkey projects — with over 700+ satisfied clients worldwide.",
    happyClientsCount: 700,
    projectsCount: 150,
    yearsExperience: 10,
    founderName: "Mr. Syed Ghouseuddin",
    founderTitle: "Founder & Managing Director",
    founderQuote: "Engineering excellence meets timeless design — crafted for the way you live.",
    founderImage: "/founder.jpg",
  },
  about: {
    eyebrow: "About Us",
    title: "About Moon Construction & Interiors",
    paragraph1: "Moon Construction & Interiors is a trusted name in premium construction and interior design. With more than 700 satisfied clients worldwide, we specialize in residential construction, commercial buildings, luxury villas, office interiors, modular kitchens, turnkey projects, renovations, and architectural planning.",
    paragraph2: "Our team combines engineering excellence, innovative design, and superior craftsmanship to transform every project into a masterpiece.",
    yearsBadge: "10+ Years Of Excellence",
    founderName: "Syed",
    founderRole: "Founder & Managing Director",
    founderQuote: "Our mission is to combine timeless design with engineering integrity. Every project we undertake is crafted with the highest precision, bringing our clients' dreams to life.",
    founderImage: "/pic 23.jpeg",
  },
  services: [
    { id: "s1", iconName: "Home", name: "Residential Construction", description: "Bespoke home building with premium civil craftsmanship." },
    { id: "s2", iconName: "Building2", name: "Commercial Construction", description: "High-capacity corporate & retail infrastructure." },
    { id: "s3", iconName: "Sparkles", name: "Luxury Villas", description: "Architectural grandeur & bespoke estate design." },
    { id: "s4", iconName: "Compass", name: "Architecture", description: "3D visualization, elevation planning & structural blueprinting." },
    { id: "s5", iconName: "Sofa", name: "Interior Design", description: "Custom furniture, space layout, and high-end styling." },
    { id: "s6", iconName: "Layout", name: "Office Interiors", description: "Ergonomic, modern executive workspaces." },
    { id: "s7", iconName: "Utensils", name: "Modular Kitchen", description: "Smart storage, quartz counters & German hardware." },
    { id: "s8", iconName: "Layers", name: "False Ceiling", description: "Cove lighting, gypsum concepts & acoustic paneling." },
    { id: "s9", iconName: "Lightbulb", name: "Lighting Design", description: "Ambient, accent, and architectural mood lighting." },
    { id: "s10", iconName: "Trees", name: "Landscape Design", description: "Outdoor green sanctuaries, courtyards & decks." },
    { id: "s11", iconName: "Hammer", name: "Renovation", description: "Structural upgrades & modern interior retrofitting." },
    { id: "s12", iconName: "Palette", name: "Painting", description: "Italian stuccos, textured walls & luxury finishes." },
    { id: "s13", iconName: "Ruler", name: "Flooring", description: "Italian marble, hardwood planks & vitrified tiles." },
    { id: "s14", iconName: "Leaf", name: "Wood Works", description: "Custom wardrobes, paneling & veneer craftsmanship." },
    { id: "s15", iconName: "ShieldCheck", name: "Turnkey Construction", description: "End-to-end management from groundbreaking to keys." },
    { id: "s16", iconName: "HardHat", name: "Structural Design", description: "Certified engineering & heavy civil safety management." },
  ],
  photos: [
    { id: "p-32", img: "/pic 32.jpeg", cat: "Commercial", title: "Gold Curtain Unveiling Ceremony" },
    { id: "p-29", img: "/pic 29.jpeg", cat: "Commercial", title: "Mana Amaravathi State Icons Award" },
    { id: "p-25", img: "/pic 25.jpeg", cat: "Commercial", title: "Andhra Pradesh Logo Unveiling" },
    { id: "p-26", img: "/pic 26.jpeg", cat: "Commercial", title: "Global Icons Forum Honors" },
    { id: "p-27", img: "/pic 27.jpeg", cat: "Commercial", title: "Chief Guest Felicitation" },
    { id: "p-28", img: "/pic 28.jpeg", cat: "Commercial", title: "Moon Construction Team Excellence" },
    { id: "p-24", img: "/pic 24.jpeg", cat: "Commercial", title: "Executive Leadership Stage Portrait" },
    { id: "p-1", img: "/pic 1.jpeg", cat: "Luxury Villas", title: "Modern Elevation" },
    { id: "p-2", img: "/pic2.jpeg", cat: "Living Rooms", title: "Cozy Hearth" },
    { id: "p-3", img: "/pic 3.jpeg", cat: "Modular Kitchens", title: "Gourmet Kitchen" },
    { id: "p-4", img: "/pic 4.jpeg", cat: "Offices", title: "Creative Hub" },
    { id: "p-5", img: "/pic 5.jpeg", cat: "Bedrooms", title: "Serene Oasis" },
    { id: "p-6", img: "/pic 6.jpeg", cat: "Commercial", title: "Boutique Lobby" },
    { id: "p-7", img: "/pic 7.jpeg", cat: "Luxury Villas", title: "Glass Pavilion" },
    { id: "p-8", img: "/pic 8.jpeg", cat: "Living Rooms", title: "Urban Salon" },
    { id: "p-9", img: "/pic 9.jpeg", cat: "Modular Kitchens", title: "Minimalist Cookery" },
    { id: "p-10", img: "/pic 10.jpeg", cat: "Offices", title: "Executive Workspace" },
    { id: "p-11", img: "/pic11.jpeg", cat: "Bedrooms", title: "Golden Suite" },
    { id: "p-12", img: "/pic 12.jpeg", cat: "Commercial", title: "Retail Showroom" },
    { id: "p-13", img: "/pic13.jpeg", cat: "Luxury Villas", title: "Hillside Retreat" },
    { id: "p-14", img: "/pic14.jpeg", cat: "Living Rooms", title: "Minimalist Den" },
    { id: "p-15", img: "/pic 15.jpeg", cat: "Modular Kitchens", title: "Chic Dining Corner" },
    { id: "p-16", img: "/pic 16.jpeg", cat: "Offices", title: "Focus Pod" },
    { id: "p-17", img: "/pic 17.jpeg", cat: "Bedrooms", title: "Dream Chambers" },
    { id: "p-18", img: "/pic18.jpeg", cat: "Commercial", title: "Corporate Atrium" },
    { id: "p-19", img: "/pic 19.jpeg", cat: "Luxury Villas", title: "Infinity Deck" },
    { id: "p-20", img: "/pic20.jpeg", cat: "Living Rooms", title: "Luxe Lounge" },
    { id: "p-21", img: "/pic21.jpeg", cat: "Modular Kitchens", title: "Bright Kitchenette" },
    { id: "p-22", img: "/pic 22.jpeg", cat: "Bedrooms", title: "Warm Sanctuary" },
  ],
  videos: [],
  awards: [
    { id: "award-14", path: "/awards/award_14.jpg", filename: "award_14.jpg" },
    { id: "award-11", path: "/awards/award_11.jpg", filename: "award_11.jpg" },
    { id: "award-7", path: "/awards/award_7.jpg", filename: "award_7.jpg" },
    { id: "award-8", path: "/awards/award_8.jpg", filename: "award_8.jpg" },
    { id: "award-9", path: "/awards/award_9.jpg", filename: "award_9.jpg" },
    { id: "award-10", path: "/awards/award_10.jpg", filename: "award_10.jpg" },
    { id: "award-6", path: "/awards/award_6.jpg", filename: "award_6.jpg" },
    { id: "award-1", path: "/awards/award_1.jpg", filename: "award_1.jpg" },
    { id: "award-2", path: "/awards/award_2.jpg", filename: "award_2.jpg" },
    { id: "award-3", path: "/awards/award_3.jpg", filename: "award_3.jpg" },
    { id: "award-4", path: "/awards/award_4.jpg", filename: "award_4.jpg" },
    { id: "award-5", path: "/awards/award_5.jpg", filename: "award_5.jpg" },
  ],
  projects: [
    { id: "proj-1", img: "/pic 19.jpeg", title: "Sky Crest Villa", desc: "A modernist 6,500 sq.ft villa featuring floor-to-ceiling glass, a floating staircase and cantilevered pool deck.", location: "Jubilee Hills, Hyderabad", size: "6,500 sq.ft", time: "14 months" },
    { id: "proj-2", img: "/pic 10.jpeg", title: "Meridian Corporate HQ", desc: "A warm-wood executive suite designed for a leading fintech, blending Japandi calm with corporate authority.", location: "HITEC City, Hyderabad", size: "18,000 sq.ft", time: "8 months" },
    { id: "proj-3", img: "/pic 3.jpeg", title: "Indigo Culinary Studio", desc: "Navy-and-brass modular kitchen with quartz island, integrated appliances and warm ambient lighting.", location: "Kondapur", size: "420 sq.ft", time: "6 weeks" },
    { id: "proj-4", img: "/pic 22.jpeg", title: "Velvet Master Suite", desc: "A tufted, layered master bedroom finished in bronze, marble and hand-loomed textiles.", location: "Banjara Hills", size: "680 sq.ft", time: "10 weeks" },
  ],
  testimonials: [
    { id: "t-1", q: "Our dream villa exceeded expectations. Every detail was executed flawlessly with unbelievable precision.", n: "Ananya & Rohit S.", r: "Villa Owner", loc: "Jubilee Hills, Hyderabad" },
    { id: "t-2", q: "Excellent quality and a truly professional team from the first sketch to the final walkthrough.", n: "Karthik R.", r: "Managing Director", loc: "HITEC City, Hyderabad" },
    { id: "t-3", q: "Highly recommended for premium interiors — thoughtful, elegant and beautifully finished.", n: "Priya M.", r: "Homeowner", loc: "Banjara Hills, Hyderabad" },
    { id: "t-4", q: "Timely delivery and outstanding workmanship. They set a new standard for our office headquarters.", n: "Vikram J.", r: "CEO, Meridian", loc: "Financial District, Hyderabad" },
    { id: "t-5", q: "Moon Construction transformed our bare shell duplex villa into a warm, contemporary masterpiece. The 3D designs were spot-on!", n: "Dr. Srinivas & Aruna K.", r: "Duplex Villa Owner", loc: "Jubilee Hills, Hyderabad" },
    { id: "t-6", q: "From structural planning to the final coat of paint, Syed and his team handled our commercial workspace with extreme perfection and finished 2 weeks ahead of schedule!", n: "Rajesh Varma", r: "Tech Park Partner", loc: "Gachibowli, Hyderabad" },
    { id: "t-7", q: "We wanted a fusion of modern minimalism and traditional brass accents for our family home in Vijayawada. Moon Construction delivered beyond what we envisioned.", n: "Deepika & Suresh Reddy", r: "Independent House Owner", loc: "Durga Puram, Vijayawada" },
    { id: "t-8", q: "The modular kitchen and customized lighting design transformed our apartment completely. Their attention to material selection and finish is unmatched.", n: "Meera Nambiar", r: "Luxury Apartment Owner", loc: "Kondapur, Hyderabad" },
  ],
  contact: {
    phone: "+91 98765 43210",
    email: "contact@moonconstruction.com",
    address: "Moon Construction & Interiors, Jubilee Hills, Hyderabad, Telangana - 500033",
    whatsapp: "919876543210",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.491223945417!2d78.40118831487702!3d17.43615998804918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb915c2d33454b%3A0xb35a4f66dbb7c02b!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1629800000000!5m2!1sen!2sin",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
};

const SITE_DATA_STORAGE_KEY = "moon_site_data_v1";
const EVENT_NAME = "moon_site_data_updated";

export function getStoredSiteData() {
  if (typeof window === "undefined") return DEFAULT_SITE_DATA;
  try {
    const raw = localStorage.getItem(SITE_DATA_STORAGE_KEY);
    if (!raw) return DEFAULT_SITE_DATA;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SITE_DATA,
      ...parsed,
      hero: { ...DEFAULT_SITE_DATA.hero, ...(parsed.hero || {}) },
      about: { ...DEFAULT_SITE_DATA.about, ...(parsed.about || {}) },
      contact: { ...DEFAULT_SITE_DATA.contact, ...(parsed.contact || {}) },
      services: Array.isArray(parsed.services) ? parsed.services : DEFAULT_SITE_DATA.services,
      photos: Array.isArray(parsed.photos) ? parsed.photos : DEFAULT_SITE_DATA.photos,
      videos: Array.isArray(parsed.videos) ? parsed.videos : DEFAULT_SITE_DATA.videos,
      awards: Array.isArray(parsed.awards) ? parsed.awards : DEFAULT_SITE_DATA.awards,
      projects: Array.isArray(parsed.projects) ? parsed.projects : DEFAULT_SITE_DATA.projects,
      testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : DEFAULT_SITE_DATA.testimonials,
    };
  } catch (e2) {
    return DEFAULT_SITE_DATA;
  }
}

export function saveSiteData(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SITE_DATA_STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: data }));
}

export function resetSiteData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SITE_DATA_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: DEFAULT_SITE_DATA }));
}

export function useSiteData() {
  const [data, setData] = useState(getStoredSiteData);

  useEffect(() => {
    const handleUpdate = (e) => {
      const customEvent = e ;
      if (customEvent.detail) {
        setData(customEvent.detail);
      } else {
        setData(getStoredSiteData());
      }
    };
    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const updateData = (updater) => {
    const next = typeof updater === "function" ? updater(data) : updater;
    setData(next);
    saveSiteData(next);
  };

  return [data, updateData];
}
