import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions — Fabroar",
  description: "Terms and conditions for Fabroar.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <div className="pt-32 pb-24">
        <div className="container-custom max-w-3xl">
          <h1 className="font-display text-display-md tracking-tight mb-8">
            Terms & Conditions
          </h1>
          <div className="space-y-6 font-body text-ink-muted">
            <p>
              By using the Fabroar website, you agree to the following terms and conditions.
            </p>
            <h2 className="font-ui text-sm tracking-widest uppercase text-ink pt-4">
              Use of Site
            </h2>
            <p>
              You agree to use this website only for lawful purposes and in a way that does not infringe the rights of others.
            </p>
            <h2 className="font-ui text-sm tracking-widest uppercase text-ink pt-4">
              Orders & Payment
            </h2>
            <p>
              All orders are subject to availability. We reserve the right to cancel any order at our discretion. Payment must be received before dispatch.
            </p>
            <h2 className="font-ui text-sm tracking-widest uppercase text-ink pt-4">
              Intellectual Property
            </h2>
            <p>
              All content on this website, including images, text, and designs, is the property of Fabroar and may not be reproduced without permission.
            </p>
            <h2 className="font-ui text-sm tracking-widest uppercase text-ink pt-4">
              Contact Us
            </h2>
            <p>
              For questions about these terms, contact us at info@fabroar.com.
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
