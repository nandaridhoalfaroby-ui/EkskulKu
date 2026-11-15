import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* KARTU 404 UTAMA */}
      <div className="overflow-hidden rounded- bg-[#EAFBF2] border-2 border-teal-100 shadow-sm text-center">
        {/* Banner gradient */}
        <div className="relative bg-gradient-to-br from-[#14B8A6] via-[#2DD4BF] to-[#A3E635] px-6 py-8 md:py-10">
          <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-white/20" />
          <div className="absolute -right-6 -bottom-8 h-32 w-32 rounded-full bg-[#EAFBF2]/40" />
          <div className="relative">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded- bg-[#EAFBF2] border-2 border-teal-100 text-4xl shadow-xl -rotate-3 animate-float">🏀</div>
            <h1 className="mt-4 text-6xl md:text-7xl font-black tracking-tight text-[#0F2E22] leading-none">404</h1>
            <span className="mt-2 inline-flex rounded-full bg-[#0F2E22] px-3.5 py-1.5 text- font-black tracking-widest text-[#A3E635]">HALAMAN TIDAK DITEMUKAN</span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <p className="text- font-black text-[#0F2E22] leading-relaxed">
            Yah, halaman yang kamu cari tidak ada. 😅
          </p>
          <p className="mt-1 text-sm font-medium text-teal-800/70">
            Mungkin ekskulnya sudah tidak ada atau linknya salah ketik.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#0F2E22] px-6 py-3 text-sm font-black text-[#A3E635] shadow-lg hover:-translate-y-0.5 hover:bg-[#134E4A] transition-all"
            >
              ← Kembali ke Beranda
            </Link>
            <Link
              href="/ekskul"
              className="inline-flex items-center gap-2 rounded-full bg-[#CFF5DE] border-2 border-teal-100 px-6 py-3 text-sm font-black text-teal-800 hover:bg-[#D9F7E8] hover:-translate-y-0.5 transition-all"
            >
              Lihat Ekskul →
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text- font-black tracking-wider text-teal-800/40">
            <span className="h-px w-6 bg-teal-200" />
            EKSKULKU • 404
            <span className="h-px w-6 bg-teal-200" />
          </div>
        </div>
      </div>

      {/* SHORTCUT WARNA-WARNI */}
      <div className="grid grid-cols-3 gap-3">
        <Link href="/" className="rounded- bg-[#CFF5DE] border-2 border-teal-100 p-4 text-center hover:-translate-y-1 hover:shadow-md transition">
          <p className="text-2xl">🏠</p>
          <p className="mt-1 text-xs font-black text-[#0F2E22]">Beranda</p>
        </Link>
        <Link href="/ekskul" className="rounded- bg-[#EAFBF2] border-2 border-teal-100 p-4 text-center hover:-translate-y-1 hover:shadow-md transition">
          <p className="text-2xl">🏀</p>
          <p className="mt-1 text-xs font-black text-[#0F2E22]">Ekskul</p>
        </Link>
        <Link href="/ekskul-saya" className="rounded- bg-[#FEF9C3] border-2 border-yellow-200 p-4 text-center hover:-translate-y-1 hover:shadow-md transition">
          <p className="text-2xl">⭐</p>
          <p className="mt-1 text-xs font-black text-[#0F2E22]">Ekskul Saya</p>
        </Link>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: rotate(-3deg) translateY(0); }
          50% { transform: rotate(-3deg) translateY(-6px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}