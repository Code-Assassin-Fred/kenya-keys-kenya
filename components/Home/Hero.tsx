'use client';

import { motion } from "framer-motion";
import Navbar from "./Navbar";

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
        <section id="home" className="relative h-[500px] md:h-[600px] w-full overflow-hidden flex items-center">
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

            {/* Darker Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />

            {/* Navbar stays on top */}
            <div className="absolute top-0 left-0 w-full z-50">
                <Navbar />
            </div>

            {/* Hero Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 w-full px-4 max-w-6xl mx-auto text-center"
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
                        className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all active:scale-95 cursor-pointer"
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
                        className="border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold text-lg hover:border-orange-500 transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
                    >
                        Donate Now
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Subtle Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            >
                <span className="text-white/40 text-[10px] font-outfit uppercase tracking-[0.2em]">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-orange-500/50 to-transparent" />
            </motion.div>
        </section>
    );
}