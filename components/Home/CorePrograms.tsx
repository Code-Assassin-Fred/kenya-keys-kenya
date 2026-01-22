'use client';

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Users, Lightbulb, Heart, School } from "lucide-react";

const programs = [
    {
        id: 1,
        title: "Secondary School Sponsorship",
        description: "Empowering bright minds with the resources they need to complete their secondary education.",
        category: "Education",
        icon: <GraduationCap className="w-5 h-5 text-orange-500" />,
        stat: "500+ Students"
    },
    {
        id: 2,
        title: "Library Development",
        description: "Building community libraries to foster a culture of reading and provide access to knowledge.",
        category: "Community",
        icon: <BookOpen className="w-5 h-5 text-blue-500" />,
        stat: "12 Libraries"
    },
    {
        id: 3,
        title: "Teacher Training",
        description: "Enhancing education quality with professional development and tools for local educators.",
        category: "Professional",
        icon: <Users className="w-5 h-5 text-green-500" />,
        stat: "100+ Teachers"
    },
    {
        id: 4,
        title: "Girls' Empowerment",
        description: "Breaking barriers for girls through mentorship, health education, and scholarship programs.",
        category: "Impact",
        icon: <Heart className="w-5 h-5 text-pink-500" />,
        stat: "300+ Girls"
    },
    {
        id: 5,
        title: "Innovation Hubs",
        description: "Equipping schools with computer labs and digital resources to bridge the tech divide.",
        category: "Technology",
        icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,
        stat: "5 Tech Hubs"
    },
    {
        id: 6,
        title: "College & Vocational",
        description: "Supporting transition to higher education or trade schools for career readiness.",
        category: "Education",
        icon: <School className="w-5 h-5 text-purple-500" />,
        stat: "200+ Scholars"
    }
];

export default function CorePrograms() {
    const doubledPrograms = [...programs, ...programs];

    return (
        <section className="relative py-16 bg-[#e0f2fe]" style={{ clipPath: 'polygon(0 8%, 3% 6%, 6% 7%, 9% 5%, 12% 6%, 15% 4%, 18% 5%, 21% 3%, 24% 4%, 27% 5%, 30% 3%, 33% 4%, 36% 6%, 39% 4%, 42% 5%, 45% 3%, 48% 4%, 51% 5%, 54% 3%, 57% 4%, 60% 6%, 63% 4%, 66% 5%, 69% 3%, 72% 4%, 75% 6%, 78% 4%, 81% 5%, 84% 3%, 87% 4%, 90% 6%, 93% 4%, 96% 5%, 99% 3%, 100% 4%, 100% 92%, 99% 94%, 96% 93%, 93% 95%, 90% 94%, 87% 96%, 84% 95%, 81% 97%, 78% 96%, 75% 94%, 72% 95%, 69% 97%, 66% 96%, 63% 94%, 60% 95%, 57% 96%, 54% 97%, 51% 95%, 48% 96%, 45% 97%, 42% 95%, 39% 96%, 36% 94%, 33% 96%, 30% 97%, 27% 95%, 24% 96%, 21% 97%, 18% 95%, 15% 96%, 12% 94%, 9% 95%, 6% 93%, 3% 94%, 0 92%)' }}>

            {/* Content Container */}
            <div className="relative z-10 px-8 md:px-24">
                <div className="max-w-7xl mx-auto mb-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-2 block font-outfit"
                    >
                        Our Initiatives
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-3"
                    >
                        Core Programs for Change
                    </motion.h2>
                </div>

                {/* Marquee Section */}
                <div className="relative flex">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 35,
                            ease: "linear",
                            repeat: Infinity
                        }}
                        className="flex gap-8 py-6 whitespace-nowrap"
                    >
                        {doubledPrograms.map((program, idx) => (
                            <div
                                key={`${program.id}-${idx}`}
                                className="w-[300px] md:w-[380px] bg-white rounded-[2.5rem] p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-blue-50 flex flex-col gap-4 transform transition-all duration-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100/50 shadow-sm">
                                        {program.icon}
                                    </div>
                                    <span className="text-[9px] font-black font-outfit uppercase tracking-widest text-blue-500 bg-blue-50 px-3 py-1.5 rounded-full">
                                        {program.category}
                                    </span>
                                </div>

                                <p className="text-gray-700 font-outfit text-sm leading-relaxed italic whitespace-normal line-clamp-3">
                                    "{program.description}"
                                </p>

                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center font-bold text-white text-base font-outfit shadow-md shrink-0">
                                        {program.title.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-gray-900 font-playfair text-sm leading-tight truncate">{program.title}</h4>
                                        <p className="text-[11px] text-gray-500 font-outfit font-semibold">{program.stat}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}