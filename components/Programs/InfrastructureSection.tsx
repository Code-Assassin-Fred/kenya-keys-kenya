'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Users, DoorOpen, LayoutGrid, DollarSign } from 'lucide-react';

const projects = [
    {
        title: 'Classroom Construction / Upgrades',
        cost: '1,300',
        description: 'Enables construction or complete repair/retrofit of structural block classrooms to provide a clean, safe, weatherproof learning room for up to 50 children.',
        icon: DoorOpen,
        color: '#EA580C',
        bg: 'bg-orange-50'
    },
    {
        title: 'Handcrafted school Desks (3-Seater)',
        cost: '35',
        description: 'Supplies high-grade, local hardwood timber desks. Each three-seater desk replaces dirt floor seating, giving three students a comfortable writing surface.',
        icon: LayoutGrid,
        color: '#EA580C',
        bg: 'bg-orange-50'
    },
    {
        title: 'Toilets / Washroom Construction',
        description: 'Sanitary brick washroom blocks with private facilities are absolutely critical for keeping secondary school girls present, particularly during their cycles.',
        icon: Users,
        color: '#EA580C',
        bg: 'bg-orange-50'
    },
    {
        title: 'Student Dormitories Construction',
        description: 'Safe, supervised high-capacity dormitories that shield students from long, dangerous daily commutes and allow them to fully focus on university/secondary coursework.',
        icon: Hammer,
        color: '#EA580C',
        bg: 'bg-orange-50'
    }
];

export default function InfrastructureSection() {
    return (
        <section id="infrastructure" className="py-24 bg-amber-50/20 border-t border-b border-amber-100/20 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                
                {/* Title block */}
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <span className="text-[#EA580C] font-black tracking-[0.2em] uppercase text-xs mb-3 block font-outfit">
                            06. Structural Support
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase tracking-tight leading-none">
                            SCHOOLS & CAMPUS <span className="text-[#EA580C]">INFRASTRUCTURE</span>
                        </h2>
                    </div>
                    <p className="text-lg text-gray-600 font-outfit max-w-md">
                        Learning requires physical space and safe facilities. By funding toilet blocks, safe dormitory housing, classrooms, and school desks, we build solid foundations for academic success.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((proj, idx) => {
                        const Icon = proj.icon;
                        return (
                            <motion.div
                                key={proj.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.05 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-3xl border border-amber-100/30 p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`p-3 rounded-2xl ${proj.bg} text-[#EA580C] shadow-inner`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        {proj.cost && (
                                            <span className="bg-amber-100/50 text-[#EA580C] font-black text-xs px-4 py-1.5 rounded-full font-outfit flex items-center gap-0.5">
                                                <DollarSign className="w-3.5 h-3.5" />
                                                {proj.cost}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold font-outfit text-[#333] mb-4">
                                        {proj.title}
                                    </h3>
                                    <p className="text-gray-600 font-outfit text-sm leading-relaxed mb-6">
                                        {proj.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
