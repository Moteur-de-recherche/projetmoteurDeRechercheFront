"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { fetchBooks } from "../utils/fetchBooks";
import { BackgroundGradientAnimation } from "../components/ui/BackgroundAnimationUi";

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

// Composant pour afficher une carte de livre stylisée avec bordure animée
const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  // Fonction pour tronquer la description à 200 caractères
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "... Voir plus";
  };

  return (
    <div className="relative group">
      {/* Bordure animée qui entoure la carte */}
      <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 animate-border"></div>

      {/* Contenu de la carte */}
      <div className="relative bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
        {/* Image de couverture */}
        <div className="relative h-48 w-full">
          {book.cover_image && (
            <Image
              src={book.cover_image}
              alt={`Couverture de ${book.title}`}
              fill
              className="object-cover"
            />
          )}
        </div>
        {/* Contenu textuel */}
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-xl font-bold mb-2">{book.title}</h2>
          <p className="text-gray-700 flex-grow">
            {truncateText(book.description, 200)}
          </p>
          {/* Boutons d'action */}
          <div className="mt-4 flex items-center justify-between">
            <a
              href={`/book/${book.id}`}
              className="text-[#441064] hover:underline"
            >
              Voir plus
            </a>
            <button className="bg-[#441064] text-white px-3 py-1 rounded hover:bg-[#441064] transition-colors duration-200">
              Ajouter à la bibliothèque
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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

  return (
    <div className="relative min-h-screen">
      {/* Background Gradient Animation en arrière-plan */}
      <BackgroundGradientAnimation />
      
      {/* Contenu principal par-dessus le background */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-3xl text-white font-bold mb-4">Résultats pour : `{query}`</h1>
        {loading && <p>Chargement des résultats...</p>}
        {!loading && books.length === 0 && <p>Aucun livre trouvé.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
