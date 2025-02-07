"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchBooks } from "../utils/fetchBooks";
import BookCard from "../components/BookCard";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";
  const [books, setBooks] = useState<{ id: number; title: string; content: string; }[]>([]);

  useEffect(() => {
    if (query) {
      fetchBooks(query).then(setBooks);
    }
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Résultats pour `{query}`</h1>
      {books.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <p>Aucun résultat trouvé.</p>
      )}
    </div>
  );
}
