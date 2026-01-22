'use client';

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Users, Lightbulb, Heart, School } from "lucide-react";

const programs = [
    {
        id: 1,
        title: "Secondary School Sponsorship",
        description: "Empowering bright minds with the resources they need to complete their secondary education and secure a better future.",
        category: "Education",
        icon: <GraduationCap className="w-6 h-6 text-orange-500" />,
        stat: "500+ Students"
    },
    {
        id: 2,
        title: "Library Development",
        description: "Building and stocking community libraries to foster a culture of reading and provide access to knowledge for all.",
        category: "Community",
        icon: <BookOpen className="w-6 h-6 text-blue-500" />,
        stat: "12 Libraries"
    },
    {
        id: 3,
        title: "Teacher Training",
        description: "Enhancing the quality of education by providing professional development and modern teaching tools to local educators.",
        category: "Professional",
        icon: <Users className="w-6 h-6 text-green-500" />,
        stat: "100+ Teachers"
    },
    {
        id: 4,
        title: "Girls' Empowerment",
        description: "Breaking barriers for girls through mentorship, health education, and dedicated scholarship programs.",
        category: "Impact",
        icon: <Heart className="w-6 h-6 text-pink-500" />,
        stat: "300+ Girls"
    },
    {
        id: 5,
        title: "Innovation Hubs",
        description: "Equipping schools with computer labs and digital resources to bridge the technological divide in rural areas.",
        category: "Technology",
        icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
        stat: "5 Tech Hubs"
    },
    {
        id: 6,
        title: "College & Vocational",
        description: "Supporting students as they transition to higher education or specialized trade schools for career readiness.",
        category: "Education",
        icon: <School className="w-6 h-6 text-purple-500" />,
        stat: "200+ Scholars"
    }
];

export default function CorePrograms() {
    // Duplicate programs for seamless loop
    const doubledPrograms = [...programs, ...programs];

    return (
        <section className="relative py-24 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
            {/* Top Cloud SVG */}
            <div className="absolute top-0 left-0 w-full rotate-180 transform -translate-y-1">
                <svg viewBox="0 0 1440 320" className="w-full h-auto fill-blue-50">
                    <path d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 mb-16 relative z-10 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4 block font-outfit"
                >
                    Our Initiatives
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6"
                >
                    Core Programs for Change
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 max-w-2xl mx-auto text-lg font-outfit"
                >
                    We focus on sustainable education and community development to create lasting impact in rural Kenya.
                </motion.p>
            </div>

            {/* Marquee Container */}
            <div className="relative flex overflow-x-hidden">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity
                    }}
                    className="flex gap-8 py-4 whitespace-nowrap"
                >
                    {doubledPrograms.map((program, idx) => (
                        <div
                            key={`${program.id}-${idx}`}
                            className="w-[350px] md:w-[450px] bg-white rounded-3xl p-8 shadow-xl shadow-blue-100/50 border border-blue-50 flex flex-col gap-6"
                        >
                            <div className="flex items-center justify-between">
                                <div className="p-3 rounded-2xl bg-blue-50">
                                    {program.icon}
                                </div>
                                <span className="text-xs font-bold font-outfit uppercase tracking-wider text-blue-400 bg-blue-50/50 px-3 py-1 rounded-full">
                                    {program.category}
                                </span>
                            </div>

                            <p className="text-gray-700 font-outfit text-lg leading-relaxed italic">
                                "{program.description}"
                            </p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center font-bold text-orange-600 font-outfit">
                                    {program.title.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 font-playfair">{program.title}</h4>
                                    <p className="text-sm text-gray-500 font-outfit">{program.stat}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom Cloud SVG */}
            <div className="absolute bottom-0 left-0 w-full translate-y-1">
                <svg viewBox="0 0 1440 320" className="w-full h-auto fill-blue-50">
                    <path d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            {/* Background Decorative Clouds (Floating) */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -20, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-[10%] opacity-20 pointer-events-none"
            >
                <CloudIcon className="w-24 h-24 text-blue-200" />
            </motion.div>
            <motion.div
                animate={{
                    x: [0, -40, 0],
                    y: [0, 30, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-40 right-[15%] opacity-20 pointer-events-none"
            >
                <CloudIcon className="w-32 h-32 text-blue-200" />
            </motion.div>
        </section>
    );
}

function CloudIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.5,19c-3.037,0-5.5-2.463-5.5-5.5c0-0.038,0.001-0.076,0.002-0.113C10.153,12.753,8,10.627,8,8c0-2.761,2.239-5,5-5 c1.59,0,3.003,0.743,3.911,1.895C17.41,4.464,17.947,4.25,18.5,4.25c2.071,0,3.75,1.679,3.75,3.75c0,0.569-0.129,1.107-0.358,1.589 C21.892,10.142,22,10.806,22,11.5c0,2.485-2.015,4.5-4.5,4.5c-0.134,0-0.266-0.007-0.396-0.019C16.592,17.498,14.717,19,12.5,19 c-2.485,0-4.5-2.015-4.5-4.5c0-0.134,0.007-0.266,0.019-0.396C6.012,14.608,4.5,16.483,4.5,18.7c0,2.375,1.925,4.3,4.3,4.3 c0.13,0,0.258-0.006,0.384-0.018C9.593,24.49,11.396,26,13.5,26c2.485,0,4.5-2.015,4.5-4.5c0-0.134-0.007-0.266-0.019-0.396 C19.988,20.592,21.5,18.717,21.5,16.5c0-2.375-1.925-4.3-4.3-4.3c-0.13,0-0.258,0.006-0.384,0.018C16.407,10.71,14.604,9.2,12.5,9.2 c-2.485,0-4.5,2.015-4.5,4.5c0,0.134,0.007,0.266,0.019,0.396C6.012,14.608,4.5,16.483,4.5,18.7c0,2.375,1.925,4.3,4.3,4.3 c0.13,0,0.258-0.006,0.384-0.018C9.593,24.49,11.396,26,13.5,26c2.485,0,4.5-2.015,4.5-4.5C18,21.366,17.993,21.234,17.981,21.104 C19.988,20.592,21.5,18.717,21.5,16.5c0-2.375-1.925-4.3-4.3-4.3c-0.13,0-0.258,0.006-0.384,0.018C16.407,10.71,14.604,9.2,12.5,9.2 c-2.485,0-4.5,2.015-4.5,4.5C8,13.866,8.007,13.998,8.019,14.128C6.012,14.608,4.5,16.483,4.5,18.7c0,2.375,1.925,4.3,4.3,4.3 c0.13,0,0.258-0.006,0.384-0.018C9.593,24.49,11.396,26,13.5,26c2.485,0,4.5-2.015,4.5-4.5c0-0.134-0.007-0.266-0.019-0.396 C19.988,20.592,21.5,18.717,21.5,16.5c0-2.375-1.925-4.3-4.3-4.3" />
        </svg>
    );
}
