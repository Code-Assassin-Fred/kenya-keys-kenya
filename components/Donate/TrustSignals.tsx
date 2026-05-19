'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Users, Heart } from 'lucide-react';

const signals = [
    {
        icon: <ShieldCheck className="w-10 h-10" />,
        title: "Low Admin Costs",
        description: "Less than 10% of our budget goes to administration. Your donation goes to the students."
    },
    {
        icon: <TrendingUp className="w-10 h-10" />,
        title: "20 Years of Impact",
        description: "A proven track record of transparency and life-changing educational results since 2005."
    },
    {
        icon: <Users className="w-10 h-10" />,
        title: "Direct Connection",
        description: "Through letters and reports, you'll see exactly how your sponsored student is thriving."
    },
    {
        icon: <Heart className="w-10 h-10" />,
        title: "Local Leadership",
        description: "Programs are designed and run by Kenyan leaders who understand the local community's needs."
    }
];

export default function TrustSignals() {
    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase leading-none mb-6 tracking-tight">
                            Why Give Through <span className="text-[#00529B]">Kenya Keys?</span>
                        </h2>
                        <p className="text-xl text-gray-600 font-outfit font-light">
                            We are committed to the highest standards of financial accountability and direct student impact.
                        </p>
                    </div>
                    <div className="flex-shrink-0 bg-[#00529B] text-white p-6 rounded-2xl shadow-xl">
                        <div className="text-4xl font-black font-oswald text-[#FFB800] leading-none mb-1">100%</div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80 font-outfit">Sponsorship Graduation Rate</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {signals.map((signal, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
                        >
                            <div className="w-16 h-16 bg-blue-50 text-[#00529B] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#00529B] group-hover:text-white transition-colors duration-300">
                                {signal.icon}
                            </div>
                            <h3 className="text-2xl font-black text-[#333] font-oswald uppercase mb-4 tracking-tight">
                                {signal.title}
                            </h3>
                            <p className="text-gray-600 font-outfit leading-relaxed">
                                {signal.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
