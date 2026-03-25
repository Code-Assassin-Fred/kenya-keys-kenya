'use client';

import React from 'react';
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-[400px] w-full flex items-center bg-[#333] overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('/image2.png')] bg-cover bg-center grayscale" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-[#FFB800] font-black tracking-[0.3em] uppercase text-sm mb-6 block font-outfit">
                        The Latest
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black text-white font-oswald uppercase leading-tight mb-6 tracking-tighter">
                        NEWS & <span className="text-[#FFB800]">UPDATES</span>
                    </h1>
                    <div className="w-24 h-1.5 bg-[#FFB800] mx-auto rounded-full" />
                </motion.div>
            </div>
            
            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </section>
    );
}
