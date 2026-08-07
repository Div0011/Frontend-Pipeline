import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Fabroar",
  description: "Privacy policy for Fabroar.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <div className="pt-32 pb-24">
        <div className="container-custom max-w-3xl">
          <h1 className="font-display text-display-md tracking-tight mb-8">
            Privacy Policy
          </h1>
          <div className="space-y-6 font-body text-ink-muted">
            <p>
              At Fabroar, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you visit our website or make a purchase.
            </p>
            <h2 className="font-ui text-sm tracking-widest uppercase text-ink pt-4">
              Information We Collect
            </h2>
            <p>
              We collect information you provide directly, such as your name, email address, shipping address, and payment details when you place an order. We also collect usage data to improve our website experience.
            </p>
            <h2 className="font-ui text-sm tracking-widest uppercase text-ink pt-4">
              How We Use Your Information
            </h2>
            <p>
              We use your information to process orders, communicate about purchases, and improve our services. We do not sell your personal data to third parties.
            </p>
            <h2 className="font-ui text-sm tracking-widest uppercase text-ink pt-4">
              Contact Us
            </h2>
            <p>
              If you have questions about this policy, please contact us at info@fabroar.com.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-ui text-sm text-amber hover:text-ink transition-colors duration-300 mt-8"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
