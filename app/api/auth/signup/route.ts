import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { email, password, displayName } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const userRecord = await adminAuth.createUser({
            email,
            password,
            displayName,
        });

        // Store role as 'admin' in Firestore
        await adminDb.collection("users").doc(userRecord.uid).set({
            email,
            displayName,
            role: "admin",
            createdAt: new Date().toISOString(),
        });

        // Set session cookie
        (await cookies()).set("admin_session", email, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return NextResponse.json({ success: true, uid: userRecord.uid });
    } catch (error: any) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
