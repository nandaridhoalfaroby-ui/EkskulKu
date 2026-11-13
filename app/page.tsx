import { Suspense } from "react";
import Link from "next/link";
import { ambilSemuaEkskul } from "@/data/ambil";
import { pendaftar, DAFTAR_KATEGORI } from "@/data/ekskul";
import KartuEkskul from "@/components/KartuEkskul";

async function ListEkskulHome() {
  const list = await ambilSemuaEkskul();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.slice(0, 6).map((e) => (
        <KartuEkskul key={e.id} e={e} />
      ))}
    </div>
  );
}

export default async function Home() {
  const list = await ambilSemuaEkskul();
  const totalPendaftar = pendaftar.length;
  const totalKuota = list.reduce((a, e) => a + e.kuota, 0);
  const sisa = Math.max(0, totalKuota - totalPendaftar);

  return (
    <div className="space-y-6">
      {/* HERO - INI GAK BUTUH DATA LAMBAT, LANGSUNG TAMPIL */}
      <section className="relative overflow-hidden rounded- bg-[#0D9488] p-8 md:p-12 shadow-sm">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#A3E635]/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-teal-300/40 blur-3xl" />
        <div className="relative">
          <span className="inline-flex rounded-full bg-[#EAFBF2] border border-teal-100 px-3 py-1 text- font-black text-teal-800">
            🏀 Pendaftaran Ekskul Sekolah
          </span>
          <h1 className="mt-4 max-w-xl text-3xl md:text-5xl font-black tracking-tight leading-tight text-[#F0FDF9]">
            Temukan Ekskul
            <br />
            Yang Kamu Suka
          </h1>
          <p className="mt-3 max-w-lg text-sm md:text-base font-medium leading-relaxed text-teal-50/90">
            Dari Basket sampai Robotik. Daftar langsung, liat kuota, dan kelola
            Ekskul Saya di satu tempat.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/ekskul"
              className="rounded-full bg-[#A3E635] border-2 border-lime-300 px-6 py-3 text-sm font-black text-[#0F2E22] shadow-md hover:bg-[#BEF264] transition"
            >
              Lihat Semua Ekskul →
            </Link>
            <Link
              href="/saya"
              className="rounded-full bg-[#EAFBF2] border border-teal-100 px-6 py-3 text-sm font-black text-[#0F2E22] hover:bg-[#CFF5DE] transition"
            >
              Ekskul Saya
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded-full bg-teal-900/30 border border-teal-100/20 px-3 py-1.5 text-xs font-bold text-teal-50">
              {list.length} Ekskul
            </span>
            <span className="rounded-full bg-teal-900/30 border border-teal-100/20 px-3 py-1.5 text-xs font-bold text-teal-50">
              {totalPendaftar} Pendaftar
            </span>
            <span className="rounded-full bg-teal-900/30 border border-teal-100/20 px-3 py-1.5 text-xs font-bold text-teal-50">
              Sisa {sisa} Kuota
            </span>
            <span className="rounded-full bg-teal-900/30 border border-teal-100/20 px-3 py-1.5 text-xs font-bold text-teal-50">
              {DAFTAR_KATEGORI.length} Kategori
            </span>
          </div>
        </div>
      </section>

      {/* KATEGORI CEPAT */}
      <section className="rounded- bg-[#D9F7E8] border border-teal-100 p-6 shadow-sm">
        <h2 className="text-lg font-black text-[#0F2E22]">
          Jelajahi by Kategori
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {DAFTAR_KATEGORI.map((k) => (
            <Link
              key={k}
              href={`/ekskul?kategori=${k}`}
              className="rounded-full bg-[#EAFBF2] border border-teal-100 px-4 py-2 text-sm font-black text-teal-800 hover:bg-[#A3E635] hover:text-[#0F2E22] hover:border-lime-300 transition"
            >
              {k} →
            </Link>
          ))}
        </div>
      </section>

      {/* LIST EKSKUL - INI YANG LAMBAT, DIBUNGKUS SUSPENSE */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[#0F2E22]">Ekskul Terbaru</h2>
          <Link
            href="/ekskul"
            className="text-sm font-black text-teal-700 hover:text-teal-800"
          >
            Lihat Semua →
          </Link>
        </div>
        <div className="mt-4">
          <Suspense
            fallback={
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-44 animate-pulse rounded- bg-[#D9F7E8] border border-teal-100"
                  />
                ))}
              </div>
            }
          >
            <ListEkskulHome />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
