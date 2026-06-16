'use client';

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Impact/Hero";
import Stories from "@/components/Impact/Stories";
import Stats from "@/components/Impact/Stats";
// import Reports from "@/components/Impact/Reports";
import Contact from "@/components/Home/Contact";

export default function ImpactPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <Hero />
                <Stories />
                <Stats />
                {/** Reports section temporarily removed per director request */}
                {/** <Reports /> */}
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
