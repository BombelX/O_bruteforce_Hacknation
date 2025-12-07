import { db } from "../src/db/client"; // Upewnij się, że ścieżka jest poprawna
import { sql } from "drizzle-orm";

const cleanDuplicates = async () => {
  console.log("Rozpoczynam usuwanie duplikatów...");

  try {
    // 1. Usuwanie duplikatów PODKATEGORII
    // Zostawiamy tę z najniższym ID, resztę usuwamy
    await db.run(sql`
      DELETE FROM subcategories 
      WHERE id NOT IN (
        SELECT MIN(id) 
        FROM subcategories 
        GROUP BY category_id, name
      );
    `);
    console.log("Duplikaty podkategorii usunięte.");

    // 2. Usuwanie duplikatów KATEGORII
    await db.run(sql`
      DELETE FROM categories 
      WHERE id NOT IN (
        SELECT MIN(id) 
        FROM categories 
        GROUP BY name
      );
    `);
    console.log("Duplikaty kategorii usunięte.");

    console.log("Gotowe! Baza jest czysta.");
  } catch (error) {
    console.error("Błąd:", error);
  }
};

cleanDuplicates();