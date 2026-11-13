import Link from "next/link";
import { cookies } from "next/headers";
import { ekskul, pendaftar, JAM_SESI } from "@/data/ekskul";
import TombolBatalkan from "@/components/TombolBatalkan";

export const metadata = {
  title: "Ekskul Saya",
  description: "Daftar ekskul yang kamu ikuti di EkskulKu.",
};

export default async function EkskulSaya() {
  const cookieStore = await cookies();
  const nama = cookieStore.get("nama")?.value;
  const kelas = cookieStore.get("kelas")?.value;

  // TANPA COOKIE
  if (!nama || !kelas) {
    return (
      <div className="mx-auto max-w-2xl rounded- bg-[#D9F7E8] border border-teal-100 p-8 text-center shadow-sm">
        <p className="text-4xl">🙁</p>
        <h1 className="mt-3 text-2xl font-black tracking-tight text-[#0F2E22]">Kamu belum mendaftar apa pun.</h1>
        <p className="mt-2 text-sm font-medium text-teal-800/70">Daftar dulu yuk, ada 6 ekskul yang bisa kamu ikuti.</p>
        <Link href="/ekskul" className="mt-5 inline-block rounded-full bg-[#0F2E22] px-6 py-3 text-sm font-black text-[#CFF5DE]">
          Lihat Semua Ekskul →
        </Link>
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
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-black tracking-tight text-[#0F2E22]">Ekskul Saya</h1>
        <p className="mt-2 text-sm font-bold text-teal-800/70">
          {nama} · {kelas} · 0 ekskul diikuti
        </p>
        <div className="mt-6 rounded- bg-[#D9F7E8] border border-teal-100 p-8 text-center shadow-sm">
          <p className="text-4xl">📭</p>
          <h2 className="mt-3 text-lg font-black text-[#0F2E22]">Belum ada ekskul yang diikuti.</h2>
          <Link href="/ekskul" className="mt-4 inline-block rounded-full bg-[#A3E635] border-2 border-lime-300 px-5 py-2.5 text-sm font-black text-[#0F2E22]">
            Cari Ekskul →
          </Link>
        </div>
      </div>
    );
  }

  // DENGAN COOKIE + ADA PENDAFTARAN
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-black tracking-tight text-[#0F2E22]">Ekskul Saya</h1>
      <p className="mt-2 rounded-full bg-[#D9F7E8] border border-teal-100 px-4 py-2 text-sm font-bold text-teal-800 inline-block">
        {nama} · {kelas} · {milikSaya.length} ekskul diikuti
      </p>

      <div className="mt-6 space-y-3">
        {milikSaya.map((p) => {
          const e = ekskul.find((x) => x.id === p.ekskulId);
          if (!e) return null;
          return (
            <div key={p.id} className="flex flex-wrap items-center gap-4 rounded- bg-[#D9F7E8] border border-teal-100 p-5 shadow-sm">
              <div className="flex-1 min-w-">
                <Link href={`/ekskul/${e.id}`} className="text-lg font-black text-[#0F2E22] hover:text-teal-700 hover:underline">
                  {e.nama}
                </Link>
                <p className="mt-1 text-xs font-bold text-teal-800/70">
                  📅 {e.hari} • 🕒 Sesi {e.sesi} ({JAM_SESI[e.sesi]}) • 👨‍🏫 {e.pembina} • {e.kategori}
                </p>
                <p className="mt-1 text- font-bold text-teal-800/50">Pendaftaran #{p.id}</p>
              </div>
              <TombolBatalkan pendaftarId={p.id} />
            </div>
          );
        })}
      </div>

      <Link href="/ekskul" className="mt-6 inline-block rounded-full bg-[#EAFBF2] border border-teal-100 px-5 py-2.5 text-sm font-black text-teal-800">
                + Tambah Ekskul Lain →
      </Link>
    </div>
  );
}