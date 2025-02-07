"use client";

import React from "react";
import VortexBackground from "./components/VortexBackground";
import SearchBar from "./components/SearchBar";
import { HeroParallax } from "./components/ui/heroParalax";
import { Product } from "./components/ui/heroParalax";

// Exemple de données produits (au moins 15 objets pour la section parallax)
const products: Product[] = [
  { title: "Livre 1", link: "/produit1", thumbnail: "/images/background-hero.jpg" },
  { title: "Livre 2", link: "/produit2", thumbnail: "/images/background-hero.jpg" },
  { title: "Livre 3", link: "/produit3", thumbnail: "/images/background-hero.jpg" },
  { title: "Livre 4", link: "/produit4", thumbnail: "/images/background-hero.jpg" },
  { title: "Livre 5", link: "/produit5", thumbnail: "/images/background-hero.jpg" },
  { title: "Livre 6", link: "/produit6", thumbnail: "/images/background-hero.jpg" },
  { title: "Livre 7", link: "/produit7", thumbnail: "/images/background-hero.jpg" },
  { title: "Livre 8", link: "/produit8", thumbnail: "/images/background-hero.jpg" },
  { title: "Livre 9", link: "/produit9", thumbnail: "/images/background-hero.jpg" },
  { title: "Livre 10", link: "/produit10", thumbnail: "/images/background-hero.jpg" },
  { title: "Livre 11", link: "/produit11", thumbnail: "/images/background-hero.jpg" },
  { title: "Livre 12", link: "/produit12", thumbnail: "/images/background-hero.jpg" },
  { title: "Livre 13", link: "/produit13", thumbnail: "/images/background-hero.jpg" },
  { title: "Livre 14", link: "/produit14", thumbnail: "/images/background-hero.jpg" },
  { title: "Livre 15", link: "/produit15", thumbnail: "/images/background-hero.jpg" },
];

export default function Home() {
  return (
    <div>
      {/* Section supérieure avec fond Vortex et barre de recherche */}
      <section className="relative w-full h-[80vh] overflow-hidden">
        {/* Fond Vortex en arrière-plan */}
        <VortexBackground />
        {/* Contenu superposé : titre et barre de recherche */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          <h1 className="text-5xl font-bold text-white mb-4">
            Trouvez votre Livre en un Clic !
          </h1>
          <div className="w-full max-w-lg">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Section parallax avec les produits */}
      <section>
        <HeroParallax products={products} />
      </section>
    </div>
  );
}
