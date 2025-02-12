// utils/fetchBooks.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchBooks(query: string) {
  try {
    // Utilise l'endpoint highlight-search et le paramètre "q"
    const url = `${API_BASE_URL}/api/books/highlight-search/?q=${encodeURIComponent(query)}`;
    console.log("Fetching URL:", url);

    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) {
      console.error("Fetch error, status:", response.status, response.statusText);
      throw new Error("Erreur lors de la récupération des livres");
    }
    const data = await response.json();
    console.log("Données récupérées :", data);

    // On s'attend à ce que la réponse contienne un champ 'results' avec la liste des livres
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
