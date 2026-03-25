'use client';

import React from 'react';
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-[450px] w-full flex items-center bg-[#009bba] overflow-hidden">
            <div className="absolute inset-0 opacity-15">
                <div className="absolute inset-0 bg-[url('/hero.png')] bg-cover bg-center" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    <span className="text-white font-black tracking-[0.2em] uppercase text-sm mb-4 block font-outfit opacity-80">
                        Our Results
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white font-oswald uppercase leading-tight mb-6 tracking-tight">
                        OUR <span className="text-[#FFB800]">IMPACT</span>
                    </h1>
                    <p className="text-xl text-blue-50 font-outfit leading-relaxed max-w-2xl font-medium">
                        Measured in degrees earned, lives transformed, and the enduring ripple effect of education across generations.
                    </p>
                </motion.div>
            </div>
            
            {/* Dynamic Circles */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white opacity-5 rounded-full" />
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white opacity-5 rounded-full" />
        </section>
    );
}
