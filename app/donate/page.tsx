'use client';

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import DonateHero from "@/components/Donate/DonateHero";
import DonationTiers from "@/components/Donate/DonationTiers";
import ImpactCalculator from "@/components/Donate/ImpactCalculator";
import TrustSignals from "@/components/Donate/TrustSignals";

export default function DonatePage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <DonateHero />
                <ImpactCalculator />
                <DonationTiers />
                <TrustSignals />
            </main>
            <Footer />
        </div>
    );
}

