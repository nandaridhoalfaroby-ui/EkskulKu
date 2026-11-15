"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cariAwal = searchParams.get("cari") ?? "";
  const [jumlahSaya, setJumlahSaya] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hitung = () => {
      try {
        const data = JSON.parse(localStorage.getItem("ekskul-saya") || localStorage.getItem("pendaftar") || "[]");
        setJumlahSaya(Array.isArray(data) ? data.length : 0);
      } catch {
        setJumlahSaya(0);
      }
    };
    hitung();
    window.addEventListener("ekskul-berubah", hitung);
    window.addEventListener("storage", hitung);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("ekskul-berubah", hitung);
      window.removeEventListener("storage", hitung);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const menus = [
    { href: "/", label: "Beranda", icon: "🏠" },
    { href: "/ekskul", label: "Ekskul", icon: "🏀" },
    { href: "/ekskul-saya", label: "Ekskul Saya", icon: "⭐" },
  ];

  const aktif = (path: string) => pathname === path || (path !== "/" && pathname.startsWith(path));

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#D9F7E8]/95 shadow-[0_8px_30px_rgba(20,184,166,0.18)] backdrop-blur-xl border-b-2 border-teal-200"
          : "bg-[#D9F7E8] border-b border-teal-100"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#A3E635] via-[#14B8A6] to-[#0F766E] border-2 border-teal-200 text-xl shadow-[0_6px_16px_rgba(20,184,166,0.35)] group-hover:rotate-6 group-hover:scale-105 transition-transform">
            🏀
          </span>
          <span className="leading-none">
            <span className="block text-xl font-black tracking-tight text-[#0F2E22]">
              Ekskul<span className="bg-gradient-to-r from-teal-600 to-lime-500 bg-clip-text text-transparent">Ku</span>
            </span>
            <span className="block text- font-bold tracking-[0.18em] text-teal-600">PILIH • DAFTAR • GAS!</span>
          </span>
        </Link>

        {/* NAV - FLOATING PILL */}
        <nav className="flex flex-wrap items-center gap-1 rounded-full bg-[#EAFBF2] border-2 border-teal-100 shadow-[0_4px_20px_rgba(20,184,166,0.12)] p-1.5">
          {menus.map((m) => {
            const isAktif = aktif(m.href);
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-black transition-all duration-200 ${
                  isAktif
                    ? "bg-[#0F2E22] text-[#A3E635] shadow-md scale-105"
                    : "text-teal-800 hover:bg-[#CFF5DE] hover:text-[#0F2E22]"
                }`}
              >
                <span>{m.icon}</span>
                {m.label}
                {m.href === "/ekskul-saya" && jumlahSaya > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#A3E635] px-1 text- font-black text-[#0F2E22] shadow-sm">
                    {jumlahSaya}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* SEARCH */}
        <form action="/ekskul" method="get" className="ml-auto flex w-full sm:w-auto flex-1 sm:flex-none gap-2">
          <div className="relative flex-1 sm:flex-none">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-">🔍</span>
            <input
              key={cariAwal}
              name="cari"
              defaultValue={cariAwal}
              placeholder="Cari Ekskul..."
              className="w-full sm:w-56 rounded-full bg-[#EAFBF2] border-2 border-teal-100 pl-9 pr-4 py-2.5 text-sm font-bold text-[#0F2E22] placeholder:text-teal-800/40 placeholder:font-medium outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-teal-200 transition"
            />
          </div>
          <button type="submit" className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#0F2E22] px-4 py-2.5 text-xs font-black text-[#A3E635] shadow-md hover:bg-[#134E4A] hover:-translate-y-0.5 transition-all">
            Cari
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#A3E635] text- text-[#0F2E22]">→</span>
          </button>
        </form>
      </div>
    </header>
  );
}