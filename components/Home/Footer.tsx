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
                        <p className="text-gray-300 leading-relaxed mb-6 font-outfit">
                            Unlocking potential through education. We empower students and communities in rural Kenya to build a brighter future for themselves.
                        </p>
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
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Student Catalog</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Donation Packages</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Education Fund</a></li>
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
                                <h4 className="text-white font-semibold mb-2">Contact</h4>
                                <p className="text-gray-300">+2547 24873436</p>
                            </div>
                            <div>
                                <a href="mailto:info@kenyakeyspbo-kenya.org" className="text-gray-300 hover:text-white transition-colors underline decoration-[#C5E672] decoration-2 underline-offset-4">info@kenyakeyspbo-kenya.org</a>
                            </div>
                            <div>
                                <a href="mailto:info@kenyakeyspbo-kenya.org" className="text-gray-300 hover:text-white transition-colors underline decoration-[#C5E672] decoration-2 underline-offset-4">joseph@kenyakeyspbo-kenya.org</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm font-outfit">© 2026 KenyaKeys. All rights reserved.</p>
                    <div className="flex gap-6 font-outfit">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}