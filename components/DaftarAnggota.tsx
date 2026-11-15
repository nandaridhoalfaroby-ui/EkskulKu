import { cookies } from "next/headers";
import { pendaftar } from "@/data/ekskul";

function tingkatKelas(kelas: string): number {
  const depan = kelas.trim().split(" ")[0]?.toUpperCase() ?? "";
  if (depan === "XII") return 12;
  if (depan === "XI") return 11;
  if (depan === "X") return 10;
  return 0;
}

function warnaKelas(kelas: string) {
  const t = tingkatKelas(kelas);
  if (t === 12) return "bg-violet-500 text-white shadow-[0_3px_10px_rgba(139,92,246,0.35)]";
  if (t === 11) return "bg-teal-500 text-white shadow-[0_3px_10px_rgba(20,184,166,0.35)]";
  if (t === 10) return "bg-amber-500 text-zinc-900 shadow-[0_3px_10px_rgba(245,158,11,0.35)]";
  return "bg-teal-100 text-teal-800";
}

function warnaAvatar(nama: string) {
  const warna = [
    "bg-gradient-to-br from-violet-400 to-purple-500",
    "bg-gradient-to-br from-teal-400 to-emerald-500",
    "bg-gradient-to-br from-amber-400 to-orange-400",
    "bg-gradient-to-br from-sky-400 to-blue-500",
    "bg-gradient-to-br from-pink-400 to-rose-500",
    "bg-gradient-to-br from-lime-400 to-green-500",
  ];
  let hash = 0;
  for (let i = 0; i < nama.length; i++) hash = (hash + nama.charCodeAt(i)) % warna.length;
  return warna[hash];
}

export default async function DaftarAnggota({ ekskulId }: { ekskulId: number }) {
  const cookieStore = await cookies();
  const namaSaya = cookieStore.get("nama")?.value ?? "";

  // SORT: XII dulu, baru XI, baru X, lalu nama A-Z
  const anggota = pendaftar
    .filter((p) => p.ekskulId === ekskulId)
    .sort((a, b) => {
      const selisihKelas = tingkatKelas(b.kelas) - tingkatKelas(a.kelas);
      if (selisihKelas !== 0) return selisihKelas;
      return a.nama.localeCompare(b.nama, "id", { sensitivity: "base" });
    });

  if (anggota.length === 0) {
    return (
      <div className="rounded- bg-gradient-to-br from-[#CFF5DE] to-[#EAFBF2] border-2 border-dashed border-teal-200 p-6 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#EAFBF2] border-2 border-teal-100 text-2xl shadow-sm -rotate-3">👋</div>
        <p className="mt-3 text-sm font-black text-[#0F2E22]">Belum ada anggota.</p>
        <p className="text-xs font-medium text-teal-800/70">Jadilah yang pertama!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0F2E22] px-3 py-1.5 text- font-black tracking-wider text-[#A3E635]">👥 DAFTAR ANGGOTA</span>
        <span className="grid h-6 min-w-6 place-items-center rounded-full bg-[#A3E635] px-1.5 text- font-black text-[#0F2E22]">{anggota.length}</span>
      </div>

      <ul className="space-y-2.5">
        {anggota.map((p, i) => {
          const milikSaya = namaSaya !== "" && p.nama.toLowerCase() === namaSaya.toLowerCase();
          // NOMOR URUT 1, 2, 3... bukan p.id lagi
          const nomorUrut = i + 1;
          const inisial = p.nama.trim().charAt(0).toUpperCase();
          return (
            <li
              key={p.id}
              className={`flex items-center gap-3 rounded- border-2 p-3 transition hover:-translate-y-0.5 hover:shadow-md ${
                milikSaya
                  ? "bg-[#A3E635]/30 border-lime-300 shadow-[0_4px_16px_rgba(163,230,53,0.25)]"
                  : "bg-[#EAFBF2] border-teal-100 shadow-sm"
              }`}
            >
              {/* Nomor urut */}
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-black ${milikSaya ? "bg-[#0F2E22] text-[#A3E635]" : "bg-[#CFF5DE] border border-teal-100 text-teal-800"}`}>
                {nomorUrut}
              </span>

              {/* Avatar inisial */}
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text- font-black text-white shadow-sm ${warnaAvatar(p.nama)}`}>
                {inisial}
              </span>

              {/* Nama + kelas */}
              <span className="flex-1 min-w-0">
                <span className="block truncate text-sm font-black text-[#0F2E22]">{p.nama}</span>
                <span className="mt-0.5 flex items-center gap-1.5">
                  <span className={`rounded-full px-2 py-0.5 text- font-black ${warnaKelas(p.kelas)}`}>{p.kelas}</span>
                  {milikSaya && (
                    <span className="rounded-full bg-[#0F2E22] px-2 py-0.5 text- font-black text-[#A3E635]">✦ Kamu</span>
                  )}
                </span>
              </span>

              {/* Badge kelas XII / XI / X */}
              <span className="hidden sm:block text- font-black text-teal-800/50">
                {tingkatKelas(p.kelas) === 12 ? "Kelas XII" : tingkatKelas(p.kelas) === 11 ? "Kelas XI" : "Kelas X"}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-center text- font-bold text-teal-800/50">Diurutkan: XII → XI → X, lalu nama A-Z ✨</p>
    </div>
  );
}