'use client';

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import PageHero from "@/components/shared/PageHero";
import CorporateSponsorship from "@/components/Donate/CorporateSponsorship";
import CTABanner from "@/components/shared/CTABanner";

export default function CorporatePage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <PageHero 
                    title="CORPORATE PARTNERSHIPS"
                    subtitle="Scale your impact through strategic corporate sponsorship and institutional partnerships that transform student futures."
                    bgColor="bg-[#001D4A]"
                    accentColor="#C5E672"
                    bgImage="/image13.png"
                    breadcrumb={[{ label: "Donate", href: "/donate" }, { label: "Corporate", href: "/donate/corporate" }]}
                />
                <CorporateSponsorship />
                <CTABanner 
                    title="SEE THE IMPACT"
                    description="Our metrics speak for themselves. Explore the data-driven results of our sponsorship programs and student outcomes."
                    buttonText="View Our Impact"
                    buttonHref="/impact"
                    bgImage="/image16.png"
                />
            </main>
            <Footer />
        </div>
    );
}
