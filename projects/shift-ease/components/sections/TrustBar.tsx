export default function TrustBar() {
  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '500+', label: 'Verified Vendors' },
    { number: '50,000+', label: 'Moves Completed' },
    { number: '4.8', label: 'Average Rating' },
  ];

  return (
    <section className="py-12 bg-lightGray">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="heading-lg font-display text-navy">{stat.number}</div>
              <div className="text-sm text-slate mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}