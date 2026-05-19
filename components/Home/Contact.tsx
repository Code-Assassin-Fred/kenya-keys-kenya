"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Contact() {
    return (
        <section id="contact" className="relative bg-white pt-16 pb-0 px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 items-stretch">

                {/* Left Side: Contact Form */}
                <div className="flex-1 pb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-playfair text-[#C5E672] mb-6 uppercase tracking-tighter">
                        Get in touch.
                    </h2>
                    <form className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-400 font-outfit">Name</label>
                            <input
                                type="text"
                                className="w-full py-2.5 bg-transparent border-b border-gray-200 focus:border-[#1D366D] outline-none transition-all font-outfit text-gray-800"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-400 font-outfit">Email</label>
                            <input
                                type="email"
                                className="w-full py-2.5 bg-transparent border-b border-gray-200 focus:border-[#1D366D] outline-none transition-all font-outfit text-gray-800"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-400 font-outfit">Phone</label>
                            <input
                                type="tel"
                                className="w-full py-2.5 bg-transparent border-b border-gray-200 focus:border-[#1D366D] outline-none transition-all font-outfit text-gray-800"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-400 font-outfit">In what type of space are you interested?</label>
                            <input
                                type="text"
                                className="w-full py-2.5 bg-transparent border-b border-gray-200 focus:border-[#1D366D] outline-none transition-all font-outfit text-gray-800"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-400 font-outfit">Message</label>
                            <textarea
                                rows={4}
                                className="w-full py-2.5 bg-transparent border border-gray-200 rounded-sm focus:border-[#1D366D] outline-none transition-all font-outfit text-gray-800 p-2"
                            />
                        </div>

                        <button
                            type="button"
                            className="w-full bg-[#1D366D] text-white py-4 rounded-3xl font-bold font-outfit text-lg hover:shadow-lg hover:bg-[#001D4A] transition-all"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* Right Side: Info & Image */}
                <div className="flex-1 flex flex-col pt-0">
                    {/* Top: Contact Info & Socials */}
                    <div className="flex justify-between items-start mb-12">
                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <svg className="w-6 h-6 text-gray-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div>
                                    <h5 className="font-bold text-gray-800 font-outfit">Taru, Kwale County, Kenya</h5>
                                    <p className="text-sm text-gray-500 font-outfit">Along Mombasa Highway</p>
                                    <p className="text-xs text-gray-400 font-outfit italic">*Opening doors to education and opportunity.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="font-bold text-gray-800 font-outfit">info@kenyakeys-pbokenya.org</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="font-bold text-gray-800 font-outfit">joseph@kenyakeys-pbokenya.org</span>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <a href="#" className="p-2 border border-gray-100 rounded-full hover:bg-gray-50 transition-all text-[#1D366D]">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.326V1.326c0-.729-.593-1.326-1.322-1.326z" /></svg>
                            </a>
                            <a href="#" className="p-2 border border-gray-100 rounded-full hover:bg-gray-50 transition-all text-[#1D366D]">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Bottom: Large Image - Cut off by bottom border */}
                    <div className="flex-1 relative min-h-[320px] rounded-t-3xl rounded-b-none overflow-hidden shadow-xl group">
                        <Image
                            src="/image4.png"
                            alt="Kenya Keys Interior"
                            fill
                            className="object-cover group-hover:scale-105 transition-all duration-700"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
