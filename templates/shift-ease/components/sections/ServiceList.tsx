import type { City } from '@/lib/data';

interface ServiceListProps {
  city: City;
}

const allServices = [
  'House Shifting',
  'Office Relocation',
  'Car Transportation',
  'Bicycle Moving',
  'Pet Relocation',
  'Storage Solutions',
  'Packing & Unpacking',
  'Furniture Assembly',
];

export default function ServiceList({ city }: ServiceListProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="heading-lg font-display text-navy mb-8 text-center">Services in {city.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allServices.map((service) => (
            <div key={service} className="bg-lightGray rounded-xl p-4 text-center hover:bg-teal/10 transition-colors">
              <span className="text-sm font-medium text-navy">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}