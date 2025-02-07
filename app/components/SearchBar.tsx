"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/results?search=${query}`);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Rechercher un livre..."
        className="border p-2 rounded-md w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded-md">
        Rechercher
      </button>
    </div>
  );
}
