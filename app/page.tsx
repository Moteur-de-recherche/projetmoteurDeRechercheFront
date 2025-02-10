"use client";

import React, { useEffect, useState } from "react";
import VortexBackground from "./components/VortexBackground";
import SearchBar from "./components/SearchBar";
import { HeroParallax, Product } from "./components/ui/heroParalax";
import { useSearchParams } from "next/navigation";
import { fetchBooks } from "./utils/fetchBooks";
import { BackgroundGradientAnimation } from "./components/ui/BackgroundAnimationUi";

// Définition de l'interface Book (correspondant à la structure renvoyée par l'API)
interface Book {
  id: number;
  title: string;
  description: string;
  subjects: string[];
  bookshelves: string[];
  cover_image: string;
  download_count: number;
  copyright: boolean;
  text_content: string;
}

// Fonction de mapping pour transformer un Book en Product
const mapBookToProduct = (book: Book): Product => ({
  title: book.title,
  link: `/book/${book.id}`,
  thumbnail: book.cover_image,
});

// Produits par défaut en l'absence de recherche
const defaultProducts: Product[] = [
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
  // Récupération du paramètre "search" dans l'URL
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    if (query.trim()) {
      const loadBooks = async () => {
        const books = await fetchBooks(query);
        const mappedProducts = books.map(mapBookToProduct);
        setProducts(mappedProducts);
      };
      loadBooks();
    } else {
      setProducts(defaultProducts);
    }
  }, [query]);

  return (
    <div>
      {/* Section supérieure : occupe toute la hauteur de l'écran */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Conteneur des animations de fond qui prend toute la taille de la section */}
        <div className="absolute inset-0 -z-10 w-full h-full">
          <BackgroundGradientAnimation />
          <VortexBackground />
        </div>
        {/* Conteneur du contenu principal (titre et barre de recherche) */}
        <div className="relative z-50 flex flex-col items-center justify-center h-full px-4">
          <h1 className="text-5xl font-bold text-white mb-4">
            Trouvez votre Livre en un Clic !
          </h1>
          <div className="w-full max-w-lg">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Section parallax affichant les produits */}
      <section>
        <HeroParallax products={products} />
      </section>
    </div>
  );
}
