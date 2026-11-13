export default function MemuatKatalog() {
  return (
    <div>
      <div className="rounded- bg-[#D1FAE5]/60 border border-teal-100 p-6 md:p-8">
        <div className="h-8 w-48 animate-pulse rounded-full bg-[#F7FFFB] border border-teal-100" />
        <div className="mt-2 h-4 w-72 animate-pulse rounded-full bg-[#F7FFFB]" />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-44 animate-pulse rounded- bg-[#F7FFFB] border border-teal-100" />
        ))}
      </div>
    </div>
  );
}