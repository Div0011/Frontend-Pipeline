import Link from 'next/link';

const cities = [
  { name: 'Delhi', slug: 'delhi', image: 'https://images.unsplash.com/photo-1647472024017-253003129043?w=600&q=80', description: 'Professional packers across the capital region' },
  { name: 'Mumbai', slug: 'mumbai', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80', description: 'Trusted moving services in the financial hub' },
  { name: 'Bangalore', slug: 'bangalore', image: 'https://images.unsplash.com/photo-1590114531948-70c4b3c3d4f0?w=600&q=80', description: 'Reliable relocation partners in India\'s tech capital' },
];

export default function CityCards() {
  return (
    <section className="section-padding bg-lightGray">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg font-display text-navy mb-4">Explore Cities</h2>
          <p className="text-body text-slate max-w-2xl mx-auto">
            Browse verified packers and movers across India\'s major cities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cities.map((city) => (
            <Link key={city.slug} href={`/cities/${city.slug}`} className="group block">
              <div className="card overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="heading-md font-display text-white">{city.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-body text-slate">{city.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}