'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const impacts = [
    { threshold: 0, text: "buys a full set of notebooks and pens for one student.", icon: "📝" },
    { threshold: 25, text: "covers a student's uniform and shoes for the entire year.", icon: "👟" },
    { threshold: 50, text: "provides daily nutritious lunch for one student for an entire term.", icon: "🥣" },
    { threshold: 100, text: "covers secondary school tuition for one student for a full year.", icon: "🎓" },
    { threshold: 250, text: "fully supports a student's tuition, board, and supplies for a year.", icon: "🌟" },
    { threshold: 500, text: "funds 2 university students' living stipends for a semester.", icon: "🏛️" },
    { threshold: 1000, text: "sponsors a local leadership workshop for 50 student alumni.", icon: "🤝" }
];

export default function ImpactCalculator() {
    const [amount, setAmount] = useState(65);
    const [currentImpact, setCurrentImpact] = useState(impacts[2]);

    useEffect(() => {
        const matchingImpact = [...impacts].reverse().find(i => amount >= i.threshold) || impacts[0];
        setCurrentImpact(matchingImpact);
    }, [amount]);

    return (
        <section className="py-24 bg-[#1D366D] text-white overflow-hidden relative">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                    {/* Left: Input Control */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-black font-oswald uppercase tracking-tight mb-8">
                                See Your <span className="text-[#FFB800]">Impact</span>
                            </h2>
                            <p className="text-xl text-blue-100 font-outfit mb-12 font-light">
                                Adjust the slider to see how your contribution changes the life of a student in rural Kenya.
                            </p>

                            <div className="bg-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-md border border-white/20">
                                <div className="flex justify-between items-end mb-8">
                                    <span className="text-sm font-black uppercase tracking-widest text-[#FFB800] font-outfit">My Contribution</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black font-oswald">${amount}</span>
                                        <span className="text-blue-200 font-bold font-outfit uppercase tracking-wider text-xs">/ month</span>
                                    </div>
                                </div>

                                <input 
                                    type="range" 
                                    min="10" 
                                    max="1000" 
                                    step="10"
                                    value={amount}
                                    onChange={(e) => setAmount(parseInt(e.target.value))}
                                    className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FFB800] mb-8"
                                />

                                <div className="grid grid-cols-4 text-[10px] font-black uppercase tracking-tighter text-blue-300 font-outfit">
                                    <span>$10</span>
                                    <span className="text-center">$250</span>
                                    <span className="text-center">$500</span>
                                    <span className="text-right">$1000</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Impact Display */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative h-[300px] flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentImpact.threshold}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 1.1, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-center"
                                >
                                    <div className="text-8xl mb-8 transform transition-transform duration-500 hover:scale-110">
                                        {currentImpact.icon}
                                    </div>
                                    <h3 className="text-2xl md:text-4xl font-bold font-outfit leading-snug">
                                        Your monthly gift <span className="text-[#FFB800]">{currentImpact.text}</span>
                                    </h3>
                                </motion.div>
                            </AnimatePresence>

                            {/* Background Circles */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FFB800] blur-[120px] opacity-10 z-0" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
