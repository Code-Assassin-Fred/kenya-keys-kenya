'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Trash2, UserPlus, Loader2, Edit2, X, Check, Mail, Lock, CheckSquare, Square } from 'lucide-react';
import { 
    inviteAdminAction, 
    revokeInvitationAction, 
    deleteAdminUserAction, 
    updateAdminPermissionsAction 
} from '@/lib/actions/admin-actions';
import { useAdmin } from '@/lib/context/AdminContext';

const PAGE_OPTIONS = [
    { name: 'Student Catalog', path: '/admin/students' },
    { name: 'Sponsorship Packages', path: '/admin/packages' },
    { name: 'Contact Messages', path: '/admin/messages' },
    { name: 'Interested Donors', path: '/admin/donors' }
];

export default function UserManagement() {
    const { user: currentUser } = useAdmin();
    const [activeAdmins, setActiveAdmins] = useState<any[]>([]);
    const [pendingInvites, setPendingInvites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Form State
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<'sub-admin' | 'admin'>('sub-admin');
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Edit Modal State
    const [editingUser, setEditingUser] = useState<any | null>(null);
    const [editRole, setEditRole] = useState<'sub-admin' | 'admin'>('sub-admin');
    const [editPermissions, setEditPermissions] = useState<string[]>([]);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (currentUser?.role === 'admin') {
            loadUsers();
        }
    }, [currentUser]);

    async function loadUsers() {
        try {
            const res = await fetch('/api/admin/users');
            const result = await res.json();
            if (res.ok) {
                setActiveAdmins(result.active || []);
                setPendingInvites(result.invited || []);
            }
        } catch (err) {
            console.error("Fetch failed", err);
        } finally {
            setLoading(false);
        }
    }

    // Toggle permissions in the invitation form
    function handlePermissionToggle(path: string) {
        if (selectedPermissions.includes(path)) {
            setSelectedPermissions(selectedPermissions.filter(p => p !== path));
        } else {
            setSelectedPermissions([...selectedPermissions, path]);
        }
    }

    // Toggle permissions in the editing form
    function handleEditPermissionToggle(path: string) {
        if (editPermissions.includes(path)) {
            setEditPermissions(editPermissions.filter(p => p !== path));
        } else {
            setEditPermissions([...editPermissions, path]);
        }
    }

    // Auto-check all permissions if Super Admin role is selected
    useEffect(() => {
        if (role === 'admin') {
            setSelectedPermissions(PAGE_OPTIONS.map(p => p.path));
        } else {
            setSelectedPermissions([]);
        }
    }, [role]);

    useEffect(() => {
        if (editRole === 'admin') {
            setEditPermissions(PAGE_OPTIONS.map(p => p.path));
        }
    }, [editRole]);

    async function handleInvite(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        // Include Sub-Admins user route for super admin if needed, but internally it's implied by role.
        // Let's add it explicitly for super admins.
        const permissionsToSend = role === 'admin' 
            ? [...selectedPermissions, '/admin/users']
            : selectedPermissions;

        const result = await inviteAdminAction(email, role, permissionsToSend);

        if (result.success) {
            setMessage({ type: 'success', text: `Invitation sent to ${email}!` });
            setEmail('');
            setRole('sub-admin');
            setSelectedPermissions([]);
            loadUsers();
        } else {
            setMessage({ type: 'error', text: result.error || 'Failed to send invitation' });
        }
        setIsSubmitting(false);
    }

    async function handleRevoke(emailToRevoke: string) {
        if (!confirm(`Are you sure you want to revoke the invitation for ${emailToRevoke}?`)) return;
        
        const result = await revokeInvitationAction(emailToRevoke);
        if (result.success) {
            loadUsers();
        } else {
            alert(result.error || 'Failed to revoke invitation');
        }
    }

    async function handleDeleteUser(uid: string, userEmail: string) {
        if (!confirm(`Are you sure you want to permanently delete the administrator account for ${userEmail}? This will instantly lock them out.`)) return;

        const result = await deleteAdminUserAction(uid);
        if (result.success) {
            loadUsers();
        } else {
            alert(result.error || 'Failed to delete administrator');
        }
    }

    function openEditModal(user: any) {
        setEditingUser(user);
        setEditRole(user.role);
        // Exclude /admin/users or default it from permissions
        setEditPermissions(user.permissions?.filter((p: string) => p !== '/admin/users') || []);
    }

    async function handleUpdatePermissions(e: React.FormEvent) {
        e.preventDefault();
        if (!editingUser) return;
        
        setIsUpdating(true);
        const permissionsToSend = editRole === 'admin' 
            ? [...editPermissions, '/admin/users']
            : editPermissions;

        const result = await updateAdminPermissionsAction(editingUser.id, editRole, permissionsToSend);

        if (result.success) {
            setEditingUser(null);
            loadUsers();
        } else {
            alert(result.error || 'Failed to update admin permissions');
        }
        setIsUpdating(false);
    }

    if (currentUser?.role !== 'admin') {
        return null; // Restricted
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#101828] font-outfit tracking-tight">Admin Management</h1>
                <p className="text-[#667085] font-outfit mt-1 text-sm">Pre-authorize email addresses to sign up as administrators and configure their specific page permissions.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Registration/Invitation Form (Left/1-Column width) */}
                <div className="lg:col-span-1">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-2xl border border-[#EAECF0] shadow-sm sticky top-6"
                    >
                        <div className="mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1D366D] flex items-center justify-center">
                                <UserPlus size={20} />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-[#101828] font-outfit uppercase tracking-wide">Invite Administrator</h2>
                                <p className="text-[#667085] font-outfit text-xs">Pre-authorize signup by email.</p>
                            </div>
                        </div>

                        <form onSubmit={handleInvite} className="space-y-5">
                            {message && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`p-4 rounded-xl text-xs font-semibold font-outfit border ${
                                        message.type === 'success' 
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                            : 'bg-red-50 text-red-700 border-red-100'
                                    }`}
                                >
                                    {message.text}
                                </motion.div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-[#344054] uppercase tracking-wider block font-outfit">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#94A3B8]" />
                                    <input 
                                        type="email" 
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="user@kenyakeyspbo-kenya.org"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D0D5DD] focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-50 outline-none font-outfit text-[#101828] text-sm transition-all placeholder:text-[#94A3B8]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-[#344054] uppercase tracking-wider block font-outfit">Role</label>
                                <select 
                                    value={role}
                                    onChange={(e) => setRole(e.target.value as any)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D0D5DD] focus:border-[#3B82F6] outline-none font-outfit text-[#101828] text-sm transition-all"
                                >
                                    <option value="sub-admin">Sub-Admin (Restricted Access)</option>
                                    <option value="admin">Super Admin (All Access)</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#344054] uppercase tracking-wider block font-outfit">
                                    Page Access Permissions
                                </label>
                                
                                {role === 'admin' ? (
                                    <div className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-xl">
                                        <p className="text-xs font-semibold text-blue-700 font-outfit leading-relaxed">
                                            Super admins automatically have permission to access all dashboard modules, including admin management.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-2.5 border border-[#EAECF0] p-4 rounded-xl bg-gray-50/50">
                                        {PAGE_OPTIONS.map((page) => {
                                            const isChecked = selectedPermissions.includes(page.path);
                                            return (
                                                <button
                                                    type="button"
                                                    key={page.path}
                                                    onClick={() => handlePermissionToggle(page.path)}
                                                    className="flex items-center gap-3 w-full text-left font-outfit text-sm text-[#344054] font-medium hover:text-[#101828] transition-colors"
                                                >
                                                    {isChecked ? (
                                                        <CheckSquare className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                                    ) : (
                                                        <Square className="w-5 h-5 text-[#94A3B8] flex-shrink-0" />
                                                    )}
                                                    <span>{page.name}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3.5 rounded-xl bg-[#101828] text-white font-bold font-outfit uppercase tracking-wider text-xs hover:bg-[#1d2939] transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <UserPlus className="w-4 h-4" />
                                        Send Invitation
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Lists of Active Admins & Pending Invitations (Right/2-Columns width) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Active System Users */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-[#EAECF0] shadow-sm"
                    >
                        <div className="mb-4">
                            <h3 className="font-bold text-[#101828] font-outfit uppercase tracking-wide text-sm">Active System Administrators</h3>
                            <p className="text-xs text-[#667085] font-outfit mt-0.5">Users currently registered and active in the system.</p>
                        </div>
                        
                        <div className="overflow-x-auto">
                            {loading ? (
                                <div className="py-12 flex justify-center">
                                    <Loader2 className="animate-spin h-6 w-6 text-emerald-500" />
                                </div>
                            ) : activeAdmins.length > 0 ? (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#EAECF0] bg-gray-50 text-[10px] uppercase font-bold text-[#667085] font-outfit tracking-wider">
                                            <th className="py-3 px-4">User</th>
                                            <th className="py-3 px-4">Role</th>
                                            <th className="py-3 px-4">Access Details</th>
                                            <th className="py-3 px-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#EAECF0]">
                                        {activeAdmins.map((userObj) => (
                                            <tr key={userObj.id} className="text-sm hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-xl bg-[#F2F4F7] text-[#101828] flex items-center justify-center font-bold text-sm uppercase">
                                                            {(userObj.displayName || userObj.email || 'A')[0]}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-[#101828] font-outfit leading-tight">{userObj.displayName || 'Unnamed User'}</p>
                                                            <p className="text-xs text-[#667085] font-outfit mt-0.5">{userObj.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 font-outfit">
                                                    {userObj.role === 'admin' ? (
                                                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Super Admin</span>
                                                    ) : (
                                                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Sub Admin</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4 max-w-[200px]">
                                                    <div className="flex flex-wrap gap-1">
                                                        {userObj.role === 'admin' ? (
                                                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase font-outfit">All Modules</span>
                                                        ) : userObj.permissions && userObj.permissions.length > 0 ? (
                                                            userObj.permissions.map((p: string) => {
                                                                const pageName = PAGE_OPTIONS.find(opt => opt.path === p)?.name || p.replace('/admin/', '');
                                                                return (
                                                                    <span key={p} className="text-[9px] font-bold text-[#475569] bg-slate-100 px-2 py-0.5 rounded uppercase font-outfit">{pageName}</span>
                                                                );
                                                            })
                                                        ) : (
                                                            <span className="text-[9px] font-semibold text-red-600 italic font-outfit">No pages permitted</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            onClick={() => openEditModal(userObj)}
                                                            className="p-2 text-[#475569] hover:bg-gray-100 hover:text-[#101828] rounded-lg transition-all"
                                                            title="Edit Permissions"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        {userObj.email !== currentUser?.email && (
                                                            <button 
                                                                onClick={() => handleDeleteUser(userObj.id, userObj.email)}
                                                                className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
                                                                title="Delete User"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-[#667085] text-center text-sm italic py-8">No administrator accounts found.</p>
                            )}
                        </div>
                    </motion.div>

                    {/* Pending Invitations */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-6 rounded-2xl border border-[#EAECF0] shadow-sm"
                    >
                        <div className="mb-4">
                            <h3 className="font-bold text-[#101828] font-outfit uppercase tracking-wide text-sm">Pending Pre-Authorizations</h3>
                            <p className="text-xs text-[#667085] font-outfit mt-0.5">Invited email addresses that have not signed up yet.</p>
                        </div>
                        
                        <div className="overflow-x-auto">
                            {loading ? (
                                <div className="py-12 flex justify-center">
                                    <Loader2 className="animate-spin h-6 w-6 text-emerald-500" />
                                </div>
                            ) : pendingInvites.length > 0 ? (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#EAECF0] bg-gray-50 text-[10px] uppercase font-bold text-[#667085] font-outfit tracking-wider">
                                            <th className="py-3 px-4">Email</th>
                                            <th className="py-3 px-4">Pre-assigned Role</th>
                                            <th className="py-3 px-4">Authorized Pages</th>
                                            <th className="py-3 px-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#EAECF0]">
                                        {pendingInvites.map((invite) => (
                                            <tr key={invite.id} className="text-sm hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 px-4 font-semibold text-[#101828] font-outfit">
                                                    {invite.email}
                                                </td>
                                                <td className="py-4 px-4 font-outfit">
                                                    {invite.role === 'admin' ? (
                                                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Super Admin</span>
                                                    ) : (
                                                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Sub Admin</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4 max-w-[200px]">
                                                    <div className="flex flex-wrap gap-1">
                                                        {invite.role === 'admin' ? (
                                                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase font-outfit">All Modules</span>
                                                        ) : invite.permissions && invite.permissions.length > 0 ? (
                                                            invite.permissions.map((p: string) => {
                                                                const pageName = PAGE_OPTIONS.find(opt => opt.path === p)?.name || p.replace('/admin/', '');
                                                                return (
                                                                    <span key={p} className="text-[9px] font-bold text-[#475569] bg-slate-100 px-2 py-0.5 rounded uppercase font-outfit">{pageName}</span>
                                                                );
                                                            })
                                                        ) : (
                                                            <span className="text-[9px] font-semibold text-red-600 italic font-outfit">No pages permitted</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <button 
                                                        onClick={() => handleRevoke(invite.email)}
                                                        className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
                                                        title="Revoke Pre-Authorization"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-[#667085] text-center text-sm italic py-8">No pending administrator invitations.</p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Edit Permissions Modal (Overlay) */}
            <AnimatePresence>
                {editingUser && (
                    <div className="fixed inset-0 bg-[#101828]/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl border border-gray-100"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#101828] font-outfit uppercase tracking-wide">Edit Access Control</h3>
                                <button 
                                    onClick={() => setEditingUser(null)}
                                    className="p-1.5 hover:bg-gray-100 rounded-lg text-[#667085] hover:text-[#101828] transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="mb-5">
                                <p className="text-xs text-[#667085] font-outfit uppercase tracking-wider font-bold">Modifying User</p>
                                <p className="text-sm font-semibold text-[#101828] font-outfit mt-0.5">{editingUser.displayName || 'Unnamed User'}</p>
                                <p className="text-xs text-[#667085] font-outfit">{editingUser.email}</p>
                            </div>

                            <form onSubmit={handleUpdatePermissions} className="space-y-6">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-[#344054] uppercase tracking-wider block font-outfit">Assigned Role</label>
                                    <select 
                                        value={editRole}
                                        onChange={(e) => setEditRole(e.target.value as any)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D0D5DD] focus:border-[#3B82F6] outline-none font-outfit text-[#101828] text-sm transition-all"
                                    >
                                        <option value="sub-admin">Sub-Admin (Restricted Access)</option>
                                        <option value="admin">Super Admin (All Access)</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#344054] uppercase tracking-wider block font-outfit">
                                        Assigned Page Access
                                    </label>
                                    
                                    {editRole === 'admin' ? (
                                        <div className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-xl">
                                            <p className="text-xs font-semibold text-blue-700 font-outfit leading-relaxed">
                                                Super admins automatically have permission to access all dashboard modules, including admin management.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2.5 border border-[#EAECF0] p-4 rounded-xl bg-gray-50/50">
                                            {PAGE_OPTIONS.map((page) => {
                                                const isChecked = editPermissions.includes(page.path);
                                                return (
                                                    <button
                                                        type="button"
                                                        key={page.path}
                                                        onClick={() => handleEditPermissionToggle(page.path)}
                                                        className="flex items-center gap-3 w-full text-left font-outfit text-sm text-[#344054] font-medium hover:text-[#101828] transition-colors"
                                                    >
                                                        {isChecked ? (
                                                            <CheckSquare className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                                        ) : (
                                                            <Square className="w-5 h-5 text-[#94A3B8] flex-shrink-0" />
                                                        )}
                                                        <span>{page.name}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-3 border-t border-[#EAECF0] pt-6">
                                    <button 
                                        type="button"
                                        onClick={() => setEditingUser(null)}
                                        className="px-5 py-2.5 border-2 border-[#E2E8F0] rounded-xl text-sm font-bold text-[#344054] font-outfit uppercase tracking-wider hover:border-[#CBD5E1] transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={isUpdating}
                                        className="px-5 py-2.5 bg-[#101828] hover:bg-[#1d2939] text-white rounded-xl text-sm font-bold font-outfit uppercase tracking-wider transition-all disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {isUpdating ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <>
                                                <Check className="w-4 h-4" />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
