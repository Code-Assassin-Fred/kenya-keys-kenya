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
        <section className="relative py-20 md:py-32 overflow-hidden" style={{ backgroundColor: '#fcfcfc' }}>
            {/* Content Container */}
            <div className="relative z-10 px-6 md:px-16 lg:px-24">
                <div className="max-w-7xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-start"
                    >
                        <span className="text-orange-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 font-outfit">
                            Our Initiatives
                        </span>
                        <h2 className="text-5xl md:text-7xl font-playfair font-bold text-gray-950 leading-tight">
                            Core Programs <br />
                            <span className="text-gray-400">for Global Change</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Marquee Section with fade edges */}
                <div className="relative mt-8 mb-32">
                    {/* Left fade */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #fcfcfc, transparent)' }} />
                    {/* Right fade */}
                    <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #fcfcfc, transparent)' }} />

                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 45,
                            ease: "linear",
                            repeat: Infinity
                        }}
                        className="flex gap-24 md:gap-40 items-baseline"
                    >
                        {doubledPrograms.map((program, idx) => (
                            <div
                                key={`${program.id}-${idx}`}
                                className="flex flex-col gap-4 shrink-0 max-w-[450px]"
                            >
                                {/* Title and Category in one line */}
                                <div className="flex items-center gap-4">
                                    <h4 className="font-bold text-gray-950 font-playfair text-2xl md:text-3xl whitespace-nowrap">
                                        {program.title}
                                    </h4>
                                    <span className={`h-[1px] w-8 md:w-12 bg-gray-200`} />
                                    <span className={`text-[10px] font-bold font-outfit uppercase tracking-widest ${program.color} shrink-0`}>
                                        {program.category}
                                    </span>
                                </div>

                                {/* Minimal Description */}
                                <p className="text-gray-500 font-outfit text-base md:text-lg leading-relaxed max-w-[400px]">
                                    {program.description}
                                </p>
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
                                className="object-cover object-top grayscale"
                            />
                            {/* Gradient Overlay to blend bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-orange-600/40 via-transparent to-transparent pointer-events-none" />
                        </div>
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-orange-500 rounded-full animate-pulse" />
                    </div>
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
        </section>
    );
}
