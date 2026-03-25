'use client';

import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";

const stories = [
    {
        name: "Kanga’s Story",
        title: "Choosing Education Over Expectation",
        text: "Kanga grew up on a sisal plantation where many expected her future to be marriage—not high school. Thanks to Kenya Keys’ Hope Springs program, she gained essential life skills and earned a sponsorship to a boarding high school—turning hope into reality.",
        image: "/image1.png"
    },
    {
        name: "Kennedy’s Story",
        title: "From Student to School Builder",
        text: "After finishing his degree through our sponsorship, Kennedy led his community in building a two-classroom school, Kirimani Primary, so that more children could follow in his footsteps without walking 5-6 miles each way.",
        image: "/image3.png"
    }
];

export default function Stories() {
    return (
        <section id="stories" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase leading-none mb-6 tracking-tight">
                        STORIES OF <span className="text-[#00529B]">STRENGTH</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-[#FFB800] mx-auto rounded-full" />
                </div>

                <div className="space-y-24">
                    {stories.map((story, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
                        >
                            <div className="w-full md:w-1/2">
                                <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                                    <Image src={story.image} alt={story.name} fill className="object-cover" />
                                </div>
                            </div>

                            <div className="w-full md:w-1/2">
                                <span className="text-[#00529B] font-black tracking-[0.2em] uppercase text-sm mb-4 block font-outfit">
                                    {story.name}
                                </span>
                                <h3 className="text-2xl md:text-4xl font-black text-[#333] font-oswald uppercase leading-tight mb-6 tracking-tight">
                                    {story.title}
                                </h3>
                                <p className="text-xl text-gray-600 font-outfit leading-relaxed">
                                    {story.text}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
