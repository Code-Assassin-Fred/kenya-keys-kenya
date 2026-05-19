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

        const cleanEmail = email.toLowerCase().trim();

        // Allow bootstrapping a first super-admin if no admin users exist
        const adminUsersSnap = await adminDb.collection('users').where('role', '==', 'admin').limit(1).get();
        const isInitialSetup = adminUsersSnap.empty;

        let role = 'sub-admin';
        let permissions: string[] = [];

        if (isInitialSetup) {
            // No admin exists yet — treat this signup as initial system setup
            role = 'admin';
            permissions = [
                '/admin/students',
                '/admin/packages',
                '/admin/messages',
                '/admin/donors',
                '/admin/users'
            ];
        } else {
            // Check if user is in the invited whitelist
            const inviteRef = adminDb.collection("invited_admins").doc(cleanEmail);
            const inviteSnap = await inviteRef.get();

            if (!inviteSnap.exists) {
                // Delete newly created Firebase user to keep the auth list clean
                try {
                    await adminAuth.deleteUser(uid);
                } catch (deleteErr) {
                    console.error("Failed to delete uninvited auth user:", deleteErr);
                }
                return NextResponse.json({ 
                    error: "This email is not invited to register as an administrator. Please contact the director." 
                }, { status: 403 });
            }

            const inviteData = inviteSnap.data();
            role = inviteData?.role || "sub-admin";
            permissions = inviteData?.permissions || [];

            // Update invitation status to registered (kept here because invite existed)
            await inviteRef.update({
                status: 'registered',
                uid,
                registeredAt: new Date().toISOString(),
            });
        }

        // Store role and permissions in Firestore users
        await adminDb.collection("users").doc(uid).set({
            email: cleanEmail,
            displayName: displayName || decodedToken.name || "Admin User",
            role,
            permissions,
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

