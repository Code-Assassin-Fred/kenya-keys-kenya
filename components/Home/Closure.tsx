"use client"

import { motion } from 'framer-motion';

export default function Closure() {
    return (
        <section className="relative bg-black">
            <div className="relative w-full h-screen overflow-hidden rounded-tl-3xl rounded-tr-[120px] md:rounded-tr-[240px]">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('/image5.png')`,
                    }}
                />

                {/* Deeper, cinematic dark overlay similar to Hero */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/60 to-black/95" />

                {/* Content Overlay */}
                <div className="relative z-10 flex items-center justify-center h-full px-8 md:px-16">
                    <div className="max-w-4xl text-center">
                        {/* Conversational Text */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-white text-2xl md:text-3xl lg:text-4xl font-outfit font-medium leading-relaxed mb-8"
                        >
                            We're more than just an organization—we're a community dedicated to opening doors. It's about giving every student the tools they need to build their own success story. Together, we're making sure that no dream goes unfulfilled, one student at a time.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <button className="bg-white text-black font-bold font-outfit px-10 py-4 rounded-full hover:bg-yellow-400 transition-all uppercase tracking-wider shadow-xl transform hover:-translate-y-1">
                                Join Our Story
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
