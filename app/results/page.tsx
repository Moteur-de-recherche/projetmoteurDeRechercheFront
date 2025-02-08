// pages/results.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { fetchBooks } from "../utils/fetchBooks";
import { formatText } from "../utils/formatText";

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
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Résultats pour : `{query}`</h1>
      {loading && <p>Chargement des résultats...</p>}
      {!loading && books.length === 0 && <p>Aucun livre trouvé.</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
  {books.map((book) => (
    <li
      key={book.id}
      style={{
        marginBottom: "2rem",
        borderBottom: "1px solid #ccc",
        paddingBottom: "1rem",
      }}
    >
      <h2>{book.title}</h2>
      {book.cover_image && (
        <div style={{ marginBottom: "1rem" }}>
          <Image
            src={book.cover_image}
            alt={`Couverture de ${book.title}`}
            width={300}
            height={400}
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <p
        dangerouslySetInnerHTML={{
          __html: formatText(book.description, query),
        }}
      />
      <p>
        <strong>Sujets :</strong>{" "}
        {Array.isArray(book.subjects)
          ? book.subjects.join(", ")
          : book.subjects || "N/A"}
      </p>
      <p>
        <strong>Rayons :</strong>{" "}
        {Array.isArray(book.bookshelves)
          ? book.bookshelves.join(", ")
          : book.bookshelves || "N/A"}
      </p>
      <p>
        <strong>Téléchargements :</strong> {book.download_count}
      </p>
      <p>
        <strong>Droits d auteur :</strong>{" "}
        {book.copyright ? "Protégé" : "Libre"}
      </p>
      <div>
        <h3>Contenu du livre :</h3>
        <p>{book.text_content}</p>
      </div>
    </li>
  ))}
</ul>
    </div>
  );
}
