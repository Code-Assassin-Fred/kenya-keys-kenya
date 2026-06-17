import type { Metadata } from "next";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Impact/Hero";
import Stories from "@/components/Impact/Stories";
import Stats from "@/components/Impact/Stats";
// import Reports from "@/components/Impact/Reports";
import Contact from "@/components/Home/Contact";
import JsonLd, { createBreadcrumbSchema, createVideoSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "Kenya Keys Impact — Student Success Stories & Education Metrics",
    description: "See how Kenya Keys has sponsored 1,000+ students with a 100% secondary school graduation rate since 2022. Watch real student success stories, alumni testimonials, and explore measurable impact data from Kenya Keys education programs in rural Kenya.",
    keywords: [
        "Kenya Keys impact", "Kenya Keys success stories", "Kenya Keys students",
        "education impact Kenya", "student success stories Kenya", "Kenya Keys alumni",
        "100% graduation rate Kenya", "education metrics Kenya", "Kenya Keys results",
        "sponsored students Kenya", "education outcomes rural Kenya",
        "Kenya Keys video stories", "student testimonials Kenya",
    ],
    alternates: {
        canonical: "https://kenyakeys-pbokenya.org/impact",
    },
    openGraph: {
        title: "Kenya Keys Impact — 1,000+ Students Sponsored in Rural Kenya",
        description: "Watch real student success stories and explore measurable impact from Kenya Keys education programs. 1,000+ students sponsored, 100% graduation rate.",
        url: "https://kenyakeys-pbokenya.org/impact",
    },
};

const videoSchemas = [
    createVideoSchema({
        name: "Kenya Keys Laptop Distribution to University Students",
        description: "Kenya Keys distributes 100 donated laptops to college and university students in rural Kenya, providing essential digital tools for academic success.",
        contentUrl: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/Laptop%20Distribution_Updated.mp4",
    }),
    createVideoSchema({
        name: "Kenya Keys Mobile Library — Bringing Books to Rural Schools",
        description: "Kenya Keys takes its mobile library to a primary school 20 kilometers away, helping children improve reading skills and explore their potential.",
        contentUrl: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/Mobile%20Library_Updated.mp4",
    }),
    createVideoSchema({
        name: "Kenya Keys Sponsored Student Journey to Medical College",
        description: "A Kenya Keys sponsored student shares how sponsorship transformed his journey from financial hardship to pursuing a diploma in orthopedic and trauma medicine.",
        contentUrl: "https://storage.googleapis.com/kenyakeysvideos/Student%20Stories/James%20Mbandi%20Updated_Updated.mp4",
    }),
];

export default function ImpactPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <JsonLd data={createBreadcrumbSchema([
                    { name: "Home", url: "https://kenyakeys-pbokenya.org" },
                    { name: "Kenya Keys Impact", url: "https://kenyakeys-pbokenya.org/impact" },
                ])} />
                {videoSchemas.map((schema, i) => (
                    <JsonLd key={i} data={schema} />
                ))}
                <Hero />
                <Stories />
                <Stats />
                {/** Reports section temporarily removed per director request */}
                {/** <Reports /> */}
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

