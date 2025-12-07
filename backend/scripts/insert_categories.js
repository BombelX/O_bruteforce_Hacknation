const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../dev.sqlite'));

const categories = ["Elektronika", "Dokumenty", "Rzeczy osobiste", "Odzież", "Inne"];

try {
    const insertCategory = db.prepare('INSERT INTO categories (name) VALUES (?)');
    
    for (const category of categories) {
        insertCategory.run(category);
        console.log(`✓ Dodano kategorię: ${category}`);
    }
    
    console.log('\n✅ Wszystkie kategorie zostały dodane!');
    
    // Wyświetl dodane kategorie
    const allCategories = db.prepare('SELECT * FROM categories').all();
    console.log('\nDodane kategorie:');
    allCategories.forEach(cat => {
        console.log(`  - ID: ${cat.id}, Nazwa: ${cat.name}`);
    });
} catch (error) {
    console.error('❌ Błąd:', error.message);
} finally {
    db.close();
}
