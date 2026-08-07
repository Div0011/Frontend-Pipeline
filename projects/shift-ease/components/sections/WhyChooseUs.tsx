export default function WhyChooseUs() {
  const features = [
    {
      icon: '✓',
      title: 'Verified Vendors',
      description: 'Every business in our directory is verified with GSTIN and customer reviews.',
    },
    {
      icon: '💰',
      title: 'Transparent Pricing',
      description: 'Get instant price estimates with no hidden fees or surprise charges.',
    },
    {
      icon: '🛡️',
      title: 'Book with Confidence',
      description: 'Our verified review system ensures you only see genuine customer feedback.',
    },
    {
      icon: '📞',
      title: 'Dedicated Support',
      description: 'Our team is available to help you with any questions or concerns.',
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg font-display text-navy mb-4">Why Choose ShiftEase</h2>
          <p className="text-body text-slate max-w-2xl mx-auto">
            We make your relocation simple, transparent, and stress-free.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4 p-6 rounded-xl hover:bg-lightGray transition-colors">
              <div className="text-3xl flex-shrink-0 mt-1">{feature.icon}</div>
              <div>
                <h3 className="heading-md font-display text-navy mb-2">{feature.title}</h3>
                <p className="text-body text-slate">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}