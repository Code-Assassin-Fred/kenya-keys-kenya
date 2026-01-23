'use client';

import { motion } from "framer-motion";
// icon import removed
const programs = [
    {
        id: 1,
        title: "Secondary School Sponsorship",
        description: "Empowering bright minds with the resources they need to complete their secondary education.",
        category: "Education"
    },
    {
        id: 2,
        title: "Library Development",
        description: "Building community libraries to foster a culture of reading and provide access to knowledge.",
        category: "Community"
    },
    {
        id: 4,
        title: "Girls' Empowerment",
        description: "Breaking barriers for girls through mentorship, health education, and scholarship programs.",
        category: "Impact"
    },
    {
        id: 5,
        title: "Innovation Hubs",
        description: "Equipping schools with computer labs and digital resources to bridge the tech divide.",
        category: "Technology"
    },
    {
        id: 6,
        title: "College & Vocational",
        description: "Supporting transition to higher education or trade schools for career readiness.",
        category: "Education"
    },
    {
        id: 7,
        title: "Student Support Services",
        description: "Holistic support including tuition, uniforms, hygiene materials, and mentoring for high-potential students.",
        category: "Support"
    },
    {
        id: 8,
        title: "Community Learning",
        description: "Adult education, literacy programs, and community workshops to enhance life skills beyond the classroom.",
        category: "Community"
    },
    {
        id: 9,
        title: "Learning Center / Library",
        description: "A state-of-the-art facility providing computer access, books, and a safe study environment for all.",
        category: "Facility"
    }
];

export default function CorePrograms() {
    const doubledPrograms = [...programs, ...programs];

    return (
        <section className="relative py-16 bg-gray-950">

            {/* Content Container */}
            <div className="relative z-10 px-8 md:px-24">
                <div className="max-w-7xl mx-auto mb-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2 block font-outfit"
                    >
                        Our Initiatives
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-playfair font-bold text-white mb-3"
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
                                className="w-[300px] md:w-[380px] flex flex-col gap-4 transform transition-all duration-500 shrink-0"
                            >
                                <div className="flex items-start">
                                    <span className="text-xs font-black font-outfit uppercase tracking-widest text-blue-300 bg-blue-900/30 px-3 py-1.5 rounded-full">
                                        {program.category}
                                    </span>
                                </div>

                                <p className="text-gray-300 font-outfit text-base leading-relaxed italic whitespace-normal line-clamp-3">
                                    "{program.description}"
                                </p>

                                <div className="mt-auto">
                                    <h4 className="font-bold text-white font-playfair text-lg leading-tight truncate">{program.title}</h4>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}