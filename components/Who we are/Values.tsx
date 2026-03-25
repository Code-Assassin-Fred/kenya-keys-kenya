'use client';

import React from 'react';
import { motion } from "framer-motion";
import { BookOpen, Users, Lightbulb, Heart, Globe } from "lucide-react";

const values = [
    {
        icon: <BookOpen className="w-8 h-8" />,
        title: "Education as a Tool",
        description: "Education is the most valuable tool we can use against poverty, providing the foundation for sustainable change."
    },
    {
        icon: <Users className="w-8 h-8" />,
        title: "Local Leadership",
        description: "Local leadership and their teams drive essential decisions, giving the community crucial ownership and accountability."
    },
    {
        icon: <Lightbulb className="w-8 h-8" />,
        title: "Opportunity Over Handouts",
        description: "Opportunity fosters growth. We focus on empowerment rather than handouts that increase dependency."
    },
    {
        icon: <Globe className="w-8 h-8" />,
        title: "Cultural Exchange",
        description: "Cultural exchange and exposure are vitally enriching for everyone involved, fostering global citizenship."
    }
];

export default function Values() {
    return (
        <section id="values" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase leading-none mb-4 tracking-tight">
                        OUR <span className="text-[#00529B]">VALUES</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-[#FFB800] mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
                        >
                            <div className="w-16 h-16 bg-blue-50 text-[#00529B] rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-[#00529B] group-hover:text-white transition-colors">
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-black text-[#333] font-oswald uppercase mb-4 tracking-tight">
                                {value.title}
                            </h3>
                            <p className="text-gray-600 font-outfit text-base leading-relaxed">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
