'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, UserCheck, CreditCard, ClipboardCheck, MailOpen } from 'lucide-react';

const steps = [
    {
        icon: <Search className="w-8 h-8" />,
        title: "Find a Student",
        description: "Browse our student catalog and read about the bright minds waiting for an opportunity to continue their education."
    },
    {
        icon: <UserCheck className="w-8 h-8" />,
        title: "Choose Your Match",
        description: "Select the student you feel more connected to and pledge your support for their secondary or university education."
    },
    {
        icon: <CreditCard className="w-8 h-8" />,
        title: "Pledge and Give",
        description: "Choose a monthly sponsorship level that covers tuition, board, supplies, and more. Set up automatic giving for stability."
    },
    {
        icon: <ClipboardCheck className="w-8 h-8" />,
        title: "Receive Reports",
        description: "Get regular progress reports with grades and teacher comments twice a year, ensuring you stay connected to their success."
    },
    {
        icon: <MailOpen className="w-8 h-8" />,
        title: "Write and Connect",
        description: "Exchange letters with your student and even have the opportunity to join our local community events to meet them in person."
    }
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase tracking-tight mb-6">
                        The Sponsorship <span className="text-[#00529B]">Journey</span>
                    </h2>
                    <p className="text-xl text-gray-600 font-outfit max-w-2xl mx-auto font-light">
                        Our sponsorship model focuses on long-term sustainability and deep personal connection. Here's how the process works from start to finish.
                    </p>
                </div>

                <div className="relative">
                    {/* Background Line (Vertical on mobile, horizontal on desktop) */}
                    <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 -translate-x-1/2 z-0 hidden md:block" />

                    <div className="space-y-16 md:space-y-32">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: idx * 0.1 }}
                                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-24 z-10 ${
                                    idx % 2 !== 0 ? 'md:flex-row-reverse' : ''
                                }`}
                            >
                                {/* Circle Icon */}
                                <div className="flex-shrink-0 w-20 h-20 bg-[#00529B] text-white rounded-full flex items-center justify-center border-[8px] border-white shadow-xl relative z-20">
                                    {step.icon}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FFB800] text-[#1D366D] rounded-full flex items-center justify-center font-black text-xs">
                                        0{idx + 1}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`flex-1 text-center ${idx % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <h3 className="text-2xl md:text-3xl font-black text-[#333] font-oswald uppercase mb-4 tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-lg text-gray-600 font-outfit leading-relaxed max-w-lg mx-auto md:mx-0">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Spacer for visual balance on desktop */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Final CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-32 text-center"
                >
                    <a 
                        href="/student-catalog"
                        className="inline-block bg-[#00529B] text-white px-12 py-5 rounded-full font-black font-outfit uppercase tracking-widest text-sm hover:bg-[#003d75] transition-all shadow-xl scale-110"
                    >
                        Browse Students Now
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
