"use client";

export default function Footer() {
    return (
        <footer className="bg-[#1D366D] text-gray-200 px-6 py-16">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div>
                        <h2 className="text-white text-3xl font-bold mb-6 font-playfair uppercase italic tracking-tighter">KenyaKeys</h2>
                        <p className="text-gray-300 leading-relaxed mb-6 font-outfit">
                            Kenya Keys is a Reg-REFYOZ-pbo, we are a non-profit organization.
                        </p>
                        <p className="text-gray-300 leading-relaxed mb-4 font-outfit">
                            Unlocking potential through education. We empower students and communities in rural Kenya to build a brighter future for themselves.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4 mt-6">
                            <a href="https://www.facebook.com/profile.php?id=61590875852245" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 rounded-full hover:bg-white/10 transition-all text-white hover:text-[#C5E672]" aria-label="Facebook">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.326V1.326c0-.729-.593-1.326-1.322-1.326z" /></svg>
                            </a>
                            <a href="https://www.instagram.com/kenyakeyspbo_kenya/" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 rounded-full hover:bg-white/10 transition-all text-white hover:text-[#C5E672]" aria-label="Instagram">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                            <a href="https://x.com/KenyaKeys_Kenya" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 rounded-full hover:bg-white/10 transition-all text-white hover:text-[#C5E672]" aria-label="X (Twitter)">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            <a href="https://wa.me/254724783436" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 rounded-full hover:bg-white/10 transition-all text-white hover:text-[#C5E672]" aria-label="WhatsApp">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.8.983 3.834 1.502 5.909 1.503h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Organization Section */}
                    <div>
                        <h3 className="text-white text-xl font-semibold mb-6 font-outfit">Organization</h3>
                        <ul className="space-y-3 font-outfit">
                            <li><a href="/who-we-are#hero" className="text-gray-300 hover:text-white transition-colors">Our Mission</a></li>
                            <li><a href="/who-we-are#leadership" className="text-gray-400 hover:text-white transition-colors transition-all">Leadership Team</a></li>
                            <li><a href="/who-we-are#partners" className="text-gray-400 hover:text-white transition-colors transition-all">Partners</a></li>
                        </ul>
                    </div>

                    {/* Support Us Section */}
                    <div>
                        <h3 className="text-white text-xl font-semibold mb-6 font-outfit">Support Us</h3>
                        <ul className="space-y-3 font-outfit">
                            <li><a href="/student-catalog" className="text-gray-300 hover:text-white transition-colors">Student Catalog</a></li>
                            <li><a href="/donate" className="text-gray-400 hover:text-white transition-colors">Donation Packages</a></li>
                            <li><a href="/donate/ways-to-give" className="text-gray-400 hover:text-white transition-colors">Education Fund</a></li>
                            <li><a href="/impact#stats" className="text-gray-400 hover:text-white transition-colors">Impact & Metrics</a></li>
                            <li><a href="/impact#reports" className="text-gray-400 hover:text-white transition-colors">Impact Reports</a></li>
                            <li><a href="/news" className="text-gray-400 hover:text-white transition-colors">Latest News</a></li>
                        </ul>
                    </div>

                    {/* Contact Info Section */}
                    <div>
                        <h3 className="text-white text-xl font-semibold mb-6 font-outfit">Contact Info</h3>
                        <div className="space-y-6 font-outfit">
                            <div>
                                <h4 className="text-white font-semibold mb-2">KENYA OFFICE</h4>
                                <p className="text-gray-300">Taru, Kenya</p>
                                <p className="text-gray-300">Along the Nairobi - Mombasa Highway</p>
                                <p className="text-gray-300">P.O. Box 9-80120 Samburu(Msa)</p>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mb-2">Contact / WhatsApp</h4>
                                <a href="tel:+254724783436" className="text-gray-300 hover:text-white transition-colors block">+254 724783436</a>
                                <a href="https://wa.me/254724783436" target="_blank" rel="noopener noreferrer" className="text-[#C5E672] hover:text-[#b4d45d] text-sm font-semibold transition-colors flex items-center gap-1.5 mt-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.023 14.068.993 11.499.993c-5.442 0-9.87 4.372-9.874 9.802-.001 1.768.474 3.49 1.38 5.025l-.985 3.598 3.698-.971zm10.741-7.045c-.29-.145-1.711-.845-1.977-.941-.266-.097-.461-.145-.655.145-.194.29-.753.941-.922 1.134-.169.194-.338.217-.628.072-.29-.145-1.226-.452-2.336-1.443-.864-.771-1.447-1.724-1.616-2.014-.169-.29-.018-.447.127-.59.13-.13.29-.338.435-.507.145-.169.194-.29.29-.483.097-.193.048-.361-.024-.506-.072-.145-.655-1.577-.897-2.156-.236-.569-.475-.492-.655-.502-.17-.008-.371-.01-.558-.01-.194 0-.51.072-.776.362-.266.29-1.018.99-1.018 2.415 0 1.425 1.039 2.802 1.184 2.995.145.193 2.044 3.12 4.953 4.378.692.299 1.233.478 1.654.613.696.221 1.33.19 1.83.115.557-.084 1.711-.699 1.953-1.374.242-.675.242-1.253.17-1.374-.074-.121-.267-.193-.557-.338z" />
                                    </svg>
                                    WhatsApp
                                </a>
                            </div>
                            <div>
                                <a href="mailto:info@kenyakeyspbo-kenya.org" className="text-gray-300 hover:text-white transition-colors underline decoration-[#C5E672] decoration-2 underline-offset-4">info@kenyakeys-pbokenya.org</a>
                            </div>
                            <div>
                                <a href="mailto:joseph@kenyakeyspbo-kenya.org" className="text-gray-300 hover:text-white transition-colors underline decoration-[#C5E672] decoration-2 underline-offset-4">joseph@kenyakeys-pbokenya.org</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm font-outfit">© 2026 KenyaKeys. All rights reserved.</p>
                    <div className="flex gap-6 font-outfit">
                        <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
                        <a href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}