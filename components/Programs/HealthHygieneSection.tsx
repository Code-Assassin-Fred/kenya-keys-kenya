'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';

export default function HealthHygieneSection() {
    return (
        <section id="health-hygiene" className="py-24 bg-rose-50/30 border-t border-b border-rose-100/30 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                
                {/* Header */}
                <div className="max-w-3xl mb-16">
                    <span className="text-[#E11D48] font-black tracking-[0.2em] uppercase text-xs mb-3 block font-outfit">
                        02. Health & Hygiene Support
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase tracking-tight leading-none mb-6">
                        HEALTH, CONFIDENCE & <span className="text-[#E11D48]">HYGIENE</span>
                    </h2>
                    <p className="text-lg text-gray-600 font-outfit leading-relaxed">
                        A major cause of school absenteeism among girls in rural Kenya is the lack of proper menstrual hygiene supplies. We remove this barrier by providing sanitary products and long-term sustainable training.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                    
                    {/* Sanitary Pads Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl border border-rose-100/50 p-8 md:p-10 shadow-lg flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-rose-50 text-[#E11D48] rounded-2xl shadow-inner">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-black font-oswald text-[#333] uppercase tracking-tight">
                                    Sanitary Pads Distribution
                                </h3>
                            </div>
                            
                            <p className="text-gray-600 font-outfit text-base leading-relaxed mb-6">
                                Standard pad distributions ensure girls stay comfortable, focused, and present in their classrooms. Without basic hygiene support, girls lose up to 50 school days per year.
                            </p>

                            <div className="bg-rose-50/50 border border-rose-100/30 p-6 rounded-2xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <span className="text-sm font-black uppercase text-[#E11D48] font-outfit tracking-wider block">Impact Investment</span>
                                    <span className="text-3xl font-black text-[#333] font-outfit mt-1 block">$10 — Any Amount</span>
                                </div>
                                <p className="text-xs text-gray-500 font-outfit max-w-[200px] leading-relaxed">
                                    Just $10 provides a girl with a consistent supply of pads, keeping her in school.
                                </p>
                            </div>
                        </div>

                        <a
                            href="/donate"
                            className="w-full py-4 text-center bg-[#E11D48] text-white font-bold font-outfit uppercase tracking-wider text-sm rounded-xl hover:bg-[#BE123C] transition-all shadow-md flex items-center justify-center gap-2"
                        >
                            <Heart className="w-5 h-5 fill-white" />
                            Donate to Girls' Hygiene
                        </a>
                    </motion.div>

                    {/* Menstrual Cups Training Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl border border-rose-100/50 p-8 md:p-10 shadow-lg flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-rose-50 text-[#E11D48] rounded-2xl shadow-inner">
                                    <Heart className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-black font-oswald text-[#333] uppercase tracking-tight">
                                    Menstrual Cups Training
                                </h3>
                            </div>
                            
                            <p className="text-gray-600 font-outfit text-base leading-relaxed mb-6">
                                We believe in permanent, sustainable solutions. Our menstrual cups initiative offers interactive training, safety instruction, and distribution of high-grade menstrual cups that last for up to 10 years.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex gap-3 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#E11D48] mt-2 shrink-0" />
                                    <p className="text-gray-700 font-outfit text-sm font-semibold">10-Year Eco-Friendly Lifespan</p>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#E11D48] mt-2 shrink-0" />
                                    <p className="text-gray-700 font-outfit text-sm font-semibold">Comprehensive Hygiene & Biological Training</p>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#E11D48] mt-2 shrink-0" />
                                    <p className="text-gray-700 font-outfit text-sm font-semibold">Peer mentorship & group counselling support</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 p-4 rounded-xl">
                            <AlertCircle className="w-5 h-5 text-gray-400 shrink-0" />
                            <span className="text-xs text-gray-500 font-outfit font-medium">
                                Delivered by certified local medical practitioners and senior Kenya Keys mentors.
                            </span>
                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
