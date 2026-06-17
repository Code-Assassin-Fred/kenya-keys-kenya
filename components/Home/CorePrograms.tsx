'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const programs = [
    {
        id: 1,
        title: "Secondary School Sponsorship",
        description: "Empowering bright minds with the resources they need to complete their secondary education through comprehensive support and mentorship.",
        category: "Impact Stories",
        image: "/image16.webp",
        href: "/programs/secondary-sponsorship"
    },
    {
        id: 3,
        title: "Girls' Empowerment",
        description: "Breaking barriers for girls through leadership training, health education, and dedicated scholarship programs for success.",
        category: "Impact Stories",
        image: "/image11.webp",
        href: "/programs/girls-empowerment"
    },
    {
        id: 4,
        title: "College & Vocational",
        description: "Supporting the transition to higher education or trade schools, ensuring career readiness and long-term economic independence.",
        category: "Impact Stories",
        image: "/WhatsApp Image 2026-04-19 at 20.39.13.webp",
        href: "/programs/college-vocational"
    }
];

export default function CorePrograms() {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                {/* Header Section */}
                <div className="mb-8">
                    <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase tracking-tight leading-none">
                        Core Programs
                    </h2>
                </div>

                {/* Horizontal Divider */}
                <div className="w-full h-px bg-gray-200 mb-12" />

                {/* Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {programs.map((program, idx) => (
                        <div
                            key={program.id}
                            className={`flex flex-col pb-12 md:pb-0 ${idx === 0 ? '' : 'md:border-l border-gray-200 md:pl-10'
                                } ${idx === 2 ? '' : 'md:pr-10'}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="group"
                            >
                                {/* Image */}
                                <div className="relative aspect-[16/10] overflow-hidden mb-6">
                                    <Image
                                        src={program.image}
                                        alt={`Kenya Keys ${program.title} program - students in rural Kenya`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Category */}
                                <p className="text-[#333] font-black text-sm uppercase tracking-wider mb-3 font-outfit">
                                    {program.category}
                                </p>

                                {/* Title */}
                                <Link
                                    href={program.href}
                                    className="text-[22px] md:text-[26px] font-bold text-[#00529B] hover:text-[#003d75] transition-colors leading-tight mb-4 inline-block font-outfit"
                                >
                                    {program.title}
                                </Link>

                                {/* Description */}
                                <p className="text-gray-600 font-outfit text-base leading-relaxed line-clamp-3">
                                    {program.description}
                                </p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Vision Section - Re-integrated with cleaner look */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mt-24">
                <div className="w-full h-px bg-gray-200 mb-20" />
                <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
                    {/* Left Column - Visuals */}
                    <div className="w-full md:w-1/2 relative flex justify-center items-center">
                        {/* LED Flicker Graphic */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] md:w-[450px] md:h-[450px] rounded-full z-0 overflow-hidden flex flex-col"
                        >
                            {[...Array(22)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        opacity: [0.7, 0.2, 0.9, 0.4, 0.7],
                                        backgroundColor: i % 2 === 0 ? ["#000000", "#1a1a1a", "#050505"] : ["#0a0a0a", "#222222", "#000000"]
                                    }}
                                    transition={{
                                        duration: 1.5 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 2,
                                        ease: "easeInOut"
                                    }}
                                    style={{ height: '14px', marginBottom: '6px' }}
                                    className="w-full shrink-0"
                                />
                            ))}
                        </motion.div>
 
                        {/* Student Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative z-10"
                        >
                            <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-4 border-white shadow-2xl">
                                <Image
                                    src="/new illuminate.webp"
                                    alt="Kenya Keys Community Education Center empowering students in Taru, Kenya"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="w-full md:w-1/2 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-[#00529B] font-black tracking-[0.2em] uppercase text-xs mb-4 font-outfit block">
                                Empowerment in Rural Kenya
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold text-[#333] font-oswald uppercase leading-[1.1] mb-8 tracking-tight">
                                UNLEASHING <span className="text-[#FFB800]">POTENTIAL</span> AT THE SOURCE
                            </h2>

                            <div className="space-y-8">
                                <p className="font-outfit text-lg md:text-xl text-gray-700 leading-relaxed font-bold">
                                    Kenya Keys is an educational NGO founded by the community—focused on providing great education, good vibes, student success, and a love for the future.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
