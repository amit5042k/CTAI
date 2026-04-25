import Link from "next/link";

export default function Brand({ school }) {
  if (school) {
    return (
      <Link href="/" className="flex items-center gap-2">
        {school.hasLogo || school.logoExt ? (
          <img
            src={`/api/schools/${school.id}/logo`}
            alt={`${school.name} logo`}
            className="h-9 w-9 rounded-lg object-contain bg-white ring-1 ring-slate-200"
          />
        ) : (
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white font-bold">
            {school.name?.[0]?.toUpperCase() || "S"}
          </span>
        )}
        <span className="font-semibold text-slate-800">{school.name}</span>
      </Link>
    );
  }
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white font-bold">
        C
      </span>
      <span className="font-semibold text-slate-800">CTAI Portal</span>
    </Link>
  );
}
