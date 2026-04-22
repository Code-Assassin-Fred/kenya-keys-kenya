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
            const data = await getAdminStatsAction();
            setStats(data);
            setLoading(false);
        }
        loadStats();
    }, []);

    const cards = [
        { 
            title: 'Total Donations', 
            value: `$${stats?.donationTotal?.toLocaleString() || '0'}`, 
            change: '+12.5%', 
            up: true, 
            icon: Heart, 
            color: 'text-[#00529B]', 
            bg: 'bg-blue-50' 
        },
        { 
            title: 'Active Students', 
            value: stats?.studentCount || '0', 
            change: '+4', 
            up: true, 
            icon: Users, 
            color: 'text-[#009bba]', 
            bg: 'bg-cyan-50' 
        },
        { 
            title: 'Urgent Needs', 
            value: stats?.urgentSponsorships || '0', 
            change: '-2', 
            up: false, 
            icon: AlertCircle, 
            color: 'text-red-600', 
            bg: 'bg-red-50' 
        },
        { 
            title: 'Sponsorship Rate', 
            value: '92%', 
            change: '+2.4%', 
            up: true, 
            icon: TrendingUp, 
            color: 'text-[#1D366D]', 
            bg: 'bg-indigo-50' 
        },
    ];

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00529B]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[#1D366D] font-oswald uppercase tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500 font-outfit mt-1">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/students" className="px-6 py-3 bg-white border border-gray-100 rounded-2xl flex items-center gap-2 font-outfit font-bold text-sm text-[#1D366D] hover:shadow-lg transition-all">
                        <PlusCircle size={18} className="text-[#00529B]" />
                        Add Student
                    </Link>
                    <Link href="/admin/users" className="px-6 py-3 bg-[#1D366D] text-white rounded-2xl flex items-center gap-2 font-outfit font-bold text-sm hover:shadow-xl hover:scale-105 transition-all">
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
                            <div className={`flex items-center gap-1 text-xs font-black font-outfit ${card.up ? 'text-green-500' : 'text-red-500'}`}>
                                {card.change}
                                {card.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            </div>
                        </div>
                        <h3 className="text-gray-400 font-outfit font-bold text-xs uppercase tracking-widest mb-1">{card.title}</h3>
                        <p className="text-3xl font-black text-[#1D366D] font-oswald">{card.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart/Graph Area */}
                <div className="lg:col-span-2 bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black text-[#1D366D] font-oswald uppercase tracking-wide">Sponsorship Trends</h2>
                        <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-xs font-bold font-outfit text-gray-500 outline-none">
                            <option>Last 6 Months</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    
                    {/* Simplified Custom SVG Chart */}
                    <div className="h-64 w-full relative">
                        <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#00529B" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#00529B" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path 
                                d="M0,150 C100,140 200,160 300,100 C400,40 500,80 600,60 C700,40 800,50 800,50 L800,200 L0,200 Z" 
                                fill="url(#gradient)" 
                            />
                            <path 
                                d="M0,150 C100,140 200,160 300,100 C400,40 500,80 600,60 C700,40 800,50 800,50" 
                                fill="none" 
                                stroke="#00529B" 
                                strokeWidth="4" 
                                strokeLinecap="round"
                            />
                            {/* Animated dots */}
                            {[0, 300, 600, 800].map((x, i) => (
                                <circle key={i} cx={x} cy={i === 0 ? 150 : i === 1 ? 100 : i === 2 ? 60 : 50} r="6" fill="#FFB800" stroke="white" strokeWidth="3" />
                            ))}
                        </svg>
                    </div>

                    <div className="flex justify-between mt-6 px-4">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => (
                            <span key={m} className="text-xs font-bold text-gray-400 font-outfit uppercase tracking-widest">{m}</span>
                        ))}
                    </div>
                </div>

                {/* Right Panel - Urgent Sidebar */}
                <div className="bg-[#1D366D] rounded-[40px] p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-xl font-black font-oswald uppercase tracking-wide mb-6">Urgent Attention</h2>
                        <div className="space-y-6">
                            {[
                                { name: 'Amani K.', reason: 'Fee Deadline', date: '2 days left' },
                                { name: 'Ekeno J.', reason: 'Medical Need', date: 'Today' },
                                { name: 'Faiza M.', reason: 'Exam Prep', date: '5 days left' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-black group-hover:bg-[#FFB800] group-hover:text-[#1D366D] transition-all">
                                        {item.name[0]}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold font-outfit leading-tight">{item.name}</p>
                                        <p className="text-xs text-blue-300 font-medium">{item.reason}</p>
                                    </div>
                                    <div className="text-[10px] bg-red-500 px-2 py-1 rounded-full font-black uppercase tracking-widest whitespace-nowrap">
                                        {item.date}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-10 py-4 rounded-2xl bg-[#FFB800] text-[#1D366D] font-black font-outfit uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-black/20">
                            Review All Alerts
                        </button>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#00529B] rounded-full opacity-20 blur-3xl shadow-[0_0_100px_#00529B]" />
                </div>
            </div>
        </div>
    );
}
