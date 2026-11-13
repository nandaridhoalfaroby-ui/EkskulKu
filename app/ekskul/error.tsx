"use client";

import { useRouter } from "next/navigation";

export default function GalatEkskul({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const pesan = error instanceof Error ? error.message : "Terjadi kesalahan.";
  const router = useRouter();
  return (
    <div className="mx-auto max-w-xl rounded- bg-[#D1FAE5]/60 border border-red-200 p-8 md:p-10 text-center shadow-sm">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#FFE4E6] border border-red-200 text-3xl">⚠️</div>
      <h2 className="mt-4 text-xl font-black tracking-tight text-[#0F2E22]">Data ekskul gagal dimuat</h2>
      <p className="mt-2 text-sm font-medium leading-relaxed text-teal-800/70">{pesan}</p>
      {error.digest && <p className="mt-3 inline-flex rounded-full bg-[#F7FFFB] border border-teal-100 px-3 py-1 text- font-mono font-bold text-teal-800/70">ID: {error.digest}</p>}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button onClick={() => reset()} className="rounded-full bg-[#A3E635] border-2 border-lime-300 px-6 py-3 text-sm font-black text-[#0F2E22] shadow-md hover:bg-[#BEF264] transition">Coba lagi →</button>
        <button onClick={() => router.push("/ekskul")} className="rounded-full bg-[#F7FFFB] border border-teal-100 px-6 py-3 text-sm font-black text-[#0F2E22] hover:bg-white transition">Kembali ke Katalog</button>
      </div>
    </div>
  );
}