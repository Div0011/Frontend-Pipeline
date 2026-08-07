import type { City } from '@/lib/data';

interface FAQSectionProps {
  city: City;
}

export default function FAQSection({ city }: FAQSectionProps) {
  const faqs = [
    {
      q: `How much does it cost to move in ${city.name}?`,
      a: `Moving costs in ${city.name} vary based on home size, distance, and services required. See our price guide above for indicative ranges, or get a free instant quote for a personalized estimate.`,
    },
    {
      q: 'How do I choose a reliable mover?',
      a: 'Look for verified vendors with GSTIN registration, read customer reviews, and compare at least three quotes before making a decision.',
    },
    {
      q: 'What should I pack before the move?',
      a: 'Start with essentials: documents, valuables, toiletries, and a change of clothes. Label all boxes clearly and keep an inventory of your belongings.',
    },
    {
      q: 'Can I cancel or reschedule my booking?',
      a: 'Yes, most vendors offer flexible cancellation policies. Check the terms with your selected vendor before confirming the booking.',
    },
    {
      q: 'Is my belongings insured during the move?',
      a: 'Many verified vendors offer transit insurance. We recommend confirming insurance coverage with your chosen mover before the move date.',
    },
  ];

  return (
    <section className="section-padding bg-lightGray">
      <div className="container-custom">
        <h2 className="heading-lg font-display text-navy mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-white rounded-xl p-6 shadow-sm group">
              <summary className="cursor-pointer font-semibold text-navy flex items-center justify-between list-none">
                <span>{faq.q}</span>
                <span className="text-teal text-xl transition-transform group-open:rotate-180">+</span>
              </summary>
              <p className="mt-4 text-body text-slate">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}