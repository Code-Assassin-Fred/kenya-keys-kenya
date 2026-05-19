'use client';

import React from 'react';
import { motion } from "framer-motion";

const CountUp = ({ end, duration = 2000, suffix = "" }: { end: number | string; duration?: number; suffix?: string }) => {
    const [count, setCount] = React.useState(0);
    const [isInView, setIsInView] = React.useState(false);

    // Extract numerical part if end is a string like "1,100"
    const numericEnd = typeof end === 'string' ? parseFloat(end.replace(/,/g, '')) : end;

    React.useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * numericEnd));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [numericEnd, duration, isInView]);

    const formattedCount = typeof end === 'string' && end.includes(',')
        ? count.toLocaleString()
        : count;

    return (
        <motion.span
            onViewportEnter={() => setIsInView(true)}
            className="text-4xl md:text-5xl font-black text-[#FFB800] font-oswald"
        >
            {formattedCount}{suffix}
        </motion.span>
    );
};

export default function ImpactStats() {
    return (
        <section className="relative w-full min-h-[500px] flex items-center overflow-hidden bg-[#1D366D]">
            {/* SVG Background Shapes */}
            <div className="hidden md:block absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none">
                    {/* Left Darker Blue Curve */}
                    <path
                        d="M0 0H750C600 0 500 300 450 600H0V0Z"
                        fill="#1D366D"
                    />
                    {/* Middle Blue Curve */}
                    <path
                        d="M750 0H1150C1000 0 900 300 850 600L450 600C500 300 600 0 750 0Z"
                        fill="#00529B"
                    />
                    {/* Right Lighter Blue */}
                    <path
                        d="M1150 0H1440V600L850 600C900 300 1000 0 1150 0Z"
                        fill="#0072CE"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left Side Content */}
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-3xl md:text-5xl font-bold text-white font-oswald uppercase leading-[1.1] mb-6 tracking-tight"
                        >
                            Unlocking potential <br />
                            through education <br />
                            in rural Kenya
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-base md:text-lg text-white font-outfit font-light max-w-sm leading-snug opacity-90"
                        >
                            Removing barriers to success by providing students with the resources they need to thrive.
                        </motion.p>
                    </div>

                    {/* Right Side Stats */}
                    <div className="flex flex-col gap-10 md:pl-20">
                        {/* Stat 1 */}
                        <div className="flex items-center gap-6">
                            <div className="min-w-[140px]">
                                <CountUp end="1,000" suffix="+" />
                            </div>
                            <p className="text-white font-outfit text-sm md:text-base font-bold uppercase leading-tight tracking-wide">
                                students sponsored for a <br /> brighter future
                            </p>
                        </div>

                        {/* Stat 2 */}
                        <div className="flex items-center gap-6">
                            <div className="min-w-[140px]">
                                <CountUp end={100} suffix="%" />
                            </div>
                            <p className="text-white font-outfit text-sm md:text-base font-bold uppercase leading-tight tracking-wide">
                                secondary school graduation <br /> rate since 2022
                            </p>
                        </div>

                        {/* Stat 3 */}
                        <div className="flex items-center gap-6">
                            <div className="min-w-[140px]">
                                <CountUp end="5,000" suffix="+" />
                            </div>
                            <p className="text-white font-outfit text-sm md:text-base font-bold uppercase leading-tight tracking-wide">
                                volunteer hours dedicated to <br /> student success
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
