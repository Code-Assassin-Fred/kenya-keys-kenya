'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Calendar, Camera, UserSquare2, TrendingUp } from 'lucide-react';

export default function ProgressReports() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                    {/* Left: Content */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase leading-none mb-8 tracking-tight">
                                STAY <span className="text-[#00529B]">CONNECTED</span> <br />
                                TO THEIR SUCCESS
                            </h2>
                            <p className="text-xl text-gray-700 font-outfit leading-relaxed mb-12">
                                Transparency is core to our mission. As a sponsor, you'll receive detailed updates on your student's academic progress and well-being twice a year.
                            </p>

                            <div className="space-y-10">
                                {[
                                    {
                                        icon: <Calendar className="w-6 h-6 text-[#00529B]" />,
                                        title: "Bi-Annual Schedule",
                                        text: "Reports are sent at the end of each major academic term (typically June and December)."
                                    },
                                    {
                                        icon: <TrendingUp className="w-6 h-6 text-[#009bba]" />,
                                        title: "Academic Metrics",
                                        text: "Get a clear view of their grades across all subjects, along with their class ranking and school reports."
                                    },
                                    {
                                        icon: <UserSquare2 className="w-6 h-6 text-[#FFB800]" />,
                                        title: "Teacher Comments",
                                        text: "Insights from the teachers and school administrators who work directly with your student every day."
                                    },
                                    {
                                        icon: <Camera className="w-6 h-6 text-red-600" />,
                                        title: "Recent Photo",
                                        text: "Every final term report includes a recent photo of your student, letting you see them grow over the years."
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-6 items-start">
                                        <div className="mt-1">{item.icon}</div>
                                        <div>
                                            <h4 className="text-xl font-bold font-outfit text-[#333] mb-1">{item.title}</h4>
                                            <p className="text-gray-600 font-outfit leading-relaxed">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Report Mockup */}
                    <div className="w-full lg:w-1/2 sticky top-32">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="bg-[#F8FAFC] border-2 border-gray-100 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden"
                        >
                            {/* Logo Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-12">
                                    <div className="text-xs font-black uppercase tracking-widest text-[#00529B] font-outfit">Sponsor-Student Progress Report</div>
                                    <div className="bg-[#FFB800] text-[#1D366D] px-4 py-1 rounded-full text-[10px] font-black uppercase font-outfit">Official Document</div>
                                </div>

                                <div className="flex gap-6 items-center mb-10">
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md">
                                        <img src="/image1.png" alt="Student" className="object-cover w-full h-full" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black font-oswald uppercase tracking-tight text-[#333]">Amani J.</h3>
                                        <p className="text-sm font-bold font-outfit text-gray-500 uppercase">Form 2 • Maendeleo High</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-xl border border-gray-50">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 font-outfit">Mathematics</p>
                                            <p className="text-xl font-black font-oswald text-[#00529B]">A-</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-gray-50">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 font-outfit">Biology</p>
                                            <p className="text-xl font-black font-oswald text-[#009bba]">A</p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white p-6 rounded-xl border border-gray-50">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 font-outfit">Teacher's Note</p>
                                        <p className="text-sm italic text-gray-600 font-outfit leading-relaxed">
                                            \"Amani continues to show exceptional leadership in her science cohort. Her commitment to her studies is visible in her improved performance in Physics this term...\"
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-12 flex justify-between items-center opacity-60 grayscale scale-90">
                                    <div className="h-0.5 w-32 bg-gray-300" />
                                    <span className="text-[10px] font-black uppercase tracking-widest font-outfit">Kenya Keys Official Stamp</span>
                                    <div className="h-0.5 w-32 bg-gray-300" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
