import { RefreshCw } from "lucide-react";
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
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 text-center relative overflow-hidden">
        
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Heading / Message */}
          <div className="space-y-2">
            <h1 className="text-2xl font-black tracking-tight text-gray-900 uppercase">
              Seems this site is restricted
            </h1>
          </div>

          {/* Action */}
          <div className="w-full pt-2">
            <a
              href="/?clear_geo"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-bold transition-colors duration-200 text-sm tracking-wider uppercase shadow-md"
            >
              <RefreshCw className="w-4 h-4 animate-spin-hover" />
              Retry
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
