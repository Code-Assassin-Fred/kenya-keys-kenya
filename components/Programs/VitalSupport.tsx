'use client';

import React from 'react';
import { motion } from "framer-motion";
import { ShieldCheck, HeartPulse, GraduationCap } from "lucide-react";

const services = [
    {
        icon: <ShieldCheck className="w-10 h-10" />,
        title: "Hope Springs (Girls)",
        description: "Empowers girls to find help in abusive situations, avoid early marriages, and gain entrepreneurial skills.",
        color: "bg-[#00529B]"
    },
    {
        icon: <HeartPulse className="w-10 h-10" />,
        title: "Save Our Sisters",
        description: "Focuses on preventing violence and pregnancy through education for both parents and young girls.",
        color: "bg-[#009bba]"
    },
    {
        icon: <Users className="w-10 h-10" />,
        title: "Save Our Brothers",
        description: "A garden-based initiative where boys grow vegetables to fund their own basic necessities like soap and travel.",
        color: "bg-[#FFB800]"
    }
];

import { Users } from "lucide-react";

export default function VitalSupport() {
    return (
        <section id="support" className="py-24 bg-blue-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase leading-none mb-6 tracking-tight">
                        VITAL <span className="text-[#00529B]">SUPPORT</span>
                    </h2>
                    <p className="text-xl text-gray-600 font-outfit max-w-2xl mx-auto">
                        Success requires so much more than school fees. We provide the essential items and emotional support students need to stay in school.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="bg-white p-10 rounded-2xl shadow-md border-b-8 border-transparent hover:border-[#00529B] transition-all group"
                        >
                            <div className={`w-20 h-20 ${service.color} text-white rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg transform group-hover:scale-110 transition-transform`}>
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-black text-[#333] font-oswald uppercase mb-4 tracking-tight text-center">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 font-outfit text-center leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
