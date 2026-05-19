'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InterestModal from '@/components/shared/InterestModal';

export default function ImpactCalculator() {
    const [amount, setAmount] = useState(65);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="py-16 md:py-20 bg-white text-[#333] overflow-hidden relative border-b border-gray-100">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    {/* Left: Input Control */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-2xl md:text-4xl font-black font-oswald uppercase tracking-tight mb-6 text-[#333]">
                                SELECT <span className="text-[#00529B]">CUSTOM AMOUNT</span>
                            </h2>
                            <p className="text-base text-gray-600 font-outfit mb-8 font-light">
                                Adjust the slider to choose your contribution amount.
                            </p>

                            <div className="bg-gray-50/80 p-6 md:p-8 rounded-[30px] border border-gray-100 shadow-sm">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-xs font-black uppercase tracking-widest text-[#00529B] font-outfit">My Contribution</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black font-oswald text-[#00529B]">${amount}</span>
                                        <span className="text-gray-500 font-bold font-outfit uppercase tracking-wider text-[10px]">/ month</span>
                                    </div>
                                </div>

                                <input 
                                    type="range" 
                                    min="10" 
                                    max="1000" 
                                    step="10"
                                    value={amount}
                                    onChange={(e) => setAmount(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00529B] mb-4"
                                />

                                <div className="grid grid-cols-4 text-[10px] font-black uppercase tracking-tighter text-gray-400 font-outfit mb-6">
                                    <span>$10</span>
                                    <span className="text-center">$250</span>
                                    <span className="text-center">$500</span>
                                    <span className="text-right">$1000</span>
                                </div>

                                <button 
                                    onClick={() => setIsModalOpen(true)}
                                    className="block w-full py-4 bg-[#FFB800] text-[#1D366D] hover:bg-[#e0a100] text-center font-black font-outfit uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-all shadow-lg cursor-pointer"
                                >
                                    Sponsor with this amount
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Static Text & Inspiration */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <div className="text-6xl mb-2 text-[#00529B] font-serif leading-none">“</div>
                        <h3 className="text-xl md:text-2xl font-bold font-outfit text-gray-700 leading-relaxed italic">
                            With your support, we are not only acquiring an education, we are gaining the power to shape our own futures and uplift our communities.
                        </h3>
                    </div>
                </div>
            </div>

            <InterestModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                type="donation"
                targetName={`Custom Amount: $${amount}`}
            />
        </section>
    );
}
