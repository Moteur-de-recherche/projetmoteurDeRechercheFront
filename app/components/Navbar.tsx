"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#441064] text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo-infinity-moteur.png" alt="Logo" width={50} height={50} />
          <span className="text-xl font-bold">Moteur de Recherche</span>
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden md:flex gap-6 text-lg">
          <li className={pathname === "/" ? "underline" : ""}>
            <Link href="/">Accueil</Link>
          </li>
          <li className={pathname === "/results" ? "underline" : ""}>
            <Link href="/results">Résultats</Link>
          </li>
          <li className={pathname === "/about" ? "underline" : ""}>
            <Link href="/about">À propos</Link>
          </li>
          <li className={pathname === "/contact" ? "underline" : ""}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        {/* Menu Mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {menuOpen && (
          <ul className="absolute top-16 right-4 bg-[#5f22a3] text-white p-4 rounded-lg shadow-md md:hidden">
            <li className="py-2">
              <Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
            </li>
            <li className="py-2">
              <Link href="/results" onClick={() => setMenuOpen(false)}>Résultats</Link>
            </li>
            <li className="py-2">
              <Link href="/about" onClick={() => setMenuOpen(false)}>À propos</Link>
            </li>
            <li className="py-2">
              <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
