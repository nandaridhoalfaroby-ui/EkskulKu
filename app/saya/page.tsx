import Link from "next/link";
import { cookies } from "next/headers";
import { ekskul, pendaftar, JAM_SESI } from "@/data/ekskul";
import TombolBatalkan from "@/components/TombolBatalkan";

export const metadata = {
  title: "Ekskul Saya",
  description: "Daftar ekskul yang kamu ikuti di EkskulKu.",
};

// Warna kartu gantian biar gak monoton
const WARNA_KARTU = [
  { bg: "bg-[#EAFBF2]", border: "border-teal-100", ikon: "bg-gradient-to-br from-emerald-400 to-teal-500", badge: "bg-[#0F2E22] text-[#A3E635]" },
  { bg: "bg-[#FEF9C3]", border: "border-yellow-200", ikon: "bg-gradient-to-br from-amber-400 to-orange-400", badge: "bg-[#0F2E22] text-yellow-300" },
  { bg: "bg-[#F5F3FF]", border: "border-violet-100", ikon: "bg-gradient-to-br from-violet-400 to-purple-500", badge: "bg-[#0F2E22] text-violet-300" },
];

function getInisial(nama: string) {
  return nama
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((k) => k[0]?.toUpperCase())
    .join("");
}

export default async function EkskulSaya() {
  const cookieStore = await cookies();
  const nama = cookieStore.get("nama")?.value;
  const kelas = cookieStore.get("kelas")?.value;

  // TANPA COOKIE
  if (!nama || !kelas) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded- bg-[#EAFBF2] border-2 border-teal-100 shadow-sm text-center">
          <div className="relative bg-gradient-to-br from-[#14B8A6] via-[#2DD4BF] to-[#A3E635] px-6 py-8">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-white/20" />
            <div className="absolute -right-4 -bottom-6 h-28 w-28 rounded-full bg-[#EAFBF2]/40" />
            <div className="relative mx-auto grid h-20 w-20 place-items-center rounded- bg-[#EAFBF2] border-2 border-teal-100 text-4xl shadow-xl -rotate-3">🙁</div>
          </div>
          <div className="p-6 md:p-8">
            <h1 className="text-2xl font-black tracking-tight text-[#0F2E22]">Kamu belum mendaftar apa pun.</h1>
            <p className="mt-2 text-sm font-medium text-teal-800/70">Daftar dulu yuk, ada {ekskul.length} ekskul yang bisa kamu ikuti.</p>
            <Link href="/ekskul" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0F2E22] px-6 py-3 text-sm font-black text-[#A3E635] shadow-lg hover:-translate-y-0.5 hover:bg-[#134E4A] transition-all">
              Lihat Semua Ekskul
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#A3E635] text- text-[#0F2E22]">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <Link href="/ekskul?kategori=Olahraga&hari=Semua" className="rounded- bg-[#CFF5DE] border-2 border-teal-100 p-4 text-center hover:-translate-y-1 transition"><p className="text-2xl">🏀</p><p className="mt-1 text-xs font-black text-[#0F2E22]">Olahraga</p></Link>
          <Link href="/ekskul?kategori=Seni&hari=Semua" className="rounded- bg-[#F5F3FF] border-2 border-violet-100 p-4 text-center hover:-translate-y-1 transition"><p className="text-2xl">🎨</p><p className="mt-1 text-xs font-black text-[#0F2E22]">Seni</p></Link>
          <Link href="/ekskul?kategori=Teknologi&hari=Semua" className="rounded- bg-[#EFF6FF] border-2 border-sky-100 p-4 text-center hover:-translate-y-1 transition"><p className="text-2xl">🤖</p><p className="mt-1 text-xs font-black text-[#0F2E22]">Teknologi</p></Link>
        </div>
      </div>
    );
  }

  // DENGAN COOKIE - cari yang milik nama + kelas ini
  const milikSaya = pendaftar.filter(
    (p) => p.nama.toLowerCase() === nama.toLowerCase() && p.kelas.toLowerCase() === kelas.toLowerCase()
  );

  // COOKIE ADA TAPI BELUM ADA PENDAFTARAN
  if (milikSaya.length === 0) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded- bg-[#0F2E22] p-6 md:p-7 flex flex-wrap items-center gap-4 shadow-xl">
          <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[#A3E635]/20" />
          <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded- bg-[#A3E635] text-xl font-black text-[#0F2E22]">{getInisial(nama)}</span>
          <div className="relative">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">Ekskul Saya</h1>
            <p className="mt-1 text-sm font-bold text-white/70">{nama} · {kelas} · <span className="text-[#A3E635]">0 ekskul diikuti</span></p>
          </div>
        </div>

        <div className="mt-5 rounded- bg-[#EAFBF2] border-2 border-teal-100 p-8 text-center shadow-sm">
          <p className="text-4xl">📭</p>
          <h2 className="mt-3 text-lg font-black text-[#0F2E22]">Belum ada ekskul yang diikuti.</h2>
          <p className="mt-1 text-sm font-medium text-teal-800/70">Yuk pilih ekskul pertama kamu!</p>
          <Link href="/ekskul" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-5 py-2.5 text-sm font-black text-[#0F2E22] shadow-md hover:bg-[#BEF264] hover:-translate-y-0.5 transition">
            Cari Ekskul →
          </Link>
        </div>
      </div>
    );
  }

  // DENGAN COOKIE + ADA PENDAFTARAN
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {/* HEADER PROFIL */}
      <div className="relative overflow-hidden rounded- bg-gradient-to-br from-[#0F2E22] via-[#134E4A] to-[#0F766E] p-6 md:p-7 flex flex-wrap items-center gap-4 shadow-xl">
        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[#A3E635]/20" />
        <div className="absolute -left-6 -bottom-8 h-28 w-28 rounded-full bg-teal-400/20" />
        <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded- bg-[#A3E635] text-xl font-black text-[#0F2E22] shadow-lg rotate-[-2deg]">{getInisial(nama)}</span>
        <div className="relative flex-1 min-w-">
          <p className="text- font-black tracking-widest text-[#A3E635]">⭐ EKSKUL SAYA</p>
          <h1 className="mt-0.5 text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">{nama}</h1>
          <p className="mt-1 text-sm font-bold text-white/70">{kelas}</p>
        </div>
        <span className="relative inline-flex items-center gap-1.5 rounded-full bg-[#A3E635] px-4 py-2 text-sm font-black text-[#0F2E22] shadow-lg">
          🎟️ {milikSaya.length} ekskul diikuti
        </span>
      </div>

      {/* LIST EKSKUL */}
      <div className="space-y-3">
        {milikSaya.map((p, idx) => {
          const e = ekskul.find((x) => x.id === p.ekskulId);
          if (!e) return null;
          const w = WARNA_KARTU[idx % WARNA_KARTU.length];
          const ikon = e.kategori === "Olahraga" ? "🏀" : e.kategori === "Seni" ? "🎨" : e.kategori === "Teknologi" ? "🤖" : "⭐";
          return (
            <div key={p.id} className={`flex flex-wrap items-center gap-4 rounded- ${w.bg} border-2 ${w.border} p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition`}>
              <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${w.ikon} text-2xl text-white shadow-md`}>{ikon}</span>
              <div className="flex-1 min-w-">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/ekskul/${e.id}`} className="text-lg font-black text-[#0F2E22] hover:text-teal-700 hover:underline leading-tight">
                    {e.nama}
                  </Link>
                  <span className={`rounded-full ${w.badge} px-2.5 py-1 text- font-black tracking-wide`}>{e.kategori.toUpperCase()}</span>
                </div>
                <p className="mt-1.5 text-xs font-bold text-teal-800/70 leading-relaxed">
                  📅 {e.hari} • 🕒 Sesi {e.sesi} ({JAM_SESI[e.sesi]}) • 👨🏫 {e.pembina}
                </p>
                <p className="mt-1 text- font-black text-teal-800/50">Pendaftaran #{p.id}</p>
              </div>
              <TombolBatalkan pendaftarId={p.id} />
            </div>
          );
        })}
      </div>

      {/* TAMBAH LAGI */}
      <Link href="/ekskul" className="flex items-center justify-between rounded- bg-[#0F2E22] p-5 shadow-lg hover:-translate-y-0.5 transition group">
        <div>
          <p className="font-black text-white">Mau tambah ekskul lagi? ➕</p>
          <p className="mt-0.5 text-sm font-medium text-white/60">Masih ada {ekskul.length - milikSaya.length} ekskul lain yang bisa kamu ikuti.</p>
        </div>
        <span className="shrink-0 rounded-full bg-[#A3E635] px-4 py-2.5 text-sm font-black text-[#0F2E22] group-hover:bg-[#BEF264]">+ Tambah →</span>
      </Link>
    </div>
  );
}