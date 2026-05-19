'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Landmark, Coins } from 'lucide-react';

const paths = [
    {
        title: 'Business Mentorship',
        description: 'Connecting program graduates and local community leaders with seasoned business professionals to receive ongoing guidance on managing and expanding active local shops.',
        icon: Users
    },
    {
        title: 'Entrepreneurship Training',
        description: 'Delivering practical classes covering budget design, basic bookkeeping, active inventory control, marketing strategies, and small business planning.',
        icon: Coins
    },
    {
        title: 'Sustainable Livelihoods Skills',
        description: 'Equipping rural families and women with diverse vocational skills, agricultural training, and self-help group habits to build financial independence.',
        icon: TrendingUp
    }
];

export default function BusinessTrainingSection() {
    return (
        <section id="business" className="py-24 bg-white scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                
                {/* Heading */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <span className="text-[#16A34A] font-black tracking-[0.2em] uppercase text-xs mb-3 block font-outfit">
                            07. Economic Empowerment
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase tracking-tight leading-none">
                            BUSINESS & ENTREPRENEURSHIP <span className="text-[#16A34A]">TRAINING</span>
                        </h2>
                    </div>
                    <p className="text-lg text-gray-600 font-outfit max-w-md">
                        Education must translate into viable economic opportunities. We invest directly in business skills, startup mentorship, and sustainable agricultural techniques to lift families out of generational poverty.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {paths.map((path, idx) => {
                        const Icon = path.icon;
                        return (
                            <motion.div
                                key={path.title}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-[#f0fdf4]/40 border border-[#bbf7d0]/20 rounded-3xl p-8 shadow-md hover:shadow-xl hover:border-green-500/20 transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="p-3 bg-green-50 text-[#16A34A] rounded-2xl shadow-inner w-fit mb-6 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold font-outfit text-[#333] mb-4">
                                        {path.title}
                                    </h3>
                                    <p className="text-gray-600 font-outfit text-sm leading-relaxed mb-6">
                                        {path.description}
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
