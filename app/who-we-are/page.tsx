import type { Metadata } from "next";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Who we are/Hero";

import Mission from "@/components/Who we are/Mission";
import LeadershipTeam from "@/components/Who we are/LeadershipTeam";
import DualImageHero from "@/components/Who we are/DualImageHero";
import Journey from "@/components/Who we are/Journey";
import Timeline from "@/components/Who we are/Timeline";

import FounderProfiles from "@/components/Who we are/FounderProfiles";
import Partners from "@/components/Who we are/Partners";
import Contact from "@/components/Home/Contact";
import JsonLd, { createBreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "About Kenya Keys PBO Kenya — Our Story, Mission, & Leadership Team",
    description: "Discover the inspiring story of Kenya Keys PBO Kenya. From our founder Rinda Hayes sponsoring 14 students in Taru in 2005 to supporting 934 students today. Learn about our mission, local leadership team, and partners empowering Kwale County through education.",
    keywords: [
        "Kenya Keys about", "Kenya Keys mission", "Kenya Keys leadership", "Kenya Keys partners",
        "education NGO Kwale County", "NGO Taru Kenya", "best education NGOs in Kenya",
        "Kenya Keys PBO", "education nonprofit Kenya", "Coast Kenya education NGO",
        "Mombasa education NGO", "who is Kenya Keys", "Kenya Keys team",
        "Rinda Hayes founder", "Kenya Keys founder story", "Principal Joseph Mwengea",
        "Taru school fee sponsorship", "history of Kenya Keys", "grassroots education NGO",
        "Kenya Keys PBO Kenya organization", "Kenya Keys board of directors", "registered PBO Kwale"
    ],
    alternates: {
        canonical: "https://kenyakeys-pbokenya.org/who-we-are",
    },
    openGraph: {
        title: "About Kenya Keys PBO Kenya — Our Story, Mission, & Leadership",
        description: "From our founder Rinda Hayes sponsoring 14 students in Taru in 2005 to supporting 934 students today, read the inspiring journey of Kenya Keys PBO Kenya.",
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
                <DualImageHero />
                <Journey />
                <FounderProfiles />
                <Timeline />
                <Partners />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

