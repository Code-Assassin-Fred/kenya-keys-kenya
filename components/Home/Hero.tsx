'use client';

import React from 'react';
import { motion } from "framer-motion";
import Navbar from "./Navbar";

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
    };

    const headline = "Transform Lives Through Education";
    const words = headline.split(" ");

    return (
        <section id="home" className="relative h-[600px] md:h-[750px] w-full flex items-center z-30">
            {/* Background Wrapper with Overflow Hidden to contain Ken Burns scale */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Cinematic Ken Burns Background */}
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1.05, opacity: 1 }}
                    transition={{
                        scale: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" },
                        opacity: { duration: 1.5, ease: "easeOut" }
                    }}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/hero.png')",
                    }}
                />

                {/* Deeper, more cinematic dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/60 to-black/95" />
            </div>

            {/* Navbar stays on top */}
            <div className="absolute top-0 left-0 w-full z-50">
                <Navbar />
            </div>

            {/* Hero Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 w-full px-4 max-w-6xl mx-auto text-center pb-20 md:pb-32"
            >
                <motion.h1 className="text-3xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight font-playfair italic flex flex-wrap justify-center gap-x-3 gap-y-2 mb-6">
                    {words.map((word, i) => (
                        <motion.span
                            key={i}
                            variants={itemVariants}
                            className={word === "Through" || word === "Education" ? "text-orange-500 not-italic" : ""}
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed font-outfit font-light"
                >
                    Join us in empowering students in rural Kenya. Your support provides
                    more than just a scholarship; it opens a world of opportunity.
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-5 items-center justify-center font-outfit"
                >
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 20px 25px -5px rgba(249, 115, 22, 0.3), 0 10px 10px -5px rgba(249, 115, 22, 0.2)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold text-base hover:bg-orange-600 transition-all active:scale-95 cursor-pointer"
                    >
                        Sponsor a Student
                    </motion.button>
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(249, 115, 22, 1)",
                            borderColor: "rgba(249, 115, 22, 1)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="border-2 border-white/50 text-white px-6 py-3 rounded-full font-bold text-base hover:border-orange-500 transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
                    >
                        Donate Now
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Subtle Scroll Indicator - Hidden on Desktop to favor cards */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 md:hidden"
            >
                <span className="text-white/40 text-[10px] font-outfit uppercase tracking-[0.2em]">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-orange-500/50 to-transparent" />
            </motion.div>

            {/* Featured Cards Overlaying the Border with Metrics */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-6xl px-6 md:px-8 z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-14">
                    {[
                        {
                            value: 500,
                            suffix: "+",
                            title: "Students Sponsored",
                            description: "Active students currently pursuing their education dreams."
                        },
                        {
                            value: 15,
                            suffix: "+",
                            title: "Programs Live",
                            description: "From student support to community learning initiatives."
                        },
                        {
                            value: 200,
                            suffix: "+",
                            title: "Girls Empowered",
                            description: "Dedicated focus on young women in rural communities."
                        }
                    ].map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={
                                idx === 0 ? { opacity: 0, x: -100, rotate: -5 } :
                                    idx === 1 ? { opacity: 0, scale: 0.2, y: 100 } :
                                        { opacity: 0, x: 100, rotate: 5 }
                            }
                            whileInView={
                                idx === 1 ? { opacity: 1, scale: 1, y: 0 } :
                                    { opacity: 1, x: 0, rotate: 0 }
                            }
                            transition={{
                                duration: 1.2,
                                ease: [0.16, 1, 0.3, 1], // Custom cinematic easing
                                delay: idx * 0.2, // Sequential stagger
                                type: idx === 1 ? "spring" : "tween",
                                stiffness: idx === 1 ? 120 : undefined,
                                damping: idx === 1 ? 20 : undefined
                            }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="bg-white rounded-[16px] p-6 md:p-8 flex flex-col items-center text-center shadow-[0_12px_35px_-8px_rgba(0,0,0,0.12)] group hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] transition-all transform hover:-translate-y-1.5"
                        >
                            <div className="mb-3">
                                <CountUp end={card.value} suffix={card.suffix} />
                            </div>

                            <h3 className="text-sm md:text-base font-extrabold font-outfit text-gray-950 mb-2 tracking-tight leading-tight uppercase">
                                {card.title}
                            </h3>

                            <div className="w-10 h-[1.5px] bg-emerald-500 mb-4" />

                            <p className="text-gray-600 font-outfit text-[11px] md:text-xs leading-relaxed px-1 font-medium">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}