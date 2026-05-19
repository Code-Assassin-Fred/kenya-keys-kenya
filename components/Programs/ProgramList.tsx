'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const programsData = [
    {
        id: 1,
        title: 'Student Scholarship / Sponsorships',
        color: '#00529B',
        bullets: [
            'High School sponsorship',
            'Middle College sponsorship',
            'University sponsorship',
            'Non-formal education',
            'Education for disabled'
        ]
    },
    {
        id: 2,
        title: 'Health and Hygiene',
        color: '#E11D48',
        bullets: [
            'Sanitary Pads for girls',
            'Menstrual Cups training',
            'Nutrition and food security'
        ]
    },
    {
        id: 3,
        title: 'ICT Integration in Education',
        color: '#0D9488',
        bullets: [
            'Community education center e-learning program',
            'College/university laptop provision',
            'Competency Based Education',
            'ICT Skills Training'
        ]
    },
    {
        id: 4,
        title: 'Student Mentorship',
        color: '#7C3AED',
        bullets: [
            'Pysho-Social counselling',
            'Career guidance/counselling',
            'Life skills training'
        ]
    },
    {
        id: 5,
        title: 'Library',
        color: '#2563EB',
        bullets: [
            'Book donations — Elementary and high schools',
            'Community education center library support',
        ]
    },
    {
        id: 6,
        title: 'Schools Infrastructure',
        color: '#EA580C',
        bullets: [
            'Toilets/washroom construction',
            'Classrooms construction',
            'Dormitories construction',
            'Desks'
        ]
    },
    {
        id: 7,
        title: 'Business Training',
        color: '#16A34A',
        bullets: [
            'Business mentorship',
            'Entrepreneurship training',
            'Women in business sustainable livelihoods training'
        ]
    },
    {
        id: 8,
        title: 'Capacity Building & Leadership Training',
        color: '#0369A1',
        bullets: [
            'Community outreach initiative',
            'Inter-cultural exchange'
        ]
    }
];

function ProgramItem({ prog, isOpen, onToggle }: { prog: typeof programsData[0]; isOpen: boolean; onToggle: () => void }) {
    return (
        <div className="border-b border-gray-300/50 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-5 px-1 text-left group"
            >
                <span className="text-[17px] md:text-[18px] font-bold font-outfit text-[#333] group-hover:text-[#00529B] transition-colors leading-snug">
                    {prog.title}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 ml-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    style={isOpen ? { color: prog.color } : {}}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <ul className="pl-3 pr-2 pb-5 space-y-2.5">
                            {prog.bullets.map((bullet, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                    <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-[7px]" style={{ backgroundColor: prog.color }} />
                                    <span className="text-gray-600 font-outfit text-[14px] leading-relaxed">{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ProgramList() {
    const [openId, setOpenId] = useState<number | null>(null);

    const toggle = (id: number) => setOpenId(openId === id ? null : id);

    const row1 = programsData.slice(0, 4);
    const row2 = programsData.slice(4, 8);

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Sandy base color */}
            <div className="absolute inset-0 bg-[#f5f2ed] pointer-events-none" />

            {/* Layer 1: Heavy coarse grain noise */}
            <div
                className="absolute inset-0 opacity-50 pointer-events-none mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='sand1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='6' seed='1' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23sand1)' opacity='0.7'/%3E%3C/svg%3E")`,
                    backgroundSize: '256px 256px'
                }}
            />

            {/* Layer 2: Finer grain overlay */}
            <div
                className="absolute inset-0 opacity-35 pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='sand2'%3E%3CfeTurbulence type='turbulence' baseFrequency='3.5' numOctaves='5' seed='42' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23sand2)' opacity='0.6'/%3E%3C/svg%3E")`,
                    backgroundSize: '180px 180px'
                }}
            />

            {/* Layer 3: Dense scattered sand speckle dots */}
            <div
                className="absolute inset-0 opacity-[0.18] pointer-events-none"
                style={{
                    backgroundImage: `
                        radial-gradient(circle, #8a7e6b 1px, transparent 1px),
                        radial-gradient(circle, #a09484 0.7px, transparent 0.7px),
                        radial-gradient(circle, #6e6354 0.5px, transparent 0.5px)
                    `,
                    backgroundSize: '7px 7px, 11px 11px, 5px 5px',
                    backgroundPosition: '0 0, 3px 5px, 1px 2px'
                }}
            />

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <span className="text-[#00529B] font-black tracking-[0.2em] uppercase text-xs mb-3 block font-outfit">
                        Our Focus Areas
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase tracking-tight leading-none">
                        Our <span className="text-[#00529B]">Programs</span>
                    </h2>
                </div>

                {/* Row 1 — 4 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6 lg:gap-y-0 mb-2">
                    {row1.map((prog) => (
                        <ProgramItem
                            key={prog.id}
                            prog={prog}
                            isOpen={openId === prog.id}
                            onToggle={() => toggle(prog.id)}
                        />
                    ))}
                </div>
 
                {/* Row 2 — 3 columns centered */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6 lg:gap-y-0">
                    {row2.map((prog) => (
                        <ProgramItem
                            key={prog.id}
                            prog={prog}
                            isOpen={openId === prog.id}
                            onToggle={() => toggle(prog.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
