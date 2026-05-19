'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Cpu, MonitorPlay, Wifi } from 'lucide-react';

const programs = [
    {
        title: 'Community Education Center E-Learning Program',
        description: 'Providing open-access e-learning tools, digital encyclopedia copies, virtual science labs, and core research databases directly to rural learners.',
        icon: MonitorPlay,
        tag: 'Regional Hub'
    },
    {
        title: 'College & University Laptop Provision',
        description: 'Distributing high-performance personal laptops to sponsored tertiary students to ensure they succeed in their technical and degree requirements.',
        icon: Laptop,
        tag: 'Essential Equipment'
    },
    {
        title: 'Competency-Based ICT Skills Training',
        description: 'Structured computer programming, database literacy, and basic technical digital courses aligned with the competency-based curriculum.',
        icon: Cpu,
        tag: 'Technical Readiness'
    }
];

export default function ICTSection() {
    return (
        <section id="ict" className="py-24 bg-white scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                
                {/* Heading */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <span className="text-[#0D9488] font-black tracking-[0.2em] uppercase text-xs mb-3 block font-outfit">
                            03. Tech Integration
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase tracking-tight leading-none">
                            ICT INTEGRATION IN <span className="text-[#0D9488]">EDUCATION</span>
                        </h2>
                    </div>
                    <p className="text-lg text-gray-600 font-outfit max-w-md">
                        Digital literacy is crucial for long-term career growth. We integrate cutting-edge ICT programs into the educational ecosystem, giving students and teachers tools to succeed in a modern, connected world.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {programs.map((prog, idx) => {
                        const IconComponent = prog.icon;
                        return (
                            <motion.div
                                key={prog.title}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-3xl border border-gray-100 p-8 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-teal-500/20 transition-all duration-300 group"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-teal-50 text-[#0D9488] rounded-2xl shadow-inner group-hover:scale-110 transition-transform">
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <span className="bg-teal-50/50 text-[#0D9488] font-black text-[10px] tracking-wider uppercase px-3 py-1 rounded-full font-outfit">
                                            {prog.tag}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold font-outfit text-[#333] mb-3 leading-snug group-hover:text-[#0D9488] transition-colors">
                                        {prog.title}
                                    </h3>
                                    <p className="text-gray-600 font-outfit text-sm leading-relaxed mb-6">
                                        {prog.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 border-t border-gray-50 pt-4 mt-auto text-gray-400">
                                    <Wifi className="w-4 h-4 text-teal-500/60" />
                                    <span className="text-[11px] font-outfit font-semibold uppercase tracking-wider">Broadband Connectivity</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
