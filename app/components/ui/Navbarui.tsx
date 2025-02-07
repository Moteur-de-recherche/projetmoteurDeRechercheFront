"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link, { LinkProps } from "next/link";
import Image from "next/image";

// Configuration de la transition pour les animations
const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

/* ---------- Composants réutilisables ---------- */

export const MenuItem: React.FC<{
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}> = ({ setActive, active, item, children }) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu: React.FC<{
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}> = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // réinitialise l'état
      className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

export const ProductItem: React.FC<{
  title: string;
  description: string;
  href: string;
  src: string;
}> = ({ title, description, href, src }) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink: React.FC<LinkProps & { children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black"
    >
      {children}
    </Link>
  );
};

/* ---------- Composant Navbar complet ---------- */

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  return (
    <nav className=" text-white p-4 shadow-lg relative">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo et titre */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-infinity-moteur.png"
            alt="Logo"
            width={50}
            height={50}
          />
          <span className="text-xl font-bold">Moteur de Recherche</span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-6 text-lg">
          <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item="Accueil">
              <HoveredLink href="/">Accueil</HoveredLink>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Résultats">
              <HoveredLink href="/results">Résultats</HoveredLink>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="À propos">
              <HoveredLink href="/about">À propos</HoveredLink>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Contact">
              <HoveredLink href="/contact">Contact</HoveredLink>
            </MenuItem>
          </Menu>
        </div>

        {/* Bouton de menu pour Mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <ul className="absolute top-16 right-4 bg-blue-700 text-white p-4 rounded-lg shadow-md md:hidden">
          <li className="py-2">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Accueil
            </Link>
          </li>
          <li className="py-2">
            <Link href="/results" onClick={() => setMenuOpen(false)}>
              Résultats
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
};

export default Navbar;
