import type { Metadata } from "next";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Programs/Hero";
import ProgramList from "@/components/Programs/ProgramList";
import CoreValues from "@/components/Programs/CoreValues";
import Contact from "@/components/Home/Contact";
import JsonLd, { createBreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "Kenya Keys Programs — Student Sponsorship, Girls' Empowerment & ICT Education",
    description: "Explore Kenya Keys' education programs in rural Kenya: student scholarships and sponsorships, girls' empowerment, health and hygiene support, ICT integration, library and literacy support, schools infrastructure, and business skills training in Kwale County.",
    keywords: [
        "Kenya Keys programs", "student sponsorship Kenya", "girls empowerment Kenya",
        "ICT education Kenya", "education programs Kenya", "scholarship programs Kenya",
        "school infrastructure Kenya", "library support Kenya", "health hygiene education Kenya",
        "Kenya Keys scholarships", "rural school programs Kenya", "education charity programs Kenya",
        "Kenya Keys education", "mentorship programs Kenya",
    ],
    alternates: {
        canonical: "https://kenyakeys-pbokenya.org/programs",
    },
    openGraph: {
        title: "Kenya Keys Programs — Education Programs in Rural Kenya",
        description: "Discover Kenya Keys' education programs: student scholarships, girls' empowerment, ICT education, library support, and school infrastructure in Kwale County, Kenya.",
        url: "https://kenyakeys-pbokenya.org/programs",
    },
};

export default function ProgramsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <JsonLd data={createBreadcrumbSchema([
                    { name: "Home", url: "https://kenyakeys-pbokenya.org" },
                    { name: "Kenya Keys Programs", url: "https://kenyakeys-pbokenya.org/programs" },
                ])} />
                <Hero />
                <ProgramList />
                <CoreValues />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

