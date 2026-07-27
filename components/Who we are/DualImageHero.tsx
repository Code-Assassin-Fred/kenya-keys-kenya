'use client';

import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";

export default function DualImageHero() {
    return (
        <section id="our-story" className="w-full overflow-hidden">
            <div className="relative flex flex-col md:flex-row w-full h-[350px] md:h-[500px]">
                {/* Left Image - Acacia Sunset */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden cursor-pointer"
                >
                    <Image
                        src="/Acacia newj.jpeg"
                        alt="Acacia tree silhouette against a golden Kenyan sunset"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    {/* Dark overlay for contrast */}
                    <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/50" />
                </motion.div>

                {/* Right Image - Baobab Sunset */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    viewport={{ once: true }}
                    className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden cursor-pointer"
                >
                    <Image
                        src="/Baobab newj1.jpeg"
                        alt="Baobab tree against a vibrant Kenyan sunset sky"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    {/* Dark overlay for contrast */}
                    <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/50" />
                </motion.div>

                {/* Centered Overlay Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10 pointer-events-none">
                    <motion.span
                        initial={{ opacity: 0, y: -25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-[#FFB800] font-black tracking-[0.2em] uppercase text-xs sm:text-sm mb-4 font-outfit"
                    >
                        Unlocking Potential Since 2005
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        viewport={{ once: true }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black text-white font-oswald uppercase leading-tight tracking-tight max-w-4xl px-4"
                    >
                        THE JOURNEY OF <span className="text-[#FFB800]">KENYA KEYS</span>
                    </motion.h2>
                </div>
            </div>
        </section>
    );
}
