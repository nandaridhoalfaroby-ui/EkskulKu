"use client";

import { useFormStatus } from "react-dom";
import { batalkanEkskul } from "@/app/actions";

function Tombol() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!confirm("Yakin mau batalkan ekskul ini?")) e.preventDefault();
      }}
      className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-xs font-black transition-all duration-200 ${
        pending
          ? "bg-[#FFE4E6] border-red-200 text-red-400 cursor-not-allowed"
          : "bg-gradient-to-r from-rose-500 to-red-500 border-rose-400 text-white shadow-[0_6px_16px_rgba(244,63,94,0.35)] hover:from-rose-600 hover:to-red-600 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(244,63,94,0.45)] active:scale-95"
      }`}
    >
      {pending ? (
        <>
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-300 border-t-red-600" />
          Membatalkan...
        </>
      ) : (
        <>
          Batalkan
          <span className="grid h-5 w-5 place-items-center rounded-full bg-white/25 text- font-black">✕</span>
        </>
      )}
    </button>
  );
}

export default function TombolBatalkan({ pendaftarId }: { pendaftarId: number }) {
  return (
    <form action={batalkanEkskul}>
      <input type="hidden" name="pendaftarId" value={pendaftarId} />
      <Tombol />
    </form>
  );
}