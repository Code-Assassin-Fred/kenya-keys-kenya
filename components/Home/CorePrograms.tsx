'use client';

import { motion } from "framer-motion";
import Image from "next/image";

const programs = [
    {
        id: 1,
        title: "Secondary School Sponsorship",
        description: "Empowering bright minds with the resources they need to complete their secondary education.",
        category: "Education",
        color: "text-emerald-600"
    },
    {
        id: 3,
        title: "Girls' Empowerment",
        description: "Breaking barriers for girls through mentorship, health education, and scholarship programs.",
        category: "Impact",
        color: "text-pink-600"
    },
    {
        id: 4,
        title: "College & Vocational",
        description: "Supporting transition to higher education or trade schools for career readiness.",
        category: "Education",
        color: "text-amber-600"
    },
    {
        id: 5,
        title: "Student Support Services",
        description: "Holistic support including tuition, uniforms, hygiene materials, and mentoring for high-potential students.",
        category: "Support",
        color: "text-violet-600"
    },
    {
        id: 6,
        title: "Learning Center / Library",
        description: "A state-of-the-art facility providing computer access, books, and a safe study environment for all.",
        category: "Facility",
        color: "text-cyan-600"
    }
];

export default function CorePrograms() {
    const doubledPrograms = [...programs, ...programs];

    return (
        <section className="relative bg-black">
            <div className="relative pt-28 md:pt-44 pb-20 md:pb-32 overflow-hidden rounded-bl-[120px] md:rounded-bl-[240px] bg-[#fcfcfc]">
                {/* Content Container */}
                <div className="relative z-10 px-6 md:px-16 lg:px-24">
                    <div className="max-w-7xl mx-auto mb-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col items-center text-center"
                        >
                            {/* <span className="text-orange-500 font-bold tracking-[0.3em] uppercase text-[9px] mb-3 font-outfit">
                                Our Initiatives
                            </span> */}
                            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-gray-950 leading-[1.1]">
                                Core Programs <span className="text-emerald-600 font-medium">for Change</span>
                            </h2>
                        </motion.div>
                    </div>

                    {/* Marquee Section with fade edges */}
                    <div className="relative mt-0 mb-24">
                        {/* Left fade */}
                        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #fcfcfc, transparent)' }} />
                        {/* Right fade */}
                        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #fcfcfc, transparent)' }} />

                        <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                duration: 60,
                                ease: "linear",
                                repeat: Infinity
                            }}
                            className="flex gap-10 md:gap-14 items-stretch py-8"
                        >
                            {doubledPrograms.map((program, idx) => (
                                <div
                                    key={`${program.id}-${idx}`}
                                    className="relative shrink-0 w-[300px] md:w-[400px] group"
                                >
                                    {/* The "Thick White Border" Frame */}
                                    <div className="absolute inset-0 bg-white rounded-[32px] shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_10px_30px_rgba(0,0,0,0.06)] z-0" />

                                    {/* Inner Content Area with substantial padding to create the "border" look */}
                                    <div className="relative z-10 m-[12px] bg-slate-50/50 rounded-[20px] p-5 h-full flex flex-col justify-center border border-white/50 min-h-[160px] md:min-h-[200px]">
                                        {/* Decorative "Screws" at the corners of the FRAME */}
                                        <div className="absolute -top-[6px] -left-[6px] w-1 h-1 rounded-full bg-gray-200" />
                                        <div className="absolute -top-[6px] -right-[6px] w-1 h-1 rounded-full bg-gray-200" />
                                        <div className="absolute -bottom-[6px] -left-[6px] w-1 h-1 rounded-full bg-gray-200" />
                                        <div className="absolute -bottom-[6px] -right-[6px] w-1 h-1 rounded-full bg-gray-200" />

                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-col gap-1">
                                                <span className={`text-[9px] font-bold font-outfit uppercase tracking-[0.2em] ${program.color}`}>
                                                    {program.category}
                                                </span>
                                                <h4 className="font-bold text-gray-950 font-playfair text-lg md:text-xl leading-tight">
                                                    {program.title}
                                                </h4>
                                            </div>

                                            <p className="text-gray-500 font-outfit text-xs md:text-sm leading-relaxed line-clamp-3">
                                                {program.description}
                                            </p>

                                            <div className="pt-3 border-t border-gray-100 flex items-center gap-2 group/btn cursor-pointer">
                                                <span className="text-[10px] font-bold font-outfit uppercase tracking-wider text-gray-400 group-hover/btn:text-gray-900 transition-colors">Learn More</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-300 group-hover/btn:text-gray-900 group-hover/btn:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Corner dots positioned relative to the outer container but visually on the "inner border" corners of the white frame */}
                                    <div className="absolute top-3 left-3 w-1 h-1 rounded-full bg-slate-200 z-20" />
                                    <div className="absolute top-3 right-3 w-1 h-1 rounded-full bg-slate-200 z-20" />
                                    <div className="absolute bottom-3 left-3 w-1 h-1 rounded-full bg-slate-200 z-20" />
                                    <div className="absolute bottom-3 right-3 w-1 h-1 rounded-full bg-slate-200 z-20" />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Merged Vision Section */}
                <div className="max-w-7xl mx-auto px-8 md:px-24 flex flex-col md:flex-row items-center gap-16 md:gap-24 relative z-10 pb-16">
                    {/* Left Column - Visuals */}
                    <div className="w-full md:w-1/2 relative flex justify-center items-center min-h-[400px] md:min-h-[600px]">
                        {/* Retro Sun Graphic - More vibrant and refined stripes */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute w-[320px] h-[320px] md:w-[500px] md:h-[500px] rounded-full z-0"
                            style={{
                                background: `linear-gradient(to bottom, #ff9800, #ff5722, #e91e63)`,
                                maskImage: `repeating-linear-gradient(to bottom, black 0px, black 14px, transparent 14px, transparent 20px)`
                            }}
                        />

                        {/* Student Image - Circular composition to match inspiration */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative z-10 flex justify-center items-center"
                        >
                            <div className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                                <Image
                                    src="/vision.png"
                                    alt="Vision for Kenya"
                                    fill
                                    className="object-cover object-top grayscale-[100%] contrast-125 brightness-90 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]"
                                />
                            </div>
                        </motion.div>


                    </div>

                    {/* Right Column - Content */}
                    <div className="w-full md:w-1/2 text-left z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-orange-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 font-outfit block">
                                Vision for Kenya
                            </span>
                            <h2 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 leading-tight mb-4">
                                THE <span className="relative inline-block text-gray-900">
                                    FUTURE
                                    {/* Hand-drawn oval */}
                                    <svg className="absolute -inset-2 w-[120%] h-[120%] text-yellow-400 -z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <path d="M5,50 Q25,5 50,5 T95,50 Q75,95 50,95 T5,50" fill="none" stroke="currentColor" strokeWidth="3" />
                                    </svg>
                                </span> OF KENYA
                            </h2>

                            <p className="text-orange-600 font-outfit font-bold uppercase tracking-widest text-sm mb-8">
                                Illuminating vision for every kid
                            </p>

                            <div className="space-y-6">
                                <p className="font-outfit text-lg font-bold text-gray-800">
                                    Kenya Keys is an educational NGO founded by the community—focused on providing great education, good vibes, student success, and a love for the future.
                                </p>

                                <button className="group mt-4 bg-yellow-400 text-black font-bold font-outfit px-8 py-4 rounded-full flex items-center gap-3 hover:bg-yellow-500 transition-all uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                    Learn More
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
