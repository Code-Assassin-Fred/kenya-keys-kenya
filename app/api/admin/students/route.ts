import { adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const snap = await adminDb.collection('students').orderBy('name').get();
        const students = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json(students);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = (await cookies()).get("admin_session");
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const data = await request.json();
        const docRef = await adminDb.collection('students').add({
            ...data,
            createdAt: new Date().toISOString(),
        });
        return NextResponse.json({ success: true, id: docRef.id });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
