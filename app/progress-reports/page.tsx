'use client';

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import PageHero from "@/components/shared/PageHero";
import ProgressReports from "@/components/Sponsorship/ProgressReports";
import CTABanner from "@/components/shared/CTABanner";

export default function ProgressReportsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <PageHero 
                    title="PROGRESS REPORTS"
                    subtitle="Learn how we monitor and communicate the academic success and personal growth of your sponsored student through regular, transparent reporting."
                    bgColor="bg-[#009bba]"
                    accentColor="#FFB800"
                    bgImage="/image16.png"
                    breadcrumb={[{ label: "Sponsorship", href: "/sponsorship-overview" }, { label: "Reports", href: "/progress-reports" }]}
                />
                
                <ProgressReports />
                
                <CTABanner 
                    title="THE POWER OF CONNECTION"
                    description="Letter exchange is the most rewarding part of sponsorship. Discover how you can build a personal connection with your student through writing."
                    buttonText="Learn About Letters"
                    buttonHref="/sponsor-letters"
                    bgImage="/image13.png"
                />
            </main>
            <Footer />
        </div>
    );
}
