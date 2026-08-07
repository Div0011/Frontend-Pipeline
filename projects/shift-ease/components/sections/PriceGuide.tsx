import type { City } from '@/lib/data';

interface PriceGuideProps {
  city: City;
}

export default function PriceGuide({ city }: PriceGuideProps) {
  const priceRanges = [
    { size: '1 BHK', price: '₹3,000 – ₹6,000', distance: 'Within 10 km' },
    { size: '2 BHK', price: '₹5,000 – ₹12,000', distance: 'Within 20 km' },
    { size: '3 BHK', price: '₹8,000 – ₹20,000', distance: 'Within 30 km' },
    { size: '4 BHK+', price: '₹15,000 – ₹35,000', distance: 'Within 50 km' },
  ];

  return (
    <section className="py-12 bg-lightGray">
      <div className="container-custom">
        <h2 className="heading-md font-display text-navy mb-6 text-center">Average Moving Costs</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-navy text-white">
                <th className="text-left px-6 py-3 font-semibold">Home Size</th>
                <th className="text-left px-6 py-3 font-semibold">Estimated Price</th>
                <th className="text-left px-6 py-3 font-semibold">Typical Distance</th>
              </tr>
            </thead>
            <tbody>
              {priceRanges.map((range, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-lightGray'}>
                  <td className="px-6 py-4 text-navy font-medium">{range.size}</td>
                  <td className="px-6 py-4 text-teal font-semibold">{range.price}</td>
                  <td className="px-6 py-4 text-slate">{range.distance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-small text-slate mt-4 text-center">
          Prices are indicative and may vary based on distance, season, and specific requirements.
        </p>
      </div>
    </section>
  );
}