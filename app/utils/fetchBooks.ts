// utils/fetchBooks.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchBooks(query: string) {
  try {
    // Utilise le endpoint de recherche standard et le paramètre "q"
    const url = `${API_BASE_URL}/api/books/search/?q=${encodeURIComponent(query)}`;
    console.log("Fetching URL:", url);

    const response = await fetch(url, { mode: "cors" });

    if (!response.ok) {
      console.error("Fetch error, status:", response.status, response.statusText);
      throw new Error("Erreur lors de la récupération des livres");
    }

    const data = await response.json();
    console.log("Données récupérées :", data);

    // On extrait le tableau des résultats depuis data.results
    if (data.results && Array.isArray(data.results)) {
      return data.results;
    } else {
      console.error("La structure de la réponse n'est pas celle attendue.");
      return [];
    }
  } catch (error) {
    console.error("Erreur API:", error);
    return [];
  }
}
