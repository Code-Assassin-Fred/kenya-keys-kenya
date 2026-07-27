'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Loader2, Eye, EyeOff, ArrowRight, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';

export default function AdminLoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [lastMethod, setLastMethod] = useState<string | null>(null);
    const router = useRouter();

    // Form inputs state
    const [emailVal, setEmailVal] = useState('');
    const [passwordVal, setPasswordVal] = useState('');

    // Verification state (shown inline when user hasn't verified email)
    const [needsVerification, setNeedsVerification] = useState(false);
    const [unverifiedEmail, setUnverifiedEmail] = useState('');
    const [isResending, setIsResending] = useState(false);
    const [resendMessage, setResendMessage] = useState<string | null>(null);
    const [resendError, setResendError] = useState<string | null>(null);
    const [cooldown, setCooldown] = useState(0);

    // Clear client-side session on mount to prevent stale sessions
    useEffect(() => {
        signOut(auth).catch(() => {});
    }, []);

    // Load last used login method from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem('kk_last_login_method');
            if (stored === 'google' || stored === 'email') {
                setLastMethod(stored);
            }
        } catch {}
    }, []);

    // Cooldown timer
    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setInterval(() => {
            setCooldown(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [cooldown]);

    async function handleResendEmail() {
        const targetEmail = unverifiedEmail || emailVal;
        if (!targetEmail || !passwordVal || cooldown > 0) return;
        setIsResending(true);
        setResendMessage(null);
        setResendError(null);

        try {
            // Sign in client-side to verify credentials & get user instance
            const userCredential = await signInWithEmailAndPassword(auth, targetEmail, passwordVal);
            const user = userCredential.user;
            
            // Trigger native verification email
            await sendEmailVerification(user);
            
            // Sign out immediately
            await signOut(auth);

            setResendMessage('Verification email resent! Check your inbox.');
            setCooldown(60);
        } catch (err: any) {
            console.error("Resend error:", err);
            setResendError(err.message || 'Failed to resend email.');
        } finally {
            setIsResending(false);
        }
    }

    async function handleEmailLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setNeedsVerification(false);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailVal, password: passwordVal }),
            });
            
            let result;
            try {
                result = await res.json();
            } catch (jsonErr) {
                throw new Error("Server returned an invalid response. Please check server logs.");
            }

            if (res.ok && result?.success) {
                // Store login method
                try { localStorage.setItem('kk_last_login_method', 'email'); } catch {}
                router.push('/admin');
            } else if (result?.requiresVerification) {
                // Show inline verification prompt
                setNeedsVerification(true);
                setUnverifiedEmail(result.email || emailVal);
                setIsLoading(false);

                // Auto-send verification on detection of unverified account
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, result.email || emailVal, passwordVal);
                    await sendEmailVerification(userCredential.user);
                    await signOut(auth);
                    setResendMessage('Verification email sent to your inbox.');
                    setCooldown(60);
                } catch (autoErr: any) {
                    console.error("Auto resend error:", autoErr);
                }
            } else {
                setError(result?.error || "Login failed.");
                setIsLoading(false);
            }
        } catch (err: any) {
            setError(err.message || "Connection failed. Please try again.");
            setIsLoading(false);
        }
    }

    async function handleGoogleLogin() {
        setIsGoogleLoading(true);
        setError(null);
        setNeedsVerification(false);
        const provider = new GoogleAuthProvider();

        try {
            const userCredential = await signInWithPopup(auth, provider);
            const idToken = await userCredential.user.getIdToken();

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken }),
            });
            
            let result;
            try {
                result = await res.json();
            } catch (jsonErr) {
                throw new Error("Server returned an invalid response. Please check server logs.");
            }

            if (res.ok && result?.success) {
                // Store login method
                try { localStorage.setItem('kk_last_login_method', 'google'); } catch {}
                router.push('/admin');
            } else {
                setError(result?.error || "Google authentication failed.");
                setIsGoogleLoading(false);
            }
        } catch (err: any) {
            setError(err.message || "Google sign-in failed.");
            setIsGoogleLoading(false);
        }
    }

    // Mask email for display
    const maskedEmail = unverifiedEmail ? (() => {
        const [local, domain] = unverifiedEmail.split('@');
        if (!domain) return unverifiedEmail;
        const visibleChars = Math.min(3, local.length);
        return local.substring(0, visibleChars) + '***@' + domain;
    })() : '';

    return (
        <div className="min-h-screen flex">
            {/* Left Side — Image (60%) */}
            <div className="w-[60%] min-h-screen relative hidden md:block">
                <Image
                    src="/WhatsApp Image 2026-04-19 at 20.33.27 (5).webp"
                    alt="Kenya Keys community"
                    fill
                    className="object-cover"
                    priority
                    sizes="60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#101828]/60 via-[#101828]/30 to-transparent" />
                <div className="absolute bottom-12 left-10 right-10 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="w-8 h-1 bg-[#FFB800] rounded-full mb-4" />
                        <h2 className="text-white text-2xl font-black uppercase tracking-tight leading-tight font-outfit">
                            Unlocking Potential,<br />One Student at a Time
                        </h2>
                        <p className="text-white/70 text-sm mt-3 max-w-lg leading-relaxed font-medium font-outfit">
                            Empowering communities through education across Kenya.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side — Form (40%) */}
            <div className="w-full md:w-[40%] min-h-screen flex flex-col justify-center px-8 md:px-12 py-10 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-30 -mr-36 -mt-36" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-30 -ml-36 -mb-36" />

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 w-full max-w-sm mx-auto"
                >
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-xl font-bold text-[#101828] font-outfit uppercase tracking-wide">
                            Secure <span className="text-[#3B82F6]">Access</span>
                        </h1>
                        <p className="text-[#667085] mt-2 text-sm font-medium font-outfit">
                            Sign in to the administration panel.
                        </p>
                    </div>

                    {/* ── INLINE VERIFICATION BANNER ── */}
                    <AnimatePresence>
                        {needsVerification && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-5 overflow-hidden"
                            >
                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
                                    <div className="flex items-start gap-2.5">
                                        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold text-amber-800 font-outfit uppercase tracking-wide">
                                                Email Not Verified
                                            </p>
                                            <p className="text-xs text-amber-700 font-outfit font-medium mt-1 leading-relaxed">
                                                Please verify your email before logging in. We sent a link to <strong>{maskedEmail}</strong>.
                                            </p>
                                        </div>
                                    </div>

                                    {resendMessage && (
                                        <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold font-outfit bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                                            <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                            {resendMessage}
                                        </div>
                                    )}

                                    {resendError && (
                                        <div className="flex items-center gap-2 text-xs text-red-600 font-semibold font-outfit bg-red-50 p-2.5 rounded-lg border border-red-100">
                                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
                                            {resendError}
                                        </div>
                                    )}

                                    <button
                                        onClick={handleResendEmail}
                                        disabled={isResending || cooldown > 0}
                                        className="w-full py-2.5 rounded-lg bg-amber-600 text-white font-bold font-outfit uppercase tracking-wider text-xs hover:bg-amber-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isResending ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : cooldown > 0 ? (
                                            <>
                                                <RefreshCw className="w-3.5 h-3.5" />
                                                Resend in {cooldown}s
                                            </>
                                        ) : (
                                            <>
                                                <RefreshCw className="w-3.5 h-3.5" />
                                                Resend Verification Email
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {error && !needsVerification && (
                        <div className="bg-red-50 text-red-600 p-3.5 rounded-xl text-xs font-semibold font-outfit border border-red-100 mb-5 flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Last Used Method Indicator */}
                    <AnimatePresence>
                        {lastMethod && !needsVerification && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="mb-4 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center gap-2.5"
                            >
                                <div className="w-5 h-5 rounded-full bg-[#3B82F6] flex items-center justify-center flex-shrink-0">
                                    <ArrowRight className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-xs font-semibold text-[#3B82F6] font-outfit">
                                    Last signed in with {lastMethod === 'google' ? 'Google' : 'Email & Password'}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Google Login */}
                    <div className="relative">
                        <button
                            onClick={handleGoogleLogin}
                            disabled={isGoogleLoading}
                            className={`w-full py-3.5 rounded-xl bg-white border-2 flex items-center justify-center gap-3 transition-all hover:border-[#3B82F6] hover:shadow-md group disabled:opacity-70 ${
                                lastMethod === 'google'
                                    ? 'border-[#3B82F6] shadow-md shadow-blue-500/10 ring-2 ring-blue-50'
                                    : 'border-[#E2E8F0]'
                            }`}
                        >
                            {isGoogleLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin text-[#3B82F6]" />
                            ) : (
                                <>
                                    <svg width="18" height="18" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    <span className="font-bold font-outfit text-[#344054] text-sm">
                                        Sign in with Google
                                    </span>
                                </>
                            )}
                        </button>
                        {lastMethod === 'google' && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-[#3B82F6] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30"
                            >
                                <span className="text-white text-[10px] font-bold font-outfit">✓</span>
                            </motion.div>
                        )}
                    </div>

                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-[#E2E8F0]" />
                        <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider font-outfit">Or</span>
                        <div className="flex-1 h-px bg-[#E2E8F0]" />
                    </div>

                    {/* Email/Password Form */}
                    <div className="relative">
                        <form onSubmit={handleEmailLogin} className="space-y-4">
                            {lastMethod === 'email' && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-[#3B82F6] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 z-20"
                                >
                                    <span className="text-white text-[10px] font-bold font-outfit">✓</span>
                                </motion.div>
                            )}
                            <div className={`space-y-4 ${lastMethod === 'email' ? 'p-4 rounded-xl border-2 border-[#3B82F6] shadow-md shadow-blue-500/10 ring-2 ring-blue-50' : ''}`}>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-[#344054] uppercase tracking-wider block font-outfit">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            value={emailVal}
                                            onChange={(e) => setEmailVal(e.target.value)}
                                            placeholder="admin@kenyakeyspbo-kenya.org"
                                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-50 outline-none font-outfit text-[#1E293B] text-sm font-medium transition-all placeholder:text-[#94A3B8]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-[#344054] uppercase tracking-wider block font-outfit">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                                        <input
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={passwordVal}
                                            onChange={(e) => setPasswordVal(e.target.value)}
                                            placeholder="Enter your password"
                                            className="w-full pl-11 pr-11 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-50 outline-none font-outfit text-[#1E293B] text-sm font-medium transition-all placeholder:text-[#94A3B8]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569] transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    disabled={isLoading}
                                    className="w-full py-3.5 rounded-xl bg-[#1D366D] text-white font-bold font-outfit uppercase tracking-wider text-sm hover:bg-[#101828] hover:shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-2"
                                >
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <p className="text-center text-[#667085] text-sm mt-6 font-outfit">
                        Don&apos;t have an account?{' '}
                        <Link href="/admin/signup" className="text-[#3B82F6] font-bold hover:text-[#1D366D] transition-all no-underline">
                            Sign Up
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
