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
      className={`rounded-full px-4 py-2 text-xs font-black transition ${pending ? "bg-[#FFE4E6] border border-red-200 text-red-700/50 cursor-not-allowed" : "bg-[#FFE4E6] border border-red-200 text-red-700 hover:bg-[#FECDD3]"}`}
    >
      {pending ? "Membatalkan..." : "Batalkan"}
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