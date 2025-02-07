const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; // URL du backend

export async function fetchBooks(query: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books?search=${query}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des livres");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur API:", error);
    return [];
  }
}
