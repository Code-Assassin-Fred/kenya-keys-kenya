'use client';

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import PageHero from "@/components/shared/PageHero";
import SponsorLetters from "@/components/Sponsorship/SponsorLetters";
import CTABanner from "@/components/shared/CTABanner";

export default function SponsorLettersPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <PageHero 
                    title="SPONSOR LETTERS"
                    subtitle="Building a personal connection with your sponsored student through the meaningful exchange of letters, stories, and encouragement."
                    bgColor="bg-[#1D366D]"
                    accentColor="#C5E672"
                    bgImage="/image13.png"
                    breadcrumb={[{ label: "Sponsorship", href: "/sponsorship-overview" }, { label: "Letters", href: "/sponsor-letters" }]}
                />
                
                <SponsorLetters />
                
                <CTABanner 
                    title="READY TO BECOME A SPONSOR?"
                    description="Take the first step in unlocking a student's potential. Browse our student catalog and find a student whose story resonates with you."
                    buttonText="View Student Catalog"
                    buttonHref="/student-catalog"
                    bgImage="/image17.png"
                />
            </main>
            <Footer />
        </div>
    );
}
