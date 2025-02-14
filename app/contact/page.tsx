"use client";

import React from "react";
import { Input } from "../components/ui/input";
import { Label } from "@radix-ui/react-label";
import HomepageBackground from '../components/HomePageBackground';

export default function ContactPage() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Le background occupe toute la surface */}
      <HomepageBackground/>
      
      <div className="container mx-auto p-6 relative z-10">
        <h1 className="text-3xl font-bold">Nous Contacter</h1>
        <p className="mt-2 text-gray-600">
          Envoyez-nous vos questions et suggestions.
        </p>

        <form className="mt-6 space-y-4">
          {/* Champ Nom */}
          <div>
            <Label htmlFor="name" className="block mb-1">
              Nom
            </Label>
            <Input id="name" type="text" placeholder="Votre nom" />
          </div>

          {/* Champ Email */}
          <div>
            <Label htmlFor="email" className="block mb-1">
              Email
            </Label>
            <Input id="email" type="email" placeholder="Votre email" />
          </div>

          {/* Champ Message */}
          <div>
            <Label htmlFor="message" className="block mb-1">
              Message
            </Label>
            <textarea
              id="message"
              placeholder="Votre message"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
