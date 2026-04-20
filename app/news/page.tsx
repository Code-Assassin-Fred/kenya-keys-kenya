'use client';

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/News/Hero";
import LatestUpdates from "@/components/News/LatestUpdates";
import PhotoGallery from "@/components/News/PhotoGallery";
import Newsletter from "@/components/News/Newsletter";
import Contact from "@/components/Home/Contact";

export default function NewsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <Hero />
                <LatestUpdates />
                <PhotoGallery />
                <Newsletter />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
