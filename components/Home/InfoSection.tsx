'use client';

import { motion } from "framer-motion";
import Image from "next/image";

export default function InfoSection() {
    return (
        <section className="relative py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 md:px-24 flex flex-col md:flex-row items-center gap-16 md:gap-24">

                {/* Left Column - Visuals */}
                <div className="w-full md:w-1/2 relative flex justify-center items-center">
                    {/* Retro Sun Graphic */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full z-0"
                        style={{
                            background: `linear-gradient(to bottom, #fbbf24, #f97316)`,
                            maskImage: `repeating-linear-gradient(to bottom, black 0px, black 20px, transparent 20px, transparent 28px)`
                        }}
                    />

                    {/* Student Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative z-10"
                    >
                        <div className="relative w-[300px] h-[400px] md:w-[380px] md:h-[500px]">
                            <Image
                                src="/vision.png"
                                alt="Vision for Kenya"
                                fill
                                className="object-cover object-top drop-shadow-2xl rounded-b-full md:rounded-none grayscale"
                                style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Right Column - Content */}
                <div className="w-full md:w-1/2 text-left z-10">
                    <motion.h2
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 leading-tight mb-4"
                    >
                        THE <span className="relative inline-block text-gray-900">
                            FUTURE
                            {/* Hand-drawn oval */}
                            <svg className="absolute -inset-2 w-[120%] h-[120%] text-yellow-400 -z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M5,50 Q25,5 50,5 T95,50 Q75,95 50,95 T5,50" fill="none" stroke="currentColor" strokeWidth="3" />
                            </svg>
                        </span> OF KENYA
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-orange-600 font-outfit font-bold uppercase tracking-widest text-sm mb-8"
                    >
                        Illuminating vision for every kid
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <p className="font-outfit text-lg font-bold text-gray-800">
                            Kenya Keys is an educational NGO founded by the community—focused on providing great education, good vibes, student success, and a love for the future.
                        </p>

                        <p className="font-outfit text-gray-600 leading-relaxed">
                            We source the best local resources from <span className="font-bold text-gray-900 border-b-2 border-yellow-400">Taru, Kenya</span> and beyond, crafting <span className="font-bold text-gray-900">scholars</span> and <span className="font-bold text-gray-900">leaders</span> that bring the nation's energy to every sector.
                        </p>

                        <button className="group mt-4 bg-yellow-400 text-black font-bold font-outfit px-8 py-4 rounded-full flex items-center gap-3 hover:bg-yellow-500 transition-all uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Learn More
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
