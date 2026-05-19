import { adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const session = (await cookies()).get("admin_session");
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        // Validate caller is a super-admin
        const callerSnap = await adminDb.collection('users').where('email', '==', session.value).limit(1).get();
        if (callerSnap.empty) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const callerData = callerSnap.docs[0].data();
        if (callerData.role !== 'admin') {
            return NextResponse.json({ error: "Forbidden: Super-admin access required" }, { status: 403 });
        }

        // Fetch active registered administrators
        const usersSnap = await adminDb.collection('users').get();
        const activeUsers = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Fetch pending invitations
        const invitesSnap = await adminDb.collection('invited_admins').where('status', '==', 'pending').get();
        const pendingInvites = invitesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return NextResponse.json({
            active: activeUsers,
            invited: pendingInvites
        });
    } catch (error) {
        console.error("Fetch users API error:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}
