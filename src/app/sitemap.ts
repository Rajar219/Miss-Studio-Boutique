import { MetadataRoute } from 'next';
import { getPublicProducts } from '@/lib/db-products';
import { getCollections } from '@/lib/collections';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://misssstudio.in';

  // Base static routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/collections',
    '/new-arrivals',
    '/faqs',
    '/privacy-policy',
    '/returns',
    '/shipping',
    '/size-guide',
    '/terms',
    '/track-order',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic product routes
  const products = await getPublicProducts();
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // Dynamic collection routes
  const collections = await getCollections();
  const collectionRoutes = collections.map((collection) => ({
    url: `${baseUrl}/collections/${collection.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...collectionRoutes, ...productRoutes];
}
