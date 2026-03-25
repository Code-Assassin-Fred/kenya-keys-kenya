'use client';

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/News/Hero";
import LatestUpdates from "@/components/News/LatestUpdates";
import Contact from "@/components/Home/Contact";

export default function NewsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <Hero />
                <LatestUpdates />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
