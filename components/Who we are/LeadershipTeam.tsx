'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const boardMembers = [
    { name: "Eunice Kioko", role: "Board Chairperson", image: "/Leadership and Staff/Eunice Kioko.webp", slug: "eunice-kioko" },
    { name: "Elias Tsuma", role: "Board Member", image: "/Leadership and Staff/Tsuma.webp", slug: "elias-tsuma" },
    { name: "Joseph Mwengea", role: "Founder and Director", image: "/Leadership and Staff/Joseph Mwengea Director.png", slug: "joseph-mwengea" },
    { name: "Mike Mutua", role: "Board Member", image: "/Leadership and Staff/Mike.webp", slug: "mike-mutua" },
    { name: "Emmanuel Mwengi", role: "Board Member", image: "/Leadership and Staff/Mwengi.webp", slug: "emmanuel-mwengi" },
    { name: "Alice Mwaka", role: "Board Member", image: "/Leadership and Staff/Alice.webp", slug: "alice-mwaka" },
    { name: "Marstela Tesha", role: "Board Member", image: "/Leadership and Staff/Marstela.webp", slug: "marstela-tesha" },
    { name: "Linah Mjomba", role: "Board Member", image: "/Leadership and Staff/Linah.webp", slug: "linah-mjomba" },
    { name: "Hope G Mwanyuma", role: "Board Member and Alumnus", image: "/Leadership and Staff/Hope.png", slug: "hope-mwanyuma" },
    { name: "Luvuno Lung'anzi Chai", role: "Board Member", image: "/Leadership and Staff/Luvuno.webp", slug: "luvuno-chai" },
    { name: "Raphael Mangisi", role: "Board Member", image: "/Leadership and Staff/Mangisi.webp", slug: "raphael-mangisi" },
];

const staffMembers = [
    { name: "Joseph Mwengea", role: "Founder & Executive Director", image: "/Leadership and Staff/Joseph Mwengea Director.png", slug: "joseph-mwengea" },
    { name: "Franciscah Kamene", role: "Senior Director of Operations", image: "/Leadership and Staff/Francisca.webp" },
    { name: "Alex Mutuku", role: "Finance Director", image: "/Leadership and Staff/Mutuku.webp" },
    { name: "Stephen Kabani", role: "Sponsorship Director", image: "/Leadership and Staff/Stephen+Kabani.webp" },
    { name: "Winnie Seche", role: "Program Manager", image: "/Leadership and Staff/Winnie Seche.webp" },
    { name: "Clemence Budala", role: "Program Director", image: "/Leadership and Staff/Clemence.webp" },
    { name: "Mariam Omar", role: "Assistant Sponsorship Director", image: "/Leadership and Staff/Mariam+Omar.webp" },
    { name: "James Julo", role: "Program Coordinator", image: "/Leadership and Staff/james Julo.webp" },
    { name: "Nelson Mangale", role: "Program Coordinator", image: "/Leadership and Staff/Nelson.webp" },
    { name: "Beatrice Mnazi", role: "Program Coordinator", image: "/Leadership and Staff/Mnazi.webp" },
    { name: "Mwanaisha Mwayama", role: "Librarian", image: "/Leadership and Staff/Mwanaisha+Mwayama.webp" },
];

const MemberCard = ({ member, index }: { member: any, index: number }) => {
    const cardContent = (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={`group relative ${member.slug ? 'cursor-pointer' : ''}`}
        >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 shadow-md group-hover:shadow-xl transition-all duration-500">
                {/* Image styling: grayscale to color on hover */}
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/400x500?text=No+Image";
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Text Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                    <h4 className="text-white font-oswald text-xl uppercase tracking-tight leading-none mb-1 group-hover:text-[#FFB800] transition-colors duration-300">
                        {member.name}
                    </h4>
                    <p className="text-gray-300 font-outfit text-[11px] uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors">
                        {member.role}
                    </p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 backdrop-blur-md flex items-center justify-center rounded-bl-2xl transition-all duration-300 group-hover:bg-[#009bba]">
                    {member.slug ? (
                        <div className="w-1 h-1 bg-white rounded-full group-hover:scale-150 transition-transform" />
                    ) : (
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                    )}
                </div>
            </div>
        </motion.div>
    );

    if (member.slug) {
        return (
            <Link href={`/who-we-are/leadership/${member.slug}`}>
                {cardContent}
            </Link>
        );
    }

    return cardContent;
};

export default function LeadershipTeam() {
    return (
        <section id="leadership" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

                {/* Board of Directors Section */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-[#00529B] font-black text-sm uppercase tracking-[0.4em] font-outfit mb-4">Kenya Leadership</h2>
                            <h3 className="text-3xl md:text-5xl font-black text-[#1A1A1A] font-oswald uppercase tracking-tight">Board of <span className="text-[#009bba]">Directors</span></h3>
                            <p className="mt-8 text-gray-600 font-outfit max-w-2xl mx-auto text-lg leading-relaxed">
                                We believe in local leadership. Essential decisions are made by the Kenyan Board of Directors and staff, giving the community crucial ownership, accountability, and leadership.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {boardMembers.map((member, idx) => (
                            <MemberCard key={member.name + idx} member={member} index={idx} />
                        ))}
                    </div>
                </div>

                {/* Staff Section */}
                <div>
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-[#00529B] font-black text-sm uppercase tracking-[0.4em] font-outfit mb-4">Our Dedicated Team</h2>
                            <h3 className="text-3xl md:text-5xl font-black text-[#1A1A1A] font-oswald uppercase tracking-tight">Meet Our <span className="text-[#009bba]">Staff</span></h3>
                            <p className="mt-8 text-gray-600 font-outfit max-w-2xl mx-auto text-lg leading-relaxed">
                                Our Kenyan staff make essential decisions about and implement our student services, giving the community crucial ownership, accountability, and leadership.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {staffMembers.map((member, idx) => (
                            <MemberCard key={member.name + idx} member={member} index={idx} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
