'use client';

import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Sponsorship() {
    return (
        <section id="sponsorship" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase leading-tight mb-8 tracking-tight">
                            STUDENT <span className="text-[#00529B]">SPONSORSHIP</span>
                        </h2>
                        <div className="space-y-6 text-gray-700 font-outfit text-lg leading-relaxed mb-10">
                            <p>
                                Access to education unlocks a world of opportunities. Since 2005, Kenya Keys has paired students with donors whose sponsorship covers their tuition and fees.
                            </p>
                            <p>
                                Each student is high-achieving but comes from a background of extreme poverty. Sponsorship provides them with the stability to focus on their studies and pursue their dreams.
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                {[
                                    "Secondary School Tuition",
                                    "Post-Secondary Degrees",
                                    "Vocational Training",
                                    "Mentorship Support"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 font-bold text-[#00529B]">
                                        <div className="w-2 h-2 bg-[#FFB800] rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link 
                            href="/donate" 
                            className="inline-block bg-[#00529B] text-white font-bold font-outfit px-10 py-4 rounded-md hover:bg-[#003d75] transition-all uppercase tracking-wider shadow-lg"
                        >
                            Sponsor a Student
                        </Link>
                    </motion.div>

                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl z-10"
                        >
                            <Image src="/image3.png" alt="Students in Kenya" fill className="object-cover" />
                        </motion.div>
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFB800] rounded-full z-0 opacity-20" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-50 rounded-3xl z-0" />
                    </div>
                </div>
            </div>
        </section>
    );
}
