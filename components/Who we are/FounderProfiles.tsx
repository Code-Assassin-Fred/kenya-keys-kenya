'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check } from 'lucide-react';

/* ─── Founder Data ─── */

interface ContributionItem {
    title: string;
    description: string;
}

interface ContributionColumn {
    heading: string;
    items: ContributionItem[];
}

interface FounderCard {
    name: string;
    role: string;
    image: string;
    imageAlt: string;
    bio: string[];
    columns: [ContributionColumn, ContributionColumn];
    imagePosition: 'left' | 'right';
}

const founders: FounderCard[] = [
    {
        name: 'Joseph Mwengea',
        role: 'Co-Founder, CEO & Director',
        image: '/Leadership and Staff/Joseph Mwengea Director.webp',
        imageAlt: 'Joseph Mwengea — Co-Founder, CEO & Director of Kenya Keys',
        imagePosition: 'right',
        bio: [
            'Joseph Mwengea was born and raised in the rural village of Mbitini, Ikutha location, in Kitui South — a recognized drought-prone, arid and semi-arid region where there is barely enough rain to support farming. At an early age, he walked six kilometres barefoot to access primary school. A devastating famine in 1984 forced his father to migrate for work, but he passed away two years later, leaving the family under the care of Joseph\'s mother and three sisters.',
            'Despite extreme hardship, Joseph became the only one in his family to reach high school — funding his education through construction-site labour and the compassion of a school principal who wrote off his fees and guided him to Machakos Teachers Training College. These experiences ignited a lifelong conviction: that education can break the cycle of poverty.',
            'After being posted as a teacher in Kwale District, Joseph rose to become Headteacher of Bahakwenu Primary School, where he witnessed firsthand how qualified students failed to join high school simply because they could not pay the fees. It was here he met Rinda Hayes, and together they co-founded Kenya Keys in 2005 — beginning with the first cohort of 14 sponsored students.',
        ],
        columns: [
            {
                heading: 'Key Contributions',
                items: [
                    {
                        title: 'Co-Founder of Kenya Keys',
                        description: 'Established the organisation in 2005 with Rinda Hayes, driven by a shared vision of unlocking educational opportunities for rural boys and girls.',
                    },
                    {
                        title: 'Community Grassroots Mobilization',
                        description: 'Leveraged over 30 years as a public-school educator to build trust, partnerships, and support for Kenya Keys at the community level.',
                    },
                    {
                        title: 'Student Sponsorship & Mentorship',
                        description: 'Personally championed the scholarship programme that has grown from 14 students to over 934 sponsored learners.',
                    },
                    {
                        title: 'School Infrastructure Development',
                        description: 'Led the expansion of Kenya Keys into building classrooms, libraries, and sanitary facilities for public schools.',
                    },
                ],
            },
            {
                heading: 'Passion & Legacy',
                items: [
                    {
                        title: 'Humanitarian Dedication',
                        description: 'Devoted his life to ensuring that somewhere in rural Kenya, a child\'s dream is coming true because of Kenya Keys.',
                    },
                    {
                        title: 'Health & Hygiene Programmes',
                        description: 'Expanded Kenya Keys to include programmes providing girls with sanitary pads for safe, dignified, and uninterrupted school days.',
                    },
                    {
                        title: 'From Poverty to Purpose',
                        description: 'His own experience overcoming extreme poverty as a child in Kitui South fuels his relentless drive to open doors for the next generation.',
                    },
                ],
            },
        ],
    },
    {
        name: 'Rinda & Brant Hayes',
        role: 'Co-Founders',
        image: '/WhatsApp Image 2026-04-19 at 20.34.26.webp',
        imageAlt: 'Rinda and Brant Hayes — Co-Founders of Kenya Keys',
        imagePosition: 'left',
        bio: [
            'Rinda Hayes\'s heart was struck by the extreme poverty she witnessed while visiting Kwale County — bright students who qualified for high school but could never report because their families simply could not afford the fees. Their dreams were being shut down before they even began. Together with Joseph Mwengea, she co-founded Kenya Keys in 2005, beginning by sponsoring the first cohort of 14 students into public high schools where children had been learning under trees, sitting on bare soil.',
            'Two years later, her husband Brant Hayes joined the effort and became the backbone supporting their growing initiative. Together, the Hayes family dedicated themselves to the conviction that education unlocks potential and that poverty — however complex and dehumanizing — can be overcome through sustained, community-rooted investment in young people.',
            'It didn\'t take long for Rinda and Brant to realize that supporting students from poor households required more than sponsorships alone; it demanded improving the very schools those students attended. Kenya Keys expanded into infrastructure projects — building classrooms, libraries, and toilet facilities — and later introduced health and hygiene programmes providing girls with sanitary pads for safe, dignified, and uninterrupted school days.',
        ],
        columns: [
            {
                heading: 'Key Contributions',
                items: [
                    {
                        title: 'Co-Founded Kenya Keys (2005)',
                        description: 'Rinda partnered with Joseph Mwengea to launch the organisation after witnessing students whose educational dreams were being shut down by poverty.',
                    },
                    {
                        title: 'Operational Backbone',
                        description: 'Brant Hayes joined in 2007, providing critical logistical, operational, and financial support that enabled the organisation to scale.',
                    },
                    {
                        title: 'Infrastructure & Programme Expansion',
                        description: 'Championed the growth from student sponsorships into building classrooms, libraries, and sanitary facilities for public schools.',
                    },
                ],
            },
            {
                heading: 'Vision & Legacy',
                items: [
                    {
                        title: 'Education as Liberation',
                        description: 'A lifelong conviction that education unlocks potential and creates pathways out of the most complex cycles of poverty.',
                    },
                    {
                        title: 'Girls\' Health & Hygiene',
                        description: 'Introduced programmes providing sanitary pads to ensure girls attend school safely, with dignity, and without interruption.',
                    },
                    {
                        title: 'Locally-Led Transition',
                        description: 'Helped establish the foundation for Kenya Keys to transition to full local Kenyan leadership and community ownership.',
                    },
                ],
            },
        ],
    },
];

/* ─── Sub-components ─── */

function ContributionList({ column }: { column: ContributionColumn }) {
    return (
        <div>
            <h4 className="text-[#1A1A1A] font-oswald font-bold text-base uppercase tracking-wide mb-6">
                {column.heading}
            </h4>
            <ul className="space-y-5">
                {column.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#009bba] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </span>
                        <div>
                            <p className="font-outfit font-bold text-sm text-[#1A1A1A] leading-snug">
                                {item.title}
                            </p>
                            <p className="font-outfit text-sm text-gray-600 leading-relaxed mt-0.5">
                                {item.description}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function FounderImage({ founder }: { founder: FounderCard }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: founder.imagePosition === 'left' ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-[42%] flex-shrink-0"
        >
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden shadow-2xl">
                {/* Decorative accent bar */}
                <div
                    className={`absolute top-0 ${founder.imagePosition === 'left' ? 'right-0' : 'left-0'} w-24 h-full bg-gradient-to-b from-[#E85D2A] via-[#E85D2A]/60 to-transparent z-10 opacity-80`}
                />
                <Image
                    src={founder.image}
                    alt={founder.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                />
                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
        </motion.div>
    );
}

function FounderText({ founder }: { founder: FounderCard }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="w-full lg:w-[55%]"
        >
            {/* Name & Role */}
            <h3 className="text-3xl md:text-[2.6rem] font-black text-[#1A1A1A] font-oswald leading-[1.1] tracking-tight">
                {founder.name}
            </h3>
            <p className="text-[#009bba] font-outfit font-bold text-sm uppercase tracking-[0.15em] mt-2 mb-8">
                {founder.role}
            </p>

            {/* Bio Paragraphs */}
            <div className="space-y-5">
                {founder.bio.map((para, idx) => (
                    <p
                        key={idx}
                        className="text-gray-700 font-outfit text-[0.95rem] leading-[1.85]"
                    >
                        {para}
                    </p>
                ))}
            </div>

            {/* Contribution Columns */}
            <div className="mt-10 pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-10">
                {founder.columns.map((col, idx) => (
                    <ContributionList key={idx} column={col} />
                ))}
            </div>
        </motion.div>
    );
}

/* ─── Main Component ─── */

export default function FounderProfiles() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

                {/* Founder Cards */}
                <div className="space-y-32">
                    {founders.map((founder, idx) => (
                        <div
                            key={founder.name}
                            className={`flex flex-col ${
                                founder.imagePosition === 'left'
                                    ? 'lg:flex-row'
                                    : 'lg:flex-row-reverse'
                            } items-start gap-12 lg:gap-16`}
                        >
                            <FounderImage founder={founder} />
                            <FounderText founder={founder} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
