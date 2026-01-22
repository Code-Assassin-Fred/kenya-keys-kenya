"use client";

export default function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-gray-300 px-6 py-12">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div>
                        <h2 className="text-orange-500 text-3xl font-bold mb-6">KenyaKeys</h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Unlocking potential through education. We empower students and communities in rural Kenya to build a brighter future for themselves.
                        </p>
                    </div>

                    {/* Organization Section */}
                    <div>
                        <h3 className="text-white text-xl font-semibold mb-6">Organization</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Mission</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Leadership Team</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Partners</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Frequently Asked Questions</a></li>
                        </ul>
                    </div>

                    {/* Support Us Section */}
                    <div>
                        <h3 className="text-white text-xl font-semibold mb-6">Support Us</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Student Catalog</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Donation Packages</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Education Fund</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Impact & Metrics</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Latest News</a></li>
                        </ul>
                    </div>

                    {/* Contact Info Section */}
                    <div>
                        <h3 className="text-white text-xl font-semibold mb-6">Contact Info</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-white font-semibold mb-2">KENYA OFFICE</h4>
                                <p className="text-gray-400">Maji Ya Chumvi, Kwale County</p>
                            </div>
                            <div>
                                <a href="mailto:info@kenyakeys.org" className="text-gray-400 hover:text-white transition-colors">info@kenyakeys.org</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">© 2026 KenyaKeys. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}