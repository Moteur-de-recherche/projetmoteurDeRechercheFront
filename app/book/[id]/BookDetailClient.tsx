// app/book/[id]/BookDetailClient.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

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

interface BookDetailClientProps {
  book: Book;
}

export default function BookDetailClient({ book }: BookDetailClientProps) {
  const searchParams = useSearchParams();
  // Récupère le mot-clé de recherche depuis le paramètre "q", s'il est présent
  const searchQuery = searchParams.get("q") || "";
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  // Fonction pour surligner le mot-clé dans le texte
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, `<mark class="bg-yellow-200">${"$1"}</mark>`);
  };

  const maxLength = 200;
  const shouldTruncate = book.description.length > maxLength;
  const truncatedText =
    shouldTruncate && !expanded
      ? book.description.slice(0, maxLength) + "..."
      : book.description;
  const highlightedDescription = highlightText(truncatedText, searchQuery);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative md:w-1/3">
          {book.cover_image && (
            <Image
              src={book.cover_image}
              alt={`Couverture de ${book.title}`}
              width={600}
              height={800}
              className="object-cover rounded-lg"
            />
          )}
        </div>
        <div className="md:w-2/3">
          <div className="border-2 border-blue-500 rounded-lg p-4 shadow-lg bg-white">
            <p
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: highlightedDescription }}
            />
            {shouldTruncate && (
              <button
                onClick={toggleExpanded}
                className="text-blue-500 hover:underline"
              >
                {expanded ? "Voir moins" : "Voir plus"}
              </button>
            )}
          </div>
          <div className="mt-4">
            {book.subjects && (
              <p className="mb-2">
                <strong>Sujets :</strong>{" "}
                {Array.isArray(book.subjects)
                  ? book.subjects.join(", ")
                  : book.subjects}
              </p>
            )}
            {book.bookshelves && (
              <p className="mb-2">
                <strong>Rayons :</strong>{" "}
                {Array.isArray(book.bookshelves)
                  ? book.bookshelves.join(", ")
                  : book.bookshelves}
              </p>
            )}
            {book.download_count !== undefined && (
              <p className="mb-2">
                <strong>Téléchargements :</strong> {book.download_count}
              </p>
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold">Contenu du livre</h2>
            <p>{book.text_content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
