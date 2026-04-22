'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Package, 
    Edit2, 
    Save, 
    Check, 
    DollarSign, 
    Clock, 
    Plus,
    X
} from 'lucide-react';
import { getPackagesAction, updatePackageAction } from '@/lib/actions/admin-actions';

export default function PackageManagement() {
    const [packages, setPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({});

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
        setFormData(pkg);
    }

    async function handleSave() {
        if (!editingId) return;
        await updatePackageAction(editingId, formData);
        setEditingId(null);
        loadPackages();
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-[#1D366D] font-oswald uppercase tracking-tight">Donation Packages</h1>
                    <p className="text-gray-500 font-outfit mt-1">Configure tiered sponsorship and impact levels.</p>
                </div>
                <button className="flex items-center gap-2 px-8 py-4 bg-[#1D366D] text-white rounded-2xl font-black font-outfit uppercase tracking-widest text-sm hover:bg-[#00529B] transition-all shadow-xl">
                    <Plus size={18} className="text-[#FFB800]" />
                    New Package
                </button>
            </div>

            {loading ? (
                <div className="py-20 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00529B] mx-auto"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg) => (
                        <motion.div 
                            key={pkg.id}
                            layout
                            className={`bg-white rounded-[40px] border-2 transition-all p-8 flex flex-col ${
                                editingId === pkg.id ? 'border-[#00529B] shadow-2xl' : 'border-gray-50 shadow-sm'
                            }`}
                        >
                            {editingId === pkg.id ? (
                                <div className="space-y-6 flex-1 flex flex-col">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Title</label>
                                        <input 
                                            value={formData.title} 
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none font-bold text-[#1D366D] font-outfit text-lg"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Amount ($)</label>
                                            <div className="relative">
                                                <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input 
                                                    value={formData.amount} 
                                                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-gray-50 border-none font-black text-[#00529B] font-oswald"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Period</label>
                                            <input 
                                                value={formData.period} 
                                                onChange={(e) => setFormData({...formData, period: e.target.value})}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none font-bold text-gray-500 font-outfit"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Description</label>
                                        <textarea 
                                            value={formData.description} 
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none font-medium text-gray-600 font-outfit text-sm resize-none"
                                        />
                                    </div>
                                    <div className="mt-auto pt-6 flex gap-3">
                                        <button 
                                            onClick={handleSave}
                                            className="flex-1 py-3 bg-[#00529B] text-white rounded-xl font-black font-outfit uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-[#1D366D] transition-all"
                                        >
                                            <Save size={14} /> Save
                                        </button>
                                        <button 
                                            onClick={() => setEditingId(null)}
                                            className="p-3 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition-all"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="p-3 bg-blue-50 text-[#00529B] rounded-2xl">
                                            <Package size={24} />
                                        </div>
                                        <button 
                                            onClick={() => startEdit(pkg)}
                                            className="p-2 text-gray-300 hover:text-[#00529B] transition-all"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                    </div>
                                    <h3 className="text-xl font-black text-[#1D366D] font-oswald uppercase tracking-tight mb-2">
                                        {pkg.title}
                                    </h3>
                                    <div className="flex items-baseline gap-1 mb-6">
                                        <span className="text-3xl font-black text-[#00529B] font-oswald">${pkg.amount}</span>
                                        <span className="text-xs font-bold text-gray-400 font-outfit uppercase tracking-widest">{pkg.period}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 font-outfit leading-relaxed flex-1">
                                        {pkg.description}
                                    </p>
                                    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center gap-2 text-[10px] font-black text-[#FFB800] uppercase tracking-widest font-outfit">
                                        <Check size={12} className="text-[#009bba]" />
                                        Active Tier
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {!loading && packages.length === 0 && (
                        <div className="lg:col-span-3 py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
                            <p className="text-gray-400 font-outfit italic">No packages found. Seed the initial tiers to begin.</p>
                            <button 
                                onClick={async () => {
                                    // Normally we'd seed data here
                                    console.log('Seeding needed...');
                                }}
                                className="mt-4 text-[#00529B] font-black font-outfit uppercase tracking-widest text-xs border-b-2 border-[#00529B] pb-1"
                            >
                                Seed Default Tiers
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
