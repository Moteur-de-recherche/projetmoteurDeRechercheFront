// utils/formatText.ts

/**
 * Formate un texte en entourant le terme de recherche avec une balise <mark>.
 * Si le texte est indéfini, retourne une chaîne vide.
 *
 * @param text Le texte à formater (peut être undefined).
 * @param searchTerm Le terme de recherche à surligner.
 * @returns Le texte avec les occurrences du terme entourées de <mark>.
 */
export function formatText(text: string | undefined, searchTerm: string): string {
    // Si le texte est indéfini ou null, retourner une chaîne vide
    if (!text) {
      return "";
    }
    // Si aucun terme de recherche n'est fourni, retourner le texte tel quel
    if (!searchTerm) {
      return text;
    }
    // Créer une expression régulière en insensible à la casse pour le terme recherché
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  }
  