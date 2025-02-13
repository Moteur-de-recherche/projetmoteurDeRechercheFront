// app/components/SearchBarEnhanced.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

interface SearchMode {
  label: string;
  value: string;
}

const SEARCH_MODES: SearchMode[] = [
  { label: "Liste des livres", value: "list" },
  { label: "Recherche standard", value: "search" },
  { label: "Recherche avancée", value: "advanced-search" },
  { label: "Recherche avec surlignage", value: "highlight-search" },
];

export default function SearchBarEnhanced() {
  const [query, setQuery] = useState("");
  const [selectedMode, setSelectedMode] = useState<string>("search"); // sélection par défaut
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(
        `/results?search=${encodeURIComponent(query)}&type=${selectedMode}`
      );
    }
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleModeChange = (value: string) => {
    setSelectedMode(value);
  };

  return (
    <div className="relative flex items-center gap-2">
      <form onSubmit={handleSearch} className="flex-1">
        <input
          type="text"
          placeholder="Rechercher un livre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#441064]"
        />
      </form>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-1 border p-2 rounded-md bg-gray-100 hover:bg-gray-200"
        >
          <FiSearch className="w-5 h-5" />
          <span className="hidden sm:inline">
            {SEARCH_MODES.find((m) => m.value === selectedMode)?.label}
          </span>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-10 p-2">
            {SEARCH_MODES.map((mode) => (
              <label
                key={mode.value}
                className="flex items-center gap-2 cursor-pointer py-1"
              >
                <input
                  type="radio"
                  name="searchMode"
                  value={mode.value}
                  checked={selectedMode === mode.value}
                  onChange={() => handleModeChange(mode.value)}
                  className="form-radio"
                />
                <span>{mode.label}</span>
              </label>
            ))}
            <button
              onClick={toggleDropdown}
              className="mt-2 w-full text-[#441064] hover:underline text-sm"
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div> 
  );
}
