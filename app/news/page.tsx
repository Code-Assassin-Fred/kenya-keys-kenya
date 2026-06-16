'use client';

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/News/Hero";
import PhotoGallery from "@/components/News/PhotoGallery";
import Contact from "@/components/Home/Contact";

export default function NewsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <Hero />
                <PhotoGallery />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
