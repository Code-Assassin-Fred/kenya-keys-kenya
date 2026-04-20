'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Reply, Heart, Globe } from 'lucide-react';

export default function SponsorLetters() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                    {/* Left: Content */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase leading-none mb-8 tracking-tight">
                                THE HEART OF <br />
                                <span className="text-[#00529B]">SPONSORSHIP</span>
                            </h2>
                            <p className="text-xl text-gray-700 font-outfit leading-relaxed mb-12">
                                Letter exchange is more than just communication—it's a bridge between worlds. Your words of encouragement are often as impactful as your financial support.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    {
                                        icon: <Send className="w-8 h-8 text-[#00529B]" />,
                                        title: "Write Your Student",
                                        text: "Share stories about your life, work, and family. Ask your student about their dreams and favorite subjects."
                                    },
                                    {
                                        icon: <Reply className="w-8 h-8 text-[#009bba]" />,
                                        title: "Receive Responses",
                                        text: "Students write back with handwritten letters, sharing their gratitude and excitement for their studies."
                                    },
                                    {
                                        icon: <Globe className="w-8 h-8 text-[#FFB800]" />,
                                        title: "Cultural Exchange",
                                        text: "Discover a different perspective and learn about life in rural Kenya through the eyes of a student."
                                    },
                                    {
                                        icon: <Heart className="w-8 h-8 text-red-600" />,
                                        title: "Deep Impact",
                                        text: "Encouragement can be a powerful motivator that helps students persevere through educational challenges."
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-gray-50 p-8 rounded-3xl group hover:bg-white hover:shadow-xl transition-all duration-300">
                                        <div className="mb-6">{item.icon}</div>
                                        <h4 className="text-xl font-bold font-outfit text-[#333] mb-3">{item.title}</h4>
                                        <p className="text-gray-600 font-outfit leading-relaxed text-sm">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Letter Display */}
                    <div className="w-full lg:w-1/2 relative">
                        {/* Handwriting Style Letter */}
                        <motion.div
                            initial={{ opacity: 0, rotate: -5, y: 30 }}
                            whileInView={{ opacity: 1, rotate: -2, y: 0 }}
                            transition={{ duration: 1 }}
                            className="bg-[#FFFDF3] border border-[#E9E4C9] p-10 md:p-14 shadow-2xl relative z-10 font-playfair"
                        >
                            {/* Paper Texture Overlay */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
                            
                            <div className="relative z-10 text-[#2C281B]">
                                <div className="text-right italic mb-10 text-sm md:text-base">Maji Ya Chumvi, Kenya</div>
                                
                                <h3 className="text-2xl md:text-3xl font-bold mb-8">Dear Sponsor,</h3>
                                
                                <p className="text-lg md:text-xl leading-relaxed mb-8 indent-8 italic">
                                    I am writing this letter with much joy in my heart. Through your support, I am now in Form 3 and my favorite subject is Biology. I want to become a doctor so I can help the sick in my village...
                                </p>
                                
                                <p className="text-lg md:text-xl leading-relaxed mb-12 italic">
                                    Thank you for believing in me even though we have not met. Your last letter about your family was very encouraging to me. I study hard every day to make you proud.
                                </p>
                                
                                <div className="mt-12">
                                    <p className="font-bold">Your student,</p>
                                    <p className="text-3xl font-serif mt-2">Bahati</p>
                                </div>
                            </div>

                            {/* Small "Hand-drawn" heart */}
                            <div className="absolute bottom-10 right-10 text-red-600 opacity-60 scale-150 rotate-12">
                                <Heart className="fill-current w-12 h-12" />
                            </div>
                        </motion.div>

                        {/* Overlapping Photo */}
                        <motion.div
                            initial={{ opacity: 0, x: 20, rotate: 10 }}
                            whileInView={{ opacity: 1, x: 40, rotate: 5 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="absolute -bottom-10 -right-4 w-48 h-48 md:w-64 md:h-64 border-[10px] border-white shadow-2xl z-20 group"
                        >
                            <img src="/image2.png" alt="Handwriting letter" className="object-cover w-full h-full" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
                        </motion.div>
                        
                        {/* Decorative Stamps */}
                        <div className="absolute -top-10 left-10 w-24 h-24 opacity-20 border-4 border-[#00529B] rounded-full flex items-center justify-center text-[#00529B] font-black font-outfit uppercase text-[10px] tracking-tighter rotate-12 z-0">
                            Kenya Post Official
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
