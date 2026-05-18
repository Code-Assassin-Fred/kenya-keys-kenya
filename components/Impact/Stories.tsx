'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Play, Volume2, VolumeX, AlertCircle } from 'lucide-react';

const videoStories = [
    {
        name: "James's Story",
        title: "James Mbandi: Journey of Excellence",
        text: "Follow the inspiring journey of James as he overcomes obstacles to achieve academic greatness. Through the support of Kenya Keys, he was able to unlock his potential and pave a path of excellence for himself and his community.",
        url: "/STUDENT STORIES-20260517T114352Z-3-001/STUDENT STORIES/JAMES MBANDI UPDATED.mp4",
        image: "/image6.png",
        color: "#1D366D"
    },
    {
        name: "Ben's Story",
        title: "Bishop Ben: Alumni Empowerment",
        text: "See how education and timely sponsorship opened doors for Ben to become a community leader and a bishop. His story is a testament to the compounding power of education in transforming whole villages.",
        url: "/ALUMNI STORIES-20260517T114708Z-3-001/ALUMNI STORIES/Bishop Ben .mp4",
        image: "/image3.png",
        color: "#00529B"
    },
    {
        name: "Laptop Program",
        title: "Digital Bridge: Laptop Distribution",
        text: "Closing the digital divide in rural Kenya. By providing high-achieving high school and college students with laptops, we enable them to access modern learning resources, research tools, and global opportunities.",
        url: "/PROGRAM VIDEOS-20260517T114507Z-3-002/PROGRAM VIDEOS/Laptop Distribution .mp4",
        image: "/image2.png",
        color: "#2E7D32"
    },
    {
        name: "Samuel's Story",
        title: "Samuel Rai: A Legacy of Leadership",
        text: "Discover how Samuel Rai leveraged his education to uplift his community, proving that when you sponsor one student, you inspire and elevate a whole generation of future leaders.",
        url: "/ALUMNI STORIES-20260517T114708Z-3-001/ALUMNI STORIES/SAMUEL RAI.mp4",
        image: "/image5.png",
        color: "#E65100"
    },
    {
        name: "Goal Ball",
        title: "Inclusion in Action: Goal Ball",
        text: "Promoting physical education and inclusion through the Goal Ball program. This initiative brings joy, athletic training, and a deep sense of belonging to visually impaired students in our community.",
        url: "/OTHER ACTIVITIES-20260517T114642Z-3-001/OTHER ACTIVITIES/GOAL BALL.mp4",
        image: "/image4.png",
        color: "#00838F"
    },
    {
        name: "Transformation",
        title: "Empowering Futures: Long-Term Growth",
        text: "A beautiful look into how Kenya Keys is transforming lives through long-term educational commitment. See the smiles, the hopes, and the tangible community progress driven by collective action.",
        url: "/POEMS SHORTS VIDEOS-20260517T114614Z-3-001/POEMS SHORTS VIDEOS/0225 (3).mp4",
        image: "/image7.png",
        color: "#6A1B9A"
    }
];

/* ── Video Lightbox — lazy-loads video ONLY when opened ── */
function VideoLightbox({ video, onClose }: { video: typeof videoStories[0]; onClose: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [state, setState] = useState<'loading' | 'playing' | 'error' | 'slow'>('loading');
    const [isMuted, setIsMuted] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const slowTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Attempt to play when enough data is available
    const tryPlay = useCallback(() => {
        const vid = videoRef.current;
        if (!vid) return;
        vid.play()
            .then(() => {
                setState('playing');
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                if (slowTimeoutRef.current) clearTimeout(slowTimeoutRef.current);
            })
            .catch(() => {
                // Browser blocked autoplay — that's okay, user can click play
                setState('playing');
            });
    }, []);

    useEffect(() => {
        const vid = videoRef.current;
        if (!vid) return;

        // Show "slow connection" message after 5 seconds
        slowTimeoutRef.current = setTimeout(() => {
            setState(prev => prev === 'loading' ? 'slow' : prev);
        }, 5000);

        // Hard timeout: after 15s without playback, show error with direct link
        timeoutRef.current = setTimeout(() => {
            setState(prev => (prev === 'loading' || prev === 'slow') ? 'error' : prev);
        }, 15000);

        const onCanPlay = () => tryPlay();
        const onPlaying = () => {
            setState('playing');
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (slowTimeoutRef.current) clearTimeout(slowTimeoutRef.current);
        };
        const onWaiting = () => {
            // Only show loading if we haven't started playing yet
        };
        const onError = () => setState('error');
        const onProgress = () => {
            if (vid.buffered.length > 0) {
                const bufferedEnd = vid.buffered.end(vid.buffered.length - 1);
                const pct = vid.duration ? (bufferedEnd / vid.duration) * 100 : 0;
                setLoadProgress(Math.min(pct, 100));
            }
        };

        vid.addEventListener('canplay', onCanPlay);
        vid.addEventListener('playing', onPlaying);
        vid.addEventListener('waiting', onWaiting);
        vid.addEventListener('error', onError);
        vid.addEventListener('progress', onProgress);

        // Start loading
        vid.load();

        return () => {
            vid.removeEventListener('canplay', onCanPlay);
            vid.removeEventListener('playing', onPlaying);
            vid.removeEventListener('waiting', onWaiting);
            vid.removeEventListener('error', onError);
            vid.removeEventListener('progress', onProgress);
            vid.pause();
            vid.removeAttribute('src');
            vid.load(); // release memory
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (slowTimeoutRef.current) clearTimeout(slowTimeoutRef.current);
        };
    }, [tryPlay]);

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const toggleMute = () => {
        const vid = videoRef.current;
        if (vid) {
            vid.muted = !vid.muted;
            setIsMuted(vid.muted);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 md:p-12"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,82,155,0.3)]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* The actual video element */}
                <video
                    ref={videoRef}
                    src={video.url}
                    controls
                    autoPlay
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    className={`w-full h-full object-contain transition-opacity duration-300 ${state === 'playing' ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* Loading / Slow / Error overlay */}
                {state !== 'playing' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-gray-900 to-black">
                        {state === 'loading' && (
                            <>
                                <div className="relative w-16 h-16">
                                    <div className="absolute inset-0 border-3 border-white/10 rounded-full" />
                                    <div className="absolute inset-0 border-3 border-transparent border-t-[#FFB800] rounded-full animate-spin" />
                                    <div className="absolute inset-2 border-2 border-transparent border-t-[#00529B] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
                                </div>
                                <p className="text-white/70 text-sm font-outfit">Loading video...</p>
                                {loadProgress > 0 && (
                                    <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#FFB800] rounded-full transition-all duration-300"
                                            style={{ width: `${loadProgress}%` }}
                                        />
                                    </div>
                                )}
                            </>
                        )}

                        {state === 'slow' && (
                            <>
                                <div className="relative w-16 h-16">
                                    <div className="absolute inset-0 border-3 border-white/10 rounded-full" />
                                    <div className="absolute inset-0 border-3 border-transparent border-t-[#FFB800] rounded-full animate-spin" />
                                </div>
                                <p className="text-white/90 text-sm font-outfit font-semibold">Large video file — still loading...</p>
                                <p className="text-white/50 text-xs font-outfit max-w-xs text-center">
                                    This may take a moment on slower connections. You can also watch directly:
                                </p>
                                {loadProgress > 0 && (
                                    <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#FFB800] rounded-full transition-all duration-300"
                                            style={{ width: `${loadProgress}%` }}
                                        />
                                    </div>
                                )}
                                <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 px-6 py-2.5 bg-[#00529B] hover:bg-[#FFB800] text-white text-sm font-outfit font-bold rounded-lg transition-colors duration-300"
                                >
                                    Open Video Directly ↗
                                </a>
                            </>
                        )}

                        {state === 'error' && (
                            <>
                                <AlertCircle size={40} className="text-[#FFB800]" />
                                <p className="text-white/90 text-sm font-outfit font-semibold">Unable to load video in browser</p>
                                <p className="text-white/50 text-xs font-outfit max-w-xs text-center">
                                    The video file is very large. Click below to watch it directly.
                                </p>
                                <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 px-6 py-2.5 bg-[#00529B] hover:bg-[#FFB800] text-white text-sm font-outfit font-bold rounded-lg transition-colors duration-300"
                                >
                                    Watch Video ↗
                                </a>
                            </>
                        )}
                    </div>
                )}

                {/* Unmute hint — shows briefly when playing muted */}
                {state === 'playing' && isMuted && (
                    <motion.button
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: 3, duration: 1 }}
                        onClick={toggleMute}
                        className="absolute bottom-16 left-4 z-10 flex items-center gap-2 px-4 py-2 bg-black/70 hover:bg-[#00529B] text-white text-xs font-outfit rounded-full backdrop-blur-md transition-colors"
                    >
                        <VolumeX size={16} />
                        <span>Tap to unmute</span>
                    </motion.button>
                )}

                {/* Mute/Unmute toggle */}
                {state === 'playing' && (
                    <button
                        onClick={toggleMute}
                        className="absolute top-4 left-4 z-10 w-10 h-10 bg-black/40 hover:bg-[#00529B] text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md"
                    >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                )}

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 shrink-0 w-12 h-12 bg-white/10 hover:bg-[#FFB800] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl backdrop-blur-md"
                >
                    <X size={28} />
                </button>
            </motion.div>
        </motion.div>
    );
}

/* ── Main Component ── */
export default function Stories() {
    const [selectedVideo, setSelectedVideo] = useState<typeof videoStories[0] | null>(null);

    // Lock scroll when modal is open
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
                                <div
                                    onClick={() => setSelectedVideo(story)}
                                    className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
                                    style={{
                                        boxShadow: `0 20px 40px -15px ${story.color}33`
                                    }}
                                >
                                    {/* Thumbnail Image */}
                                    <Image
                                        src={story.image}
                                        alt={story.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        sizes="(max-w-768px) 100vw, 50vw"
                                        priority={idx < 2}
                                    />

                                    {/* Animated Play Overlay */}
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-500 flex items-center justify-center">
                                        <div 
                                            className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl relative"
                                            style={{
                                                background: `linear-gradient(135deg, ${story.color}dd 0%, ${story.color}aa 100%)`,
                                                border: "2px solid rgba(255, 255, 255, 0.4)"
                                            }}
                                        >
                                            {/* Pulse effect */}
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
                                    
                                    {/* Watch overlay hint */}
                                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-white/90 text-xs font-outfit tracking-wide">
                                        Click to Play Video 🎥
                                    </div>
                                </div>
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
