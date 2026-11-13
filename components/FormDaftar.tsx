"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { daftarEkskul } from "@/app/actions";
import type { Ekskul } from "@/data/ekskul";

function TombolDaftar({ penuh }: { penuh: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={penuh || pending}
      className={`mt-5 w-full rounded-full py-3 text-sm font-black transition ${penuh || pending ? "bg-[#CFF5DE] border border-teal-100 text-teal-800/50 cursor-not-allowed" : "bg-[#A3E635] border-2 border-lime-300 text-[#0F2E22] shadow-sm hover:bg-[#BEF264]"}`}
    >
      {pending ? "Memproses..." : penuh ? "Kuota Penuh" : "Daftar Sekarang →"}
    </button>
  );
}

export default function FormDaftar({ ekskul, penuh, namaAwal, kelasAwal, pesanSukses }: { ekskul: Ekskul; penuh: boolean; namaAwal: string; kelasAwal: string; pesanSukses?: string }) {
  const [state, action] = useActionState(daftarEkskul, { nilaiNama: namaAwal, nilaiKelas: kelasAwal });

  return (
    <form action={action} className="rounded- bg-[#D9F7E8] border border-teal-100 p-6 shadow-sm">
      <h2 className="text-lg font-black text-[#0F2E22]">Daftar {ekskul.nama}</h2>
      <p className="mt-1 text-xs font-bold text-teal-800/70">{penuh ? "Kuota sudah penuh" : "Isi data di bawah untuk mendaftar"}</p>

      {pesanSukses && (
        <p className="mt-4 rounded-2xl bg-[#DCFCE7] border border-emerald-200 px-4 py-3 text-xs font-black text-emerald-800">✅ {pesanSukses}</p>
      )}

      <input type="hidden" name="ekskulId" value={ekskul.id} />

      {/* NAMA - GALAT DI BAWAH KOLOMNYA */}
      <label className="mt-4 block">
        <span className="text-xs font-black text-[#0F2E22]">Nama</span>
        <input name="nama" defaultValue={state.nilaiNama} required placeholder="Nama lengkap" className={`mt-1.5 w-full rounded-full bg-[#EAFBF2] border px-4 py-2.5 text-sm font-medium text-[#0F2E22] placeholder:text-teal-800/40 outline-none focus:border-teal-300 ${state.galatNama ? "border-red-300" : "border-teal-100"}`} />
        {state.galatNama && <p className="mt-1.5 text-xs font-bold text-red-700">{state.galatNama}</p>}
      </label>

      {/* KELAS - GALAT DI BAWAH KOLOMNYA */}
      <label className="mt-3 block">
        <span className="text-xs font-black text-[#0F2E22]">Kelas</span>
        <input name="kelas" defaultValue={state.nilaiKelas} required placeholder="Contoh: XII RPL 1" className={`mt-1.5 w-full rounded-full bg-[#EAFBF2] border px-4 py-2.5 text-sm font-medium text-[#0F2E22] placeholder:text-teal-800/40 outline-none focus:border-teal-300 ${state.galatKelas ? "border-red-300" : "border-teal-100"}`} />
        {state.galatKelas && <p className="mt-1.5 text-xs font-bold text-red-700">{state.galatKelas}</p>}
      </label>

      {/* GALAT LAINNYA - SATU PESAN DI ATAS TOMBOL */}
      {state.galatUmum && (
        <p className="mt-4 rounded-2xl bg-[#FFE4E6] border border-red-200 px-4 py-3 text-xs font-black text-red-700">{state.galatUmum}</p>
      )}

      <TombolDaftar penuh={penuh} />

      {namaAwal && <p className="mt-3 text-center text-xs font-bold text-teal-800/70">👋 Halo lagi, {namaAwal}</p>}
    </form>
  );
}