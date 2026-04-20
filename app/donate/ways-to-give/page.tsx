'use client';

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import PageHero from "@/components/shared/PageHero";
import WaysToGive from "@/components/Donate/WaysToGive";
import CTABanner from "@/components/shared/CTABanner";

export default function WaysToGivePage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <PageHero 
                    title="WAYS TO GIVE"
                    subtitle="Discover the many avenues through which you can provide vital educational support to students in rural Kenya."
                    bgColor="bg-[#009bba]"
                    accentColor="#FFB800"
                    bgImage="/image12.png"
                    breadcrumb={[{ label: "Donate", href: "/donate" }, { label: "Ways to Give", href: "/donate/ways-to-give" }]}
                />
                <WaysToGive />
                <CTABanner 
                    title="CORPORATE PARTNERSHIPS"
                    description="Align your brand with impact. Explore how your organization can support student success through corporate sponsorship and employee engagement."
                    buttonText="Corporate Giving"
                    buttonHref="/donate/corporate"
                    bgImage="/image10.png"
                />
            </main>
            <Footer />
        </div>
    );
}
