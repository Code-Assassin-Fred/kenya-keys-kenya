'use client';

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Impact/Hero";
import Stats from "@/components/Impact/Stats";
import Stories from "@/components/Impact/Stories";
import Reports from "@/components/Impact/Reports";
import Contact from "@/components/Home/Contact";

export default function ImpactPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <Hero />
                <Stats />
                <Stories />
                <Reports />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
