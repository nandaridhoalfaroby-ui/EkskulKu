import Link from "next/link";
import { DAFTAR_KATEGORI, DAFTAR_HARI } from "@/data/ekskul";

export default function KontrolEkskul({ kategori, hari }: { kategori: string; hari: string }) {
  const lagiFilter = kategori !== "Semua" || hari !== "Semua";
  return (
    <form method="GET" action="/ekskul" className="rounded-2xl bg-[#F7FFFB] border border-teal-100 p-4">
      <div className="flex flex-wrap gap-2">
        <select name="kategori" defaultValue={kategori} className="rounded-full bg-white border border-teal-100 px-4 py-2.5 text-sm font-bold text-[#0F2E22] outline-none focus:border-teal-300">
          <option value="Semua">Semua kategori</option>
          {DAFTAR_KATEGORI.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        <select name="hari" defaultValue={hari} className="rounded-full bg-white border border-teal-100 px-4 py-2.5 text-sm font-bold text-[#0F2E22] outline-none focus:border-teal-300">
          <option value="Semua">Semua hari</option>
          {DAFTAR_HARI.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
        <button className="rounded-full bg-[#A3E635] border-2 border-lime-300 px-6 py-2.5 text-sm font-black text-[#0F2E22] shadow-sm hover:bg-[#BEF264] transition">Terapkan →</button>
        {lagiFilter && (
          <Link href="/ekskul" className="rounded-full bg-white border border-teal-100 px-5 py-2.5 text-sm font-black text-teal-800 hover:bg-[#EDF7F1] transition">Reset</Link>
        )}
      </div>
    </form>
  );
}