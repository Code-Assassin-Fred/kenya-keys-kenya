import { adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const session = (await cookies()).get("admin_session");
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const snap = await adminDb.collection('donations').orderBy('date', 'desc').get();
        const donations = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const totalRevenue = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
        const uniqueDonors = new Set(donations.map(d => d.email || d.donor)).size;

        return NextResponse.json({
            donations,
            totalRevenue,
            donorCount: uniqueDonors
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
    }
}
