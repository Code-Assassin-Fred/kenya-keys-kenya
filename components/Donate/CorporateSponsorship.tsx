'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Target, Globe } from 'lucide-react';

const benefits = [
    {
        icon: <Target className="w-10 h-10" />,
        title: "Aligned Social Impact",
        description: "Focus your CSR efforts on education—the most direct and effective path to long-term community development."
    },
    {
        icon: <Users className="w-10 h-10" />,
        title: "Employee Engagement",
        description: "Boost morale and retention through matching programs, volunteer opportunities, and shared impact stories."
    },
    {
        icon: <Globe className="w-10 h-10" />,
        title: "Global Citizenship",
        description: "Demonstrate your commitment to the UN Sustainable Development Goals, specifically Quality Education (SDG 4)."
    },
    {
        icon: <Building2 className="w-10 h-10" />,
        title: "Brand Recognition",
        description: "Gain visibility through mentions in our newsletter, annual reports, and on our donor wall."
    }
];

export default function CorporateSponsorship() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                {/* Intro Section */}
                <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase leading-none mb-8 tracking-tight">
                                PARTNER WITH <br />
                                <span className="text-[#00529B]">IMPACT</span>
                            </h2>
                            <p className="text-xl text-gray-700 font-outfit leading-relaxed mb-8">
                                Kenya Keys partners with organizations that believe in the transformative power of education. Together, we can create educational opportunities for thousands of students in rural Kenya.
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start border-l-4 border-[#FFB800] pl-6 py-2">
                                    <p className="text-lg font-bold font-outfit text-[#333]">
                                        \"Partnering with Kenya Keys has been the most fulfilling aspect of our company's charitable mission. We don't just see numbers; we see lives transformed.\"
                                    </p>
                                </div>
                                <p className="text-sm font-black uppercase tracking-widest text-[#00529B] font-outfit ml-10">
                                    — Corporate Partner CEO
                                </p>
                            </div>
                        </motion.div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl"
                        >
                            <img src="/image14.png" alt="Corporate Impact" className="object-cover w-full h-full" />
                            <div className="absolute inset-0 bg-[#00529B]/20" />
                        </motion.div>
                    </div>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    {benefits.map((benefit, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="bg-gray-50 p-10 rounded-3xl group hover:bg-[#00529B] transition-all duration-500"
                        >
                            <div className="text-[#00529B] mb-8 group-hover:text-white transition-colors duration-500">
                                {benefit.icon}
                            </div>
                            <h3 className="text-2xl font-black text-[#333] font-oswald uppercase mb-4 tracking-tight group-hover:text-white transition-colors duration-500">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600 font-outfit group-hover:text-white/80 transition-colors duration-500">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Box */}
                <div className="bg-[#1D366D] rounded-[40px] p-12 text-white relative overflow-hidden">
                    <div className="relative z-10 text-center max-w-3xl mx-auto">
                        <h3 className="text-3xl md:text-5xl font-black font-oswald uppercase mb-6 tracking-tight">Ready to start a partnership?</h3>
                        <p className="text-xl text-blue-100 font-outfit mb-10 font-light">
                            Our team can design a sponsorship package that fits your organization's goals and budget.
                        </p>
                        <a 
                            href="mailto:info@kenyakeys.org?subject=Corporate Partnership Inquiry"
                            className="inline-block bg-[#FFB800] text-[#1D366D] px-12 py-5 rounded-full font-black font-outfit uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl"
                        >
                            Contact Partnerships Team
                        </a>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/5 rounded-full" />
                    <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/5 rounded-full" />
                </div>
            </div>
        </section>
    );
}
