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

        // Google accounts have inherently verified emails — no extra verification needed
        // But we still check explicitly for safety
        if (!decodedToken.email_verified) {
            return NextResponse.json({ error: "Email not verified" }, { status: 403 });
        }

        const cleanEmail = email.toLowerCase().trim();

        // Check if user exists in Firestore
        let userSnap = await adminDb.collection("users").doc(decodedToken.uid).get();
        
        if (!userSnap.exists) {
            // Verify if email is invited
            const inviteRef = adminDb.collection("invited_admins").doc(cleanEmail);
            const inviteSnap = await inviteRef.get();

            if (!inviteSnap.exists) {
                // Delete user from Firebase Auth to keep user base clean
                try {
                    await adminAuth.deleteUser(decodedToken.uid);
                } catch (deleteErr) {
                    console.error("Failed to delete uninvited Google user:", deleteErr);
                }
                return NextResponse.json({ 
                    error: "This email is not invited to register as an administrator. Please contact the director." 
                }, { status: 403 });
            }

            const inviteData = inviteSnap.data();
            const role = inviteData?.role || "sub-admin";
            const permissions = inviteData?.permissions || [];

            // Register Google user as admin/sub-admin with verified status
            await adminDb.collection("users").doc(decodedToken.uid).set({
                email: cleanEmail,
                displayName: decodedToken.name || "Google User",
                role,
                permissions,
                emailVerified: true,
                loginMethod: "google",
                createdAt: new Date().toISOString(),
                lastLoginAt: new Date().toISOString(),
            });

            // Update invitation status to registered
            await inviteRef.update({
                status: 'registered',
                uid: decodedToken.uid,
                registeredAt: new Date().toISOString(),
            });
        } else {
            // Update login method and last login time
            await adminDb.collection("users").doc(decodedToken.uid).update({
                loginMethod: "google",
                lastLoginAt: new Date().toISOString(),
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

        return NextResponse.json({ success: true, loginMethod: "google" });
    } catch (error: any) {
        console.error("Google auth error:", error);
        return NextResponse.json({ error: "Google authentication failed" }, { status: 500 });
    }
}
