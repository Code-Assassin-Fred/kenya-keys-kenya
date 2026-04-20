'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface PageHeroProps {
    title: string;
    subtitle?: string;
    breadcrumb?: { label: string; href: string }[];
    bgColor?: string;
    bgImage?: string;
    accentColor?: string;
}

export default function PageHero({
    title,
    subtitle,
    breadcrumb,
    bgColor = "bg-[#1D366D]",
    bgImage,
    accentColor = "#FFB800"
}: PageHeroProps) {
    return (
        <section className={`relative min-h-[400px] md:min-h-[450px] w-full flex items-center overflow-hidden ${bgColor}`}>
            {/* Background Image with Overlay */}
            {bgImage && (
                <div className="absolute inset-0 z-0">
                    <div 
                        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20"
                        style={{ backgroundImage: `url('${bgImage}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
                </div>
            )}

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    {/* Breadcrumbs */}
                    {breadcrumb && (
                        <nav className="flex mb-6 space-x-2 text-xs md:text-sm font-bold uppercase tracking-widest text-white/60 font-outfit">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            {breadcrumb.map((item, index) => (
                                <React.Fragment key={index}>
                                    <span>/</span>
                                    <Link href={item.href} className="hover:text-white transition-colors">
                                        {item.label}
                                    </Link>
                                </React.Fragment>
                            ))}
                        </nav>
                    )}

                    <span 
                        className="font-black tracking-[0.2em] uppercase text-xs md:text-sm mb-4 block font-outfit"
                        style={{ color: accentColor }}
                    >
                        Kenya Keys
                    </span>
                    
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white font-oswald uppercase leading-[1.05] mb-6 tracking-tight">
                        {title.split(' ').map((word, i) => (
                            <span key={i} className={i % 2 !== 0 ? "" : ""}>
                                {word}{' '}
                            </span>
                        ))}
                    </h1>

                    {subtitle && (
                        <p className="text-lg md:text-xl lg:text-2xl text-blue-50/90 font-outfit leading-relaxed max-w-2xl font-light">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full hidden lg:block opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full fill-white">
                    <path d="M 100 0 L 100 100 L 0 100 Z" />
                </svg>
            </div>
            
            <div 
                className="absolute bottom-0 left-0 w-full h-2 z-20"
                style={{ backgroundColor: accentColor }}
            />
        </section>
    );
}
