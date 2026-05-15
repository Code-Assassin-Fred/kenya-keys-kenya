'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StudentManagement() {
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<any>(null);
    const [studentToDelete, setStudentToDelete] = useState<any>(null);

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

    async function confirmDelete() {
        if (!studentToDelete) return;
        
        try {
            const res = await fetch(`/api/admin/students/${studentToDelete.id}`, {
                method: 'DELETE',
            });
            
            if (res.ok) {
                setIsDeleteModalOpen(false);
                setStudentToDelete(null);
                loadStudents();
            }
        } catch (err) {
            console.error("Delete failed", err);
        }
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#101828] font-outfit tracking-tight">Student Catalog</h1>
                    <p className="text-[#667085] font-outfit mt-1 text-sm">Manage student profiles and academic details.</p>
                </div>
                <button 
                    onClick={() => {setEditingStudent(null); setIsModalOpen(true);}}
                    className="px-6 py-3 bg-[#101828] text-white rounded-lg font-bold font-outfit text-sm hover:bg-[#1d2939] transition-all shadow-sm"
                >
                    Add New Student
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-[#EAECF0] flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <input 
                        type="text" 
                        placeholder="Search by name, grade or interest..."
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-[#EAECF0] focus:bg-white focus:border-[#32D583] outline-none font-outfit text-sm transition-all"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-[#EAECF0] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-[#EAECF0]">
                                <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider">Student</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider">Grade/Age</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider">Interests</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAECF0]">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="py-20 text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#32D583] mx-auto"></div>
                                    </td>
                                </tr>
                            ) : students.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-20 text-center text-[#667085] font-outfit">No students found.</td>
                                </tr>
                            ) : (
                                students.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50/50 transition-all group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-[#EAECF0]">
                                                    {student.image ? (
                                                        <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[#D0D5DD] font-bold text-xs bg-gray-50">
                                                            {student.name[0]}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-[#101828] font-outfit text-sm">{student.name}</p>
                                                    <p className="text-xs text-[#667085] font-medium">{student.gender}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-[#101828] font-outfit text-sm">{student.grade}</p>
                                            <p className="text-xs text-[#667085] font-medium">Age {student.age}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs font-medium text-[#667085] font-outfit line-clamp-1">{student.interests}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button 
                                                    onClick={() => {setEditingStudent(student); setIsModalOpen(true);}}
                                                    className="text-xs font-bold text-[#101828] hover:text-[#32D583] transition-all"
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    onClick={() => {setStudentToDelete(student); setIsDeleteModalOpen(true);}}
                                                    className="text-xs font-bold text-red-600 hover:text-red-700 transition-all"
                                                >
                                                    Delete
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
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-[#101828]/40 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden max-h-[90vh]"
                        >
                            <div className="p-6 border-b border-[#EAECF0] flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-[#101828] font-outfit">
                                        {editingStudent ? 'Edit Student' : 'Add New Student'}
                                    </h2>
                                    <p className="text-[#667085] font-outfit text-xs">Enter the student details below.</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="text-[#667085] hover:text-[#101828] font-bold text-sm">
                                    Close
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-[#344054]">Full Name</label>
                                        <input name="name" defaultValue={editingStudent?.name} required className="w-full px-4 py-2 rounded-lg bg-white border border-[#D0D5DD] focus:border-[#32D583] outline-none font-outfit text-sm text-[#101828] placeholder:text-[#98A2B3] transition-all" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-[#344054]">Age</label>
                                        <input name="age" type="number" defaultValue={editingStudent?.age} required className="w-full px-4 py-2 rounded-lg bg-white border border-[#D0D5DD] focus:border-[#32D583] outline-none font-outfit text-sm text-[#101828] placeholder:text-[#98A2B3] transition-all" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-[#344054]">Grade / Level</label>
                                        <input name="grade" defaultValue={editingStudent?.grade} required placeholder="e.g. Form 1" className="w-full px-4 py-2 rounded-lg bg-white border border-[#D0D5DD] focus:border-[#32D583] outline-none font-outfit text-sm text-[#101828] placeholder:text-[#98A2B3] transition-all" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-[#344054]">Gender</label>
                                        <select name="gender" defaultValue={editingStudent?.gender} className="w-full px-4 py-2 rounded-lg bg-white border border-[#D0D5DD] focus:border-[#32D583] outline-none font-outfit text-sm text-[#101828] transition-all">
                                            <option>Female</option>
                                            <option>Male</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-[#344054]">Interests</label>
                                    <input name="interests" defaultValue={editingStudent?.interests} placeholder="e.g. Science, Soccer" className="w-full px-4 py-2 rounded-lg bg-white border border-[#D0D5DD] focus:border-[#32D583] outline-none font-outfit text-sm text-[#101828] placeholder:text-[#98A2B3] transition-all" />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-[#344054]">Story</label>
                                    <textarea name="story" defaultValue={editingStudent?.story} rows={4} className="w-full px-4 py-2 rounded-lg bg-white border border-[#D0D5DD] focus:border-[#32D583] outline-none font-outfit text-sm text-[#101828] placeholder:text-[#98A2B3] resize-none transition-all" placeholder="Explain the student's background..."></textarea>
                                </div>

                                <button type="submit" className="w-full py-3 rounded-lg bg-[#101828] text-white font-bold font-outfit text-sm hover:bg-[#1d2939] transition-all shadow-sm">
                                    {editingStudent ? 'Save Changes' : 'Create Profile'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="absolute inset-0 bg-[#101828]/60 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 text-center"
                        >
                            <h3 className="text-xl font-bold text-[#101828] font-outfit mb-2">Delete Student Profile?</h3>
                            <p className="text-[#667085] font-outfit text-sm mb-8">
                                Are you sure you want to delete <span className="font-bold text-[#101828]">{studentToDelete?.name}</span>? This action cannot be undone.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <button 
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="px-4 py-3 rounded-lg bg-gray-50 text-[#344054] font-bold font-outfit text-sm hover:bg-gray-100 transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={confirmDelete}
                                    className="px-4 py-3 rounded-lg bg-red-600 text-white font-bold font-outfit text-sm hover:bg-red-700 transition-all shadow-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
