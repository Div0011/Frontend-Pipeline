import { Metadata } from 'next';
import ContactForm from '@/components/sections/ContactForm';
import ContactInfo from '@/components/sections/ContactInfo';

export const metadata: Metadata = {
  title: 'Contact Us — ShiftEase by Sheetal',
  description: 'Get in touch with ShiftEase by Sheetal. We are here to help with your relocation needs.',
};

export default function ContactPage() {
  return (
    <div className="container-custom py-8">
      <div className="text-center mb-12">
        <h1 className="heading-xl font-display text-navy mb-4">Get in Touch</h1>
        <p className="text-body text-slate max-w-2xl mx-auto">
          Have questions about your move? Contact us and we will help you every step of the way.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  );
}
