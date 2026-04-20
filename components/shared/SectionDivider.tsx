'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
    label?: string;
    accentColor?: string;
    center?: boolean;
}

export default function SectionDivider({ 
    label, 
    accentColor = "#FFB800",
    center = false 
}: SectionDividerProps) {
    return (
        <div className={`flex items-center gap-6 my-16 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 ${center ? 'justify-center' : 'justify-start'}`}>
            {label && (
                <span className="text-[#333] font-black text-sm uppercase tracking-[0.3em] font-outfit whitespace-nowrap">
                    {label}
                </span>
            )}
            <div 
                className="h-[3px] flex-1 rounded-full opacity-30"
                style={{ backgroundColor: accentColor }}
            />
        </div>
    );
}
