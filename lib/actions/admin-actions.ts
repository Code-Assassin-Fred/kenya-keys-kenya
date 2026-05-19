'use server';

import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";

// Helper to verify caller is a super-admin (role === 'admin')
async function verifySuperAdminSession() {
    const { cookies } = await import('next/headers');
    const session = (await cookies()).get('admin_session');
    if (!session) throw new Error('Unauthorized access');

    const userSnap = await adminDb.collection('users').where('email', '==', session.value).limit(1).get();
    if (userSnap.empty) throw new Error('Unauthorized access');

    const currentUser = userSnap.docs[0].data();
    if (currentUser.role !== 'admin') throw new Error('Unauthorized: Only Super Admins are permitted');

    return currentUser;
}

export async function inviteAdminAction(email: string, role: string, permissions: string[]) {
    try {
        const caller = await verifySuperAdminSession();
        
        if (!email || !role) {
            return { error: 'Email and role are required' };
        }

        const cleanEmail = email.toLowerCase().trim();

        // Check if user already exists in active users
        const activeUserSnap = await adminDb.collection('users').where('email', '==', cleanEmail).limit(1).get();
        if (!activeUserSnap.empty) {
            return { error: 'This email is already registered as an administrator.' };
        }

        // Save invitation
        await adminDb.collection('invited_admins').doc(cleanEmail).set({
            email: cleanEmail,
            role,
            permissions,
            invitedBy: caller.email,
            status: 'pending',
            createdAt: new Date().toISOString(),
        });

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error: any) {
        console.error('Error inviting admin:', error);
        return { error: error.message || 'Failed to send invitation' };
    }
}

export async function revokeInvitationAction(email: string) {
    try {
        await verifySuperAdminSession();
        
        const cleanEmail = email.toLowerCase().trim();
        await adminDb.collection('invited_admins').doc(cleanEmail).delete();

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error: any) {
        console.error('Error revoking invitation:', error);
        return { error: error.message || 'Failed to revoke invitation' };
    }
}

export async function deleteAdminUserAction(uid: string) {
    try {
        const caller = await verifySuperAdminSession();

        // Prevent self-deletion
        const targetUserRef = adminDb.collection('users').doc(uid);
        const targetUserSnap = await targetUserRef.get();
        if (targetUserSnap.exists) {
            const targetData = targetUserSnap.data();
            if (targetData?.email === caller.email) {
                return { error: 'You cannot delete your own account.' };
            }
            
            // Delete from Firebase Auth
            try {
                await adminAuth.deleteUser(uid);
            } catch (authErr: any) {
                console.warn('Could not delete user from Firebase Auth (might not exist there):', authErr);
            }

            // Delete from Firestore users
            await targetUserRef.delete();
            
            // Also clean up any associated invitation
            if (targetData?.email) {
                await adminDb.collection('invited_admins').doc(targetData.email.toLowerCase()).delete();
            }
        }

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting admin user:', error);
        return { error: error.message || 'Failed to delete user' };
    }
}

export async function updateAdminPermissionsAction(uid: string, role: string, permissions: string[]) {
    try {
        await verifySuperAdminSession();

        const userRef = adminDb.collection('users').doc(uid);
        const userSnap = await userRef.get();
        
        if (!userSnap.exists) {
            return { error: 'Admin user not found.' };
        }

        await userRef.update({
            role,
            permissions,
            updatedAt: new Date().toISOString(),
        });

        // Also update their invitation if it exists to match new role/permissions
        const userData = userSnap.data();
        if (userData?.email) {
            const inviteRef = adminDb.collection('invited_admins').doc(userData.email.toLowerCase());
            const inviteSnap = await inviteRef.get();
            if (inviteSnap.exists) {
                await inviteRef.update({ role, permissions });
            }
        }

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error: any) {
        console.error('Error updating admin permissions:', error);
        return { error: error.message || 'Failed to update permissions' };
    }
}

export async function initializeAdminSystemAction(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const displayName = formData.get('displayName') as string;

    try {
        // Prevent initializing if any admin already exists
        const adminUsersSnap = await adminDb.collection('users').where('role', '==', 'admin').limit(1).get();
        if (!adminUsersSnap.empty) {
            return { error: 'The admin system has already been initialized. Setup is locked.' };
        }

        const userRecord = await adminAuth.createUser({
            email,
            password,
            displayName,
        });

        // Store role as 'admin' (Master Admin) with all default permissions
        await adminDb.collection('users').doc(userRecord.uid).set({
            email,
            displayName,
            role: 'admin',
            permissions: [
                '/admin/students',
                '/admin/packages',
                '/admin/messages',
                '/admin/donors',
                '/admin/users'
            ],
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

export async function addPackageAction(data: any) {
    try {
        const docRef = await adminDb.collection('packages').add({
            ...data,
            createdAt: new Date().toISOString(),
        });
        revalidatePath('/admin/packages');
        revalidatePath('/donate');
        return { success: true, id: docRef.id };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function deletePackageAction(id: string) {
    try {
        await adminDb.collection('packages').doc(id).delete();
        revalidatePath('/admin/packages');
        revalidatePath('/donate');
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function submitContactMessageAction(data: { name: string; email: string; phone: string; spaceInterest?: string; message: string }) {
    try {
        const docRef = await adminDb.collection('messages').add({
            ...data,
            createdAt: new Date().toISOString(),
        });
        revalidatePath('/admin/messages');
        return { success: true, id: docRef.id };
    } catch (error: any) {
        console.error('Error submitting contact message:', error);
        return { error: error.message || 'Failed to submit message' };
    }
}

export async function getContactMessagesAction() {
    try {
        const snap = await adminDb.collection('messages').orderBy('createdAt', 'desc').get();
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        return [];
    }
}

export async function submitInterestAction(data: { type: 'donation' | 'sponsorship'; targetName: string; email: string; phone: string; country?: string }) {
    try {
        const docRef = await adminDb.collection('interested_donors').add({
            ...data,
            createdAt: new Date().toISOString(),
        });
        revalidatePath('/admin/donors');
        return { success: true, id: docRef.id };
    } catch (error: any) {
        console.error('Error submitting donor interest:', error);
        return { error: error.message || 'Failed to submit interest' };
    }
}

export async function getInterestedDonorsAction() {
    try {
        const snap = await adminDb.collection('interested_donors').orderBy('createdAt', 'desc').get();
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching interested donors:', error);
        return [];
    }
}

