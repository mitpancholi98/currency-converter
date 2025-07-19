# 💱 Currency Converter API

A RESTful API for real-time and mock currency conversion.  
Features include Redis caching, OpenAPI documentation, Docker support, and CI/CD via GitHub Actions.

---

## 🚀 Features

- Convert between currencies using live or mock exchange rates
- Redis caching with a 5-minute TTL to improve performance
- OpenAPI 3.0 documentation available at `/docs`
- CI/CD pipeline powered by GitHub Actions
- Dockerized setup for consistent environment parity

---

## 🛠️ Local Development Setup

### ✅ Prerequisites

Make sure the following are installed:

- **Node.js** `>= 22`  
  [Download from nodejs.org](https://nodejs.org/)
- **Docker & Docker Compose**  
  [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

### 🚧 Setup Steps

```bash
# 1. Clone the repository
git clone <repo>
cd currency-converter

# 2. Install dependencies
npm install

# 3. Copy environment config
cp .env.example .env

# 4. Start Redis container for development (in detached mode)
docker compose up --build -d

# 5. Start the development server
npm run dev
```

### 📦 Useful Commands

```bash
# Run TypeScript type checking
npm run type-check

# Run unit tests
npm run test

# Build the production bundle
npm run build
```
