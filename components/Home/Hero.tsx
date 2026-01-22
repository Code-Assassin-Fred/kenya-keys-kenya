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
            <div className="absolute inset-0 bg-black/75" />

            {/* Navbar stays on top */}
            <Navbar />

            {/* Hero Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 max-w-5xl mx-auto text-center mt-12">
                <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight font-playfair italic whitespace-nowrap">
                    Transform Lives <span className="text-orange-500 not-italic">Through Education</span>
                </h1>

                <p className="text-base text-gray-200 mb-8 max-w-xl leading-relaxed font-outfit font-light">
                    Join us in empowering students in rural Kenya. Your support provides
                    more than just a scholarship; it opens a world of opportunity.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 items-center font-outfit">
                    <button className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold text-base hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/20 active:scale-95">
                        Sponsor a Student
                    </button>
                    <button className="border-2 border-orange-500 text-white px-6 py-3 rounded-full font-bold text-base hover:bg-orange-500 transition-all active:scale-95">
                        Donate Now
                    </button>
                </div>
            </div>
        </section>
    );
}