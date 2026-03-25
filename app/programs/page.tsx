'use client';

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Programs/Hero";
import Sponsorship from "@/components/Programs/Sponsorship";
import VitalSupport from "@/components/Programs/VitalSupport";
import CEC from "@/components/Programs/CEC";
import Contact from "@/components/Home/Contact";

export default function ProgramsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <Hero />
                <Sponsorship />
                <VitalSupport />
                <CEC />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
