'use client';

import React from 'react';
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-[450px] w-full flex items-center bg-[#FFB800] overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('/image2.png')] bg-cover bg-center grayscale" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    <span className="text-[#00529B] font-black tracking-[0.2em] uppercase text-sm mb-4 block font-outfit">
                        Our Work
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-[#333] font-oswald uppercase leading-tight mb-6 tracking-tight">
                        CORE <span className="text-[#00529B]">PROGRAMS</span>
                    </h1>
                    <p className="text-xl text-[#444] font-outfit leading-relaxed max-w-2xl font-medium">
                        Focused on education sponsorship and holistic student support to ensure long-term success and community empowerment.
                    </p>
                </motion.div>
            </div>
            
            {/* Decorative Slashes */}
            <div className="absolute top-0 right-0 w-1/4 h-full flex gap-4 opacity-10 translate-x-12 -rotate-12">
                <div className="w-12 h-full bg-[#00529B]" />
                <div className="w-12 h-full bg-[#00529B]" />
                <div className="w-12 h-full bg-[#00529B]" />
            </div>
        </section>
    );
}
