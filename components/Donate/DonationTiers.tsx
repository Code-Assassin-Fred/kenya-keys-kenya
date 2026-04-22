'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

import { getPackagesAction } from '@/lib/actions/admin-actions';

export default function DonationTiers() {
    const [tiers, setTiers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await getPackagesAction();
            setTiers(data);
            setLoading(false);
        }
        load();
    }, []);

    if (loading) {
        return (
            <div className="py-24 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00529B] mx-auto"></div>
            </div>
        );
    }
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase tracking-tight mb-4">
                        Choose Your <span className="text-[#00529B]">Impact</span> Level
                    </h2>
                    <p className="text-lg text-gray-600 font-outfit max-w-2xl mx-auto">
                        Whether it's covers and books or a full university degree, your monthly gift creates a stable foundation for a student's success.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {tiers.map((tier: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className={`relative flex flex-col p-8 md:p-10 rounded-3xl border-2 transition-all hover:shadow-2xl ${tier.popular ? 'border-[#00529B] bg-blue-50/30' : 'border-gray-100 bg-white'
                                }`}
                        >
                            {tier.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00529B] text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest font-outfit">
                                    Most Impactful
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-black text-[#333] font-oswald uppercase mb-4 tracking-tight">
                                    {tier.title}
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl md:text-5xl font-black text-[#00529B] font-oswald">${tier.amount}</span>
                                    <span className="text-gray-500 font-bold font-outfit">{tier.period}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 font-outfit mb-8 leading-relaxed">
                                {tier.description}
                            </p>

                            <ul className="space-y-4 mb-10">
                                {tier.features.map((feature: string, i: number) => (
                                    <li key={i} className="flex gap-3 items-start font-outfit text-sm font-bold text-[#333]">
                                        <Check className="w-5 h-5 text-[#009bba] flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col gap-8">
                                <div className="bg-white/80 p-4 rounded-xl border-l-4 border-[#FFB800]">
                                    <p className="text-sm italic text-gray-700 font-outfit leading-relaxed">
                                        "{tier.quote}"
                                    </p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#00529B] mt-2 font-outfit">
                                        — {tier.student}
                                    </p>
                                </div>

                                <button className={`w-full py-4 rounded-full font-black font-outfit text-sm uppercase tracking-widest transition-all ${tier.popular
                                        ? 'bg-[#00529B] text-white hover:bg-[#003d75] shadow-lg'
                                        : 'border-2 border-[#1D366D] text-[#1D366D] hover:bg-[#1D366D] hover:text-white'
                                    }`}>
                                    Choose {tier.title}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
