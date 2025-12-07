# ODNALEZIONE ZGUBY 🔍

## O Projekcie

**ODNALEZIONE ZGUBY** to innowacyjne rozwiązanie, które eliminuje bariery technologiczne dla pracowników służby publicznej. Zamieniamy złożone procesy w intuicyjny i prosty **3-etapowy proces** zgłaszania zaginionych przedmiotów.

Nasze rozwiązanie pozwala przekształcić prostą notatkę w publiczny rekord dostępny dla każdego w Polsce w ciągu **zaledwie kilku minut**. 

### Kluczowe Cechy ✨

- **Bezpieczeństwo**: Szyfrowanie danych oraz zgodność z regulacją RODO
- **Prostota**: Intuicyjny interfejs dla pracowników i obywateli
- **Standaryzacja**: Jednolity format wprowadzania zginionych przedmiotów dla wszystkich urzędników
- **Dostępność**: Jeden prosty system dla całego kraju
- **Przejrzystość**: Dane dostępne publicznie dla wszystkich obywateli

---

## Technologia 💻

### Frontend
- **Next.js 16** - Nowoczesny framework React z SSR i optimizacją
- **React 19** - Biblioteka UI ze wsparciem dla najnowszych features
- **TypeScript** - Bezpieczne typowanie kodu
- **Tailwind CSS** - Responsywne projekty bez konfiguracji
- **DaisyUI** - Komponenty UI zbudowane na Tailwind CSS
- **ESLint** - Linting i kontrola jakości kodu

### Backend
- **Express.js** - Lekki framework HTTP
- **TypeScript** - Bezpieczeństwo typów w całej aplikacji
- **Drizzle ORM** - Nowoczesny ORM dla SQL
- **SQLite** - Lekka, ale wydajna baza danych
- **JWT (JSON Web Tokens)** - Bezpieczna autentykacja użytkowników
- **Zod** - Walidacja schematów TypeScript
- **bcrypt/SHA256** - Bezpieczne haszowanie haseł

### Bezpieczeństwo & Compliance
- ✅ **RODO Ready** - Zgodność z Rozporządzeniem o Ochronie Danych Osobowych
- ✅ **Szyfrowanie** - Połączenia HTTPS oraz hashowanie haseł
- ✅ **JWT Auth** - Bezpieczne tokeny sesji
- ✅ **CORS** - Kontrola dostępu między domenami

---

## Architektura Projektu 🏗️

```
Hacknation-Boilerplate/
├── frontend/                 # Aplikacja Next.js
│   ├── app/
│   │   ├── add/             # Strona dodawania przedmiotów
│   │   ├── home/            # Strona główna
│   │   ├── login/           # Autentykacja
│   │   └── components/      # Komponenty wspólne
│   ├── public/              # Pliki statyczne
│   └── package.json
│
├── backend/                  # Express.js + Drizzle
│   ├── src/
│   │   ├── db/              # Konfiguracja bazy danych
│   │   │   ├── schema.ts    # Definicje tabel
│   │   │   ├── client.ts    # Klient Drizzle
│   │   │   └── migrate.ts   # Migracje
│   │   ├── routes/
│   │   │   ├── authorize.ts # Logowanie i autoryzacja
│   │   │   ├── formular.ts  # Zgłaszanie przedmiotów
│   │   │   └── opendatabridge.ts
│   │   └── index.ts         # Punkt wejścia aplikacji
│   ├── drizzle/             # Migracje bazy danych
│   ├── scripts/             # Skrypty pomocnicze
│   └── package.json
│
└── README.md
```

---

## Schemat Bazy Danych 📊

### Użytkownicy (`users`)
```
- id: INT (Primary Key)
- username: TEXT
- password: TEXT (SHA256)
```

### Przedmioty (`items`)
```
- id: INT (Primary Key)
- category_id: INT (FK)
- subcategory_id: INT (FK)
- where_found: TEXT
- found_date: TEXT
- register_date: TEXT
- description: TEXT
- user_id: INT (FK) - Pracownik, który zgłosił przedmiot
```

### Kategorie (`categories`)
```
- id: INT (Primary Key)
- name: TEXT
```

### Podkategorie (`subcategories`)
```
- id: INT (Primary Key)
- category_id: INT (FK)
- name: TEXT
```

### Tokeny Odświeżające (`refresh_tokens`)
```
- id: INT (Primary Key)
- user_id: INT (FK)
- token: TEXT
- expires_at: TEXT
- is_revoked: INT
```

### Stare Przedmioty (`old_items`)
```
- id: INT (Primary Key)
- category: TEXT
- found_date: TEXT
- where_found: TEXT
- register_date: TEXT
- description: TEXT
- voivodeship: TEXT
- region: TEXT
- subcategories: TEXT
```

---

## Instalacja 🚀

### Wymagania
- Node.js 18+
- npm lub yarn
- SQLite3

### Kroki instalacji

1. **Klonowanie repozytorium**
```bash
git clone https://github.com/BombelX/Hacknation-Boilerplate.git
cd Hacknation-Boilerplate
```

2. **Instalacja zależności**
```bash
# Root
npm install

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Konfiguracja zmiennych środowiskowych**

Utwórz plik `.env` w katalogu `backend/`:
```env
SECRET_KEY=your_super_secret_key_change_me_in_production
NODE_ENV=development
PORT=3100
```

Utwórz plik `.env.local` w katalogu `frontend/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3100
```

4. **Migracja bazy danych**
```bash
cd backend
npm run migrate
```

---

## Uruchomienie 🎯

### Desenvolvment Mode

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
# Serwer dostępny: http://localhost:3100
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
# Aplikacja dostępna: http://localhost:3000
```

### Production Mode

**Backend**
```bash
cd backend
npm run build
npm start
```

**Frontend**
```bash
cd frontend
npm run build
npm start
```

---

## API Endpoints 📡

### Autentykacja
- `POST /authorize/login` - Logowanie użytkownika
- `POST /authorize/logout` - Wylogowanie

### Przedmioty
- `POST /formular/submit` - Dodanie nowego przedmiotu (wymaga JWT)
- `GET /formular/categories` - Pobierz wszystkie kategorie
- `GET /formular/subcategories/:id` - Pobierz podkategorie dla kategorii
- `POST /formular/categories` - Dodaj stare przedmioty (import danych)

---

## Proces 3-etapowy 📋

1. **Etap 1: Logowanie** 🔐
   - Pracownik loguje się do systemu
   - Weryfikacja poświadczeń poprzez SHA256

2. **Etap 2: Wprowadzenie Danych** ✍️
   - Prosty formularz z:
     - Wyborem kategorii
     - Wyborem podkategorii
     - Miejscem znalezienia
     - Datą znalezienia
     - Opisem przedmiotu

3. **Etap 3: Publikacja** 📢
   - Dane natychmiast publikowane w systemie
   - Dostępne dla wszystkich obywateli
   - Zapisane w bezpiecznej bazie danych

---

## Bezpieczeństwo 🔒

### Implementowane Mechanizmy
- ✅ **Haszowanie Haseł**: SHA256 dla haseł
- ✅ **JWT Authentication**: Bezpieczne tokeny sesji
- ✅ **HTTPS Ready**: Obsługa bezpiecznych połączeń
- ✅ **CORS Protection**: Kontrola dostępu do API
- ✅ **HttpOnly Cookies**: Ochrona przed XSS
- ✅ **Validacja Danych**: Zod schemas dla wszystkich inputów
- ✅ **RODO Compliance**: Bezpieczne przechowywanie danych

---

## Rozwój 🛠️

### Skrypty Pomocnicze

```bash
# Backend - Migracja bazy danych
cd backend && npm run migrate

# Backend - Czyszczenie duplikatów
npx tsx scripts/clean_duplicates.ts

# Backend - Insert kategorii
npx tsx scripts/insert_categories.js

# Backend - Import użytkowników testowych
npx tsx scripts/insert_mock_users.js
```

### Struktura Kodu Backend

```
src/
├── index.ts              # Konfiguracja Express
├── db/
│   ├── client.ts         # Inicjalizacja Drizzle ORM
│   ├── schema.ts         # Definicje modeli
│   └── migrate.ts        # Runner migracji
└── routes/
    ├── authorize.ts      # Logowanie/autoryzacja
    ├── formular.ts       # Obsługa formularza
    └── opendatabridge.ts # Most danych
```

---

## Wkład 🤝

Zapraszamy do współpracy! Jeśli chcesz wnieść swój wkład:

1. Forknij repozytorium
2. Utwórz branch dla swojej feature (`git checkout -b feature/AmazingFeature`)
3. Commituj zmiany (`git commit -m 'Add some AmazingFeature'`)
4. Pushuj do brancha (`git push origin feature/AmazingFeature`)
5. Otwórz Pull Request

---

## Licencja 📄

Projekt jest objęty licencją MIT. Szczegóły w pliku [LICENSE](LICENSE).

---

## Bezpieczeństwo 🔐

Jeśli znalazłeś lukę bezpieczeństwa, prosimy o zgłoszenie jej odpowiedzialnie. Szczegóły w [SECURITY.md](SECURITY.md).

---

## Kontakt 📧

- **Projekt**: ODNALEZIONE ZGUBY
- **Organizacja**: HACKNation
- **GitHub**: [BombelX/Hacknation-Boilerplate](https://github.com/BombelX/Hacknation-Boilerplate)

---

## Roadmap 🗺️

- [ ] Integracja z systemem OpenDataBridge
- [ ] Rozszerzone raporty i analytics
- [ ] Mobilna aplikacja
- [ ] Wsparcie dla więcej kategorii przedmiotów
- [ ] Notyfikacje email/SMS
- [ ] Dashboard dla administratorów
- [ ] Eksport danych do formatów standardowych

---

## Statystyka Projektu 📈

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Express.js, Drizzle ORM, SQLite
- **Baza Danych**: 7 tabel, w tym systemy dla kategorii, podkategorii i heurystyki
- **Endpoints API**: 5+ endpointów RESTful
- **Bezpieczeństwo**: RODO, JWT, Szyfrowanie, Validacja

---

**Dziękujemy za zainteresowanie projektem ODNALEZIONE ZGUBY!** ❤️
