'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const signals = [
    {
        title: "Low Admin Costs",
        description: "Less than 10% of our budget goes to administration. Your donation goes to the students."
    },
    {
        title: "20 Years of Impact",
        description: "A proven track record of transparency and life-changing educational results since 2005."
    },
    {
        title: "Direct Connection",
        description: "Through letters and reports, you'll see exactly how your sponsored student is thriving."
    },
    {
        title: "Local Leadership",
        description: "Programs are designed and run by Kenyan leaders who understand the local community's needs."
    }
];

export default function TrustSignals() {
    return (
        <section className="relative w-full py-24 overflow-hidden bg-black text-white">
            {/* Background Image with Cinematic Overlay */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src="/image4.webp"
                    alt="Kenya Keys community education support in rural Kwale County"
                    fill
                    sizes="100vw"
                    className="object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/85" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl text-left">
                        <h2 className="text-3xl md:text-5xl font-black text-white font-oswald uppercase leading-none mb-6 tracking-tight">
                            Why Give Through <span className="text-[#FFB800]">Kenya Keys?</span>
                        </h2>
                        <p className="text-xl text-gray-300 font-outfit font-light leading-relaxed">
                            We are committed to the highest standards of financial accountability and direct student impact.
                        </p>
                    </div>
                    <div className="flex-shrink-0 bg-[#00529B]/90 backdrop-blur-md text-white p-6 rounded-2xl shadow-2xl border border-white/10">
                        <div className="text-4xl font-black font-oswald text-[#FFB800] leading-none mb-1 text-left">100%</div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80 font-outfit text-left">Sponsorship Graduation Rate</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {signals.map((signal, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 hover:bg-white/15 transition-all group text-left"
                        >
                            <h3 className="text-2xl font-black text-white font-oswald uppercase mb-4 tracking-tight">
                                {signal.title}
                            </h3>
                            <p className="text-gray-300 font-outfit leading-relaxed font-light">
                                {signal.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

