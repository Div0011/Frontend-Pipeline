"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useSceneStore } from "@/stores/sceneStore";
import { ProductSlug } from "@/config/sceneConfig";

export function useProductSelect() {
  const setActiveProduct = useSceneStore((s) => s.setActiveProduct);

  useEffect(() => {
    return () => {
      setActiveProduct(null);
    };
  }, [setActiveProduct]);

  const selectProduct = (slug: ProductSlug) => {
    setActiveProduct(slug);
  };

  const clearProduct = () => {
    setActiveProduct(null);
  };

  return { selectProduct, clearProduct };
}

export function useProductFromSlug() {
  const params = useParams();
  const slug = params.slug as string;
  const setActiveProduct = useSceneStore((s) => s.setActiveProduct);

  useEffect(() => {
    const validSlugs = ["classic", "diet", "cool"] as const;
    if (validSlugs.includes(slug as ProductSlug)) {
      setActiveProduct(slug as ProductSlug);
    }
    return () => {
      setActiveProduct(null);
    };
  }, [slug, setActiveProduct]);
}
