import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kaamgars.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/auth/',
        '/consumers/profile/',
        '/service-provider/profile/'
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
