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
            const response = await fetch('http://localhost:5000/api/get')
            const data = await response.json()
            setRecipes(data.data)
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
            <div className='upper-section'>
                <div className='nav'>
                    <div>
                        <h1>Recipe Finder</h1>
                    </div>
                    <div className='view'>
                        <button>Add Recipes</button>
                        <button>Favourites</button>
                    </div>
                </div>

                <div className='search'>
                    <i class="ri-search-line"></i>
                    <input className='input' type="text" placeholder="Search recipes..." />
                    <button>Search</button>
                </div>

            </div>

            
            <div className='bottom-section'>
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
                                <img className='recipe-img' src="https://images.unsplash.com/photo-1609159085820-d9a6ff0f469e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                <h3>{recipe.name}</h3>
                                <p><strong>Meal Type:</strong> {recipe.mealType}</p>
                                {/* <p><strong>Instructions:</strong> {recipe.instructions}</p> */}
                                <div className='fav'>
                                    <p>5 <svg className='star' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(240,187,64,1)"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path></svg></p>
                                <button
                                    onClick={() => toggleFavorite(recipe)}
                                    style={{ backgroundColor: favorites.some(fav => fav.id === recipe.id) ? '#f07f8aff' : '#28a745' }}
                                >
                                    {favorites.some(fav => fav.id === recipe.id) ? '❤️' : '🤍 '}
                                </button>
                                </div>
                                <a href="">Read More</a>
                                
                            </div>
                        ))}
                    </div>
                )}
            </div>
            </div>
            

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

        </div>
    )
}

export default App
