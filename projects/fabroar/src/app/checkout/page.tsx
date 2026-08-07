"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, CreditCard, ShieldCheck, QrCode, Building2, Banknote, CheckCircle2, Lock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import NavigationBar from "@/components/ui/NavigationBar";
import Footer from "@/components/sections/Footer";

type CheckoutStep = "details" | "payment" | "processing" | "confirm";
type PaymentMethod = "upi" | "card" | "netbanking" | "cod";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const [step, setStep] = useState<CheckoutStep>("details");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    name: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
  });

  // Payment State
  const [upiId, setUpiId] = useState("");
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  const [orderId, setOrderId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const delivery = subtotal() >= 499 ? 0 : 50;
  const codSurcharge = paymentMethod === "cod" ? 50 : 0;
  const total = subtotal() + delivery + codSurcharge;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setStep("processing");

    // Simulate secure payment gateway verification delay
    setTimeout(() => {
      const generatedId = `FB${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsProcessing(false);
      setStep("confirm");
      clearCart();
    }, 2400);
  };

  if (items.length === 0 && step !== "confirm") {
    return (
      <div className="min-h-screen relative overflow-hidden bg-[var(--color-surface)] text-[var(--color-ink)]">
        <NavigationBar />
        <div className="pt-32 pb-24 relative z-10">
          <div className="container-custom text-center max-w-md">
            <h1 className="font-display text-display-md tracking-tight mb-4 text-[var(--color-ink)]">
              Your cart is empty
            </h1>
            <p className="font-body text-[var(--color-sand)] mb-8">
              Explore our collections and add products to your cart before proceeding to checkout.
            </p>
            <Link
              href="/men"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4654A] text-[#F5F0E8] font-ui text-sm font-bold tracking-widest uppercase hover:bg-[#E07A60] transition-colors shadow-lg rounded-sm"
            >
              Explore Products →
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[var(--color-surface)] text-[var(--color-ink)]">
      <NavigationBar />

      <div className="pt-28 pb-20 md:pt-36 md:pb-28 relative z-10">
        <div className="container-custom max-w-6xl">
          <Link
            href="/men"
            className="inline-flex items-center gap-2 font-ui text-sm text-[var(--color-sand)] hover:text-[#D4654A] transition-colors duration-300 mb-6 font-semibold"
          >
            <ChevronLeft size={16} />
            Back to Shop
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-[#D4654A]/25 pb-6">
            <h1 className="font-display text-display-md tracking-tight text-[var(--color-ink)]">
              Fabroar Checkout & Payment
            </h1>
            <div className="flex items-center gap-2 text-[var(--color-sand)] font-ui text-xs font-bold">
              <Lock size={14} className="text-[#D4654A]" />
              <span>256-Bit SSL Encrypted Payment</span>
            </div>
          </div>

          {/* ORDER CONFIRMATION SCREEN */}
          {step === "confirm" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[var(--color-surface-2)] border border-[#D4654A]/30 p-8 md:p-12 rounded-sm max-w-2xl mx-auto text-center shadow-2xl"
            >
              <div className="w-20 h-20 rounded-full bg-[#D4654A] text-[#F5F0E8] flex items-center justify-center mx-auto mb-6 shadow-xl animate-bounce">
                <CheckCircle2 size={44} />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 text-[var(--color-ink)]">
                Payment Successful!
              </h2>
              <p className="font-ui text-xs tracking-widest uppercase text-[var(--color-sand)] font-bold mb-6">
                Order ID: <span className="text-[var(--color-ink)] bg-[var(--color-surface)] px-3 py-1 rounded border border-[#D4654A]/30">{orderId}</span>
              </p>

              <p className="font-body text-[var(--color-ink)]/90 mb-8 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name || "Customer"}</strong>! We have received your payment and confirmed your order. A receipt has been sent to <strong>{formData.email}</strong>.
              </p>

              <div className="bg-[var(--color-surface)] p-5 rounded border border-[#D4654A]/30 text-left mb-8 space-y-2">
                <div className="flex justify-between font-ui text-xs text-[var(--color-sand)]">
                  <span>Shipping Address:</span>
                  <span className="text-[var(--color-ink)] font-semibold">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between font-ui text-xs text-[var(--color-sand)]">
                  <span>Estimated Dispatch:</span>
                  <span className="text-[var(--color-ink)] font-semibold">Within 48 Hours</span>
                </div>
                <div className="flex justify-between font-ui text-xs text-[var(--color-sand)]">
                  <span>Payment Mode:</span>
                  <span className="text-[var(--color-ink)] font-semibold uppercase">{paymentMethod}</span>
                </div>
              </div>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-10 py-4 bg-[#D4654A] text-[#F5F0E8] font-ui text-sm font-bold tracking-widest uppercase hover:bg-[#E07A60] transition-all rounded-sm shadow-lg"
              >
                Back to Homepage
              </Link>
            </motion.div>
          ) : step === "processing" ? (
            /* PAYMENT PROCESSING SCREEN */
            <div className="bg-[var(--color-surface-2)] border border-[#D4654A]/30 p-12 rounded-sm max-w-md mx-auto text-center py-20 shadow-2xl">
              <div className="w-16 h-16 border-4 border-[#D4654A] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              <h3 className="font-display text-2xl font-bold mb-2 text-[var(--color-ink)]">
                Processing Secure Payment
              </h3>
              <p className="font-body text-sm text-[var(--color-sand)]">
                Please wait while we connect to your bank gateway...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* LEFT COLUMN: Steps Form */}
              <div className="lg:col-span-7 space-y-8">
                {/* Step indicator */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded font-ui text-xs font-bold transition-all ${
                      step === "details"
                        ? "bg-[#D4654A] text-[#F5F0E8] shadow"
                        : "bg-[var(--color-surface-2)] text-[var(--color-sand)] border border-[#D4654A]/30"
                    }`}
                  >
                    1. Shipping Details
                  </div>
                  <div className="h-px bg-[#D4654A]/30 flex-1" />
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded font-ui text-xs font-bold transition-all ${
                      step === "payment"
                        ? "bg-[#D4654A] text-[#F5F0E8] shadow"
                        : "bg-[var(--color-surface-2)] text-[var(--color-sand)] border border-[#D4654A]/30"
                    }`}
                  >
                    2. Payment Gateway
                  </div>
                </div>

                {/* STEP 1: SHIPPING DETAILS */}
                {step === "details" && (
                  <form onSubmit={handleProceedToPayment} className="space-y-5 bg-[var(--color-surface-2)] border border-[#D4654A]/30 p-6 md:p-8 rounded-sm shadow-xl">
                    <h3 className="font-display text-xl font-bold border-b border-[#D4654A]/25 pb-3 text-[var(--color-ink)]">
                      Shipping & Contact Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="font-ui text-xs tracking-wider uppercase text-[var(--color-sand)] block mb-1.5 font-semibold">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[#D4654A]/40 rounded-sm text-[var(--color-ink)] placeholder:text-[var(--color-sand)]/60 focus:outline-none focus:border-[#D4654A] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="font-ui text-xs tracking-wider uppercase text-[var(--color-sand)] block mb-1.5 font-semibold">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[#D4654A]/40 rounded-sm text-[var(--color-ink)] placeholder:text-[var(--color-sand)]/60 focus:outline-none focus:border-[#D4654A] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-ui text-xs tracking-wider uppercase text-[var(--color-sand)] block mb-1.5 font-semibold">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[#D4654A]/40 rounded-sm text-[var(--color-ink)] placeholder:text-[var(--color-sand)]/60 focus:outline-none focus:border-[#D4654A] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="font-ui text-xs tracking-wider uppercase text-[var(--color-sand)] block mb-1.5 font-semibold">
                        Street Address *
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="House / Flat No., Street, Area"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[#D4654A]/40 rounded-sm text-[var(--color-ink)] placeholder:text-[var(--color-sand)]/60 focus:outline-none focus:border-[#D4654A] transition-colors resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-ui text-xs tracking-wider uppercase text-[var(--color-sand)] block mb-1.5 font-semibold">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Mumbai"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[#D4654A]/40 rounded-sm text-[var(--color-ink)] placeholder:text-[var(--color-sand)]/60 focus:outline-none focus:border-[#D4654A] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="font-ui text-xs tracking-wider uppercase text-[var(--color-sand)] block mb-1.5 font-semibold">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="400001"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[#D4654A]/40 rounded-sm text-[var(--color-ink)] placeholder:text-[var(--color-sand)]/60 focus:outline-none focus:border-[#D4654A] transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#D4654A] text-[#F5F0E8] font-ui text-xs tracking-widest uppercase font-bold hover:bg-[#E07A60] transition-all rounded-sm shadow-lg mt-4 flex items-center justify-center gap-2"
                    >
                      Proceed to Payment Gateway →
                    </button>
                  </form>
                )}

                {/* STEP 2: PAYMENT GATEWAY */}
                {step === "payment" && (
                  <form onSubmit={handlePayNow} className="space-y-6 bg-[var(--color-surface-2)] border border-[#D4654A]/30 p-6 md:p-8 rounded-sm shadow-xl">
                    <h3 className="font-display text-xl font-bold border-b border-[#D4654A]/25 pb-3 flex justify-between items-center text-[var(--color-ink)]">
                      <span>Select Payment Gateway</span>
                      <span className="font-ui text-xs text-[var(--color-sand)] font-normal">Step 2 of 2</span>
                    </h3>

                    {/* Payment Method Tabs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: "upi", label: "UPI / QR", icon: QrCode },
                        { id: "card", label: "Card", icon: CreditCard },
                        { id: "netbanking", label: "Net Banking", icon: Building2 },
                        { id: "cod", label: "Cash (COD)", icon: Banknote },
                      ].map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setPaymentMethod(id as PaymentMethod)}
                          className={`p-3 border rounded-sm flex flex-col items-center gap-1.5 font-ui text-xs font-bold transition-all ${
                            paymentMethod === id
                              ? "border-[#D4654A] bg-[#D4654A] text-[#F5F0E8] shadow-lg scale-105"
                              : "border-[#D4654A]/30 bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[#D4654A]"
                          }`}
                        >
                          <Icon size={20} />
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>

                    {/* DYNAMIC PAYMENT METHOD BODY */}
                    <div className="bg-[var(--color-surface)] p-5 rounded-sm border border-[#D4654A]/30">
                      {/* UPI Option */}
                      {paymentMethod === "upi" && (
                        <div className="space-y-4 text-center">
                          <p className="font-ui text-xs tracking-wider uppercase text-[var(--color-ink)] font-bold">
                            Scan QR Code or enter UPI VPA ID
                          </p>
                          <div className="w-36 h-36 bg-white p-2 mx-auto rounded shadow-lg flex items-center justify-center border border-[#D4654A]/30">
                            {/* Visual QR Code preview */}
                            <QrCode size={120} className="text-[#0F0F0F]" />
                          </div>
                          <p className="font-ui text-[11px] text-[var(--color-sand)]">
                            Scan using Google Pay, PhonePe, Paytm, or BHIM
                          </p>
                          <div>
                            <label className="font-ui text-xs uppercase text-[var(--color-sand)] block mb-1 text-left font-semibold">
                              Enter VPA / UPI ID
                            </label>
                            <input
                              type="text"
                              placeholder="mobile@upi / username@okaxis"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              className="w-full px-4 py-3 bg-[var(--color-surface-2)] border border-[#D4654A]/40 rounded text-[var(--color-ink)] placeholder:text-[var(--color-sand)]/60 font-ui text-sm focus:outline-none focus:border-[#D4654A]"
                            />
                          </div>
                        </div>
                      )}

                      {/* Credit/Debit Card Option */}
                      {paymentMethod === "card" && (
                        <div className="space-y-4">
                          <div>
                            <label className="font-ui text-xs uppercase text-[var(--color-sand)] block mb-1 font-semibold">
                              Card Number
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="4532 •••• •••• 8921"
                              value={cardData.number}
                              onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                              className="w-full px-4 py-3 bg-[var(--color-surface-2)] border border-[#D4654A]/40 rounded text-[var(--color-ink)] placeholder:text-[var(--color-sand)]/60 font-ui text-sm focus:outline-none focus:border-[#D4654A]"
                            />
                          </div>
                          <div>
                            <label className="font-ui text-xs uppercase text-[var(--color-sand)] block mb-1 font-semibold">
                              Cardholder Name
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Name on Card"
                              value={cardData.name}
                              onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                              className="w-full px-4 py-3 bg-[var(--color-surface-2)] border border-[#D4654A]/40 rounded text-[var(--color-ink)] placeholder:text-[var(--color-sand)]/60 font-ui text-sm focus:outline-none focus:border-[#D4654A]"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="font-ui text-xs uppercase text-[var(--color-sand)] block mb-1 font-semibold">
                                Expiry (MM/YY)
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="08/28"
                                value={cardData.expiry}
                                onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                                className="w-full px-4 py-3 bg-[var(--color-surface-2)] border border-[#D4654A]/40 rounded text-[var(--color-ink)] placeholder:text-[var(--color-sand)]/60 font-ui text-sm focus:outline-none focus:border-[#D4654A]"
                              />
                            </div>
                            <div>
                              <label className="font-ui text-xs uppercase text-[var(--color-sand)] block mb-1 font-semibold">
                                CVV / CVC
                              </label>
                              <input
                                type="password"
                                required
                                maxLength={4}
                                placeholder="•••"
                                value={cardData.cvv}
                                onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                                className="w-full px-4 py-3 bg-[var(--color-surface-2)] border border-[#D4654A]/40 rounded text-[var(--color-ink)] placeholder:text-[var(--color-sand)]/60 font-ui text-sm focus:outline-none focus:border-[#D4654A]"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Net Banking Option */}
                      {paymentMethod === "netbanking" && (
                        <div className="space-y-3">
                          <label className="font-ui text-xs uppercase text-[var(--color-sand)] block font-semibold">
                            Select Your Bank
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Bank", "Punjab National Bank"].map((bank) => (
                              <button
                                key={bank}
                                type="button"
                                onClick={() => setSelectedBank(bank)}
                                className={`p-3 border rounded text-left font-ui text-xs font-bold transition-all ${
                                  selectedBank === bank
                                    ? "bg-[#D4654A] text-[#F5F0E8] border-[#D4654A]"
                                    : "bg-[var(--color-surface-2)] text-[var(--color-ink)] border-[#D4654A]/30 hover:border-[#D4654A]"
                                }`}
                              >
                                {bank}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* COD Option */}
                      {paymentMethod === "cod" && (
                        <div className="space-y-2 text-left">
                          <p className="font-ui text-sm font-bold text-[var(--color-ink)]">
                            Cash on Delivery (COD) Selected
                          </p>
                          <p className="font-body text-xs text-[var(--color-sand)] leading-relaxed">
                            Pay in cash to the courier agent upon arrival. A small COD handling fee of ₹50 will be added to your order total.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep("details")}
                        className="px-6 py-4 border border-[#D4654A] text-[var(--color-ink)] font-ui text-xs tracking-widest uppercase font-bold hover:bg-[#D4654A] hover:text-[#F5F0E8] transition-colors rounded-sm"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-4 bg-[#D4654A] text-[#F5F0E8] font-ui text-xs tracking-widest uppercase font-bold hover:bg-[#E07A60] transition-all rounded-sm shadow-lg flex items-center justify-center gap-2"
                      >
                        Pay ₹{total.toLocaleString("en-IN")} Now →
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* RIGHT COLUMN: Order Summary Sidebar */}
              <div className="lg:col-span-5">
                <div className="bg-[var(--color-surface-2)] border border-[#D4654A]/30 p-6 rounded-sm sticky top-28 space-y-4 shadow-xl">
                  <h3 className="font-display text-xl font-bold border-b border-[#D4654A]/25 pb-3 text-[var(--color-ink)]">
                    Order Summary ({items.reduce((acc, item) => acc + item.quantity, 0)} Items)
                  </h3>

                  <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={`${item.productId}-${item.size}`} className="flex gap-3 p-2 bg-[var(--color-surface)] rounded border border-[#D4654A]/20">
                        <div className="relative w-14 h-16 bg-[var(--color-surface-2)] flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-xs font-bold leading-tight truncate text-[var(--color-ink)]">
                            {item.name}
                          </p>
                          <p className="font-ui text-[11px] text-[var(--color-sand)]">
                            Size: {item.size} • Qty: {item.quantity}
                          </p>
                          <p className="font-ui text-xs font-bold text-[#D4654A] mt-1">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#D4654A]/25 pt-4 space-y-2 font-ui text-xs">
                    <div className="flex justify-between text-[var(--color-sand)]">
                      <span>Subtotal</span>
                      <span>₹{subtotal().toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-[var(--color-sand)]">
                      <span>Shipping Delivery</span>
                      <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
                    </div>
                    {paymentMethod === "cod" && (
                      <div className="flex justify-between text-[var(--color-sand)]">
                        <span>COD Surcharge</span>
                        <span>₹50</span>
                      </div>
                    )}
                    <div className="border-t border-[#D4654A]/25 pt-3 flex justify-between text-base font-bold text-[var(--color-ink)]">
                      <span>Total Amount</span>
                      <span className="font-display text-xl text-[#D4654A]">₹{total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
