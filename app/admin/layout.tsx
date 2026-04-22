'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard, 
    Users, 
    Package, 
    Heart, 
    UserPlus, 
    LogOut, 
    Menu, 
    X,
    Bell,
    Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Student Catalog', href: '/admin/students', icon: Users },
    { name: 'Donations', href: '/admin/donations', icon: Heart },
    { name: 'Packages', href: '/admin/packages', icon: Package },
    { name: 'Sub-Admins', href: '/admin/users', icon: UserPlus },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Don't show sidebar on login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            {/* Sidebar */}
            <aside 
                className={`${
                    isSidebarOpen ? 'w-72' : 'w-20'
                } bg-[#2B4C9B] transition-all duration-300 ease-in-out flex flex-col relative z-50`}
            >
                {/* Logo Area */}
                <div className="p-6 flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#FFB800] rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-[#2B4C9B] font-black text-xl">K</span>
                    </div>
                    {isSidebarOpen && (
                        <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-white font-oswald font-black uppercase tracking-widest text-lg whitespace-nowrap"
                        >
                            Kenya Keys Admin
                        </motion.span>
                    )}
                </div>

                {/* Nav Links */}
                <nav className="mt-8 flex-1 px-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link 
                                key={item.name} 
                                href={item.href}
                                className={`flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                                    isActive 
                                        ? 'bg-[#3B82F6] text-white shadow-lg shadow-blue-900/10' 
                                        : 'text-blue-100/60 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#FFB800]' : 'group-hover:text-[#FFB800]'}`} />
                                {isSidebarOpen && (
                                    <span className="font-outfit font-bold text-sm tracking-wide">
                                        {item.name}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-white/10">
                    <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-300 hover:bg-red-500/10 transition-all group">
                        <LogOut className="w-5 h-5" />
                        {isSidebarOpen && (
                            <span className="font-outfit font-bold text-sm">Logout</span>
                        )}
                    </button>
                </div>

                {/* Toggle Button */}
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-4 top-20 bg-[#FFB800] text-[#2B4C9B] p-1 rounded-full shadow-xl hover:scale-110 transition-all"
                >
                    {isSidebarOpen ? <X size={16} /> : <Menu size={16} />}
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input 
                                type="text" 
                                placeholder="Search everything..."
                                className="pl-12 pr-6 py-2.5 rounded-full bg-gray-50 border-none focus:ring-4 focus:ring-[#3B82F6]/10 w-80 font-outfit text-sm transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-gray-400 hover:text-[#2B4C9B] transition-all">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="h-8 w-px bg-gray-100" />
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-black text-[#2B4C9B] font-outfit leading-none">Admin User</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center text-white font-bold font-outfit">
                                AD
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                    {children}
                </div>
            </main>
        </div>
    );
}
