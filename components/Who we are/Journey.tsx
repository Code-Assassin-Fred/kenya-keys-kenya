'use client';

import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";

export default function Journey() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-20">
                    <div className="w-full md:w-[38%] flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full max-w-sm"
                        >
                            <div className="relative aspect-square rounded-none overflow-hidden shadow-2xl">
                                <Image
                                    src="/WhatsApp Image 2026-04-19 at 20.34.27.webp"
                                    alt="Students in Kenya"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-[#FFB800] p-8 rounded-none shadow-xl hidden md:block">
                                <p className="text-[#00529B] font-black text-4xl font-oswald">2005</p>
                                <p className="text-[#333] font-bold text-sm uppercase tracking-wider font-outfit">The Beginning</p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="w-full md:w-[58%]">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl md:text-4xl font-black text-[#333] font-oswald uppercase leading-none mb-8 tracking-tight">
                                OUR <span className="text-[#00529B]">STORY</span>
                            </h2>
                            <div className="space-y-6 text-gray-700 font-outfit text-lg leading-relaxed">
                                <p>
                                    In 2005, Joseph Mwengea and Rinda Hayes co-founded Kenya Keys with a shared conviction: that education unlocks the potential and opportunities within every rural boy and girl. Two years later, Rinda's husband, Brant Hayes, joined their efforts, becoming the operational backbone supporting their growing initiative.
                                </p>
                                <p>
                                    Witnessing how the lack of a high school education trapped youth in cycles of poverty, they dedicated themselves to expanding access to secondary learning. They understood that poverty is a complex, dehumanizing force, and that overcoming it requires equally thoughtful, long-term educational opportunities.
                                </p>
                                <p>
                                    They soon realized that helping students from vulnerable households attend high school required more than just sponsorships; it also demanded improving local school environments. Consequently, Kenya Keys began upgrading public school infrastructure, building essential classrooms, libraries, and sanitary toilet facilities.
                                </p>
                                <p>
                                    Over time, their student support initiatives have expanded to address broader barriers to learning, including health and hygiene programs that provide girls with sanitary pads to ensure safe, dignified, and uninterrupted school days.
                                </p>
                                <p>
                                    Joseph has devoted his life to this humanitarian mission alongside Rinda. For him, the greatest fulfillment comes from knowing that somewhere in rural Kenya, a child's dream is coming true because of the doors opened by Kenya Keys.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
