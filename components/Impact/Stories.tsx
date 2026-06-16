'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from 'lucide-react';

const videoStories = [
    {
        name: "Student Sponsorship",
        title: "Sponsorship #1001: A Student Transformed",
        text: "Follow the incredible journey of student #1001 whose life was forever changed through the Kenya Keys sponsorship program. From struggling to afford school fees to excelling academically, this story embodies the transformative power of education.",
        url: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/1001_Updated.mp4",
        color: "#1D366D"
    },
    {
        name: "Freedom Kits",
        title: "Freedom Kits: Keeping Girls in School",
        text: "Discover how Freedom Kits are breaking barriers for girls' education in rural Kenya. By providing essential sanitary supplies, Kenya Keys ensures that no girl has to miss school, empowering them to stay on track and reach their full potential.",
        url: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/Freedom%20Kits_Updated.mp4",
        color: "#00529B"
    },
    {
        name: "Laptop Program",
        title: "Digital Bridge: Laptop Distribution",
        text: "Closing the digital divide in rural Kenya. By providing high-achieving high school and college students with laptops, we enable them to access modern learning resources, research tools, and global opportunities that were once out of reach.",
        url: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/Laptop%20Distribution_Updated.mp4",
        color: "#2E7D32"
    }
];

/* ── Video Lightbox — Plays video cleanly directly in the browser ── */
function VideoLightbox({ video, onClose }: { video: typeof videoStories[0]; onClose: () => void }) {
    // Close modal on Escape key press
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
            {/* Close Button positioned in the top-right corner of the viewport */}
            <button
                onClick={onClose}
                className="fixed top-6 right-6 z-[10000] w-12 h-12 bg-white/10 hover:bg-[#FFB800] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl backdrop-blur-md"
                aria-label="Close video player"
            >
                <X size={28} />
            </button>

            {/* Video Container */}
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
                    onLoadStart={() => console.log('Lightbox Video: Load started for', video.url)}
                    onLoadedMetadata={(e) => console.log('Lightbox Video: Metadata loaded. Duration:', e.currentTarget.duration)}
                    onCanPlay={() => console.log('Lightbox Video: Can play now')}
                    onPlay={() => console.log('Lightbox Video: Play started')}
                    onPause={() => console.log('Lightbox Video: Paused')}
                    onWaiting={() => console.log('Lightbox Video: Waiting (buffering...)')}
                    onStalled={() => console.log('Lightbox Video: Stalled')}
                    onError={(e) => {
                        const vid = e.currentTarget;
                        console.error('Lightbox Video: ERROR details:', {
                            networkState: vid.networkState,
                            readyState: vid.readyState,
                            currentSrc: vid.currentSrc,
                            error: vid.error ? {
                                code: vid.error.code,
                                message: vid.error.message
                            } : null
                        });
                    }}
                >
                    Your browser does not support the video tag.
                </video>
            </motion.div>
        </motion.div>
    );
}

/* ── Video Thumbnail — Preloads metadata for fast load and plays preview on hover ── */
function VideoThumbnail({ story, onClick }: { story: typeof videoStories[0]; onClick: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            console.log(`Thumbnail Video (${story.name}): Hover play attempt`);
            videoRef.current.play().catch((err) => {
                console.warn(`Thumbnail Video (${story.name}): Hover play blocked/failed`, err);
            });
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            console.log(`Thumbnail Video (${story.name}): Hover pause`);
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
            style={{
                boxShadow: `0 20px 40px -15px ${story.color}33`
            }}
        >
            {/* Video as preview — preloads metadata so first frame is visible, plays on hover */}
            <video
                ref={videoRef}
                src={story.url}
                muted
                playsInline
                preload="metadata"
                loop
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                onLoadStart={() => console.log(`Thumbnail Video (${story.name}): Load started`)}
                onLoadedMetadata={(e) => console.log(`Thumbnail Video (${story.name}): Metadata loaded. Duration:`, e.currentTarget.duration)}
                onError={(e) => {
                    const error = e.currentTarget.error;
                    console.error(`Thumbnail Video (${story.name}): ERROR!`, {
                        code: error?.code,
                        message: error?.message
                    });
                }}
            />

            {/* Animated Play Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                <div
                    className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl relative"
                    style={{
                        background: `linear-gradient(135deg, ${story.color}dd 0%, ${story.color}aa 100%)`,
                        border: "2px solid rgba(255, 255, 255, 0.4)"
                    }}
                >
                    <div className="absolute inset-0 rounded-full bg-white/10 animate-ping scale-110 opacity-75 group-hover:bg-[#FFB800]/20" />
                    <Play
                        fill="white"
                        size={30}
                        className="ml-1 text-white transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
            </div>

            {/* Floating Tag */}
            <span
                className="absolute top-6 left-6 px-4 py-1.5 text-white text-xs font-black font-outfit tracking-widest uppercase rounded-full shadow-lg backdrop-blur-md border border-white/10"
                style={{ backgroundColor: `${story.color}e6` }}
            >
                {story.name}
            </span>

            {/* Play hint overlay */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-white/90 text-xs font-outfit tracking-wide">
                Click to Open Player 🎥
            </div>
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
                <div className="text-center mb-24">
                    <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase leading-none mb-6 tracking-tight">
                        STORIES OF <span className="text-[#00529B]">STRENGTH</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-[#FFB800] mx-auto rounded-full" />
                    <p className="text-gray-600 font-outfit max-w-2xl mx-auto mt-6 text-lg">
                        Experience the real-world difference your support makes through these recorded moments of transformation and community progress.
                    </p>
                </div>

                {/* Alternating Video Stories */}
                <div className="space-y-32">
                    {videoStories.map((story, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
                        >
                            {/* Video Thumbnail Section */}
                            <div className="w-full md:w-1/2">
                                <VideoThumbnail
                                    story={story}
                                    onClick={() => setSelectedVideo(story)}
                                />
                            </div>

                            {/* Story Info Section */}
                            <div className="w-full md:w-1/2 flex flex-col items-start">
                                <span
                                    className="font-black tracking-[0.2em] uppercase text-sm mb-4 block font-outfit"
                                    style={{ color: story.color }}
                                >
                                    {story.name}
                                </span>
                                <h3 className="text-2xl md:text-4xl font-black text-[#333] font-oswald uppercase leading-tight mb-6 tracking-tight">
                                    {story.title}
                                </h3>
                                <p className="text-lg text-gray-600 font-outfit leading-relaxed mb-8">
                                    {story.text}
                                </p>

                                <button
                                    onClick={() => setSelectedVideo(story)}
                                    className="inline-flex items-center gap-3 px-8 py-4 text-white font-bold font-outfit text-sm rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
                                    style={{
                                        backgroundColor: story.color,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#FFB800';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = story.color;
                                    }}
                                >
                                    <Play size={16} fill="white" className="text-white" />
                                    <span>WATCH FULL VIDEO</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Video Lightbox Modal — only mounts when a video is selected */}
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
