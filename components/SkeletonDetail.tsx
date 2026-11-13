export default function SkeletonDetail() {
  return (
    <div className="mx-auto max-w-5xl grid md:grid-cols-[1.1fr_0.9fr] gap-6 animate-pulse">
      {/* KIRI - info ekskul */}
      <div className="rounded- bg-[#D9F7E8] border border-teal-100 p-6 md:p-8 shadow-sm">
        <div className="flex gap-2">
          <div className="h-6 w-24 rounded-full bg-[#CFF5DE] border border-teal-100" />
          <div className="h-6 w-16 rounded-full bg-[#CFF5DE] border border-teal-100" />
        </div>
        <div className="mt-4 h-9 w-3/4 rounded-xl bg-[#CFF5DE] border border-teal-100" />
        <div className="mt-3 h-4 w-1/2 rounded-full bg-[#CFF5DE] border border-teal-100" />
        <div className="mt-5 h-7 w-48 rounded-xl bg-[#CFF5DE] border border-teal-100" />
        <div className="mt-2 h-2.5 max-w-md rounded-full bg-[#EAFBF2] border border-teal-100" />
        <div className="mt-8 rounded-2xl bg-[#EAFBF2] border border-teal-100 p-5">
          <div className="h-4 w-32 rounded-full bg-[#CFF5DE] border border-teal-100" />
          <div className="mt-3 space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 rounded-2xl bg-[#CFF5DE] border border-teal-100" />
            ))}
          </div>
        </div>
      </div>
      {/* KANAN - form daftar */}
      <div className="rounded- bg-[#D9F7E8] border border-teal-100 p-6 shadow-sm">
        <div className="h-6 w-40 rounded-xl bg-[#CFF5DE] border border-teal-100" />
        <div className="mt-2 h-4 w-56 rounded-full bg-[#CFF5DE] border border-teal-100" />
        <div className="mt-4 h-11 rounded-full bg-[#EAFBF2] border border-teal-100" />
        <div className="mt-3 h-11 rounded-full bg-[#EAFBF2] border border-teal-100" />
        <div className="mt-5 h-12 rounded-full bg-[#CFF5DE] border border-teal-100" />
      </div>
    </div>
  );
}