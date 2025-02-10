"use client";

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export interface Product {
  title: string;
  link: string;
  thumbnail: string;
  description?: string;
  subjects?: string[] | string;
  bookshelves?: string[] | string;
  downloadCount?: number;
}

interface HeroParallaxProps {
  products: Product[];
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({ products }) => {
  // Découpage des produits en 3 lignes (assure-toi d'avoir au moins 15 produits)
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header: React.FC = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold text-white">
        Trouvez nos <br /> meilleurs livres
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-white">
        Vous pouvez trouver nos meilleurs livres répertoriés ici. Il y en a pour tout le monde, faites votre choix.
      </p>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  translate: MotionValue<number>;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, translate }) => {
  // Fonction pour tronquer le texte
  const truncate = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) + "... Voir plus" : text;

  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product h-[36rem] w-[30rem] relative flex-shrink-0 overflow-hidden rounded-lg shadow-xl"
    >
      <Link href={product.link} className="block">
        <Image
          src={product.thumbnail}
          height={600}
          width={600}
          className="object-cover h-full w-full"
          alt={product.title}
        />
      </Link>
      {/* Overlay avec détails */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 transition-opacity duration-300 group-hover/product:opacity-100">
        <h2 className="text-white text-xl font-bold">{product.title}</h2>
        <p className="text-white text-sm mt-2">
          {truncate(product.description || "", 200)}
        </p>
        <div className="mt-2">
          {product.subjects && (
            <p className="text-white text-xs">
              <strong>Sujets:</strong>{" "}
              {Array.isArray(product.subjects)
                ? product.subjects.join(", ")
                : product.subjects || "N/A"}
            </p>
          )}
          {product.bookshelves && (
            <p className="text-white text-xs">
              <strong>Rayons:</strong>{" "}
              {Array.isArray(product.bookshelves)
                ? product.bookshelves.join(", ")
                : product.bookshelves || "N/A"}
            </p>
          )}
          {product.downloadCount !== undefined && (
            <p className="text-white text-xs">
              <strong>Téléchargements:</strong> {product.downloadCount}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
