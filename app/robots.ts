import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/blocked', '/_next/'],
      },
    ],
    sitemap: 'https://kenyakeys-pbokenya.org/sitemap.xml',
  }
}
