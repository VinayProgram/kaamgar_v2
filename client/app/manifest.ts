import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kaamgar - Local Professionals',
    short_name: 'Kaamgar',
    description: 'Find trusted local kaamgars in minutes',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffd700',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
