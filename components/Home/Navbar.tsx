'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Our Mission', href: '#mission' },
        { name: 'Organization', href: '#organization' },
        { name: 'Support Us', href: '#support' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            className={`${isScrolled
                ? 'fixed top-[52px] bg-black/80 backdrop-blur-md py-8 shadow-lg'
                : 'absolute top-0 bg-transparent py-8'
                } left-0 right-0 z-50 transition-all duration-300`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="/" className="text-orange-500 text-2xl font-bold tracking-tight">
                            KenyaKeys
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-200 hover:text-orange-400 transition-colors duration-200 text-sm font-medium uppercase tracking-wider"
                                >
                                    {item.name}
                                </a>
                            ))}
                            <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-all duration-200 text-sm font-bold shadow-md hover:shadow-orange-500/20 active:scale-95">
                                Donate Now
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
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
                className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100 py-6 border-b border-white/10' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 space-y-4">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-white hover:text-orange-400 block py-2 text-lg font-medium transition-colors duration-200"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </a>
                    ))}
                    <button className="w-full bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors duration-200 font-bold mt-4">
                        Donate Now
                    </button>
                </div>
            </div>
        </nav>
    );
}
