import { Poppins } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: { default: "EkskulKu", template: "%s - EkskulKu" },
  description: "Pendaftaran ekstrakurikuler sekolah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`${poppins.className} min-h-screen flex flex-col bg-[#CFF5DE] text-[#0F2E22] antialiased`}
      >
        <Suspense>
          <Navbar />
        </Suspense>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
          {children}
        </main>
        <footer className="mt-8 border-t border-teal-100 bg-[#D9F7E8] p-5 text-center">
          <p className="text-sm font-black text-[#0F2E22]">
            🏀 Ekskul<span className="text-teal-600">Ku</span>
          </p>
          <p className="mt-1 text-xs font-medium text-teal-800/70">
            EkskulKu · dibuat oleh kelas XII RPL 1
          </p>
        </footer>
      </body>
    </html>
  );
}
