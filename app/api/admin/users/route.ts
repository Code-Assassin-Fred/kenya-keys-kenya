import { adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const session = (await cookies()).get("admin_session");
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const snap = await adminDb.collection('users').get();
        const users = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}
