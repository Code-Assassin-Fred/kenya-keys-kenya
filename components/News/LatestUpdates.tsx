'use client';

import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const newsItems = [
    {
        title: "Celebrating 20 Years of Impact",
        date: "March 2024",
        excerpt: "Kenya Keys marks two decades of life-changing educational support. From our first 14 students to over 1,000 sponsored alumni.",
        image: "/image2.webp"
    },
    {
        title: "Community Education Center Opening",
        date: "January 2024",
        excerpt: "The milestone was marked with the opening of the CEC, a 15,000 sq ft building housing a public library and computer lab.",
        image: "/new illuminate.webp"
    },
    {
        title: "Hope Springs Program Expands",
        date: "November 2023",
        excerpt: "Our mentorship program for girls reaches new communities, providing vital health and leadership education.",
        image: "/image5.webp"
    }
];

export default function LatestUpdates() {
    return (
        <section id="latest" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {newsItems.map((item, idx) => (
                        <motion.article
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="flex flex-col group cursor-pointer"
                        >
                            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-8 shadow-lg">
                                <Image 
                                    src={item.image} 
                                    alt={item.title} 
                                    fill 
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-[#FFB800] text-[#333] font-black font-outfit px-4 py-1 text-xs uppercase tracking-widest rounded-full">
                                    {item.date}
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-[#333] font-oswald uppercase mb-4 tracking-tight group-hover:text-[#00529B] transition-colors leading-tight">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 font-outfit text-lg leading-relaxed mb-6">
                                {item.excerpt}
                            </p>
                            <div className="mt-auto">
                                <span className="text-[#00529B] font-black font-outfit uppercase tracking-widest text-xs border-b-2 border-[#00529B] pb-1 group-hover:bg-[#00529B] group-hover:text-white group-hover:px-2 transition-all">
                                    Read Full Story
                                </span>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <button className="border-2 border-[#333] text-[#333] font-black font-outfit px-12 py-4 rounded-full hover:bg-[#333] hover:text-white transition-all uppercase tracking-widest text-sm">
                        View All News Archives
                    </button>
                </div>
            </div>
        </section>
    );
}
