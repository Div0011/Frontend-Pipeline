import { Metadata } from 'next';
import Link from 'next/link';
import { getCities, companies } from '@/lib/data';
import { MapPin, ArrowRight, ShieldCheck, Truck, Building2, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top Cities Packers & Movers Directory — ShiftEase by Sheetal',
  description: 'Find verified packers and movers across top Indian metro cities including Delhi NCR, Mumbai, Bangalore, Pune, and Hyderabad.',
};

export default function CitiesPage() {
  const cities = getCities();

  const extraCities = [
    ...cities,
    {
      id: '4',
      slug: 'pune',
      name: 'Pune',
      state: 'Maharashtra',
      imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&q=80',
      avgPrice1bhkLocal: 4800,
    },
    {
      id: '5',
      slug: 'hyderabad',
      name: 'Hyderabad',
      state: 'Telangana',
      imageUrl: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&q=80',
      avgPrice1bhkLocal: 4600,
    },
  ];

  return (
    <div className="container-custom py-10 space-y-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-navy via-slate-900 to-teal/20 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="badge bg-teal/20 text-teal text-xs uppercase font-bold py-1 px-3">Pan-India Coverage</span>
          <h1 className="heading-xl font-display text-white">Top Cities for Verified Relocations</h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Explore verified packers and movers across major metro hubs. Compare local shifting rates, vendor GSTIN ratings, and book with 100% price transparency.
          </p>
        </div>
      </div>

      {/* Grid of Cities */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="heading-lg font-display text-navy">Major Relocation Hubs</h2>
            <p className="text-small text-slate mt-1">Select a city to view top rated verified local packers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {extraCities.map((city) => {
            const cityVendors = companies.filter((c) => c.cityName.toLowerCase() === city.slug.toLowerCase());
            const vendorCount = cityVendors.length || 5;

            return (
              <div key={city.slug} className="card group hover:-translate-y-1 hover:border-teal/50 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="h-48 relative overflow-hidden bg-navy/10">
                    <img
                      src={city.imageUrl}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-navy/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal" /> {city.state}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="heading-md font-display text-navy group-hover:text-teal transition-colors">
                        {city.name}
                      </h3>
                      <span className="badge bg-teal/10 text-teal text-xs font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified Hub
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-lightGray p-3.5 rounded-xl border border-gray-100">
                      <div>
                        <span className="text-slate block">Avg 1BHK Shifting</span>
                        <strong className="text-navy text-sm font-bold mt-0.5 block">
                          ₹{city.avgPrice1bhkLocal.toLocaleString()} approx
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate block">Audited Vendors</span>
                        <strong className="text-teal text-sm font-bold mt-0.5 block">
                          {vendorCount}+ Active
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  <Link
                    href={`/cities/${city.slug}`}
                    className="btn-primary w-full text-center text-sm py-2.5 flex items-center justify-center gap-2"
                  >
                    View {city.name} Packers <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Intercity Cost Reference Table */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 space-y-6">
        <div>
          <h2 className="heading-md font-display text-navy mb-1 flex items-center gap-2">
            <Truck className="w-5 h-5 text-teal" /> Intercity Moving Price Benchmark
          </h2>
          <p className="text-small text-slate">Average cost estimates for intercity home shifting between major metros.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate">
            <thead className="bg-navy text-white text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">Route</th>
                <th className="px-6 py-4 font-semibold">1 BHK Range</th>
                <th className="px-6 py-4 font-semibold">2 BHK Range</th>
                <th className="px-6 py-4 font-semibold">3 BHK Range</th>
                <th className="px-6 py-4 font-semibold">Transit Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              <tr className="hover:bg-lightGray/60">
                <td className="px-6 py-4 text-navy font-bold flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-teal" /> Delhi NCR ➔ Mumbai
                </td>
                <td className="px-6 py-4">₹11,000 – ₹16,000</td>
                <td className="px-6 py-4">₹17,000 – ₹24,000</td>
                <td className="px-6 py-4">₹26,000 – ₹38,000</td>
                <td className="px-6 py-4 text-teal">3 - 4 Days</td>
              </tr>
              <tr className="hover:bg-lightGray/60">
                <td className="px-6 py-4 text-navy font-bold flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-teal" /> Delhi NCR ➔ Bangalore
                </td>
                <td className="px-6 py-4">₹13,500 – ₹19,000</td>
                <td className="px-6 py-4">₹20,000 – ₹28,000</td>
                <td className="px-6 py-4">₹30,000 – ₹42,000</td>
                <td className="px-6 py-4 text-teal">4 - 5 Days</td>
              </tr>
              <tr className="hover:bg-lightGray/60">
                <td className="px-6 py-4 text-navy font-bold flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-teal" /> Mumbai ➔ Bangalore
                </td>
                <td className="px-6 py-4">₹9,500 – ₹14,000</td>
                <td className="px-6 py-4">₹15,000 – ₹21,000</td>
                <td className="px-6 py-4">₹22,000 – ₹32,000</td>
                <td className="px-6 py-4 text-teal">2 - 3 Days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
