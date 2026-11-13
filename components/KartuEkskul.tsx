import Link from "next/link";
import { JAM_SESI, pendaftar, type Ekskul } from "@/data/ekskul";

export default function KartuEkskul({ e }: { e: Ekskul }) {
  const terdaftar = pendaftar.filter((p) => p.ekskulId === e.id).length;
  const sisa = e.kuota - terdaftar;
  const penuh = sisa <= 0;
  const terisi = Math.round((terdaftar / e.kuota) * 100);

  return (
    <div className={`flex flex-col rounded- border p-5 transition-all hover:-translate-y-1 hover:shadow-md ${penuh ? "bg-[#E6F7EE] border-teal-100 opacity-80" : "bg-[#F7FFFB] border-teal-100"}`}>
      <div className="flex gap-2">
        <span className="rounded-full bg-[#EDF7F1] border border-teal-100 px-3 py-1 text- font-black text-teal-800">{e.kategori}</span>
        {penuh && <span className="rounded-full bg-[#FFE4E6] border border-red-200 px-3 py-1 text- font-black text-red-700">PENUH</span>}
      </div>
      <h2 className="mt-3 text- font-black leading-tight text-[#0F2E22]">{e.nama}</h2>
      <p className="mt-1.5 text-xs font-bold text-teal-800/70">
        📅 {e.hari} • 🕒 Sesi {e.sesi} ({JAM_SESI[e.sesi]})
      </p>
      <p className="mt-1 text-xs font-bold text-teal-800/70">👨‍🏫 Pembina {e.pembina}</p>
      <div className="mt-3">
        <div className="flex items-center justify-between text- font-bold">
          <span className={penuh ? "text-red-700" : "text-emerald-700"}>
            {penuh ? "Penuh" : `Sisa ${sisa} dari ${e.kuota} tempat`}
          </span>
          <span className="text-teal-800/60">{terisi}% terisi</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#EDF7F1] border border-teal-100">
          <div className={`h-full rounded-full ${penuh ? "bg-red-300" : "bg-teal-500"}`} style={{ width: `${terisi}%` }} />
        </div>
      </div>
      <Link href={`/ekskul/${e.id}`} className={`mt-5 block text-center rounded-full py-2.5 text-sm font-black transition ${penuh ? "bg-[#E6F7EE] border border-teal-100 text-teal-800/60" : "bg-[#A3E635] border-2 border-lime-300 text-[#0F2E22] shadow-sm hover:bg-[#BEF264]"}`}>
        Lihat Detail →
      </Link>
    </div>
  );
}