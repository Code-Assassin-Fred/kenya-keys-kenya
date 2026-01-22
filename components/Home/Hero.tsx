'use client';

import Navbar from "./Navbar";

export default function Hero() {
    return (
        <section id="home" className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/hero.png')",
                }}
            />
            {/* Darker overlay for even better contrast */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Navbar stays on top */}
            <Navbar />
        </section>
    );
}