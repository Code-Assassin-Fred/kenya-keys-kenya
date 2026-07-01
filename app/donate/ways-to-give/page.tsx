import type { Metadata } from "next";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import PageHero from "@/components/shared/PageHero";
import WaysToGive from "@/components/Donate/WaysToGive";
import JsonLd, { createBreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "Ways to Give & Support — Kenya Keys PBO Kenya NGO",
    description: "Explore the different ways you can support educational opportunities in rural Kwale County, Kenya: sponsor a student, direct donations via M-Pesa or bank transfer, corporate giving, and legacy support for Kenya Keys PBO Kenya.",
    keywords: [
        "ways to give NGO", "Kenya Keys support", "donate to education Kenya",
        "corporate charity giving Kenya", "fundraise for education", "support schools Kwale County",
        "PBO donation Kenya", "nonprofit support avenues", "M-Pesa donation to NGO", "Kenya Keys PBO"
    ],
    alternates: {
        canonical: "https://kenyakeys-pbokenya.org/donate/ways-to-give",
    },
    openGraph: {
        title: "Ways to Give & Support — Kenya Keys PBO Kenya NGO",
        description: "Discover the many avenues through which you can provide vital educational support to students in rural Kenya with Kenya Keys PBO Kenya.",
        url: "https://kenyakeys-pbokenya.org/donate/ways-to-give",
    },
};

export default function WaysToGivePage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <JsonLd data={createBreadcrumbSchema([
                    { name: "Home", url: "https://kenyakeys-pbokenya.org" },
                    { name: "Donate", url: "https://kenyakeys-pbokenya.org/donate" },
                    { name: "Ways to Give", url: "https://kenyakeys-pbokenya.org/donate/ways-to-give" },
                ])} />
                <PageHero 
                    title="WAYS TO GIVE"
                    subtitle="Discover the many avenues through which you can provide vital educational support to students in rural Kenya."
                    bgColor="bg-[#009bba]"
                    accentColor="#FFB800"
                    bgImage="/image12.webp"
                    breadcrumb={[{ label: "Donate", href: "/donate" }, { label: "Ways to Give", href: "/donate/ways-to-give" }]}
                />
                <WaysToGive />
            </main>
            <Footer />
        </div>
    );
}

