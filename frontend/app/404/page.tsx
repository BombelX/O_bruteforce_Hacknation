// app/not-found.tsx

import Link from 'next/link';
import { JSX } from 'react';

// Ten komponent nie musi być komponentem klienckim ("use client")
// jeśli nie używa interaktywności React (np. useState, useEffect)
function NotFound(): JSX.Element {
  return (
    // Używamy min-h-screen, aby mieć pewność, że centrowanie działa na całej wysokości
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 p-6">
      
      {/* NAGŁÓWEK BŁĘDU */}
      <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest">
        404
      </h1>
      
      {/* BANER */}
      <div className="bg-red-500 px-2 text-sm rounded rotate-12 absolute text-white">
        Strona nie została znaleziona!
      </div>
      
      {/* KOMUNIKAT GŁÓWNY */}
      <p className="mt-8 text-2xl font-semibold text-center sm:text-3xl">
        Przepraszamy, ale szukana strona nie istnieje.
      </p>
      
      {/* PRZYCISK POWROTU */}
      <Link href="/" className="mt-6 inline-block px-6 py-3 text-lg font-medium leading-6 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition duration-300">
        Wróć do strony głównej
      </Link>
    </div>
  );
}

export default NotFound;