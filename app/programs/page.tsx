'use client';

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Programs/Hero";
import ProgramList from "@/components/Programs/ProgramList";
import Contact from "@/components/Home/Contact";

export default function ProgramsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <Hero />
                <ProgramList />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
