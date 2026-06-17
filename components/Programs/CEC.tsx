'use client';

import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";

export default function CEC() {
    return (
        <section id="cec" className="py-24 bg-[#333] text-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FFB800]" />
            
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10"
                        >
                            <Image src="/new illuminate.webp" alt="Kenya Keys Community Education Center building in Taru Kenya" fill className="object-cover" />
                        </motion.div>
                    </div>

                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-[#FFB800] font-black tracking-[0.2em] uppercase text-sm mb-4 block font-outfit">
                                Community Learning
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-white font-oswald uppercase leading-tight mb-8 tracking-tight">
                                THE <span className="text-[#FFB800]">CAMPUS</span>
                            </h2>
                            <p className="text-xl text-gray-300 font-outfit leading-relaxed mb-8">
                                The Community Education Center (CEC) is a 15,000 square foot regional hub for education, technology, and community learning.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { label: "Public Library", icon: "📚" },
                                    { label: "Computer Lab", icon: "💻" },
                                    { label: "Meeting Hall", icon: "🤝" },
                                    { label: "Study Spaces", icon: "✍️" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                                        <span className="text-2xl">{item.icon}</span>
                                        <span className="font-bold font-outfit text-sm uppercase tracking-wider">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
