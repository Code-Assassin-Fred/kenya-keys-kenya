import type { Metadata } from "next";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Who we are/Hero";
import Mission from "@/components/Who we are/Mission";
import LeadershipTeam from "@/components/Who we are/LeadershipTeam";
import Journey from "@/components/Who we are/Journey";
import Values from "@/components/Who we are/Values";
import Partners from "@/components/Who we are/Partners";
import Contact from "@/components/Home/Contact";
import JsonLd, { createBreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "About Kenya Keys — Our Founder Story, Mission, & Leadership",
    description: "Discover the inspiring story of Kenya Keys. From our founder Rinda Hayes sponsoring 14 students in Taru in 2005 to supporting 934 students today. Learn about our mission, leadership team, and local partners empowering Kwale County through education.",
    keywords: [
        "Kenya Keys about", "Kenya Keys mission", "Kenya Keys leadership", "Kenya Keys partners",
        "education NGO Kwale County", "NGO Taru Kenya", "best education NGOs in Kenya",
        "Kenya Keys PBO", "education nonprofit Kenya", "Coast Kenya education NGO",
        "Mombasa education NGO", "who is Kenya Keys", "Kenya Keys team",
        "Rinda Hayes founder", "Kenya Keys founder story", "Principal Joseph Mwengea",
        "Taru school fee sponsorship", "history of Kenya Keys", "grassroots education NGO"
    ],
    alternates: {
        canonical: "https://kenyakeys-pbokenya.org/who-we-are",
    },
    openGraph: {
        title: "About Kenya Keys — Our Founder Story, Mission, & Leadership",
        description: "From our founder Rinda Hayes sponsoring 14 students in Taru in 2005 to supporting 934 students today, read the inspiring journey of Kenya Keys.",
        url: "https://kenyakeys-pbokenya.org/who-we-are",
    },
};

export default function WhoWeArePage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <JsonLd data={createBreadcrumbSchema([
                    { name: "Home", url: "https://kenyakeys-pbokenya.org" },
                    { name: "About Kenya Keys", url: "https://kenyakeys-pbokenya.org/who-we-are" },
                ])} />
                <Hero />
                <Mission />
                <LeadershipTeam />
                <Journey />
                <Values />
                <Partners />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

