// app/book/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";

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

interface PageProps {
  // Dans le nouvel App Router, params peut être asynchrone.
  params: Promise<{ id: string }>;
}

// Cette page est un Server Component asynchrone
export default async function BookDetail({ params }: PageProps) {
  // Attendre la résolution de params avant d'accéder à ses propriétés
  const { id } = await params;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  
  const res = await fetch(`${API_BASE_URL}/api/books/${id}/`);
  
  if (!res.ok) {
    notFound();
  }
  
  const book: Book = await res.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
      {book.cover_image && (
        <div className="relative h-80 w-full mb-4">
          <Image
            src={book.cover_image}
            alt={`Couverture de ${book.title}`}
            fill
            className="object-cover"
          />
        </div>
      )}
      <p className="mb-4">{book.description}</p>
      {book.subjects && (
        <p className="mb-2">
          <strong>Sujets:</strong>{" "}
          {Array.isArray(book.subjects)
            ? book.subjects.join(", ")
            : book.subjects}
        </p>
      )}
      {book.bookshelves && (
        <p className="mb-2">
          <strong>Rayons:</strong>{" "}
          {Array.isArray(book.bookshelves)
            ? book.bookshelves.join(", ")
            : book.bookshelves}
        </p>
      )}
      {book.download_count !== undefined && (
        <p className="mb-2">
          <strong>Téléchargements:</strong> {book.download_count}
        </p>
      )}
      <div>
        <h2 className="text-2xl font-bold">Contenu du livre</h2>
        <p>{book.text_content}</p>
      </div>
    </div>
  );
}
