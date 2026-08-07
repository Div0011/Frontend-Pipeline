import { notFound } from 'next/navigation';
import { getCityBySlug, getCompaniesByCity } from '@/lib/data';
import CityHeader from '@/components/sections/CityHeader';
import ServiceList from '@/components/sections/ServiceList';
import PriceGuide from '@/components/sections/PriceGuide';
import CompanyGrid from '@/components/sections/CompanyGrid';
import FAQSection from '@/components/sections/FAQSection';

interface PageProps {
  params: { citySlug: string };
}

export async function generateStaticParams() {
  return [
    { citySlug: 'delhi' },
    { citySlug: 'mumbai' },
    { citySlug: 'bangalore' },
  ];
}

export async function generateMetadata({ params }: PageProps) {
  const city = getCityBySlug(params.citySlug);
  if (!city) return { title: 'City Not Found' };
  return {
    title: `${city.name} Packers & Movers — ShiftEase by Sheetal`,
    description: `Find the best packers and movers in ${city.name}. Compare services, read verified reviews, and get instant quotes.`,
    alternates: { canonical: `/cities/${city.slug}` },
    openGraph: {
      title: `${city.name} Packers & Movers — ShiftEase by Sheetal`,
      description: `Find the best packers and movers in ${city.name}. Compare services, read verified reviews, and get instant quotes.`,
      type: 'website',
    },
  };
}

export default function CityPage({ params }: PageProps) {
  const city = getCityBySlug(params.citySlug);
  const companies = getCompaniesByCity(params.citySlug);

  if (!city) notFound();

  return (
    <>
      <CityHeader city={city} />
      <PriceGuide city={city} />
      <ServiceList city={city} />
      <CompanyGrid companies={companies} cityName={city.name} />
      <FAQSection city={city} />
    </>
  );
}
