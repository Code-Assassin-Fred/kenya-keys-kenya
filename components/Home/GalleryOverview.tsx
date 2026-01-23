"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';

const images = [
    { id: 1, src: '/hero.png', alt: 'Future Leaders' },
    { id: 2, src: '/student-portrait.png', alt: 'Education for All' },
    { id: 3, src: '/image1.png', alt: 'Community Success' },
    { id: 4, src: '/image2.png', alt: 'Learning Journey' },
    { id: 5, src: '/image3.png', alt: 'Global Impact' },
    { id: 6, src: '/image4.png', alt: 'New Opportunities' },
    { id: 7, src: '/image5.png', alt: 'Student Success' },
    { id: 8, src: '/image6.png', alt: 'Youth Empowerment' },
];

export function GalleryOverview() {
    // Duplicate for seamless loop
    const doubledImages = [...images, ...images];

    return (
        <section className="bg-black py-24 overflow-hidden relative">
            {/* Edge Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, black, transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, black, transparent)' }} />

            <div className="w-full">
                <motion.div
                    className="flex gap-6"
                    animate={{
                        x: ["0%", "-50%"]
                    }}
                    transition={{
                        duration: 40,
                        ease: "linear",
                        repeat: Infinity
                    }}
                    style={{
                        width: 'fit-content'
                    }}
                >
                    {doubledImages.map((image, idx) => (
                        <div
                            key={`${image.id}-${idx}`}
                            className="relative w-[150px] md:w-[225px] aspect-[2/3] overflow-hidden rounded-xl bg-neutral-900 group/item shrink-0"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover/item:scale-105"
                                sizes="(max-width: 768px) 150px, 225px"
                            />
                            {/* Detailed overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex items-end p-4">
                                <div>
                                    <p className="text-white text-xs md:text-sm font-semibold tracking-wide uppercase">{image.alt}</p>
                                    <div className="w-8 h-1 bg-white mt-1 rounded-full transform scale-x-0 group-hover/item:scale-x-100 transition-transform origin-left duration-500" />
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
