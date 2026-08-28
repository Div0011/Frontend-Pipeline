import type { City } from '@/lib/data';

interface CityHeaderProps {
  city: City;
}

export default function CityHeader({ city }: CityHeaderProps) {
  return (
    <section className="relative py-20 bg-navy overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${city.imageUrl || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-navy/80" />
      <div className="relative container-custom text-center">
        <h1 className="heading-xl font-display text-white mb-4">Packers & Movers in {city.name}</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Find the best verified packers and movers in {city.name}. Compare services, read reviews, and get instant quotes.
        </p>
      </div>
    </section>
  );
}