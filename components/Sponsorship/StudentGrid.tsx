'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, GraduationCap, Heart } from 'lucide-react';

import { getStudentsAction } from '@/lib/actions/admin-actions';

import InterestModal from '@/components/shared/InterestModal';

export default function StudentGrid() {
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);

    useEffect(() => {
        async function load() {
            const data = await getStudentsAction();
            setStudents(data);
            setLoading(false);
        }
        load();
    }, []);

    const handleSponsorClick = (student: any) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const filteredStudents = students.filter(student => {
        const matchesFilter = filter === 'All' || student.gender === filter;
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             student.interests.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-6 mb-16 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="Search students or interests..." 
                            className="w-full pl-12 pr-6 py-4 rounded-full bg-gray-50 border border-gray-100 focus:border-[#00529B] outline-none font-outfit text-[#333] transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                        {['All', 'Female', 'Male'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-3 rounded-full font-black uppercase tracking-widest text-xs font-outfit transition-all border-2 ${
                                    filter === f 
                                        ? 'bg-[#1D366D] border-[#1D366D] text-white shadow-lg' 
                                        : 'bg-white border-gray-100 text-[#333] hover:border-blue-100'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <AnimatePresence mode="popLayout">
                        {filteredStudents.map((student: any) => (
                            <motion.div
                                key={student.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group relative flex flex-col bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Card Header with Initials Avatar */}
                                <div className="pt-10 pb-4 px-6 flex flex-col items-center text-center bg-gray-50/50 border-b border-gray-100">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1D366D] to-[#00529B] flex items-center justify-center text-white text-2xl font-black font-oswald shadow-lg mb-4 ring-4 ring-white">
                                        {student.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                                    </div>
                                    
                                    <h3 className="text-xl font-black font-oswald uppercase tracking-tight leading-none mb-2 text-[#1D366D]">
                                        {student.name.split(' ')[0]}
                                    </h3>
                                    <p className="text-[10px] font-bold font-outfit text-[#009bba] uppercase tracking-widest">
                                        {student.grade} • Age {student.age}
                                    </p>
                                </div>

                                {/* Content Body */}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex justify-center gap-4 mb-6">
                                        <div className="flex items-center gap-2 text-gray-500 font-bold text-[9px] uppercase tracking-wider font-outfit">
                                            <BookOpen className="w-3 h-3 text-[#00529B]" />
                                            {student.interests.split(',')[0]}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-500 font-bold text-[9px] uppercase tracking-wider font-outfit">
                                            <GraduationCap className="w-3 h-3 text-[#009bba]" />
                                            {student.gender}
                                        </div>
                                    </div>

                                    <div className="relative mb-8">
                                        <p className="text-gray-600 font-outfit leading-relaxed text-[13px] text-center line-clamp-4 italic">
                                            "{student.story}"
                                        </p>
                                    </div>

                                    <button 
                                        onClick={() => handleSponsorClick(student)}
                                        className="mt-auto w-full py-3.5 rounded-full bg-[#1D366D] text-white font-black font-outfit text-[10px] uppercase tracking-widest hover:bg-[#001D4A] transition-all shadow-xl flex items-center justify-center gap-3 group/btn text-center cursor-pointer"
                                    >
                                        <Heart className="w-3.5 h-3.5 group-hover/btn:fill-current transition-all" />
                                        Sponsor {student.name.split(' ')[0]}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredStudents.length === 0 && (
                    <div className="text-center py-24">
                        <h3 className="text-2xl font-black text-gray-400 font-oswald uppercase">No students matched your filters</h3>
                        <button 
                            onClick={() => {setFilter('All'); setSearchQuery('');}}
                            className="mt-6 text-[#00529B] font-black font-outfit uppercase tracking-widest text-sm border-b-2 border-[#00529B] pb-1"
                        >
                            Reset all filters
                        </button>
                    </div>
                )}
            </div>

            <InterestModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                type="sponsorship"
                targetName={selectedStudent?.name || ''}
            />
        </section>
    );
}
