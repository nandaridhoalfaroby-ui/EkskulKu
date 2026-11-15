export default function SkeletonDetail() {
  return (
    <div className="mx-auto max-w-5xl space-y-4">
      {/* LABEL LOADING */}
      <div className="flex items-center gap-2">
        <span className="h-5 w-5 animate-spin rounded-full border- border-[#14B8A6] border-t-transparent" />
        <span className="rounded-full bg-[#0F2E22] px-3 py-1.5 text- font-black tracking-widest text-[#A3E635]">MEMUAT DETAIL EKSKUL...</span>
      </div>

      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
        {/* KIRI - info ekskul */}
        <div className="overflow-hidden rounded- bg-[#EAFBF2] border-2 border-teal-100 shadow-sm">
          {/* Gambar skeleton - shimmer mint-lime */}
          <div className="relative h- overflow-hidden bg-gradient-to-r from-[#CFF5DE] via-[#A3E635] to-[#CFF5DE] bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]">
            <div className="absolute left-4 top-4 flex gap-2">
              <div className="h-7 w-24 rounded-full bg-[#EAFBF2]/80" />
              <div className="h-7 w-16 rounded-full bg-[#0F2E22]/70" />
            </div>
            <div className="absolute bottom-4 left-4 h-10 w-36 rounded-2xl bg-[#EAFBF2]/90" />
          </div>

          <div className="p-6 md:p-8">
            {/* judul */}
            <div className="h-8 w-3/4 rounded-full bg-gradient-to-r from-[#CFF5DE] via-[#A3E635] to-[#CFF5DE] bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]" />
            <div className="mt-2.5 h-4 w-1/2 rounded-full bg-[#CFF5DE]" />

            {/* pembina / jadwal */}
            <div className="mt-4 flex gap-2">
              <div className="h-7 w-40 rounded-full bg-[#CFF5DE]" />
              <div className="h-7 w-28 rounded-full bg-[#CFF5DE]" />
            </div>

            {/* anggota */}
            <div className="mt-6 rounded-2xl bg-[#D9F7E8] border-2 border-teal-100 p-5">
              <div className="h-4 w-36 rounded-full bg-[#A3E635]/60" />
              <div className="mt-3 space-y-2.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 rounded-2xl bg-[#EAFBF2] border border-teal-100 p-3">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-[#CFF5DE]" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3.5 w-3/4 rounded-full bg-[#CFF5DE]" />
                      <div className="h-3 w-1/2 rounded-full bg-[#CFF5DE]" />
                    </div>
                    <div className="h-6 w-10 rounded-full bg-[#CFF5DE]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* KANAN - form daftar */}
        <div className="rounded- bg-[#D9F7E8] border-2 border-teal-100 p-6 shadow-sm sticky top-24">
          <div className="h-6 w-40 rounded-full bg-[#14B8A6]/40" />
          <div className="mt-2 h-4 w-56 rounded-full bg-[#CFF5DE]" />
          <div className="mt-5 space-y-3">
            <div className="h-12 w-full rounded-xl bg-[#EAFBF2] border-2 border-teal-100" />
            <div className="h-12 w-full rounded-xl bg-[#EAFBF2] border-2 border-teal-100" />
            <div className="h-12 w-full rounded-xl bg-[#EAFBF2] border-2 border-teal-100" />
          </div>
          <div className="mt-4 h-14 w-full rounded-2xl bg-[#EAFBF2] border-2 border-teal-100" />
          <div className="mt-4 h-12 w-full rounded-full bg-gradient-to-r from-[#14B8A6] via-[#A3E635] to-[#14B8A6] bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite] shadow-md" />
          <div className="mt-3 h-4 w-32 mx-auto rounded-full bg-[#CFF5DE]" />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}