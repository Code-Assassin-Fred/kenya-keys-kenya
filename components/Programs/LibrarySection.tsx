'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Library, Landmark, Bookmark } from 'lucide-react';

export default function LibrarySection() {
    return (
        <section id="library" className="py-24 bg-white scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                
                {/* Heading */}
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <span className="text-[#2563EB] font-black tracking-[0.2em] uppercase text-xs mb-3 block font-outfit">
                            05. Literacy & Learning
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase tracking-tight leading-none">
                            LIBRARY & LITERACY <span className="text-[#2563EB]">SUPPORT</span>
                        </h2>
                    </div>
                    <p className="text-lg text-gray-600 font-outfit max-w-md">
                        Access to books transforms learning outcomes. Our programs construct physical library spaces, curate learning resources, and facilitate high-impact school book drives.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Item 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl border border-gray-100 p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <div className="p-3 bg-blue-50 text-[#2563EB] rounded-2xl shadow-inner w-fit mb-6">
                                <Bookmark className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold font-outfit text-[#333] mb-4">
                                Book Donations for Schools
                            </h3>
                            <p className="text-gray-600 font-outfit text-sm leading-relaxed mb-6">
                                Establishing reading resources for Elementary and High Schools. We deliver thousands of grade-appropriate textbooks, reference materials, and literature classics directly into classroom libraries.
                            </p>
                        </div>
                    </motion.div>

                    {/* Item 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl border border-gray-100 p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <div className="p-3 bg-blue-50 text-[#2563EB] rounded-2xl shadow-inner w-fit mb-6">
                                <Library className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold font-outfit text-[#333] mb-4">
                                CEC Library Support
                            </h3>
                            <p className="text-gray-600 font-outfit text-sm leading-relaxed mb-6">
                                The Community Education Center library is the intellectual anchor of the region. We fund digital database catalogs, study desks, quiet reading zones, and maintain daily librarians to assist local community members.
                            </p>
                        </div>
                    </motion.div>

                    {/* Item 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl border border-gray-100 p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <div className="p-3 bg-blue-50 text-[#2563EB] rounded-2xl shadow-inner w-fit mb-6">
                                <Landmark className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold font-outfit text-[#333] mb-4">
                                Classroom Literacy Spaces
                            </h3>
                            <p className="text-gray-600 font-outfit text-sm leading-relaxed mb-6">
                                Providing spatial upgrades and construction elements to turn standard rural classrooms into modern reading environments that encourage critical reading and research.
                            </p>
                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
