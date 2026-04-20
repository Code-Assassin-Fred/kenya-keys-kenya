'use client';

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import DonateHero from "@/components/Donate/DonateHero";
import DonationTiers from "@/components/Donate/DonationTiers";
import ImpactCalculator from "@/components/Donate/ImpactCalculator";
import TrustSignals from "@/components/Donate/TrustSignals";
import CTABanner from "@/components/shared/CTABanner";

export default function DonatePage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <DonateHero />
                <DonationTiers />
                <ImpactCalculator />
                <TrustSignals />
                <CTABanner 
                    title="OTHER WAYS TO GIVE"
                    description="From corporate matching to legacy gifts and stock transfers, explore the many ways you can support student success in Kenya."
                    buttonText="Explore Giving Options"
                    buttonHref="/donate/ways-to-give"
                    bgImage="/image4.png"
                />
            </main>
            <Footer />
        </div>
    );
}
