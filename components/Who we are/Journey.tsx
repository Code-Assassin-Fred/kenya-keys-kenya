'use client';

import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";

export default function Journey() {
    return (
        <section id="journey" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    <div className="w-full md:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                                <Image 
                                    src="/image4.webp" 
                                    alt="Students in Kenya" 
                                    fill 
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-[#FFB800] p-8 rounded-xl shadow-xl hidden md:block">
                                <p className="text-[#00529B] font-black text-4xl font-oswald">2005</p>
                                <p className="text-[#333] font-bold text-sm uppercase tracking-wider font-outfit">The Beginning</p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase leading-none mb-8 tracking-tight">
                                OUR <span className="text-[#00529B]">JOURNEY</span>
                            </h2>
                            <div className="space-y-6 text-gray-700 font-outfit text-lg leading-relaxed">
                                <p>
                                    In 2005, a critical challenge was identified in Taru, Kenya: 95% of children were dropping out of school after middle school due to an inability to pay school fees. In the region, extreme poverty and illiteracy were the norm, threatening the future of generations.
                                </p>
                                <p>
                                    Recognizing this urgent need, <span className="font-bold text-[#00529B]">Principal Joseph Mwengea</span> led a local initiative to identify and sponsor 14 high-achieving students. From this small but powerful beginning, a vision emerged to unlock potential through education.
                                </p>
                                <p>
                                    Twenty years later, Kenya Keys has sponsored the education of over 1,000 students, transforming lives and creating a ripple effect of hope throughout the community, led entirely by Kenyan professionals and community leaders.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
