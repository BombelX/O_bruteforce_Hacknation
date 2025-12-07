import { db } from "../src/db/client";
import 'dotenv/config'; // Dodaj to na samej górze
import { categories, subcategories } from "../src/db/schema";
import { sql } from "drizzle-orm";

const seedDatabase = async () => {
  console.log("Rozpoczynam seedowanie...");

  const categoriesList = [
    { id: 1, name: "Elektronika" },
    { id: 2, name: "Dokumenty" },
    { id: 3, name: "Rzeczy osobiste" },
    { id: 4, name: "Odzież" },
    { id: 5, name: "Inne" },
  ];

  const subcategoriesMap: Record<number, string[]> = {
    1: ["Telefon", "Słuchawki", "Laptop/Tablet", "Ładowarka/Kable", "Inne"], 
    2: ["Dowód osobisty", "Legitymacja", "Prawo jazdy", "Paszport", "Inne"], 
    3: ["Portfel", "Klucze", "Okulary", "Biżuteria", "Plecak/Torebka", "Inne"], 
    4: ["Kurtka/Płaszcz", "Czapka/Szalik/Rękawiczki", "Buty", "Bluza/Sweter", "Inne"], 
    5: ["Inne"], 
  };

  try {

    console.log("Dodawanie kategorii...");
    await db.insert(categories).values(categoriesList);
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

    console.log("Dodawanie podkategorii...");
    await db.insert(subcategories).values(subcategoriesToInsert);

    console.log("Sukces! Baza danych została wypełniona.");
  } catch (error) {
    console.error("Błąd podczas seedowania:", error);
  }
};

// Uruchomienie funkcji
seedDatabase();