"use client";

import { useState } from "react";
import NavigationBar from "@/components/ui/NavigationBar";
import Footer from "@/components/sections/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    newsletter: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <NavigationBar />

      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <h1 className="font-display text-display-lg tracking-tight mb-6">
                Contact
              </h1>
              <p className="font-body text-xl text-ink-muted mb-8">
                Have a question? We'd love to hear from you.
              </p>

              <div className="space-y-6 font-body text-ink-muted">
                <div>
                  <h3 className="font-ui text-sm tracking-widest uppercase text-ink mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:info@fabroar.com"
                    className="text-ink hover:text-amber transition-colors duration-300"
                  >
                    info@fabroar.com
                  </a>
                </div>
                <div>
                  <h3 className="font-ui text-sm tracking-widest uppercase text-ink mb-2">
                    Phone
                  </h3>
                  <a
                    href="tel:+919695106107"
                    className="text-ink hover:text-amber transition-colors duration-300"
                  >
                    +91 9695106107
                  </a>
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="bg-surface-2 p-8 text-center">
                  <p className="font-display text-2xl text-amber mb-2">
                    Thank you
                  </p>
                  <p className="font-body text-ink-muted">
                    Your message has been sent. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="font-ui text-xs tracking-widest uppercase text-ink-muted block mb-2"
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-surface border border-border font-body text-ink focus:outline-none focus:border-amber transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="font-ui text-xs tracking-widest uppercase text-ink-muted block mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-surface border border-border font-body text-ink focus:outline-none focus:border-amber transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="font-ui text-xs tracking-widest uppercase text-ink-muted block mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-surface border border-border font-body text-ink focus:outline-none focus:border-amber transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="font-ui text-xs tracking-widest uppercase text-ink-muted block mb-2"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-surface border border-border font-body text-ink focus:outline-none focus:border-amber transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="font-ui text-xs tracking-widest uppercase text-ink-muted block mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-surface border border-border font-body text-ink focus:outline-none focus:border-amber transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="font-ui text-xs tracking-widest uppercase text-ink-muted block mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-surface border border-border font-body text-ink focus:outline-none focus:border-amber transition-colors duration-300 resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="newsletter"
                      checked={formData.newsletter}
                      onChange={(e) =>
                        setFormData({ ...formData, newsletter: e.target.checked })
                      }
                      className="w-4 h-4 accent-amber"
                    />
                    <label
                      htmlFor="newsletter"
                      className="font-body text-sm text-ink-muted"
                    >
                      I'd also like to subscribe to the newsletter
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-ink text-surface font-ui text-sm tracking-widest uppercase hover:bg-amber transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
