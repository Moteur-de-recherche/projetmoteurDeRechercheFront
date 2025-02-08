"use client";
import SearchBar from "../components/SearchBar";

export default function SearchPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-black font-bold mb-4">Recherche de Livres</h1>
      <SearchBar />
      <p className="mt-4 text-gray-600">Tapez un mot-clé pour rechercher un livre dans notre bibliothèque.</p>
    </div>
  );
}
