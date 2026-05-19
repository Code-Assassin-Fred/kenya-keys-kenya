'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const valuesData = [
    {
        title: "Integrity",
        description: "We uphold the highest ethical standards in all our actions, ensuring that our work is guided by honesty, fairness, and a deep commitment to our mission of empowering students in rural Kenya."
    },
    {
        title: "Transparency and accountability",
        description: "We are committed to openness in our operations and financial practices, taking full responsibility for the trust placed in us by our donors, partners, and the communities we serve."
    },
    {
        title: "Equality and Inclusion",
        description: "We believe every student deserves a chance to succeed. We actively work to break down barriers and foster an environment where all individuals are valued and supported, regardless of their background."
    },
    {
        title: "Collaboration",
        description: "We recognize that lasting impact is achieved together. We build strong, cooperative relationships with local communities, schools, and global partners to create sustainable educational solutions."
    },
    {
        title: "Respect and compassion",
        description: "We approach our work with empathy and a profound respect for the dignity and potential of every individual, prioritizing the well-being and holistic development of our students."
    }
];

export default function CoreValues() {
    // Set the first item (index 0) to be expanded by default
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="core-values" className="bg-white py-16 md:py-24 border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <span className="text-[#00529B] font-black tracking-[0.2em] uppercase text-xs mb-3 block font-outfit">
                        Principles
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase tracking-tight leading-none">
                        CORE <span className="text-[#00529B]">VALUES</span>
                    </h2>
                </div>

                <div className="max-w-3xl mx-auto flex flex-col">
                    {valuesData.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div key={idx} className="border-b border-gray-200">
                                <button
                                    onClick={() => toggle(idx)}
                                    className="w-full flex items-center justify-between py-6 text-left group transition-colors"
                                >
                                    <span className={`text-xl md:text-2xl font-outfit transition-colors ${isOpen ? 'text-[#00b2d6]' : 'text-gray-700 group-hover:text-[#00b2d6]'}`}>
                                        {item.title}
                                    </span>
                                    <div className="ml-4 shrink-0 flex items-center justify-center">
                                        {isOpen ? (
                                            <X className="w-6 h-6 text-[#00b2d6]" strokeWidth={1.5} />
                                        ) : (
                                            <Plus className="w-6 h-6 text-gray-500 group-hover:text-[#00b2d6] transition-colors" strokeWidth={1.5} />
                                        )}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-8 pr-12">
                                                <p className="text-gray-600 font-outfit text-[17px] leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
