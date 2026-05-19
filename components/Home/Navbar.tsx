'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Search, Globe, Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const lastScrollY = useRef(0);

    const navItems = [
        {
            label: 'Who We Are',
            href: '/who-we-are',
            children: [
                { label: 'Our Mission', href: '/who-we-are#hero' },
                { label: 'Leadership Team', href: '/who-we-are#leadership' },
                { label: 'Partners', href: '/who-we-are#partners' },
            ],
        },
        {
            label: 'Programs',
            href: '/programs',
        },
        {
            label: 'Get Involved',
            href: '#',
            children: [
                { label: 'Donate', href: '/donate' },
                { label: 'Sponsor a Student', href: '/sponsorship-overview' },
                { label: 'Student Catalog', href: '/student-catalog' },
            ],
        },
        {
            label: 'Impact',
            href: '/impact',
            children: [
                // { label: 'Success Stories', href: '/impact#stories' },
                { label: 'Metrics & Data', href: '/impact#stats' },
                { label: 'Reports', href: '/impact#reports' },
            ],
        },
        {
            label: 'News',
            href: '/news',
            children: [
                { label: 'Photo Gallery', href: '/news' },
            ],
        },
        {
            label: 'Contact',
            href: '/#contact',
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setIsScrolled(currentScrollY > 50);

            // Determine scroll direction
            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                // Scrolling down
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY.current) {
                // Scrolling up
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleHashScroll = () => {
            if (typeof window !== 'undefined') {
                const hash = window.location.hash;
                if (hash) {
                    const targetId = hash.replace('#', '');
                    const element = document.getElementById(targetId);
                    if (element) {
                        setTimeout(() => {
                            const offset = 120; // sticky navbar height
                            const bodyRect = document.body.getBoundingClientRect().top;
                            const elementRect = element.getBoundingClientRect().top;
                            const elementPosition = elementRect - bodyRect;
                            const offsetPosition = elementPosition - offset;

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        }, 100);
                    }
                }
            }
        };

        if (document.readyState === 'complete') {
            handleHashScroll();
        } else {
            window.addEventListener('load', handleHashScroll);
        }

        window.addEventListener('hashchange', handleHashScroll);

        return () => {
            window.removeEventListener('load', handleHashScroll);
            window.removeEventListener('hashchange', handleHashScroll);
        };
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
                ? `fixed top-0 bg-white py-0 shadow-lg ${!isVisible ? '-translate-y-full' : 'translate-y-0'}`
                : 'relative bg-white py-0'
                } left-0 right-0 z-50 transition-all duration-300 font-outfit border-b border-gray-100 uppercase`}
        >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-20 lg:h-30 flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center">
                    <img
                        src="/Kenya Keys Logo.png"
                        alt="Kenya Keys Logo"
                        className="h-24 lg:h-45 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex flex-1 justify-end items-center space-x-1 h-full mr-6">
                    {navItems.map((item) => (
                        <div
                            key={item.label}
                            className="relative group h-full flex items-center px-4"
                        >
                            {item.children ? (
                                <button className="flex items-center gap-1.5 text-[#333] hover:text-red-600 transition-colors duration-200 text-[14px] font-bold tracking-wider py-2 group-hover:text-red-600">
                                    {item.label}
                                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-red-600" />
                                </button>
                            ) : (
                                <Link href={item.href || '#'} className="flex items-center gap-1.5 text-[#333] hover:text-red-600 transition-colors duration-200 text-[14px] font-bold tracking-wider py-2 group-hover:text-red-600">
                                    {item.label}
                                </Link>
                            )}

                            {/* Dropdown Menu */}
                            {item.children && (
                                <div className="absolute top-[calc(100%-1px)] left-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-0 z-50">
                                    <div className="bg-white border-t-[3px] border-red-600 shadow-2xl py-0 mt-0 flex flex-col">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.label}
                                                href={child.href}
                                                className="block px-6 py-4 text-[14px] text-[#333] hover:bg-gray-50 hover:text-red-600 transition-colors font-bold border-b border-gray-100 last:border-0"
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

                {/* Right Side Actions */}
                <div className="flex items-center gap-0 h-full ml-auto">

                    {/* Teal Donate Button */}
                    <Link
                        href="/donate"
                        className="bg-[#009bba] hover:bg-[#00819c] text-white font-black px-8 h-full flex items-center gap-3 transition-colors tracking-widest text-base"
                    >
                        Donate
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-4 text-[#333] hover:text-red-600 transition-colors border-l border-gray-100"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[85vh] opacity-100 border-b border-gray-200' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="p-4 space-y-0">
                    {navItems.map((item) => (
                        <div key={item.label} className="border-b border-gray-100 last:border-0">
                            {item.children ? (
                                <>
                                    <button
                                        onClick={() => toggleDropdown(item.label)}
                                        className="flex items-center justify-between w-full text-[#333] hover:text-red-600 py-4 text-base font-bold transition-colors duration-200"
                                    >
                                        {item.label}
                                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 text-red-600 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === item.label ? 'max-h-[400px] pb-4' : 'max-h-0'}`}>
                                        <div className="space-y-0 border-t border-gray-50 mt-1">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className="block text-[#555] hover:text-red-600 hover:bg-gray-50 px-4 py-4 text-[14px] font-bold border-b border-gray-50 last:border-0"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href={item.href || '#'}
                                    className="flex items-center justify-between w-full text-[#333] hover:text-red-600 py-4 text-base font-bold transition-colors duration-200"
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
