export type Ekskul = {
  id: number;
  nama: string;
  kategori: "Olahraga" | "Seni" | "Akademik" | "Teknologi";
  hari: "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat";
  sesi: 1 | 2;
  kuota: number;
  pembina: string;
};

export type Pendaftar = {
  id: number;
  ekskulId: number;
  nama: string;
  kelas: string;
};

export const JAM_SESI: Record<1 | 2, string> = {
  1: "15.00-16.30",
  2: "16.30-18.00",
};

// INI YANG ILANG - BUAT FILTER DI /ekskul
export const DAFTAR_KATEGORI = ["Olahraga", "Seni", "Akademik", "Teknologi"] as const;
export const DAFTAR_HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"] as const;

export const ekskul: Ekskul[] = [
  { id: 1, nama: "Basket", kategori: "Olahraga", hari: "Senin", sesi: 1, kuota: 3, pembina: "Pak Budi" },
  { id: 2, nama: "Futsal", kategori: "Olahraga", hari: "Rabu", sesi: 1, kuota: 20, pembina: "Pak Andi" },
  { id: 3, nama: "Tari Tradisional", kategori: "Seni", hari: "Selasa", sesi: 2, kuota: 15, pembina: "Bu Sari" },
  { id: 4, nama: "Paduan Suara", kategori: "Seni", hari: "Kamis", sesi: 1, kuota: 25, pembina: "Bu Rina" },
  { id: 5, nama: "Lomba Cerdas Cermat", kategori: "Akademik", hari: "Jumat", sesi: 1, kuota: 12, pembina: "Bu Dewi" },
  { id: 6, nama: "Robotik", kategori: "Teknologi", hari: "Kamis", sesi: 2, kuota: 10, pembina: "Pak Doni" },
];

export const pendaftar: Pendaftar[] = [
  { id: 1, ekskulId: 1, nama: "Rudi", kelas: "XI TKJ 1" },
  { id: 2, ekskulId: 1, nama: "Sari", kelas: "XI TKJ 1" },
  { id: 3, ekskulId: 3, nama: "Andi", kelas: "XI RPL 1" },
  { id: 4, ekskulId: 6, nama: "Andi", kelas: "XI RPL 1" },
];

let nomorBerikutnya = 5;

export function tambahPendaftar(data: Omit<Pendaftar, "id">): number {
  const id = nomorBerikutnya++;
  pendaftar.push({ ...data, id });
  return id;
}

export function hapusPendaftar(pendaftarId: number) {
  const idx = pendaftar.findIndex((p) => p.id === pendaftarId);
  if (idx === -1) return false;
  pendaftar.splice(idx, 1);
  return true;
}