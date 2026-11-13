import Link from "next/link";
import { ekskul, pendaftar, DAFTAR_KATEGORI, DAFTAR_HARI, JAM_SESI } from "@/data/ekskul";

export const metadata = { title: "Semua Ekskul", description: "Jelajahi semua ekstrakurikuler di EkskulKu." };

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

  const chip = (on: boolean) =>
    on
      ? "bg-[#0F2E22] text-white border-[#0F2E22]"
      : "bg-white text-[#0F2E22] border-teal-300 hover:bg-[#CFF5DE]";

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-3xl font-black tracking-tight text-[#0F2E22]">Semua Ekskul</h1>
      <p className="mt-2 text-sm font-black text-[#0F2E22]">{hasil.length} ekskul ditemukan {hanyaSisa && "• hanya yang masih ada tempat"}</p>

      <div className="mt-6 rounded- bg-[#A7F3D0] border-2 border-teal-300 p-5 shadow-md">
        <p className="text-xs font-black text-[#0F2E22]">Kategori</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Link href={linkFilter({ kategori: "" })} className={`rounded-full border-2 px-3 py-1.5 text-xs font-black ${chip(!kategori)}`}>Semua</Link>
          {DAFTAR_KATEGORI.map((k) => (
            <Link key={k} href={linkFilter({ kategori: k })} className={`rounded-full border-2 px-3 py-1.5 text-xs font-black ${chip(kategori === k)}`}>{k}</Link>
          ))}
        </div>
        <p className="mt-4 text-xs font-black text-[#0F2E22]">Hari</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Link href={linkFilter({ hari: "" })} className={`rounded-full border-2 px-3 py-1.5 text-xs font-black ${chip(!hari)}`}>Semua Hari</Link>
          {DAFTAR_HARI.map((h) => (
            <Link key={h} href={linkFilter({ hari: h })} className={`rounded-full border-2 px-3 py-1.5 text-xs font-black ${chip(hari === h)}`}>{h}</Link>
          ))}
        </div>
        <p className="mt-4 text-xs font-black text-[#0F2E22]">Sesi</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Link href={linkFilter({ sesi: "" })} className={`rounded-full border-2 px-3 py-1.5 text-xs font-black ${chip(!sesi)}`}>Semua Sesi</Link>
          <Link href={linkFilter({ sesi: "1" })} className={`rounded-full border-2 px-3 py-1.5 text-xs font-black ${chip(sesi === 1)}`}>Sesi 1 (15.00-16.30)</Link>
          <Link href={linkFilter({ sesi: "2" })} className={`rounded-full border-2 px-3 py-1.5 text-xs font-black ${chip(sesi === 2)}`}>Sesi 2 (16.30-18.00)</Link>
        </div>
        <p className="mt-4 text-xs font-black text-[#0F2E22]">Ketersediaan</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Link href={linkFilter({ sisa: "" })} className={`rounded-full border-2 px-3 py-1.5 text-xs font-black ${chip(!hanyaSisa)}`}>Semua</Link>
          <Link href={linkFilter({ sisa: "1" })} className={`rounded-full border-2 px-3 py-1.5 text-xs font-black ${chip(hanyaSisa)}`}>✅ Masih Ada Tempat</Link>
        </div>
      </div>

      {hasil.length === 0 ? (
        <div className="mt-6 rounded- bg-[#A7F3D0] border-2 border-teal-300 p-8 text-center">
          <p className="text-3xl">🔍</p>
          <p className="mt-2 font-black text-[#0F2E22]">Tidak ada ekskul yang cocok.</p>
          <Link href="/ekskul" className="mt-3 inline-block rounded-full bg-[#0F2E22] px-5 py-2.5 text-xs font-black text-white">Reset Filter</Link>
        </div>
      ) : (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hasil.map((e) => {
            const terdaftar = pendaftar.filter((p) => p.ekskulId === e.id).length;
            const sisa = Math.max(0, e.kuota - terdaftar);
            const penuh = sisa === 0;
            return (
              <Link key={e.id} href={`/ekskul/${e.id}`} className="block rounded- bg-[#A7F3D0] border-2 border-teal-300 p-5 shadow-md hover:border-teal-500 hover:-translate-y-0.5 transition">
                <div className="flex gap-2">
                  <span className="rounded-full bg-[#0F2E22] px-3 py-1 text- font-black text-[#CFF5DE]">{e.kategori}</span>
                  {penuh && <span className="rounded-full bg-red-500 px-3 py-1 text- font-black text-white">PENUH</span>}
                </div>
                <h2 className="mt-3 text-lg font-black text-[#0F2E22]">{e.nama}</h2>
                <p className="mt-1 text-xs font-bold text-[#0F2E22]/80">📅 {e.hari} • 🕒 Sesi {e.sesi} ({JAM_SESI[e.sesi]})</p>
                <p className="mt-1 text-xs font-bold text-[#0F2E22]/80">👨‍🏫 {e.pembina} • Sisa {sisa} tempat</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}