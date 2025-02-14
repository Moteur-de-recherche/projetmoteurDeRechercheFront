"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // Sur mobile, la Navbar occupe toute la largeur.
    // Sur desktop, elle est centrée avec une largeur maximale et des bords arrondis.
    <nav className="bg-[#441064] text-white p-4 md:p-3 w-full md:mx-auto md:max-w-4xl md:rounded-full">
      <div className="flex items-center justify-between">
        {/* Logo et titre */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-14 h-14 md:w-16 md:h-16">
            <Image
              src="/images/logo-home-removebg-preview.png"
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <span className="text-lg md:text-xl font-bold">
            Moteur de Recherche
          </span>
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden md:flex gap-6 text-lg">
          <li className={pathname === "/" ? "underline" : ""}>
            <Link href="/">Accueil</Link>
          </li>
          <li className={pathname === "/results" ? "underline" : ""}>
            <Link href="/results">Catalogue</Link>
          </li>
          <li className={pathname === "/about" ? "underline" : ""}>
            <Link href="/about">À propos</Link>
          </li>
          <li className={pathname === "/contact" ? "underline" : ""}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        {/* Bouton Menu Mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <ul className="mt-4 md:hidden bg-[#5f22a3] text-white p-4 rounded-lg">
          <li className="py-2">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Accueil
            </Link>
          </li>
          <li className="py-2">
            <Link href="/results" onClick={() => setMenuOpen(false)}>
              Catalogue
            </Link>
          </li>
          <li className="py-2">
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              À propos
            </Link>
          </li>
          <li className="py-2">
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
