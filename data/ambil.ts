import { ekskul, pendaftar } from "./ekskul";

export async function ambilEkskul(id: number) {
  await new Promise((r) => setTimeout(r, 300));
  return ekskul.find((e) => e.id === id);
}

function tingkatKelas(kelas: string): number {
  const depan = kelas.trim().split(" ")[0]?.toUpperCase() ?? "";
  if (depan === "XII") return 12;
  if (depan === "XI") return 11;
  if (depan === "X") return 10;
  return 0;
}

export async function ambilAnggota(ekskulId: number) {
  await new Promise((r) => setTimeout(r, 500));
  return pendaftar
    .filter((p) => p.ekskulId === ekskulId)
    .sort((a, b) => {
      const selisihKelas = tingkatKelas(b.kelas) - tingkatKelas(a.kelas);
      if (selisihKelas !== 0) return selisihKelas;
      return a.nama.localeCompare(b.nama, "id", { sensitivity: "base" });
    })
    .map((p) => ({
      id: p.id,
      nama: p.nama,
      kelas: p.kelas,
    }));
}

export async function ambilSemuaEkskul() {
  await new Promise((r) => setTimeout(r, 300));
  return ekskul;
}