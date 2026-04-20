'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CTABannerProps {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
    bgImage: string;
    accentColor?: string;
}

export default function CTABanner({
    title,
    description,
    buttonText,
    buttonHref,
    bgImage,
    accentColor = "#FFB800"
}: CTABannerProps) {
    return (
        <section className="relative w-full py-24 md:py-32 overflow-hidden bg-black">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{ backgroundImage: `url('${bgImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                >
                    <div 
                        className="w-16 h-1.5 mb-8 rounded-full"
                        style={{ backgroundColor: accentColor }}
                    />
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-oswald uppercase leading-tight mb-6 tracking-tight">
                        {title}
                    </h2>
                    
                    <p className="text-xl md:text-2xl text-gray-200 font-outfit mb-10 leading-relaxed font-light">
                        {description}
                    </p>
                    
                    <Link
                        href={buttonHref}
                        className="inline-block bg-white text-black font-black font-outfit px-12 py-5 rounded-full hover:bg-[#FFB800] transition-all uppercase tracking-widest text-sm shadow-2xl transform hover:-translate-y-1"
                    >
                        {buttonText}
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Slashes */}
            <div className="absolute inset-y-0 right-0 w-1/4 hidden lg:flex gap-4 opacity-10 pointer-events-none transform -skew-x-12 translate-x-12">
                <div className="w-12 h-full bg-white" />
                <div className="w-12 h-full bg-white" />
                <div className="w-12 h-full bg-white" />
            </div>
        </section>
    );
}
