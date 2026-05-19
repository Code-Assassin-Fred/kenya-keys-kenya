'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, GraduationCap } from 'lucide-react';

const tiers = [
    {
        title: 'High School',
        price: '450',
        period: 'yr',
        description: 'Covers essential tuition, academic fees, safety support, and foundational mentoring to unlock high school success.',
        features: [
            'Full Tuition & School Fees',
            'Safe Boarding & Healthy Meals',
            'Uniforms & Learning Supplies',
            'Peer Support Groups',
            'Foundational Career Mentoring'
        ],
        popular: false,
        color: '#00529B',
        accentBg: 'bg-blue-50'
    },
    {
        title: 'Middle College',
        price: '750',
        period: 'yr',
        description: 'Sponsors practical technical, vocational, or diploma pathways that directly map to employment opportunities.',
        features: [
            'Vocational / Diploma Tuition',
            'Specialized Lab & Practical Tools',
            'Internship Search Assistance',
            'Job Placement Support',
            'Professional Mentorship'
        ],
        popular: true,
        color: '#FFB800',
        accentBg: 'bg-[#fffbeb]'
    },
    {
        title: 'Universities',
        price: '1,000',
        period: 'yr',
        description: 'Empowers top-performing students to pursue full undergraduate degree programs at Kenyan national universities.',
        features: [
            'University Tuition & Fees',
            'Research & Academic Supplies',
            'Professional Networking Events',
            'Leadership Training Academy',
            'Community Service Internships'
        ],
        popular: false,
        color: '#0D9488',
        accentBg: 'bg-teal-50'
    }
];

export default function ScholarshipsSection() {
    return (
        <section id="sponsorships" className="py-24 bg-white scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                {/* Title Block */}
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <span className="text-[#00529B] font-black tracking-[0.2em] uppercase text-xs mb-3 block font-outfit">
                            01. Education Pathway
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase tracking-tight leading-none">
                            STUDENT SCHOLARSHIPS & <span className="text-[#00529B]">SPONSORSHIPS</span>
                        </h2>
                    </div>
                    <p className="text-lg text-gray-600 font-outfit max-w-md">
                        Since 2005, Kenya Keys has paired students with international sponsors. Sponsorship provides stability, removes financial burdens, and creates future community leaders.
                    </p>
                </div>

                {/* Tiers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {tiers.map((tier, idx) => (
                        <motion.div
                            key={tier.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative rounded-3xl border p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ${
                                tier.popular 
                                ? 'border-[#FFB800] shadow-xl md:-translate-y-4 bg-white' 
                                : 'border-gray-100 bg-white shadow-md'
                            }`}
                        >
                            {tier.popular && (
                                <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#FFB800] text-[#333] text-xs font-black tracking-widest px-4 py-1.5 rounded-full uppercase font-outfit">
                                    Highly Impactful
                                </span>
                            )}
                            
                            <div>
                                <h3 className="text-2xl font-black font-oswald text-[#333] uppercase mb-4 tracking-tight">
                                    {tier.title}
                                </h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-3xl font-black font-outfit text-gray-400">$</span>
                                    <span className="text-6xl font-black font-outfit text-[#333] tracking-tight">{tier.price}</span>
                                    <span className="text-gray-500 font-outfit text-sm">/{tier.period}</span>
                                </div>
                                <p className="text-gray-600 font-outfit text-sm leading-relaxed mb-8 border-b border-gray-100 pb-6">
                                    {tier.description}
                                </p>
                                <ul className="space-y-4 mb-8">
                                    {tier.features.map((feat) => (
                                        <li key={feat} className="flex items-start gap-3">
                                            <div className={`p-0.5 rounded-full shrink-0 ${tier.popular ? 'bg-[#FFB800]/20 text-[#D97706]' : 'bg-[#00529B]/10 text-[#00529B]'}`}>
                                                <Check className="w-4 h-4" />
                                            </div>
                                            <span className="text-gray-700 font-outfit text-sm font-semibold">{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <a
                                href={`mailto:joseph@kenyakeyspbo-kenya.org?subject=Inquiry: Sponsoring a ${tier.title} Student`}
                                style={{ backgroundColor: tier.popular ? '#FFB800' : '#00529B' }}
                                className={`w-full py-4 text-center rounded-xl font-bold font-outfit uppercase tracking-wider text-sm transition-all duration-300 hover:opacity-95 shadow-md flex items-center justify-center gap-2 ${
                                    tier.popular ? 'text-[#333]' : 'text-white'
                                }`}
                            >
                                <GraduationCap className="w-5 h-5" />
                                Sponsor Now
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Callout */}
                <div className="bg-blue-50/50 border border-blue-100/50 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white text-[#00529B] rounded-2xl shadow-sm shrink-0">
                            <GraduationCap className="w-8 h-8" />
                        </div>
                        <div>
                            <h4 className="font-black text-lg text-[#333] uppercase font-oswald tracking-tight">Need custom sponsorship options?</h4>
                            <p className="text-gray-600 font-outfit text-sm mt-0.5">We also support vocational certificates, career placements, and group sponsorship models.</p>
                        </div>
                    </div>
                    <a
                        href="/donate"
                        className="bg-[#00529B] text-white font-black font-outfit px-8 py-3.5 rounded-xl hover:bg-[#003d75] transition-all uppercase tracking-wider text-sm shadow-md"
                    >
                        General Donation
                    </a>
                </div>
            </div>
        </section>
    );
}
