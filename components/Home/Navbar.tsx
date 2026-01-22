'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const navItems = [

        {
            label: 'Support a Student',
            href: '#',
            children: [
                { label: 'Sponsorship Overview', href: '/sponsorship-overview' },
                { label: 'Student Catalog', href: '/student-catalog' },
                { label: 'Progress Reports', href: '/progress-reports' },
                { label: 'Sponsor Letters', href: '/sponsor-letters' },
            ],
        },
        {
            label: 'Programs',
            href: '#',
            children: [
                { label: 'Programs Overview', href: '/programs' },
                { label: 'Student Support Services', href: '/student-support' },
                { label: 'Community Learning', href: '/community-learning' },
                { label: 'Learning Center / Library', href: '/learning-center' },
            ],
        },
        {
            label: 'Impact',
            href: '#',
            children: [
                { label: 'Metrics & Data', href: '/metrics' },
                { label: 'Success Stories', href: '/success-stories' },
            ],
        },
        {
            label: 'Donate',
            href: '#',
            children: [
                { label: 'Ways to Give', href: '/ways-to-give' },
                { label: 'Education Fund', href: '/education-fund' },
            ],
        },
        {
            label: 'News',
            href: '#',
            children: [
                { label: 'Latest Updates', href: '/updates' },
                { label: 'Photo Gallery', href: '/gallery' },
            ],
        },
        {
            label: 'About',
            href: '#',
            children: [
                { label: 'Our Mission', href: '/mission' },
                { label: 'Leadership Team', href: '/team' },
                { label: 'Our Partners', href: '/partners' },
                { label: 'FAQ', href: '/faq' },
            ],
        },
        { label: 'Contact', href: '/contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDropdown = (label: string) => {
        if (activeDropdown === label) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(label);
        }
    };

    return (
        <nav
            className={`${isScrolled
                ? 'fixed top-[52px] bg-black/80 backdrop-blur-md py-6 shadow-lg'
                : 'absolute top-0 bg-transparent py-8'
                } left-0 right-0 z-50 transition-all duration-300 font-outfit`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-orange-500 text-2xl font-bold tracking-tight">
                            KenyaKeys
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden xl:block">
                        <div className="flex items-center space-x-6">
                            {navItems.map((item) => (
                                <div
                                    key={item.label}
                                    className="relative group h-full"
                                >
                                    {item.children ? (
                                        <button className="flex items-center gap-1 text-gray-200 hover:text-orange-400 transition-colors duration-200 text-sm font-medium uppercase tracking-wider py-2 group-hover:text-orange-400">
                                            {item.label}
                                            <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                                        </button>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="text-gray-200 hover:text-orange-400 transition-colors duration-200 text-sm font-medium uppercase tracking-wider block py-2"
                                        >
                                            {item.label}
                                        </Link>
                                    )}

                                    {/* Dropdown Menu */}
                                    {item.children && (
                                        <div className="absolute top-full left-0 pt-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <div className="bg-white rounded-xl shadow-xl overflow-hidden py-2 border border-blue-50">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.label}
                                                        href={child.href}
                                                        className="block px-4 py-3 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="xl:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-orange-400 transition-colors duration-200 p-2"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`xl:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[85vh] opacity-100 py-6 border-b border-white/10 overflow-y-auto' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 space-y-2 pt-2 pb-8">
                    {navItems.map((item) => (
                        <div key={item.label} className="border-b border-white/5 last:border-0 pb-2">
                            {item.children ? (
                                <div>
                                    <button
                                        onClick={() => toggleDropdown(item.label)}
                                        className="flex items-center justify-between w-full text-white hover:text-orange-400 py-3 text-lg font-medium transition-colors duration-200"
                                    >
                                        {item.label}
                                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180 text-orange-500' : 'text-gray-400'}`} />
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === item.label ? 'max-h-96 opacity-100 mb-2' : 'max-h-0 opacity-0'}`}>
                                        <div className="pl-4 space-y-1 mt-1 border-l-2 border-orange-500/30 ml-2">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className="block text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm transition-all"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="block text-white hover:text-orange-400 py-3 text-lg font-medium transition-colors duration-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
}
