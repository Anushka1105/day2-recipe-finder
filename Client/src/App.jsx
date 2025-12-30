import { useState, useEffect } from 'react'

function App() {
    const [recipes, setRecipes] = useState([])
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchRecipes()
        fetchFavorites()
    }, [])

    const fetchRecipes = async () => {
        setLoading(true)
        try {
            const response = await fetch('http://localhost:5000/api/recipes')
            const data = await response.json()
            setRecipes(data)
        } catch (error) {
            console.error('Error fetching recipes:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchFavorites = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/favorites')
            const data = await response.json()
            setFavorites(data)
        } catch (error) {
            console.error('Error fetching favorites:', error)
        }
    }

    const toggleFavorite = async (recipe) => {
        try {
            const isFavorite = favorites.some(fav => fav.id === recipe.id)
            if (isFavorite) {
                await fetch(`http://localhost:5000/api/favorites/${recipe.id}`, {
                    method: 'DELETE'
                })
            } else {
                await fetch('http://localhost:5000/api/favorites', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(recipe)
                })
            }
            fetchFavorites()
        } catch (error) {
            console.error('Error toggling favorite:', error)
        }
    }

    return (
        <div className="container">
            <h1 style={{ textAlign: 'center', margin: '20px 0' }}>🍳 Recipe Finder</h1>

            {favorites.length > 0 && (
                <div className="card">
                    <h2>Favorites ({favorites.length})</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px', marginTop: '15px' }}>
                        {favorites.map(recipe => (
                            <div key={recipe.id} className="card" style={{ margin: 0 }}>
                                <h3>{recipe.name}</h3>
                                <p>{recipe.ingredients}</p>
                                <button onClick={() => toggleFavorite(recipe)} style={{ backgroundColor: '#dc3545' }}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="card">
                <h2>All Recipes ({recipes.length})</h2>
                {loading ? (
                    <p>Loading recipes...</p>
                ) : recipes.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666' }}>No recipes available.</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px', marginTop: '15px' }}>
                        {recipes.map(recipe => (
                            <div key={recipe.id} className="card" style={{ margin: 0 }}>
                                <h3>{recipe.name}</h3>
                                <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                                <p><strong>Instructions:</strong> {recipe.instructions}</p>
                                <button
                                    onClick={() => toggleFavorite(recipe)}
                                    style={{ backgroundColor: favorites.some(fav => fav.id === recipe.id) ? '#dc3545' : '#28a745' }}
                                >
                                    {favorites.some(fav => fav.id === recipe.id) ? '❤️ Favorited' : '🤍 Add to Favorites'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
