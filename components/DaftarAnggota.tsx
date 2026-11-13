import { cookies } from "next/headers";
import { pendaftar } from "@/data/ekskul";

export default async function DaftarAnggota({ ekskulId }: { ekskulId: number }) {
  const cookieStore = await cookies();
  const namaSaya = cookieStore.get("nama")?.value ?? "";

  const anggota = pendaftar.filter((p) => p.ekskulId === ekskulId);

  if (anggota.length === 0) {
    return (
      <p className="rounded-2xl bg-[#EAFBF2] border border-teal-100 px-4 py-3 text-sm font-bold text-teal-800/70">
        Belum ada anggota. Jadilah yang pertama!
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {anggota.map((p) => {
        const milikSaya = namaSaya !== "" && p.nama.toLowerCase() === namaSaya.toLowerCase();
        return (
          <li
            key={p.id}
            className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${milikSaya ? "bg-[#A3E635]/40 border-lime-300" : "bg-[#EAFBF2] border-teal-100"}`}
          >
            <span className="text-sm font-black text-[#0F2E22]">#{p.id} {p.nama}</span>
            <span className="flex items-center gap-2">
              <span className="text-xs font-bold text-teal-800/70">{p.kelas}</span>
              {milikSaya && (
                <span className="rounded-full bg-[#A3E635] border border-lime-300 px-2 py-0.5 text- font-black text-[#0F2E22]">
                  Kamu
                </span>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}