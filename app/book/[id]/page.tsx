// app/book/[id]/page.tsx
import { notFound } from "next/navigation";
import React from "react";
import BookDetailClient from "./BookDetailClient";

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
  // Ici, params est une promesse, donc on doit l'attendre
  params: Promise<{ id: string }>;
}

export default async function BookDetailPage({ params }: PageProps) {
  // Attendre que params soit résolu avant de l'utiliser
  const { id } = await params;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  
  const res = await fetch(`${API_BASE_URL}/api/books/${id}/`);
  if (!res.ok) {
    notFound();
  }
  
  const book: Book = await res.json();
  
  return <BookDetailClient book={book} />;
}
