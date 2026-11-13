import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded- bg-[#D9F7E8] border border-teal-100 p-8 md:p-12 text-center shadow-sm">
        {/* IKON */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EAFBF2] border border-teal-100 text-4xl">
          🏀
        </div>

        {/* 404 */}
        <h1 className="mt-6 text-7xl font-black tracking-tight text-[#0F2E22]">404</h1>

        <p className="mt-3 text-base font-black text-[#0F2E22]">
          Yah, halaman yang kamu cari tidak ada.
        </p>
        <p className="mt-1 text-sm font-medium text-teal-800/70">
          Mungkin ekskulnya sudah tidak ada atau linknya salah
        </p>

        {/* TOMBOL */}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-[#A3E635] border-2 border-lime-300 px-6 py-3 text-sm font-black text-[#0F2E22] shadow-sm hover:bg-[#BEF264] transition"
          >
            ← Kembali ke beranda
          </Link>
          <Link
            href="/ekskul"
            className="rounded-full bg-[#EAFBF2] border border-teal-100 px-6 py-3 text-sm font-black text-teal-800 hover:bg-[#CFF5DE] transition"
          >
            Lihat Ekskul
          </Link>
        </div>

        {/* FOOTER KECIL */}
        <p className="mt-8 text-xs font-black tracking-widest text-teal-800/50">
          — EKSKULKU • 404 —
        </p>
      </div>
    </div>
  );
}