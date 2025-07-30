'use client';

import { useEffect, useState } from "react";

const philosophyQuotes = [
  { quote: "La existencia precede a la esencia", author: "Jean-Paul Sartre" },
  { quote: "El infierno son los otros", author: "Jean-Paul Sartre" },
  { quote: "Estamos condenados a ser libres", author: "Jean-Paul Sartre" },
  { quote: "La vida no tiene sentido a priori", author: "Jean-Paul Sartre" },
  { quote: "Somos lo que hacemos con lo que hicieron de nosotros", author: "Jean-Paul Sartre" },
  { quote: "La angustia es el vértigo de la libertad", author: "Søren Kierkegaard" },
  { quote: "El hombre es una pasión inútil", author: "Jean-Paul Sartre" },
  { quote: "Crear es vivir dos veces", author: "Albert Camus" },
  { quote: "Solo hay un problema filosófico verdaderamente serio: el suicidio", author: "Albert Camus" },
  { quote: "La vida es aquello que te va sucediendo mientras tú te empeñas en hacer otros planes", author: "John Lennon" },
  { quote: "No hay nada más absurdo que la condición humana", author: "Albert Camus" },
  { quote: "La libertad es lo que haces con lo que te han hecho", author: "Jean-Paul Sartre" },
  { quote: "Vivir es lo más raro del mundo; la mayoría de la gente solo existe", author: "Oscar Wilde" },
  { quote: "El sentido de la vida es que se detenga", author: "Franz Kafka" },
  { quote: "Uno debe imaginar a Sísifo feliz", author: "Albert Camus" },
  { quote: "La vida oscila entre el dolor y el aburrimiento", author: "Arthur Schopenhauer" },
  { quote: "El hombre es el único animal que sabe que va a morir", author: "Martin Heidegger" },
  { quote: "Ser es ser percibido", author: "George Berkeley" },
  { quote: "La muerte no es el contrario de la vida, sino su ausencia", author: "Jorge Luis Borges" },
  { quote: "Todo lo que existe está aquí sin razón, se prolonga por debilidad y muere por casualidad", author: "Jean-Paul Sartre" }
];

function getRandomQuote() {
  return philosophyQuotes[Math.floor(Math.random() * philosophyQuotes.length)];
}

export default function PhilosophyQuote() {
  const [randomQuoteData, setRandomQuoteData] = useState<{quote: string, author: string} | null>(null);

  useEffect(() => {
    // Set the random quote only after hydration
    setRandomQuoteData(getRandomQuote());
  }, []);

  // Show a fallback during hydration to prevent mismatch
  if (!randomQuoteData) {
    return (
      <header className="text-center py-12">
        <h1 className="text-3xl font-bold italic text-gray-800 mb-4">
          &ldquo;Cargando...&rdquo;
        </h1>
        <p className="text-gray-600 mb-2">— — —</p>
        <p className="text-gray-500 text-sm">Orden Imaginario</p>
      </header>
    );
  }

  return (
    <header className="text-center py-12">
      <h1 className="text-3xl font-bold italic text-gray-800 mb-4">
        &ldquo;{randomQuoteData.quote}&rdquo;
      </h1>
      <p className="text-gray-600 mb-2">— {randomQuoteData.author} —</p>
      <p className="text-gray-500 text-sm">Orden Imaginario</p>
    </header>
  );
}
