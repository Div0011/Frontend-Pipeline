import Link from "next/link";

export const metadata = {
  title: "Returns & Refunds — Fabroar",
  description: "Return and refund policy for Fabroar.",
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen">
      <div className="pt-32 pb-24">
        <div className="container-custom max-w-3xl">
          <h1 className="font-display text-display-md tracking-tight mb-8">
            Returns & Refunds
          </h1>
          <div className="space-y-6 font-body text-ink-muted">
            <p>
              We want you to love your Fabroar tee. If you&apos;re not satisfied, we&apos;re here to help.
            </p>
            <h2 className="font-ui text-sm tracking-widest uppercase text-ink pt-4">
              Return Window
            </h2>
            <p>
              You have 7 days from the date of delivery to return any unworn, unwashed item with original tags attached.
            </p>
            <h2 className="font-ui text-sm tracking-widest uppercase text-ink pt-4">
              Refunds
            </h2>
            <p>
              Once we receive and inspect your return, we&apos;ll process a refund to your original payment method within 5-7 business days.
            </p>
            <h2 className="font-ui text-sm tracking-widest uppercase text-ink pt-4">
              Exchanges
            </h2>
            <p>
              Need a different size? We offer free size exchanges within 7 days of delivery, subject to availability.
            </p>
            <h2 className="font-ui text-sm tracking-widest uppercase text-ink pt-4">
              Contact Us
            </h2>
            <p>
              For returns and exchanges, email us at info@fabroar.com or call +91 9695106107.
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
