'use client'

// app/about/page.tsx
import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">À propos de nous</h1>

        {/* Section de l'équipe */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Notre Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Carte 1 */}
            <div className="bg-white rounded-lg shadow p-6 multicolor-border">
              <div className="flex justify-center">
                <div className="relative w-40 h-40">
                  <Image
                    src="/images/photo_lionel.jpg"
                    alt="Membre de l'équipe 1"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
              <p className="mt-4 text-center font-bold">Lionel Moussavou</p>
              <p className="text-center text-gray-700">
                Ingénieur Full Stack – Passionné par l&apos;innovation et l&apos;optimisation, il met en place l&apos;architecture de notre moteur de recherche.
              </p>
            </div>

            {/* Carte 2 */}
            <div className="bg-white rounded-lg shadow p-6 multicolor-border">
              <div className="flex justify-center">
                <div className="relative w-40 h-40">
                  <Image
                    src="/images/team2.jpg"
                    alt="Membre de l'équipe 2"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
              <p className="mt-4 text-center font-bold">Axel Aragon</p>
              <p className="text-center text-gray-700">
                Ingénieur Logiciel – Expert en technologies backend et base de données, il assure la performance et la fiabilité de notre service.
              </p>
            </div>
          </div>
        </section>

        {/* Section de présentation de l'entreprise */}
        <section className="bg-white rounded-lg shadow p-8 multicolor-border">
          <h2 className="text-2xl font-semibold mb-4">Notre Entreprise</h2>
          <p className="text-gray-700 leading-relaxed">
            Nous sommes un moteur de recherche innovant dédié à faciliter l&apos;accès aux livres numériques. Notre équipe passionnée met en œuvre des technologies de pointe pour offrir une expérience de recherche optimale, intuitive et personnalisée. Grâce à notre engagement envers l&apos;excellence, nous aidons les lecteurs à découvrir de nouvelles œuvres et à explorer un univers de connaissances infinies.
          </p>
        </section>
      </div>
      <style jsx>{`
        .multicolor-border {
          border: 2px solid;
          border-image: linear-gradient(
              45deg,
              #5f22a3,
              #5f22a3,
              #ffff00,
              #00ff00,
              #0000ff,
              #5f22a3,
              #5f22a3,
              #ff0000
            )
            1;
        }
      `}</style>
    </div>
  );
}
