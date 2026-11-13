"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ekskul, pendaftar, tambahPendaftar, hapusPendaftar, JAM_SESI } from "@/data/ekskul";

export type StateDaftar = {
  sukses?: string;
  galatNama?: string;
  galatKelas?: string;
  galatUmum?: string;
  nilaiNama: string;
  nilaiKelas: string;
};

const awal: StateDaftar = { nilaiNama: "", nilaiKelas: "" };

export async function daftarEkskul(_prev: StateDaftar, form: FormData): Promise<StateDaftar> {
  const ekskulId = Number(form.get("ekskulId"));
  const nama = String(form.get("nama") ?? "").trim();
  const kelas = String(form.get("kelas") ?? "").trim();

  const kembalikan = (tambahan: Partial<StateDaftar>): StateDaftar => ({
    ...awal,
    nilaiNama: nama,
    nilaiKelas: kelas,
    ...tambahan,
  });

  const e = ekskul.find((x) => x.id === ekskulId);
  if (!e) return kembalikan({ galatUmum: "Ekskul tidak ditemukan." });

  if (nama.length < 3) return kembalikan({ galatNama: "Nama minimal 3 huruf." });
  if (kelas.length < 3) return kembalikan({ galatKelas: "Kelas minimal 3 karakter." });

  const sudah = pendaftar.some(
    (p) =>
      p.ekskulId === ekskulId &&
      p.nama.toLowerCase() === nama.toLowerCase() &&
      p.kelas.toLowerCase() === kelas.toLowerCase()
  );
  if (sudah) return kembalikan({ galatUmum: `${nama} (${kelas}) sudah terdaftar di ${e.nama}.` });

  const terdaftar = pendaftar.filter((p) => p.ekskulId === ekskulId).length;
  if (terdaftar >= e.kuota) return kembalikan({ galatUmum: `Kuota ${e.nama} sudah penuh (${e.kuota} orang).` });

  const bentrok = pendaftar.find((p) => {
    if (p.nama.toLowerCase() !== nama.toLowerCase() || p.kelas.toLowerCase() !== kelas.toLowerCase()) return false;
    if (p.ekskulId === ekskulId) return false;
    const lain = ekskul.find((x) => x.id === p.ekskulId);
    return lain && lain.hari === e.hari && lain.sesi === e.sesi;
  });
  if (bentrok) {
    const lain = ekskul.find((x) => x.id === bentrok.ekskulId);
    return kembalikan({ galatUmum: `Jadwal bentrok dengan ${lain?.nama} (${lain?.hari}, sesi ${lain?.sesi}).` });
  }

  const nomor = tambahPendaftar({ ekskulId, nama, kelas });
  const cookieStore = await cookies();
  cookieStore.set("nama", nama, { maxAge: 60 * 60 * 24 * 30, path: "/" });
  cookieStore.set("kelas", kelas, { maxAge: 60 * 60 * 24 * 30, path: "/" });
  cookieStore.set("sukses_daftar", `Pendaftaran #${nomor} berhasil: ${e.nama}, ${e.hari}, sesi ${e.sesi} (${JAM_SESI[e.sesi]}).`, { maxAge: 10, path: "/" });

  revalidatePath(`/ekskul/${ekskulId}`);
  revalidatePath("/ekskul");
  revalidatePath("/");
  revalidatePath("/saya");
  revalidatePath("/ekskul-saya");

  redirect(`/ekskul/${ekskulId}?sukses=1`);
}

// LANGKAH 5 - POIN 13: BATALKAN
export async function batalkanEkskul(form: FormData) {
  const pendaftarId = Number(form.get("pendaftarId"));
  const cookieStore = await cookies();
  const namaCookie = cookieStore.get("nama")?.value ?? "";
  const kelasCookie = cookieStore.get("kelas")?.value ?? "";

  // CEK ULANG KEPEMILIKAN - jangan percaya id doang
  // Kalau orang iseng ganti pendaftarId lewat DevTools, ditolak
  const target = pendaftar.find((p) => p.id === pendaftarId);
  if (!target) redirect("/saya");

  if (
    target.nama.toLowerCase() !== namaCookie.toLowerCase() ||
    target.kelas.toLowerCase() !== kelasCookie.toLowerCase()
  ) {
    // Bukan punya dia - tolak, jangan hapus
    redirect("/saya");
  }

  hapusPendaftar(pendaftarId);

  revalidatePath("/saya");
  revalidatePath("/ekskul-saya");
  revalidatePath("/ekskul");
  revalidatePath(`/ekskul/${target.ekskulId}`);
  revalidatePath("/");

  redirect("/saya");
}