'use client';

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Who we are/Hero";
import Mission from "@/components/Who we are/Mission";
import LeadershipTeam from "@/components/Who we are/LeadershipTeam";
import Journey from "@/components/Who we are/Journey";
import Values from "@/components/Who we are/Values";
import Partners from "@/components/Who we are/Partners";
import Contact from "@/components/Home/Contact";

export default function WhoWeArePage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <Hero />
                <Mission />
                <LeadershipTeam />
                <Journey />
                <Values />
                <Partners />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
