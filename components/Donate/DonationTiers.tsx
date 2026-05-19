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
            const normalizedData = data.map((tier: any) => {
                let title = tier.title || '';
                if (title.toLowerCase().includes('landing')) {
                    title = title.replace(/landing/gi, 'LAUNCH');
                }

                let period = tier.period || '';
                if (period.toLowerCase().includes('term')) {
                    period = period.replace(/term/gi, 'year');
                }

                let description = tier.description || '';
                description = description.replace(/one term/gi, 'a full year');
                description = description.replace(/for a term/gi, 'for a full year');
                description = description.replace(/term/gi, 'year');
                description = description.replace(/landing/gi, 'LAUNCH');

                const features = (tier.features || []).map((feat: string) => {
                    let f = feat;
                    f = f.replace(/one term/gi, 'a full year');
                    f = f.replace(/for a term/gi, 'for a full year');
                    f = f.replace(/term/gi, 'year');
                    f = f.replace(/landing/gi, 'LAUNCH');
                    return f;
                });

                return {
                    ...tier,
                    title,
                    period,
                    description,
                    features
                };
            });
            const uniqueData: any[] = [];
            const seenTitles = new Set();
            for (const tier of normalizedData) {
                const titleKey = (tier.title || '').trim().toLowerCase();
                if (!seenTitles.has(titleKey)) {
                    seenTitles.add(titleKey);
                    uniqueData.push(tier);
                }
            }
            setTiers(uniqueData);
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
        <section className="py-12 md:py-16 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase tracking-tight mb-4">
                        OR SELECT FROM THE <span className="text-[#00529B]">PACKAGES BELOW</span>
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
                            className={`relative flex flex-col p-6 md:p-8 rounded-[4px] border-2 transition-all hover:shadow-2xl ${tier.popular ? 'border-[#00529B] bg-blue-50/30' : 'border-gray-100 bg-white'
                                }`}
                        >
                            {tier.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00529B] text-white px-6 py-1.5 rounded-[4px] text-xs font-black uppercase tracking-widest font-outfit">
                                    Most Impactful
                                </div>
                            )}

                            <div className="mb-4">
                                <h3 className="text-xl font-black text-[#333] font-oswald uppercase mb-2 tracking-tight">
                                    {tier.title}
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl md:text-5xl font-black text-[#00529B] font-oswald">${tier.amount}</span>
                                    <span className="text-gray-500 font-bold font-outfit">{tier.period}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 font-outfit mb-4 leading-relaxed">
                                {tier.description}
                            </p>

                            <ul className="space-y-4 mb-6">
                                {tier.features.map((feature: string, i: number) => (
                                    <li key={i} className="flex gap-3 items-start font-outfit text-sm font-bold text-[#333]">
                                        <Check className="w-5 h-5 text-[#009bba] flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-4">
                                <button className={`w-full py-4 rounded-[4px] font-black font-outfit text-sm uppercase tracking-widest transition-all ${tier.popular
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
