'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Book, GraduationCap, Coffee, Home, Users } from 'lucide-react';
import Image from 'next/image';

const impactItems = [
    {
        icon: <Book className="w-6 h-6" />,
        title: "Tuition & Fees",
        description: "Covers all mandatory school fees, ensuring the student is never sent home due to non-payment."
    },
    {
        icon: <GraduationCap className="w-6 h-6" />,
        title: "Uniforms & Supplies",
        description: "Provides school uniforms, shoes, textbooks, and stationary needed for classroom success."
    },
    {
        icon: <Coffee className="w-6 h-6" />,
        title: "Meals & Nutrition",
        description: "Ensures students have access to healthy meals, allowing them to focus on learning rather than hunger."
    },
    {
        icon: <Home className="w-6 h-6" />,
        title: "Room & Board",
        description: "For many students, this includes safe housing at boarding schools, essential for students in remote areas."
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: "Mentorship",
        description: "Access to our local team of mentors and alumni who provide emotional support and career guidance."
    }
];

export default function SponsorshipImpact() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Left: Image Card */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            <div className="relative aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl z-10 border-[12px] border-white">
                                <Image 
                                    src="/image15.webp" 
                                    alt="Kenya Keys sponsored student studying with support from education sponsorship program" 
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover" 
                                />
                            </div>
                            
                            {/* Accent Circle */}
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#FFB800] rounded-full z-0 opacity-20 blur-2xl" />
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#00529B] rounded-full z-0 opacity-10" />
                        </motion.div>
                    </div>

                    {/* Right: Content List */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase leading-none mb-12 tracking-tight">
                                WHAT YOUR <br />
                                <span className="text-[#00529B]">GIFT</span> COVERS
                            </h2>

                            <div className="space-y-8">
                                {impactItems.map((item, idx) => (
                                    <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        className="flex gap-6 items-start group"
                                    >
                                        <div className="w-12 h-12 bg-white text-[#00529B] rounded-2xl flex items-center justify-center shadow-md border border-gray-100 group-hover:bg-[#00529B] group-hover:text-white transition-all duration-300 flex-shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black text-[#333] font-oswald uppercase mb-1 tracking-tight">
                                                {item.title}
                                            </h4>
                                            <p className="text-gray-600 font-outfit leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
