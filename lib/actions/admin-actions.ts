'use server';

import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";

export async function registerSubAdminAction(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const displayName = formData.get('displayName') as string;

    if (!email || !password) {
        return { error: 'Email and password are required' };
    }

    try {
        const userRecord = await adminAuth.createUser({
            email,
            password,
            displayName,
        });

        // Store role in Firestore
        await adminDb.collection('users').doc(userRecord.uid).set({
            email,
            role: 'sub-admin',
            createdAt: new Date().toISOString(),
        });

        revalidatePath('/admin/users');
        return { success: true, uid: userRecord.uid };
    } catch (error: any) {
        console.error('Error creating sub-admin:', error);
        return { error: error.message || 'Failed to create sub-admin' };
    }
}

export async function initializeAdminSystemAction(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const displayName = formData.get('displayName') as string;

    try {
        const userRecord = await adminAuth.createUser({
            email,
            password,
            displayName,
        });

        // Store role as 'admin' (Master Admin)
        await adminDb.collection('users').doc(userRecord.uid).set({
            email,
            displayName,
            role: 'admin',
            createdAt: new Date().toISOString(),
        });

        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function getAdminStatsAction() {
    try {
        const studentsSnap = await adminDb.collection('students').get();
        const donationsSnap = await adminDb.collection('donations').get();
        
        let totalDonations = 0;
        donationsSnap.forEach(doc => {
            totalDonations += doc.data().amount || 0;
        });

        return {
            studentCount: studentsSnap.size,
            donationTotal: totalDonations,
            urgentSponsorships: studentsSnap.docs.filter(d => d.data().sponsorship === 'Urgent').length,
        };
    } catch (error) {
        console.error('Error fetching stats:', error);
        return { error: 'Failed to fetch dashboard stats' };
    }
}

export async function getStudentsAction() {
    try {
        const snap = await adminDb.collection('students').orderBy('name').get();
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching students:', error);
        return [];
    }
}

export async function addStudentAction(data: any) {
    try {
        const docRef = await adminDb.collection('students').add({
            ...data,
            createdAt: new Date().toISOString(),
        });
        revalidatePath('/admin/students');
        revalidatePath('/student-catalog');
        return { success: true, id: docRef.id };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function updateStudentAction(id: string, data: any) {
    try {
        await adminDb.collection('students').doc(id).update(data);
        revalidatePath('/admin/students');
        revalidatePath('/student-catalog');
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function getPackagesAction() {
    try {
        const snap = await adminDb.collection('packages').get();
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        return [];
    }

export async function loginAdminAction(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // FOR DEMO/MVP: We verify user role in Firestore.
    // In a full production app, we would use Firebase Auth cross-verification.
    try {
        const userSnap = await adminDb.collection('users').where('email', '==', email).limit(1).get();
        if (userSnap.empty) {
            return { error: 'Invalid credentials or unauthorized' };
        }

        const userData = userSnap.docs[0].data();
        if (userData.role !== 'admin' && userData.role !== 'sub-admin') {
            return { error: 'Unauthorized access' };
        }

        // Set a secure session cookie
        const { cookies } = await import('next/headers');
        (await cookies()).set('admin_session', userData.email, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return { success: true };
    } catch (error: any) {
        console.error('Login error:', error);
        return { error: 'Authentication failed' };
    }
}

}

export async function updatePackageAction(id: string, data: any) {
    try {
        await adminDb.collection('packages').doc(id).update(data);
        revalidatePath('/admin/packages');
        revalidatePath('/donate');
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}
