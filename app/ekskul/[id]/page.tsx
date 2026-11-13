import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { ambilEkskul } from "@/data/ambil";
import { ekskul, pendaftar, JAM_SESI } from "@/data/ekskul";
import FormDaftar from "@/components/FormDaftar";
import DaftarAnggota from "@/components/DaftarAnggota";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const e = ekskul.find((x) => x.id === Number(id));
  if (!e) return { title: "Ekskul tidak ditemukan" };
  return { title: e.nama, description: `Daftar ${e.nama} di EkskulKu.` };
}

export default async function DetailEkskul({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sukses?: string }>;
}) {
  const { id } = await params;
  const { sukses } = await searchParams;
  const e = await ambilEkskul(Number(id));
  if (!e) notFound();

  const terdaftar = pendaftar.filter((p) => p.ekskulId === e.id).length;
  const sisa = Math.max(0, e.kuota - terdaftar);
  const terisi = Math.round((terdaftar / e.kuota) * 100);
  const penuh = sisa === 0;
  const cookieStore = await cookies();
  const namaAwal = cookieStore.get("nama")?.value ?? "";
  const kelasAwal = cookieStore.get("kelas")?.value ?? "";
  const pesanSukses =
    sukses === "1" ? cookieStore.get("sukses_daftar")?.value : undefined;

  return (
    <div className="mx-auto max-w-5xl grid md:grid-cols-[1.1fr_0.9fr] gap-6">
      <article className="relative overflow-hidden rounded- bg-[#D9F7E8] border border-teal-100 p-6 md:p-8 shadow-sm">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#A3E635]/40 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#EAFBF2] border border-teal-100 px-3 py-1 text- font-black text-teal-800">
              {e.kategori}
            </span>
            {penuh && (
              <span className="rounded-full bg-[#FFE4E6] border border-red-200 px-3 py-1 text- font-black text-red-700">
                PENUH
              </span>
            )}
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-black tracking-tight leading-tight text-[#0F2E22]">
            {e.nama}
          </h1>
          <p className="mt-3 text-sm font-bold text-teal-800/70">
            📅 {e.hari} • 🕒 Sesi {e.sesi} ({JAM_SESI[e.sesi]}) • 👨‍🏫 {e.pembina}
          </p>
          <p className="mt-5 text-2xl font-black text-[#0F2E22]">
            {terdaftar} dari {e.kuota} tempat terisi
          </p>
          <p className="mt-1 text-xs font-bold text-teal-800/70">
            Sisa {sisa} tempat • {terisi}% terisi
          </p>
          <div className="mt-2 h-2.5 max-w-md overflow-hidden rounded-full bg-[#EAFBF2] border border-teal-100">
            <div
              className={`h-full rounded-full ${penuh ? "bg-red-300" : "bg-teal-500"}`}
              style={{ width: `${terisi}%` }}
            />
          </div>
          <section className="mt-8 rounded-2xl bg-[#EAFBF2] border border-teal-100 p-5">
            <h2 className="text-sm font-black tracking-tight text-[#0F2E22]">
              Anggota terdaftar
            </h2>
            <div className="mt-3">
              <Suspense
                fallback={
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-12 animate-pulse rounded-2xl bg-[#CFF5DE] border border-teal-100"
                      />
                    ))}
                    <p className="text-center text-xs font-bold text-teal-800/70">
                      Memuat anggota...
                    </p>
                  </div>
                }
              >
                <DaftarAnggota ekskulId={e.id} />
              </Suspense>
            </div>
          </section>
        </div>
      </article>
      <div>
        <FormDaftar
          ekskul={e}
          penuh={penuh}
          namaAwal={namaAwal}
          kelasAwal={kelasAwal}
          pesanSukses={pesanSukses}
        />
      </div>
    </div>
  );
}
