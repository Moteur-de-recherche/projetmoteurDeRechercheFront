"use client";

import Link from "next/link";
import { FaLinkedin, FaTwitter, FaGithub, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Section navigation */}
        <nav className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>
          <Link href="/results" className="hover:underline">
            Résultats
          </Link>
          <Link href="/about" className="hover:underline">
            À propos
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>

        {/* Section réseaux sociaux */}
        <div className="flex gap-6">
          <a href="#" aria-label="LinkedIn" className="text-3xl hover:text-gray-400">
            <FaLinkedin />
          </a>
          <a href="#" aria-label="Twitter" className="text-3xl hover:text-gray-400">
            <FaTwitter />
          </a>
          <a href="#" aria-label="GitHub" className="text-3xl hover:text-gray-400">
            <FaGithub />
          </a>
          <a href="#" aria-label="YouTube" className="text-3xl hover:text-gray-400">
            <FaYoutube />
          </a>
        </div>
      </div>

      {/* Ligne de copyright */}
      <div className="mt-4 text-center text-sm text-gray-400">
        &copy; 2025 Moteur de Recherche - Tous droits réservés
      </div>
    </footer>
  );
}
