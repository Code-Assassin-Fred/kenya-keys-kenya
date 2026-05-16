'use client';

import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";

const stories = [
    {
        name: "Kanga’s Story",
        title: "Choosing Education Over Expectation",
        text: "Kanga grew up on a sisal plantation where many expected her future to be marriage—not high school. Thanks to Kenya Keys’ Hope Springs program, she gained essential life skills and earned a sponsorship to a boarding high school—turning hope into reality.",
        image: "/image6.png"
    },
    {
        name: "Kennedy’s Story",
        title: "From Student to School Builder",
        text: "After finishing his degree through our sponsorship, Kennedy led his community in building a two-classroom school, Kirimani Primary, so that more children could follow in his footsteps without walking 5-6 miles each way.",
        image: "/image3.png"
    }
];

const videoStories = [
    {
        title: "James Mbandi: Journey of Excellence",
        url: "https://storage.googleapis.com/kenya_keys_videos/JAMES%20MBANDI%20UPDATED.mp4",
        description: "Follow the inspiring journey of James as he overcomes obstacles to achieve academic greatness."
    },
    {
        title: "Freedom Kits: Empowering Girls",
        url: "https://storage.googleapis.com/kenya_keys_videos/FREEDOM%20KITS.mp4",
        description: "Our Freedom Kits program provides essential resources to keep girls in school and restore their dignity."
    },
    {
        title: "Digital Bridge: Laptop Distribution",
        url: "https://storage.googleapis.com/kenya_keys_videos/Laptop%20Distribution%20.mp4",
        description: "Closing the digital divide by providing high-achieving students with the technology they need to succeed."
    },
    {
        title: "Student Spotlight: Community Impact",
        url: "https://storage.googleapis.com/kenya_keys_videos/0225%20(2)(1).mp4",
        description: "Seeing the ripple effect of education as our sponsored students give back to their communities."
    },
    {
        title: "Empowering Futures",
        url: "https://storage.googleapis.com/kenya_keys_videos/0225%20(3).mp4",
        description: "A look into how Kenya Keys is transforming lives through long-term educational commitment."
    },
    {
        title: "Inclusion in Action: Goal Ball",
        url: "https://storage.googleapis.com/kenya_keys_videos/GOAL%20BALL.mp4",
        description: "Promoting physical education and inclusion through the Goal Ball program for visually impaired students."
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

                {/* Written Stories */}
                <div className="space-y-24 mb-32">
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

                {/* Video Stories Grid */}
                <div className="pt-24 border-t border-gray-200">
                    <div className="text-center mb-16">
                        <h3 className="text-2xl md:text-4xl font-black text-[#333] font-oswald uppercase leading-none mb-6 tracking-tight">
                            IMPACT IN <span className="text-[#00529B]">MOTION</span>
                        </h3>
                        <p className="text-gray-600 font-outfit max-w-2xl mx-auto">
                            Experience the real-world difference your support makes through these recorded moments of transformation and community progress.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {videoStories.map((video, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group flex flex-col bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="relative aspect-video bg-black overflow-hidden">
                                    <video 
                                        src={video.url} 
                                        controls 
                                        className="w-full h-full object-cover"
                                        poster="/image4.png" // Using a generic local image as poster
                                    />
                                    <div className="absolute inset-0 bg-[#00529B]/10 group-hover:bg-transparent transition-colors pointer-events-none" />
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <h4 className="text-lg font-black font-oswald uppercase tracking-tight text-[#1D366D] mb-4">
                                        {video.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 font-outfit leading-relaxed">
                                        {video.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
