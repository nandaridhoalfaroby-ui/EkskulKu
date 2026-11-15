import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "EkskulKu", template: "%s - EkskulKu" },
  description: "Pendaftaran ekstrakurikuler sekolah — pilih, daftar, gas!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={poppins.variable}>
      <body
        className={`font-[var(--font-poppins)] min-h-screen flex flex-col bg-[#CFF5DE] text-[#0F2E22] antialiased`}
      >
        <Suspense>
          <Navbar />
        </Suspense>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:py-8">
          {children}
        </main>

        {/* CTA SEBELUM FOOTER */}
        <div className="mx-auto w-full max-w-6xl px-4 pb-2">
          <div className="relative overflow-hidden rounded- bg-[#0F2E22] p-6 md:p-7 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[#A3E635]/20" />
            <div className="relative">
              <h2 className="text-lg md:text-xl font-black text-white leading-tight">Jangan Sampai Kehabisan Kuota! 🎟️</h2>
              <p className="mt-1 text-sm font-medium text-white/70">Ekskul favorit kamu bisa penuh kapan aja. Daftar sekarang.</p>
            </div>
            <Link href="/ekskul" className="relative inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-6 py-3 text-sm font-black text-[#0F2E22] hover:bg-[#BEF264] hover:-translate-y-0.5 transition">
              Lihat Ekskul
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#0F2E22] text- text-[#A3E635]">→</span>
            </Link>
          </div>
        </div>

        <footer className="mt-6 border-t-2 border-teal-100 bg-[#D9F7E8]">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#A3E635] via-[#14B8A6] to-[#0F766E] border-2 border-teal-200 text-xl shadow-md">🏀</span>
                <div className="leading-none">
                  <p className="text-lg font-black text-[#0F2E22]">
                    Ekskul<span className="bg-gradient-to-r from-teal-600 to-lime-500 bg-clip-text text-transparent">Ku</span>
                  </p>
                  <p className="mt-0.5 text- font-bold tracking-[0.18em] text-teal-600">PILIH • DAFTAR • GAS!</p>
                </div>
              </div>

              {/* Link */}
              <nav className="flex flex-wrap gap-2">
                {[
                  { href: "/", label: "🏠 Beranda" },
                  { href: "/ekskul", label: "🏀 Ekskul" },
                  { href: "/ekskul-saya", label: "⭐ Ekskul Saya" },
                ].map((m) => (
                  <Link key={m.href} href={m.href} className="rounded-full bg-[#EAFBF2] border-2 border-teal-100 px-3.5 py-2 text-xs font-black text-teal-800 hover:bg-[#CFF5DE] hover:text-[#0F2E22] transition">
                    {m.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-teal-100 pt-4">
              <p className="text-xs font-bold text-teal-800/70">🏀 EkskulKu · dibuat oleh kelas XII RPL 1</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DCFCE7] border border-emerald-200 px-3 py-1 text- font-black text-emerald-700">● Semua ekskul sekolah dalam satu tempat</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}