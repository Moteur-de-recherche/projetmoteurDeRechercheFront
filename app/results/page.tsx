"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchBooks } from "../utils/fetchBooks";
import { HeroParallax, Product } from "../components/ui/heroParalax";
import SearchBarEnhanced from "../components/SearchBarEnhanced";
import { HighlightedText } from "../components/HighlightedText";
import Image from "next/image";

// Interface Book avec le champ "author"
interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  subjects: string[];
  bookshelves: string[];
  cover_image: string;
  download_count: number;
  copyright: boolean;
  text_content: string;
}

// Mapping vers Product (pour HeroParallax)
const mapBookToProduct = (book: Book): Product => ({
  title: book.title,
  link: `/book/${book.id}`,
  thumbnail: book.cover_image,
  description: book.description,
  subjects: book.subjects,
  bookshelves: book.bookshelves,
  downloadCount: book.download_count,
});

/**
 * Composant qui affiche un texte avec surlignage (via HighlightedText) et
 * permet de le tronquer à maxLength caractères avec un bouton "Voir plus"/"Voir moins".
 */
const ExpandableHighlightedText: React.FC<{
  text: string;
  highlight: string;
  maxLength?: number;
}> = ({ text, highlight, maxLength = 200 }) => {
  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = text.length > maxLength;
  const displayedText =
    !expanded && shouldTruncate ? text.slice(0, maxLength) + "..." : text;
  return (
    <div>
      <HighlightedText text={displayedText} highlight={highlight} />
      {shouldTruncate && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-2 text-[#441064] hover:underline text-sm"
        >
          {expanded ? "Voir moins" : "Voir plus"}
        </button>
      )}
    </div>
  );
};

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";
  const type = searchParams.get("type") || "search";
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadBooks() {
      setLoading(true);
      if (query.trim()) {
        // Recherche classique lorsque l'utilisateur saisit un mot-clé
        const results = await fetchBooks(query, type);
        console.log("Livres chargés (recherche) :", results);
        setBooks(results);
      } else {
        // Aucun mot-clé saisi : on récupère la liste complète (endpoint "list"),
        // trie par nombre de téléchargements décroissant et on ne garde que les 5 premiers
        const results = await fetchBooks("", "list");
        console.log("Livres chargés (liste) :", results);
        const sorted = results.sort(
          (a: Book, b: Book) => b.download_count - a.download_count
        );
        setBooks(sorted.slice(0, 5));
      }
      setLoading(false);
    }
    loadBooks();
  }, [query, type]);

  // Transformation pour le composant HeroParallax (utilisé uniquement en cas de recherche active)
  const products: Product[] = books.map(mapBookToProduct);

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <SearchBarEnhanced />
        {query.trim() ? (
          <>
            <h1 className="text-3xl text-black font-bold mb-4">
              Résultats pour : {query}
            </h1>
            {loading && <p>Chargement des résultats...</p>}
            {!loading && books.length === 0 && <p>Aucun livre trouvé.</p>}
            {/* Section avec la description du premier livre et surlignage */}
            {!loading && books.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Aperçu du livre :
                </h2>
                <ExpandableHighlightedText
                  text={books[0].description}
                  highlight={query}
                />
              </div>
            )}
            {/* Affichage via HeroParallax pour la recherche */}
            {books.length > 0 && <HeroParallax products={products} />}
          </>
        ) : (
          <>
            <h1 className="text-3xl text-black font-bold mb-4">
              Les livres les plus téléchargés
            </h1>
            {loading && <p>Chargement des résultats...</p>}
            {!loading && books.length === 0 && <p>Aucun livre trouvé.</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="border p-4 rounded shadow hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full h-64">
                    <Image
                      src={book.cover_image}
                      alt={book.title}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <h2 className="text-xl font-bold mt-2">{book.title}</h2>
                  <p className="text-gray-700">Auteur : {book.author}</p>
                  <p className="text-gray-700">
                    Rayon :{" "}
                    {Array.isArray(book.bookshelves)
                      ? book.bookshelves.join(", ")
                      : book.bookshelves}
                  </p>
                  <p className="text-gray-700">
                    Téléchargements : {book.download_count}
                  </p>
                  <div className="mt-2 text-gray-700">
                    <ExpandableHighlightedText
                      text={book.description}
                      highlight={query} // Ici, query est vide donc pas de surlignage
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
