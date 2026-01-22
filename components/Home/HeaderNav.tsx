"use client";

import { useState, useEffect } from 'react';
import { ChevronDown, Phone, Mail } from 'lucide-react';

export default function HeaderNav() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="h-[52px]">
            <header
                className={`${isScrolled ? 'fixed top-0 shadow-md' : 'relative'
                    } w-full bg-gray-200 border-b border-gray-300 z-[60] h-[52px] transition-all duration-300 font-outfit`}
            >
                <div className="flex items-center justify-between px-4 h-full">
                    {/* Left side - Language Selector */}
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 text-gray-800 hover:text-gray-600 transition-colors">
                            <span className="font-semibold text-sm">Select Language</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        <span className="text-xs text-gray-600">Powered by Google Translate</span>
                    </div>

                    {/* Right side - Navigation */}
                    <div className="flex items-center gap-0 h-full">
                        <div className="hidden sm:flex items-center gap-6 mr-6 h-full text-gray-600 text-sm font-medium">
                            <a href="tel:+15036792410" className="flex items-center gap-2 hover:text-orange-600 transition-colors">
                                <Phone className="w-4 h-4" />
                                <span>503-679-2410</span>
                            </a>
                            <a href="mailto:info@kenyakeys.org" className="flex items-center gap-2 hover:text-orange-600 transition-colors">
                                <Mail className="w-4 h-4" />
                                <span>info@kenyakeys.org</span>
                            </a>
                        </div>
                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 h-full transition-colors rounded-none">
                            Donate
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
}