'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const tiers = [
    {
        title: "Education Essential",
        amount: "35",
        period: "/month",
        description: "Covers the essential costs of books, uniforms, and mentorship for one student.",
        features: ["School Uniforms", "Core Textbooks", "Mentorship Access"],
        quote: "Having my own books for the first time made me feel like anything is possible.",
        student: "Asha, Form 2"
    },
    {
        title: "Full Sponsorship",
        amount: "65",
        period: "/month",
        description: "The gold standard: covers full tuition, room, and board for a high school student.",
        features: ["Full Tuition Fees", "Boarding & Meals", "Emergency Support", "Letter Exchange"],
        quote: "Sponsorship was the key that finally opened the door to my dream of being a nurse.",
        student: "Samuel, University Alumni",
        popular: true
    },
    {
        title: "University Path",
        amount: "150",
        period: "/month",
        description: "Empowers a student to pursue a university degree or advanced vocational training.",
        features: ["University Tuition", "Living Stipend", "Laptop Access", "Career Coaching"],
        quote: "Now I am building classrooms in my own village thanks to the path Kenya Keys gave me.",
        student: "Kennedy, Alumni"
    }
];

export default function DonationTiers() {
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
                    {tiers.map((tier, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className={`relative flex flex-col p-8 md:p-10 rounded-3xl border-2 transition-all hover:shadow-2xl ${
                                tier.popular ? 'border-[#00529B] bg-blue-50/30' : 'border-gray-100 bg-white'
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
                                {tier.features.map((feature, i) => (
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

                                <button className={`w-full py-4 rounded-full font-black font-outfit text-sm uppercase tracking-widest transition-all ${
                                    tier.popular 
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
