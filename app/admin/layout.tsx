'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { AdminProvider, useAdmin } from '@/lib/context/AdminContext';

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
    const isAuthPage = pathname === '/admin/login' || pathname === '/admin/signup' || pathname === '/admin/setup';

    // Don't wrap auth pages in provider or validate sessions
    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <AdminProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AdminProvider>
    );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { user, loading } = useAdmin();

    // Redirect to login if unauthorized
    useEffect(() => {
        if (!loading && !user) {
            router.replace('/admin/login');
        }
    }, [loading, user, router]);

    // Show loading screen while validating session
    if (loading || !user) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#3B82F6] mx-auto" />
                    <p className="text-sm text-[#667085] font-outfit font-medium mt-4">Verifying session...</p>
                </div>
            </div>
        );
    }

    // Check permissions for the current page
    let hasAccess = false;
    if (pathname === '/admin') {
        hasAccess = true;
    } else if (user.role === 'admin') {
        hasAccess = true;
    } else {
        // Sub-admin: check explicit permissions. Block /admin/users regardless.
        const isUsersPage = pathname === '/admin/users' || pathname.startsWith('/admin/users/');
        if (!isUsersPage) {
            hasAccess = user.permissions.some(p => pathname === p || pathname.startsWith(p + '/'));
        }
    }

    async function handleLogout() {
        setIsLoggingOut(true);
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch {}
        try { localStorage.removeItem('kk_last_login_method'); } catch {}
        router.replace('/admin/login');
    }

    // Filter sidebar navigation links based on permissions
    const allowedNavItems = navItems.filter(item => {
        if (item.href === '/admin') return true;
        if (user.role === 'admin') return true;
        if (item.href === '/admin/users') return false; // Sub-admins cannot manage admins
        return user.permissions.some(p => item.href === p || item.href.startsWith(p + '/'));
    });

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
                            src="/Kenya Keys Logo With Background.webp" 
                            alt="Kenya Keys Logo" 
                            className="h-14 w-auto object-contain rounded-lg shadow-sm" 
                        />
                    </Link>
                </div>

                {/* Nav Links */}
                <nav className="mt-4 flex-1 px-4 space-y-1">
                    {allowedNavItems.map((item) => {
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
                    <button 
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all group disabled:opacity-50"
                    >
                        {isSidebarOpen && (
                            <span className="font-outfit font-medium text-sm">
                                {isLoggingOut ? 'Logging out...' : 'Logout'}
                            </span>
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
                                <p className="text-sm font-semibold text-[#101828] font-outfit leading-none">
                                    {user.displayName || 'Admin User'}
                                </p>
                                <p className="text-[10px] font-medium text-[#667085] mt-1 capitalize">
                                    {user.role === 'admin' ? 'Super Admin' : 'Sub Admin'}
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-[#FCFCFD] custom-scrollbar">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {hasAccess ? (
                            children
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white border border-[#F2F4F7] rounded-2xl p-12 text-center max-w-lg mx-auto shadow-sm mt-12"
                            >
                                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0-6v2m0-5a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h1 className="text-xl font-bold text-[#101828] font-outfit uppercase tracking-wide">Access Denied</h1>
                                <p className="text-[#667085] mt-3 text-sm font-medium font-outfit leading-relaxed">
                                    You do not have the required administrative permissions to view this section. Please contact the director if you believe this is an error.
                                </p>
                                <div className="mt-8">
                                    <Link 
                                        href="/admin"
                                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl text-white bg-[#101828] hover:bg-[#1d2939] transition-all font-outfit uppercase tracking-wider no-underline"
                                    >
                                        Back to Overview
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
