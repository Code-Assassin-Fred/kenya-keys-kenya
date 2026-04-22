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
        
        let totalDonations = 0;
        donationsSnap.forEach(doc => {
            totalDonations += doc.data().amount || 0;
        });

        return NextResponse.json({
            studentCount: studentsSnap.size,
            donationTotal: totalDonations,
            urgentSponsorships: studentsSnap.docs.filter(d => d.data().sponsorship === 'Urgent').length,
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
