/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SALON CONTENT LIVES HERE.
 *  Edit this one file to change prices, services, courses,
 *  photos, reviews and FAQs. Every text has English (en) and
 *  Bengali (bn) versions.
 *
 *  Photos: put real photos in /public/images and change the
 *  `image` paths below (or overwrite the file with the same name).
 *
 *  PRICES MARKED `// TODO price` ARE PLACEHOLDERS — please confirm.
 * ─────────────────────────────────────────────────────────────
 */
import type { Locale } from "@/i18n/routing";

export type L = { en: string; bn: string };
export const t = (value: L, locale: Locale | string) =>
  locale === "bn" ? value.bn : value.en;

/* ── Business details ─────────────────────────────────────── */
export const business = {
  name: { en: "Santi's Makeover & Beauty Salon", bn: "সান্তি'স মেকওভার অ্যান্ড বিউটি স্যালন" },
  shortName: { en: "Santi's Makeover", bn: "সান্তি'স মেকওভার" },
  founder: { en: "Santi Dolai", bn: "সান্তি দলাই" },
  foundedYear: 2010,
  phoneDisplay: "+91 90027 17291",
  phone: "+919002717291",
  whatsapp: "919002717291",
  email: "info.makeover.santi@gmail.com",
  address: {
    street: { en: "Haipat, Debra Bazaar", bn: "হাইপাত, ডেবরা বাজার" },
    locality: { en: "Debra", bn: "ডেবরা" },
    district: { en: "Paschim Medinipur", bn: "পশ্চিম মেদিনীপুর" },
    region: { en: "West Bengal", bn: "পশ্চিমবঙ্গ" },
    postalCode: "721126",
  },
  geo: { lat: 22.395749, lng: 87.558815 },
  hours: { open: "10:00", close: "20:00" },
  hoursLabel: { en: "Open daily · 10:00 AM – 8:00 PM", bn: "প্রতিদিন খোলা · সকাল ১০টা – রাত ৮টা" },
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.752731124223!2d87.55881481504237!3d22.395749185273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02b38261a94f09%3A0x59098e2a535e5134!2sSanti%27s+Makeover+and+Beauty+Salon!5e0!3m2!1sen!2sin!4v1698765432100",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Santi%27s+Makeover+and+Beauty+Salon+Debra",
  social: {
    facebook: "https://www.facebook.com/makeover.by.santi",
    instagram: "", // TODO: add Instagram profile URL — the icon appears automatically
  },
  siteUrl: "https://makeoverbysanti.in",
} as const;

export const stats: { value: string; label: L }[] = [
  { value: "15+", label: { en: "Years of experience", bn: "বছরের অভিজ্ঞতা" } },
  { value: "1000+", label: { en: "Happy clients", bn: "সন্তুষ্ট গ্রাহক" } },
  { value: "100+", label: { en: "Trained professionals", bn: "প্রশিক্ষিত পেশাদার" } },
  { value: "ISO", label: { en: "Certified centre", bn: "সার্টিফায়েড সেন্টার" } },
];

/* ── Services & price list ────────────────────────────────── */
export type ServiceItem = { name: L; price: string; note?: L };
export type ServiceCategory = {
  id: string;
  title: L;
  tagline: L;
  description: L;
  image: string;
  icon: "crown" | "sparkles" | "wind" | "gem" | "brush" | "leaf";
  items: ServiceItem[];
};

export const services: ServiceCategory[] = [
  {
    id: "bridal",
    title: { en: "Bridal Makeup", bn: "ব্রাইডাল মেকআপ" },
    tagline: { en: "Signature service", bn: "আমাদের বিশেষ পরিষেবা" },
    description: {
      en: "Your most important day deserves flawless, long-lasting beauty. Bespoke bridal looks — Bengali, North-Indian or contemporary — that stay picture-perfect from morning to midnight.",
      bn: "জীবনের সবচেয়ে বিশেষ দিনে চাই নিখুঁত, দীর্ঘস্থায়ী সৌন্দর্য। বাঙালি, নর্থ-ইন্ডিয়ান বা আধুনিক — আপনার পছন্দমতো ব্রাইডাল লুক, যা সকাল থেকে মাঝরাত পর্যন্ত থাকে একদম পারফেক্ট।",
    },
    image: "/images/bridal-saree.jpg",
    icon: "crown",
    items: [
      { name: { en: "Traditional Bengali Bridal (with chandan art)", bn: "ট্র্যাডিশনাল বাঙালি ব্রাইডাল (চন্দন সাজ সহ)" }, price: "₹8,000" }, // TODO price
      { name: { en: "HD Bridal Makeup", bn: "এইচডি ব্রাইডাল মেকআপ" }, price: "₹12,000" }, // TODO price
      { name: { en: "Airbrush Bridal Makeup", bn: "এয়ারব্রাশ ব্রাইডাল মেকআপ" }, price: "₹15,000" }, // TODO price
      { name: { en: "Reception / Engagement Look", bn: "রিসেপশন / এনগেজমেন্ট লুক" }, price: "₹6,000" }, // TODO price
      { name: { en: "Pre-bridal Package (facial, spa, waxing)", bn: "প্রি-ব্রাইডাল প্যাকেজ (ফেসিয়াল, স্পা, ওয়াক্সিং)" }, price: "₹4,500" }, // TODO price
    ],
  },
  {
    id: "makeup",
    title: { en: "Party & Event Makeup", bn: "পার্টি ও অনুষ্ঠানের মেকআপ" },
    tagline: { en: "Makeup", bn: "মেকআপ" },
    description: {
      en: "Glam, soft-glam or natural — polished looks for weddings, pujas, receptions and photo shoots.",
      bn: "গ্ল্যাম, সফট-গ্ল্যাম বা ন্যাচারাল — বিয়েবাড়ি, পুজো, রিসেপশন বা ফটোশুটের জন্য নিখুঁত সাজ।",
    },
    image: "/images/makeup-eyes.jpg",
    icon: "sparkles",
    items: [
      { name: { en: "Party Makeup", bn: "পার্টি মেকআপ" }, price: "₹1,500" }, // TODO price
      { name: { en: "HD Party Makeup", bn: "এইচডি পার্টি মেকআপ" }, price: "₹2,500" }, // TODO price
      { name: { en: "Saree Draping", bn: "শাড়ি পরানো" }, price: "₹300" }, // TODO price
      { name: { en: "Hairstyle (bun / curls / braid)", bn: "হেয়ারস্টাইল (খোঁপা / কার্ল / বিনুনি)" }, price: "₹500" }, // TODO price
    ],
  },
  {
    id: "hair",
    title: { en: "Hair Treatments", bn: "হেয়ার ট্রিটমেন্ট" },
    tagline: { en: "Hair", bn: "চুল" },
    description: {
      en: "Revitalise your hair with keratin, botox, smoothening and nourishing spa treatments curated for your hair type.",
      bn: "কেরাটিন, বোটক্স, স্মুদেনিং আর হেয়ার স্পা — আপনার চুলের ধরন বুঝে তৈরি ট্রিটমেন্টে চুল হবে প্রাণবন্ত।",
    },
    image: "/images/hair-wash.jpg",
    icon: "wind",
    items: [
      { name: { en: "Haircut & Styling", bn: "হেয়ারকাট ও স্টাইলিং" }, price: "₹300" }, // TODO price
      { name: { en: "Hair Spa", bn: "হেয়ার স্পা" }, price: "₹700" }, // TODO price
      { name: { en: "Keratin Treatment", bn: "কেরাটিন ট্রিটমেন্ট" }, price: "₹3,500", note: { en: "Varies by hair length", bn: "চুলের দৈর্ঘ্য অনুযায়ী" } }, // TODO price
      { name: { en: "Hair Botox", bn: "হেয়ার বোটক্স" }, price: "₹4,000", note: { en: "Varies by hair length", bn: "চুলের দৈর্ঘ্য অনুযায়ী" } }, // TODO price
      { name: { en: "Hair Colour / Highlights", bn: "হেয়ার কালার / হাইলাইট" }, price: "₹1,200" }, // TODO price
      { name: { en: "Hair-fall & Regrowth Therapy", bn: "চুল পড়া ও নতুন চুল গজানোর থেরাপি" }, price: "₹1,000", note: { en: "Per session", bn: "প্রতি সেশন" } }, // TODO price
    ],
  },
  {
    id: "skin",
    title: { en: "Luxury Facials", bn: "লাক্সারি ফেসিয়াল" },
    tagline: { en: "Skincare", bn: "ত্বকের যত্ন" },
    description: {
      en: "Gold, diamond and pearl facials, cleanups and de-tan treatments for radiant, glowing skin.",
      bn: "গোল্ড, ডায়মন্ড ও পার্ল ফেসিয়াল, ক্লিনআপ আর ডি-ট্যান — ত্বক হবে উজ্জ্বল ও ঝলমলে।",
    },
    image: "/images/facial-mask.jpg",
    icon: "gem",
    items: [
      { name: { en: "Cleanup", bn: "ক্লিনআপ" }, price: "₹400" }, // TODO price
      { name: { en: "Fruit Facial", bn: "ফ্রুট ফেসিয়াল" }, price: "₹600" }, // TODO price
      { name: { en: "Gold Facial", bn: "গোল্ড ফেসিয়াল" }, price: "₹1,200" }, // TODO price
      { name: { en: "Diamond Facial", bn: "ডায়মন্ড ফেসিয়াল" }, price: "₹1,500" }, // TODO price
      { name: { en: "Pearl Facial", bn: "পার্ল ফেসিয়াল" }, price: "₹1,300" }, // TODO price
      { name: { en: "De-tan Pack", bn: "ডি-ট্যান প্যাক" }, price: "₹500" }, // TODO price
    ],
  },
  {
    id: "nails",
    title: { en: "Nail Art & Spa", bn: "নেল আর্ট ও স্পা" },
    tagline: { en: "Nails", bn: "নখ" },
    description: {
      en: "Creative nail art, gel polish, manicures and pedicures for the perfect finishing touch.",
      bn: "ক্রিয়েটিভ নেল আর্ট, জেল পলিশ, ম্যানিকিওর ও পেডিকিওর — সাজের নিখুঁত শেষ ছোঁয়া।",
    },
    image: "/images/nails-dark.jpg",
    icon: "brush",
    items: [
      { name: { en: "Manicure", bn: "ম্যানিকিওর" }, price: "₹400" }, // TODO price
      { name: { en: "Pedicure", bn: "পেডিকিওর" }, price: "₹500" }, // TODO price
      { name: { en: "Gel Polish", bn: "জেল পলিশ" }, price: "₹600" }, // TODO price
      { name: { en: "Nail Art (per set)", bn: "নেল আর্ট (প্রতি সেট)" }, price: "₹500" }, // TODO price
      { name: { en: "Nail Extensions", bn: "নেল এক্সটেনশন" }, price: "₹1,200" }, // TODO price
    ],
  },
  {
    id: "grooming",
    title: { en: "Waxing & Threading", bn: "ওয়াক্সিং ও থ্রেডিং" },
    tagline: { en: "Grooming", bn: "গ্রুমিং" },
    description: {
      en: "Smooth, lasting hair removal with gentle premium waxes and precise threading.",
      bn: "নরম প্রিমিয়াম ওয়াক্স আর নিখুঁত থ্রেডিং — মসৃণ ও দীর্ঘস্থায়ী ফল।",
    },
    image: "/images/threading.jpg",
    icon: "leaf",
    items: [
      { name: { en: "Eyebrow Threading", bn: "আইব্রো থ্রেডিং" }, price: "₹50" }, // TODO price
      { name: { en: "Upper Lip / Forehead", bn: "আপার লিপ / কপাল" }, price: "₹30" }, // TODO price
      { name: { en: "Full Arms Waxing", bn: "ফুল হাত ওয়াক্সিং" }, price: "₹300" }, // TODO price
      { name: { en: "Full Legs Waxing", bn: "ফুল পা ওয়াক্সিং" }, price: "₹450" }, // TODO price
      { name: { en: "Rica Full Body", bn: "রিকা ফুল বডি" }, price: "₹1,800" }, // TODO price
    ],
  },
];

/* ── Academy courses ──────────────────────────────────────── */
export type Course = {
  id: string;
  title: L;
  duration: L;
  level: L;
  summary: L;
  syllabus: L[];
  fee: string;
  image: string;
};

export const courses: Course[] = [
  {
    id: "makeup-artist",
    title: { en: "Makeup Artist Certification", bn: "মেকআপ আর্টিস্ট সার্টিফিকেশন" },
    duration: { en: "8 weeks · Intensive", bn: "৮ সপ্তাহ · ইনটেনসিভ" },
    level: { en: "Beginner to professional", bn: "শিক্ষানবিশ থেকে পেশাদার" },
    summary: {
      en: "A hands-on, industry-focused programme covering every dimension of professional makeup — from Bengali bridal to editorial.",
      bn: "হাতে-কলমে, পেশাভিত্তিক কোর্স — বাঙালি ব্রাইডাল থেকে এডিটোরিয়াল, প্রফেশনাল মেকআপের সব দিক।",
    },
    syllabus: [
      { en: "Bridal, party & special-effects makeup", bn: "ব্রাইডাল, পার্টি ও স্পেশাল-এফেক্ট মেকআপ" },
      { en: "HD and airbrush techniques", bn: "এইচডি ও এয়ারব্রাশ টেকনিক" },
      { en: "Colour theory and face shaping", bn: "কালার থিওরি ও ফেস শেপিং" },
      { en: "Hairstyling & saree draping basics", bn: "হেয়ারস্টাইলিং ও শাড়ি পরানোর বেসিক" },
      { en: "Business and client management", bn: "ব্যবসা ও ক্লায়েন্ট ম্যানেজমেন্ট" },
      { en: "Portfolio development", bn: "পোর্টফোলিও তৈরি" },
    ],
    fee: "₹25,000", // TODO price
    image: "/images/makeup-brushes.jpg",
  },
  {
    id: "beautician",
    title: { en: "Professional Beautician Course", bn: "প্রফেশনাল বিউটিশিয়ান কোর্স" },
    duration: { en: "12 weeks · Comprehensive", bn: "১২ সপ্তাহ · সম্পূর্ণ কোর্স" },
    level: { en: "No experience needed", bn: "আগের অভিজ্ঞতা লাগবে না" },
    summary: {
      en: "Complete beauty-therapy training across skin, hair and nails — everything you need to run a successful salon of your own.",
      bn: "ত্বক, চুল ও নখের সম্পূর্ণ বিউটি-থেরাপি প্রশিক্ষণ — নিজের সফল স্যালন চালানোর জন্য যা যা দরকার।",
    },
    syllabus: [
      { en: "Facials and advanced skin treatments", bn: "ফেসিয়াল ও অ্যাডভান্সড স্কিন ট্রিটমেন্ট" },
      { en: "Hair cutting, colouring & styling", bn: "হেয়ার কাটিং, কালারিং ও স্টাইলিং" },
      { en: "Waxing, threading and hair removal", bn: "ওয়াক্সিং, থ্রেডিং ও হেয়ার রিমুভাল" },
      { en: "Manicure, pedicure & nail art", bn: "ম্যানিকিওর, পেডিকিওর ও নেল আর্ট" },
      { en: "Hygiene and client consultation", bn: "পরিচ্ছন্নতা ও ক্লায়েন্ট কনসাল্টেশন" },
      { en: "Salon management skills", bn: "স্যালন ম্যানেজমেন্ট" },
    ],
    fee: "₹30,000", // TODO price
    image: "/images/makeup-palette.jpg",
  },
];

export const academyPerks: { icon: "award" | "hand" | "briefcase" | "users"; title: L; text: L }[] = [
  { icon: "award", title: { en: "ISO certification", bn: "আইএসও সার্টিফিকেট" }, text: { en: "A recognised qualification that opens doors.", bn: "স্বীকৃত সার্টিফিকেট, যা কাজের সুযোগ বাড়ায়।" } },
  { icon: "hand", title: { en: "Hands-on practice", bn: "হাতে-কলমে শেখা" }, text: { en: "Train on live models in a working salon.", bn: "চালু স্যালনে লাইভ মডেলে প্র্যাকটিস।" } },
  { icon: "briefcase", title: { en: "Career support", bn: "কেরিয়ার সাপোর্ট" }, text: { en: "Placement help and mentorship after the course.", bn: "কোর্সের পর চাকরি ও গাইডেন্সে সাহায্য।" } },
  { icon: "users", title: { en: "Small batches", bn: "ছোট ব্যাচ" }, text: { en: "Personal attention for every student.", bn: "প্রত্যেক ছাত্রীর প্রতি আলাদা নজর।" } },
];

/* ── Testimonials ─────────────────────────────────────────── */
export const testimonials: { name: string; role: L; quote: L; lang?: "bn" }[] = [
  {
    name: "Moumita Manna",
    role: { en: "Makeup Artist · Medinipur", bn: "মেকআপ আর্টিস্ট · মেদিনীপুর" },
    quote: {
      en: "Santi's training programme turned my passion into a profession. The hands-on practice and business skills helped me open my own salon within six months of finishing the course.",
      bn: "সান্তি ম্যামের ট্রেনিং আমার শখকে পেশায় বদলে দিয়েছে। হাতে-কলমে শেখা আর ব্যবসার খুঁটিনাটি জানার ফলে কোর্স শেষ করার ছয় মাসের মধ্যেই নিজের স্যালন খুলেছি।",
    },
  },
  {
    name: "Supriya Das",
    role: { en: "Beautician · Medinipur", bn: "বিউটিশিয়ান · মেদিনীপুর" },
    quote: {
      en: "The ISO certificate gave me credibility when applying for jobs. I now work at a luxury spa in Kolkata thanks to the skills I learned at Santi's Makeover.",
      bn: "চাকরির আবেদনে আইএসও সার্টিফিকেট আমাকে অনেক এগিয়ে দিয়েছে। সান্তি'স মেকওভারে শেখা কাজের জোরেই আজ কলকাতার একটি লাক্সারি স্পা-তে কাজ করছি।",
    },
  },
  {
    name: "Arpita Maity",
    role: { en: "Client · Debra Bazaar", bn: "গ্রাহক · ডেবরা বাজার" },
    lang: "bn",
    quote: {
      en: "I came to Ma'am for hair-growth treatment and it's been about two months. I've seen great results — lots of new hair on my scalp. Ma'am and the whole team are wonderful to deal with.",
      bn: "আমি হেয়ার গ্রোথ ট্রিটমেন্টের জন্য ম্যামের কাছে এসেছিলাম, এখন প্রায় ২ মাস হয়ে গেছে। খুব ভালো রেজাল্ট পেয়েছি — স্ক্যাল্পে অনেক নতুন চুল গজাচ্ছে। বিশেষ করে ম্যাম এবং পুরো টিমের ব্যবহার খুবই ভালো।",
    },
  },
];

/* ── Gallery ──────────────────────────────────────────────── */
export type GalleryCategory = "bridal" | "makeup" | "hair" | "skin" | "nails" | "salon";
export const galleryCategories: { id: GalleryCategory; label: L }[] = [
  { id: "bridal", label: { en: "Bridal", bn: "ব্রাইডাল" } },
  { id: "makeup", label: { en: "Makeup", bn: "মেকআপ" } },
  { id: "hair", label: { en: "Hair", bn: "চুল" } },
  { id: "skin", label: { en: "Skin", bn: "ত্বক" } },
  { id: "nails", label: { en: "Nails", bn: "নখ" } },
  { id: "salon", label: { en: "Our Salon", bn: "আমাদের স্যালন" } },
];

export const gallery: { src: string; alt: L; category: GalleryCategory; tall?: boolean }[] = [
  { src: "/images/hero-bride.jpg", alt: { en: "Bride in traditional red and gold bridal look", bn: "লাল-সোনালি ট্র্যাডিশনাল সাজে কনে" }, category: "bridal", tall: true },
  { src: "/images/bridal-saree.jpg", alt: { en: "Bride in a silk saree with jewellery", bn: "সিল্ক শাড়ি ও গয়নায় কনে" }, category: "bridal", tall: true },
  { src: "/images/makeup-eyes.jpg", alt: { en: "Soft-glam eye makeup", bn: "সফট-গ্ল্যাম আই মেকআপ" }, category: "makeup" },
  { src: "/images/makeup-flatlay.jpg", alt: { en: "Makeup brushes and products", bn: "মেকআপ ব্রাশ ও প্রোডাক্ট" }, category: "makeup" },
  { src: "/images/makeup-products.jpg", alt: { en: "Premium makeup products", bn: "প্রিমিয়াম মেকআপ প্রোডাক্ট" }, category: "makeup" },
  { src: "/images/hair-long.jpg", alt: { en: "Healthy long wavy hair", bn: "স্বাস্থ্যোজ্জ্বল লম্বা ঢেউ খেলানো চুল" }, category: "hair" },
  { src: "/images/hair-styling.jpg", alt: { en: "Hair styling at the salon", bn: "স্যালনে হেয়ার স্টাইলিং" }, category: "hair" },
  { src: "/images/hair-blowdry.jpg", alt: { en: "Blow-dry and curls", bn: "ব্লো-ড্রাই ও কার্ল" }, category: "hair" },
  { src: "/images/facial-mask.jpg", alt: { en: "Facial mask treatment", bn: "ফেসিয়াল মাস্ক ট্রিটমেন্ট" }, category: "skin" },
  { src: "/images/facial-cream.jpg", alt: { en: "Relaxing cream facial", bn: "আরামদায়ক ক্রিম ফেসিয়াল" }, category: "skin" },
  { src: "/images/facial-treatment.jpg", alt: { en: "Advanced skin treatment", bn: "অ্যাডভান্সড স্কিন ট্রিটমেন্ট" }, category: "skin" },
  { src: "/images/nails-dark.jpg", alt: { en: "Glossy nail art", bn: "চকচকে নেল আর্ট" }, category: "nails", tall: true },
  { src: "/images/nails-nude.jpg", alt: { en: "Nude gel manicure", bn: "ন্যুড জেল ম্যানিকিওর" }, category: "nails" },
  { src: "/images/nails-art.jpg", alt: { en: "Red nail art design", bn: "লাল নেল আর্ট ডিজাইন" }, category: "nails" },
  { src: "/images/nails-salon.jpg", alt: { en: "Manicure in progress", bn: "ম্যানিকিওর চলছে" }, category: "nails" },
  { src: "/images/salon-interior.jpg", alt: { en: "Salon styling stations", bn: "স্যালনের স্টাইলিং স্টেশন" }, category: "salon" },
  { src: "/images/salon-interior-2.jpg", alt: { en: "Bright salon interior", bn: "আলো-ঝলমলে স্যালন" }, category: "salon" },
  { src: "/images/salon-interior-3.jpg", alt: { en: "Salon mirrors and chairs", bn: "স্যালনের আয়না ও চেয়ার" }, category: "salon" },
];

/* ── About timeline ───────────────────────────────────────── */
export const milestones: { year: string; text: L }[] = [
  { year: "2010", text: { en: "Santi Dolai opens the salon in Debra Bazaar.", bn: "সান্তি দলাই ডেবরা বাজারে স্যালন শুরু করেন।" } },
  // TODO confirm year the academy started
  { year: "2015", text: { en: "Training academy launched for aspiring beauticians.", bn: "নতুন বিউটিশিয়ানদের জন্য ট্রেনিং অ্যাকাডেমি চালু।" } },
  { year: "ISO", text: { en: "Academy becomes an ISO-certified training centre.", bn: "অ্যাকাডেমি আইএসও সার্টিফায়েড ট্রেনিং সেন্টার হয়।" } },
  { year: "Today", text: { en: "1000+ happy clients and 100+ trained professionals.", bn: "১০০০+ সন্তুষ্ট গ্রাহক ও ১০০+ প্রশিক্ষিত পেশাদার।" } },
];

/* ── FAQ ──────────────────────────────────────────────────── */
// TODO confirm answers (instalments, on-location bridal) with the salon
export const faqs: { q: L; a: L }[] = [
  {
    q: { en: "Do I need an appointment?", bn: "আগে থেকে অ্যাপয়েন্টমেন্ট নিতে হবে?" },
    a: {
      en: "Walk-ins are welcome for most services, but we recommend booking on WhatsApp — especially for bridal, keratin and weekend slots.",
      bn: "বেশিরভাগ পরিষেবার জন্য সরাসরি চলে আসতে পারেন, তবে ব্রাইডাল, কেরাটিন বা ছুটির দিনের জন্য হোয়াটসঅ্যাপে আগে বুক করা ভালো।",
    },
  },
  {
    q: { en: "How early should I book bridal makeup?", bn: "ব্রাইডাল মেকআপ কতদিন আগে বুক করব?" },
    a: {
      en: "Ideally 1–3 months before the wedding, especially during the wedding season. A trial session can be arranged.",
      bn: "বিয়ের ১–৩ মাস আগে বুক করা ভালো, বিশেষত বিয়ের মরসুমে। চাইলে ট্রায়াল সেশনও করা যায়।",
    },
  },
  {
    q: { en: "Do you do bridal makeup at the venue or at home?", bn: "বাড়িতে বা অনুষ্ঠানস্থলে গিয়ে ব্রাইডাল মেকআপ করেন?" },
    a: {
      en: "Yes — on-location bridal makeup is available. Travel charges depend on the distance.",
      bn: "হ্যাঁ, অনুষ্ঠানস্থলে গিয়েও ব্রাইডাল মেকআপ করা হয়। দূরত্ব অনুযায়ী যাতায়াত খরচ লাগবে।",
    },
  },
  {
    q: { en: "Will I get a certificate after the course?", bn: "কোর্স শেষে সার্টিফিকেট পাব?" },
    a: {
      en: "Yes. Every student who completes the course receives an ISO-certified certificate from our academy.",
      bn: "হ্যাঁ। কোর্স সম্পূর্ণ করলে প্রত্যেক ছাত্রী আমাদের অ্যাকাডেমির আইএসও সার্টিফায়েড সার্টিফিকেট পাবেন।",
    },
  },
  {
    q: { en: "Can I pay course fees in instalments?", bn: "কোর্সের ফি কি কিস্তিতে দেওয়া যায়?" },
    a: {
      en: "Yes, instalment options are available. Message us on WhatsApp for the current fee and batch dates.",
      bn: "হ্যাঁ, কিস্তিতে দেওয়ার সুবিধা আছে। বর্তমান ফি ও ব্যাচের তারিখ জানতে হোয়াটসঅ্যাপে মেসেজ করুন।",
    },
  },
];
