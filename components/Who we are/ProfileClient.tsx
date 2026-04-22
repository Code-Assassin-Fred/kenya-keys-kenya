'use client';

import { motion } from 'framer-motion';
import { LeadershipProfile } from '@/lib/leadershipData';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfileClient({ profile }: { profile: LeadershipProfile }) {
    const isFounder = profile.isFounder;

    return (
        <section className="pt-32 pb-24 bg-white min-h-screen relative overflow-hidden">
            {/* Dynamic colorful blob for uniqueness */}
            {isFounder && (
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#009bba]/10 to-[#00529B]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            )}
            
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <Link href="/who-we-are#leadership" className="inline-flex items-center gap-2 text-[#00529B] font-outfit uppercase tracking-widest text-sm font-bold mb-12 hover:text-[#009bba] transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Leadership
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10 max-w-5xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-4"
                    >
                        <div className={`relative rounded-[2rem] overflow-hidden bg-gray-100 ${isFounder ? 'border-4 border-[#00529B]/20 shadow-2xl p-2' : ''}`}>
                             <div className="aspect-[3/4] relative rounded-[1.5rem] overflow-hidden shadow-inner">
                                <img 
                                    src={profile.image} 
                                    alt={profile.name}
                                    className="w-full h-full object-cover grayscale brightness-110 hover:grayscale-0 transition-all duration-700" 
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "https://via.placeholder.com/600x800?text=No+Image";
                                    }}
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                                {isFounder && (
                                    <div className="absolute top-6 left-6 bg-[#FFB800] text-black px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest font-outfit shadow-lg">
                                        Visionary leadership
                                    </div>
                                )}
                             </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-8 pt-4"
                    >
                        <h1 className="text-3xl md:text-4xl font-black text-[#1A1A1A] font-oswald uppercase tracking-tight mb-2 leading-tight">
                            {profile.name}
                        </h1>
                        <h2 className={`font-outfit uppercase tracking-[0.2em] font-bold mb-8 ${isFounder ? 'text-[#00529B] text-sm' : 'text-[#009bba] text-sm'}`}>
                            {profile.role}
                        </h2>

                        <div className="space-y-6">
                            {profile.bio.map((paragraph, idx) => (
                                <motion.p 
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
                                    className="text-gray-600 font-outfit text-base leading-[1.8] max-w-3xl"
                                >
                                    {paragraph}
                                </motion.p>
                            ))}
                        </div>

                        {/* Accent divider line */}
                        <div className="h-1 w-24 bg-gradient-to-r from-[#00529B] to-[#009bba] mt-12 rounded-full" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
