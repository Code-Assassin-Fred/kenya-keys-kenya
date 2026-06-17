'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const MotionImage = motion(Image);

const galleryImages = [
    { src: "/image2.webp", alt: "Kenya Keys students in classroom learning session" },
    { src: "/image4.webp", alt: "Kenya Keys library study session in rural Kenya" },
    { src: "/image6.webp", alt: "Kenya Keys community education meeting" },
    { src: "/image7.webp", alt: "Kenya Keys student graduation celebration ceremony" },
    { src: "/image8.webp", alt: "Kenya Keys computer lab digital literacy learning" },
    { src: "/image9.webp", alt: "Kenya Keys new school construction project" },
    { src: "/image10.webp", alt: "Kenya Keys education team photo in Kenya" },
    { src: "/image11.webp", alt: "Kenya Keys student mentorship session" },
    { src: "/image12.webp", alt: "Kenya Keys outdoor education program learning" },
    { src: "/image13.webp", alt: "Kenya Keys sponsored students with textbooks" },
    { src: "/image14.webp", alt: "Kenya Keys vocational training program" },
    { src: "/image15.webp", alt: "Kenya Keys Community Education Center campus" }
];

export default function PhotoGallery() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const openLightbox = (index: number) => {
        setSelectedImage(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImage !== null) {
            setSelectedImage((selectedImage + 1) % galleryImages.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImage !== null) {
            setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
        }
    };

    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase tracking-tight mb-6">
                        PHOTO <span className="text-[#00529B]">GALLERY</span>
                    </h2>
                    <p className="text-xl text-gray-600 font-outfit max-w-2xl mx-auto font-light">
                        A visual journey through our programs, campus, and the incredible students who make Kenya Keys possible.
                    </p>
                </div>

                <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                    {galleryImages.map((image, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: idx * 0.05 }}
                            className="relative group cursor-pointer overflow-hidden rounded-[30px] shadow-sm hover:shadow-2xl transition-all duration-500"
                            onClick={() => openLightbox(idx)}
                        >
                            <Image 
                                src={image.src} 
                                alt={image.alt} 
                                width={600}
                                height={450}
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-[#00529B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="bg-white/90 p-4 rounded-full scale-50 group-hover:scale-100 transition-transform duration-300">
                                    <Maximize2 className="w-6 h-6 text-[#00529B]" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                        onClick={closeLightbox}
                    >
                        <button 
                            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors p-1 md:p-2"
                            onClick={closeLightbox}
                        >
                            <X className="w-8 h-8 md:w-10 md:h-10" />
                        </button>

                        <div className="relative w-full max-w-5xl max-h-full flex items-center justify-center">
                            <button 
                                className="absolute left-0 md:-left-20 text-white/50 hover:text-white transition-colors p-2 md:p-4"
                                onClick={prevImage}
                            >
                                <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
                            </button>

                            <MotionImage 
                                key={selectedImage}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                src={galleryImages[selectedImage].src} 
                                alt={galleryImages[selectedImage].alt} 
                                width={1200}
                                height={900}
                                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl cursor-default"
                                onClick={(e) => e.stopPropagation()}
                            />

                            <button 
                                className="absolute right-0 md:-right-20 text-white/50 hover:text-white transition-colors p-2 md:p-4"
                                onClick={nextImage}
                            >
                                <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
                            </button>
                        </div>

                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 font-outfit text-sm font-bold uppercase tracking-widest text-center px-6">
                            {galleryImages[selectedImage].alt}
                            <div className="mt-2 text-white/40 text-xs font-normal">
                                {selectedImage + 1} / {galleryImages.length}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
