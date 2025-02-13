// utils/fetchBooks.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchBooks(query: string, type: string = "search") {
  try {
    let endpoint = "";
    // Choix de l'endpoint en fonction du type
    switch (type) {
      case "list":
        endpoint = "/api/books/"; // Liste paginée
        break;
      case "advanced-search":
        endpoint = "/api/books/advanced-search/";
        break;
      case "highlight-search":
        endpoint = "/api/books/highlight-search/";
        break;
      case "search":
      default:
        endpoint = "/api/books/search/";
        break;
    }

    const url = `${API_BASE_URL}${endpoint}?q=${encodeURIComponent(query)}`;
    console.log("Fetching URL:", url);

    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) {
      console.error("Fetch error, status:", response.status, response.statusText);
      throw new Error("Erreur lors de la récupération des livres");
    }
    const data = await response.json();
    console.log("Données récupérées :", data);

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
