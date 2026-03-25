'use client';

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Who we are/Hero";
import Journey from "@/components/Who we are/Journey";
import Values from "@/components/Who we are/Values";
import Contact from "@/components/Home/Contact";

export default function WhoWeArePage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <Hero />
                <Journey />
                <Values />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
