import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        // Step 1: Verify password using Firebase REST API (signInWithPassword)
        const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
        if (!apiKey) {
            console.error("Firebase API key not configured");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const firebaseAuthRes = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                }),
            }
        );

        const firebaseAuthData = await firebaseAuthRes.json();

        if (!firebaseAuthRes.ok) {
            const errorMessage = firebaseAuthData?.error?.message;
            if (errorMessage === "EMAIL_NOT_FOUND" || errorMessage === "INVALID_PASSWORD" || errorMessage === "INVALID_LOGIN_CREDENTIALS") {
                return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
            }
            if (errorMessage === "USER_DISABLED") {
                return NextResponse.json({ error: "This account has been disabled." }, { status: 403 });
            }
            return NextResponse.json({ error: "Authentication failed." }, { status: 401 });
        }

        // Step 2: Check if email is verified
        const uid = firebaseAuthData.localId;
        
        if (typeof adminAuth.getUser !== 'function') {
            console.error("Firebase Admin Auth is not initialized properly. Check environment variables.");
            return NextResponse.json({ error: "Server configuration error: Firebase Admin SDK not initialized." }, { status: 500 });
        }
        
        const userRecord = await adminAuth.getUser(uid);

        if (!userRecord.emailVerified) {
            return NextResponse.json({ 
                error: "Please verify your email before logging in. Check your inbox for the verification link.",
                requiresVerification: true,
                email: email,
            }, { status: 403 });
        }

        // Step 3: Check Firestore for admin role
        const userSnap = await adminDb.collection("users").doc(uid).get();
        
        if (!userSnap.exists) {
            return NextResponse.json({ error: "Unauthorized access. No admin profile found." }, { status: 403 });
        }

        const userData = userSnap.data();
        if (userData?.role !== 'admin' && userData?.role !== 'sub-admin') {
            return NextResponse.json({ error: "Unauthorized access." }, { status: 403 });
        }

        // Step 4: Update Firestore to reflect verified status and login method
        await adminDb.collection("users").doc(uid).update({
            emailVerified: true,
            loginMethod: "email",
            lastLoginAt: new Date().toISOString(),
        });

        // Step 5: Set session cookie
        (await cookies()).set("admin_session", email, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return NextResponse.json({ success: true, loginMethod: "email" });
    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json({ 
            error: "Authentication failed.",
            details: error.message || "Unknown error" 
        }, { status: 500 });
    }
}
