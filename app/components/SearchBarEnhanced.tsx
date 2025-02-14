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
    // On conserve une disposition en ligne (flex-row) pour que le champ et le bouton restent côte à côte.
    <div className="relative flex items-center gap-2">
      {/* Champ de recherche avec icône intégrée */}
      <form onSubmit={handleSearch} className="relative flex-1">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un livre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border pl-10 pr-4 py-2 h-10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b33c2]"
        />
      </form>

      {/* Bouton de sélection de mode de recherche */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-1 border h-10 px-4 rounded-md bg-gray-100 hover:bg-[#c28ee2] whitespace-nowrap"
        >
          <span className="text-sm">
            {SEARCH_MODES.find((m) => m.value === selectedMode)?.label}
          </span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md z-10 p-2 shadow-lg">
            {SEARCH_MODES.map((mode) => (
              <label
                key={mode.value}
                className="flex items-center gap-2 cursor-pointer py-1 hover:bg-[#c28ee2] px-2 rounded"
              >
                <input
                  type="radio"
                  name="searchMode"
                  value={mode.value}
                  checked={selectedMode === mode.value}
                  onChange={() => handleModeChange(mode.value)}
                  className="form-radio"
                />
                <span className="text-sm">{mode.label}</span>
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
