"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchBooks } from "../utils/fetchBooks";
import { HeroParallax, Product } from "../components/ui/heroParalax";

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

// Livres par défaut en l'absence de recherche

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl text-black font-bold mb-4">
          Résultats pour : `{query}`
        </h1>
        {loading && <p>Chargement des résultats...</p>}
        {!loading && books.length === 0 && <p>Aucun livre trouvé.</p>}
      </div>
      {books.length > 0 && <HeroParallax products={products} />}
    </div>
  );
}
