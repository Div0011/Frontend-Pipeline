"use client";

import { MenuItem as MenuItemType } from "@/lib/menu";
import { Badge } from "@/components/Badge";

export function MenuItemCard({ item }: { item: MenuItemType }) {
  const priceDisplay = Array.isArray(item.price)
    ? `₹${item.price[0]} / ₹${item.price[1]}`
    : item.price === 0
      ? "—"
      : `₹${item.price}`;

  return (
    <div className="group relative py-5 border-b border-brand-border last:border-b-0 transition-all duration-300 hover:bg-white/50 rounded-lg px-2 -mx-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h4
                className="text-base font-semibold text-brand-black group-hover:text-brand-yellow-dark transition-colors duration-300"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.name}
              </h4>
              {item.badges?.map((badge) => (
                <Badge key={badge} label={badge} />
              ))}
            </div>
            {item.description && (
              <p
                className="text-sm text-brand-text-muted leading-relaxed mt-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.description}
              </p>
            )}
          </div>
          <div
            className="text-sm font-semibold text-brand-black whitespace-nowrap mt-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {priceDisplay}
        </div>
      </div>
    </div>
  );
}
