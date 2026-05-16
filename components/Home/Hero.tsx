'use client';

import React from 'react';
import { motion } from "framer-motion";

const CountUp = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
    const [count, setCount] = React.useState(0);
    const [isInView, setIsInView] = React.useState(false);

    React.useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isInView]);

    return (
        <motion.span
            onViewportEnter={() => setIsInView(true)}
            className="text-4xl md:text-5xl font-extrabold text-black font-outfit"
        >
            {count}{suffix}
        </motion.span>
    );
};

export default function Hero() {
    // Variants for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    } as const;

    const headlineLines = [
        "Empowering Rural",
        "Kenya Through",
        "Education"
    ];

    return (
        <section id="home" className="relative md:h-[600px] w-full flex items-center bg-white overflow-hidden">
            {/* SVG ClipPath Definition */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <clipPath id="heroCurve" clipPathUnits="objectBoundingBox">
                        <path d="M 0,0 L 0.4,0 C 0.6,0.02 0.8,0.3 0.8,0.6 C 0.8,0.8 0.8,1 0.8,1 L 0,1 Z" />
                    </clipPath>
                    <clipPath id="blueCurve" clipPathUnits="objectBoundingBox">
                        <path d="M 0,0 L 0.55,0 C 0.8,0.02 1,0.35 1,0.7 C 1,0.9 1,1 1,1 L 0,1 Z" />
                    </clipPath>
                </defs>
            </svg>

            {/* Split Layout Container */}
            <div className="flex flex-col md:flex-row w-full h-full">

                {/* Left Side: Curved Image Layers */}
                <div className="relative w-full md:w-[55%] h-[400px] md:h-full">
                    {/* Light Blue Background Shape */}
                    <div
                        className="absolute inset-0 bg-[#F0F7FF] z-0"
                        style={{
                            clipPath: "url(#blueCurve)",
                        }}
                    />

                    {/* Hero Image */}
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10"
                        style={{
                            backgroundImage: "url('/hero.png')",
                            clipPath: "url(#heroCurve)",
                        }}
                    >

                    </motion.div>
                </div>
                {/* Right Side: Content - Overlapping the blue area */}
                <div className="w-full md:w-[50%] flex items-start justify-start px-6 md:pl-10 pt-10 md:pt-16 pb-12 md:pb-0 z-20 md:-ml-[6%]">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-3xl text-left"
                    >
                        <motion.h1
                            variants={itemVariants}
                            className="text-2xl md:text-[32px] lg:text-[40px] font-[900] text-[#001D4A] tracking-[-0.01em] font-oswald uppercase leading-[1.1] mb-8"
                        >
                            Empowering Rural Kenya Through Education
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed font-outfit max-w-sm"
                        >
                            Kenya Keys provides essential resources and sponsorships to unlock the potential of students in underserved communities. Join us in building a future where every child has the opportunity to lead and thrive.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 font-oswald"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-[#00529B] text-white px-10 py-4 rounded-md font-bold text-lg uppercase tracking-wider hover:bg-[#003d75] transition-colors cursor-pointer"
                            >
                                Sponsor a Student
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="border-2 border-[#00529B] text-[#00529B] px-10 py-4 rounded-md font-bold text-lg uppercase tracking-wider hover:bg-[#00529B] hover:text-white transition-all cursor-pointer"
                            >
                                Donate Now
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}