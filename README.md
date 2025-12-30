# Recipe Finder App
Discover delicious recipes and save your favorites. Browse through a collection of recipes with ingredients and cooking instructions.

---

## About the Event
This repository is a part of **OverClocked**, the second and final phase of **OverSquare**, organized by **DevSoc AEC**.
OverClocked focuses on hands-on contribution, collaboration, and improving existing projects
by fixing bugs, adding features, or enhancing developer experience.

---

## Project Overview

**Tech Stack:**
- Frontend: React (Vite)
- Backend: Node.js + Express
- Storage: In-memory (No database)

**Current features:**
- Display all available recipes
- View recipe details (ingredients & instructions)
- Add recipes to favorites
- Remove recipes from favorites
- Favorites section with quick access

> ⚠️ Note: This project is intentionally incomplete and may contain bugs or missing features.
Contributors are encouraged to improve and extend it.

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/devsoc-aec/recipe-finder-app.git
cd recipe-finder-app
```

### 2. Install dependencies
**Server**
```bash
cd Server
npm install
npm run dev
```

**Client**
```bash
cd Client
npm install
npm run dev
```

### 3. Access the application
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## API Endpoints

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/favorites` - Get favorite recipes
- `POST /api/favorites` - Add recipe to favorites
- `DELETE /api/favorites/:id` - Remove recipe from favorites

---

## Issues to Work On

### Features
- [ ] Add search functionality by recipe name or ingredients
- [ ] Implement recipe categories (breakfast, lunch, dinner, dessert)
- [ ] Add cooking time and difficulty level
- [ ] Create recipe rating system
- [ ] Add user reviews and comments
- [ ] Implement recipe sharing functionality
- [ ] Add nutritional information

### UI/UX
- [ ] Improve recipe card design
- [ ] Add recipe images
- [ ] Create detailed recipe view page
- [ ] Add animations and transitions
- [ ] Implement responsive design for mobile
- [ ] Add dark mode

### Technical
- [ ] Add input validation
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Create recipe submission form
- [ ] Add database integration
- [ ] Implement pagination for large recipe lists

---

## How to Contribute
1. Fork this repository
2. Create a new branch (`git checkout -b feature/new-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m "Add: your feature description"`)
5. Push to your fork (`git push origin feature/your-feature-name`)
6. Open a Pull Request

---

## Contribution Guidelines
- Keep code clean and readable
- Follow existing code style
- Write clear commit messages
- Be respectful and collaborative

---

## Acknowledgements

Built for **OverClocked** by **DevSoc**.
Happy hacking! 💻✨
