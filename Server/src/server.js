import express from 'express'
import cors from 'cors'
const recipeRouter = require('../routes/recipe-routes')

const app = express()
const PORT = 5000


// Middleware
app.use(cors())
app.use(express.json())
app.use('/api',recipeRouter)






// // In-memory storage
// let favorites = []
// const recipes = [
//     { id: 1, name: 'Pasta Carbonara', ingredients: 'pasta, eggs, bacon, parmesan', instructions: 'Cook pasta, fry bacon, mix with eggs and cheese' },
//     { id: 2, name: 'Chicken Curry', ingredients: 'chicken, curry powder, coconut milk, onions', instructions: 'Cook chicken with curry and coconut milk' },
//     { id: 3, name: 'Caesar Salad', ingredients: 'lettuce, croutons, parmesan, caesar dressing', instructions: 'Mix all ingredients together' },
//     { id: 4, name: 'Tomato Soup', ingredients: 'tomatoes, onions, garlic, cream', instructions: 'Blend tomatoes and cook with cream' },
//     { id: 5, name: 'Grilled Cheese', ingredients: 'bread, cheese, butter', instructions: 'Grill bread with cheese in between' }
// ]

// // Routes
// app.get('/api/recipes', (req, res) => {
//     res.json(recipes)
// })


// app.get('/api/favorites', (req, res) => {
//     res.json(favorites)
// })

// app.post('/api/favorites', (req, res) => {
//     const recipe = req.body
//     if (!favorites.some(fav => fav.id === recipe.id)) {
//         favorites.push(recipe)
//     }
//     res.json({ message: 'Added to favorites', favorites })
// })

// app.delete('/api/favorites/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     favorites = favorites.filter(fav => fav.id !== id)
//     res.json({ message: 'Removed from favorites', favorites })
// })

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
