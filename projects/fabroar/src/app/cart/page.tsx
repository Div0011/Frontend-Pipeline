"use client";

import { useCartStore } from "@/hooks/useCartStore";
import CartDrawer from "@/components/ui/CartDrawer";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { items, subtotal } = useCartStore();

  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-24">
        <div className="container-custom">
          <h1 className="font-display text-display-lg tracking-tight mb-12">
            Your Cart
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-body text-ink-muted mb-4">
                Your cart is empty
              </p>
              <Link
                href="/men"
                className="inline-flex items-center gap-2 font-ui text-sm text-amber hover:text-ink transition-colors duration-300"
              >
                Continue Shopping →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex gap-6 pb-6 border-b border-border"
                  >
                    <div className="relative w-24 h-32 bg-surface-2 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg mb-1">{item.name}</h3>
                      <p className="font-ui text-sm text-ink-muted mb-2">
                        Size: {item.size}
                      </p>
                      <p className="font-body text-sm text-ink-muted">
                        Qty: {item.quantity}
                      </p>
                      <p className="font-ui text-sm mt-2">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-surface-2 p-6 sticky top-24">
                  <h3 className="font-display text-xl mb-6">Order Summary</h3>
                  <div className="space-y-3 font-body text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Subtotal</span>
                      <span>₹{subtotal().toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Delivery</span>
                      <span>
                        {subtotal() >= 499 ? "Free" : "₹50"}
                      </span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between font-ui text-lg">
                      <span>Total</span>
                      <span className="text-amber">
                        ₹
                        {(subtotal() + (subtotal() >= 499 ? 0 : 50)).toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/checkout"
                    className="block w-full py-4 bg-ink text-surface text-center font-ui text-sm tracking-widest uppercase hover:bg-amber transition-colors duration-300"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <CartDrawer />
    </div>
  );
}
