import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        // Get session cookie from headers
        const cookieHeader = request.headers.get('cookie') || '';
        const sessionMatch = cookieHeader.match(/admin_session=([^;]+)/);
        const sessionEmail = sessionMatch ? decodeURIComponent(sessionMatch[1]) : null;

        if (!sessionEmail) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        // Step 1: Verify the user still exists in Firebase Auth
        let firebaseUser;
        try {
            firebaseUser = await adminAuth.getUserByEmail(sessionEmail);
        } catch (err: any) {
            // User not found in Firebase Auth — session is stale
            if (err.code === 'auth/user-not-found') {
                return NextResponse.json({ authenticated: false, reason: "User no longer exists" }, { status: 401 });
            }
            throw err;
        }

        // Step 2: Check if email is verified (skip for Google-linked accounts)
        const isGoogleLinked = firebaseUser.providerData?.some(
            (p: any) => p.providerId === 'google.com'
        );
        if (!isGoogleLinked && !firebaseUser.emailVerified) {
            return NextResponse.json({ authenticated: false, reason: "Email not verified" }, { status: 401 });
        }

        // Step 3: Verify the user exists in Firestore with admin role
        const userSnap = await adminDb.collection("users").doc(firebaseUser.uid).get();

        if (!userSnap.exists) {
            return NextResponse.json({ authenticated: false, reason: "No admin profile" }, { status: 401 });
        }

        const userData = userSnap.data();
        if (userData?.role !== 'admin' && userData?.role !== 'sub-admin') {
            return NextResponse.json({ authenticated: false, reason: "Unauthorized role" }, { status: 403 });
        }

        // Default all permissions for master admins if not explicitly set
        let permissions = userData?.permissions || [];
        if (userData?.role === 'admin' && permissions.length === 0) {
            permissions = [
                '/admin/students',
                '/admin/packages',
                '/admin/messages',
                '/admin/donors',
                '/admin/users'
            ];
        }

        return NextResponse.json({ 
            authenticated: true, 
            user: {
                email: userData.email,
                displayName: userData.displayName || firebaseUser.displayName || 'Admin User',
                role: userData.role,
                permissions,
            }
        });
    } catch (error) {
        console.error("Session validation error:", error);
        return NextResponse.json({ authenticated: false }, { status: 500 });
    }
}
