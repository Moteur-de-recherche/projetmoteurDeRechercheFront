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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Ajout de la Navbar */}
        <Navbar />
        
        {/* Contenu dynamique des pages */}
        <main className="container mx-auto p-4">{children}</main>
        
        {/* Ajout du Footer */}
        <Footer />
      </body>
    </html>
  );
}
