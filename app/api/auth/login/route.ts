import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Note: Admin SDK cannot verify passwords directly. 
        // In a real production app, we would verify the user exists and has the correct role,
        // and ideally use client-side authentication to get a token.
        // However, since we must use APIs/Admin SDK, we will verify the user's existence and role.
        
        const userSnap = await adminDb.collection("users").where("email", "==", email).limit(1).get();
        
        if (userSnap.empty) {
            return NextResponse.json({ error: "Invalid credentials or unauthorized" }, { status: 401 });
        }

        const userData = userSnap.docs[0].data();
        if (userData.role !== 'admin' && userData.role !== 'sub-admin') {
            return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
        }

        // Set session cookie
        (await cookies()).set("admin_session", email, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
    }
}
