import type { Metadata } from "next";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/News/Hero";
import PhotoGallery from "@/components/News/PhotoGallery";
import Contact from "@/components/Home/Contact";
import JsonLd, { createBreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "News & Community Stories | Kenya Keys NGO",
    description: "Stay updated with the latest news, success stories, and educational updates from Kenya Keys, an NGO working in Taru, Kwale County, Kenya.",
    keywords: [
        "Kenya Keys news",
        "Kenya Keys updates",
        "education NGO updates Kenya",
        "Taru Kwale County news",
        "rural Kenyan education news",
        "community impact stories Kenya"
    ],
    alternates: {
        canonical: "https://kenyakeys-pbokenya.org/news",
    },
    openGraph: {
        title: "News & Community Stories | Kenya Keys NGO",
        description: "Stay updated with the latest news, success stories, and educational updates from Kenya Keys in Kwale County, Kenya.",
        url: "https://kenyakeys-pbokenya.org/news",
    }
};

export default function NewsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <JsonLd data={createBreadcrumbSchema([
                    { name: "Home", url: "https://kenyakeys-pbokenya.org" },
                    { name: "News", url: "https://kenyakeys-pbokenya.org/news" },
                ])} />
                <Hero />
                <PhotoGallery />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

