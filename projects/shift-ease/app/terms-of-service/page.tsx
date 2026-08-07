import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — ShiftEase by Sheetal',
  description: 'Read our terms of service to understand the rules and guidelines for using ShiftEase by Sheetal.',
};

export default function TermsOfServicePage() {
  return (
    <div className="container-custom py-8 prose max-w-3xl mx-auto">
      <h1 className="heading-xl font-display text-navy mb-8">Terms of Service</h1>
      <p className="text-body text-slate mb-4">Last updated: July 2026</p>
      <section className="mb-8">
        <h2 className="heading-md font-display text-navy mb-4">1. Acceptance of Terms</h2>
        <p className="text-body text-slate mb-4">By accessing and using ShiftEase by Sheetal, you agree to be bound by these terms of service. If you do not agree, please do not use our platform.</p>
      </section>
      <section className="mb-8">
        <h2 className="heading-md font-display text-navy mb-4">2. Services Provided</h2>
        <p className="text-body text-slate mb-4">ShiftEase by Sheetal is a business directory and booking platform that connects customers with verified packers and movers. We do not provide moving services directly.</p>
      </section>
      <section className="mb-8">
        <h2 className="heading-md font-display text-navy mb-4">3. User Responsibilities</h2>
        <p className="text-body text-slate mb-4">Users are responsible for providing accurate information and for their interactions with listed businesses. We are not liable for disputes between customers and vendors.</p>
      </section>
      <section className="mb-8">
        <h2 className="heading-md font-display text-navy mb-4">4. Limitation of Liability</h2>
        <p className="text-body text-slate mb-4">ShiftEase by Sheetal is provided on an as-is basis. We are not liable for any damages arising from the use of our platform or the services provided by listed businesses.</p>
      </section>
      <section className="mb-8">
        <h2 className="heading-md font-display text-navy mb-4">5. Changes to Terms</h2>
        <p className="text-body text-slate">We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page.</p>
      </section>
    </div>
  );
}
