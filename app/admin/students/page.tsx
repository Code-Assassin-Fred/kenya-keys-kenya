'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, 
    Search, 
    Filter, 
    Edit2, 
    Trash2, 
    MoreHorizontal,
    X,
    User,
    CheckCircle,
    Clock,
    AlertTriangle
} from 'lucide-react';
import { getStudentsAction, addStudentAction, updateStudentAction } from '@/lib/actions/admin-actions';

export default function StudentManagement() {
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<any>(null);

    useEffect(() => {
        loadStudents();
    }, []);

    async function loadStudents() {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/students');
            const data = await res.json();
            setStudents(data);
        } catch (err) {
            console.error("Failed to load students", err);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const url = editingStudent ? `/api/admin/students/${editingStudent.id}` : '/api/admin/students';
            const method = editingStudent ? 'PUT' : 'POST';
            
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            
            if (res.ok) {
                setIsModalOpen(false);
                setEditingStudent(null);
                loadStudents();
            }
        } catch (err) {
            console.error("Save failed", err);
        }
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-[#1D366D] font-oswald uppercase tracking-tight">Student Catalog</h1>
                    <p className="text-gray-500 font-outfit mt-1">Manage profiles, stories, and sponsorship status.</p>
                </div>
                <button 
                    onClick={() => {setEditingStudent(null); setIsModalOpen(true);}}
                    className="flex items-center gap-2 px-8 py-4 bg-[#00529B] text-white rounded-2xl font-black font-outfit uppercase tracking-widest text-sm hover:bg-[#1D366D] transition-all shadow-xl shadow-blue-900/10"
                >
                    <Plus size={18} />
                    Add New Student
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-3xl border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search by name, grade or interest..."
                        className="w-full pl-12 pr-6 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#00529B]/20 font-outfit text-sm"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 text-[#1D366D] rounded-2xl font-bold font-outfit text-sm hover:bg-gray-100 transition-all">
                        <Filter size={16} />
                        Status
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 text-[#1D366D] rounded-2xl font-bold font-outfit text-sm hover:bg-gray-100 transition-all">
                        <Filter size={16} />
                        Gender
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Student</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Grade/Age</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Sponsorship</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Interests</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00529B] mx-auto"></div>
                                    </td>
                                </tr>
                            ) : students.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-gray-400 font-outfit">No students found. Add one to get started.</td>
                                </tr>
                            ) : (
                                students.map((student) => (
                                    <tr key={student.id} className="hover:bg-blue-50/30 transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0">
                                                    {student.image ? (
                                                        <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                            <User size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#1D366D] font-outfit">{student.name}</p>
                                                    <p className="text-xs text-gray-400 font-medium">{student.gender}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-[#1D366D] font-outfit">{student.grade}</p>
                                            <p className="text-xs text-gray-400 font-medium">Age {student.age}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                student.sponsorship === 'Urgent' 
                                                    ? 'bg-red-50 text-red-600' 
                                                    : student.sponsorship === 'Sponsored'
                                                    ? 'bg-green-50 text-green-600'
                                                    : 'bg-blue-50 text-[#00529B]'
                                            }`}>
                                                {student.sponsorship === 'Urgent' && <AlertTriangle size={10} />}
                                                {student.sponsorship === 'Sponsored' && <CheckCircle size={10} />}
                                                {student.sponsorship === 'Needed' && <Clock size={10} />}
                                                {student.sponsorship}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-xs font-bold text-gray-500 font-outfit line-clamp-1">{student.interests}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => {setEditingStudent(student); setIsModalOpen(true);}}
                                                    className="p-2 text-gray-400 hover:text-[#00529B] hover:bg-blue-50 rounded-lg transition-all"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-end p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-[#1D366D]/40 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-xl h-full bg-white rounded-[40px] shadow-2xl flex flex-col overflow-hidden"
                        >
                            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-black text-[#1D366D] font-oswald uppercase tracking-tight">
                                        {editingStudent ? 'Edit Student' : 'Add New Student'}
                                    </h2>
                                    <p className="text-gray-500 font-outfit text-sm">Enter the student's details and story.</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                                    <X size={24} className="text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Full Name</label>
                                        <input name="name" defaultValue={editingStudent?.name} required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#00529B]/20 font-outfit" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Age</label>
                                        <input name="age" type="number" defaultValue={editingStudent?.age} required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#00529B]/20 font-outfit" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Grade / Level</label>
                                        <input name="grade" defaultValue={editingStudent?.grade} required placeholder="e.g. Form 1" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#00529B]/20 font-outfit" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Gender</label>
                                        <select name="gender" defaultValue={editingStudent?.gender} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#00529B]/20 font-outfit outline-none">
                                            <option>Female</option>
                                            <option>Male</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Sponsorship Status</label>
                                    <select name="sponsorship" defaultValue={editingStudent?.sponsorship} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#00529B]/20 font-outfit outline-none">
                                        <option>Urgent</option>
                                        <option>Needed</option>
                                        <option>Sponsored</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Interests</label>
                                    <input name="interests" defaultValue={editingStudent?.interests} placeholder="e.g. Science, Soccer, Reading" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#00529B]/20 font-outfit" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">The Story</label>
                                    <textarea name="story" defaultValue={editingStudent?.story} rows={5} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#00529B]/20 font-outfit resize-none" placeholder="Explain the student's background and needs..."></textarea>
                                </div>

                                <button type="submit" className="w-full py-5 rounded-2xl bg-[#1D366D] text-white font-black font-outfit uppercase tracking-widest text-sm hover:bg-[#00529B] transition-all shadow-xl">
                                    {editingStudent ? 'Save Changes' : 'Create Profile'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
