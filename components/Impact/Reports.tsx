'use client';

import { useState } from 'react';
import { FileText, Plus, Minus, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { reportsData, YearGroup } from '@/lib/reports';

export default function Reports() {
    const [expandedYear, setExpandedYear] = useState<number | null>(2026);

    const toggleYear = (year: number) => {
        setExpandedYear(expandedYear === year ? null : year);
    };

    return (
        <section id="reports" className="py-24 bg-white font-outfit">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Left Side: Content & Image */}
                    <div className="lg:w-1/2">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 group">
                            <img 
                                src="/student-portrait.png" 
                                alt="Kenya Keys Student" 
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                        <h2 className="text-5xl font-black text-[#1D366D] mb-6 font-playfair tracking-tight">
                            Trust and Transparency
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed mb-8">
                            Donors, sponsors, and guests are welcome to view our financial statements and impact reports. We are committed to full accountability in every aspect of our work.
                        </p>
                    </div>

                    {/* Right Side: Accordion */}
                    <div className="lg:w-1/2 w-full space-y-4">
                        {reportsData.map((group: YearGroup) => (
                            <div 
                                key={group.year} 
                                className="border-b border-gray-200 last:border-0"
                            >
                                <button
                                    onClick={() => toggleYear(group.year)}
                                    className="w-full flex items-center justify-between py-6 text-left group"
                                >
                                    <span className={`text-2xl font-bold transition-colors duration-300 ${expandedYear === group.year ? 'text-[#1D366D]' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                        {group.year}
                                    </span>
                                    <div className={`p-2 rounded-full transition-all duration-300 ${expandedYear === group.year ? 'bg-[#1D366D] text-white rotate-0' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
                                        {expandedYear === group.year ? <Minus size={20} /> : <Plus size={20} />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {expandedYear === group.year && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-8 space-y-3">
                                                {group.reports.map((report, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={`/Reports/${report.filename}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 group/item transition-colors border border-transparent hover:border-gray-100"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600 group-hover/item:bg-red-600 group-hover/item:text-white transition-colors">
                                                                <FileText size={20} />
                                                            </div>
                                                            <span className="font-semibold text-gray-700 group-hover/item:text-[#1D366D] transition-colors">
                                                                {report.title}
                                                            </span>
                                                        </div>
                                                        <ExternalLink size={16} className="text-gray-300 group-hover/item:text-red-600 transition-colors" />
                                                    </a>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
