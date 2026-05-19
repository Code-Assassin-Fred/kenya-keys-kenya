'use client';

import React from 'react';
import { motion } from "framer-motion";

const stats = [
    { label: "Total Students Sponsored", value: "1004", suffix: "" },
    { label: "Graduation Rate Since 2022", value: "100", suffix: "%" },
    { label: "Sponsorships for Girls", value: "50", suffix: "%" },
    { label: "Current College Students", value: "314", suffix: "" },
    { label: "HS to College Transition", value: "87", suffix: "%" }
];

const CountUp = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
    const [count, setCount] = React.useState(0);
    const [isInView, setIsInView] = React.useState(false);

    React.useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, end]);

    return (
        <motion.span onViewportEnter={() => setIsInView(true)}>
            {count}{suffix}
        </motion.span>
    );
};

export default function Stats() {
    return (
        <section id="stats" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="text-center group"
                        >
                            <div className="text-4xl md:text-5xl font-black text-[#00529B] font-oswald mb-2 group-hover:text-[#FFB800] transition-colors">
                                <CountUp end={parseInt(stat.value)} suffix={stat.suffix} />
                            </div>
                            <p className="text-gray-600 font-outfit text-sm font-bold uppercase tracking-wider leading-tight">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 p-6 sm:p-12 bg-[#00529B] rounded-3xl text-white relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <h3 className="text-3xl font-black font-oswald uppercase mb-4 tracking-tight">The Ripple Effect</h3>
                            <p className="text-lg text-blue-100 font-outfit leading-relaxed">
                                Our alumni work in education, healthcare, finance, and engineering. They serve as mentors, social workers, and community leaders, creating a cycle of prosperity that broadens with every graduate.
                            </p>
                        </div>
                        <div className="flex-shrink-0 text-center">
                            <div className="text-7xl font-black font-oswald text-[#FFB800] mb-2 leading-none">10%</div>
                            <p className="font-bold font-outfit uppercase tracking-widest text-xs">Admin Costs Under</p>
                        </div>
                    </div>
                    {/* Background Graphic */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -translate-y-1/2 translate-x-1/2 rounded-full" />
                </div>
            </div>
        </section>
    );
}
