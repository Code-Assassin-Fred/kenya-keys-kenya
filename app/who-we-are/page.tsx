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
    title: "About Kenya Keys — Our Mission, Leadership & Partners",
    description: "Learn about Kenya Keys, a registered PBO and education NGO in Taru, Kwale County, Kenya. Meet our leadership team, discover our mission to unlock potential through education, and see our partners. Kenya Keys has been empowering rural Kenya through education since 2006.",
    keywords: [
        "Kenya Keys about", "Kenya Keys mission", "Kenya Keys leadership", "Kenya Keys partners",
        "education NGO Kwale County", "NGO Taru Kenya", "best education NGOs in Kenya",
        "Kenya Keys PBO", "education nonprofit Kenya", "Coast Kenya education NGO",
        "Mombasa education NGO", "who is Kenya Keys", "Kenya Keys team",
    ],
    alternates: {
        canonical: "https://kenyakeys-pbokenya.org/who-we-are",
    },
    openGraph: {
        title: "About Kenya Keys — Education NGO in Kenya",
        description: "Kenya Keys is a grassroots education NGO in Kwale County, Kenya. Meet our leadership team, discover our mission, and learn how we empower students in rural Kenya.",
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

