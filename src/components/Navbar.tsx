import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b">
      <nav className="mx-auto max-w-5xl flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-black tracking-tight">
          Orden imaginario
        </Link>
        <ul className="flex gap-6 text-sm font-medium">
          <li><Link href="/">Inicio</Link></li>
          <li><Link href="/articles/page/1">Artículos</Link></li>
        </ul>
      </nav>
    </header>
  );
}