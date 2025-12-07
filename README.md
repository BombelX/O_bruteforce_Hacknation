# FOUND ITEMS REGISTRY 🔍

## Project Overview

**FOUND ITEMS REGISTRY** is an innovative solution that removes technological barriers for civil servants. We replace complex workflows with an intuitive and simple **3-step process** for reporting lost and found items.

Our solution transforms a simple note into a public record accessible to everyone in Poland in just **minutes**.

### Key Features ✨

- **Security**: Data encryption and GDPR compliance
- **Simplicity**: Intuitive interface for civil servants and citizens
- **Standardization**: Unified format for entering lost items across all officials
- **Accessibility**: One easy system for the entire country
- **Transparency**: Data publicly available to all citizens

username: mockUser1
password Password123


▶YouTube
Youtube video presenting app features:
https://youtu.be/9BBBt0pilr0 



## Technology Stack 💻

### Frontend
- **Next.js 16** - Modern React framework with SSR and optimization
- **React 19** - UI library with latest features support
- **TypeScript** - Safe code typing
- **Tailwind CSS** - Responsive design without configuration
- **DaisyUI** - UI components built on Tailwind CSS
- **ESLint** - Code linting and quality control

### Backend
- **Express.js** - Lightweight HTTP framework
- **TypeScript** - Type safety across the application
- **Drizzle ORM** - Modern SQL ORM
- **SQLite** - Lightweight yet efficient database
- **JWT** - Secure user authentication
- **Zod** - TypeScript schema validation
- **bcrypt/SHA256** - Secure password hashing

### Security & Compliance
- ✅ **GDPR Ready** - Full GDPR compliance
- ✅ **Encryption** - HTTPS connections and password hashing
- ✅ **JWT Auth** - Secure session tokens
- ✅ **CORS** - Cross-origin access control
- ✅ **Input Validation** - Zod schemas for all inputs
- ✅ **HttpOnly Cookies** - XSS protection

---

## Project Architecture 🏗️

```
Hacknation-Boilerplate/
├── frontend/                 # Next.js Application
│   ├── app/
│   │   ├── add/             # Item submission page
│   │   ├── home/            # Homepage
│   │   ├── login/           # Authentication
│   │   └── components/      # Shared components
│   ├── public/              # Static assets
│   └── package.json
│
├── backend/                  # Express.js + Drizzle
│   ├── src/
│   │   ├── db/              # Database configuration
│   │   │   ├── schema.ts    # Table definitions
│   │   │   ├── client.ts    # Drizzle client
│   │   │   └── migrate.ts   # Migrations
│   │   ├── routes/
│   │   │   ├── authorize.ts # Login/authorization
│   │   │   ├── formular.ts  # Item submission
│   │   │   └── opendatabridge.ts
│   │   └── index.ts         # Application entry point
│   ├── drizzle/             # Database migrations
│   ├── scripts/             # Helper scripts
│   └── package.json
│
└── README.md
```

---

## Database Schema 📊

### Users (`users`)
```
- id: INT (Primary Key)
- username: TEXT
- password: TEXT (SHA256)
```

### Items (`items`)
```
- id: INT (Primary Key)
- category_id: INT (FK)
- subcategory_id: INT (FK)
- where_found: TEXT
- found_date: TEXT
- register_date: TEXT
- description: TEXT
- user_id: INT (FK) - Officer who reported the item
```

### Categories (`categories`)
```
- id: INT (Primary Key)
- name: TEXT
```

### Subcategories (`subcategories`)
```
- id: INT (Primary Key)
- category_id: INT (FK)
- name: TEXT
```

### Refresh Tokens (`refresh_tokens`)
```
- id: INT (Primary Key)
- user_id: INT (FK)
- token: TEXT
- expires_at: TEXT
- is_revoked: INT
```

### Legacy Items (`old_items`)
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

## Installation 🚀

### Requirements
- Node.js 18+
- npm or yarn
- SQLite3

### Installation Steps

1. **Clone the Repository**
```bash
git clone https://github.com/BombelX/Hacknation-Boilerplate.git
cd Hacknation-Boilerplate
```

2. **Install Dependencies**
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

3. **Configure Environment Variables**

Create `.env` file in `backend/`:
```env
SECRET_KEY=your_super_secret_key_change_me_in_production
NODE_ENV=development
PORT=3100
```

Create `.env.local` file in `frontend/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3100
```

4. **Run Database Migrations**
```bash
cd backend
npm run migrate
```

---

## Running the Application 🎯

### Development Mode

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
# Server available at: http://localhost:3100
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
# Application available at: http://localhost:3000
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

### Authentication
- `POST /authorize/login` - User login
- `POST /authorize/logout` - User logout

### Items
- `POST /formular/submit` - Add new item (requires JWT)
- `GET /formular/categories` - Get all categories
- `GET /formular/subcategories/:id` - Get subcategories for a category
- `POST /formular/categories` - Add legacy items (data import)

---

## 3-Step Process 📋

1. **Step 1: Authentication** 🔐
   - Civil servant logs into the system
   - Credentials verified via SHA256

2. **Step 2: Data Entry** ✍️
   - Simple form with:
     - Category selection
     - Subcategory selection
     - Location found
     - Date found
     - Item description

3. **Step 3: Publication** 📢
   - Data immediately published in the system
   - Available to all citizens
   - Stored in secure database

---

## Security 🔒

### Implemented Mechanisms
- ✅ **Password Hashing**: SHA256 for passwords
- ✅ **JWT Authentication**: Secure session tokens
- ✅ **HTTPS Ready**: Support for secure connections
- ✅ **CORS Protection**: Access control to API
- ✅ **HttpOnly Cookies**: XSS protection
- ✅ **Data Validation**: Zod schemas for all inputs
- ✅ **GDPR Compliance**: Secure data storage

---

## Development 🛠️

### Helper Scripts

```bash
# Backend - Database migration
cd backend && npm run migrate

# Backend - Clean duplicates
npx tsx scripts/clean_duplicates.ts

# Backend - Insert categories
npx tsx scripts/insert_categories.js

# Backend - Import test users
npx tsx scripts/insert_mock_users.js
```

### Backend Code Structure

```
src/
├── index.ts              # Express configuration
├── db/
│   ├── client.ts         # Drizzle ORM initialization
│   ├── schema.ts         # Model definitions
│   └── migrate.ts        # Migration runner
└── routes/
    ├── authorize.ts      # Login/authorization
    ├── formular.ts       # Form handling
    └── opendatabridge.ts # Data bridge
```

---

## Contributing 🤝

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License 📄

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Security 🔐

If you discover a security vulnerability, please report it responsibly. See [SECURITY.md](SECURITY.md) for details.

---

## Contact 📧

- **Project**: Found Items Registry
- **Organization**: HACKNation
- **GitHub**: [BombelX/Hacknation-Boilerplate](https://github.com/BombelX/Hacknation-Boilerplate)

---

## Roadmap 🗺️

- [ ] OpenDataBridge system integration
- [ ] Extended reports and analytics
- [ ] Mobile application
- [ ] Support for more item categories
- [ ] Email/SMS notifications
- [ ] Admin dashboard
- [ ] Export data to standard formats

---

## Project Statistics 📈

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Express.js, Drizzle ORM, SQLite
- **Database**: 7 tables including category and subcategory systems
- **API Endpoints**: 5+ RESTful endpoints
- **Security**: GDPR, JWT, Encryption, Validation

---

**Thank you for your interest in the Found Items Registry project!** ❤️
