import Link from "next/link";
import { DAFTAR_KATEGORI, DAFTAR_HARI } from "@/data/ekskul";

export default function KontrolEkskul({ kategori, hari }: { kategori: string; hari: string }) {
  const lagiFilter = kategori !== "Semua" || hari !== "Semua";
  return (
    <form method="GET" action="/ekskul" className="overflow-hidden rounded- bg-[#EAFBF2] border-2 border-teal-100 shadow-sm">
      {/* HEADER FILTER */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#14B8A6] via-[#2DD4BF] to-[#A3E635] px-5 py-3.5">
        <span className="flex items-center gap-2 text-sm font-black text-[#0F2E22]">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0F2E22] text- text-[#A3E635]">🔍</span>
          Cari & Filter Ekskul
        </span>
        {lagiFilter && (
          <span className="rounded-full bg-[#0F2E22] px-3 py-1 text- font-black text-[#A3E635]">● FILTER AKTIF</span>
        )}
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-3">
          {/* KATEGORI */}
          <label className="flex flex-1 min-w- flex-col gap-1.5">
            <span className="text- font-black tracking-wider text-teal-700">🎯 KATEGORI</span>
            <select name="kategori" defaultValue={kategori} className="rounded-full bg-[#D9F7E8] border-2 border-teal-100 px-4 py-2.5 text-sm font-bold text-[#0F2E22] outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-teal-200 transition cursor-pointer">
              <option value="Semua">Semua kategori</option>
              {DAFTAR_KATEGORI.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </label>

          {/* HARI */}
          <label className="flex flex-1 min-w- flex-col gap-1.5">
            <span className="text- font-black tracking-wider text-teal-700">📅 HARI LATIHAN</span>
            <select name="hari" defaultValue={hari} className="rounded-full bg-[#D9F7E8] border-2 border-teal-100 px-4 py-2.5 text-sm font-bold text-[#0F2E22] outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-teal-200 transition cursor-pointer">
              <option value="Semua">Semua hari</option>
              {DAFTAR_HARI.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </label>

          <div className="flex items-end gap-2">
            <button className="inline-flex items-center gap-2 rounded-full bg-[#0F2E22] px-6 py-3 text-sm font-black text-[#A3E635] shadow-md hover:bg-[#134E4A] hover:-translate-y-0.5 transition-all">
              Terapkan
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#A3E635] text- text-[#0F2E22]">→</span>
            </button>
            {lagiFilter && (
              <Link href="/ekskul" className="inline-flex items-center gap-1.5 rounded-full bg-[#CFF5DE] border-2 border-teal-100 px-5 py-3 text-sm font-black text-teal-800 hover:bg-[#D9F7E8] transition">↺ Reset</Link>
            )}
          </div>
        </div>

        {/* QUICK CHIPS KATEGORI */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text- font-black tracking-wider text-teal-600/60 py-2">KATEGORI CEPAT:</span>
          {["Semua", ...DAFTAR_KATEGORI].map((k) => {
            const aktif = kategori === k;
            return (
              <Link
                key={k}
                href={`/ekskul?kategori=${k === "Semua" ? "Semua" : k}&hari=${hari}`}
                className={`rounded-full px-3.5 py-2 text-xs font-black transition hover:-translate-y-0.5 ${
                  aktif
                    ? "bg-[#0F2E22] text-[#A3E635] shadow-md"
                    : "bg-[#CFF5DE] border-2 border-teal-100 text-teal-800 hover:bg-[#D9F7E8]"
                }`}
              >
                {k}
              </Link>
            );
          })}
        </div>

        {/* QUICK CHIPS HARI */}
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="text- font-black tracking-wider text-teal-600/60 py-2">HARI CEPAT:</span>
          {["Semua", ...DAFTAR_HARI].map((h) => {
            const aktif = hari === h;
            return (
              <Link
                key={h}
                href={`/ekskul?kategori=${kategori}&hari=${h}`}
                className={`rounded-full px-3.5 py-2 text-xs font-black transition hover:-translate-y-0.5 ${
                  aktif
                    ? "bg-[#14B8A6] text-white shadow-md"
                    : "bg-[#EAFBF2] border-2 border-teal-100 text-teal-800 hover:bg-[#CFF5DE]"
                }`}
              >
                {h}
              </Link>
            );
          })}
        </div>
      </div>
    </form>
  );
}