'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Users, 
    Heart, 
    TrendingUp, 
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    UserPlus,
    PlusCircle
} from 'lucide-react';
import { getAdminStatsAction } from '@/lib/actions/admin-actions';
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
            icon: Heart, 
            color: 'text-[#3B82F6]', 
            bg: 'bg-blue-50' 
        },
        { 
            title: 'Active Students', 
            value: stats?.studentCount || '0', 
            change: 'Total', 
            up: true, 
            icon: Users, 
            color: 'text-[#0ea5e9]', 
            bg: 'bg-sky-50' 
        },
        { 
            title: 'Urgent Needs', 
            value: stats?.urgentSponsorships || '0', 
            change: 'Priority', 
            up: false, 
            icon: AlertCircle, 
            color: 'text-red-500', 
            bg: 'bg-red-50' 
        },
        { 
            title: 'Sponsorship Rate', 
            value: stats?.sponsorshipRate || '0%', 
            change: 'Live', 
            up: true, 
            icon: TrendingUp, 
            color: 'text-[#2B4C9B]', 
            bg: 'bg-indigo-50' 
        },
    ];

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3B82F6]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[#2B4C9B] font-oswald uppercase tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500 font-outfit mt-1 text-sm font-medium">Welcome back, Admin. Real-time metrics from Firestore.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/students" className="px-6 py-3 bg-white border border-gray-100 rounded-2xl flex items-center gap-2 font-outfit font-bold text-sm text-[#2B4C9B] hover:shadow-lg transition-all">
                        <PlusCircle size={18} className="text-[#3B82F6]" />
                        Add Student
                    </Link>
                    <Link href="/admin/users" className="px-6 py-3 bg-[#2B4C9B] text-white rounded-2xl flex items-center gap-2 font-outfit font-bold text-sm hover:shadow-xl hover:scale-105 transition-all">
                        <UserPlus size={18} className="text-[#FFB800]" />
                        New Admin
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${card.bg} ${card.color}`}>
                                <card.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black font-outfit uppercase tracking-widest ${card.up ? 'text-green-500' : 'text-red-500'}`}>
                                {card.change}
                            </div>
                        </div>
                        <h3 className="text-gray-400 font-outfit font-bold text-xs uppercase tracking-widest mb-1">{card.title}</h3>
                        <p className="text-3xl font-black text-[#2B4C9B] font-oswald">{card.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Area */}
                <div className="lg:col-span-2 bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black text-[#2B4C9B] font-oswald uppercase tracking-wide">Sponsorship Trends</h2>
                    </div>
                    
                    <div className="h-64 w-full relative">
                        <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path 
                                d="M0,150 C100,160 200,140 300,120 C400,100 500,80 600,60 C700,50 800,40 L800,200 L0,200 Z" 
                                fill="url(#gradient)" 
                            />
                            <path 
                                d="M0,150 C100,160 200,140 300,120 C400,100 500,80 600,60 C700,50 800,40" 
                                fill="none" 
                                stroke="#3B82F6" 
                                strokeWidth="4" 
                                strokeLinecap="round"
                            />
                            <circle cx="800" cy="40" r="6" fill="#FFB800" stroke="white" strokeWidth="3" />
                        </svg>
                    </div>

                    <div className="flex justify-between mt-6 px-4">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => (
                            <span key={m} className="text-xs font-bold text-gray-400 font-outfit uppercase tracking-widest">{m}</span>
                        ))}
                    </div>
                </div>

                {/* Right Panel - Urgent Sidebar (REAL DATA) */}
                <div className="bg-[#2B4C9B] rounded-[40px] p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-xl font-black font-oswald uppercase tracking-wide mb-6">Urgent Attention</h2>
                        <div className="space-y-6">
                            {(stats?.recentAlerts || []).length > 0 ? (
                                stats.recentAlerts.map((item: any, i: number) => (
                                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-black group-hover:bg-[#FFB800] group-hover:text-[#2B4C9B] transition-all">
                                            {item.name[0]}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold font-outfit leading-tight">{item.name}</p>
                                            <p className="text-xs text-blue-200 font-medium">{item.reason}</p>
                                        </div>
                                        <div className="text-[9px] bg-red-400 px-2 py-1 rounded-full font-black uppercase tracking-widest whitespace-nowrap">
                                            {item.date}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white/40 text-sm font-medium italic">No urgent sponsorship needs at the moment.</p>
                            )}
                        </div>
                        { (stats?.recentAlerts || []).length > 0 && (
                            <Link href="/admin/students" className="block w-full mt-10 py-4 rounded-2xl bg-[#FFB800] text-[#2B4C9B] font-black font-outfit uppercase tracking-widest text-center text-xs hover:scale-105 transition-all shadow-xl shadow-black/20">
                                Review All Alerts
                            </Link>
                        )}
                    </div>
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#3B82F6] rounded-full opacity-20 blur-3xl" />
                </div>
            </div>
        </div>
    );
}
