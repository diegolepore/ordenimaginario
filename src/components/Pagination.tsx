import Link from "next/link";

export default function Pagination({ current, total }:{current:number;total:number}) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <nav className="mt-10 flex justify-center">
      <ul className="inline-flex gap-1">
        {pages.map(n => (
          <li key={n}>
            <Link
              href={`/articles/page/${n}`}
              className={`px-3 py-1 rounded-md border
              ${n === current ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
            >
              {n}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}