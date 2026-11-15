export default function MemuatKatalog() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 animate-pulse">
      {/* HEADER SKELETON - gradient */}
      <div className="relative overflow-hidden rounded- bg-gradient-to-br from-[#0F2E22] via-[#134E4A] to-[#0F766E] p-6 md:p-8 shadow-xl">
        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[#A3E635]/20" />
        <div className="relative">
          <div className="h-6 w-32 rounded-full bg-[#A3E635]/80" />
          <div className="mt-3 h-9 w-64 md:w-80 rounded-2xl bg-white/20" />
          <div className="mt-2 h-4 w-48 md:w-72 rounded-full bg-white/15" />
        </div>
      </div>

      {/* SEARCH SKELETON */}
      <div className="flex flex-wrap gap-3">
        <div className="h-12 flex-1 min-w- rounded-full bg-[#EAFBF2] border-2 border-teal-100" />
        <div className="h-12 w-40 rounded-full bg-[#A3E635]/70" />
      </div>

      {/* FILTER SKELETON */}
      <div className="rounded- bg-[#EAFBF2] border-2 border-teal-100 p-5 md:p-6 space-y-5">
        {[1, 2].map((row) => (
          <div key={row}>
            <div className="h-4 w-28 rounded-full bg-[#CFF5DE]" />
            <div className="mt-2.5 flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((c) => (
                <div key={c} className="h-9 w-24 rounded-full bg-[#D9F7E8] border border-teal-100" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* KARTU SKELETON WARNA-WARNI */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[
          "bg-[#EAFBF2] border-teal-100",
          "bg-[#FEF9C3] border-yellow-200",
          "bg-[#F5F3FF] border-violet-100",
          "bg-[#EFF6FF] border-sky-100",
          "bg-[#EAFBF2] border-teal-100",
          "bg-[#FEF9C3] border-yellow-200",
        ].map((warna, i) => (
          <div key={i} className={`rounded- ${warna} border-2 p-5 shadow-sm`}>
            <div className="flex gap-2">
              <div className="h-6 w-24 rounded-full bg-[#0F2E22]/15" />
              <div className="h-6 w-16 rounded-full bg-[#A3E635]/70" />
            </div>
            <div className="mt-4 h-6 w-3/4 rounded-xl bg-[#0F2E22]/15" />
            <div className="mt-2 h-4 w-1/2 rounded-full bg-[#0F2E22]/10" />
            <div className="mt-4 h-2.5 w-full rounded-full bg-[#0F2E22]/10 overflow-hidden">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-teal-400 to-lime-400" />
            </div>
            <div className="mt-4 h-10 w-full rounded-full bg-[#0F2E22]/15" />
          </div>
        ))}
      </div>
    </div>
  );
}