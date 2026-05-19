'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Smile, Landmark, Navigation } from 'lucide-react';

const pillars = [
    {
        title: 'Social Counselling',
        description: 'Providing confidential support, trauma care, and safe counseling environments to help students process family crises, domestic pressures, and systemic poverty issues.',
        icon: Smile,
        color: 'text-[#7C3AED]',
        bg: 'bg-purple-50'
    },
    {
        title: 'Career Guidance & Counselling',
        description: 'Guiding secondary students to identify educational strengths, vocational skill paths, and post-secondary selections to fit active job market needs.',
        icon: Navigation,
        color: 'text-[#7C3AED]',
        bg: 'bg-purple-50'
    },
    {
        title: 'Life Skills Training',
        description: 'Focusing on building strong moral leadership, emotional intelligence, positive financial literacy habits, and physical and mental health hygiene.',
        icon: Brain,
        color: 'text-[#7C3AED]',
        bg: 'bg-purple-50'
    }
];

export default function MentorshipSection() {
    return (
        <section id="mentorship" className="py-24 bg-purple-50/20 border-t border-b border-purple-100/20 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                
                {/* Intro */}
                <div className="max-w-3xl mb-16">
                    <span className="text-[#7C3AED] font-black tracking-[0.2em] uppercase text-xs mb-3 block font-outfit">
                        04. Mental Resilience
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase tracking-tight leading-none mb-6">
                        PSYCHO-STUDENT <span className="text-[#7C3AED]">MENTORSHIP</span>
                    </h2>
                    <p className="text-lg text-gray-600 font-outfit leading-relaxed">
                        To truly unlock potential, students require more than school fees. We nourish their mental health and future planning by creating dedicated social support networks and career pathways.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {pillars.map((pillar, idx) => {
                        const Icon = pillar.icon;
                        return (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-3xl border border-purple-100/30 shadow-md flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className={`p-3 rounded-2xl ${pillar.bg} ${pillar.color}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold font-outfit text-[#333] mb-4">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-gray-600 font-outfit text-sm leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Highlight Quote */}
                <div className="relative bg-[#7C3AED] rounded-3xl p-8 md:p-12 text-white overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-full opacity-10 translate-x-6 -rotate-12 bg-white/20 shrink-0" />
                    <blockquote className="relative z-10 max-w-4xl">
                        <p className="font-outfit text-xl md:text-2xl font-bold leading-relaxed mb-6 italic">
                            "The mentorship program gave me a map. I learned who I was, how to build healthy relationships, and how to define my career goals."
                        </p>
                        <cite className="font-outfit text-sm not-italic uppercase tracking-wider font-black text-purple-200">
                            — Kenya Keys Sponsored Graduate & Current Junior Mentor
                        </cite>
                    </blockquote>
                </div>

            </div>
        </section>
    );
}
