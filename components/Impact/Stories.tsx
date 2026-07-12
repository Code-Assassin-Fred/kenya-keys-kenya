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
// Set this toggle to true to block the videos and show the GCP Billing error, or false to restore them.
const isBillingSuspended = false;


/* ── Google Cloud Billing Thumbnail Error Layout ── */
function GcpThumbnailError({ url }: { url: string }) {
    return (
        <div className="absolute inset-0 bg-[#FFF5F5] border-2 border-[#E53E3E] p-4 font-mono text-[10px] sm:text-xs flex flex-col justify-between select-none">
            <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center gap-1.5 text-[#C53030] font-bold border-b border-red-200 pb-1.5">
                    <span className="text-xs sm:text-sm">⚠️</span>
                    <span>google.apis.storage.v1.StorageException</span>
                </div>
                <div className="text-[#C53030] break-all leading-relaxed whitespace-pre-wrap font-semibold">
                    <span className="font-extrabold text-[#9B2C2C]">[403 Forbidden]</span> GET {url} net::ERR_ABORTED 403 (Forbidden)
                </div>
                <div className="text-gray-700 bg-red-100/60 p-1.5 sm:p-2 rounded border border-red-200 mt-1 sm:mt-2 text-[9px] sm:text-[11px] leading-normal font-sans">
                    <p className="font-bold text-red-900 mb-0.5">BillingDisabledException</p>
                    The billing account for the owning project is disabled in state &apos;absent&apos;.
                </div>
            </div>
            <div className="text-right text-[8px] sm:text-[10px] text-[#C53030] font-black tracking-widest uppercase animate-pulse mt-1 font-sans">
                Click to view full diagnostic report
            </div>
        </div>
    );
}

/* ── Google Cloud Billing Lightbox Error Layout ── */
function GcpLightboxError({ video, onClose }: { video: typeof videoStories[0]; onClose: () => void }) {
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
                className="fixed top-6 right-6 z-[10000] w-12 h-12 bg-white/10 hover:bg-[#E53E3E] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl backdrop-blur-md"
                aria-label="Close error report"
            >
                <X size={28} />
            </button>

            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="relative w-full max-w-3xl bg-white rounded-xl overflow-hidden shadow-2xl border border-[#E53E3E]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Google Cloud Header */}
                <div className="bg-[#f8f9fa] border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Google Cloud SVG Logo */}
                        <svg className="w-6 h-6 shrink-0" viewBox="0 -25 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M170.2517,56.8186 L192.5047,34.5656 L193.9877,25.1956 C153.4367,-11.6774 88.9757,-7.4964 52.4207,33.9196 C42.2667,45.4226 34.7337,59.7636 30.7167,74.5726 L38.6867,73.4496 L83.1917,66.1106 L86.6277,62.5966 C106.4247,40.8546 139.8977,37.9296 162.7557,56.4286 L170.2517,56.8186 Z" fill="#EA4335"></path>
                            <path d="M224.2048,73.9182 C219.0898,55.0822 208.5888,38.1492 193.9878,25.1962 L162.7558,56.4282 C175.9438,67.2042 183.4568,83.4382 183.1348,100.4652 L183.1348,106.0092 C198.4858,106.0092 210.9318,118.4542 210.9318,133.8052 C210.9318,149.1572 198.4858,161.2902 183.1348,161.2902 L127.4638,161.2902 L121.9978,167.2242 L121.9978,200.5642 L127.4638,205.7952 L183.1348,205.7952 C223.0648,206.1062 255.6868,174.3012 255.9978,134.3712 C256.1858,110.1682 244.2528,87.4782 224.2048,73.9182" fill="#4285F4"></path>
                            <path d="M71.8704,205.7957 L127.4634,205.7957 L127.4634,161.2897 L71.8704,161.2897 C67.9094,161.2887 64.0734,160.4377 60.4714,158.7917 L52.5844,161.2117 L30.1754,183.4647 L28.2234,191.0387 C40.7904,200.5277 56.1234,205.8637 71.8704,205.7957" fill="#34A853"></path>
                            <path d="M71.8704,61.4255 C31.9394,61.6635 -0.2366,94.2275 0.0014,134.1575 C0.1344,156.4555 10.5484,177.4455 28.2234,191.0385 L60.4714,158.7915 C46.4804,152.4705 40.2634,136.0055 46.5844,122.0155 C52.9044,108.0255 69.3704,101.8085 83.3594,108.1285 C89.5244,110.9135 94.4614,115.8515 97.2464,122.0155 L129.4944,89.7685 C115.7734,71.8315 94.4534,61.3445 71.8704,61.4255" fill="#FBBC05"></path>
                        </svg>
                        <span className="font-outfit font-medium text-gray-700 text-sm tracking-wide">Google Cloud Console</span>
                    </div>
                    <span className="text-xs font-mono bg-red-100 text-[#C53030] px-2 py-0.5 rounded font-black uppercase">
                        Billing Suspended
                    </span>
                </div>

                {/* Error Body */}
                <div className="p-6 md:p-8 space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                            <span className="text-[#E53E3E] text-lg font-bold">⚠️</span>
                        </div>
                        <div className="space-y-1.5">
                            <h4 className="text-lg font-black text-[#E53E3E] font-outfit uppercase tracking-tight">
                                Error 402: Payment Required
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed font-outfit">
                                The Google Cloud Platform billing account associated with this project is currently suspended or inactive. Hosted assets in this storage bucket cannot be served.
                            </p>
                        </div>
                    </div>

                    {/* Console Log block */}
                    <div className="bg-neutral-950 rounded-lg p-5 font-mono text-[10px] sm:text-[11px] leading-relaxed text-[#F56565] border border-neutral-800 shadow-inner max-h-60 overflow-y-auto">
                        <div className="text-neutral-500 border-b border-neutral-800 pb-2 mb-2 flex justify-between select-none font-sans">
                            <span>CONSOLE REPORT (STDOUT/ERR)</span>
                            <span>API v1</span>
                        </div>
                        <span className="text-[#E53E3E] font-bold">ERROR: </span>
                        <span className="text-neutral-200">google.apis.storage.v1.StorageException: The billing account for the owning project is disabled in state &apos;absent&apos;.</span>
                        <div className="mt-2 text-neutral-400 pl-4 border-l border-neutral-850 space-y-1">
                            <p><span className="text-neutral-500">Method:</span> GET</p>
                            <p><span className="text-neutral-500">URI:</span> <span className="break-all text-neutral-300">{video.url}</span></p>
                            <p><span className="text-neutral-500">Status Code:</span> <span className="text-[#E53E3E] font-bold">403 Forbidden</span></p>
                            <p><span className="text-neutral-500">Exception:</span> BillingDisabledException</p>
                            <p><span className="text-neutral-500">Project ID:</span> kenya-keys-11a15</p>
                            <p><span className="text-neutral-500">Timestamp:</span> {new Date().toISOString()}</p>
                        </div>
                    </div>

                    {/* Action message */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-xs leading-relaxed text-[#9B2C2C] font-outfit">
                        <p className="font-bold mb-1 uppercase tracking-wide text-[#742A2A]">How to restore services:</p>
                        To resolve this and re-enable video streaming, the project owner must update the payment instrument or settle any outstanding balances in the <a href="https://console.cloud.google.com/billing" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-[#C53030]">Google Cloud Billing Console</a>. Services will resume automatically within a few minutes after billing reactivation.
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                        <button 
                            onClick={onClose}
                            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors font-outfit cursor-pointer"
                        >
                            Close Report
                        </button>
                        <a 
                            href="https://console.cloud.google.com/billing"
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold tracking-wide text-center transition-colors font-outfit shadow-sm cursor-pointer"
                        >
                            Go to Billing Console
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ── Video Thumbnail — Autoplays muted in background, no hover gating ── */
function VideoThumbnail({ story, onClick }: { story: typeof videoStories[0]; onClick: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isBillingSuspended) return; // Do not observe if billing is suspended

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
            {isBillingSuspended ? (
                <GcpThumbnailError url={story.url} />
            ) : (
                <>
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
                </>
            )}
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

            {/* Video Lightbox Modal / Error Report Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    isBillingSuspended ? (
                        <GcpLightboxError
                            key={selectedVideo.url}
                            video={selectedVideo}
                            onClose={() => setSelectedVideo(null)}
                        />
                    ) : (
                        <VideoLightbox
                            key={selectedVideo.url}
                            video={selectedVideo}
                            onClose={() => setSelectedVideo(null)}
                        />
                    )
                )}
            </AnimatePresence>
        </section>
    );
}

