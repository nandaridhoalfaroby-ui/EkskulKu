import Link from "next/link";
import { ekskul, pendaftar, DAFTAR_KATEGORI, DAFTAR_HARI } from "@/data/ekskul";
import KartuEkskul from "@/components/KartuEkskul";
import KontrolEkskul from "@/components/KontrolEkskul";

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

  // Chip anti-white: on = hitam-lime, off = mint
  const chip = (on: boolean) =>
    on
      ? "bg-[#0F2E22] text-[#A3E635] border-[#0F2E22] shadow-md"
      : "bg-[#EAFBF2] text-[#0F2E22] border-teal-100 hover:bg-[#CFF5DE] hover:border-teal-200";

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* HEADER */}
      <div className="relative overflow-hidden rounded- bg-gradient-to-br from-[#0F2E22] via-[#134E4A] to-[#0F766E] p-6 md:p-8 shadow-xl">
        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[#A3E635]/20" />
        <div className="absolute -left-6 -bottom-8 h-28 w-28 rounded-full bg-teal-400/20" />
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full bg-[#A3E635] px-3 py-1.5 text- font-black text-[#0F2E22]">🏀 KATALOG EKSKUL</span>
            <h1 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">Semua Ekskul</h1>
            <p className="mt-1 text-sm font-medium text-white/70">Pilih yang paling kamu suka, langsung daftar.</p>
          </div>
          <span className="rounded-full bg-white/10 border border-white/20 backdrop-blur px-4 py-2 text-sm font-black text-white">
            🎟️ {hasil.length} ekskul ditemukan {hanyaSisa && "• masih ada tempat"}
          </span>
        </div>
      </div>

      {/* SEARCH + SORT - komponen modern yang udah lo punya */}
      <KontrolEkskul kategori={""} hari={""} />

      {/* FILTER WARNA-WARNI */}
      <div className="rounded- bg-[#EAFBF2] border-2 border-teal-100 p-5 md:p-6 shadow-sm space-y-5">
        <div>
          <p className="flex items-center gap-2 text-xs font-black tracking-wide text-[#0F2E22]"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#A3E635] text-">🎯</span> KATEGORI</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <Link href={linkFilter({ kategori: "" })} className={`rounded-full border-2 px-3.5 py-2 text-xs font-black transition hover:-translate-y-0.5 ${chip(!kategori)}`}>✨ Semua</Link>
            {DAFTAR_KATEGORI.map((k) => (
              <Link key={k} href={linkFilter({ kategori: k })} className={`rounded-full border-2 px-3.5 py-2 text-xs font-black transition hover:-translate-y-0.5 ${chip(kategori === k)}`}>{k}</Link>
            ))}
          </div>
        </div>

        <div className="border-t border-teal-100 pt-5">
          <p className="flex items-center gap-2 text-xs font-black tracking-wide text-[#0F2E22]"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#FDE68A] text-">📅</span> HARI</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <Link href={linkFilter({ hari: "" })} className={`rounded-full border-2 px-3.5 py-2 text-xs font-black transition hover:-translate-y-0.5 ${chip(!hari)}`}>Semua Hari</Link>
            {DAFTAR_HARI.map((h) => (
              <Link key={h} href={linkFilter({ hari: h })} className={`rounded-full border-2 px-3.5 py-2 text-xs font-black transition hover:-translate-y-0.5 ${chip(hari === h)}`}>{h}</Link>
            ))}
          </div>
        </div>

        <div className="border-t border-teal-100 pt-5">
          <p className="flex items-center gap-2 text-xs font-black tracking-wide text-[#0F2E22]"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#C4B5FD] text-">🕒</span> SESI</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <Link href={linkFilter({ sesi: "" })} className={`rounded-full border-2 px-3.5 py-2 text-xs font-black transition hover:-translate-y-0.5 ${chip(!sesi)}`}>Semua Sesi</Link>
            <Link href={linkFilter({ sesi: "1" })} className={`rounded-full border-2 px-3.5 py-2 text-xs font-black transition hover:-translate-y-0.5 ${chip(sesi === 1)}`}>Sesi 1 • 15.00 - 16.30</Link>
            <Link href={linkFilter({ sesi: "2" })} className={`rounded-full border-2 px-3.5 py-2 text-xs font-black transition hover:-translate-y-0.5 ${chip(sesi === 2)}`}>Sesi 2 • 16.30 - 18.00</Link>
          </div>
        </div>

        <div className="border-t border-teal-100 pt-5">
          <p className="flex items-center gap-2 text-xs font-black tracking-wide text-[#0F2E22]"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#6EE7B7] text-">✅</span> KETERSEDIAAN</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <Link href={linkFilter({ sisa: "" })} className={`rounded-full border-2 px-3.5 py-2 text-xs font-black transition hover:-translate-y-0.5 ${chip(!hanyaSisa)}`}>Semua</Link>
            <Link href={linkFilter({ sisa: "1" })} className={`rounded-full border-2 px-3.5 py-2 text-xs font-black transition hover:-translate-y-0.5 ${chip(hanyaSisa)}`}>✅ Masih Ada Tempat</Link>
          </div>
        </div>
      </div>

      {/* HASIL */}
      {hasil.length === 0 ? (
        <div className="overflow-hidden rounded- bg-[#EAFBF2] border-2 border-teal-100 shadow-sm text-center">
          <div className="bg-gradient-to-r from-[#14B8A6] to-[#A3E635] px-6 py-6">
            <p className="text-4xl">🔍</p>
          </div>
          <div className="p-6 md:p-8">
            <p className="font-black text-[#0F2E22] text-lg">Tidak ada ekskul yang cocok.</p>
            <p className="mt-1 text-sm font-medium text-teal-800/70">Coba ubah filter atau cari kata lain.</p>
            <Link href="/ekskul" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0F2E22] px-5 py-2.5 text-xs font-black text-[#A3E635] shadow-md hover:-translate-y-0.5 transition">↺ Reset Filter</Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((e) => (
            <KartuEkskul key={e.id} e={e} />
          ))}
        </div>
      )}
    </div>
  );
}