import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — ShiftEase by Sheetal',
  description: 'Read our privacy policy to understand how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-custom py-8 prose max-w-3xl mx-auto">
      <h1 className="heading-xl font-display text-navy mb-8">Privacy Policy</h1>
      <p className="text-body text-slate mb-4">Last updated: July 2026</p>
      <section className="mb-8">
        <h2 className="heading-md font-display text-navy mb-4">1. Information We Collect</h2>
        <p className="text-body text-slate mb-4">We collect personal information that you voluntarily provide when using our platform, including your name, email address, phone number, and move details.</p>
      </section>
      <section className="mb-8">
        <h2 className="heading-md font-display text-navy mb-4">2. How We Use Your Information</h2>
        <p className="text-body text-slate mb-4">Your information is used to facilitate your relocation, connect you with verified vendors, and improve our services. We do not sell your personal data to third parties.</p>
      </section>
      <section className="mb-8">
        <h2 className="heading-md font-display text-navy mb-4">3. Data Security</h2>
        <p className="text-body text-slate mb-4">We implement industry-standard security measures to protect your personal information. All data is encrypted in transit and at rest.</p>
      </section>
      <section className="mb-8">
        <h2 className="heading-md font-display text-navy mb-4">4. Your Rights</h2>
        <p className="text-body text-slate mb-4">You have the right to access, correct, or delete your personal data at any time. Contact us to exercise these rights.</p>
      </section>
      <section className="mb-8">
        <h2 className="heading-md font-display text-navy mb-4">5. Contact</h2>
        <p className="text-body text-slate">For privacy-related inquiries, please contact us at privacy@shiftEase.in.</p>
      </section>
    </div>
  );
}
