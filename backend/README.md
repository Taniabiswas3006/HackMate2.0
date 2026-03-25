# HackMate Backend

A student platform backend built with **Node.js**, **Express.js**, and **MySQL** that provides:

- **Personalized Skill Roadmaps** — based on branch, year, and interests
- **Hackathon/Event Discovery** — filtered by domain and level
- **Peer Connect** — match students with shared interests

---

## Project Structure

```
HackMate/
├── config/
│   └── db.js                  # MySQL connection pool
├── controllers/
│   └── recommendController.js # Request handling & validation
├── data/
│   ├── roadmapData.js         # Structured roadmap content
│   ├── eventData.js           # Hackathon/event listings
│   └── userData.js            # Sample peer profiles
├── routes/
│   └── recommend.js           # Route definitions
├── scripts/
│   └── initDB.js              # Database setup & seeding
├── services/
│   └── logicService.js        # Core business logic
├── .env                       # Environment variables
├── .gitignore
├── package.json
├── server.js                  # Application entry point
└── README.md
```

---

## ⚡ Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Edit `.env` with your MySQL credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hackmate
DB_PORT=3306
PORT=5000
```

### 3. Initialise the database
```bash
node scripts/initDB.js
```

### 4. Start the server
```bash
npm run dev     # with hot-reload (nodemon)
npm start       # production
```

---

## API Endpoints

### `GET /`
Health check — returns API status.

### `POST /recommend`

**Request Body:**
```json
{
  "branch": "CSE",
  "year": 1,
  "interests": ["AI"]
}
```

**Response:**
```json
{
  "success": true,
  "level": "Beginner",
  "roadmap": [
    {
      "interest": "AI",
      "level": "Beginner",
      "steps": ["Start with Python programming…", "…"]
    }
  ],
  "events": [
    {
      "name": "Hack4India AI Sprint",
      "domain": "AI",
      "level": "Beginner",
      "location": "Online"
    }
  ],
  "peers": [
    {
      "name": "Amit",
      "branch": "CSE",
      "year": 1,
      "interests": ["AI"],
      "skills": ["Python"]
    }
  ]
}
```

---

## Logic (Rule-Based)

| Year | Level        |
|------|-------------|
| 1–2  | Beginner    |
| 3    | Intermediate|
| 4    | Advanced    |

- **Roadmap**: Looked up via `roadmap[branch][interest][level]`
- **Events**: Filtered where `event.domain ∈ interests AND event.level = level`
- **Peers**: Users sharing at least one interest

---

## Tech Stack

- Node.js + Express.js
- MySQL (via `mysql2`)
- CORS enabled
- dotenv for configuration
