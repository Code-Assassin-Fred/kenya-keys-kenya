import { Metadata } from 'next';
import { getLeadershipBySlug } from '@/lib/leadershipData';
import { notFound } from 'next/navigation';
import ProfileClient from '@/components/Who we are/ProfileClient';
import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';
import JsonLd, { createBreadcrumbSchema } from '@/components/seo/JsonLd';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const profile = getLeadershipBySlug(slug);
    if (!profile) return {};
    
    const title = `${profile.name} - ${profile.role} | Kenya Keys`;
    const description = profile.bio[0] || `Learn more about ${profile.name}, ${profile.role} at Kenya Keys.`;
    
    return {
        title,
        description,
        alternates: {
            canonical: `https://kenyakeys-pbokenya.org/who-we-are/leadership/${slug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://kenyakeys-pbokenya.org/who-we-are/leadership/${slug}`,
            images: [
                {
                    url: profile.image,
                    alt: profile.name,
                }
            ],
        }
    };
}

export default async function LeadershipProfile({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const profile = getLeadershipBySlug(slug);
    
    if (!profile) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <JsonLd data={createBreadcrumbSchema([
                    { name: "Home", url: "https://kenyakeys-pbokenya.org" },
                    { name: "About Us", url: "https://kenyakeys-pbokenya.org/who-we-are" },
                    { name: profile.name, url: `https://kenyakeys-pbokenya.org/who-we-are/leadership/${slug}` },
                ])} />
                <ProfileClient profile={profile} />
            </main>
            <Footer />
        </div>
    );
}

