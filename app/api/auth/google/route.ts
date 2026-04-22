import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { idToken } = await request.json();

        if (!idToken) {
            return NextResponse.json({ error: "ID Token is required" }, { status: 400 });
        }

        // Verify the ID token
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const email = decodedToken.email;

        if (!email) {
            return NextResponse.json({ error: "Email not found in token" }, { status: 400 });
        }

        // Check if user exists in Firestore
        let userSnap = await adminDb.collection("users").doc(decodedToken.uid).get();
        
        if (!userSnap.exists) {
            // Auto-register first Google logins as admins for this demo, 
            // or we could restrict to certain domains.
            await adminDb.collection("users").doc(decodedToken.uid).set({
                email,
                displayName: decodedToken.name || "Google User",
                role: "admin",
                createdAt: new Date().toISOString(),
            });
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
        console.error("Google auth error:", error);
        return NextResponse.json({ error: "Google authentication failed" }, { status: 500 });
    }
}
