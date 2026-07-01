// Reusable JSON-LD structured data component for SEO
// Renders a <script type="application/ld+json"> tag with sanitized JSON

export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

// Pre-built schema objects for Kenya Keys PBO Kenya
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Kenya Keys PBO Kenya",
  "alternateName": ["Kenya Keys PBO", "Kenya Keys NGO", "KenyaKeys", "Kenya Keys Taru"],
  "url": "https://kenyakeys-pbokenya.org",
  "logo": "https://kenyakeys-pbokenya.org/Kenya Keys Logo.webp",
  "image": "https://kenyakeys-pbokenya.org/Kenya Keys Logo With Background.webp",
  "description": "Kenya Keys PBO Kenya is a grassroots education NGO and registered Public Benefit Organisation (PBO) in Kenya dedicated to sponsoring high-achieving students in rural Kenya, removing barriers to education, and building local leadership in Kwale County.",
  "foundingDate": "2006",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Along Nairobi-Mombasa Highway",
    "addressLocality": "Taru",
    "addressRegion": "Kwale County",
    "postalCode": "80120",
    "addressCountry": "KE"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "email": "info@kenyakeys-pbokenya.org",
      "telephone": "+254724783436",
      "contactType": "donations",
      "availableLanguage": ["English", "Swahili"]
    },
    {
      "@type": "ContactPoint",
      "email": "joseph@kenyakeys-pbokenya.org",
      "telephone": "+254724783436",
      "contactType": "customer service",
      "availableLanguage": ["English", "Swahili"]
    }
  ],
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61590875852245",
    "https://www.instagram.com/kenyakeyspbo_kenya/",
    "https://x.com/KenyaKeys_Kenya",
    "https://wa.me/254724783436"
  ],
  "areaServed": {
    "@type": "Place",
    "name": "Kwale County, Coastal Kenya"
  },
  "knowsAbout": [
    "Education in Kenya",
    "Student sponsorship",
    "Rural education",
    "Girls empowerment",
    "ICT in education",
    "Scholarship programs Kenya",
    "Public Benefit Organisation Kenya",
    "Taru Kwale County NGO"
  ]
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Kenya Keys PBO Kenya",
  "image": "https://kenyakeys-pbokenya.org/Kenya Keys Logo With Background.webp",
  "@id": "https://kenyakeys-pbokenya.org/#localbusiness",
  "url": "https://kenyakeys-pbokenya.org",
  "telephone": "+254724783436",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Along Nairobi-Mombasa Highway",
    "addressLocality": "Taru",
    "addressRegion": "Kwale County",
    "postalCode": "80120",
    "addressCountry": "KE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-3.8344",
    "longitude": "39.1417"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "08:00",
    "closes": "17:00"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Kenya Keys PBO Kenya — Education NGO in Kenya",
  "alternateName": "Kenya Keys PBO Kenya",
  "url": "https://kenyakeys-pbokenya.org",
  "description": "Kenya Keys PBO Kenya is a grassroots education NGO sponsoring students in rural Kenya. Donate to education in Kenya or sponsor a student today.",
  "publisher": {
    "@type": "NGO",
    "name": "Kenya Keys PBO Kenya"
  }
};

export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function createFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function createVideoSchema(video: {
  name: string;
  description: string;
  thumbnailUrl?: string;
  contentUrl: string;
  uploadDate?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.name,
    "description": video.description,
    "thumbnailUrl": video.thumbnailUrl || "https://kenyakeys-pbokenya.org/Kenya Keys Logo With Background.webp",
    "contentUrl": video.contentUrl,
    "uploadDate": video.uploadDate || "2026-01-01",
    "publisher": {
      "@type": "NGO",
      "name": "Kenya Keys",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kenyakeys-pbokenya.org/Kenya Keys Logo.webp"
      }
    }
  };
}

export const donateActionSchema = {
  "@context": "https://schema.org",
  "@type": "DonateAction",
  "name": "Donate to Kenya Keys Education Programs",
  "description": "Support education for students in rural Kenya. Your donation helps sponsor students, build schools, provide sanitary pads, distribute laptops, and fund library programs through Kenya Keys.",
  "recipient": {
    "@type": "NGO",
    "name": "Kenya Keys",
    "url": "https://kenyakeys-pbokenya.org"
  },
  "target": {
    "@type": "EntryPoint",
    "urlTemplate": "https://kenyakeys-pbokenya.org/donate",
    "actionPlatform": "https://schema.org/DesktopWebPlatform"
  }
};
