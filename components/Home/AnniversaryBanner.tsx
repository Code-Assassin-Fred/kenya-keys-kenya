'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AnniversaryBanner() {
    return (
        <section className="relative w-full max-w-[1100px] mx-auto px-4 md:px-0 py-16 overflow-visible">
            {/* Outer Section Background Pattern (replacing white) */}
            <div className="absolute inset-0 pointer-events-none -mx-4 md:-mx-[100vw] md:px-[100vw] z-0 overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none">
                    <path d="M0 0H600L400 600H0V0Z" fill="#1D366D" />
                    <path d="M600 0H1000L800 600H400L600 0Z" fill="#00529B" />
                    <path d="M1000 0H1440V600H800L1000 0Z" fill="#0072CE" />
                </svg>
            </div>

            {/* Main Content Container */}
            <div className="relative flex flex-col md:flex-row min-h-[380px] md:min-h-[420px] z-10">
                
                {/* Banner Internal Background - Lighter Color as requested */}
                <div className="absolute inset-y-0 left-0 w-full md:w-[55%] bg-[#DBE4FF] z-0" />

                {/* Left Side Content */}
                <div className="relative w-full md:w-[55%] p-8 md:p-14 flex flex-col justify-center items-start z-20">
                    <motion.div
                        initial={{ x: -40, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Icons and Circles Removed as requested */}
                        <h2 className="text-3xl md:text-[44px] font-bold font-playfair text-[#001D4A] leading-[1.15] mb-4">
                            More Than 20 Years <br />
                            of Life-Changing <br />
                            Impact in Kenya
                        </h2>
                        <p className="text-base md:text-lg font-outfit text-[#001D4A] opacity-90 mb-8 max-w-sm">
                            Kenya Keys has been dedicated to empowering students and communities in rural Kenya for over two decades.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <button className="bg-[#001D4A] text-white px-10 py-3.5 rounded-full font-bold font-outfit text-sm md:text-base hover:bg-opacity-90 transition-all cursor-pointer whitespace-nowrap shadow-lg">
                                Support our mission
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side Image with Protrusion */}
                <div className="relative w-full md:w-[45%] h-[280px] md:h-auto mt-8 md:mt-0">
                    <div className="relative h-full md:absolute md:h-auto md:top-[-40px] md:bottom-[-40px] md:left-0 md:right-0 bg-black p-2 overflow-hidden z-20">
                        <div className="relative w-full h-full overflow-hidden">
                            <Image 
                                src="/WhatsApp Image 2026-04-19 at 20.33.27 (5).jpeg"
                                alt="Kenya Keys 20 Year Impact"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Flag Icon Removed as requested */}
                    </div>
                </div>
            </div>
        </section>
    );
}
