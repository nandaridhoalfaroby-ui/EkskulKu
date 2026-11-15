import Link from "next/link";
import { JAM_SESI, pendaftar, type Ekskul } from "@/data/ekskul";

function warnaKategori(kategori: string) {
  const k = kategori.toLowerCase();
  if (k.includes("olahraga") || k.includes("sport") || k.includes("bola") || k.includes("basket") || k.includes("futsal") || k.includes("voli")) return "bg-emerald-500 text-white shadow-[0_4px_14px_rgba(16,185,129,0.4)]";
  if (k.includes("seni") || k.includes("musik") || k.includes("tari") || k.includes("paduan") || k.includes("teater")) return "bg-violet-500 text-white shadow-[0_4px_14px_rgba(139,92,246,0.4)]";
  if (k.includes("teknologi") || k.includes("robot") || k.includes("komputer") || k.includes("coding") || k.includes("rpl")) return "bg-indigo-500 text-white shadow-[0_4px_14px_rgba(99,102,241,0.4)]";
  if (k.includes("bahasa") || k.includes("inggris") || k.includes("jepang")) return "bg-sky-500 text-white shadow-[0_4px_14px_rgba(14,165,233,0.4)]";
  if (k.includes("sains") || k.includes("ipa") || k.includes("matematika")) return "bg-amber-500 text-zinc-900 shadow-[0_4px_14px_rgba(245,158,11,0.4)]";
  return "bg-teal-500 text-white shadow-[0_4px_14px_rgba(20,184,166,0.4)]";
}

function ikonKategori(kategori: string) {
  const k = kategori.toLowerCase();
  if (k.includes("olahraga") || k.includes("bola") || k.includes("basket")) return "🏀";
  if (k.includes("seni") || k.includes("musik")) return "🎨";
  if (k.includes("teknologi") || k.includes("robot") || k.includes("komputer")) return "🤖";
  if (k.includes("bahasa")) return "🌍";
  if (k.includes("sains")) return "🔬";
  return "⭐";
}

export default function KartuEkskul({ e }: { e: Ekskul }) {
  const terdaftar = pendaftar.filter((p) => p.ekskulId === e.id).length;
  const sisa = e.kuota - terdaftar;
  const penuh = sisa <= 0;
  const hampirPenuh = !penuh && terdaftar / e.kuota > 0.8;
  const terisi = Math.round((terdaftar / e.kuota) * 100);

  return (
    <div className={`group relative flex flex-col overflow-hidden rounded- border-2 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(20,184,166,0.20)] ${penuh ? "bg-[#E6F7EE] border-teal-100 opacity-80" : "bg-[#EAFBF2] border-teal-100 shadow-[0_6px_24px_rgba(20,184,166,0.10)]"}`}>
      {/* HEADER BANNER */}
      <div className="relative bg-gradient-to-br from-[#CFF5DE] via-[#D9F7E8] to-[#A3E635]/60 px-5 pt-5 pb-4">
        <div className="flex items-start justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0F2E22] text-2xl shadow-md group-hover:rotate-6 group-hover:scale-105 transition-transform">
            {ikonKategori(e.kategori)}
          </span>
          <div className="flex flex-wrap justify-end gap-2">
            <span className={`rounded-full px-3 py-1.5 text- font-black tracking-wide ${warnaKategori(e.kategori)}`}>{e.kategori}</span>
            {penuh && <span className="rounded-full bg-rose-500 px-3 py-1.5 text- font-black text-white shadow-md">PENUH</span>}
            {hampirPenuh && <span className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-3 py-1.5 text- font-black text-zinc-900 shadow-md">🔥 Hampir Penuh</span>}
          </div>
        </div>
        <h2 className="mt-3 text- font-black leading-tight text-[#0F2E22] group-hover:text-teal-700 transition line-clamp-2 min-h-">{e.nama}</h2>
      </div>

      {/* ISI */}
      <div className="flex flex-1 flex-col p-5 pt-4">
        <p className="flex items-center gap-2 text-xs font-bold text-teal-800/80">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#CFF5DE] border border-teal-100 text-">📅</span>
          {e.hari} • 🕒 Sesi {e.sesi} ({JAM_SESI[e.sesi]})
        </p>
        <p className="mt-2 flex items-center gap-2 text-xs font-bold text-teal-800/80">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#CFF5DE] border border-teal-100 text-">👨‍🏫</span>
          Pembina {e.pembina}
        </p>

        {/* PROGRESS KUOTA */}
        <div className="mt-4 rounded-2xl bg-[#D9F7E8] border border-teal-100 p-3">
          <div className="flex items-center justify-between text- font-black">
            <span className={penuh ? "text-red-600" : hampirPenuh ? "text-orange-600" : "text-emerald-600"}>
              {penuh ? "● Penuh" : hampirPenuh ? "● Hampir penuh!" : "● Tempat tersedia"}
            </span>
            <span className="text-teal-800/60">{terisi}% terisi</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#EAFBF2] border border-teal-100 shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                penuh
                  ? "bg-gradient-to-r from-red-400 to-rose-500"
                  : hampirPenuh
                  ? "bg-gradient-to-r from-amber-400 to-orange-400"
                  : "bg-gradient-to-r from-[#14B8A6] to-[#A3E635]"
              }`}
              style={{ width: `${terisi}%` }}
            />
          </div>
          <p className="mt-1.5 text- font-bold text-teal-800/70">
            {penuh ? "Yah, udah penuh 😭" : `Sisa ${sisa} dari ${e.kuota} tempat • ${terdaftar} udah daftar`}
          </p>
        </div>

        <Link href={`/ekskul/${e.id}`} className={`mt-4 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-black transition-all ${penuh ? "bg-[#E6F7EE] border-2 border-teal-100 text-teal-800/60" : "bg-[#0F2E22] text-[#A3E635] shadow-[0_8px_20px_rgba(15,46,34,0.20)] hover:bg-[#134E4A] hover:-translate-y-0.5"}`}>
          Lihat Detail
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#A3E635] text- text-[#0F2E22]">→</span>
        </Link>
      </div>
    </div>
  );
}