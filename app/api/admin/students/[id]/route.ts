import { adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = (await cookies()).get("admin_session");
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const id = (await params).id;
        const data = await request.json();
        await adminDb.collection("students").doc(id).update(data);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = (await cookies()).get("admin_session");
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const id = (await params).id;
        await adminDb.collection("students").doc(id).delete();
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
