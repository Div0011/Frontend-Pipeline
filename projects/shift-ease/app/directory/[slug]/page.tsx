import { notFound } from 'next/navigation';
import { getCompanyBySlug, getAllCompanies, getReviewsByCompanyId } from '@/lib/data';
import BusinessProfile from '@/components/shared/BusinessProfile';
import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const companies = getAllCompanies();
  return companies.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const company = getCompanyBySlug(params.slug);
  if (!company) return { title: 'Company Not Found — ShiftEase' };

  return {
    title: `${company.name} (${company.cityName}) — Reviews, Pricing & Contact | ShiftEase`,
    description: `Book ${company.name} in ${company.cityName}. Verified packers and movers with ${company.yearsInBusiness} years of experience, ${company.rating}★ rating from ${company.reviewCount} customer reviews.`,
    openGraph: {
      title: `${company.name} — Verified Packers & Movers in ${company.cityName}`,
      description: `Get instant quotes and view verified reviews for ${company.name}.`,
    },
  };
}

export default function CompanyDetailPage({ params }: PageProps) {
  const company = getCompanyBySlug(params.slug);
  if (!company) {
    notFound();
  }

  const reviews = getReviewsByCompanyId(company.id);

  return (
    <main className="container-custom py-8">
      <BusinessProfile company={company} initialReviews={reviews} />
    </main>
  );
}
