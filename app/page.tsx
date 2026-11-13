import Link from "next/link";
import { ekskul, pendaftar, JAM_SESI } from "@/data/ekskul";

export default function Beranda() {
  return (
    <div>
      {/* HERO - INI YANG ILANG TADI */}
      <section className="relative overflow-hidden rounded- bg-[#0F2E22] p-8 md:p-12 shadow-lg">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#A3E635]/50 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-teal-400/40 blur-3xl" />
        <div className="relative">
          <span className="inline-block rounded-full bg-[#A3E635] px-3 py-1 text- font-black text-[#0F2E22]">✨ PENDAFTARAN DIBUKA</span>
          <h1 className="mt-4 max-w-xl text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
            Temukan Ekskul yang Kamu Suka
          </h1>
          <p className="mt-3 max-w-lg text-sm font-medium text-white/80">
            Dari Basket sampai Robotik. Daftar dalam 1 menit, tanpa ribet.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/ekskul" className="rounded-full bg-[#A3E635] px-6 py-3 text-sm font-black text-[#0F2E22] shadow-md hover:bg-[#BEF264] transition">
              Cari Ekskul →
            </Link>
            <Link href="/ekskul-saya" className="rounded-full bg-white/10 border border-white/25 px-6 py-3 text-sm font-black text-white hover:bg-white/20 transition">
              Ekskul Saya
            </Link>
          </div>
        </div>
      </section>

      {/* STAT */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded- bg-[#0F2E22] p-4 text-center">
          <p className="text-2xl font-black text-[#A3E635]">6</p>
          <p className="text- font-bold text-white/70">Ekskul</p>
        </div>
        <div className="rounded- bg-[#0F2E22] p-4 text-center">
          <p className="text-2xl font-black text-[#A3E635]">4</p>
          <p className="text- font-bold text-white/70">Kategori</p>
        </div>
        <div className="rounded- bg-[#0F2E22] p-4 text-center">
          <p className="text-2xl font-black text-[#A3E635]">5 Hari</p>
          <p className="text- font-bold text-white/70">Senin - Jumat</p>
        </div>
      </div>

      {/* LIST */}
      <h2 className="mt-10 text-2xl font-black tracking-tight text-[#0F2E22]">Ekskul Populer</h2>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ekskul.map((e) => {
          const terdaftar = pendaftar.filter((p) => p.ekskulId === e.id).length;
          const sisa = Math.max(0, e.kuota - terdaftar);
          const penuh = sisa === 0;
          return (
            <Link key={e.id} href={`/ekskul/${e.id}`} className="block rounded- bg-[#A7F3D0] border-2 border-teal-300 p-5 shadow-md hover:border-teal-500 hover:-translate-y-0.5 transition">
              <div className="flex gap-2">
                <span className="rounded-full bg-[#0F2E22] px-3 py-1 text- font-black text-[#CFF5DE]">{e.kategori}</span>
                {penuh && <span className="rounded-full bg-red-500 px-3 py-1 text- font-black text-white">PENUH</span>}
              </div>
              <h3 className="mt-3 text-lg font-black text-[#0F2E22]">{e.nama}</h3>
              <p className="mt-1 text-xs font-bold text-[#0F2E22]/80">📅 {e.hari} • 🕒 Sesi {e.sesi} ({JAM_SESI[e.sesi]})</p>
              <p className="mt-1 text-xs font-bold text-[#0F2E22]/80">👨‍🏫 {e.pembina} • Sisa {sisa} tempat</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}