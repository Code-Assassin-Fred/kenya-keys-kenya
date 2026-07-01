import type { Metadata } from "next";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import PageHero from "@/components/shared/PageHero";
import StudentCatalogBody from "@/components/Sponsorship/StudentCatalogBody";
import CTABanner from "@/components/shared/CTABanner";
import JsonLd, { createBreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "Sponsor a Student — Kenya Keys Student Catalog PBO Kenya",
    description: "Meet the bright and motivated secondary and university students in rural Kwale County, Kenya awaiting sponsorship. Browse their profiles and support their education with Kenya Keys PBO Kenya.",
    keywords: [
        "sponsor a student", "Kenya Keys student catalog", "educational sponsorship Kenya",
        "sponsor education rural Kenya", "support student in Kwale County", "sponsor high school student Kenya",
        "sponsor university student Kenya", "donate to student education", "Kenya Keys PBO",
        "Kenya student directory", "Kenya Keys secondary school student profiles"
    ],
    alternates: {
        canonical: "https://kenyakeys-pbokenya.org/student-catalog",
    },
    openGraph: {
        title: "Sponsor a Student — Kenya Keys Student Catalog PBO Kenya",
        description: "Meet the bright and motivated secondary and university students in rural Kenya awaiting sponsorship. Support a student's education today.",
        url: "https://kenyakeys-pbokenya.org/student-catalog",
    },
};

export default function StudentCatalogPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <JsonLd data={createBreadcrumbSchema([
                    { name: "Home", url: "https://kenyakeys-pbokenya.org" },
                    { name: "Sponsorship", url: "https://kenyakeys-pbokenya.org/sponsorship-overview" },
                    { name: "Student Catalog", url: "https://kenyakeys-pbokenya.org/student-catalog" },
                ])} />
                <PageHero 
                    title="STUDENT CATALOG"
                    subtitle="Meet the bright, motivated high school and university students currently awaiting sponsorship. Each profile tells a story of resilience and potential."
                    bgColor="bg-[#00529B]"
                    accentColor="#FFB800"
                    bgImage="/image17.webp"
                    breadcrumb={[{ label: "Sponsorship", href: "/sponsorship-overview" }, { label: "Catalog", href: "/student-catalog" }]}
                />
                
                <StudentCatalogBody />
                
                <CTABanner 
                    title="HOW SPONSORSHIP WORKS"
                    description="From selecting a student to receiving reports and writing letters, discover the full journey of becoming a Kenya Keys sponsor."
                    buttonText="Sponsorship Overview"
                    buttonHref="/sponsorship-overview"
                    bgImage="/image8.webp"
                />
            </main>
            <Footer />
        </div>
    );
}

