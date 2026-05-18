import { ShieldAlert, Globe2, Mail } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Restricted | Kenya Keys",
  description: "This website is not available in your region.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BlockedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 font-outfit">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 text-center relative overflow-hidden">
        {/* Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-600" />

        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Icon Container */}
          <div className="relative">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-600 animate-pulse">
              <Globe2 className="w-10 h-10" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md">
              <ShieldAlert className="w-5 h-5 text-red-600" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase">
              Access Restricted
            </h1>
            <p className="text-sm font-semibold tracking-wider text-red-600 uppercase">
              Error 451: Region Blocked
            </p>
          </div>

          {/* Message */}
          <div className="text-gray-600 text-base leading-relaxed space-y-4">
            <p>
              We detected that you are accessing this website from <strong>North or South America</strong>.
            </p>
            <p className="text-sm">
              To comply with regional regulatory and operational policies, access to the Kenya Keys website and platform is restricted from your current geographic location.
            </p>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-gray-100 my-2" />

          {/* Contact Support */}
          <div className="space-y-4 w-full">
            <p className="text-sm text-gray-500">
              If you believe this is an error or need to contact our administration:
            </p>
            <a
              href="mailto:info@kenyakeys.org"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-bold transition-colors duration-200 text-sm tracking-wider uppercase shadow-md"
            >
              <Mail className="w-4 h-4" />
              Contact Administration
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
