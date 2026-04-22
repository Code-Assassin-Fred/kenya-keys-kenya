'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, GraduationCap, Heart } from 'lucide-react';

import { getStudentsAction } from '@/lib/actions/admin-actions';

export default function StudentGrid() {
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function load() {
            const data = await getStudentsAction();
            setStudents(data);
            setLoading(false);
        }
        load();
    }, []);

    const filteredStudents = students.filter(student => {
        const matchesFilter = filter === 'All' || student.gender === filter || student.sponsorship === filter;
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
                        {['All', 'Female', 'Male', 'Urgent'].map((f) => (
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
                        {filteredStudents.map((student) => (
                            <motion.div
                                key={student.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group relative flex flex-col bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Student Image */}
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <img 
                                        src={student.image} 
                                        alt={student.name} 
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                                    
                                    {/* Status Badge */}
                                    {student.sponsorship === 'Urgent' && (
                                        <div className="absolute top-6 left-6 bg-[#FFB800] text-[#1D366D] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg font-outfit">
                                            Sponsorship Urgent
                                        </div>
                                    )}

                                    <div className="absolute bottom-8 left-8 text-white">
                                        <h3 className="text-3xl font-black font-oswald uppercase tracking-tight leading-none mb-1">
                                            {student.name}
                                        </h3>
                                        <p className="text-sm font-bold font-outfit opacity-80 uppercase tracking-widest">
                                            {student.grade} • Age {student.age}
                                        </p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 pb-10 flex flex-col flex-1">
                                    <div className="flex gap-4 mb-6">
                                        <div className="flex items-center gap-2 text-[#00529B] font-bold text-xs uppercase tracking-wider font-outfit">
                                            <BookOpen className="w-4 h-4" />
                                            {student.interests.split(',')[0]}
                                        </div>
                                        <div className="flex items-center gap-2 text-[#009bba] font-bold text-xs uppercase tracking-wider font-outfit">
                                            <GraduationCap className="w-4 h-4" />
                                            {student.gender}
                                        </div>
                                    </div>

                                    <p className="text-gray-600 font-outfit leading-relaxed mb-10 line-clamp-3">
                                        {student.story}
                                    </p>

                                    <button className="mt-auto w-full py-4 rounded-full bg-[#1D366D] text-white font-black font-outfit text-sm uppercase tracking-widest hover:bg-[#001D4A] transition-all shadow-xl flex items-center justify-center gap-3 group/btn">
                                        <Heart className="w-4 h-4 group-hover/btn:fill-current transition-all" />
                                        Sponsor {student.name}
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
        </section>
    );
}
