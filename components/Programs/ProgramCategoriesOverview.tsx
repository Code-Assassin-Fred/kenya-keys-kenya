'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    GraduationCap, 
    Heart, 
    Laptop, 
    Brain, 
    BookOpen, 
    Hammer, 
    TrendingUp 
} from 'lucide-react';

const categories = [
    {
        id: 1,
        title: 'Student Scholarship & Sponsorships',
        description: 'Sponsoring secondary and post-secondary students with complete academic fees, tuition, and comprehensive mentorship.',
        icon: GraduationCap,
        anchor: 'sponsorships',
        colorClass: 'text-[#00529B]',
        bgClass: 'bg-blue-50/50',
        hoverBorderClass: 'hover:border-[#00529B]/50'
    },
    {
        id: 2,
        title: 'Health & Hygiene Support',
        description: 'Providing sanitary pads and comprehensive menstrual hygiene education to ensure girls never miss a day of school.',
        icon: Heart,
        anchor: 'health-hygiene',
        colorClass: 'text-[#E11D48]',
        bgClass: 'bg-rose-50/50',
        hoverBorderClass: 'hover:border-[#E11D48]/50'
    },
    {
        id: 3,
        title: 'ICT Integration in Education',
        description: 'Delivering e-learning programs, laptop provisions, and competency-based digital literacy training to rural schools.',
        icon: Laptop,
        anchor: 'ict',
        colorClass: 'text-[#0D9488]',
        bgClass: 'bg-teal-50/50',
        hoverBorderClass: 'hover:border-[#0D9488]/50'
    },
    {
        id: 4,
        title: 'Psycho-Student Mentorship',
        description: 'Offering vital social counselling, professional career guidance, and foundational life skills programs.',
        icon: Brain,
        anchor: 'mentorship',
        colorClass: 'text-[#7C3AED]',
        bgClass: 'bg-purple-50/50',
        hoverBorderClass: 'hover:border-[#7C3AED]/50'
    },
    {
        id: 5,
        title: 'Library & Literacy Support',
        description: 'Facilitating high school book donations and resource curation for our Community Education Center library.',
        icon: BookOpen,
        anchor: 'library',
        colorClass: 'text-[#2563EB]',
        bgClass: 'bg-[#e0f2fe]/50',
        hoverBorderClass: 'hover:border-[#2563EB]/50'
    },
    {
        id: 6,
        title: 'Schools Infrastructure',
        description: 'Constructing classrooms, toilet blocks, student dormitories, and hand-crafting 3-seater desks.',
        icon: Hammer,
        anchor: 'infrastructure',
        colorClass: 'text-[#EA580C]',
        bgClass: 'bg-amber-50/50',
        hoverBorderClass: 'hover:border-[#EA580C]/50'
    },
    {
        id: 7,
        title: 'Business Skills Training',
        description: 'Empowering communities through business mentorship, entrepreneurship, and sustainable livelihood skills.',
        icon: TrendingUp,
        anchor: 'business',
        colorClass: 'text-[#16A34A]',
        bgClass: 'bg-emerald-50/50',
        hoverBorderClass: 'hover:border-[#16A34A]/50'
    }
];

export default function ProgramCategoriesOverview() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // offset for the sticky navbar
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="bg-white py-16 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="text-center mb-12">
                    <span className="text-[#00529B] font-black tracking-[0.2em] uppercase text-xs mb-3 block font-outfit">
                        Overview
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase tracking-tight leading-none mb-6">
                        OUR 7 CORE <span className="text-[#00529B]">PROGRAM AREAS</span>
                    </h2>
                    <p className="text-lg text-gray-600 font-outfit max-w-3xl mx-auto">
                        Kenya Keys operates a holistic, student-centered model designed to remove every educational barrier. Explore our core focus areas below.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((cat, idx) => {
                        const IconComponent = cat.icon;
                        return (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                viewport={{ once: true }}
                                onClick={() => scrollToSection(cat.anchor)}
                                className={`group p-6 rounded-2xl border border-gray-100 ${cat.bgClass} cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-gray-100 hover:-translate-y-1 ${cat.hoverBorderClass} flex flex-col justify-between`}
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`p-3 bg-white rounded-xl shadow-sm ${cat.colorClass}`}>
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <span className="text-3xl font-black font-oswald text-gray-200 group-hover:text-gray-300 transition-colors">
                                            0{cat.id}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold font-outfit text-[#333] mb-3 leading-snug group-hover:text-[#00529B] transition-colors">
                                        {cat.title}
                                    </h3>
                                    <p className="text-gray-600 font-outfit text-sm leading-relaxed mb-6">
                                        {cat.description}
                                    </p>
                                </div>
                                <span className={`text-xs font-black uppercase tracking-wider font-outfit ${cat.colorClass} flex items-center gap-1 mt-auto`}>
                                    Learn Details <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
