import Link from "next/link";
import { ekskul, pendaftar, JAM_SESI } from "@/data/ekskul";
import KartuEkskul from "@/components/KartuEkskul";

export default function Beranda() {
  const totalPendaftar = pendaftar.length;

  return (
    <div className="space-y-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded- bg-gradient-to-br from-[#0F2E22] via-[#134E4A] to-[#0F766E] p-8 md:p-12 shadow-[0_20px_50px_rgba(15,46,34,0.35)]">
        {/* dekorasi */}
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#A3E635]/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-teal-400/40 blur-3xl" />
        <div className="absolute top-6 right-6 hidden md:block rounded-full bg-[#A3E635] px-3 py-1.5 text- font-black text-[#0F2E22] rotate-6 shadow-lg">🔥 6 EKSKUL AKTIF</div>
        <div className="absolute bottom-6 right-6 hidden md:block rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text- font-black text-white backdrop-blur -rotate-2">⚡ Daftar 1 menit!</div>

        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A3E635] px-3.5 py-1.5 text- font-black text-[#0F2E22] shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            ✨ PENDAFTARAN DIBUKA
          </span>
          <h1 className="mt-4 max-w-xl text-4xl md:text-6xl font-black tracking-tight leading-[1.02] text-white">
            Temukan Ekskul<br />
            <span className="bg-[#A3E635] text-[#0F2E22] px-3 rounded-2xl inline-block mt-1 rotate-[-1deg]">yang Kamu Suka</span>
          </h1>
          <p className="mt-4 max-w-lg text-sm md:text- font-medium leading-relaxed text-white/80">
            Dari Basket sampai Robotik. Daftar dalam 1 menit, tanpa ribet.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/ekskul" className="inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-6 py-3.5 text-sm font-black text-[#0F2E22] shadow-lg hover:bg-[#BEF264] hover:-translate-y-0.5 transition-all">
              Cari Ekskul
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#0F2E22] text- text-[#A3E635]">→</span>
            </Link>
            <Link href="/ekskul-saya" className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/25 backdrop-blur px-6 py-3.5 text-sm font-black text-white hover:bg-white/20 hover:-translate-y-0.5 transition-all">
              ⭐ Ekskul Saya
            </Link>
          </div>
          <p className="mt-6 text-xs font-bold text-white/60">🎉 {totalPendaftar} siswa udah daftar minggu ini</p>
        </div>
      </section>

      {/* STAT WARNA-WARNI */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <div className="rounded- bg-[#0F2E22] p-4 md:p-5 text-center shadow-md hover:-translate-y-1 transition">
          <p className="text-2xl md:text-3xl">🏀</p>
          <p className="mt-1 text-2xl md:text-3xl font-black text-[#A3E635]">{ekskul.length}</p>
          <p className="text- font-black text-white/70">EKSKUL</p>
        </div>
        <div className="rounded- bg-[#14B8A6] p-4 md:p-5 text-center shadow-md hover:-translate-y-1 transition">
          <p className="text-2xl md:text-3xl">🎯</p>
          <p className="mt-1 text-2xl md:text-3xl font-black text-white">4</p>
          <p className="text- font-black text-white/80">KATEGORI</p>
        </div>
        <div className="rounded- bg-[#A3E635] p-4 md:p-5 text-center shadow-md hover:-translate-y-1 transition">
          <p className="text-2xl md:text-3xl">📅</p>
          <p className="mt-1 text-2xl md:text-3xl font-black text-[#0F2E22]">5 Hari</p>
          <p className="text- font-black text-[#0F2E22]/70">SENIN - JUMAT</p>
        </div>
      </div>

      {/* KATEGORI WARNA-WARNI */}
      <div>
        <h2 className="text-xl font-black tracking-tight text-[#0F2E22]">Cari Sesuai Minat Kamu 👀</h2>
        <p className="mt-1 text-sm font-medium text-teal-800/70">Klik salah satu, langsung ke-filter.</p>
        <div className="mt-4 grid grid-cols-3 gap-3 md:gap-4">
          <Link href="/ekskul?kategori=Olahraga&hari=Semua" className="rounded- bg-[#F0FDF4] border-2 border-emerald-100 p-4 md:p-5 hover:-translate-y-1 hover:shadow-lg transition text-center md:text-left">
            <span className="inline-grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-2xl text-white shadow-md">🏀</span>
            <p className="mt-3 font-black text-[#0F2E22]">Olahraga</p>
            <p className="text-xs font-medium text-teal-800/60">Gerak & sehat</p>
          </Link>
          <Link href="/ekskul?kategori=Seni&hari=Semua" className="rounded- bg-[#F5F3FF] border-2 border-violet-100 p-4 md:p-5 hover:-translate-y-1 hover:shadow-lg transition text-center md:text-left">
            <span className="inline-grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-400 to-purple-500 text-2xl text-white shadow-md">🎨</span>
            <p className="mt-3 font-black text-[#0F2E22]">Seni</p>
            <p className="text-xs font-medium text-teal-800/60">Kreatif & ekspresif</p>
          </Link>
          <Link href="/ekskul?kategori=Teknologi&hari=Semua" className="rounded- bg-[#EFF6FF] border-2 border-sky-100 p-4 md:p-5 hover:-translate-y-1 hover:shadow-lg transition text-center md:text-left">
            <span className="inline-grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 text-2xl text-white shadow-md">🤖</span>
            <p className="mt-3 font-black text-[#0F2E22]">Teknologi</p>
            <p className="text-xs font-medium text-teal-800/60">Robotik & coding</p>
          </Link>
        </div>
      </div>

      {/* EKSKUL POPULER - PAKE KARTU MODERN */}
      <div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full bg-[#A3E635] px-3 py-1 text- font-black text-[#0F2E22]">🔥 PALING POPULER</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0F2E22]">Ekskul Populer</h2>
            <p className="mt-1 text-sm font-medium text-teal-800/70">Jangan sampai kehabisan kuota</p>
          </div>
          <Link href="/ekskul" className="shrink-0 rounded-full bg-[#EAFBF2] border-2 border-teal-100 px-4 py-2.5 text-xs font-black text-teal-800 hover:bg-[#CFF5DE] hover:-translate-y-0.5 transition">Semua →</Link>
        </div>

        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ekskul.map((e) => (
            <KartuEkskul key={e.id} e={e} />
          ))}
        </div>
      </div>

      {/* BANNER BAWAH */}
      <div className="rounded- bg-[#EAFBF2] border-2 border-teal-100 p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="font-black text-[#0F2E22] text-lg">Udah daftar ekskul? ⭐</h3>
          <p className="text-sm font-medium text-teal-800/70">Cek daftar ekskul kamu di halaman Ekskul Saya.</p>
        </div>
        <Link href="/ekskul-saya" className="rounded-full bg-[#0F2E22] px-6 py-3 text-sm font-black text-[#A3E635] shadow-md hover:bg-[#134E4A] hover:-translate-y-0.5 transition">Lihat Ekskul Saya →</Link>
      </div>
    </div>
  );
}