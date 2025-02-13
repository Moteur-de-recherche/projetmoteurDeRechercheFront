"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchBooks } from "../utils/fetchBooks";
import { HeroParallax, Product } from "../components/ui/heroParalax";
import SearchBarEnhanced from "../components/SearchBarEnhanced"; // Utilise le nouveau SearchBar

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
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";
  const type = searchParams.get("type") || "search";
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadBooks() {
      if (query.trim()) {
        setLoading(true);
        const results = await fetchBooks(query, type);
        console.log("Livres chargés :", results);
        setBooks(results);
        setLoading(false);
      }
    }
    loadBooks();
  }, [query, type]);

  const products: Product[] = books.map(mapBookToProduct);

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <SearchBarEnhanced />
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
