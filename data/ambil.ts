import { ekskul, pendaftar } from "./ekskul";

// Simulasi ambil data dari server (biar ada loading di Suspense)
export async function ambilEkskul(id: number) {
  await new Promise((r) => setTimeout(r, 300));
  return ekskul.find((e) => e.id === id);
}

export async function ambilAnggota(ekskulId: number) {
  await new Promise((r) => setTimeout(r, 500));
  return pendaftar
    .filter((p) => p.ekskulId === ekskulId)
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