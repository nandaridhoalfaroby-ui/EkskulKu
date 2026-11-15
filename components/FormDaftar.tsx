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
      className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-black transition-all ${
        penuh || pending
          ? "bg-[#CFF5DE] border-2 border-teal-100 text-teal-800/50 cursor-not-allowed"
          : "bg-[#0F2E22] text-[#A3E635] shadow-[0_8px_20px_rgba(15,46,34,0.20)] hover:bg-[#134E4A] hover:-translate-y-0.5 active:scale-[0.98]"
      }`}
    >
      {pending ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#A3E635] border-t-transparent" />
          Memproses...
        </>
      ) : penuh ? (
        "Kuota Penuh 😭"
      ) : (
        <>
          Daftar Sekarang
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#A3E635] text- text-[#0F2E22]">→</span>
        </>
      )}
    </button>
  );
}

export default function FormDaftar({ ekskul, penuh, namaAwal, kelasAwal, pesanSukses }: { ekskul: Ekskul; penuh: boolean; namaAwal: string; kelasAwal: string; pesanSukses?: string }) {
  const [state, action] = useActionState(daftarEkskul, { nilaiNama: namaAwal, nilaiKelas: kelasAwal });

  return (
    <form action={action} className="overflow-hidden rounded- bg-[#D9F7E8] border-2 border-teal-100 shadow-sm">
      {/* HEADER FORM - GRADIENT */}
      <div className="relative bg-gradient-to-r from-[#14B8A6] via-[#2DD4BF] to-[#A3E635] px-6 py-5">
        <div className="absolute -right-4 -top-6 h-20 w-20 rounded-full bg-white/20" />
        <div className="relative">
          <span className="inline-flex rounded-full bg-[#0F2E22] px-3 py-1 text- font-black tracking-widest text-[#A3E635]">✨ DAFTAR EKSKUL</span>
          <h2 className="mt-2 text-lg font-black text-[#0F2E22] leading-tight">Daftar {ekskul.nama}</h2>
          <p className="mt-1 text-xs font-bold text-teal-900/70">{penuh ? "Kuota sudah penuh 😭" : "Isi data di bawah untuk mendaftar"}</p>
        </div>
      </div>

      <div className="p-6">
        {pesanSukses && (
          <p className="flex items-center gap-2 rounded-2xl bg-[#DCFCE7] border-2 border-emerald-200 px-4 py-3 text-xs font-black text-emerald-800">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500 text- text-white">✓</span>
            {pesanSukses}
          </p>
        )}

        <input type="hidden" name="ekskulId" value={ekskul.id} />

        {/* NAMA - GALAT DI BAWAH KOLOMNYA */}
        <label className="mt-4 block">
          <span className="text- font-black tracking-wider text-teal-700">👤 NAMA LENGKAP</span>
          <input name="nama" defaultValue={state.nilaiNama} required placeholder="Nama lengkap" className={`mt-1.5 w-full rounded-full bg-[#EAFBF2] border-2 px-4 py-3 text-sm font-bold text-[#0F2E22] placeholder:text-teal-800/40 placeholder:font-medium outline-none focus:ring-2 focus:ring-teal-200 transition ${state.galatNama ? "border-red-300 focus:border-red-300" : "border-teal-100 focus:border-[#14B8A6]"}`} />
          {state.galatNama && <p className="mt-1.5 rounded-lg bg-[#FFE4E6] border border-red-200 px-3 py-2 text-xs font-bold text-red-700">⚠️ {state.galatNama}</p>}
        </label>

        {/* KELAS - GALAT DI BAWAH KOLOMNYA */}
        <label className="mt-3 block">
          <span className="text- font-black tracking-wider text-teal-700">🎓 KELAS</span>
          <input name="kelas" defaultValue={state.nilaiKelas} required placeholder="Contoh: XII RPL 1" className={`mt-1.5 w-full rounded-full bg-[#EAFBF2] border-2 px-4 py-3 text-sm font-bold text-[#0F2E22] placeholder:text-teal-800/40 placeholder:font-medium outline-none focus:ring-2 focus:ring-teal-200 transition ${state.galatKelas ? "border-red-300 focus:border-red-300" : "border-teal-100 focus:border-[#14B8A6]"}`} />
          {state.galatKelas && <p className="mt-1.5 rounded-lg bg-[#FFE4E6] border border-red-200 px-3 py-2 text-xs font-bold text-red-700">⚠️ {state.galatKelas}</p>}
        </label>

        {/* GALAT LAINNYA - SATU PESAN DI ATAS TOMBOL */}
        {state.galatUmum && (
          <p className="mt-4 rounded-2xl bg-[#FFE4E6] border-2 border-red-200 px-4 py-3 text-xs font-black text-red-700">⚠️ {state.galatUmum}</p>
        )}

        <TombolDaftar penuh={penuh} />

        {namaAwal && <p className="mt-3 text-center text-xs font-bold text-teal-800/70">👋 Halo lagi, {namaAwal}</p>}
        <p className="mt-2 text-center text- font-bold text-teal-800/50">🔒 Datamu aman & langsung tercatat</p>
      </div>
    </form>
  );
}