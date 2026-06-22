'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Milestone {
    year: string;
    title: string;
    description: string;
    image: string;
}

const milestones: Milestone[] = [
    {
        year: '2005',
        title: 'The Spark in Taru',
        description: 'Rinda Hayes visited Taru, Kenya and witnessed a 95% middle school dropout rate due to an inability to pay school fees. Sponsoring 14 students with Principal Joseph Mwengea sparked the vision.',
        image: '/image12.webp'
    },
    {
        year: '2006',
        title: 'Founding of Kenya Keys',
        description: 'Kenya Keys was officially registered as a PBO/NGO to expand student sponsorships, bringing structured support and educational opportunities to the remote Kwale County.',
        image: '/image2.webp'
    },
    {
        year: '2011',
        title: 'Taru Library & Education Center',
        description: 'To address the extreme shortage of books, Kenya Keys built the first community library and Resource Center in Taru, opening access to reading materials and computer literacy.',
        image: '/image5.webp'
    },
    {
        year: '2017',
        title: 'Mentorship & Girls\' Initiatives',
        description: 'Designated girls\' empowerment programs, mentorship circles, and health/hygiene guidance were established to address systemic barriers, allowing girls to complete secondary education.',
        image: '/image3.webp'
    },
    {
        year: '2026',
        title: 'Twenty Years & Locally Led',
        description: 'Now celebrating two decades of impact with 934 students sponsored, Kenya Keys is fully transitioned to local leadership, managed entirely by Kenyan educators and community leaders.',
        image: '/image6.webp'
    }
];

export default function Timeline() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollAmount = 360; // Card width + gap
            const targetScroll = direction === 'left' 
                ? scrollLeft - scrollAmount 
                : scrollLeft + scrollAmount;
            
            scrollContainerRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-24 bg-[#F8FAFC] overflow-hidden border-t border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                    <div>
                        <p className="text-[#009bba] font-bold text-sm uppercase tracking-widest font-outfit mb-3">Our History</p>
                        <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase leading-none tracking-tight">
                            THE ROAD TO <span className="text-[#00529B]">TODAY</span>
                        </h2>
                    </div>
                    {/* Navigation Buttons */}
                    <div className="flex gap-3 mt-6 md:mt-0">
                        <button
                            onClick={() => scroll('left')}
                            className="p-3 rounded-full bg-white hover:bg-[#00529B] border border-gray-200 hover:border-[#00529B] text-[#333] hover:text-white transition-all shadow-md group"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-3 rounded-full bg-white hover:bg-[#00529B] border border-gray-200 hover:border-[#00529B] text-[#333] hover:text-white transition-all shadow-md group"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </div>
                </div>

                {/* Timeline Cards Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-8 overflow-x-auto pb-10 pt-4 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
                    style={{ 
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {milestones.map((milestone, idx) => (
                        <motion.div
                            key={milestone.year}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="flex-shrink-0 w-[300px] md:w-[340px] snap-start bg-white p-5 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                {/* Polaroid-style Image Frame */}
                                <div className="relative aspect-[4/3] w-full bg-[#FAFAFA] p-3 shadow-inner border border-gray-100 rounded-xl overflow-hidden mb-6">
                                    <div className="relative w-full h-full overflow-hidden rounded-lg bg-gray-100">
                                        <Image
                                            src={milestone.image}
                                            alt={milestone.title}
                                            fill
                                            className="object-cover transition-transform duration-500 hover:scale-105"
                                            sizes="(max-w-768px) 300px, 340px"
                                        />
                                    </div>
                                </div>

                                {/* Details */}
                                <div>
                                    <span className="text-4xl font-black text-[#00529B] font-oswald tracking-wide">
                                        {milestone.year}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-800 font-outfit mt-2 tracking-tight">
                                        {milestone.title}
                                    </h3>
                                    <p className="text-gray-600 font-outfit text-sm leading-relaxed mt-3">
                                        {milestone.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
