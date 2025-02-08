// utils/fetchBooks.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchBooks(query: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/book/books?search=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
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
