'use client';

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import PageHero from "@/components/shared/PageHero";
import HowItWorks from "@/components/Sponsorship/HowItWorks";
import SponsorshipImpact from "@/components/Sponsorship/SponsorshipImpact";
import CTABanner from "@/components/shared/CTABanner";

export default function SponsorshipOverviewPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <PageHero 
                    title="STUDENT SPONSORSHIP"
                    subtitle="Empower a high-achieving student in rural Kenya by removing the financial barriers to their education and future success."
                    bgColor="bg-[#1D366D]"
                    accentColor="#FFB800"
                    bgImage="/image9.png"
                    breadcrumb={[{ label: "Sponsorship", href: "/sponsorship-overview" }]}
                />
                <HowItWorks />
                <SponsorshipImpact />
                <CTABanner 
                    title="MEET THE STUDENTS"
                    description="Explore our student catalog and discover the bright, motivated young minds waiting for a chance to continue their education."
                    buttonText="View Student Catalog"
                    buttonHref="/student-catalog"
                    bgImage="/image17.png"
                />
            </main>
            <Footer />
        </div>
    );
}
