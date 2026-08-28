export interface City {
  id: string;
  slug: string;
  name: string;
  state: string;
  imageUrl: string;
  avgPrice1bhkLocal: number;
}

export interface Company {
  id: string;
  slug: string;
  name: string;
  ownerName: string;
  gstin: string;
  cityId: string;
  cityName: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  yearsInBusiness: number;
  services: string[];
  logoUrl: string;
  coverUrl: string;
  isVerified: boolean;
  status: 'pending' | 'approved' | 'rejected';
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface Review {
  id: string;
  companyId: string;
  userId: string;
  rating: number;
  text: string;
  moveDate: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Quote {
  id: string;
  fromCity: string;
  toCity: string;
  homeSize: string;
  inventory: string[];
  moveDate: string;
  customerName: string;
  email: string;
  phone: string;
  estimatedPriceMin: number;
  estimatedPriceMax: number;
  status: 'new' | 'contacted' | 'converted' | 'closed';
}

export interface Lead {
  id: string;
  companyId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  imageUrl: string;
}


const cities: City[] = [
  {
    id: '1',
    slug: 'delhi',
    name: 'Delhi',
    state: 'Delhi',
    imageUrl: 'https://images.unsplash.com/photo-1647472024017-253003129043?w=800&q=80',
    avgPrice1bhkLocal: 4500,
  },
  {
    id: '2',
    slug: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80',
    avgPrice1bhkLocal: 6000,
  },
  {
    id: '3',
    slug: 'bangalore',
    name: 'Bangalore',
    state: 'Karnataka',
    imageUrl: 'https://images.unsplash.com/photo-1590114531948-70c4b3c3d4f0?w=800&q=80',
    avgPrice1bhkLocal: 5000,
  },
];

export const companies: Company[] = [
  {
    id: 'c1',
    slug: 'swift-movers-delhi',
    name: 'Swift Movers Delhi',
    ownerName: 'Rajesh Kumar',
    gstin: '07AAAAA0000A1Z1',
    cityId: '1',
    cityName: 'Delhi',
    address: '123, Connaught Place, New Delhi',
    phone: '+91 98765 43210',
    email: 'info@swiftmovers.in',
    website: 'https://swiftmovers.in',
    yearsInBusiness: 12,
    services: ['House Shifting', 'Office Relocation', 'Car Transportation', 'Packing & Unpacking'],
    logoUrl: '',
    coverUrl: '',
    isVerified: true,
    status: 'approved',
    rating: 4.8,
    reviewCount: 245,
    createdAt: '2024-01-15',
  },
  {
    id: 'c2',
    slug: 'safe-shift-services',
    name: 'Safe Shift Services',
    ownerName: 'Anita Sharma',
    gstin: '07AAAAA0000A1Z2',
    cityId: '1',
    cityName: 'Delhi',
    address: '456, Karol Bagh, New Delhi',
    phone: '+91 98765 43211',
    email: 'info@safeshift.in',
    website: 'https://safeshift.in',
    yearsInBusiness: 8,
    services: ['House Shifting', 'Packing & Unpacking', 'Storage Solutions'],
    logoUrl: '',
    coverUrl: '',
    isVerified: true,
    status: 'approved',
    rating: 4.6,
    reviewCount: 189,
    createdAt: '2024-02-20',
  },
  {
    id: 'c3',
    slug: 'metro-movers-delhi',
    name: 'Metro Movers Delhi',
    ownerName: 'Vikram Singh',
    gstin: '07AAAAA0000A1Z3',
    cityId: '1',
    cityName: 'Delhi',
    address: '789, Lajpat Nagar, New Delhi',
    phone: '+91 98765 43212',
    email: 'info@metromovers.in',
    website: '',
    yearsInBusiness: 15,
    services: ['House Shifting', 'Office Relocation', 'Car Transportation', 'Furniture Assembly'],
    logoUrl: '',
    coverUrl: '',
    isVerified: true,
    status: 'approved',
    rating: 4.9,
    reviewCount: 312,
    createdAt: '2023-06-10',
  },
  {
    id: 'c4',
    slug: 'premium-packers-delhi',
    name: 'Premium Packers Delhi',
    ownerName: 'Sunita Gupta',
    gstin: '07AAAAA0000A1Z4',
    cityId: '1',
    cityName: 'Delhi',
    address: '321, Paharganj, New Delhi',
    phone: '+91 98765 43213',
    email: 'info@premiumpackers.in',
    website: 'https://premiumpackers.in',
    yearsInBusiness: 6,
    services: ['House Shifting', 'Packing & Unpacking', 'Pet Relocation'],
    logoUrl: '',
    coverUrl: '',
    isVerified: true,
    status: 'approved',
    rating: 4.5,
    reviewCount: 156,
    createdAt: '2024-03-05',
  },
  {
    id: 'c5',
    slug: 'easy-move-india',
    name: 'Easy Move India',
    ownerName: 'Amit Patel',
    gstin: '07AAAAA0000A1Z5',
    cityId: '1',
    cityName: 'Delhi',
    address: '654, Rohini, New Delhi',
    phone: '+91 98765 43214',
    email: 'info@easymove.in',
    website: 'https://easymove.in',
    yearsInBusiness: 10,
    services: ['House Shifting', 'Office Relocation', 'Bicycle Moving', 'Storage Solutions'],
    logoUrl: '',
    coverUrl: '',
    isVerified: true,
    status: 'approved',
    rating: 4.7,
    reviewCount: 278,
    createdAt: '2023-11-22',
  },
  {
    id: 'c6',
    slug: 'bombay-relocation',
    name: 'Bombay Relocation',
    ownerName: 'Priya Desai',
    gstin: '27AAAAA0000B1Z1',
    cityId: '2',
    cityName: 'Mumbai',
    address: '100, Andheri East, Mumbai',
    phone: '+91 98765 43220',
    email: 'info@bombayrelo.in',
    website: 'https://bombayrelo.in',
    yearsInBusiness: 14,
    services: ['House Shifting', 'Office Relocation', 'Car Transportation', 'Packing & Unpacking'],
    logoUrl: '',
    coverUrl: '',
    isVerified: true,
    status: 'approved',
    rating: 4.9,
    reviewCount: 380,
    createdAt: '2023-01-08',
  },
  {
    id: 'c7',
    slug: 'coastal-movers',
    name: 'Coastal Movers Mumbai',
    ownerName: 'Ravi Nair',
    gstin: '27AAAAA0000B1Z2',
    cityId: '2',
    cityName: 'Mumbai',
    address: '200, Bandra West, Mumbai',
    phone: '+91 98765 43221',
    email: 'info@coastalmovers.in',
    website: '',
    yearsInBusiness: 7,
    services: ['House Shifting', 'Packing & Unpacking', 'Furniture Assembly'],
    logoUrl: '',
    coverUrl: '',
    isVerified: true,
    status: 'approved',
    rating: 4.4,
    reviewCount: 142,
    createdAt: '2024-04-12',
  },
  {
    id: 'c8',
    slug: 'premier-shifters',
    name: 'Premier Shifters Mumbai',
    ownerName: 'Meera Joshi',
    gstin: '27AAAAA0000B1Z3',
    cityId: '2',
    cityName: 'Mumbai',
    address: '300, Borivali, Mumbai',
    phone: '+91 98765 43222',
    email: 'info@premiershifters.in',
    website: 'https://premiershifters.in',
    yearsInBusiness: 11,
    services: ['House Shifting', 'Office Relocation', 'Car Transportation', 'Pet Relocation'],
    logoUrl: '',
    coverUrl: '',
    isVerified: true,
    status: 'approved',
    rating: 4.7,
    reviewCount: 267,
    createdAt: '2023-08-30',
  },
  {
    id: 'c9',
    slug: 'city-movers-mumbai',
    name: 'City Movers Mumbai',
    ownerName: 'Suresh Reddy',
    gstin: '27AAAAA0000B1Z4',
    cityId: '2',
    cityName: 'Mumbai',
    address: '400, Dadar, Mumbai',
    phone: '+91 98765 43223',
    email: 'info@citymovers.in',
    website: 'https://citymovers.in',
    yearsInBusiness: 9,
    services: ['House Shifting', 'Packing & Unpacking', 'Storage Solutions', 'Bicycle Moving'],
    logoUrl: '',
    coverUrl: '',
    isVerified: true,
    status: 'approved',
    rating: 4.5,
    reviewCount: 198,
    createdAt: '2024-02-14',
  },
  {
    id: 'c10',
    slug: 'trusty-transports',
    name: 'Trusty Transports Mumbai',
    ownerName: 'Kavita Menon',
    gstin: '27AAAAA0000B1Z5',
    cityId: '2',
    cityName: 'Mumbai',
    address: '500, Thane, Mumbai',
    phone: '+91 98765 43224',
    email: 'info@trustytransports.in',
    website: '',
    yearsInBusiness: 5,
    services: ['House Shifting', 'Office Relocation', 'Furniture Assembly'],
    logoUrl: '',
    coverUrl: '',
    isVerified: true,
    status: 'approved',
    rating: 4.3,
    reviewCount: 121,
    createdAt: '2024-05-01',
  },
  {
    id: 'c11',
    slug: 'bangalore-movers',
    name: 'Bangalore Movers',
    ownerName: 'Arun Reddy',
    gstin: '29AAAAA0000C1Z1',
    cityId: '3',
    cityName: 'Bangalore',
    address: '10, MG Road, Bangalore',
    phone: '+91 98765 43230',
    email: 'info@bangaloremovers.in',
    website: 'https://bangaloremovers.in',
    yearsInBusiness: 13,
    services: ['House Shifting', 'Office Relocation', 'Car Transportation', 'Packing & Unpacking'],
    logoUrl: '',
    coverUrl: '',
    isVerified: true,
    status: 'approved',
    rating: 4.8,
    reviewCount: 320,
    createdAt: '2023-03-18',
  },
  {
    id: 'c12',
    slug: 'namma-shifters',
    name: 'Namma Shifters',
    ownerName: 'Lakshmi Iyer',
    gstin: '29AAAAA0000C1Z2',
    cityId: '3',
    cityName: 'Bangalore',
    address: '20, Koramangala, Bangalore',
    phone: '+91 98765 43231',
    email: 'info@nammashifters.in',
    website: '',
    yearsInBusiness: 8,
    services: ['House Shifting', 'Packing & Unpacking', 'Pet Relocation', 'Storage Solutions'],
    logoUrl: '',
    coverUrl: '',
    isVerified: true,
    status: 'approved',
    rating: 4.6,
    reviewCount: 210,
    createdAt: '2024-01-25',
  },
  {
    id: 'c13',
    slug: 'techcity-movers',
    name: 'TechCity Movers',
    ownerName: 'Pradeep Sharma',
    gstin: '29AAAAA0000C1Z3',
    cityId: '3',
    cityName: 'Bangalore',
    address: '30, Whitefield, Bangalore',
    phone: '+91 98765 43232',
    email: 'info@techcitymovers.in',
    website: 'https://techcitymovers.in',
    yearsInBusiness: 10,
    services: ['House Shifting', 'Office Relocation', 'Car Transportation', 'Furniture Assembly'],
    logoUrl: '',
    coverUrl: '',
    isVerified: true,
    status: 'approved',
    rating: 4.7,
    reviewCount: 285,
    createdAt: '2023-09-14',
  },
  {
    id: 'c14',
    slug: 'green-globe-relocation',
    name: 'Green Globe Relocation',
    ownerName: 'Shalini Verma',
    gstin: '29AAAAA0000C1Z4',
    cityId: '3',
    cityName: 'Bangalore',
    address: '40, Indiranagar, Bangalore',
    phone: '+91 98765 43233',
    email: 'info@greenglobe.in',
    website: 'https://greenglobe.in',
    yearsInBusiness: 6,
    services: ['House Shifting', 'Packing & Unpacking', 'Bicycle Moving'],
    logoUrl: '',
    coverUrl: '',
    isVerified: true,
    status: 'approved',
    rating: 4.4,
    reviewCount: 165,
    createdAt: '2024-06-08',
  },
  {
    id: 'c15',
    slug: 'elite-movers-bangalore',
    name: 'Elite Movers Bangalore',
    ownerName: 'Deepak Joshi',
    gstin: '29AAAAA0000C1Z5',
    cityId: '3',
    cityName: 'Bangalore',
    address: '50, Jayanagar, Bangalore',
    phone: '+91 98765 43234',
    email: 'info@elitemovers.in',
    website: '',
    yearsInBusiness: 16,
    services: ['House Shifting', 'Office Relocation', 'Car Transportation', 'Packing & Unpacking', 'Storage Solutions'],
    logoUrl: '',
    coverUrl: '',
    isVerified: true,
    status: 'approved',
    rating: 4.9,
    reviewCount: 410,
    createdAt: '2022-12-01',
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getCompaniesByCity(citySlug: string): Company[] {
  return companies.filter((c) => c.cityName?.toLowerCase() === citySlug.toLowerCase() && c.status === 'approved');
}

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

export function getAllCompanies(): Company[] {
  return companies.filter((c) => c.status === 'approved');
}

export function getCities(): City[] {
  return cities;
}

export const sampleReviews: Review[] = [
  {
    id: 'r1',
    companyId: 'c1',
    userId: 'u1',
    rating: 5,
    text: 'ShiftEase helped me connect with Swift Movers Delhi. The crew arrived right on time, wrapped all furniture in double-layer bubble wrap, and moved everything without a single scratch!',
    moveDate: 'June 2026',
    isVerified: true,
    createdAt: '2026-06-15',
  },
  {
    id: 'r2',
    companyId: 'c1',
    userId: 'u2',
    rating: 5,
    text: 'Punctual, professional, and transparent pricing with no hidden charges. Highly recommended for house shifting in NCR.',
    moveDate: 'July 2026',
    isVerified: true,
    createdAt: '2026-07-02',
  },
  {
    id: 'r3',
    companyId: 'c6',
    userId: 'u3',
    rating: 5,
    text: 'Moved my 2BHK from Andheri to Thane smoothly. The team handled fragile glassware exceptionally well.',
    moveDate: 'May 2026',
    isVerified: true,
    createdAt: '2026-05-20',
  },
  {
    id: 'r4',
    companyId: 'c11',
    userId: 'u4',
    rating: 4,
    text: 'Great experience moving within Koramangala, Bangalore. Reasonable rates and polite staff.',
    moveDate: 'June 2026',
    isVerified: true,
    createdAt: '2026-06-28',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    slug: 'stress-free-move-tips',
    title: 'Top 10 Essential Tips for a Stress-Free Home Relocation',
    excerpt: 'Relocating to a new home can feel overwhelming. Follow our proven checklist to keep your move organized, efficient, and hassle-free.',
    category: 'Packing & Moving',
    date: 'July 15, 2026',
    author: 'Sheetal Sharma',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    content: `
Relocating to a new house is an exciting milestone, but without proper planning, it can quickly turn into a chaotic experience. Whether you are moving across town or shifting to a new city, structured preparation is your best friend.

### 1. Start Planning at Least 4 Weeks in Advance
Don’t wait until the final week! Create a dedicated moving checklist covering inventory sorting, utility transfers, and booking verified packers and movers.

### 2. Declutter Before You Pack
Moving items you no longer use increases transit volume and costs. Categorize items into Keep, Donate, and Discard.

### 3. Label Every Box by Room and Fragility
Color-code or clearly write the destination room and contents on top and sides of every box. Mark fragile boxes clearly with "FRAGILE - HANDLE WITH CARE".

### 4. Prepare an Essential "Day 1" Box
Keep medicines, toiletries, phone chargers, key documents, basic cookware, and a change of clothes in an easily accessible bag that stays with you.

### 5. Verify Your Packers & Movers License & GSTIN
Always hire verified vendors with registered GSTINs and physical addresses to ensure insurance coverage and safe transport.
    `,
  },
  {
    id: 'b2',
    slug: 'packing-fragile-items',
    title: 'How to Pack Fragile Electronics & Glassware Like a Pro',
    excerpt: 'Learn the exact techniques used by professional movers to safeguard delicate crockery, televisions, and artwork during transit.',
    category: 'Guides',
    date: 'July 10, 2026',
    author: 'Amit Patel',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80',
    content: `
Damaged glassware or broken television screens are every home mover's worst nightmare. Protecting delicate items requires multi-layered cushioning and sturdy reinforced boxes.

### Double-Layer Cushioning
Use high-density bubble wrap as the inner wrap, followed by corrugated cardboard outer protection.

### Heavy Items at Bottom, Fragile Items on Top
Never stack heavy boxes on top of boxes containing glass or electronic equipment.

### Fill Air Gaps
Use crumpled packing paper or foam peanuts to eliminate empty space inside boxes so items cannot shift during truck travel.
    `,
  },
  {
    id: 'b3',
    slug: 'delhi-vs-mumbai-moving-cost',
    title: 'Delhi vs Mumbai vs Bangalore: A Complete Moving Cost Breakdown',
    excerpt: 'Compare average local house shifting charges, labor costs, and truck rental rates across major Indian metro cities.',
    category: 'Cost Analysis',
    date: 'July 5, 2026',
    author: 'Sheetal Sharma',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&q=80',
    content: `
Relocation costs vary significantly between metro cities based on labor availability, toll taxes, building lift access, and local traffic conditions.

### Average 1BHK Shifting Charges:
- **Delhi NCR**: ₹4,500 – ₹7,500
- **Mumbai**: ₹6,000 – ₹9,500 (higher due to narrow staircases and floor levies)
- **Bangalore**: ₹5,000 – ₹8,000

### Intercity Long-Distance Moving Factors
Intercity moves add per-kilometer vehicle transport costs, state entry permit taxes, and transit insurance (typically 3% of declared goods value).
    `,
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getReviewsByCompanyId(companyId: string): Review[] {
  return sampleReviews.filter((r) => r.companyId === companyId);
}