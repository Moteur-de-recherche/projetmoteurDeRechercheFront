"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi"; // Import de l'icône

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/results?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Rechercher un livre..."
        className="border p-2 rounded-full w-full focus:outline-none focus:ring-2 focus:[#471757]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-[#ebe8ed] text-black flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-200 hover:bg-[#471757] hover:text-white"
      >
        <FiSearch className="text-xl" />
        <span>Rechercher</span>
      </button>
    </div>
  );
}
