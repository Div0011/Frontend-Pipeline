import { MetadataRoute } from 'next';
import { getCities, getAllCompanies } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://shiftEase.in';
  const cities = getCities();
  const companies = getAllCompanies();

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/directory`, lastModified: new Date() },
    { url: `${baseUrl}/quote`, lastModified: new Date() },
    { url: `${baseUrl}/list-your-business`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date() },
    { url: `${baseUrl}/terms-of-service`, lastModified: new Date() },
    { url: `${baseUrl}/admin`, lastModified: new Date() },
    ...cities.map((city) => ({
      url: `${baseUrl}/cities/${city.slug}`,
      lastModified: new Date(),
    })),
    ...companies.map((company) => ({
      url: `${baseUrl}/directory/${company.slug}`,
      lastModified: new Date(),
    })),
  ];
}
