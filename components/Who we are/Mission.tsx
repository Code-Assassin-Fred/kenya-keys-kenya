'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Mission() {
    return (
        <section id="mission" className="relative py-32 bg-[#F8FAFC] overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00529B]/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#009bba]/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[#00529B] font-black text-sm uppercase tracking-[0.3em] font-outfit mb-6">
                            Our Mission
                        </h2>
                        
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] font-oswald uppercase leading-[1.1] mb-8 tracking-tight">
                            Unlocking <span className="text-[#009bba]">Potential</span> Through <span className="relative inline-block">
                                Education
                                <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#FFB800]/30 rounded-full" />
                            </span>
                        </h3>
                        
                        <div className="space-y-8">
                            <p className="text-xl md:text-2xl text-gray-700 font-outfit leading-relaxed font-light">
                                Kenya Keys is a <span className="font-bold text-[#333]">grassroots organization</span> dedicated to unlocking the potential of bright, motivated students in rural Kenya through education and holistic support.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10">
                                <div className="space-y-2">
                                    <p className="text-sm font-bold text-[#00529B] uppercase tracking-widest italic">Our Educational Promise</p>
                                    <p className="text-lg text-gray-800 font-medium leading-relaxed">Providing direct access to quality education by removing financial barriers for every sponsored student.</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-bold text-[#009bba] uppercase tracking-widest italic">Our Academic Focus</p>
                                    <p className="text-lg text-gray-800 font-medium leading-relaxed">Fostering a culture of excellence and empowering students to become the next generation of Kenyan leaders.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
