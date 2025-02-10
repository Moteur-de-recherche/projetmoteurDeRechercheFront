import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; // Import de la Navbar
import Footer from "./components/Footer"; // Import du Footer

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moteur de Recherche de livre",
  description: "Recherchez facilement des livres dans notre bibliothèque numérique",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Navbar toujours présente */}
        <Navbar />
        {/* Suppression de la classe "container" pour permettre un layout en pleine largeur */}
        <main className="w-full min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
