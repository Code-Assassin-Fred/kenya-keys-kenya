'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X } from 'lucide-react';

const videoStories = [
    {
        url: "https://storage.googleapis.com/kenyakeysvideos/Student%20Stories/James%20Mbandi%20Updated_Updated.mp4",
        description: "A sponsored student shares how Kenya Keys transformed his journey from financial hardship to pursuing a diploma in orthopedic and trauma medicine at a top medical training college in Nairobi — fulfilling a lifelong dream of becoming a doctor.",
    },
    {
        url: "https://storage.googleapis.com/kenyakeysvideos/Student%20Stories/Samuel%20And%20Aisha%20Homevisit_Updated.mp4",
        description: "A Kenya Keys home visit to two secondary school students who recently lost their mother. The visit captures the organization's commitment to walking alongside students through life's hardest moments, ensuring they stay in school and keep their dreams alive.",
    },
    {
        url: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/1001_Updated.mp4",
        description: "A passionate librarian at Kenya Keys shares what it means to give students access to books and education they wouldn't otherwise have at home — and how the library empowers young people to grow and thrive.",
    },
    {
        url: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/Mobile%20Library_Updated.mp4",
        description: "Kenya Keys takes its mobile library on the road — delivering storybooks and games to a primary school 20 kilometers away — helping children improve their reading skills and explore their future possibilities.",
    },
    {
        url: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/Food%20Donation%201_Updated.mp4",
        description: "In a region hit hard by drought, Kenya Keys steps in to donate food to students in need — ensuring that hunger doesn't stand between children and their education during exam season.",
    },
    {
        url: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/Eunice%20Homevisit_Updated.mp4",
        description: "The Kenya Keys community library is changing lives — with 25,000 donated books fueling curiosity, supporting learning through evening sessions and mobile outreach, and inspiring students from families who could never afford books to dream bigger.",
    },
    {
        url: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/Laptop%20Distribution_Updated.mp4",
        description: "Kenya Keys distributes 100 donated laptops to college and university students — a lifeline in an era where the entire academic syllabus has moved online, giving students from financially struggling families a fair chance to compete and succeed.",
    },
    {
        url: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/Sanitary_Updated.mp4",
        description: "Kenya Keys distributes reusable sanitary pads to schoolgirls — removing a hidden barrier that once forced many to miss class and risk dropping out. The initiative is helping girls stay in school and keeping early marriage and pregnancy rates down.",
    },
    {
        url: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/Sponsorship_Updated.mp4",
        description: "Newly selected Kenya Keys scholarship students — from Grade 10 to college level — are introduced and share their excitement. With sponsorship now in place, their potential and dreams have been unlocked.",
    },
    {
        url: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/Alumni%20Stories/Bishop%20Ben.mp4",
        description: "A Kenya Keys alumnus who grew up in a rural village shares how the support he received set him on a path to becoming a professional accountant — and today runs multiple businesses, a testament to what opportunity can unlock.",
    },
    {
        url: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/Alumni%20Stories/Samuel%20Rai_Updated.mp4",
        description: "A Kenya Keys alumnus recalls how a single sponsorship in Grade 8 changed everything — taking him from a family that struggled to afford meals to earning a certificate in early childhood education and building a stable, fulfilling life.",
    },
    {
        url: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/Other%20Stories/Goal%20Ball_Updated.mp4",
        description: "Kenya Keys hosts the first-ever goalball competition at its Education Center, bringing together visually impaired students from six coastal counties for a two-day event — providing a safe, welcoming space for inclusion and sport.",
    },
    {
        url: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/Other%20Stories/Office%20Days_Updated.mp4",
        description: "A look at Kenya Keys in action — students gather at the office to apply for sponsorship, collect support checks, and take their first steps toward a future where fees, transport, and accommodation are no longer obstacles to their dreams.",
    },
    {
        url: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/Student%20Short%20Videos/Catherine%20Bruno_Updated.mp4",
        description: "Once on the verge of dropping out due to unpaid school fees, this student shares how Kenya Keys stepped in, covered her costs, and gave her the chance to finish school with strong grades — now on her way to study medicine at university.",
    },
    {
        url: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/Student%20Short%20Videos/Daniel%20Mwalewa_Updated.mp4",
        description: "A Kenya Keys scholarship student shares how the support — covering tuition, transport, and accommodation — gave him a stable foundation to excel academically and pursue a career in clinical medicine.",
    },
    {
        url: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/Student%20Short%20Videos/Faloma%20Sponsor%20Student_Updated.mp4",
        description: "A Kenya Keys sponsored student at a national polytechnic pursuing a diploma in procurement and supply chain management shares how the scholarship — including a donated laptop — has allowed her to focus fully on her studies and future.",
    },
    {
        url: "https://storage.googleapis.com/kenyakeysvideos/Program%20Videos/Student%20Short%20Videos/Josephine%20Wayua_Updated.mp4",
        description: "After four years of Kenya Keys support, this student is now stepping into a nursing career — with plans to serve her community during her internship and a heart full of gratitude for the opportunity that made it all possible.",
    },
];

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
            className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
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
            />

            {/* Subtle gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* "Click to play" tag */}
            <span
                className="absolute top-6 left-6 px-4 py-1.5 text-white text-xs font-black font-outfit tracking-widest uppercase rounded-full shadow-lg backdrop-blur-md border border-white/10"
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
                            <div className="w-full md:w-1/2">
                                <VideoThumbnail
                                    story={story}
                                    onClick={() => setSelectedVideo(story)}
                                />
                            </div>

                            {/* Description Section — no heading, just description */}
                            <div className="w-full md:w-1/2 flex flex-col items-start">
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
