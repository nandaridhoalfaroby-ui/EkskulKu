"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cariAwal = searchParams.get("cari") ?? "";

  const aktif = (path: string) =>
    pathname === path
      ? "bg-[#A3E635] text-[#0F2E22] border-lime-300"
      : "bg-[#EAFBF2] text-teal-800 border-teal-100 hover:bg-[#CFF5DE]";

  return (
    <header className="sticky top-0 z-50 border-b border-teal-100 bg-[#D9F7E8]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-[#0F2E22]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#A3E635] text-lg">🏀</span>
          Ekskul<span className="text-teal-600">Ku</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          <Link href="/" className={`rounded-full border px-3 py-1.5 text-xs font-black transition ${aktif("/")}`}>
            Beranda
          </Link>
          <Link href="/ekskul" className={`rounded-full border px-3 py-1.5 text-xs font-black transition ${aktif("/ekskul")}`}>
            Ekskul
          </Link>
          <Link href="/ekskul-saya" className={`rounded-full border px-3 py-1.5 text-xs font-black transition ${aktif("/ekskul-saya")}`}>
            Ekskul Saya
          </Link>
        </nav>

        <form action="/ekskul" method="get" className="ml-auto flex w-full sm:w-auto flex-1 sm:flex-none gap-2">
          <input
            key={cariAwal}
            name="cari"
            defaultValue={cariAwal}
            placeholder="Cari Ekskul..."
            className="w-full sm:w-56 rounded-full bg-[#EAFBF2] border border-teal-100 px-4 py-2 text-sm font-medium text-[#0F2E22] placeholder:text-teal-800/40 outline-none focus:border-teal-300"
          />
          <button type="submit" className="shrink-0 rounded-full bg-[#0F2E22] px-4 py-2 text-xs font-black text-[#CFF5DE]">
            Cari Ekskul →
          </button>
        </form>
      </div>
    </header>
  );
}