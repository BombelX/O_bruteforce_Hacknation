import 'dotenv/config'; // Dodaj to na samej górze
import { db } from "../src/db/client";
import { categories, subcategories } from "../src/db/schema";
import { sql } from "drizzle-orm";

const seedDatabase = async () => {
  console.log("Rozpoczynam seedowanie...");

  // 1. Definicja danych
  const categoriesList = [
    { name: "Elektronika" },
    { name: "Dokumenty" },
    { name: "Rzeczy osobiste" },
    { name: "Odzież" },
    { name: "Inne" },
  ];

  const subcategoriesMap: Record<number, string[]> = {
    1: ["Telefon", "Słuchawki", "Laptop/Tablet", "Ładowarka/Kable", "Inne"], // Elektronika
    2: ["Dowód osobisty", "Legitymacja", "Prawo jazdy", "Paszport", "Inne"], // Dokumenty
    3: ["Portfel", "Klucze", "Okulary", "Biżuteria", "Plecak/Torebka", "Inne"], // Rzeczy osobiste
    4: ["Kurtka/Płaszcz", "Czapka/Szalik/Rękawiczki", "Buty", "Bluza/Sweter", "Inne"], // Odzież
    5: ["Inne"], // Domyślna podkategoria dla kategorii "Inne"
  };

  try {
    // 2. Dodawanie Kategorii (Głównych)
    console.log("Dodawanie kategorii...");
    for (const category of categoriesList) {
      await db.insert(categories).values(category);
    }

    // 3. Przygotowanie listy podkategorii do wstawienia
    const subcategoriesToInsert: { category_id: number; name: string }[] = [];

    for (const [catId, subs] of Object.entries(subcategoriesMap)) {
      const categoryId = parseInt(catId);
      subs.forEach((subName) => {
        subcategoriesToInsert.push({
          category_id: categoryId,
          name: subName,
        });
      });
    }

    // 4. Dodawanie Podkategorii
    console.log("Dodawanie podkategorii...");
    await db.insert(subcategories).values(subcategoriesToInsert);

    console.log("Sukces! Baza danych została wypełniona.");
  } catch (error) {
    console.error("Błąd podczas seedowania:", error);
  }
};

// Uruchomienie funkcji
seedDatabase();