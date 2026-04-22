import { adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    // Basic session check
    const session = (await cookies()).get("admin_session");
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const studentsSnap = await adminDb.collection('students').get();
        const donationsSnap = await adminDb.collection('donations').get();
        
        const totalStudents = studentsSnap.size;
        const sponsoredStudents = studentsSnap.docs.filter(d => d.data().sponsorship === 'Sponsored').length;
        const urgentStudents = studentsSnap.docs.filter(d => d.data().sponsorship === 'Urgent');
        
        const sponsorshipRate = totalStudents > 0 ? Math.round((sponsoredStudents / totalStudents) * 100) : 0;

        let totalDonations = 0;
        donationsSnap.forEach(doc => {
            totalDonations += doc.data().amount || 0;
        });

        // Get 3 most recent urgent alerts
        const recentAlerts = urgentStudents.slice(0, 3).map(doc => ({
            id: doc.id,
            name: doc.data().name,
            reason: doc.data().grade || 'Sponsorship Needed',
            date: 'Urgent'
        }));

        return NextResponse.json({
            studentCount: totalStudents,
            donationTotal: totalDonations,
            urgentSponsorships: urgentStudents.length,
            sponsorshipRate: `${sponsorshipRate}%`,
            recentAlerts
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
