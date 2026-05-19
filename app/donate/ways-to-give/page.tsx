'use client';

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import PageHero from "@/components/shared/PageHero";
import WaysToGive from "@/components/Donate/WaysToGive";
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
            </main>
            <Footer />
        </div>
    );
}
