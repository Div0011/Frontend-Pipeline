export interface Product {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  category: 'High Speed' | 'High Flow' | 'Smart IoT' | 'Luxury Decorative';
  price: number;
  originalPrice: number;
  image: string;
  hoverVideo?: string;
  secondaryImage?: string;
  description: string;
  wattage: number;
  traditionalWattage: number;
  airflowCFM: number;
  noiseDb: number;
  sweepMm: number;
  bladeMaterial: string;
  finishes: Array<{ name: string; color: string; hex: string; bgImage?: string }>;
  features: string[];
  isHero?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
  warrantyYears: number;
  smartTech: {
    hasVoice: boolean;
    hasRemote: boolean;
    hasApp: boolean;
    hasDuocool: boolean;
  };
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  date: string;
  productName: string;
}

export interface FAQ {
  id: string;
  category: 'Technology' | 'Savings' | 'Installation' | 'Smart Control' | 'Warranty';
  question: string;
  answer: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'superq-lux',
    name: 'SuperQ Lux',
    subtitle: 'Flagship Architectural BLDC Ceiling Fan',
    tagline: 'Sculptural elegance meets patented sensorless BLDC motor precision.',
    category: 'Luxury Decorative',
    price: 6850,
    originalPrice: 9499,
    image: '/media/modern_fan_spinning.mp4',
    hoverVideo: '/media/modern_fan_spinning.mp4',
    secondaryImage: '/media/blades_rotating.mp4',
    description: 'Designed as a centerpiece for modern residences, SuperQ Lux consumes only 35W at peak speed while delivering an extraordinary 230 CMM airflow with near-zero acoustic footprint.',
    wattage: 35,
    traditionalWattage: 75,
    airflowCFM: 8120, // ~230 CMM
    noiseDb: 32,
    sweepMm: 1200,
    bladeMaterial: 'Patented Seamless Aerodynamic Aluminum',
    finishes: [
      { name: 'Midnight Royal Blue', color: 'Royal Blue', hex: '#0052cc' },
      { name: 'Arctic Pearl White', color: 'White', hex: '#ffffff' },
      { name: 'Graphite Platinum', color: 'Titanium', hex: '#334155' },
      { name: 'Electric Cyan Accent', color: 'Cyan Glow', hex: '#00d4ff' },
    ],
    features: [
      'Patented Sensorless BLDC Motor',
      'Consumes only 35W (Saves 69% Electricity)',
      'Direct Voice Control & RF Remote',
      'Ultra-Silent Whisper Operation (<32dB)',
      '5-Year On-Site Motor Replacement Warranty',
      'BEE 5-Star Highest Efficiency Certified',
    ],
    isHero: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 384,
    warrantyYears: 5,
    smartTech: {
      hasVoice: true,
      hasRemote: true,
      hasApp: true,
      hasDuocool: true,
    },
  },
  {
    id: 'super-myq-voice',
    name: 'Super myQ Direct Voice',
    subtitle: 'Voice-Activated Smart Fan',
    tagline: 'No internet, no WiFi app needed — instant direct voice recognition onboard.',
    category: 'Smart IoT',
    price: 7299,
    originalPrice: 9999,
    image: '/media/futuristic_fan_spinning.mp4',
    hoverVideo: '/media/futuristic_fan_spinning.mp4',
    description: 'Speak directly to your fan in English or Hindi. Integrated offline AI micro-chip understands commands instantly without requiring internet connectivity.',
    wattage: 35,
    traditionalWattage: 75,
    airflowCFM: 8250,
    noiseDb: 31,
    sweepMm: 1200,
    bladeMaterial: 'Aero-Dynamic Molded Alloy',
    finishes: [
      { name: 'Sapphire Blue Ring', color: 'Electric Blue', hex: '#0052cc' },
      { name: 'Midnight Black', color: 'Black', hex: '#0f172a' },
    ],
    features: [
      'Offline On-Device Voice Control (Hindi & English)',
      'Zero Internet / WiFi Required for Voice',
      '35W Ultra Efficient Motor',
      'Smart App & Remote Dual Control',
      'BEE 5-Star Certified',
      '5-Year Warranty',
    ],
    isBestseller: true,
    rating: 4.9,
    reviewCount: 420,
    warrantyYears: 5,
    smartTech: {
      hasVoice: true,
      hasRemote: true,
      hasApp: true,
      hasDuocool: true,
    },
  },
  {
    id: 'super-sevak',
    name: 'Super Sevak',
    subtitle: 'High-Performance Utility BLDC Fan',
    tagline: 'Built for endurance, heavy airflow, and non-stop operational performance.',
    category: 'High Speed',
    price: 3550,
    originalPrice: 4999,
    image: '/media/fan_smooth_spinning.mp4',
    hoverVideo: '/media/fan_smooth_spinning.mp4',
    description: 'Engineered for high ambient temperatures and demanding environments. Delivers massive airflow with a bulletproof 28W energy-saving motor.',
    wattage: 28,
    traditionalWattage: 75,
    airflowCFM: 7900,
    noiseDb: 35,
    sweepMm: 1200,
    bladeMaterial: 'Heavy-Gauge Aluminum Alloy',
    finishes: [
      { name: 'Arctic White', color: 'White', hex: '#ffffff' },
      { name: 'Royal Blue Trim', color: 'Blue Accent', hex: '#0052cc' },
    ],
    features: [
      '28W Power Consumption',
      'High Speed 380 RPM',
      'Wide Voltage Operation (90V–300V)',
      'RF Remote Included',
      '5-Year Motor Warranty',
    ],
    isBestseller: true,
    rating: 4.8,
    reviewCount: 512,
    warrantyYears: 5,
    smartTech: {
      hasVoice: false,
      hasRemote: true,
      hasApp: false,
      hasDuocool: false,
    },
  },
  {
    id: 'super-x1-natura',
    name: 'Super X1 Natura',
    subtitle: 'Biophilic Studio Design Series',
    tagline: 'Natural aesthetic paired with sustainable zero-waste BLDC engineering.',
    category: 'Luxury Decorative',
    price: 5499,
    originalPrice: 7499,
    image: '/media/modern_fan_spinning.mp4',
    hoverVideo: '/media/modern_fan_spinning.mp4',
    description: 'Fuses handcrafted studio texture with high-efficiency motor architecture to bring warmth and nature into living spaces.',
    wattage: 32,
    traditionalWattage: 75,
    airflowCFM: 8100,
    noiseDb: 33,
    sweepMm: 1200,
    bladeMaterial: 'Natural Textured Aluminum',
    finishes: [
      { name: 'Minimalist Studio Grey', color: 'Studio Grey', hex: '#64748b' },
      { name: 'Royal Blue Core', color: 'Blue Core', hex: '#0052cc' },
    ],
    features: [
      'Studio Texture Coating',
      '32W Power Consumption',
      'Sleep Timer & Breeze Mode',
      'RF Remote Control',
      '5-Year Warranty',
    ],
    rating: 4.9,
    reviewCount: 178,
    warrantyYears: 5,
    smartTech: {
      hasVoice: false,
      hasRemote: true,
      hasApp: false,
      hasDuocool: false,
    },
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Vikramaditya S.',
    location: 'Bengaluru, India',
    rating: 5,
    title: 'Reduced electricity bill by ₹1,400 per month!',
    comment: 'Replaced 6 old 75W ceiling fans across our villa with SuperQ Lux and Super X1. Our monthly power bill dropped drastically. Beyond savings, the silence and smooth air circulation are astonishing.',
    verified: true,
    date: 'July 2026',
    productName: 'SuperQ Lux',
  },
  {
    id: 'r2',
    author: 'Dr. Ananya Roy',
    location: 'Mumbai, India',
    rating: 5,
    title: 'The Offline Voice Command is pure magic.',
    comment: 'My parents love the Super myQ Direct Voice fan. They don’t need to look for a remote or open any smartphone app — they just speak to the fan in Hindi and it adjusts speed immediately.',
    verified: true,
    date: 'June 2026',
    productName: 'Super myQ Direct Voice',
  },
  {
    id: 'r3',
    author: 'Karan Mehra',
    location: 'New Delhi, India',
    rating: 5,
    title: 'Architectural masterpiece for modern living rooms.',
    comment: 'As an interior architect, I recommend SuperQ Lux for all high-end residential projects. The electric blue accents and seamless blade curvature elevate the ceiling aesthetic completely.',
    verified: true,
    date: 'May 2026',
    productName: 'SuperQ Lux',
  },
];

export const FAQS: FAQ[] = [
  {
    id: 'f1',
    category: 'Technology',
    question: 'How does a Superfan BLDC Motor save over 69% electricity?',
    answer: 'Traditional ceiling fans use old Induction Motors (AC) that consume 75W to 80W of power, losing over 40% of energy as heat. Superfan uses a patented sensorless Brushless DC (BLDC) motor with permanent neodymium magnets, consuming just 28W to 35W at top speed while delivering superior air volume.',
  },
  {
    id: 'f2',
    category: 'Savings',
    question: 'What is the estimated payback period for purchasing a Superfan?',
    answer: 'Assuming average usage of 14 hours per day at an electricity tariff of ₹8/kWh, a Superfan saves approximately ₹1,800 to ₹2,200 per fan per year compared to a conventional 75W fan. The fan pays for itself in less than 24 months.',
  },
  {
    id: 'f3',
    category: 'Smart Control',
    question: 'Does Super myQ Direct Voice require an active WiFi internet connection?',
    answer: 'No! Super myQ Direct Voice features an onboard AI speech-processing microcontroller that processes voice commands (in English and Hindi) directly inside the fan. It works offline 100% of the time with zero internet or cloud latency.',
  },
  {
    id: 'f4',
    category: 'Installation',
    question: 'Can I replace my existing ceiling fan without altering standard switchboard wiring?',
    answer: 'Yes! Superfan installs on standard ceiling hooks and connects directly to standard 220V AC wiring. You keep standard wall switches ON and control fan speeds, timer, and modes conveniently via RF remote or voice.',
  },
  {
    id: 'f5',
    category: 'Warranty',
    question: 'What is covered under Superfan’s 5-Year Warranty?',
    answer: 'Every Superfan comes with a comprehensive 5-Year On-Site Motor Replacement Warranty. If any issue arises with the BLDC motor or internal drive electronics, our certified technician visits your doorstep for repair or complete unit replacement free of charge.',
  },
];
