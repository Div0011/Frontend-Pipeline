export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Tell Us About Your Move',
      description: 'Enter your origin, destination, and move details in our simple quote form.',
    },
    {
      number: '02',
      title: 'Get Instant Estimates',
      description: 'Receive price ranges from verified packers and movers in your area.',
    },
    {
      number: '03',
      title: 'Compare and Book',
      description: 'Compare services, read verified reviews, and book the best fit for you.',
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg font-display text-navy mb-4">How It Works</h2>
          <p className="text-body text-slate max-w-2xl mx-auto">
            Three simple steps to find your perfect moving partner and get a transparent price estimate.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative p-8">
              <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="font-display font-bold text-2xl text-teal">{step.number}</span>
              </div>
              <h3 className="heading-md font-display text-navy mb-3">{step.title}</h3>
              <p className="text-body text-slate">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 right-0 w-8 border-t-2 border-dashed border-teal/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}