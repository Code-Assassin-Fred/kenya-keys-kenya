'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
    email: string;
    displayName: string;
    role: 'admin' | 'sub-admin';
    permissions: string[];
}

interface AdminContextType {
    user: AdminUser | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AdminUser | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchSession() {
        try {
            const res = await fetch('/api/auth/validate-session');
            const data = await res.json();
            if (data.authenticated && data.user) {
                setUser({
                    email: data.user.email,
                    displayName: data.user.displayName,
                    role: data.user.role,
                    permissions: data.user.permissions || [],
                });
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Error fetching admin session context:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSession();
    }, []);

    return (
        <AdminContext.Provider value={{ user, loading, refreshUser: fetchSession }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
}
