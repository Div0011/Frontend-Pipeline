import type { Metadata } from 'next';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
}

export function generateSEOHead({ title, description, canonical, ogImage }: SEOHeadProps): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}