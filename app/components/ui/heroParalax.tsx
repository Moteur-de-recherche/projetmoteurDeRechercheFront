"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Interface Product
export interface Product {
  title: string;
  link: string;
  thumbnail: string;
  description?: string;
  highlighted_text?: string;
  subjects?: string[] | string;
  bookshelves?: string[] | string;
  downloadCount?: number;
}

interface HeroParallaxProps {
  products: Product[];
}

// Composant affichant simplement les cartes sous forme de grille verticale
export const HeroParallax: React.FC<HeroParallaxProps> = ({ products }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Fonction pour tronquer le texte à 300 caractères
  const truncate = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) + "... Voir plus" : text;

  // Utiliser le texte surligné si disponible, sinon la description standard
  const displayText = product.highlighted_text || product.description || "";

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <Link href={product.link}>
        <div className="relative h-64 w-full">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{product.title}</h2>
        <p
          className="text-gray-700 text-sm"
          dangerouslySetInnerHTML={{ __html: truncate(displayText, 300) }}
        />
        <div className="mt-2 text-xs">
          {product.subjects && (
            <p>
              <strong>Sujets:</strong>{" "}
              {Array.isArray(product.subjects)
                ? product.subjects.join(", ")
                : product.subjects || "N/A"}
            </p>
          )}
          {product.bookshelves && (
            <p>
              <strong>Rayons:</strong>{" "}
              {Array.isArray(product.bookshelves)
                ? product.bookshelves.join(", ")
                : product.bookshelves || "N/A"}
            </p>
          )}
          {product.downloadCount !== undefined && (
            <p>
              <strong>Téléchargements:</strong> {product.downloadCount}
            </p>
          )}
        </div>
        <div className="mt-4">
          <Link href={product.link} className="text-[#5f22a3] hover:underline">
            Voir plus
          </Link>
        </div>
      </div>
    </div>
  );
};
