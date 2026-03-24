'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Confetti = ({ color, style, delay = 0 }: { color: string; style: React.CSSProperties; delay?: number }) => (
    <motion.div
        initial={{ y: -20, opacity: 0, rotate: 0 }}
        animate={{ 
            y: [0, 10, 0], 
            opacity: [0.7, 1, 0.7],
            rotate: [0, 15, -15, 0]
        }}
        transition={{ 
            duration: 3 + Math.random() * 2, 
            repeat: Infinity, 
            delay,
            ease: "easeInOut" 
        }}
        className="absolute z-10 w-2 h-2 md:w-3 md:h-3"
        style={{ ...style, backgroundColor: color }}
    />
);

const TriangleConfetti = ({ color, style, delay = 0 }: { color: string; style: React.CSSProperties; delay?: number }) => (
    <motion.div
        initial={{ y: -20, opacity: 0, rotate: 0 }}
        animate={{ 
            y: [0, 15, 0], 
            opacity: [0.7, 1, 0.7],
            rotate: [0, 45, -45, 0]
        }}
        transition={{ 
            duration: 4 + Math.random() * 2, 
            repeat: Infinity, 
            delay,
            ease: "easeInOut" 
        }}
        className="absolute z-10"
        style={{ 
            ...style,
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: `10px solid ${color}`,
        }}
    />
);

export default function AnniversaryBanner() {
    return (
        <section className="relative w-full max-w-[1100px] mx-auto px-4 md:px-0 py-16 overflow-visible">
            {/* Main Container - Now just a wrapper, not the background provider */}
            <div className="relative flex flex-col md:flex-row min-h-[380px] md:min-h-[420px]">
                
                {/* Background Layer with Deep Blue and Patterns */}
                <div className="absolute inset-y-0 left-0 w-full md:w-[55%] bg-[#1D366D] overflow-hidden z-0">
                    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="3" cy="3" r="1.5" fill="#0072CE" />
                            </pattern>
                            <pattern id="linePattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                                <rect width="2" height="40" fill="#00529B" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#linePattern)" />
                        <rect width="100%" height="100%" fill="url(#dotPattern)" />
                    </svg>
                </div>

                {/* Left Side Content */}
                <div className="relative w-full md:w-[55%] p-8 md:p-14 flex flex-col justify-center items-start z-20">
                    <motion.div
                        initial={{ x: -40, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-4">
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" fill="#FFD700" stroke="white" strokeWidth="1" />
                            </svg>
                        </div>
                        <h2 className="text-3xl md:text-[44px] font-bold font-playfair text-white leading-[1.15] mb-4">
                            Kiron at 10 – <br />
                            Celebrating a <br />
                            decade of impact
                        </h2>
                        <p className="text-base md:text-lg font-outfit text-white opacity-90 mb-8 max-w-sm">
                            Join our <strong>10-year celebration</strong> by exploring our story, spreading the word, and giving in honor of this milestone.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <button className="bg-white text-[#001D4A] px-6 py-3.5 rounded-full font-bold font-outfit text-sm md:text-base hover:bg-opacity-90 transition-all cursor-pointer whitespace-nowrap shadow-lg">
                                Discover our anniversary story
                            </button>
                            <button className="border-2 border-white text-white px-6 py-3.5 rounded-full font-bold font-outfit text-sm md:text-base hover:bg-white hover:text-[#001D4A] transition-all cursor-pointer whitespace-nowrap">
                                Start learning
                            </button>
                        </div>
                    </motion.div>

                    {/* Cookie Icon in Corner */}
                    <div className="absolute bottom-4 left-4 opacity-50">
                        <svg width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="45" fill="#f4f4f4" stroke="white" strokeWidth="2" />
                            <circle cx="35" cy="35" r="5" fill="#5D4037" />
                            <circle cx="65" cy="40" r="4" fill="#5D4037" />
                            <circle cx="50" cy="65" r="6" fill="#5D4037" />
                            <circle cx="70" cy="60" r="5" fill="#5D4037" />
                            <circle cx="30" cy="65" r="4" fill="#5D4037" />
                            <circle cx="55" cy="20" r="3" fill="#5D4037" />
                        </svg>
                    </div>
                </div>

                {/* Right Side Image with Protrusion */}
                <div className="relative w-full md:w-[45%] mt-8 md:mt-0">
                    <div className="absolute top-[-30px] bottom-[-30px] left-0 right-0 bg-black p-2 overflow-hidden z-10">
                        <div className="relative w-full h-full overflow-hidden">
                            {/* Floating Confetti over Image */}
                            <Confetti color="#40e0d0" style={{ top: '20%', left: '10%' }} delay={0.2} />
                            <Confetti color="#FF69B4" style={{ top: '40%', left: '15%' }} delay={0.5} />
                            <Confetti color="#FFD700" style={{ top: '15%', left: '30%' }} delay={0.8} />
                            <TriangleConfetti color="#40e0d0" style={{ top: '60%', left: '80%' }} delay={0.3} />
                            <TriangleConfetti color="#FF69B4" style={{ top: '30%', left: '70%' }} delay={1.1} />
                            <Confetti color="#0000FF" style={{ top: '75%', left: '60%' }} delay={0.1} />
                            <Confetti color="#40e0d0" style={{ top: '85%', left: '40%' }} delay={0.9} />
                            
                            <Image 
                                src="/image1.png"
                                alt="Kiron Celebration"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Flag Icon overlapping split */}
                        <div className="absolute bottom-6 left-0 -translate-x-1/2 z-30">
                            <div className="relative w-14 h-20 md:w-16 md:h-24">
                                <motion.div 
                                    animate={{ rotate: [-2, 2, -2] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <svg width="100%" height="100%" viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 0V140M10 10L90 40L10 70Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M10 5L85 35L10 65V5Z" fill="#003594" />
                                        <text x="25" y="45" fill="white" fontSize="30" fontWeight="bold" fontFamily="serif">k</text>
                                    </svg>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
