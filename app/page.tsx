import Link from "next/link";
import { ekskul, pendaftar, DAFTAR_KATEGORI, DAFTAR_HARI, JAM_SESI } from "@/data/ekskul";

export const metadata = {
  title: "Semua Ekskul",
  description: "Jelajahi semua ekstrakurikuler di EkskulKu.",
};

type Props = {
  searchParams: Promise<{ cari?: string; kategori?: string; hari?: string; sesi?: string; sisa?: string }>;
};

export default async function KatalogEkskul({ searchParams }: Props) {
  const params = await searchParams;
  const cari = (params.cari ?? "").trim().toLowerCase();

  const kategoriRaw = params.kategori ?? "";
  const kategori = (DAFTAR_KATEGORI as readonly string[]).includes(kategoriRaw) ? kategoriRaw : "";

  const hariRaw = params.hari ?? "";
  const hari = (DAFTAR_HARI as readonly string[]).includes(hariRaw) ? hariRaw : "";

  const sesiRaw = params.sesi ?? "";
  const sesi = sesiRaw === "1" || sesiRaw === "2" ? Number(sesiRaw) : 0;

  // BONUS 1: ?sisa=1 artinya cuma yang masih ada tempat
  const hanyaSisa = params.sisa === "1";

  const hasil = ekskul.filter((e) => {
    if (cari && !e.nama.toLowerCase().includes(cari)) return false;
    if (kategori && e.kategori !== kategori) return false;
    if (hari && e.hari !== hari) return false;
    if (sesi && e.sesi !== sesi) return false;
    if (hanyaSisa) {
      const terdaftar = pendaftar.filter((p) => p.ekskulId === e.id).length;
      if (terdaftar >= e.kuota) return false;
    }
    return true;
  });

  const linkFilter = (patch: Record<string, string>) => {
    const q = new URLSearchParams();
    if (cari) q.set("cari", cari);
    if (kategori) q.set("kategori", kategori);
    if (hari) q.set("hari", hari);
    if (sesi) q.set("sesi", String(sesi));
    if (hanyaSisa) q.set("sisa", "1");
    for (const [k, v] of Object.entries(patch)) {
      if (v) q.set(k, v);
      else q.delete(k);
    }
    const s = q.toString();
    return s ? `/ekskul?${s}` : "/ekskul";
  };

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-3xl font-black tracking-tight text-[#0F2E22]">Semua Ekskul</h1>
      <p className="mt-2 text-sm font-bold text-teal-800/70">{hasil.length} ekskul ditemukan {hanyaSisa && "• hanya yang masih ada tempat"}</p>

      <div className="mt-6 rounded- bg-[#D9F7E8] border border-teal-100 p-5 shadow-sm">
        <p className="text-xs font-black text-[#0F2E22]">Kategori</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Link href={linkFilter({ kategori: "" })} className={`rounded-full border px-3 py-1.5 text-xs font-black ${!kategori ? "bg-[#A3E635] border-lime-300 text-[#0F2E22]" : "bg-[#EAFBF2] border-teal-100 text-teal-800"}`}>Semua</Link>
          {DAFTAR_KATEGORI.map((k) => (
            <Link key={k} href={linkFilter({ kategori: k })} className={`rounded-full border px-3 py-1.5 text-xs font-black ${kategori === k ? "bg-[#A3E635] border-lime-300 text-[#0F2E22]" : "bg-[#EAFBF2] border-teal-100 text-teal-800"}`}>{k}</Link>
          ))}
        </div>

        <p className="mt-4 text-xs font-black text-[#0F2E22]">Hari</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Link href={linkFilter({ hari: "" })} className={`rounded-full border px-3 py-1.5 text-xs font-black ${!hari ? "bg-[#A3E635] border-lime-300 text-[#0F2E22]" : "bg-[#EAFBF2] border-teal-100 text-teal-800"}`}>Semua Hari</Link>
          {DAFTAR_HARI.map((h) => (
            <Link key={h} href={linkFilter({ hari: h })} className={`rounded-full border px-3 py-1.5 text-xs font-black ${hari === h ? "bg-[#A3E635] border-lime-300 text-[#0F2E22]" : "bg-[#EAFBF2] border-teal-100 text-teal-800"}`}>{h}</Link>
          ))}
        </div>

        <p className="mt-4 text-xs font-black text-[#0F2E22]">Sesi</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Link href={linkFilter({ sesi: "" })} className={`rounded-full border px-3 py-1.5 text-xs font-black ${!sesi ? "bg-[#A3E635] border-lime-300 text-[#0F2E22]" : "bg-[#EAFBF2] border-teal-100 text-teal-800"}`}>Semua Sesi</Link>
          <Link href={linkFilter({ sesi: "1" })} className={`rounded-full border px-3 py-1.5 text-xs font-black ${sesi === 1 ? "bg-[#A3E635] border-lime-300 text-[#0F2E22]" : "bg-[#EAFBF2] border-teal-100 text-teal-800"}`}>Sesi 1 (15.00-16.30)</Link>
          <Link href={linkFilter({ sesi: "2" })} className={`rounded-full border px-3 py-1.5 text-xs font-black ${sesi === 2 ? "bg-[#A3E635] border-lime-300 text-[#0F2E22]" : "bg-[#EAFBF2] border-teal-100 text-teal-800"}`}>Sesi 2 (16.30-18.00)</Link>
        </div>

        {/* BONUS 1: TOMBOL SISA */}
        <p className="mt-4 text-xs font-black text-[#0F2E22]">Ketersediaan</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Link href={linkFilter({ sisa: "" })} className={`rounded-full border px-3 py-1.5 text-xs font-black ${!hanyaSisa ? "bg-[#A3E635] border-lime-300 text-[#0F2E22]" : "bg-[#EAFBF2] border-teal-100 text-teal-800"}`}>Semua</Link>
          <Link href={linkFilter({ sisa: "1" })} className={`rounded-full border px-3 py-1.5 text-xs font-black ${hanyaSisa ? "bg-[#A3E635] border-lime-300 text-[#0F2E22]" : "bg-[#EAFBF2] border-teal-100 text-teal-800"}`}>✅ Masih Ada Tempat</Link>
        </div>
      </div>

      {hasil.length === 0 ? (
        <div className="mt-6 rounded- bg-[#D9F7E8] border border-teal-100 p-8 text-center">
          <p className="text-3xl">🔍</p>
          <p className="mt-2 font-black text-[#0F2E22]">Tidak ada ekskul yang cocok.</p>
          <Link href="/ekskul" className="mt-3 inline-block rounded-full bg-[#0F2E22] px-5 py-2.5 text-xs font-black text-[#CFF5DE]">Reset Filter</Link>
        </div>
      ) : (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hasil.map((e) => {
            const terdaftar = pendaftar.filter((p) => p.ekskulId === e.id).length;
            const sisa = Math.max(0, e.kuota - terdaftar);
            const penuh = sisa === 0;
            return (
              <Link key={e.id} href={`/ekskul/${e.id}`} className="block rounded- bg-[#D9F7E8] border border-teal-100 p-5 shadow-sm hover:border-teal-300 transition">
                <div className="flex gap-2">
                  <span className="rounded-full bg-[#EAFBF2] border border-teal-100 px-3 py-1 text- font-black text-teal-800">{e.kategori}</span>
                  {penuh && <span className="rounded-full bg-[#FFE4E6] border border-red-200 px-3 py-1 text- font-black text-red-700">PENUH</span>}
                </div>
                <h2 className="mt-3 text-lg font-black text-[#0F2E22]">{e.nama}</h2>
                <p className="mt-1 text-xs font-bold text-teal-800/70">📅 {e.hari} • 🕒 Sesi {e.sesi} ({JAM_SESI[e.sesi]})</p>
                <p className="mt-1 text-xs font-bold text-teal-800/70">👨‍🏫 {e.pembina} • Sisa {sisa} tempat</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}