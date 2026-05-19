'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Trash2, Edit2, Check, AlertCircle } from 'lucide-react';
import { getPackagesAction, updatePackageAction, addPackageAction, deletePackageAction } from '@/lib/actions/admin-actions';

export default function PackageManagement() {
    const [packages, setPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState<any>({
        title: '',
        amount: '',
        period: '/month',
        description: '',
        features: [],
        quote: '',
        student: '',
        popular: false
    });

    useEffect(() => {
        loadPackages();
    }, []);

    async function loadPackages() {
        setLoading(true);
        const data = await getPackagesAction();
        setPackages(data);
        setLoading(false);
    }

    function startEdit(pkg: any) {
        setEditingId(pkg.id);
        setFormData({ ...pkg });
    }

    function startAdd() {
        setFormData({
            title: '',
            amount: '',
            period: '/year',
            description: '',
            features: [],
            quote: '',
            student: '',
            popular: false
        });
        setIsAdding(true);
    }

    async function handleSave() {
        if (editingId) {
            await updatePackageAction(editingId, formData);
            setEditingId(null);
        } else {
            await addPackageAction(formData);
            setIsAdding(false);
        }
        loadPackages();
    }

    async function handleDelete(id: string) {
        if (confirm('Are you sure you want to delete this package?')) {
            await deletePackageAction(id);
            loadPackages();
        }
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-[#101828] font-outfit tracking-tight uppercase">Donation Packages</h1>
                    <p className="text-[#667085] font-outfit mt-1 text-sm">Configure tiered sponsorship and impact levels.</p>
                </div>
                <button 
                    onClick={startAdd}
                    className="flex items-center gap-2 px-6 py-3 bg-[#1D366D] text-white rounded-xl font-bold font-outfit text-sm hover:bg-[#101828] transition-all shadow-lg active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    New Package
                </button>
            </div>

            {(isAdding || editingId) && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#F9FAFB] border-2 border-[#1D366D] rounded-3xl p-8 shadow-xl"
                >
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-black text-[#101828] font-outfit uppercase tracking-tight">
                            {editingId ? 'Edit Package' : 'Create New Package'}
                        </h2>
                        <button onClick={() => { setEditingId(null); setIsAdding(false); }} className="text-gray-400 hover:text-gray-600">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-black uppercase tracking-widest text-[#344054]">Package Title</label>
                                <input 
                                    value={formData.title} 
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    placeholder="e.g., Secondary School Tuition"
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#D0D5DD] font-bold text-[#101828] font-outfit text-base outline-none focus:ring-2 focus:ring-[#1D366D]/20 focus:border-[#1D366D] transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-black uppercase tracking-widest text-[#344054]">Description</label>
                                <textarea 
                                    value={formData.description} 
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    rows={4}
                                    placeholder="Briefly describe what this package covers..."
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#D0D5DD] font-medium text-[#667085] font-outfit text-sm resize-none outline-none focus:ring-2 focus:ring-[#1D366D]/20 focus:border-[#1D366D] transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-widest text-[#344054]">Amount ($)</label>
                                    <input 
                                        value={formData.amount} 
                                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                        placeholder="450"
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#D0D5DD] font-bold text-[#101828] font-outfit outline-none focus:ring-2 focus:ring-[#1D366D]/20 focus:border-[#1D366D] transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-widest text-[#344054]">Period</label>
                                    <select 
                                        value={formData.period} 
                                        onChange={(e) => setFormData({...formData, period: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#D0D5DD] font-bold text-[#101828] font-outfit outline-none focus:ring-2 focus:ring-[#1D366D]/20 focus:border-[#1D366D] transition-all"
                                    >
                                        <option value="/month">/ month</option>
                                        <option value="/year">/ year</option>
                                        <option value="/term">/ term</option>
                                        <option value="one-time">one-time</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#D0D5DD] mt-6">
                                <input 
                                    type="checkbox"
                                    id="popular"
                                    checked={formData.popular}
                                    onChange={(e) => setFormData({...formData, popular: e.target.checked})}
                                    className="w-5 h-5 rounded border-gray-300 text-[#1D366D] focus:ring-[#1D366D]"
                                />
                                <label htmlFor="popular" className="text-sm font-bold text-[#344054] font-outfit">Mark as "Most Impactful"</label>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex gap-4">
                        <button 
                            onClick={handleSave}
                            className="flex-1 py-4 bg-[#1D366D] text-white rounded-xl font-black font-outfit text-sm uppercase tracking-widest hover:bg-[#101828] transition-all shadow-lg active:scale-[0.98]"
                        >
                            {editingId ? 'Update Package' : 'Create Package'}
                        </button>
                        <button 
                            onClick={() => { setEditingId(null); setIsAdding(false); }}
                            className="px-8 py-4 bg-white text-[#344054] border border-[#D0D5DD] rounded-xl hover:bg-gray-50 transition-all font-black text-sm uppercase tracking-widest font-outfit"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            )}

            {loading ? (
                <div className="py-20 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#1D366D] border-r-transparent mx-auto"></div>
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-[#EAECF0] shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        {packages.length > 0 ? (
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-[#EAECF0]">
                                        <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider font-outfit">Package Title</th>
                                        <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider font-outfit">Type</th>
                                        <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider font-outfit">Amount</th>
                                        <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider font-outfit">Description</th>
                                        <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider text-right font-outfit">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#EAECF0]">
                                    {packages.map((pkg) => (
                                        <tr key={pkg.id} className="hover:bg-gray-50/50 transition-all group">
                                            <td className="px-6 py-5">
                                                <span className="font-bold text-[#101828] font-outfit text-base block group-hover:text-[#1D366D] transition-colors">
                                                    {pkg.title}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                {pkg.popular ? (
                                                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#E0F2FE] text-[#0369A1] font-outfit">
                                                        Most Impactful
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#F2F4F7] text-[#475467] font-outfit">
                                                        Standard
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-xl font-black text-[#1D366D] font-outfit">${pkg.amount}</span>
                                                    <span className="text-xs font-bold text-[#667085] font-outfit uppercase tracking-widest">{pkg.period}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 max-w-md">
                                                <p className="text-sm text-[#475467] font-outfit leading-relaxed line-clamp-2">
                                                    {pkg.description}
                                                </p>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex gap-2 justify-end">
                                                    <button 
                                                        onClick={() => startEdit(pkg)}
                                                        className="p-2 text-gray-500 hover:text-[#1D366D] hover:bg-blue-50 rounded-lg transition-all"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(pkg.id)}
                                                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="py-32 text-center bg-white rounded-3xl border-2 border-dashed border-[#EAECF0] flex flex-col items-center justify-center space-y-4">
                                <div className="p-4 bg-gray-50 rounded-full">
                                    <AlertCircle className="w-8 h-8 text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-[#101828] font-bold font-outfit">No packages found</p>
                                    <p className="text-[#667085] font-outfit text-sm">Start by creating your first donation tier above.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
