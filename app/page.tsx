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

// Mise à jour de la fonction de mapping pour inclure tous les champs nécessaires
const mapBookToProduct = (book: Book): Product => ({
  title: book.title,
  link: `/book/${book.id}`,
  thumbnail: book.cover_image,
  description: book.description,
  subjects: book.subjects,
  bookshelves: book.bookshelves,
  downloadCount: book.download_count,
});


export default function SearchResults() {
  // Récupération du paramètre "search" dans l'URL
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";
  const [books, setBooks] = useState<Book[]>([]);
  const [, setLoading] = useState(false);

  useEffect(() => {
    async function loadBooks() {
      if (query.trim()) {
        setLoading(true);
        const results = await fetchBooks(query);
        console.log("Livres chargés :", results);
        setBooks(results);
        setLoading(false);
      }
    }
    loadBooks();
  }, [query]);

  // Transformation des livres récupérés en objets Product pour HeroParallax
  const products: Product[] = books.map(mapBookToProduct);

  return (
    <div className="relative min-h-screen">
      {/* Section supérieure avec background et barre de recherche */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Conteneur des animations de fond (BackgroundGradientAnimation et VortexBackground) */}
        <div className="absolute inset-0 -z-10 w-full h-full">
          <BackgroundGradientAnimation />
          <VortexBackground />
        </div>
        {/* Contenu principal (titre et SearchBar) */}
        <div className="relative z-50 flex flex-col items-center justify-center h-full px-4">
          <h1 className="text-5xl font-bold text-white mb-4">
            Trouvez votre Livre en un Clic !
          </h1>
          <div className="w-full max-w-lg">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Section affichant les résultats via HeroParallax */}
      <section>
        {/* Si des produits existent, on les affiche avec HeroParallax */}
        {books.length > 0 && <HeroParallax products={products} />}
      </section>
    </div>
  );
}
