'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail('');
        }
    };

    return (
        <section className="py-24 bg-[#1D366D] overflow-hidden relative">
            {/* Background Svg Curves */}
            <div className="absolute inset-0 z-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none">
                    <path d="M0,100 C480,300 960,0 1440,200 L1440,400 L0,400 Z" fill="white" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-oswald uppercase leading-tight mb-6 tracking-tight">
                                NEVER MISS <br />
                                AN <span className="text-[#FFB800]">UPDATE</span>
                            </h2>
                            <p className="text-xl text-blue-100 font-outfit font-light leading-relaxed">
                                Join our community of supporters and receive monthly stories of impact, program updates, and news from rural Kenya directly in your inbox.
                            </p>
                        </motion.div>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl relative"
                        >
                            {!submitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-gray-400 font-outfit ml-4">Email Address</label>
                                        <div className="relative">
                                            <input 
                                                type="email" 
                                                id="email"
                                                required
                                                placeholder="you@example.com"
                                                className="w-full pl-6 pr-16 py-5 rounded-full bg-gray-50 border border-gray-100 focus:border-[#00529B] outline-none font-outfit text-gray-800 transition-all text-lg"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <button 
                                                type="submit"
                                                className="absolute right-2 top-2 bottom-2 w-12 h-12 bg-[#00529B] text-white rounded-full flex items-center justify-center hover:bg-[#001D4A] transition-all shadow-lg"
                                            >
                                                <Send className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-outfit text-center px-6">
                                        By subscribing, you agree to receive our newsletter and agree with our Privacy Policy. You can unsubscribe at any time.
                                    </p>
                                </form>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-6"
                                >
                                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h4 className="text-2xl font-black text-[#1D366D] font-oswald uppercase mb-2">You're on the list!</h4>
                                    <p className="text-gray-600 font-outfit">
                                        Thank you for joining us. We'll send our latest update to your inbox soon.
                                    </p>
                                    <button 
                                        onClick={() => setSubmitted(false)}
                                        className="mt-8 text-[10px] font-black uppercase tracking-widest text-[#00529B] border-b border-[#00529B] pb-1 font-outfit"
                                    >
                                        Subscribe another email
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
