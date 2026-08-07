import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-16 bg-teal">
      <div className="container-custom text-center">
        <h2 className="heading-lg font-display text-white mb-4">Ready to Move?</h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Get started today with a free, no-obligation quote from verified packers and movers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quote" className="bg-white text-teal px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors inline-flex items-center justify-center gap-2">
            Get Instant Quote
          </Link>
          <Link href="/list-your-business" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2">
            List Your Business
          </Link>
        </div>
      </div>
    </section>
  );
}