'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X } from 'lucide-react';

import { videoStories, VideoStory } from '@/lib/videosData';

/* ── Video Lightbox — Plays video cleanly directly in the browser ── */
function VideoLightbox({ video, onClose }: { video: typeof videoStories[0]; onClose: () => void }) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 md:p-12 backdrop-blur-md"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="fixed top-6 right-6 z-[10000] w-12 h-12 bg-white/10 hover:bg-[#FFB800] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl backdrop-blur-md"
                aria-label="Close video player"
            >
                <X size={28} />
            </button>

            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <video
                    src={video.url}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    className="w-full h-full object-contain"
                    title={video.title}
                    aria-label={video.title}
                >
                    Your browser does not support the video tag.
                </video>
            </motion.div>
        </motion.div>
    );
}

/* ── Video Thumbnail — Autoplays muted in background, no hover gating ── */
function VideoThumbnail({ story, onClick }: { story: typeof videoStories[0]; onClick: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Use IntersectionObserver to autoplay when visible
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play().catch(() => {
                            // Autoplay may be blocked, that's ok
                        });
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            onClick={onClick}
            className="relative aspect-[5/3] rounded-sm overflow-hidden shadow-2xl cursor-pointer group"
            style={{
                boxShadow: '0 20px 40px -15px rgba(29, 54, 109, 0.2)'
            }}
        >
            {/* Video autoplays muted in background */}
            <video
                ref={videoRef}
                src={story.url}
                muted
                playsInline
                preload="metadata"
                loop
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                title={story.title}
                aria-label={story.title}
            />

            {/* Subtle gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* "Click to play" tag */}
            <span
                className="absolute top-6 left-6 px-4 py-1.5 text-white text-xs font-black font-outfit tracking-widest uppercase rounded-none shadow-lg backdrop-blur-md border border-white/10"
                style={{ backgroundColor: 'rgba(29, 54, 109, 0.85)' }}
            >
                Click to play
            </span>
        </div>
    );
}

/* ── Main Component ── */
export default function Stories() {
    const [selectedVideo, setSelectedVideo] = useState<typeof videoStories[0] | null>(null);

    // Lock body scroll when lightbox modal is open
    useEffect(() => {
        if (selectedVideo) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedVideo]);

    return (
        <section id="stories" className="py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                {/* Alternating Video Stories */}
                <div className="space-y-28">
                    {videoStories.map((story, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20`}
                        >
                            {/* Video Thumbnail Section */}
                            <div className="w-full md:w-[65%]">
                                <VideoThumbnail
                                    story={story}
                                    onClick={() => setSelectedVideo(story)}
                                />
                            </div>

                            {/* Description Section */}
                            <div className="w-full md:w-[35%] flex flex-col items-start">
                                <h3 className="text-xl font-black text-[#1D366D] font-oswald uppercase mb-4 tracking-tight leading-snug">
                                    {story.title}
                                </h3>
                                <p className="text-lg text-gray-600 font-outfit leading-relaxed">
                                    {story.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Video Lightbox Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <VideoLightbox
                        key={selectedVideo.url}
                        video={selectedVideo}
                        onClose={() => setSelectedVideo(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
