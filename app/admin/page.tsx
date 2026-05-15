'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStats() {
            try {
                const res = await fetch('/api/admin/stats');
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error("Failed to load stats", err);
            } finally {
                setLoading(false);
            }
        }
        loadStats();
    }, []);

    const cards = [
        { 
            title: 'Total Donations', 
            value: `$${stats?.donationTotal?.toLocaleString() || '0'}`, 
            change: 'Overall', 
            up: true, 
            color: 'text-[#32D583]', 
            bg: 'bg-[#ECFDF3]' 
        },
        { 
            title: 'Active Students', 
            value: stats?.studentCount || '0', 
            change: 'Total', 
            up: true, 
            color: 'text-[#32D583]', 
            bg: 'bg-[#ECFDF3]' 
        },
    ];

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#32D583]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#101828] font-outfit tracking-tight">Dashboard Overview</h1>
                    <p className="text-[#667085] font-outfit mt-1 text-sm">Real-time metrics from the database.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/students" className="px-5 py-2.5 bg-white border border-[#EAECF0] rounded-lg font-outfit font-semibold text-sm text-[#344054] hover:bg-gray-50 transition-all">
                        Add Student
                    </Link>
                    <Link href="/admin/users" className="px-5 py-2.5 bg-[#101828] text-white rounded-lg font-outfit font-semibold text-sm hover:bg-[#1d2939] transition-all">
                        New Admin
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white p-6 rounded-xl border border-[#EAECF0] shadow-sm hover:border-[#32D583]/30 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-outfit uppercase tracking-wider ${card.up ? 'bg-[#ECFDF3] text-[#027A48]' : 'bg-red-50 text-red-600'}`}>
                                {card.change}
                            </span>
                        </div>
                        <h3 className="text-[#667085] font-outfit font-medium text-xs uppercase tracking-wider mb-1">{card.title}</h3>
                        <p className="text-2xl font-bold text-[#101828] font-outfit tracking-tight">{card.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Main Chart Area */}
                <div className="bg-white rounded-2xl p-8 border border-[#EAECF0] shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-bold text-[#101828] font-outfit">Sponsorship Trends</h2>
                    </div>
                    
                    <div className="h-64 w-full relative">
                        <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#32D583" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="#32D583" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path 
                                d="M0,150 C100,160 200,140 300,120 C400,100 500,80 600,60 C700,50 800,40 L800,200 L0,200 Z" 
                                fill="url(#gradient)" 
                            />
                            <path 
                                d="M0,150 C100,160 200,140 300,120 C400,100 500,80 600,60 C700,50 800,40" 
                                fill="none" 
                                stroke="#32D583" 
                                strokeWidth="3" 
                                strokeLinecap="round"
                            />
                            <circle cx="800" cy="40" r="5" fill="#32D583" stroke="white" strokeWidth="2" />
                        </svg>
                    </div>

                    <div className="flex justify-between mt-6 px-4">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => (
                            <span key={m} className="text-[10px] font-bold text-[#98A2B3] font-outfit uppercase tracking-widest">{m}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
