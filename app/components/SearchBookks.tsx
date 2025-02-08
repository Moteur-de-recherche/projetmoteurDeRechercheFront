// pages/index.tsx
import { useState } from "react";
import { fetchBooks } from "../utils/fetchBooks";
import { formatText } from "../utils/formatText";

interface Book {
  id: number;
  title: string;
  // Selon votre modèle, adaptez le nom du champ contenant le résumé ou extrait
  summary: string;
}

export default function BookSearch() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const results = await fetchBooks(query);
    setBooks(results);
    setLoading(false);
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Recherche de livres</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Entrez un mot-clé..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "0.5rem", width: "70%" }}
        />
        <button type="submit" style={{ padding: "0.5rem", marginLeft: "1rem" }}>
          Rechercher
        </button>
      </form>
      {loading && <p>Chargement des résultats...</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {books.map((book) => (
          <li key={book.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
            <h2>{book.title}</h2>
            {/* On utilise dangerouslySetInnerHTML pour afficher le texte avec la mise en forme HTML (balise <mark>) */}
            <p dangerouslySetInnerHTML={{ __html: formatText(book.summary, query) }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
