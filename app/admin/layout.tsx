'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { name: 'Overview', href: '/admin' },
    { name: 'Student Catalog', href: '/admin/students' },
    { name: 'Packages', href: '/admin/packages' },
    { name: 'Contact Messages', href: '/admin/messages' },
    { name: 'Interested Donors', href: '/admin/donors' },
    { name: 'Sub-Admins', href: '/admin/users' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Don't show sidebar on login or signup pages
    if (pathname === '/admin/login' || pathname === '/admin/signup') {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-white flex">
            {/* Sidebar */}
            <aside 
                className={`${
                    isSidebarOpen ? 'w-64' : 'w-0'
                } bg-[#101828] transition-all duration-300 ease-in-out flex flex-col relative z-50 border-r border-[#1d2939] overflow-hidden`}
            >
                {/* Logo Area */}
                <div className="p-6 flex items-center justify-start border-b border-[#1d2939] h-24">
                    <Link href="/admin" className="flex items-center w-full">
                        <img 
                            src="/Kenya Keys Logo With Background.png" 
                            alt="Kenya Keys Logo" 
                            className="h-14 w-auto object-contain rounded-lg shadow-sm" 
                        />
                    </Link>
                </div>

                {/* Nav Links */}
                <nav className="mt-4 flex-1 px-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link 
                                key={item.name} 
                                href={item.href}
                                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group relative ${
                                    isActive 
                                        ? 'bg-[#1d2939] text-white' 
                                        : 'text-[#94A3B8] hover:bg-[#1d2939] hover:text-white'
                                }`}
                            >
                                {isActive && (
                                    <motion.div 
                                        layoutId="activeNav"
                                        className="absolute left-0 w-1 h-6 bg-[#32D583] rounded-r-full"
                                    />
                                )}
                                {isSidebarOpen && (
                                    <span className="font-outfit font-medium text-sm">
                                        {item.name}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-[#1d2939]">
                    <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all group">
                        {isSidebarOpen && (
                            <span className="font-outfit font-medium text-sm">Logout</span>
                        )}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-white">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-[#F2F4F7] flex items-center justify-between px-8 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-[#667085] hover:text-[#101828] transition-all font-bold text-sm"
                        >
                            {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
                        </button>
                        <div className="h-4 w-px bg-[#F2F4F7]" />
                        <h2 className="text-[#101828] font-outfit font-semibold text-sm">
                            {navItems.find(i => i.href === pathname)?.name || 'Admin'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-[#101828] font-outfit leading-none">Admin User</p>
                                <p className="text-[10px] font-medium text-[#667085] mt-1">Super Admin</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-[#FCFCFD] custom-scrollbar">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
