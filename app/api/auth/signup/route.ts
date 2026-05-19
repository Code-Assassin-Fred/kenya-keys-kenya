import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { idToken, displayName } = await request.json();

        if (!idToken) {
            return NextResponse.json({ error: "Authentication ID Token is required" }, { status: 400 });
        }

        // Verify the ID token from Firebase Client SDK
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const email = decodedToken.email;
        const uid = decodedToken.uid;

        if (!email) {
            return NextResponse.json({ error: "Email not found in token" }, { status: 400 });
        }

        // Store role as 'admin' in Firestore
        await adminDb.collection("users").doc(uid).set({
            email,
            displayName: displayName || decodedToken.name || "Admin User",
            role: "admin",
            emailVerified: false,
            loginMethod: "email",
            createdAt: new Date().toISOString(),
        });

        return NextResponse.json({ 
            success: true, 
            uid,
            requiresVerification: true,
            message: "Account created. Please check your email for a verification link.",
        });
    } catch (error: any) {
        console.error("Signup API error:", error);
        return NextResponse.json({ error: error.message || "Signup verification failed" }, { status: 500 });
    }
}
