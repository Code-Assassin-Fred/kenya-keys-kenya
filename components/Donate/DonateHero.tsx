'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function DonateHero() {
    return (
        <section className="relative h-[60vh] min-h-[500px] w-full flex items-center bg-[#1D366D] overflow-hidden">
            {/* Background Image with Cinematic Overlay */}
            <div className="absolute inset-0 z-0">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
                    style={{ backgroundImage: "url('/image16.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D366D] via-[#1D366D]/40 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-3xl"
                >
                    <span className="text-[#FFB800] font-black tracking-[0.2em] uppercase text-sm mb-6 block font-outfit">
                        Make a Difference
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white font-oswald uppercase leading-[0.9] mb-8 tracking-tighter">
                        YOUR GIFT <br />
                        <span className="text-[#FFB800]">CHANGES</span> EVERYTHING
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-50 font-outfit leading-relaxed max-w-xl font-light">
                        Every dollar donated goes directly to removing the financial barriers that keep bright students out of school.
                    </p>
                </motion.div>
            </div>

            {/* Decorative Svg Curve */}
            <div className="absolute bottom-[-1px] left-0 w-full h-24 z-20 overflow-hidden translate-y-1">
                <svg viewBox="0 0 1440 100" fill="white" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z" />
                </svg>
            </div>
        </section>
    );
}
