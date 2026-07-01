import { MetadataRoute } from 'next'
import { leadershipData } from '@/lib/leadershipData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kenyakeys-pbokenya.org'
  
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date("2026-07-01"),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/who-we-are`,
      lastModified: new Date("2026-07-01"),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/programs`,
      lastModified: new Date("2026-07-01"),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/donate`,
      lastModified: new Date("2026-07-01"),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/donate/ways-to-give`,
      lastModified: new Date("2026-07-01"),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sponsorship-overview`,
      lastModified: new Date("2026-07-01"),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/student-catalog`,
      lastModified: new Date("2026-07-01"),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/impact`,
      lastModified: new Date("2026-07-01"),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date("2026-07-01"),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date("2026-07-01"),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date("2026-07-01"),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  const leadershipRoutes = leadershipData.map((person) => ({
    url: `${baseUrl}/who-we-are/leadership/${person.slug}`,
    lastModified: new Date("2026-07-01"),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...leadershipRoutes]
}
