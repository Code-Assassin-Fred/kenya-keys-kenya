'use client';

import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";

export default function DualImageHero() {
    return (
        <section id="our-story" className="w-full overflow-hidden">
            <div className="flex flex-col md:flex-row w-full h-[350px] md:h-[500px]">
                {/* Left Image - Acacia Sunset */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative w-full md:w-1/2 h-1/2 md:h-full"
                >
                    <Image
                        src="/Acacia sunset.jpg"
                        alt="Acacia tree silhouette against a golden Kenyan sunset"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                    {/* Subtle gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>

                {/* Right Image - Baobab Sunset */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    viewport={{ once: true }}
                    className="relative w-full md:w-1/2 h-1/2 md:h-full"
                >
                    <Image
                        src="/Baobab sunset.jpg"
                        alt="Baobab tree against a vibrant Kenyan sunset sky"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                    {/* Subtle gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>
            </div>
        </section>
    );
}
