'use client';

import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    return (
        <section id="hero" className="relative h-[500px] w-full flex items-center bg-[#00529B] overflow-hidden">
            {/* Background Pattern/Overlay */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('/hero.png')] bg-cover bg-center mix-blend-overlay" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-3xl"
                >
                    <motion.span 
                        variants={itemVariants}
                        className="text-[#FFB800] font-black tracking-[0.2em] uppercase text-sm mb-4 block font-outfit"
                    >
                        Our Story
                    </motion.span>
                    <motion.h1 
                        variants={itemVariants}
                        className="text-4xl md:text-6xl font-black text-white font-oswald uppercase leading-tight mb-6 tracking-tight"
                    >
                        WHO WE <span className="text-[#FFB800]">ARE</span>
                    </motion.h1>
                    <motion.p 
                        variants={itemVariants}
                        className="text-xl text-blue-50 font-outfit leading-relaxed max-w-2xl"
                    >
                        Kenya Keys is a grassroots organization dedicated to unlocking the potential of bright, motivated students in rural Kenya through education and holistic support.
                    </motion.p>
                </motion.div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute bottom-0 right-0 w-1/3 h-full hidden lg:block">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full fill-white opacity-10">
                    <path d="M 100 0 L 100 100 L 0 100 Z" />
                </svg>
            </div>
        </section>
    );
}
