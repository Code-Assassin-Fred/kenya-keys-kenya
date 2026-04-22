import { getLeadershipBySlug } from '@/lib/leadershipData';
import { notFound } from 'next/navigation';
import ProfileClient from '@/components/Who we are/ProfileClient';
import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';

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
                <ProfileClient profile={profile} />
            </main>
            <Footer />
        </div>
    );
}
