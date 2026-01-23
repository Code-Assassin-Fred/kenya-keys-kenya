"use client"

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const images = [
    { id: 1, src: '/image1.JPG', alt: 'Community Success' },
    { id: 2, src: '/hero.png', alt: 'Education for All' },
    { id: 3, src: '/student-portrait.png', alt: 'Student Portrait' },
    { id: 4, src: '/vision.png', alt: 'Our Vision' },
    { id: 5, src: '/image1.JPG', alt: 'Learning Journey' },
    { id: 6, src: '/hero.png', alt: 'Future Leaders' },
    { id: 7, src: '/student-portrait.png', alt: 'Mentorship' },
    { id: 8, src: '/vision.png', alt: 'Impact' },
];

export function GalleryOverview() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(5);

    useEffect(() => {
        const updateVisibleCount = () => {
            if (window.innerWidth < 640) setVisibleCount(1);
            else if (window.innerWidth < 1024) setVisibleCount(3);
            else setVisibleCount(5);
        };

        updateVisibleCount();
        window.addEventListener('resize', updateVisibleCount);
        return () => window.removeEventListener('resize', updateVisibleCount);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % (images.length - visibleCount + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + (images.length - visibleCount + 1)) % (images.length - visibleCount + 1));
    };

    const canGoNext = currentIndex < images.length - visibleCount;
    const canGoPrev = currentIndex > 0;

    return (
        <section className="bg-black py-20 overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-4 relative">
                <div className="relative group">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        disabled={!canGoPrev}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 transition-all duration-300 rounded-full p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white ${!canGoPrev ? 'opacity-0 scale-90' : 'opacity-100'}`}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={nextSlide}
                        disabled={!canGoNext}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 transition-all duration-300 rounded-full p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white ${!canGoNext ? 'opacity-0 scale-90' : 'opacity-100'}`}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Carousel Container */}
                    <div className="flex gap-4 overflow-hidden">
                        <motion.div
                            className="flex gap-4"
                            animate={{
                                x: `-${currentIndex * (100 / visibleCount)}%`
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 40
                            }}
                            style={{
                                width: `${(images.length / visibleCount) * 100}%`
                            }}
                        >
                            {images.map((image) => (
                                <div
                                    key={image.id}
                                    className="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-900 group/item"
                                    style={{ width: `${100 / images.length}%` }}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover/item:scale-110"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                                    />
                                    {/* Subtle overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <p className="text-white text-sm font-medium">{image.alt}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Progress Bar (Optional, but adds a premium feel) */}
                <div className="mt-8 flex justify-center gap-2">
                    {Array.from({ length: images.length - visibleCount + 1 }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1 transition-all duration-300 rounded-full ${idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
